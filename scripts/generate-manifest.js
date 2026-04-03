import { config } from 'dotenv';
config({ path: '.env.local' });
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const BUCKET = 'storage-images123';
const REGION = 'us-east-1';
const OUTPUT_DIR = path.join(__dirname, '../public/manifests');
const GALLERY_MANIFEST = path.join(OUTPUT_DIR, 'gallery-manifest.json');

const s3 = new S3Client({ region: REGION });

// --- Helper Functions ---
async function listImagesInPrefix(prefix) {
    const command = new ListObjectsV2Command({ Bucket: BUCKET, Prefix: prefix });
    const response = await s3.send(command);
    if (!response.Contents) return [];
    return response.Contents.filter(obj => !obj.Key.endsWith('/')).map(obj => `https://${BUCKET}.s3.${REGION}.amazonaws.com/${obj.Key}`);
}

async function listSubfolders(prefix) {
    const command = new ListObjectsV2Command({ Bucket: BUCKET, Prefix: prefix, Delimiter: '/' });
    const response = await s3.send(command);
    return response.CommonPrefixes?.map(p => p.Prefix) || [];
}

// --- Manifest Generation Functions ---
async function generateGalleryManifest() {
    const albums = {};
    const albumFolders = await listSubfolders('gallery/albums/');
    for (const albumPath of albumFolders) {
        // Extract album key: remove 'gallery/albums/' and trailing slash
        const albumKey = albumPath.replace('gallery/albums/', '').replace('/', '');
        const albumName = albumKey.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        const subcategories = {};
        const categoryFolders = await listSubfolders(albumPath);
        for (const catPath of categoryFolders) {
            const key = catPath.split('/').filter(Boolean).pop();
            let name;
            if (key === 'team-photos') name = 'Team Photos';
            else if (key === 'robots') name = 'Robots';
            else if (key === 'competitions') name = 'Competition Photos';
            else name = key.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            const images = await listImagesInPrefix(catPath);
            if (images.length) subcategories[key] = { name: name, images };
        }
        if (Object.keys(subcategories).length) albums[albumKey] = { name: albumName, subcategories };
    }
    const carouselImages = await listImagesInPrefix('gallery/carousel/');
    const manifest = { carouselImages, albums };
    writeFileSync(GALLERY_MANIFEST, JSON.stringify(manifest, null, 2));
    console.log(`Gallery manifest generated with ${carouselImages.length} carousel images and ${Object.keys(albums).length} albums.`);
}

async function main() {
    if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });
    await generateGalleryManifest();
}
main().catch(console.error);