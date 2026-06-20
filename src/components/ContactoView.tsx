/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from "react";
import { FAQS } from "../data";
import { MapPin, Phone, Mail, Clock, ShieldCheck, ChevronDown, ChevronUp, AlertCircle, Send, Check, Upload } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ContactoViewProps {
  preselectedService?: string;
}

export default function ContactoView({ preselectedService = "" }: ContactoViewProps) {
  const [activeFaq, setActiveFaq] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Form fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+56 9 ");
  const [company, setCompany] = useState("");
  const [serviceArea, setServiceArea] = useState(preselectedService || "mecanica");
  const [description, setDescription] = useState("");
  const [faena, setFaena] = useState("centinela");
  const [urgency, setUrgency] = useState("inmediato");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleFaq = (faqId: string) => {
    setActiveFaq(activeFaq === faqId ? null : faqId);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (validateFile(droppedFile)) {
        setFile(droppedFile);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
      }
    }
  };

  const validateFile = (file: File): boolean => {
    const isUnderMaxSize = file.size <= 15 * 1024 * 1024; // 15MB for heavy blueprints
    if (!isUnderMaxSize) {
      alert("El limite máximo para planos o planos CAD en el formulario es de 15 Megabytes.");
      return false;
    }
    return true;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !company || !description) {
      alert("Por favor, rellene todos los campos obligatorios para enviar su solicitud técnica.");
      return;
    }
    setFormSubmitted(true);
  };

  const resetForm = () => {
    setFullName("");
    setEmail("");
    setPhone("+56 9 ");
    setCompany("");
    setDescription("");
    setFile(null);
    setFormSubmitted(false);
  };

  return (
    <div id="contact-component" className="py-20 bg-zinc-50 dark:bg-zinc-900/30 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Intro */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <span className="text-safety-orange font-mono font-bold text-xs uppercase tracking-[0.3em] block">
            CENTRAL DE REQUERIMIENTOS 24/7
          </span>
          <h2 className="font-display font-black text-3xl md:text-5xl text-iron-grey dark:text-white uppercase leading-tight">
            Planifique su Intervención Técnica
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 font-sans text-sm max-w-xl mx-auto">
            Ingrese sus datos, seleccione su nivel de urgencia y cargue sus planos o antecedentes. Nos contactaremos con usted en un plazo inferior a 2 horas laborables.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16">
          
          {/* Left Block: Contact Details & FAQs */}
          <div className="lg:col-span-5 space-y-10">
            
            {/* Quick Contact Cards */}
            <div className="space-y-4">
              <h3 className="font-display font-extrabold text-lg text-iron-grey dark:text-zinc-100 uppercase tracking-tight relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-safety-orange">
                Canales Corporativos
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {/* Mail */}
                <div className="bg-white dark:bg-zinc-900 p-5 border border-zinc-200 dark:border-zinc-800 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-sm bg-safety-orange/10 text-safety-orange flex items-center justify-center flex-shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">Consultas Generales</span>
                    <a href="mailto:finanzas@sintomec.cl" className="text-sm font-sans font-bold text-iron-grey dark:text-zinc-200 hover:text-safety-orange">
                      finanzas@sintomec.cl
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="bg-white dark:bg-zinc-900 p-5 border border-zinc-200 dark:border-zinc-800 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-sm bg-safety-orange/10 text-safety-orange flex items-center justify-center flex-shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">Central Telefónica</span>
                    <a href="tel:+56552428800" className="text-sm font-sans font-bold text-iron-grey dark:text-zinc-200 hover:text-safety-orange">
                      +56 55 242 8800
                    </a>
                  </div>
                </div>

                {/* Operations Time */}
                <div className="bg-white dark:bg-zinc-900 p-5 border border-zinc-200 dark:border-zinc-800 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-sm bg-safety-orange/10 text-safety-orange flex items-center justify-center flex-shrink-0">
                    <Clock size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">Horario de Oficina</span>
                    <p className="text-sm font-sans font-bold text-iron-grey dark:text-zinc-200">
                      Lun - Vie: 08:00 - 18:00 hrs
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Expansible technical FAQs */}
            <div className="space-y-4">
              <h3 className="font-display font-extrabold text-lg text-iron-grey dark:text-zinc-100 uppercase tracking-tight relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-safety-orange animate-pulse">
                Preguntas Frecuentes
              </h3>

              <div className="space-y-3">
                {FAQS.slice(0, 4).map((faq) => {
                  const isOpen = faq.id === activeFaq;
                  return (
                    <div
                      key={faq.id}
                      className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 transition-all"
                    >
                      <button
                        id={`faq-toggle-${faq.id}`}
                        onClick={() => toggleFaq(faq.id)}
                        className="w-full flex justify-between items-center text-left cursor-pointer"
                      >
                        <span className="font-display font-extrabold text-xs text-iron-grey dark:text-zinc-200 uppercase tracking-tight">
                          {faq.question}
                        </span>
                        {isOpen ? <ChevronUp size={16} className="text-safety-orange" /> : <ChevronDown size={16} />}
                      </button>

                      {isOpen && (
                        <div className="mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-900 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Block: Quotation smart form */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-zinc-900 p-6 md:p-10 border border-zinc-200 dark:border-zinc-800 shadow-xl rounded-sm">
              
              {formSubmitted ? (
                <div className="text-center py-12 space-y-6 animate-[fadeIn_0.4s_ease-out]">
                  <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <Check size={32} />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-display font-black text-2xl text-[#101111] dark:text-white uppercase">
                      ¡Requerimiento Ingresado!
                    </h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-sans max-w-md mx-auto leading-relaxed">
                      La central de estimaciones técnicas de SINTOMEC ha generado el código de cotización única. Se ha enviado un correo con el acuse de recibo y un asesor del Área divisional respectiva le contactará a la brevedad.
                    </p>
                  </div>
                  <div className="pt-4 flex justify-center gap-4">
                    <button
                      id="reset-quote-form-btn"
                      onClick={resetForm}
                      className="bg-safety-orange hover:bg-safety-orange/90 text-white font-mono font-bold text-xs uppercase tracking-widest px-8 py-3.5 cursor-pointer rounded-sm"
                    >
                      Solicitar Nueva Cotización
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6 text-xs text-iron-grey dark:text-zinc-200">
                  
                  <div className="space-y-1">
                    <h3 className="font-display font-black text-xl text-iron-grey dark:text-white uppercase">
                      Ficha de Cotización Industrial
                    </h3>
                    <p className="text-xs text-zinc-400 font-sans">
                      Los campos marcados con (*) son estrictamente obligatorios de proveer.
                    </p>
                  </div>

                  {/* Name and email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1.5 animate-[fadeIn_0.5s_ease-out]">
                      <label className="font-mono uppercase text-[10px] text-zinc-500 font-bold block">
                        Nombre del Contacto *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Ej: Sebastián Miller"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full p-3 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 rounded-sm focus:outline-none focus:ring-1 focus:ring-safety-orange font-sans"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-mono uppercase text-[10px] text-zinc-500 font-bold block">
                        Correo de Empresa *
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="smiller@antofagastaminerals.cl"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 rounded-sm focus:outline-none focus:ring-1 focus:ring-safety-orange font-sans"
                      />
                    </div>
                  </div>

                  {/* Company & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="font-mono uppercase text-[10px] text-zinc-500 font-bold block">
                        Empresa / Contratista *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Ej: Antofagasta Minerals S.A."
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full p-3 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 rounded-sm focus:outline-none focus:ring-1 focus:ring-safety-orange font-sans"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-mono uppercase text-[10px] text-zinc-500 font-bold block">
                        Teléfono Móvil (+56 9) *
                      </label>
                      <input
                        required
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full p-3 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 rounded-sm focus:outline-none focus:ring-1 focus:ring-safety-orange font-sans"
                      />
                    </div>
                  </div>

                  {/* Divisional Service Area & Mining clients */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="font-mono uppercase text-[10px] text-zinc-500 font-bold block">
                        Área Divisional Sintomec
                      </label>
                      <select
                        value={serviceArea}
                        onChange={(e) => setServiceArea(e.target.value)}
                        className="w-full p-3 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 rounded-sm focus:outline-none focus:ring-1 focus:ring-safety-orange font-sans font-semibold text-zinc-700 dark:text-zinc-300"
                      >
                        <option value="mecanica">Área Mecánica (Reductores)</option>
                        <option value="metalizados">Área Metalizados (Recuperación)</option>
                        <option value="maestranza">Área Maestranza (Fabricación)</option>
                        <option value="suministros">Suministros Críticos</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-mono uppercase text-[10px] text-zinc-500 font-bold block">
                        Compañía Minera / Faena
                      </label>
                      <select
                        value={faena}
                        onChange={(e) => setFaena(e.target.value)}
                        className="w-full p-3 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 rounded-sm focus:outline-none focus:ring-1 focus:ring-safety-orange font-sans text-zinc-700 dark:text-zinc-300"
                      >
                        <option value="centinela">Minera Centinela</option>
                        <option value="antucoya">Minera Antucoya</option>
                        <option value="sqm">SQM</option>
                        <option value="escondida">BHP Escondida</option>
                        <option value="codelco">Codelco</option>
                        <option value="otra">Otra Minera / Infraestructura</option>
                      </select>
                    </div>
                  </div>

                  {/* Urgency and layout */}
                  <div className="space-y-1.5">
                    <label className="font-mono uppercase text-[10px] text-zinc-500 font-bold block">
                      Prioridad de Atención HSEC
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-sans">
                      {[
                        { id: "inmediato", label: "⚠️ Crítica" },
                        { id: "semana", label: "Esta Semana" },
                        { id: "mes", label: "Próximo Mes" },
                        { id: "proyectada", label: "Planificación" }
                      ].map((urg) => (
                        <button
                          key={urg.id}
                          id={`urgency-selector-${urg.id}`}
                          type="button"
                          onClick={() => setUrgency(urg.id)}
                          className={`p-3 text-center rounded-sm font-bold border cursor-pointer transition-all ${
                            urgency === urg.id
                              ? "bg-safety-orange/10 border-safety-orange text-safety-orange"
                              : "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100"
                          }`}
                        >
                          {urg.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Inquiry description */}
                  <div className="space-y-1.5">
                    <label className="font-mono uppercase text-[10px] text-zinc-500 font-bold block">
                      Descripción de componentes a cotizar o intervenir *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Ej: Overhaul general caja reductora secundaria Siemens Flender modelo Sz300. Presenta ruidos atípicos..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full p-3 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 rounded-sm focus:outline-none focus:ring-1 focus:ring-safety-orange font-sans text-iron-grey dark:text-zinc-200"
                    />
                  </div>

                  {/* Drag and Drop blue print uploader */}
                  <div className="space-y-1.5">
                    <label className="font-mono uppercase text-[10px] text-zinc-500 font-bold block">
                      Adjuntar Planos CAD / Dossier de Fotos (Límite 15MB)
                    </label>

                    <div
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed p-6 rounded-sm text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2 ${
                        dragActive
                          ? "border-safety-orange bg-safety-orange/5"
                          : file
                          ? "border-emerald-500 bg-emerald-500/5"
                          : "border-zinc-300 dark:border-zinc-800 hover:border-safety-orange bg-zinc-50 dark:bg-zinc-900/20"
                      }`}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        accept=".pdf,.docx,.doc,.jpg,.png,.dwg"
                        onChange={handleFileChange}
                      />

                      {file ? (
                        <>
                          <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 rounded-full flex items-center justify-center animate-[bounce_0.5s_ease-out]">
                            <Check size={18} />
                          </div>
                          <p className="font-display font-bold text-xs text-emerald-600 dark:text-emerald-400">
                            Fichero Adjuntado Correctamente
                          </p>
                          <span className="text-[10px] text-zinc-500 font-mono">
                            {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                          </span>
                        </>
                      ) : (
                        <>
                          <Upload className="text-zinc-400" size={24} />
                          <p className="font-display font-medium text-xs text-zinc-700 dark:text-zinc-300">
                            Arrastre sus planos CAD o haga clic para buscar
                          </p>
                          <span className="text-[10px] text-zinc-400 font-mono">
                            Formatos soportados: DXF, DWG, PDF, JPG, PNG (Máx. 15MB)
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Submission */}
                  <div className="pt-2">
                    <button
                      id="submit-rfq-inquiry-btn"
                      type="submit"
                      className="w-full bg-safety-orange hover:bg-safety-orange/95 text-white font-mono font-bold text-xs uppercase tracking-widest py-4.5 cursor-pointer transition-colors rounded-sm shadow-lg shadow-safety-orange/20 flex items-center justify-center gap-2"
                    >
                      <Send size={12} />
                      Enviar Solicitud de Estimación
                    </button>
                    <div className="flex gap-2 justify-center items-center text-[10px] text-emerald-500 font-mono text-center mt-3 font-bold">
                      <ShieldCheck size={12} />
                      Encriptación SSL segura y control HSEC
                    </div>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
