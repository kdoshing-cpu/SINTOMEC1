/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { CASE_STUDIES } from "../data";
import { CaseStudy } from "../types";
import { CheckCircle2, AlertTriangle, Lightbulb, Target } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ProjectViewsProps {
  onContactWithContext: (projectName: string) => void;
}

export default function ProjectViews({ onContactWithContext }: ProjectViewsProps) {
  const [filter, setFilter] = useState<string>("todos");
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  const filteredCases = filter === "todos"
    ? CASE_STUDIES
    : CASE_STUDIES.filter((c) => c.area === filter);

  return (
    <div id="projects-view-component" className="py-20 bg-zinc-50 dark:bg-zinc-900/30 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header and Filter Switches */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4">
            <span className="text-safety-orange font-mono font-bold text-xs uppercase tracking-[0.3em] block">
              PORTAFOLIO DE PRECISIÓN MILITAR
            </span>
            <h2 className="font-display font-black text-3xl md:text-4xl text-iron-grey dark:text-white uppercase leading-tight">
              Casos de Éxito & Soluciones
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 font-sans max-w-xl">
              Nuestros ingenieros operan en plazos récord bajo altísima presión técnica. Revise algunos informes abreviados de nuestras intervenciones reales.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 font-mono text-xs">
            {["todos", "mecanica", "metalizados", "maestranza"].map((opt) => (
              <button
                key={opt}
                id={`filter-btn-${opt}`}
                onClick={() => setFilter(opt)}
                className={`px-5 py-2.5 rounded-sm font-bold uppercase tracking-wider cursor-pointer border transition-all ${
                  filter === opt
                    ? "bg-iron-grey dark:bg-zinc-100 dark:text-iron-grey text-white border-iron-grey dark:border-white shadow-md shadow-zinc-400/20"
                    : "bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800"
                }`}
              >
                {opt === "todos" ? "Ver Todos" : opt === "mecanica" ? "Área Mecánica" : opt === "metalizados" ? "Metalizados" : "Maestranza"}
              </button>
            ))}
          </div>
        </div>

        {/* Bento/Grid Layout for Case Studies */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredCases.map((cs) => (
              <motion.div
                key={cs.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 shadow-md hover:shadow-xl transition-all duration-300 rounded-sm overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Photo area */}
                  <div className="relative h-56 overflow-hidden bg-zinc-900">
                    <img
                      alt={cs.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      src={cs.image}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 bg-safety-orange text-white px-3 py-1 font-mono text-[9px] uppercase tracking-widest font-bold rounded-sm">
                      {cs.tag}
                    </div>
                  </div>

                  {/* Copy content */}
                  <div className="p-6 md:p-8 space-y-4">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-400 dark:text-zinc-500 block">
                      {cs.area === "mecanica" ? "Ingeniería Mecánica" : cs.area === "metalizados" ? "Metalizado de Precisión" : "Servicios de Maestranza"}
                    </span>
                    <h3 className="font-display font-extrabold text-xl text-iron-grey dark:text-zinc-100 uppercase tracking-tight group-hover:text-safety-orange transition-colors min-h-[56px] leading-[1.2]">
                      {cs.title}
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans">
                      {cs.description}
                    </p>
                  </div>
                </div>

                {/* Footer specs / CTA buttons */}
                <div className="px-6 pb-6 pt-4 border-t border-zinc-100 dark:border-zinc-900 flex justify-between items-center bg-zinc-50/50 dark:bg-zinc-900/10">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block">
                      {cs.metricLabel}
                    </span>
                    <span className="text-xl font-display font-extrabold text-safety-orange">
                      {cs.metricValue}
                    </span>
                  </div>
                  <button
                    id={`open-study-btn-${cs.id}`}
                    onClick={() => setSelectedCase(cs)}
                    className="bg-iron-grey hover:bg-safety-orange text-white dark:bg-zinc-900 dark:hover:bg-safety-orange rounded-sm text-xs font-mono font-bold uppercase tracking-widest px-4 py-2.5 transition-colors cursor-pointer"
                  >
                    Examinar Diagnóstico
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Lightbox / Modal for Complete Case Study diagnostics */}
        <AnimatePresence>
          {selectedCase && (
            <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-sm max-w-4xl w-full shadow-2xl overflow-hidden focus:outline-none"
              >
                {/* Header Photo */}
                <div className="relative h-64 md:h-80 bg-zinc-900">
                  <img
                    alt={selectedCase.title}
                    className="w-full h-full object-cover"
                    src={selectedCase.image}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent p-6 md:p-8 flex flex-col justify-end">
                    <span className="text-safety-orange font-mono text-xs uppercase tracking-[0.22em] font-extrabold mb-1">
                      {selectedCase.tag}
                    </span>
                    <h3 className="text-white text-2xl md:text-3xl font-display font-black uppercase leading-tight md:max-w-2xl">
                      {selectedCase.title}
                    </h3>
                  </div>
                  <button
                    id="close-modal-x"
                    onClick={() => setSelectedCase(null)}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center cursor-pointer transition-colors"
                  >
                    ✕
                  </button>
                </div>

                {/* Diagnostics details */}
                <div className="p-6 md:p-10 space-y-8 max-h-[60vh] overflow-y-auto no-scrollbar">
                  
                  {/* Problem Column */}
                  <div className="flex gap-4 items-start pb-6 border-b border-zinc-100 dark:border-zinc-900">
                    <div className="p-3 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 rounded-sm flex-shrink-0">
                      <AlertTriangle size={24} />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-display font-extrabold text-sm uppercase tracking-wider text-iron-grey dark:text-zinc-200">
                        01. Problema Identificado en Faena
                      </h4>
                      <p className="text-zinc-600 dark:text-zinc-400 font-sans text-sm leading-relaxed">
                        {selectedCase.problem}
                      </p>
                    </div>
                  </div>

                  {/* Solution Column */}
                  <div className="flex gap-4 items-start pb-6 border-b border-zinc-100 dark:border-zinc-900">
                    <div className="p-3 bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 rounded-sm flex-shrink-0">
                      <Lightbulb size={24} />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-display font-extrabold text-sm uppercase tracking-wider text-iron-grey dark:text-zinc-200">
                        02. Protocolo de Reparación / Reingeniería
                      </h4>
                      <p className="text-zinc-600 dark:text-zinc-400 font-sans text-sm leading-relaxed">
                        {selectedCase.solution}
                      </p>
                    </div>
                  </div>

                  {/* Result Column */}
                  <div className="flex gap-4 items-start pb-6">
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 rounded-sm flex-shrink-0">
                      <Target size={24} />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-display font-extrabold text-sm uppercase tracking-wider text-iron-grey dark:text-zinc-200">
                        03. Resultados & Auditoría de Operación
                      </h4>
                      <p className="text-zinc-600 dark:text-zinc-400 font-sans text-sm leading-relaxed">
                        {selectedCase.result}
                      </p>
                    </div>
                  </div>

                  {/* Metric highlights */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-zinc-50 dark:bg-zinc-900 p-6 rounded-sm border border-zinc-200 dark:border-zinc-800">
                    <div>
                      <span className="text-xs font-mono text-zinc-500 block uppercase">
                        Sello Aseguramiento
                      </span>
                      <p className="font-display font-extrabold text-zinc-800 dark:text-zinc-100 text-sm py-1">
                        Trazabilidad garantizada bajo ISO 9001
                      </p>
                    </div>
                    <div className="flex flex-col justify-center md:items-end">
                      <span className="text-[10px] font-mono text-zinc-500 block uppercase tracking-wider">
                        Indicador de Impacto
                      </span>
                      <p className="font-display font-black text-3xl text-safety-orange leading-tight">
                        {selectedCase.metricValue} ({selectedCase.metricLabel})
                      </p>
                    </div>
                  </div>

                </div>

                {/* Actions */}
                <div className="bg-zinc-100 dark:bg-zinc-900 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 text-center sm:text-left">
                    ¿Requiere un diagnóstico similar para sus transmisiones?
                  </span>
                  <div className="flex gap-3 w-full sm:w-auto">
                    <button
                      id="close-modal-btn"
                      onClick={() => setSelectedCase(null)}
                      className="flex-1 sm:flex-none border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-iron-grey dark:text-zinc-300 font-mono text-xs font-bold uppercase tracking-widest px-5 py-3 cursor-pointer rounded-sm"
                    >
                      Cerrar Ventana
                    </button>
                    <button
                      id={`quote-case-btn-${selectedCase.id}`}
                      onClick={() => {
                        onContactWithContext(`Caso de éxito: ${selectedCase.title}`);
                        setSelectedCase(null);
                      }}
                      className="flex-1 sm:flex-none bg-safety-orange hover:bg-safety-orange/90 text-white font-mono text-xs font-bold uppercase tracking-widest px-5 py-3 cursor-pointer rounded-sm"
                    >
                      Solicitar Asistencia
                    </button>
                  </div>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
