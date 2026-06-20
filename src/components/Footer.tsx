/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { MapPin, Phone, Mail, Share2, Award, ArrowUp } from "lucide-react";
import { BRAND_LOGO } from "../data";

interface FooterProps {
  onViewChange: (view: string) => void;
}

export default function Footer({ onViewChange }: FooterProps) {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLinkClick = (viewId: string) => {
    onViewChange(viewId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="main-footer" className="bg-[#101111] dark:bg-[#080909] text-white pt-24 pb-12 border-t-4 border-safety-orange transition-colors">
      <div className="px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 xl:gap-16 mb-20">
          
          {/* Brand Presentation */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img
                alt="Sintomec"
                className="h-10 w-auto brightness-0 invert"
                src={BRAND_LOGO}
                referrerPolicy="no-referrer"
              />
              <div>
                <span className="font-display font-black text-lg tracking-wider block">
                  SINTOMEC
                </span>
                <span className="font-mono text-[9px] uppercase tracking-widest block text-safety-orange">
                  Ingeniería de Transmisión
                </span>
              </div>
            </div>
            
            <p className="text-zinc-400 font-sans text-sm leading-relaxed">
              Ingeniería de clase mundial desde el corazón minero de Chile. Especialistas en soluciones de transmisión de potencia mecánica y servicios de alta exigencia.
            </p>
            
            <div className="flex gap-3 pt-2">
              <button
                id="footer-share-btn"
                aria-label="Compartir enlace"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'Sintomec Ingeniería',
                      text: 'He encontrado esta landing industrial excelente.',
                      url: window.location.href,
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert("¡Enlace copiado al portapapeles!");
                  }
                }}
                className="w-10 h-10 rounded-sm border border-zinc-800 flex items-center justify-center hover:bg-safety-orange hover:text-white transition-colors cursor-pointer text-zinc-400"
              >
                <Share2 size={16} />
              </button>
              <a
                id="footer-mail-btn"
                aria-label="Enviar correo"
                href="mailto:finanzas@sintomec.cl"
                className="w-10 h-10 rounded-sm border border-zinc-800 flex items-center justify-center hover:bg-safety-orange hover:text-white transition-colors text-zinc-400"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Links: Services */}
          <div className="space-y-6">
            <h4 className="text-safety-orange font-mono font-bold uppercase text-xs tracking-[0.2em] relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-safety-orange">
              Servicios Especializados
            </h4>
            <ul className="space-y-3 font-sans text-sm">
              <li>
                <button
                  onClick={() => handleLinkClick("servicios")}
                  className="text-zinc-400 hover:text-safety-orange transition-colors font-medium text-left cursor-pointer"
                >
                  Fábrica Maestranza & Tornillo
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick("servicios")}
                  className="text-zinc-400 hover:text-safety-orange transition-colors font-medium text-left cursor-pointer"
                >
                  Metalizados por Arco Eléctrico
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick("servicios")}
                  className="text-zinc-400 hover:text-safety-orange transition-colors font-medium text-left cursor-pointer"
                >
                  Overhaul de Cajas Reductoras
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick("suministros")}
                  className="text-zinc-400 hover:text-safety-orange transition-colors font-medium text-left cursor-pointer"
                >
                  Catálogo de Suministros Críticos
                </button>
              </li>
            </ul>
          </div>

          {/* Links: Resources & Support */}
          <div className="space-y-6">
            <h4 className="text-safety-orange font-mono font-bold uppercase text-xs tracking-[0.2em] relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-safety-orange">
              Soporte Corporativo
            </h4>
            <ul className="space-y-3 font-sans text-sm">
              <li>
                <button
                  onClick={() => handleLinkClick("empleo")}
                  className="text-zinc-400 hover:text-safety-orange transition-colors font-medium text-left cursor-pointer"
                >
                  Postulaciones y Vacantes
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick("minas")}
                  className="text-zinc-400 hover:text-safety-orange transition-colors font-medium text-left cursor-pointer"
                >
                  Nuestros Clientes Mineros
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick("nosotros")}
                  className="text-zinc-400 hover:text-safety-orange transition-colors font-medium text-left cursor-pointer"
                >
                  Seguridad Industrial HSEC
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick("contacto")}
                  className="text-zinc-400 hover:text-safety-orange transition-colors font-medium text-left cursor-pointer"
                >
                  Preguntas Frecuentes (FAQs)
                </button>
              </li>
            </ul>
          </div>

          {/* Location & Contacts */}
          <div className="space-y-6">
            <h4 className="text-safety-orange font-mono font-bold uppercase text-xs tracking-[0.2em] relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-safety-orange">
              Ubicación y Planta
            </h4>
            <div className="space-y-4 text-sm text-zinc-400 font-sans">
              <div className="flex gap-3">
                <MapPin size={22} className="text-safety-orange flex-shrink-0" />
                <p className="leading-snug">
                  Sector Industrial Norte, Manzana F-12, Antofagasta, Chile.
                </p>
              </div>
              <div className="flex gap-3">
                <Phone size={16} className="text-safety-orange flex-shrink-0" />
                <a href="tel:+56552428800" className="hover:text-safety-orange transition-colors">
                  +56 55 242 8800
                </a>
              </div>
              <div className="flex gap-3">
                <Mail size={16} className="text-safety-orange flex-shrink-0" />
                <a href="mailto:finanzas@sintomec.cl" className="hover:text-safety-orange transition-colors">
                  finanzas@sintomec.cl
                </a>
              </div>
              <div className="flex gap-2 items-center text-xs font-mono py-1 px-2.5 bg-zinc-900 border border-zinc-800 text-zinc-400 rounded-sm w-fit mt-1">
                <Award size={12} className="text-safety-orange" />
                PROVEEDOR: Homologado
              </div>
            </div>
          </div>

        </div>

        {/* Separator */}
        <div className="pt-12 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6 text-zinc-500 font-mono text-[10px] tracking-widest font-bold">
          
          <p className="uppercase text-center md:text-left">
            © {new Date().getFullYear()} SINTOMEC INGENIERÍA S.A. ANTOFAGASTA, CHILE. TODOS LOS DERECHOS RESERVADOS.
          </p>
          
          <div className="flex items-center gap-6">
            <span className="uppercase block">CERTIFIED ISO 9001:2015</span>
            
            {/* Scroll back to top */}
            <button
              id="to-top-btn"
              aria-label="Desplazarse arriba"
              onClick={handleScrollToTop}
              className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 hover:border-safety-orange hover:text-safety-orange transition-colors flex items-center justify-center cursor-pointer"
            >
              <ArrowUp size={14} />
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
}
