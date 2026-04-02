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

        <div className="flex-grow bg-gray-50">
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
                  className="uppercase font-semibold tracking-wide text-gray-300 hover:text-[#ffb347] transition text-sm sm:text-base"
                  onClick={(e) => handleFooterNavClick(e, item.href)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="text-center text-gray-400 text-sm sm:text-base mt-6 sm:mt-8 px-2">
              © 2026 Coast 2 Coast Robotics. All rights reserved.
            </div>
            <nav className="flex flex-wrap justify-center items-center gap-1 sm:gap-2 text-center text-gray-400 text-sm sm:text-base mt-3 sm:mt-2 px-2">
              <Link 
                href={siteConfig.siteURLs.tos} 
                className="tracking-wide hover:text-[#ffb347] transition whitespace-nowrap"
                onClick={(e) => handleFooterNavClick(e, siteConfig.siteURLs.tos)}
              >
                Terms of Service
              </Link>
              <span className="text-gray-500">|</span>
              <Link 
                href={siteConfig.siteURLs.pp} 
                className="tracking-wide hover:text-[#ffb347] transition whitespace-nowrap"
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