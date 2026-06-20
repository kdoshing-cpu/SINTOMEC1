/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from "react";
import { VACANCIES } from "../data";
import { Vacancy } from "../types";
import { Briefcase, Upload, Check, ClipboardCopy, Users, Building, ShieldCheck, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function TrabajaConNosotros() {
  const [selectedJob, setSelectedJob] = useState<Vacancy | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Form states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

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
    const isPDForDOCX = file.type === "application/pdf" || 
                        file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
                        file.name.endsWith(".pdf") || 
                        file.name.endsWith(".docx");
    const isUnderMaxSize = file.size <= 10 * 1024 * 1024; // 10MB

    if (!isPDForDOCX) {
      alert("Por favor, suba únicamente archivos en formato PDF o Word (.docx).");
      return false;
    }
    if (!isUnderMaxSize) {
      alert("El tamaño máximo permitido para archivos adjuntos es de 10 Megabytes.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) {
      alert("Por favor, rellene todos los campos obligatorios del formulario de postulación.");
      return;
    }
    if (!file) {
      alert("Por favor, adjunte su currículum técnico (CV) para que podamos evaluar sus habilidades.");
      return;
    }

    setFormSubmitted(true);
    // Reset form states
    setFullName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setFile(null);
  };

  const openFormForJob = (job: Vacancy) => {
    setSelectedJob(job);
    setFormSubmitted(false);
  };

  return (
    <div id="recruitment-component" className="py-20 bg-zinc-50 dark:bg-zinc-900/30 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
          <span className="text-safety-orange font-mono font-bold text-xs uppercase tracking-[0.3em] block">
            DESARROLLO DE TALENTO LOCAL
          </span>
          <h2 className="font-display font-black text-3xl md:text-4xl text-iron-grey dark:text-white uppercase leading-tight">
            Únete a un Equipo de Elite
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 font-sans text-sm">
            En SINTOMEC valoramos la excelencia, la puntualidad técnica y la seguridad laboral. Sea parte de nuestro taller en Antofagasta.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Block: Active Job Openings */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-display font-extrabold text-lg text-iron-grey dark:text-zinc-100 uppercase tracking-tight flex items-center gap-2 mb-6">
              <Briefcase className="text-safety-orange" size={20} />
              Vacantes Técnicas Activas
            </h3>

            <div className="space-y-4">
              {VACANCIES.map((jb) => {
                const isSelected = selectedJob?.id === jb.id;
                return (
                  <div
                    key={jb.id}
                    id={`job-card-${jb.id}`}
                    className={`bg-white dark:bg-zinc-900 border p-6 rounded-sm transition-all duration-300 ${
                      isSelected
                        ? "border-safety-orange ring-1 ring-safety-orange shadow-lg"
                        : "border-zinc-200 dark:border-zinc-800/85 hover:border-zinc-400 dark:hover:border-zinc-700"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono font-bold text-safety-orange uppercase tracking-wider block bg-safety-orange/5 px-2 py-0.5 rounded-sm w-fit">
                          {jb.area}
                        </span>
                        <h4 className="font-display font-black text-lg text-iron-grey dark:text-zinc-100 uppercase tracking-tight">
                          {jb.title}
                        </h4>
                        <div className="flex flex-wrap gap-4 text-xs font-sans text-zinc-400">
                          <span>Contrato: <b className="text-zinc-600 dark:text-zinc-300">{jb.contractType}</b></span>
                          <span>Región: <b className="text-zinc-600 dark:text-zinc-300">Antofagasta, Chile</b></span>
                        </div>
                      </div>

                      <button
                        id={`apply-job-btn-${jb.id}`}
                        onClick={() => openFormForJob(jb)}
                        className={`font-mono text-xs font-bold uppercase tracking-widest px-5 py-3 cursor-pointer transition-colors w-full sm:w-auto text-center rounded-sm ${
                          isSelected
                            ? "bg-safety-orange text-white"
                            : "bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-iron-grey dark:text-zinc-300"
                        }`}
                      >
                        {isSelected ? "Seleccionado" : "Postular"}
                      </button>
                    </div>

                    {/* Detailed Requirements Panel */}
                    <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-900 text-sm space-y-3 font-sans">
                      <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed">
                        {jb.description}
                      </p>
                      <div className="space-y-1.5">
                        <h5 className="font-mono text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
                          Requisitos del Puesto:
                        </h5>
                        <ul className="list-disc pl-4 space-y-1 text-xs text-zinc-600 dark:text-zinc-400">
                          {jb.requirements.map((req, rid) => (
                            <li key={rid}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* General CV Submission */}
            <div className="p-6 bg-zinc-100 dark:bg-zinc-900/50 rounded-sm border border-zinc-200 dark:border-zinc-800 space-y-3">
              <h4 className="font-display font-extrabold text-sm text-iron-grey dark:text-zinc-200 uppercase tracking-tight">
                ¿Ninguna vacante se ajusta a su perfil?
              </h4>
              <p className="text-xs text-zinc-500 font-sans leading-relaxed">
                Siempre estamos en búsqueda de torneros pesados, especialistas en soldadura de recubrimiento y técnicos en metrología avanzada. Envíenos su postulación espontánea.
              </p>
              <button
                id="spontaneous-cv-btn"
                onClick={() => setSelectedJob({
                  id: "spontaneous",
                  title: "Postulación Espontánea / Base de Datos",
                  area: "Operaciones Generales",
                  contractType: "A convenir",
                  experienceYears: 2,
                  description: "Ingreso espontáneo de antecedentes curriculares para vacantes proyectadas.",
                  requirements: ["Deseo de superación técnica y compromiso laboral", "Residencia en Antofagasta"]
                })}
                className="inline-flex bg-zinc-900 border border-zinc-800 hover:bg-safety-orange hover:border-safety-orange text-white px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-widest cursor-pointer rounded-sm"
              >
                Cargar Currículum Espontáneo
              </button>
            </div>
          </div>

          {/* Right Block: Recruitment form with Drag-and-Drop */}
          <div className="lg:col-span-5">
            <div className="bg-white dark:bg-zinc-900 p-6 md:p-8 border border-zinc-200 dark:border-zinc-800/80 shadow-lg rounded-sm space-y-6">
              
              <div className="space-y-2">
                <h3 className="font-display font-black text-xl text-iron-grey dark:text-zinc-100 uppercase tracking-tight">
                  Formulario de Postulación
                </h3>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  Postulando a: <b className="text-safety-orange font-mono block mt-1 uppercase">{selectedJob ? selectedJob.title : "Seleccione una vacante técnica de la izquierda"}</b>
                </p>
              </div>

              {formSubmitted ? (
                <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 p-6 rounded-sm text-center space-y-4 animate-[fadeIn_0.3s_ease-out]">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                    <Check size={24} />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-emerald-800 dark:text-emerald-400 uppercase text-sm">
                      Módulo de Admisión SINTOMEC
                    </h4>
                    <p className="text-xs text-emerald-600 dark:text-emerald-500 mt-2 font-sans leading-relaxed">
                      ¡Hemos recibido exitosamente su postulación para el puesto! Se ha enviado una confirmación a su casilla de correo y guardaremos sus antecedentes en nuestra carpeta HSEC. Muchas gracias por su interés.
                    </p>
                  </div>
                  <button
                    id="submit-another-cv-btn"
                    onClick={() => {
                      setFormSubmitted(false);
                      setSelectedJob(null);
                    }}
                    className="w-full bg-zinc-900 hover:bg-safety-orange text-white text-xs font-mono font-bold uppercase tracking-widest py-3 cursor-pointer rounded-sm"
                  >
                    Enviar Otra Solicitud
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  
                  {/* Full Name */}
                  <div className="space-y-1">
                    <label className="font-mono uppercase text-[10px] text-zinc-500 font-bold block">
                      Nombre Completo *
                    </label>
                    <input
                      required
                      type="text"
                      disabled={!selectedJob}
                      placeholder="Ej: Pedro González"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full p-3 font-sans border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 rounded-sm focus:outline-none focus:ring-1 focus:ring-safety-orange disabled:opacity-50 text-iron-grey dark:text-zinc-100"
                    />
                  </div>

                  {/* Email & Phone columns */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-mono uppercase text-[10px] text-zinc-500 font-bold block">
                        Correo Electrónico *
                      </label>
                      <input
                        required
                        type="email"
                        disabled={!selectedJob}
                        placeholder="pedro.gonzalez@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 font-sans border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 rounded-sm focus:outline-none focus:ring-1 focus:ring-safety-orange disabled:opacity-50 text-iron-grey dark:text-zinc-100"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-mono uppercase text-[10px] text-zinc-500 font-bold block">
                        Teléfono Móvil *
                      </label>
                      <input
                        required
                        type="tel"
                        disabled={!selectedJob}
                        placeholder="+56 9 1234 5678"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full p-3 font-sans border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 rounded-sm focus:outline-none focus:ring-1 focus:ring-safety-orange disabled:opacity-50 text-iron-grey dark:text-zinc-100"
                      />
                    </div>
                  </div>

                  {/* Experience Years */}
                  <div className="space-y-1">
                    <label className="font-mono uppercase text-[10px] text-zinc-500 font-bold block">
                      Años de Experiencia en Maestranza/Minería
                    </label>
                    <select
                      disabled={!selectedJob}
                      className="w-full p-3 font-sans border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 rounded-sm focus:outline-none focus:ring-1 focus:ring-safety-orange disabled:opacity-50 text-iron-grey dark:text-zinc-100"
                    >
                      <option>Menos de 2 años</option>
                      <option>De 2 a 5 años</option>
                      <option>De 5 a 10 años</option>
                      <option>Más de 10 años</option>
                    </select>
                  </div>

                  {/* Letter text */}
                  <div className="space-y-1">
                    <label className="font-mono uppercase text-[10px] text-zinc-500 font-bold block">
                      Carta de Presentación (Breve resumen)
                    </label>
                    <textarea
                      disabled={!selectedJob}
                      rows={3}
                      placeholder="Mencione sus últimas certificaciones técnicas relevantes."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full p-3 font-sans border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 rounded-sm focus:outline-none focus:ring-1 focus:ring-safety-orange disabled:opacity-50 text-iron-grey dark:text-zinc-100"
                    />
                  </div>

                  {/* DRAG AND DROP Resume Upload Panel */}
                  <div className="space-y-1">
                    <label className="font-mono uppercase text-[10px] text-zinc-500 font-bold block">
                      Currículum Vitae (pdf, docx) *
                    </label>
                    
                    <div
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                      onClick={() => selectedJob && fileInputRef.current?.click()}
                      className={`border-2 border-dashed p-6 rounded-sm text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2 ${
                        !selectedJob 
                          ? "bg-zinc-100/50 border-zinc-200 cursor-not-allowed opacity-50" 
                          : dragActive
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
                        accept=".pdf,.docx,.doc"
                        disabled={!selectedJob}
                        onChange={handleFileChange}
                      />
                      
                      {file ? (
                        <>
                          <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 rounded-full flex items-center justify-center animate-[bounce_0.5s_ease-out]">
                            <Check size={18} />
                          </div>
                          <p className="font-display font-bold text-xs text-emerald-600 dark:text-emerald-400">
                            CV Adjuntado Correctamente
                          </p>
                          <span className="text-[10px] text-zinc-500 font-mono">
                            {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                          </span>
                        </>
                      ) : (
                        <>
                          <Upload className="text-zinc-400 group-hover:text-safety-orange" size={24} />
                          <p className="font-display font-medium text-xs text-zinc-700 dark:text-zinc-300">
                            {dragActive ? "Suelte para cargar el archivo..." : "Arrastre su CV aquí o haga clic para buscar"}
                          </p>
                          <span className="text-[10px] text-zinc-400 font-mono">
                            Formatos soportados: PDF, DOCX (Máx. 10MB)
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Submission triggers */}
                  <div className="pt-2">
                    <button
                      id="submit-applicant-profile-btn"
                      type="submit"
                      disabled={!selectedJob}
                      className="w-full bg-safety-orange hover:bg-safety-orange/95 text-white font-mono font-bold text-xs uppercase tracking-widest py-4 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-sm shadow-md shadow-safety-orange/10"
                    >
                      Enviar Postulación de Admisión
                    </button>
                    {!selectedJob && (
                      <p className="text-[10px] text-red-500 font-mono text-center mt-2 font-bold">
                        * Seleccione un puesto de la izquierda para habilitar los campos.
                      </p>
                    )}
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
