/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, Smartphone, PhoneCall } from "lucide-react";
import { BRAND_LOGO } from "../data";

interface HeaderProps {
  currentView: string;
  onViewChange: (view: string) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

export default function Header({ currentView, onViewChange, darkMode, setDarkMode }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Inicio", id: "home" },
    { label: "Servicios", id: "servicios" },
    { label: "Proyectos", id: "proyectos" },
    { label: "Suministros", id: "suministros" },
    { label: "Clientes", id: "minas" },
    { label: "Empleo", id: "empleo" },
    { label: "Nosotros", id: "nosotros" },
    { label: "Contacto", id: "contacto" }
  ];

  const handleNavItemClick = (id: string) => {
    onViewChange(id);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b backdrop-blur-md ${
        darkMode
          ? "bg-zinc-950/90 border-zinc-800/80 text-zinc-100 shadow-md"
          : "bg-white/95 border-zinc-200/80 text-iron-grey shadow-sm"
      }`}
    >
      <nav className="flex justify-between items-center h-22 px-4 md:px-6 xl:px-8 max-w-7xl mx-auto w-full">
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavItemClick("home")}
          className="flex items-center gap-2 md:gap-3 cursor-pointer group"
        >
          <img
            alt="Sintomec Logo"
            className="h-10 md:h-11 w-auto transition-all"
            src={BRAND_LOGO}
            referrerPolicy="no-referrer"
          />
          <div className="hidden lg:block xl:block">
            <span className={`font-display font-black text-base xl:text-lg tracking-wider block leading-none transition-colors ${
              darkMode ? "text-white" : "text-iron-grey"
            }`}>
              SINTOMEC
            </span>
            <span className="font-mono text-[9px] uppercase tracking-widest block text-safety-orange font-bold mt-0.5">
              Ingeniería Minera
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden xl:flex gap-3 xl:gap-5 2xl:gap-6 items-center">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => handleNavItemClick(item.id)}
                className={`text-slate-2 font-mono uppercase tracking-wider text-xs md:text-[11px] xl:text-xs font-bold transition-all relative py-2 border-b-2 hover:text-safety-orange cursor-pointer ${
                  isActive
                    ? "text-safety-orange border-safety-orange"
                    : darkMode
                    ? "text-zinc-300 border-transparent hover:border-zinc-300"
                    : "text-zinc-700 border-transparent hover:border-zinc-900"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Dark Mode, Contact Quick info & Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Theme Toggle Button */}
          <button
            id="theme-toggle"
            aria-label="Toggle dark mode"
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-md cursor-pointer transition-colors ${
              darkMode
                ? "text-zinc-300 hover:bg-zinc-800"
                : "text-zinc-700 hover:bg-zinc-100"
            }`}
          >
            {darkMode ? <Sun size={18} className="text-amber-500 animate-[spin_8s_linear_infinite]" /> : <Moon size={18} />}
          </button>

          {/* ISO 9001 badge mini */}
          <div className="hidden md:flex flex-col text-right font-mono text-[9px] leading-tight">
            <span className={darkMode ? "text-zinc-400" : "text-zinc-500"}>ISO 9001</span>
            <span className="text-emerald-500 dark:text-emerald-400 font-black">CERTIFICADO</span>
          </div>

          {/* Call-to-Action */}
          <button
            id="quote-cta-btn"
            onClick={() => handleNavItemClick("contacto")}
            className="hidden sm:inline-flex bg-safety-orange hover:bg-safety-orange/95 text-white px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 hover:shadow-lg hover:shadow-safety-orange/20 cursor-pointer active:scale-95 items-center gap-1.5 rounded-sm"
          >
            <PhoneCall size={12} />
            Cotizar
          </button>

          {/* Hamburger Mobile Menu Toggle */}
          <button
            id="hamburger-btn"
            aria-label="Toggle navigation menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`xl:hidden p-2 rounded-md cursor-pointer ${
              darkMode
                ? "text-zinc-300 hover:bg-zinc-800"
                : "text-zinc-700 hover:bg-zinc-100"
            }`}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 absolute top-full left-0 w-full shadow-2xl transition-all duration-300">
          <div className="px-6 py-6 space-y-3 flex flex-col">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleNavItemClick(item.id)}
                  className={`text-left py-3 px-4 rounded font-mono uppercase tracking-widest text-xs font-bold border-l-4 transition-all cursor-pointer ${
                    isActive
                      ? "bg-safety-orange/10 border-safety-orange text-safety-orange"
                      : "border-transparent text-iron-grey dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex flex-col gap-4">
              <div className="flex justify-between items-center px-4">
                <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">Sello de Calidad</span>
                <span className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 px-2 py-1 rounded text-[10px] font-mono font-bold tracking-widest">
                  ISO 9001:2015
                </span>
              </div>
              <button
                id="mobile-quote-cta-btn"
                onClick={() => handleNavItemClick("contacto")}
                className="w-full bg-safety-orange text-white text-center py-4 font-mono uppercase font-bold text-xs tracking-wider cursor-pointer shadow-lg shadow-safety-orange/20"
              >
                Solicitar Cotización de Emergencia
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
