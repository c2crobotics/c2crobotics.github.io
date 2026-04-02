"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import { siteConfig } from "@/config/site"
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react"

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState<string | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [mobileOpen])

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) {
        setMobileOpen(false)
        setMobileActiveDropdown(null)
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [mobileOpen])

  // Close dropdown when clicking outside (desktop only)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      let isInsideDropdown = false

      // Check if click is inside any dropdown
      Object.values(dropdownRefs.current).forEach((ref) => {
        if (ref && ref.contains(target)) {
          isInsideDropdown = true
        }
      })

      if (!isInsideDropdown) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const clearHoverTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  const setHoverTimeout = useCallback(() => {
    clearHoverTimeout()
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 100)
  }, [clearHoverTimeout])

  const handleDropdownHover = useCallback(
    (label: string, isEntering: boolean) => {
      if (isEntering) {
        clearHoverTimeout()
        setActiveDropdown(label)
      } else {
        setHoverTimeout()
      }
    },
    [clearHoverTimeout, setHoverTimeout],
  )

  const handleMobileMenuToggle = () => {
    setMobileOpen(!mobileOpen)
    setMobileActiveDropdown(null) // Reset mobile dropdown when toggling menu
  }

  const handleMobileDropdownToggle = (e: React.MouseEvent, label: string) => {
    e.preventDefault()
    e.stopPropagation()
    setMobileActiveDropdown(mobileActiveDropdown === label ? null : label)
  }

  const handleMobileLinkClick = () => {
    setMobileOpen(false)
    setMobileActiveDropdown(null)
  }

  const handleBackdropClick = () => {
    setMobileOpen(false)
    setMobileActiveDropdown(null)
  }

  return (
    <>
      <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-[#1a1a1f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group transition-transform duration-200 hover:scale-105">
              <div className="relative">
                <img
                  src="/logo.png"
                  alt={siteConfig.name}
                  className="h-12 w-auto transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-orange-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="text-white">
                <div className="font-bold text-3xl leading-none uppercase tracking-wider">
                  <span className="text-white">C2C</span> <span className="text-blue-400">Robotics</span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {siteConfig.navItems.map((link) => (
                <div key={link.label} className="relative">
                  {link.dropdown ? (
                    <div
                      ref={(el) => {
                        dropdownRefs.current[link.label] = el
                      }}
                      className="relative"
                      onMouseEnter={() => handleDropdownHover(link.label, true)}
                      onMouseLeave={() => handleDropdownHover(link.label, false)}
                    >
                      <Link
                        href={link.href}
                        className="flex items-center gap-1 px-4 py-2 text-white font-medium tracking-wide transition-all duration-200 hover:text-blue-400 group"
                      >
                        <span className="relative z-10">{link.label}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            activeDropdown === link.label ? "rotate-180" : ""
                          }`}
                        />
                        <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </Link>

                      {/* Desktop Dropdown Panel */}
                      <div
                        className={`absolute top-full left-0 w-64 transition-all duration-200 ${
                          activeDropdown === link.label
                            ? "opacity-100 translate-y-0 pointer-events-auto"
                            : "opacity-0 translate-y-1 pointer-events-none"
                        }`}
                        style={{ marginTop: "0px" }}
                      >
                        <div className="h-1 w-full" />
                        <div className="bg-[#2a2a35] rounded-xl shadow-2xl border border-white/10 overflow-hidden">
                          <div className="py-2">
                            {link.dropdown.map((item) => (
                              <Link
                                key={`${link.label}-${item.label}`}
                                href={
                                  link.label === "Classes & Camps"
                                    ? `/courses?tab=${item.tabId || item.href.split("/").pop()}`
                                    : item.href
                                }
                                className="block px-4 py-3 text-white hover:bg-white/10 hover:text-blue-400 transition-all duration-200 group/item"
                              >
                                <div className="font-medium">{item.label}</div>
                                {item.description && (
                                  <div className="text-sm text-gray-400 mt-1 group-hover/item:text-gray-300">
                                    {item.description}
                                  </div>
                                )}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Desktop Regular Menu Item
                    <Link
                      href={link.href}
                      className="relative px-4 py-2 text-white font-medium tracking-wide transition-all duration-200 hover:text-blue-400 group"
                    >
                      <span className="relative z-10">{link.label}</span>
                      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      <div className="absolute bottom-0 left-1/2 w-0 h-0.5 group-hover:w-full group-hover:left-0 transition-all duration-300" />
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden relative p-2 text-white hover:text-blue-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 rounded-lg z-50"
              onClick={handleMobileMenuToggle}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <div className="w-6 h-6 relative">
                <Menu
                  className={`absolute inset-0 transition-all duration-300 ${
                    mobileOpen ? "opacity-0 rotate-180 scale-75" : "opacity-100 rotate-0 scale-100"
                  }`}
                />
                <X
                  className={`absolute inset-0 transition-all duration-300 ${
                    mobileOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-180 scale-75"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={handleBackdropClick}
          aria-hidden="true"
        />

        {/* Menu Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-72 max-w-[85vw] bg-gradient-to-br from-[#1a1a1f] via-[#2a2a35] to-[#1a1a1f] shadow-2xl transform transition-all duration-300 ease-out ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Scrollable Content */}
          <div className="h-full overflow-y-auto overscroll-contain">
            <div className="flex flex-col min-h-full">
              {/* Navigation Links */}
              <div className="flex-1 px-4 py-6 pt-24">
                <nav className="space-y-2">
                  {siteConfig.navItems.map((link, index) => (
                    <div key={link.label} className="space-y-2">
                      {link.dropdown ? (
                        <>
                          <div className="flex items-center rounded-xl overflow-hidden">
                            {/* Main Link */}
                            <Link
                              href={link.href}
                              className="flex-1 px-4 py-4 text-white font-medium tracking-wide transition-all duration-200 hover:bg-white/10 hover:text-blue-400 active:scale-95"
                              onClick={handleMobileLinkClick}
                            >
                              <span className="text-left">{link.label}</span>
                            </Link>

                            {/* Dropdown Toggle Button */}
                            <button
                              className="px-3 py-4 text-white hover:bg-white/10 hover:text-blue-400 transition-all duration-200 active:scale-95"
                              onClick={(e) => handleMobileDropdownToggle(e, link.label)}
                              aria-expanded={mobileActiveDropdown === link.label}
                              aria-label={`Toggle ${link.label} dropdown`}
                            >
                              <ChevronRight
                                className={`w-5 h-5 transition-transform duration-300 ${
                                  mobileActiveDropdown === link.label ? "rotate-90" : ""
                                }`}
                              />
                            </button>
                          </div>

                          {/* Mobile Dropdown Items */}
                          <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${
                              mobileActiveDropdown === link.label ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                            }`}
                          >
                            <div className="pl-6 pr-2 space-y-1">
                              {link.dropdown.map((item, subIndex) => (
                                <Link
                                  key={`${link.label}-${item.label}`}
                                  href={
                                    link.label === "Classes & Camps"
                                      ? `/courses?tab=${item.tabId || item.href.split("/").pop()}`
                                      : item.href
                                  }
                                  className="block px-4 py-3 text-gray-300 hover:text-blue-400 hover:bg-white/5 rounded-lg transition-all duration-200 active:scale-95"
                                  onClick={handleMobileLinkClick}
                                  style={{
                                    animationDelay: mobileActiveDropdown === link.label ? `${subIndex * 50}ms` : "0ms",
                                  }}
                                >
                                  <div className="font-medium text-sm">{item.label}</div>
                                  {item.description && (
                                    <div className="text-xs text-gray-500 mt-1 leading-relaxed">{item.description}</div>
                                  )}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </>
                      ) : (
                        // Regular Mobile Menu Item
                        <Link
                          href={link.href}
                          className="block px-4 py-4 text-white font-medium tracking-wide rounded-xl transition-all duration-200 hover:bg-white/10 hover:text-blue-400 hover:translate-x-2 active:scale-95 group"
                          onClick={handleMobileLinkClick}
                          style={{
                            animationDelay: mobileOpen ? `${index * 100}ms` : "0ms",
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <span>{link.label}</span>
                          </div>
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-20" />
    </>
  )
}
