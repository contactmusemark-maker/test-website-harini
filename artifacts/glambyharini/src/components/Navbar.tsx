import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navigateTo, type PortalRoute } from '@/lib/portal-route';
import { SERVICE_PAGES, pathForService } from '@/seo/seo';

const INSTAGRAM_URL = 'https://www.instagram.com/glam_byharini/';

type NavLink = {
  name: string;
  href: string;
  external?: boolean;
  highlight?: boolean;
  instagram?: boolean;
  login?: boolean;
  route?: boolean;
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const leftNavLinks: NavLink[] = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Blogs', href: '#blogs' },
  ];

  const rightNavLinks: NavLink[] = [
    { name: 'Instagram', href: INSTAGRAM_URL, external: true, instagram: true },
    { name: 'Login', href: '/login', route: true, login: true },
    { name: 'Book Now', href: '/booking', highlight: true, route: true },
  ];

  const mobileNavLinks: NavLink[] = [
    { name: 'Home', href: '#hero' },
    ...leftNavLinks,
    ...rightNavLinks,
  ];

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    navigateTo('/');
    window.setTimeout(() => {
      document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  return (
    <header className={`fixed inset-x-0 top-0 z-50 w-full max-w-full transition-all duration-500 ${scrolled ? 'py-3' : 'py-5 md:py-6'}`}>
      <div className="mx-auto grid min-h-20 w-[min(100%_-_32px,92rem)] grid-cols-[1fr_auto] items-center gap-4 rounded-full bg-[#080808] px-4 py-3 text-white shadow-[0_18px_60px_rgba(0,0,0,0.22)] md:px-6 lg:grid-cols-[1fr_auto_1fr]">
        <a href="#hero" onClick={(e) => { e.preventDefault(); scrollTo('#hero'); }} className="flex min-w-0 items-center lg:col-start-2">
          <img
            src="/assets/header_logo_black_bg_1779783577490.png"
            alt="GlamByHarini"
            loading="eager"
            decoding="async"
            className="h-9 w-auto object-contain sm:h-10"
          />
        </a>

        {/* Desktop Nav */}
        <nav className="order-first col-start-1 hidden min-h-12 min-w-0 items-center justify-start gap-4 lg:flex xl:gap-6">
          {leftNavLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
              className="flex min-h-12 items-center whitespace-nowrap text-sm font-mono uppercase leading-none tracking-[0.18em] text-white/68 transition-colors hover:text-white"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <nav className="col-start-3 hidden min-h-12 min-w-0 items-center justify-end gap-3 lg:flex xl:gap-5">
          {rightNavLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              onClick={(e) => {
                if (link.external) return;
                if (link.route) {
                  e.preventDefault();
                  navigateTo(link.href as PortalRoute);
                  return;
                }
                e.preventDefault();
                scrollTo(link.href);
              }}
              className={`whitespace-nowrap font-mono uppercase leading-none transition-colors ${
                link.highlight
                  ? 'flex min-h-12 items-center rounded-full bg-primary px-5 py-2 text-sm tracking-[0.14em] text-primary-foreground hover:bg-accent'
                  : link.instagram
                    ? 'flex min-h-12 items-center rounded-full border border-primary/35 bg-primary/15 px-5 py-2 text-sm tracking-[0.14em] text-[#f4c4c8] hover:border-primary/55 hover:bg-primary/25 hover:text-white'
                  : link.login
                    ? 'flex min-h-12 items-center rounded-full border border-white/18 bg-white/10 px-5 py-2 text-sm tracking-[0.14em] text-white hover:border-white/35 hover:bg-white/16'
                  : 'flex min-h-12 items-center text-sm tracking-[0.18em] text-white/68 hover:text-white'
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button className="ml-auto flex min-h-10 min-w-10 shrink-0 items-center justify-center text-white lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle navigation">
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute left-4 right-4 top-full mt-3 flex max-h-[calc(100dvh-5.5rem)] flex-col items-stretch gap-2 overflow-y-auto rounded-3xl border border-white/10 bg-[#080808]/95 px-4 py-5 shadow-xl backdrop-blur-xl lg:hidden"
          >
            {mobileNavLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                onClick={(e) => {
                  if (link.external) {
                    setMobileMenuOpen(false);
                    return;
                  }
                  if (link.route) {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    navigateTo(link.href as PortalRoute);
                    return;
                  }
                  e.preventDefault();
                  scrollTo(link.href);
                }}
                className={`flex min-h-11 w-full items-center justify-center rounded-xl transition-colors ${
                  link.highlight
                    ? 'bg-primary font-mono text-xs uppercase tracking-[0.16em] text-primary-foreground hover:bg-accent'
                    : link.instagram
                      ? 'border border-primary/35 bg-primary/15 font-mono text-xs uppercase tracking-[0.16em] text-[#f4c4c8] hover:bg-primary/25'
                    : link.login
                      ? 'border border-white/18 bg-white/10 font-mono text-xs uppercase tracking-[0.16em] text-white hover:bg-white/16'
                    : 'text-lg font-serif text-white hover:bg-white/10'
                }`}
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
