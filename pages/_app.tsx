import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import Head from "next/head";
import Navbar from "@/components/navbar";
import { siteConfig } from "@/config/site";
import { InstagramIcon, FacebookIcon, TwitterIcon, YoutubeIcon, GithubIcon } from "@/components/icons";
import { useRouter } from "next/router";

const SocialLinks = ({ className = "" }: { className?: string }) => (
  <div className={`flex gap-4 sm:gap-6 ${className}`}>
    <a href={siteConfig.links.instagram} aria-label="Instagram" className="hover:scale-110 transition" target="_blank" rel="noopener noreferrer">
      <InstagramIcon />
    </a>
    <a href={siteConfig.links.facebook} aria-label="Facebook" className="hover:scale-110 transition" target="_blank" rel="noopener noreferrer">
      <FacebookIcon />
    </a>
    <a href={siteConfig.links.twitter} aria-label="Twitter" className="hover:scale-110 transition" target="_blank" rel="noopener noreferrer">
      <TwitterIcon />
    </a>
    <a href={siteConfig.links.youtube} aria-label="Youtube" className="hover:scale-110 transition" target="_blank" rel="noopener noreferrer">
      <YoutubeIcon />
    </a>
    {/* <a href={siteConfig.links.github} aria-label="Github" className="hover:scale-110 transition" target="_blank" rel="noopener noreferrer">
            <GithubIcon/>
        </a> */}
  </div>
);

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const handleFooterNavClick = (e: React.MouseEvent, href: string) => {
    // Check if we're clicking on the same page
    if (router.asPath === href) {
      // Same page - prevent default and scroll to top with animation
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
    // For different pages, let the default Link behavior handle navigation
    // (no preventDefault, no scroll animation)
  };

  return (
    <main className="">
      <div className="">
        <Navbar />
        <Head>
          <title>Coast 2 Coast Robotics</title>
          <meta name="description"
            content="The official website for the C2C Robotics." />

          <link rel="icon" href="/logo.png" type="image/png" />
          <link rel="shortcut icon" href="/logo.png" type="image/png" />
          <link rel="apple-touch-icon" href="/logo.png" type="image/png" />

          <meta property="og:title" content="C2C Robotics" />
          <meta property="og:description"
            content="The official website for the C2C Robotics." />
          <meta property="og:image" content="/logo.png" />
          <meta property="og:url" content="https://c2crobotics.com" />

          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>

        <div className="grow bg-gray-50">
          <Component {...pageProps} />
        </div>

        {/* Footer */}
        <footer className="bg-[#222228] mt-0">
          <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col items-center gap-3 sm:gap-4">
            <h2 className="uppercase font-bold text-gray-200 text-center text-sm sm:text-base tracking-wide mb-1 sm:mb-2">
              Check out our socials
            </h2>
            {/* Social Icons */}
            <div className="flex mt-0">
              <SocialLinks className="lg:flex" />
            </div>
          </div>
          {/* Nav Links */}
          <div className="py-6 sm:py-10 bg-[#1a1a1f] px-4 sm:px-6">
            <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mb-4 sm:mb-2">
              {siteConfig.navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="uppercase font-semibold tracking-wide text-gray-300 hover:text-[#50a1ff] transition text-sm sm:text-base"
                  onClick={(e) => handleFooterNavClick(e, item.href)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Locations Section */}
            <div className="max-w-3xl mx-auto mt-8 sm:mt-10">
              <h3 className="text-center text-gray-300 text-lg sm:text-xl font-semibold tracking-wide mb-6">
                Our Locations
              </h3>
              <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-12">
                <div className="flex items-start gap-3 text-gray-300">
                  <div className="mt-1 text-[#50a1ff]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div className="text-sm sm:text-base">
                    <p className="font-semibold text-white mb-1">Bayside</p>
                    <p className="text-gray-400">41-08 Bell Blvd, 2nd Floor</p>
                    <p className="text-gray-400">Bayside, NY 11361</p>
                    <p className="text-[#50a1ff] mt-1">646-799-3980</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-gray-300">
                  <div className="mt-1 text-[#50a1ff]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div className="text-sm sm:text-base">
                    <p className="font-semibold text-white mb-1">Mineola</p>
                    <p className="text-gray-400">254 E Jericho Turnpike</p>
                    <p className="text-gray-400">Mineola, NY 11501</p>
                    <p className="text-[#50a1ff] mt-1">516-899-8886</p>
                  </div>
                </div>
              </div>
            </div>


            <div className="text-center text-gray-400 text-sm sm:text-base mt-6 sm:mt-8 px-2">
              © 2026 Coast 2 Coast Robotics. All rights reserved.
            </div>
            <nav className="flex flex-wrap justify-center items-center gap-1 sm:gap-2 text-center text-gray-400 text-sm sm:text-base mt-3 sm:mt-2 px-2">
              <Link
                href={siteConfig.siteURLs.tos}
                className="tracking-wide hover:text-[#50a1ff] transition whitespace-nowrap"
                onClick={(e) => handleFooterNavClick(e, siteConfig.siteURLs.tos)}
              >
                Terms of Service
              </Link>
              <span className="text-gray-500">|</span>
              <Link
                href={siteConfig.siteURLs.pp}
                className="tracking-wide hover:text-[#50a1ff] transition whitespace-nowrap"
                onClick={(e) => handleFooterNavClick(e, siteConfig.siteURLs.pp)}
              >
                Privacy Policy
              </Link>
            </nav>
          </div>
        </footer>
      </div>
    </main>
  );
}
