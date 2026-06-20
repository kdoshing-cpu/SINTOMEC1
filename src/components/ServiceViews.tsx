/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { SERVICES } from "../data";
import { ServiceItem } from "../types";
import { Download, Wrench, Shield, Compass, FileText, CheckCircle2, ChevronRight, Calculator } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ServiceViewsProps {
  initialServiceId?: string;
  onContactRequest: (serviceName: string) => void;
}

export default function ServiceViews({ initialServiceId = "mecanica", onContactRequest }: ServiceViewsProps) {
  const [activeTab, setActiveTab] = useState<string>(initialServiceId);

  const activeService = SERVICES.find((s) => s.id === activeTab) || SERVICES[0];

  const handleDownload = (fileName: string) => {
    alert(`Iniciando descarga simulada del brochure técnico: ${fileName}. En un servidor real, esto descargará un PDF comercial certificado por SINTOMEC.`);
  };

  return (
    <div id="services-component" className="py-12 bg-zinc-50 dark:bg-zinc-900/30 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Tabs for Services */}
        <div className="flex flex-wrap md:flex-nowrap gap-3 mb-12 border-b border-zinc-200 dark:border-zinc-800 pb-4">
          {SERVICES.map((srv) => {
            const isActive = srv.id === activeTab;
            return (
              <button
                key={srv.id}
                id={`tab-btn-${srv.id}`}
                onClick={() => setActiveTab(srv.id)}
                className={`flex-1 min-w-[200px] text-left p-5 border cursor-pointer transition-all ${
                  isActive
                    ? "bg-white dark:bg-zinc-900 border-t-4 border-t-safety-orange border-x-zinc-200 dark:border-x-zinc-800 shadow-md text-iron-grey dark:text-zinc-100"
                    : "bg-zinc-100/50 dark:bg-zinc-900/50 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 border-transparent text-zinc-500 dark:text-zinc-400"
                } rounded-sm`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2.5 rounded-sm ${isActive ? "bg-safety-orange text-white" : "bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"}`}>
                    {srv.id === "mecanica" && <Wrench size={20} />}
                    {srv.id === "metalizados" && <Shield size={20} />}
                    {srv.id === "maestranza" && <Compass size={20} />}
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-sm uppercase tracking-wider block">
                      {srv.title}
                    </h3>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-400">
                      Capacidad Técnica
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Detail Panel with Transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white dark:bg-zinc-900 p-6 md:p-12 border border-zinc-200 dark:border-zinc-800/80 shadow-xl rounded-sm"
          >
            {/* Left: General Info and Image */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <span className="text-safety-orange font-mono font-bold text-xs uppercase tracking-[0.3em] block">
                  SINTOMEC DIVISIONAL CRÍTICA
                </span>
                <h2 className="font-display font-black text-3xl md:text-4xl text-iron-grey dark:text-white uppercase leading-tight">
                  {activeService.title}
                </h2>
                <p className="text-zinc-600 dark:text-zinc-300 font-sans text-base leading-relaxed">
                  {activeService.longDescription}
                </p>
              </div>

              {/* Service Specs Checklist */}
              <div className="space-y-4">
                <h4 className="font-mono text-xs uppercase font-bold tracking-widest text-iron-grey dark:text-zinc-300 border-l-2 border-safety-orange pl-3">
                  Especificaciones y Alcine Técnico
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeService.specs.map((spec, idx) => (
                    <div key={idx} className="flex gap-3 items-start">
                      <CheckCircle2 size={16} className="text-safety-orange flex-shrink-0 mt-1" />
                      <span className="text-sm text-zinc-600 dark:text-zinc-400 leading-snug">
                        {spec}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Brands we service if existing */}
              {activeService.brands && (
                <div className="space-y-3 pt-3">
                  <h4 className="font-mono text-[10px] uppercase font-bold tracking-widest text-zinc-400">
                    Soporte e Intervención Multimarca Autorizada
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeService.brands.map((brand) => (
                      <span
                        key={brand}
                        className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-iron-grey dark:text-zinc-300 px-3 py-1 text-xs font-mono rounded-sm"
                      >
                        {brand}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-6 border-t border-zinc-100 dark:border-zinc-900">
                <button
                  id={`quote-service-btn-${activeService.id}`}
                  onClick={() => onContactRequest(activeService.title)}
                  className="flex-1 sm:flex-initial bg-safety-orange hover:bg-safety-orange/90 text-white font-mono font-bold text-xs uppercase tracking-widest px-8 py-4 cursor-pointer transition-colors flex items-center justify-center gap-2 rounded-[2px]"
                >
                  <Calculator size={14} />
                  Solicitar Cotización de Área
                </button>
                <button
                  id="download-brochure-btn"
                  onClick={() => handleDownload(activeService.downloadPdf)}
                  className="flex-1 sm:flex-initial border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-iron-grey dark:text-zinc-300 font-mono font-bold text-xs uppercase tracking-widest px-8 py-4 cursor-pointer transition-colors flex items-center justify-center gap-2 rounded-[2px]"
                >
                  <Download size={14} />
                  Descargar Dossier PDF
                </button>
              </div>
            </div>

            {/* Right: Steps of Process & Component Photo */}
            <div className="lg:col-span-5 space-y-8">
              {/* Image box with Orange indicator border */}
              <div className="relative aspect-video lg:aspect-square overflow-hidden border-t-4 border-safety-orange bg-zinc-900 group">
                <img
                  alt={activeService.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                  src={activeService.image}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent p-6 flex flex-col justify-end">
                  <span className="text-safety-orange font-mono text-[9px] uppercase tracking-widest font-extrabold mb-1">
                    Operación Certificada
                  </span>
                  <p className="text-white text-sm font-display font-semibold">
                    Planta Técnica de Recuperación - Antofagasta
                  </p>
                </div>
              </div>

              {/* Process Map Vertical */}
              <div className="space-y-5 bg-zinc-50 dark:bg-zinc-900/40 p-6 border border-zinc-200 dark:border-zinc-800 rounded-sm">
                <h4 className="font-mono text-xs uppercase font-extrabold tracking-widest text-iron-grey dark:text-zinc-200">
                  Flujo de Trabajo Operativo
                </h4>
                <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1px] before:bg-zinc-300 dark:before:bg-zinc-700">
                  {activeService.process.slice(0, 3).map((procStep, stepIndex) => (
                    <div key={stepIndex} className="relative space-y-1">
                      {/* Indicator dot */}
                      <span className="absolute -left-[22px] top-1.5 w-3.5 h-3.5 rounded-full bg-safety-orange border-2 border-white dark:border-zinc-950 flex items-center justify-center text-[8px] font-bold text-white shadow-sm" />
                      <h5 className="font-display font-extrabold text-xs uppercase tracking-wide text-iron-grey dark:text-zinc-200">
                        Fase 0{stepIndex + 1}: {procStep.split(" ")[0]}
                      </h5>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 font-sans leading-relaxed">
                        {procStep}
                      </p>
                    </div>
                  ))}
                  <div className="pl-0 pt-1">
                    <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 italic block">
                      * El flujo técnico completo consta de {activeService.process.length} etapas registradas en Dossier de Calidad.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
}
