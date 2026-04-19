import { config } from 'dotenv';
config({ path: '.env.local' });
import {
  S3Client,
  ListObjectsV2Command,
  HeadObjectCommand,
} from "@aws-sdk/client-s3";
import { writeFileSync, mkdirSync } from "fs";
import { dirname } from "path";

// ========== CONFIGURATION ==========
const BUCKET_NAME = 'c2crobotics-website';
const REGION = "us-east-1";
const BASE_PREFIX = "history/";
const OUTPUT_DIR = "public/manifests";
const CONCURRENCY = 10;

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".gif", ".webp"]);
const PATH_REGEX = /^history\/(\d{4})\/([^\/]+)\/[^\/]+$/i;
// ===================================

const s3 = new S3Client({ region: REGION });

async function listAllImageKeys() {
  const imageKeys = [];
  let continuationToken;
  do {
    const command = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      Prefix: BASE_PREFIX,
      ContinuationToken: continuationToken,
    });
    const response = await s3.send(command);
    for (const obj of response.Contents || []) {
      const ext = obj.Key.substring(obj.Key.lastIndexOf(".")).toLowerCase();
      if (IMAGE_EXTENSIONS.has(ext)) imageKeys.push(obj.Key);
    }
    continuationToken = response.NextContinuationToken;
  } while (continuationToken);
  return imageKeys;
}

async function getImageMetadata(key) {
  try {
    const response = await s3.send(new HeadObjectCommand({ Bucket: BUCKET_NAME, Key: key }));
    return { key, caption: response.Metadata?.caption || "" };
  } catch {
    return { key, caption: "" };
  }
}

async function buildTeamManifest(teamName, teamKeys) {
  const metadata = new Map();
  for (let i = 0; i < teamKeys.length; i += CONCURRENCY) {
    const batch = teamKeys.slice(i, i + CONCURRENCY).map(item => item.key);
    const results = await Promise.all(batch.map(getImageMetadata));
    results.forEach(r => metadata.set(r.key, r.caption));
  }

  const yearsMap = new Map();
  for (const { key, year } of teamKeys) {
    if (!yearsMap.has(year)) yearsMap.set(year, []);
    yearsMap.get(year).push({
      url: `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${encodeURI(key)}`,
      key,
      caption: metadata.get(key) || "",
    });
  }

  const years = Array.from(yearsMap.entries())
    .map(([year, images]) => ({ year, images }))
    .sort((a, b) => b.year.localeCompare(a.year));

  return { team: teamName, generatedAt: new Date().toISOString(), totalImages: teamKeys.length, years };
}

async function main() {
  const allKeys = await listAllImageKeys();
  if (!allKeys.length) return console.log("No images found.");

  const teamMap = new Map();
  for (const key of allKeys) {
    const match = key.match(PATH_REGEX);
    if (!match) continue;
    const [, year, team] = match;
    if (!teamMap.has(team)) teamMap.set(team, []);
    teamMap.get(team).push({ key, year });
  }

  const teamManifests = [];
  for (const [teamName, teamKeys] of teamMap.entries()) {
    console.log(`Processing ${teamName} (${teamKeys.length} images)...`);
    const manifest = await buildTeamManifest(teamName, teamKeys);
    teamManifests.push(manifest);
    const safeName = teamName.replace(/[^a-z0-9_-]/gi, "_");
    const filePath = `${OUTPUT_DIR}/team-${safeName}.json`;
    mkdirSync(dirname(filePath), { recursive: true });
    writeFileSync(filePath, JSON.stringify(manifest, null, 2));
  }

  const index = {
    generatedAt: new Date().toISOString(),
    teams: teamManifests.map(t => ({
      name: t.team,
      totalImages: t.totalImages,
      years: t.years.map(y => y.year),
      manifestUrl: `team-${t.team.replace(/[^a-z0-9_-]/gi, "_")}.json`,
    })),
  };
  writeFileSync(`${OUTPUT_DIR}/teams-index.json`, JSON.stringify(index, null, 2));
  console.log(`Generated ${teamManifests.length} team manifests.`);
}

main().catch(console.error);