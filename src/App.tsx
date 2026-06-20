/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ServiceViews from "./components/ServiceViews";
import ProjectViews from "./components/ProjectViews";
import TrabajaConNosotros from "./components/TrabajaConNosotros";
import ContactoView from "./components/ContactoView";
import { saveVideoBlob, getVideoBlob, clearVideoBlob } from "./utils/videoDb";

import {
  SERVICES,
  CASE_STUDIES,
  SUPPLIES,
  MINING_CLIENTS,
  FAQS,
  TEAM_MEMBERS,
  CERTIFICATE_IMAGE,
  PARTNERS_BAR
} from "./data";

import {
  Shield,
  Award,
  ChevronRight,
  Sparkles,
  ArrowRight,
  HardHat,
  Search,
  Download,
  Calendar,
  CheckCircle2,
  Wrench,
  Clock,
  Compass,
  FileText,
  UserCheck,
  Check,
  Info,
  Settings,
  Video,
  Upload,
  AlertCircle,
  RefreshCw,
  Trash2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [currentView, setCurrentView] = useState<string>("home");
  const [viewDirection, setViewDirection] = useState<number>(0);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [preselectedService, setPreselectedService] = useState<string>("");
  const [bgVideo, setBgVideo] = useState<string>("https://assets.mixkit.co/videos/preview/mixkit-man-working-with-heavy-machinery-in-factory-42316-large.mp4");
  const [bgVideoSource, setBgVideoSource] = useState<string>("preset"); // 'preset' | 'url' | 'file'
  const [bgVideoFileName, setBgVideoFileName] = useState<string>("");
  const [bgVideoOpacity, setBgVideoOpacity] = useState<number>(() => {
    const saved = localStorage.getItem("sintomec_bg_opacity");
    return saved ? Number(saved) : 40; // Default to 40% (high visibility and elegant dark integration)
  });
  const [showVideoCustomizer, setShowVideoCustomizer] = useState<boolean>(false);
  const [customVideoUrlInput, setCustomVideoUrlInput] = useState<string>("https://assets.mixkit.co/videos/preview/mixkit-man-working-with-heavy-machinery-in-factory-42316-large.mp4");
  const [isVideoUploading, setIsVideoUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string>("");

  const VIEW_ORDER = ["home", "servicios", "proyectos", "suministros", "minas", "empleo", "nosotros", "contacto"];

  // Load and play background video on mount
  useEffect(() => {
    async function loadStoredVideo() {
      const savedSource = localStorage.getItem("sintomec_bg_source") || "preset";
      const savedUrl = localStorage.getItem("sintomec_bg_video");
      const savedFileName = localStorage.getItem("sintomec_bg_filename") || "";

      setBgVideoSource(savedSource);
      if (savedFileName) {
        setBgVideoFileName(savedFileName);
      }
      if (savedUrl) {
        setCustomVideoUrlInput(savedUrl);
      }

      if (savedSource === "file") {
        try {
          const blob = await getVideoBlob();
          if (blob) {
            const objectUrl = URL.createObjectURL(blob);
            setBgVideo(objectUrl);
            return;
          }
        } catch (e) {
          console.error("Failed to load binary video from database, falling back.", e);
        }
      }

      // Fallback
      if (savedUrl) {
        setBgVideo(savedUrl);
      } else {
        setBgVideo("https://assets.mixkit.co/videos/preview/mixkit-man-working-with-heavy-machinery-in-factory-42316-large.mp4");
      }
    }

    loadStoredVideo();
  }, []);

  const handleLocalVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("video/")) {
      setUploadError("El archivo debe ser un vídeo válido (.mp4, .mov, o .webm).");
      return;
    }

    setIsVideoUploading(true);
    setUploadError("");

    try {
      await saveVideoBlob(file);
      const url = URL.createObjectURL(file);
      setBgVideo(url);
      setBgVideoSource("file");
      setBgVideoFileName(file.name);
      localStorage.setItem("sintomec_bg_source", "file");
      localStorage.setItem("sintomec_bg_filename", file.name);
      localStorage.removeItem("sintomec_bg_video");
    } catch (err) {
      console.error("Error saving video:", err);
      setUploadError("Fallo al guardar el archivo en la base de datos local (IndexedDB).");
    } finally {
      setIsVideoUploading(false);
    }
  };

  const handleRemoveUploadedVideo = async () => {
    setIsVideoUploading(true);
    try {
      await clearVideoBlob();
      const defaultUrl = "https://assets.mixkit.co/videos/preview/mixkit-man-working-with-heavy-machinery-in-factory-42316-large.mp4";
      setBgVideo(defaultUrl);
      setBgVideoSource("preset");
      setBgVideoFileName("");
      localStorage.setItem("sintomec_bg_source", "preset");
      localStorage.setItem("sintomec_bg_video", defaultUrl);
      localStorage.removeItem("sintomec_bg_filename");
    } catch (err) {
      console.error("Error clearing video:", err);
    } finally {
      setIsVideoUploading(false);
    }
  };

  const handleViewChange = (viewId: string, serviceContext: string = "") => {
    const currentIndex = VIEW_ORDER.indexOf(currentView);
    const nextIndex = VIEW_ORDER.indexOf(viewId);
    if (nextIndex !== -1 && currentIndex !== -1) {
      setViewDirection(nextIndex > currentIndex ? 1 : nextIndex < currentIndex ? -1 : 0);
    }
    setPreselectedService(serviceContext);
    setCurrentView(viewId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Supplies Filter states
  const [suppliesFilter, setSuppliesFilter] = useState<string>("todos");
  const [suppliesSearch, setSuppliesSearch] = useState<string>("");

  // Load and apply theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleNavigateWithContext = (viewId: string, serviceContext: string = "") => {
    handleViewChange(viewId, serviceContext);
  };

  const handleDownloadSimulation = (itemName: string) => {
    alert(`Iniciando descarga del catálogo de suministros: ${itemName}. Sello SINTOMEC habilitado.`);
  };

  // Filter supplies
  const filteredSupplies = SUPPLIES.filter((item) => {
    const matchesCategory = suppliesFilter === "todos" || item.category === suppliesFilter;
    const matchesSearch = item.title.toLowerCase().includes(suppliesSearch.toLowerCase()) ||
                          item.description.toLowerCase().includes(suppliesSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : direction < 0 ? "-100%" : 0,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? "-100%" : direction < 0 ? "100%" : 0,
      opacity: 0
    })
  };

  const slideTransition = {
    x: { type: "spring", stiffness: 220, damping: 28 },
    opacity: { duration: 0.25 }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white dark:bg-zinc-950 text-iron-grey dark:text-zinc-100 font-sans transition-colors duration-300">
      
      {/* Structural Header */}
      <Header
        currentView={currentView}
        onViewChange={(view) => handleViewChange(view)}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Main Content Spacer (Header height is h-22, let's keep pt-22 pt) */}
      <main className="flex-grow pt-22 overflow-x-hidden">
        <AnimatePresence mode="wait" custom={viewDirection}>
          
          {/* VIEW: HOME */}
          {currentView === "home" && (
            <motion.div
              key="home-view"
              custom={viewDirection}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={slideTransition}
              className="space-y-0 w-full"
            >
              
              {/* Hero Banner Section */}
              <section id="hero-banner" className="relative bg-[#1A1C1C] text-white py-24 lg:py-36 min-h-[85vh] flex items-center overflow-hidden">
                {/* Background Video Powering Sintomec */}
                <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
                  <video
                    key={bgVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover filter brightness-[0.85] contrast-[1.10] transition-opacity duration-300 pointer-events-none"
                    style={{ opacity: bgVideoOpacity / 100 }}
                  >
                    <source src={bgVideo} type="video/mp4" />
                  </video>
                  {/* Gradients to merge the video smoothly and optimize typography visibility */}
                  <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/85 to-transparent z-10 pointer-events-none" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-950/70 to-zinc-950 opacity-90 z-10 pointer-events-none" />
                </div>

                {/* Floating Video Control Widget */}
                <div className="absolute bottom-6 right-6 z-20 flex flex-col items-end gap-2">
                  <button
                    onClick={() => setShowVideoCustomizer(!showVideoCustomizer)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-black/85 hover:bg-black/95 border border-zinc-700 hover:border-safety-orange text-xs text-white uppercase tracking-wider font-mono rounded-sm transition-all shadow-md backdrop-blur-sm group pointer-events-auto"
                  >
                    <Settings className="w-3.5 h-3.5 text-zinc-400 group-hover:text-safety-orange transition-colors group-hover:rotate-45 duration-300" />
                    <span>Ajustar Vídeo de Fondo</span>
                    {bgVideoSource === "file" && (
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Vídeo local cargado" />
                    )}
                  </button>

                  {showVideoCustomizer && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className="bg-[#1A1C1C] border border-zinc-800 p-4 rounded-sm shadow-xl w-80 max-w-sm flex flex-col gap-3.5 pointer-events-auto text-zinc-300"
                    >
                      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
                        <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                          <Video className="w-3.5 h-3.5 text-safety-orange animate-pulse" /> SINTOMEC VIDEO ENGINE
                        </span>
                        <button
                          onClick={() => setShowVideoCustomizer(false)}
                          className="text-zinc-500 hover:text-white font-mono text-xs p-1"
                        >
                          ✕
                        </button>
                      </div>

                      {/* Display Status of current video background */}
                      <div className="bg-zinc-950/60 p-2.5 rounded-sm border border-zinc-900 flex flex-col gap-1 text-[11px]">
                        <div className="flex items-center justify-between font-mono">
                          <span className="text-zinc-500">Origen Actual:</span>
                          <span className={`uppercase font-bold ${
                            bgVideoSource === "file" ? "text-emerald-400" : bgVideoSource === "url" ? "text-amber-400" : "text-sky-400"
                          }`}>
                            {bgVideoSource === "file" ? "Archivo Local" : bgVideoSource === "url" ? "Enlace Externo" : "Preset Demo"}
                          </span>
                        </div>
                        {bgVideoSource === "file" && (
                          <div className="flex items-center justify-between font-mono gap-2 mt-1">
                            <span className="text-zinc-500 truncate shrink-0">Nombre:</span>
                            <span className="text-zinc-300 truncate font-sans text-right flex-1 select-all" title={bgVideoFileName}>
                              {bgVideoFileName || "video_local.mp4"}
                            </span>
                          </div>
                        )}
                        {uploadError && (
                          <div className="flex items-start gap-1.5 mt-1.5 p-1.5 bg-red-950/40 border border-red-950 text-red-300 rounded text-[10px] font-mono leading-relaxed">
                            <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                            <span>{uploadError}</span>
                          </div>
                        )}
                      </div>

                      {/* 1. File Upload (The Ultimate Solution to bypass Sandbox/CORS) */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono uppercase text-zinc-500 block">Opción A: Sube tu vídeo aquí (.MP4, .WEBM)</label>
                        <div className="relative group border border-dashed border-zinc-700 hover:border-safety-orange/70 bg-zinc-950/40 hover:bg-zinc-950/80 transition-all rounded p-3 text-center flex flex-col items-center justify-center gap-1.5 cursor-pointer">
                          <input
                            type="file"
                            accept="video/mp4, video/webm, video/quicktime"
                            onChange={handleLocalVideoUpload}
                            disabled={isVideoUploading}
                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                          />
                          {isVideoUploading ? (
                            <RefreshCw className="w-5 h-5 text-safety-orange animate-spin" />
                          ) : (
                            <Upload className="w-5 h-5 text-zinc-400 group-hover:text-safety-orange transition-colors" />
                          )}
                          <div className="text-[10px] text-zinc-400 font-mono">
                            {isVideoUploading ? "Procesando vídeo..." : "Haz clic aquí para seleccionar vídeo"}
                          </div>
                          <p className="text-[8px] text-zinc-600 font-mono">
                            Se almacena directo en el navegador (IndexedDB)
                          </p>
                        </div>
                        {bgVideoSource === "file" && (
                          <button
                            onClick={handleRemoveUploadedVideo}
                            disabled={isVideoUploading}
                            className="w-full flex items-center justify-center gap-1.5 py-1 bg-red-950/30 hover:bg-red-900/40 text-red-300 font-mono text-[9px] uppercase tracking-wider border border-red-900/40 rounded-sm transition-colors"
                          >
                            <Trash2 className="w-3 h-3 text-red-400" />
                            Quitar Vídeo Almacenado
                          </button>
                        )}
                      </div>

                      {/* 2. Custom Opacity Slider (Adjust Visibility of Background) */}
                      <div className="space-y-1.5 border-t border-zinc-900 pt-2.5">
                        <div className="flex justify-between text-[10px] font-mono uppercase text-zinc-500">
                          <span>Visibilidad / Opacidad</span>
                          <span className="text-safety-orange font-bold">{bgVideoOpacity}%</span>
                        </div>
                        <div className="flex gap-2 items-center">
                          <span className="text-[9px] text-zinc-600 font-mono">10%</span>
                          <input
                            type="range"
                            min="10"
                            max="100"
                            step="5"
                            value={bgVideoOpacity}
                            onChange={(e) => {
                              const v = Number(e.target.value);
                              setBgVideoOpacity(v);
                              localStorage.setItem("sintomec_bg_opacity", String(v));
                            }}
                            className="flex-1 accent-safety-orange h-1 bg-zinc-800 rounded-lg cursor-pointer text-safety-orange"
                          />
                          <span className="text-[9px] text-zinc-600 font-mono">100%</span>
                        </div>
                      </div>

                      {/* 3. Video Presets */}
                      <div className="space-y-1.5 border-t border-zinc-900 pt-2.5">
                        <label className="text-[10px] font-mono uppercase text-zinc-500">Opción B: Presets Industriales</label>
                        <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono">
                          <button
                            onClick={() => {
                              const url = "https://assets.mixkit.co/videos/preview/mixkit-man-working-with-heavy-machinery-in-factory-42316-large.mp4";
                              setBgVideo(url);
                              setBgVideoSource("preset");
                              setBgVideoFileName("");
                              localStorage.setItem("sintomec_bg_source", "preset");
                              localStorage.setItem("sintomec_bg_video", url);
                              localStorage.removeItem("sintomec_bg_filename");
                            }}
                            className={`px-2 py-1.5 bg-zinc-950 border text-left transition-colors rounded-sm truncate ${
                              bgVideoSource === "preset" && bgVideo.includes("42316") ? "border-safety-orange text-safety-orange bg-safety-orange/5 font-bold" : "border-zinc-800/80 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200"
                            }`}
                          >
                            ⚙️ Torno Pesado
                          </button>
                          <button
                            onClick={() => {
                              const url = "https://assets.mixkit.co/videos/preview/mixkit-welder-working-on-a-metal-part-42319-large.mp4";
                              setBgVideo(url);
                              setBgVideoSource("preset");
                              setBgVideoFileName("");
                              localStorage.setItem("sintomec_bg_source", "preset");
                              localStorage.setItem("sintomec_bg_video", url);
                              localStorage.removeItem("sintomec_bg_filename");
                            }}
                            className={`px-2 py-1.5 bg-zinc-950 border text-left transition-colors rounded-sm truncate ${
                              bgVideoSource === "preset" && bgVideo.includes("42319") ? "border-safety-orange text-safety-orange bg-safety-orange/5 font-bold" : "border-zinc-800/80 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200"
                            }`}
                          >
                            ⚡ Soldadura de Arco
                          </button>
                          <button
                            onClick={() => {
                              const url = "https://assets.mixkit.co/videos/preview/mixkit-metal-cutting-machine-in-a-factory-42324-large.mp4";
                              setBgVideo(url);
                              setBgVideoSource("preset");
                              setBgVideoFileName("");
                              localStorage.setItem("sintomec_bg_source", "preset");
                              localStorage.setItem("sintomec_bg_video", url);
                              localStorage.removeItem("sintomec_bg_filename");
                            }}
                            className={`px-2 py-1.5 bg-zinc-950 border text-left transition-colors rounded-sm truncate ${
                              bgVideoSource === "preset" && bgVideo.includes("42324") ? "border-safety-orange text-safety-orange bg-safety-orange/5 font-bold" : "border-zinc-800/80 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200"
                            }`}
                          >
                            🔥 Plasma CNC
                          </button>
                          <button
                            onClick={() => {
                              const url = "https://assets.mixkit.co/videos/preview/mixkit-industry-robot-working-in-a-factory-42323-large.mp4";
                              setBgVideo(url);
                              setBgVideoSource("preset");
                              setBgVideoFileName("");
                              localStorage.setItem("sintomec_bg_source", "preset");
                              localStorage.setItem("sintomec_bg_video", url);
                              localStorage.removeItem("sintomec_bg_filename");
                            }}
                            className={`px-2 py-1.5 bg-zinc-950 border text-left transition-colors rounded-sm truncate ${
                              bgVideoSource === "preset" && bgVideo.includes("42323") ? "border-safety-orange text-safety-orange bg-safety-orange/5" : "border-zinc-800/80 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200"
                            }`}
                          >
                            🤖 CNC Robótico
                          </button>
                        </div>
                      </div>

                      {/* 4. Custom URL Input */}
                      <div className="space-y-1.5 border-t border-zinc-900 pt-2.5">
                        <label className="text-[10px] font-mono uppercase text-zinc-500 block">Opción C: Enlace Directo (CDN)</label>
                        <div className="flex gap-1.5">
                          <input
                            type="text"
                            placeholder="Pega URL de vídeo (mp4, webm)"
                            value={customVideoUrlInput}
                            onChange={(e) => setCustomVideoUrlInput(e.target.value)}
                            className="bg-zinc-950 border border-zinc-800 focus:border-safety-orange text-white text-xs px-2 py-1.5 flex-1 rounded-sm outline-none font-mono"
                          />
                          <button
                            onClick={() => {
                              if (customVideoUrlInput.trim()) {
                                setBgVideo(customVideoUrlInput.trim());
                                setBgVideoSource("url");
                                setBgVideoFileName("");
                                localStorage.setItem("sintomec_bg_source", "url");
                                localStorage.setItem("sintomec_bg_video", customVideoUrlInput.trim());
                                localStorage.removeItem("sintomec_bg_filename");
                              }
                            }}
                            className="px-2.5 py-1.5 bg-safety-orange text-black hover:bg-amber-500 font-display font-black text-xs uppercase tracking-wider rounded-sm transition-colors text-center"
                          >
                            Aplicar
                          </button>
                        </div>
                      </div>

                      {/* Reset defaults */}
                      <div className="mt-1 flex justify-between">
                        <button
                          onClick={async () => {
                            await clearVideoBlob();
                            const defaultUrl = "https://assets.mixkit.co/videos/preview/mixkit-man-working-with-heavy-machinery-in-factory-42316-large.mp4";
                            setBgVideo(defaultUrl);
                            setBgVideoSource("preset");
                            setBgVideoFileName("");
                            setBgVideoOpacity(40);
                            setCustomVideoUrlInput(defaultUrl);
                            setUploadError("");
                            localStorage.setItem("sintomec_bg_source", "preset");
                            localStorage.setItem("sintomec_bg_video", defaultUrl);
                            localStorage.setItem("sintomec_bg_opacity", "40");
                            localStorage.removeItem("sintomec_bg_filename");
                          }}
                          className="text-[9px] font-mono uppercase hover:text-white transition-colors text-zinc-500 underline"
                        >
                          Valores por Defecto
                        </button>
                        <span className="text-[9px] font-mono text-zinc-600">Sintomec Engine v1.2</span>
                      </div>
                    </motion.div>
                  )}
                </div>
                <div 
                  className="absolute inset-0 z-0 opacity-10 bg-repeat pointer-events-none" 
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54 48c-2 0-3 1-3 3 0 1-1 2-2 2s-2-1-2-2c0-2-1-3-3-3s-3 1-3 3c0 1-1 2-2 2s-2-1-2-2c0-2-1-3-3-3s-3 1-3 3c0 1-1 2-2 2s-2-1-2-2c0-2-1-3-3-3s-3 1-3 3c0 1-1 2-2 2s-2-1-2-2c0-2-1-3-3-3s-3 1-3 3c0 1-1 2-2 2s-2-1-2-2c0-2-1-3-3-3s-3 1-3 3c0 1-1 2-2 2s-2-1-2-2c0-2-1-3-3-3-2 0-3 1-3 3 0 1-1 2-2 2s-2-1-2-2c0-2-1-3-3-3s-3 1-3 3c0 1-1 2-2 2s-2-1-2-2c0-2-1-3-3-3s-3 1-3 3c0 1-1 2-2 2s-2-1-2-2c0-2-1-3-3-3s-3 1-3 3c0 1-1 2-2 2s-2-1-2-2c0-2-1-3-3-3s-3 1-3 3c0 1-1 2-2 2s-2-1-2-2c0-2-1-3-3-3zM6 6c-2 0-3 1-3 3 0 1-1 2-2 2S-1 10-1 9c0-2-1-3-3-3s-3 1-3 3c0 1-1 2-2 2s-2-1-2-2c0-2-1-3-3-3s-3 1-3 3c0 1-1 2-2 2s-2-1-2-2c0-2-1-3-3-3s-3 1-3 3c0 1-1 2-2 2s-2-1-2-2c0-2-1-3-3-3s-3 1-3 3c0 1-1 2-2 2s-2-1-2-2c0-2-1-3-3-3s-3 1-3 3c0 1-1 2-2 2s-2-1-2-2c0-2-1-3-3-3-2 0-3 1-3 3 0 1-1 2-2 2s-2-1-2-2c0-2-1-3-3-3s-3 1-3 3c0 1-1 2-2 2s-2-1-2-2c0-2-1-3-3-3s-3 1-3 3c0 1-1 2-2 2S-1 4-1 3c0-2-1-3-3-3s-3 1-3 3c0 1-1 2-2 2S-13 4-13 3c0-2-1-3-3-3z' fill='%239C92AC' fill-opacity='0.15' fill-rule='evenodd'/%3E%3C/svg%3E")` }}
                />

                <div className="px-4 sm:px-6 md:px-12 max-w-7xl mx-auto z-10 w-full">
                  <div className="max-w-3xl space-y-8">
                    
                    {/* Badge top */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-safety-orange/15 border border-safety-orange/30 text-safety-orange font-mono text-[10px] uppercase tracking-[0.2em] font-extrabold animate-bounce">
                      <Sparkles size={12} />
                      Ingeniería Técnica Certificada
                    </div>

                    <div className="space-y-4">
                      <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-7xl uppercase tracking-tight leading-[1.05]">
                        Reparación de <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-safety-orange to-amber-500">
                          Transmisiones
                        </span> <br />
                        de Potencia
                      </h1>
                      <p className="text-zinc-300 font-sans text-base sm:text-lg max-w-xl leading-relaxed">
                        Overhaul técnico, metrología dimensional micrométrica y maestranza pesada para rodillos, reductores y molinos de la gran minería en Antofagasta. Respaldados bajo rigurosos protocolos de garantía técnica de 12 meses.
                      </p>
                    </div>

                    {/* Quick highlight points */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pb-4 border-b border-zinc-800/60 max-w-2xl font-mono text-xs">
                      <div>
                        <span className="text-safety-orange block text-lg font-black font-display">15+ Años</span>
                        <span className="text-zinc-400">Trayectoria Minera</span>
                      </div>
                      <div>
                        <span className="text-safety-orange block text-lg font-black font-display">24/7/365</span>
                        <span className="text-zinc-400">Guardia de Emergencia</span>
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <span className="text-safety-orange block text-lg font-black font-display">ISO 9001</span>
                        <span className="text-zinc-400">Trazabilidad Total</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        id="hero-quote-btn"
                        onClick={() => handleNavigateWithContext("contacto")}
                        className="bg-safety-orange hover:bg-safety-orange/95 text-white font-mono font-bold text-xs uppercase tracking-widest px-8 py-5 cursor-pointer transition-all hover:shadow-lg hover:shadow-safety-orange/20 text-center rounded-sm"
                      >
                        Solicitar Cotización Inmediata
                      </button>
                      <button
                        id="hero-explore-btn"
                        onClick={() => handleNavigateWithContext("servicios")}
                        className="border border-white/20 hover:border-white hover:bg-white/5 text-white font-mono font-bold text-xs uppercase tracking-widest px-8 py-5 cursor-pointer transition-all text-center rounded-sm"
                      >
                        Explorar Áreas Técnicas
                      </button>
                    </div>

                  </div>
                </div>
              </section>

              {/* Trustees line / Logos */}
              <section id="trustees" className="bg-zinc-100 dark:bg-zinc-900/50 py-8 border-y border-zinc-200 dark:border-zinc-800 transition-colors">
                <div className="px-4 md:px-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-6 justify-between items-center">
                  <div className="font-mono text-[10px] tracking-widest text-zinc-400 uppercase font-black">
                    Acreditaciones y Confianza de Clase Mundial
                  </div>
                  <img
                    alt="Trusted partners banner line"
                    className="h-9 md:h-11 object-contain grayscale dark:brightness-0 dark:invert opacity-75 dark:opacity-40"
                    src={PARTNERS_BAR}
                    referrerPolicy="no-referrer"
                  />
                </div>
              </section>

              {/* Services teaser cards */}
              <section id="services-teaser" className="py-24 bg-white dark:bg-zinc-950 transition-colors">
                <div className="px-4 md:px-8 max-w-7xl mx-auto space-y-16">
                  
                  <div className="text-center space-y-4 max-w-2xl mx-auto">
                    <span className="text-safety-orange font-mono font-bold text-xs uppercase tracking-[0.3em] block">
                      OPERACIONES ESPECIALIZADAS Y EFICIENTES
                    </span>
                    <h2 className="font-display font-black text-3xl md:text-4xl text-iron-grey dark:text-zinc-100 uppercase tracking-tight">
                      Excelencia en Ingeniería de Transmisión
                    </h2>
                    <p className="text-zinc-500 font-sans text-sm">
                      Contamos con una planta industrial en Antofagasta completamente equipada para soportar altos tonelajes y tolerancias mecánicas micrométricas estrictas.
                    </p>
                  </div>

                  {/* Cards Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {SERVICES.map((srv) => (
                      <div
                        key={srv.id}
                        className="border border-zinc-200 dark:border-zinc-800 p-8 flex flex-col justify-between hover:border-safety-orange dark:hover:border-safety-orange group transition-all duration-300 rounded-sm bg-white dark:bg-zinc-900"
                      >
                        <div className="space-y-6">
                          {/* Top Icon */}
                          <div className="w-12 h-12 bg-safety-orange text-white rounded-sm flex items-center justify-center shadow-md shadow-safety-orange/10 group-hover:scale-105 transition-transform">
                            {srv.id === "mecanica" && <Wrench size={22} />}
                            {srv.id === "metalizados" && <Shield size={22} />}
                            {srv.id === "maestranza" && <Compass size={22} />}
                          </div>

                          <div className="space-y-2">
                            <h3 className="font-display font-black text-xl text-iron-grey dark:text-zinc-100 uppercase tracking-tight group-hover:text-safety-orange transition-colors">
                              {srv.title}
                            </h3>
                            <p className="text-zinc-500 dark:text-zinc-400 font-sans text-xs leading-relaxed">
                              {srv.description}
                            </p>
                          </div>

                          {/* Quick spec list mini */}
                          <ul className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-900 font-sans text-[11px] text-zinc-600 dark:text-zinc-400">
                            {srv.specs.slice(0, 3).map((spec, sidx) => (
                              <li key={sidx} className="flex gap-2 items-start">
                                <span className="text-safety-orange font-bold">•</span>
                                <span>{spec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="pt-8">
                          <button
                            id={`teaser-service-${srv.id}`}
                            onClick={() => handleNavigateWithContext("servicios", srv.id)}
                            className="text-xs font-mono font-bold uppercase tracking-widest text-[#101111] dark:text-zinc-200 hover:text-safety-orange dark:hover:text-safety-orange inline-flex items-center gap-1.5 cursor-pointer"
                          >
                            Ver Ficha Técnica Completa
                            <ArrowRight size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </section>

              {/* Bento Highlights Case Studies */}
              <section id="portfolio-bento" className="py-24 bg-zinc-50 dark:bg-zinc-900/30 border-y border-zinc-100 dark:border-zinc-900 transition-colors">
                <div className="px-4 md:px-8 max-w-7xl mx-auto space-y-16">
                  
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-3">
                      <span className="text-safety-orange font-mono font-bold text-xs uppercase tracking-[0.3em] block">
                        FIABILIDAD COMPROBADA EN FAENA
                      </span>
                      <h2 className="font-display font-black text-3xl md:text-4xl text-iron-grey dark:text-white uppercase tracking-tight">
                        Casos de Éxito Destacados
                      </h2>
                    </div>

                    <button
                      id="view-all-portfolio-btn"
                      onClick={() => handleViewChange("proyectos")}
                      className="bg-zinc-900 hover:bg-safety-orange text-white text-xs font-mono font-bold uppercase tracking-widest px-6 py-4 transition-colors cursor-pointer rounded-sm"
                    >
                      Ver Portafolio de Casos
                    </button>
                  </div>

                  {/* Bento Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Big Spotlight Case */}
                    <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-sm overflow-hidden flex flex-col justify-between shadow-md">
                      <div className="relative h-64 md:h-80 overflow-hidden bg-zinc-900">
                        <img
                          alt="Main case photo"
                          className="w-full h-full object-cover"
                          src={CASE_STUDIES[0].image}
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-4 left-4 bg-safety-orange text-white px-3 py-1 font-mono text-[9px] uppercase tracking-widest font-bold">
                          {CASE_STUDIES[0].tag}
                        </div>
                      </div>
                      <div className="p-8 space-y-4 flex-grow">
                        <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-400 block font-bold">
                          Overhaul Caja Reductora Principal
                        </span>
                        <h3 className="font-display font-black text-2xl text-iron-grey dark:text-zinc-100 uppercase tracking-tight hover:text-safety-orange transition-colors">
                          {CASE_STUDIES[0].title}
                        </h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 font-sans leading-relaxed">
                          {CASE_STUDIES[0].description}
                        </p>
                      </div>
                      <div className="px-8 pb-8 pt-4 border-t border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/10 flex justify-between items-center">
                        <span className="text-xs font-mono font-bold text-zinc-400">INDICADOR CLAVE</span>
                        <span className="font-display font-extrabold text-safety-orange text-lg">
                          {CASE_STUDIES[0].metricValue} ({CASE_STUDIES[0].metricLabel})
                        </span>
                      </div>
                    </div>

                    {/* Small sidebar Cases block */}
                    <div className="lg:col-span-5 flex flex-col gap-8">
                      {CASE_STUDIES.slice(1, 3).map((cs) => (
                        <div
                          key={cs.id}
                          className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-sm overflow-hidden flex gap-4 p-4 shadow-sm"
                        >
                          <div className="w-24 sm:w-32 h-24 sm:h-auto flex-shrink-0 bg-zinc-900 rounded-sm overflow-hidden">
                            <img
                              alt={cs.title}
                              className="w-full h-full object-cover"
                              src={cs.image}
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="flex flex-col justify-between flex-grow">
                            <div className="space-y-1">
                              <span className="text-[9px] font-mono font-bold text-safety-orange uppercase tracking-wider block">
                                {cs.tag}
                              </span>
                              <h4 className="font-display font-extrabold text-sm text-iron-grey dark:text-zinc-200 uppercase tracking-tight leading-tight">
                                {cs.title}
                              </h4>
                            </div>
                            <span className="text-[10px] font-mono font-bold text-zinc-400 mt-2 block">
                              Métrica: <b className="text-safety-orange">{cs.metricValue}</b>
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>

                </div>
              </section>

              {/* Regulatory Standards Compliance Section */}
              <section id="compliance-standards" className="py-24 bg-white dark:bg-zinc-950 transition-colors">
                <div className="px-4 md:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Copy left column */}
                  <div className="lg:col-span-7 space-y-8">
                    <div className="space-y-4">
                      <span className="text-safety-orange font-mono font-bold text-xs uppercase tracking-[0.3em] block">
                        CUMPLIMIENTO RIGUROSO & ESTÁNDARES GLOBALES
                      </span>
                      <h2 className="font-display font-black text-3xl md:text-4xl text-iron-grey dark:text-white uppercase leading-tight">
                        Acreditaciones de Nivel Clase A
                      </h2>
                      <p className="text-zinc-500 font-sans text-sm leading-relaxed">
                        Sintomec mantiene un compromiso indisoluble con las exigencias del mercado minero e industrial. Sometemos nuestros procesos a rigurosas validaciones documentales, de infraestructura y de competencias técnicas.
                      </p>
                    </div>

                    <div className="space-y-4">
                      {/* Badge Homologado */}
                      <div className="flex gap-4 p-4 border border-zinc-200 dark:border-zinc-800 rounded-sm bg-white dark:bg-zinc-900">
                        <Award className="text-safety-orange flex-shrink-0" size={24} />
                        <div>
                          <h4 className="font-display font-extrabold text-sm text-iron-grey dark:text-zinc-200 uppercase">Proveedor Homologado - Clase A</h4>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-sans leading-relaxed mt-1">
                            Habilitados plenamente y con la más alta calificación técnica para postular e intervenir en licitaciones de la gran minería.
                          </p>
                        </div>
                      </div>

                      {/* Badge ISO 9001 */}
                      <div className="flex gap-4 p-4 border border-zinc-200 dark:border-zinc-800 rounded-sm bg-white dark:bg-zinc-900">
                        <HardHat className="text-safety-orange flex-shrink-0" size={24} />
                        <div>
                          <h4 className="font-display font-extrabold text-sm text-iron-grey dark:text-zinc-200 uppercase">ISO 9001:2015 Certificado</h4>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-sans leading-relaxed mt-1">
                            Aseguramiento de Calidad robusto con trazabilidad en cada desarme metrológico, balanceo y calibración de transmisiones mecánicas.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right photo banner column */}
                  <div className="lg:col-span-5 relative">
                    <div className="border-l-4 border-l-safety-orange shadow-2xl relative overflow-hidden bg-zinc-900 aspect-square max-w-[420px] mx-auto rounded-sm">
                      <img
                        alt="Audit Certificate and Medal standard mockup"
                        className="w-full h-full object-cover brightness-95"
                        src={CERTIFICATE_IMAGE}
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute bottom-4 left-4 right-4 bg-zinc-950/95 p-4 border border-zinc-800 rounded-sm text-white font-mono text-[9px] tracking-widest uppercase">
                        <span className="text-safety-orange font-bold block mb-1">AUDITORÍA ANUAL APROBADA</span>
                        Planta Antofagasta - 100% Cumplimiento
                      </div>
                    </div>
                  </div>

                </div>
              </section>

              {/* Call to action section final */}
              <section id="consultancy-banner" className="bg-[#1A1C1C] text-white py-16 md:py-24 relative overflow-hidden border-t border-zinc-900">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-zinc-800/20 via-zinc-950 to-zinc-950 z-0" />
                <div className="px-4 md:px-8 max-w-5xl mx-auto text-center space-y-8 z-10 relative">
                  <h2 className="font-display font-black text-3xl md:text-5xl uppercase leading-tight tracking-tight">
                    Impulse su Confiabilidad Operativa
                  </h2>
                  <p className="text-zinc-300 font-sans text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                    Contamos con ingenieros de amplia trayectoria listos para guiar desarmes de emergencia, relevamiento tridimensional por muestra o programar overhaul mayor en nuestro taller.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center font-mono">
                    <button
                      id="cta-speak-quote-btn"
                      onClick={() => handleNavigateWithContext("contacto")}
                      className="bg-safety-orange hover:bg-safety-orange/90 text-white font-bold text-xs uppercase tracking-widest px-8 py-4.5 cursor-pointer rounded-sm"
                    >
                      Agendar Consultoría Técnica
                    </button>
                    <a
                      id="cta-call-phone-btn"
                      href="tel:+56552428800"
                      className="border border-white/20 hover:border-white hover:bg-white/5 text-white font-bold text-xs uppercase tracking-widest px-8 py-4.5 text-center rounded-sm"
                    >
                      Llamar a Central (+56 55 242 8800)
                    </a>
                  </div>
                </div>
              </section>

            </motion.div>
          )}

          {/* VIEW: SERVICIOS */}
          {currentView === "servicios" && (
            <motion.div
              key="servicios-view"
              custom={viewDirection}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={slideTransition}
              className="py-12 space-y-6 w-full"
            >
              <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="space-y-3 pb-6 border-b border-zinc-200 dark:border-zinc-800">
                  <span className="text-safety-orange font-mono font-bold text-xs uppercase tracking-[0.3em] block">
                    SINTOMEC FICHAS TÉCNICAS
                  </span>
                  <h1 className="font-display font-black text-3xl md:text-5xl text-iron-grey dark:text-white uppercase">
                    Especificaciones De Servicios
                  </h1>
                </div>
              </div>
              
              <ServiceViews
                initialServiceId={preselectedService || "mecanica"}
                onContactRequest={(serviceName) => handleNavigateWithContext("contacto", serviceName)}
              />
            </motion.div>
          )}

          {/* VIEW: PROYECTOS */}
          {currentView === "proyectos" && (
            <motion.div
              key="proyectos-view"
              custom={viewDirection}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={slideTransition}
              className="w-full"
            >
              <ProjectViews
                onContactWithContext={(ctx) => handleNavigateWithContext("contacto", ctx)}
              />
            </motion.div>
          )}

          {/* VIEW: SUMINISTROS */}
          {currentView === "suministros" && (
            <motion.div
              key="suministros-view"
              custom={viewDirection}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={slideTransition}
              className="py-16 bg-zinc-50 dark:bg-zinc-900/30 transition-colors w-full"
            >
              <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-zinc-200 dark:border-zinc-800">
                  <div className="space-y-3">
                    <span className="text-safety-orange font-mono font-bold text-xs uppercase tracking-[0.3em] block">
                      SUMINISTROS INDUSTRIALES DE PRECISIÓN
                    </span>
                    <h1 className="font-display font-black text-3xl md:text-5xl text-iron-grey dark:text-white uppercase leading-none">
                      Catálogo de Productos
                    </h1>
                  </div>

                  {/* Search and Filters */}
                  <div className="flex flex-col sm:flex-row gap-3 font-mono text-xs w-full md:w-auto">
                    <div className="relative flex-grow sm:flex-initial">
                      <Search className="text-zinc-400 absolute left-3 top-3" size={16} />
                      <input
                        type="text"
                        placeholder="Buscar componente..."
                        value={suppliesSearch}
                        onChange={(e) => setSuppliesSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-sm focus:outline-none focus:ring-1 focus:ring-safety-orange text-iron-grey dark:text-zinc-200"
                      />
                    </div>
                  </div>
                </div>

                {/* Supplies Filters category */}
                <div className="flex flex-wrap gap-2 font-mono text-xs border-b border-zinc-100 dark:border-zinc-900 pb-4">
                  {[
                    { id: "todos", label: "Todos los Suministros" },
                    { id: "filtros", label: "Filtros Desecantes" },
                    { id: "ventiladores", label: "Ventiladores Axiales" },
                    { id: "protecciones", label: "Protecciones HSEC" }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      id={`sup-filter-${cat.id}`}
                      onClick={() => setSuppliesFilter(cat.id)}
                      className={`px-4 py-2 border transition-all cursor-pointer rounded-sm font-bold uppercase tracking-wider ${
                        suppliesFilter === cat.id
                          ? "bg-safety-orange text-white border-safety-orange shadow-md shadow-safety-orange/10"
                          : "bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Supplies list layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredSupplies.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-sm overflow-hidden flex flex-col justify-between shadow-md hover:border-safety-orange/40 transition-colors"
                    >
                      <div>
                        {/* Image */}
                        <div className="h-48 overflow-hidden bg-zinc-900">
                          <img
                            alt={item.title}
                            className="w-full h-full object-cover opacity-90"
                            src={item.image}
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Contents */}
                        <div className="p-6 space-y-4">
                          <span className="text-[9px] font-mono font-bold text-safety-orange uppercase tracking-widest block bg-safety-orange/5 px-2 py-0.5 w-fit rounded-sm">
                            {item.category === "filtros" ? "Filtros e Higiene de Aceite" : item.category === "ventiladores" ? "Ventilación Térmica" : "Protección de Seguridad"}
                          </span>
                          <h3 className="font-display font-black text-lg text-iron-grey dark:text-zinc-100 uppercase tracking-tight leading-snug">
                            {item.title}
                          </h3>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans">
                            {item.description}
                          </p>

                          {/* Technical table specifications */}
                          <div className="space-y-1.5 pt-3 border-t border-zinc-100 dark:border-zinc-900">
                            <h4 className="font-mono text-[9px] uppercase font-black text-zinc-400 tracking-wider">
                              Ficha de Rendimiento Técnico:
                            </h4>
                            <ul className="space-y-1 text-[11px] text-zinc-600 dark:text-zinc-400 font-sans list-disc pl-4 leading-tight">
                              {item.specs.map((spec, sidx) => (
                                <li key={sidx}>{spec}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Action trigger footer */}
                      <div className="px-6 pb-6 pt-4 border-t border-zinc-100 dark:border-zinc-900 flex gap-2">
                        <button
                          id={`quote-sup-btn-${item.id}`}
                          onClick={() => handleNavigateWithContext("contacto", item.title)}
                          className="flex-1 bg-zinc-900 hover:bg-safety-orange text-white dark:bg-zinc-900 text-center font-mono font-bold text-[10px] uppercase tracking-widest py-3 cursor-pointer rounded-sm"
                        >
                          Cotizar Suministro
                        </button>
                        <button
                          id={`dl-sup-pdf-${item.id}`}
                          onClick={() => handleDownloadSimulation(item.title)}
                          className="px-3 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 flex items-center justify-center cursor-pointer rounded-sm"
                          aria-label="Descargar plano técnico PDF"
                        >
                          <Download size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </motion.div>
          )}

          {/* VIEW: MINAS / CLIENTES */}
          {currentView === "minas" && (
            <motion.div
              key="minas-view"
              custom={viewDirection}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={slideTransition}
              className="py-16 bg-zinc-50 dark:bg-zinc-900/30 transition-colors w-full"
            >
              <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
                
                {/* Header title */}
                <div className="space-y-3 pb-6 border-b border-zinc-200 dark:border-zinc-800">
                  <span className="text-safety-orange font-mono font-bold text-xs uppercase tracking-[0.3em] block">
                    RED REGIONAL DE PROVEEDORES HOMOLOGADOS
                  </span>
                  <h1 className="font-display font-black text-3xl md:text-5xl text-iron-grey dark:text-white uppercase">
                    Compañías Mineras & Faenas
                  </h1>
                </div>

                {/* Introductory paragraph */}
                <p className="text-zinc-600 dark:text-zinc-300 font-sans text-sm max-w-3xl leading-relaxed">
                  SINTOMEC cuenta con convenios de provisión técnica y contratos marcos activos para faenas críticas ubicadas en la Región de Antofagasta. Nuestra maestranza provee trazabilidad y rapidez en reparaciones correctivas mayores de equipos de chancado, molinos SAG y correas transportadoras.
                </p>

                {/* Faenas grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {MINING_CLIENTS.map((client) => {
                    const isSp = client.status === "Proveedor habilitado";
                    return (
                      <div
                        key={client.id}
                        className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 p-6 md:p-8 rounded-sm shadow-md flex flex-col md:flex-row justify-between gap-6"
                      >
                        {/* Company Detail info */}
                        <div className="space-y-4 flex-grow">
                          <div className="space-y-1">
                            <span className="text-xs font-mono font-bold text-safety-orange">
                              {client.faena}
                            </span>
                            <h3 className="font-display font-black text-2xl text-iron-grey dark:text-zinc-100 uppercase tracking-tight leading-none">
                              {client.name}
                            </h3>
                          </div>

                          {/* Services supplied block */}
                          <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-900">
                            <h4 className="font-mono text-[9px] uppercase font-bold text-zinc-400 tracking-wider">
                              Intervenciones Destacadas Realizadas:
                            </h4>
                            <ul className="space-y-1.5 text-xs text-zinc-500 dark:text-zinc-400 font-sans list-disc pl-4 leading-relaxed">
                              {client.servicesProvided.map((serv, sidx) => (
                                <li key={sidx}>{serv}</li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Badge and certification CTA */}
                        <div className="flex flex-col justify-between items-start md:items-end flex-shrink-0 gap-4">
                          <span className={`px-2.5 py-1 text-[9px] font-mono uppercase tracking-wider font-bold rounded-sm ${
                            isSp 
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20" 
                              : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                          }`}>
                            {client.status}
                          </span>
                          
                          <div className="text-left md:text-right">
                            <span className="text-[10px] font-mono text-zinc-400 block">REGISTRO DE PROVEEDOR</span>
                            <span className="text-[10px] uppercase font-mono font-bold text-zinc-700 dark:text-zinc-300">ESTÁNDAR CLASE A</span>
                          </div>

                          <button
                            id={`quote-faena-btn-${client.id}`}
                            onClick={() => handleNavigateWithContext("contacto", `Atención faena: ${client.faena}`)}
                            className="bg-zinc-100 hover:bg-safety-orange hover:text-white dark:bg-zinc-900 font-mono text-[10px] uppercase font-bold px-4 py-2 cursor-pointer transition-colors w-full rounded-sm text-center"
                          >
                            Solicitar Acreditación
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            </motion.div>
          )}

          {/* VIEW: TRABAJA CON NOSOTROS */}
          {currentView === "empleo" && (
            <motion.div
              key="empleo-view"
              custom={viewDirection}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={slideTransition}
              className="w-full"
            >
              <TrabajaConNosotros />
            </motion.div>
          )}

          {/* VIEW: CONTACTO */}
          {currentView === "contacto" && (
            <motion.div
              key="contacto-view"
              custom={viewDirection}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={slideTransition}
              className="w-full"
            >
              <ContactoView preselectedService={preselectedService} />
            </motion.div>
          )}

          {/* VIEW: ABOUT US & SAFETY TIMELINE */}
          {currentView === "nosotros" && (
            <motion.div
              key="nosotros-view"
              custom={viewDirection}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={slideTransition}
              className="py-16 bg-zinc-50 dark:bg-zinc-900/30 transition-colors w-full"
            >
              <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-16">
                
                {/* Hero introduction block */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-7 space-y-6">
                    <span className="text-safety-orange font-mono font-bold text-xs uppercase tracking-[0.3em] block">
                      DESARROLLO DE ALTO NIVEL COMPROMETIDO
                    </span>
                    <h1 className="font-display font-black text-3xl md:text-5xl text-iron-grey dark:text-white uppercase leading-none">
                      Nuestra Trayectoria & Equipo
                    </h1>
                    <p className="text-zinc-600 dark:text-zinc-300 font-sans text-sm leading-relaxed">
                      Sintomec nace en Antofagasta con el firme propósito de suministrar soluciones de ingeniería especializada en la reparación de interfaces complejas de molienda y accionamientos. Hoy consolidamos nuestro propósito como socio clave de servicios de alto tonelaje.
                    </p>
                    <div className="border-l-4 border-l-safety-orange pl-4 py-1 italic text-zinc-500 dark:text-zinc-400 text-xs font-sans">
                      &ldquo;Nuestra misión es resguardar la continuidad operativa de nuestros clientes con los más exigentes estándares de seguridad HSEC.&rdquo;
                    </div>
                  </div>
                  
                  {/* Photo right badge */}
                  <div className="lg:col-span-5 bg-white dark:bg-zinc-900 p-6 md:p-8 border border-zinc-200 dark:border-zinc-800 rounded-sm shadow-md flex gap-4 items-center">
                    <div className="w-12 h-12 bg-safety-orange text-white rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-safety-orange/15 font-bold">
                      100%
                    </div>
                    <div>
                      <h4 className="font-display font-extrabold text-sm uppercase text-iron-grey dark:text-zinc-200">
                        Compromiso HSEC Cero Accidentes
                      </h4>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-sans leading-relaxed mt-0.5">
                        Guía reglamentaria interna obligatoria con procedimientos no destructivos aprobados.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Team Bios section */}
                <div className="space-y-8 pt-6">
                  <h3 className="font-display font-black text-2xl text-iron-grey dark:text-zinc-100 uppercase tracking-tight relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-safety-orange">
                    Liderazgo Técnico Especializado
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {TEAM_MEMBERS.map((member, midx) => (
                      <div
                        key={midx}
                        className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-sm flex flex-col sm:flex-row gap-6 shadow-sm items-start"
                      >
                        <div className="w-20 h-20 rounded-full bg-zinc-800 overflow-hidden flex-shrink-0 mx-auto sm:mx-0">
                          <img
                            alt={member.name}
                            className="w-full h-full object-cover"
                            src={member.photo}
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="space-y-2 text-center sm:text-left flex-grow">
                          <div>
                            <h4 className="font-display font-black text-lg text-iron-grey dark:text-zinc-100 uppercase leading-none">
                              {member.name}
                            </h4>
                            <span className="text-[10px] font-mono text-safety-orange uppercase tracking-wider block mt-1 font-bold">
                              {member.role}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-sans leading-relaxed">
                            {member.specialty}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Timeline History block */}
                <div className="space-y-8 pt-6">
                  <h3 className="font-display font-black text-2xl text-iron-grey dark:text-zinc-100 uppercase tracking-tight relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-safety-orange">
                    Nuestra Historia / Línea de Tiempo
                  </h3>

                  <div className="relative pl-6 space-y-12 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-zinc-200 dark:before:bg-zinc-800">
                    
                    {/* Time block 1 */}
                    <div className="relative space-y-2">
                      <span className="absolute -left-[23px] top-1.5 w-4 h-4 rounded-full bg-safety-orange border-4 border-white dark:border-zinc-950 shadow-sm" />
                      <span className="font-mono font-black text-sm text-safety-orange block">
                        2012 — Fundación de Sintomec S.A.
                      </span>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 font-sans max-w-xl leading-relaxed">
                        Iniciamos operaciones en pequeña maestranza del Sector Industrial Norte de Antofagasta, enfocados puramente en el torneado de rodillos y bujes para el rubro portuario y de transporte de áridos.
                      </p>
                    </div>

                    {/* Time block 2 */}
                    <div className="relative space-y-2">
                      <span className="absolute -left-[23px] top-1.5 w-4 h-4 rounded-full bg-safety-orange border-4 border-white dark:border-zinc-950 shadow-sm" />
                      <span className="font-mono font-black text-sm text-safety-orange block">
                        2017 — Incorporación del Área Metalizados
                      </span>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 font-sans max-w-xl leading-relaxed">
                        Bajo la dirección industrial del equipo se incorpora la primera unidad robotizada de metalizado Twin Wire Arc Spray, logrando recuperar asientos críticos evitando así tiempos prolongados de espera de los clientes mineros.
                      </p>
                    </div>

                    {/* Time block 3 */}
                    <div className="relative space-y-2">
                      <span className="absolute -left-[23px] top-1.5 w-4 h-4 rounded-full bg-safety-orange border-4 border-white dark:border-zinc-950 shadow-sm" />
                      <span className="font-mono font-black text-sm text-safety-orange block">
                        2022 — Homologación Completa y Normas ISO
                      </span>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 font-sans max-w-xl leading-relaxed">
                        Certificamos de forma unánime y robusta todos nuestros procesos, logrando la máxima categoría de homologación como proveedores mecánicos para faenas de clase mundial chilenas.
                      </p>
                    </div>

                  </div>
                </div>

              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Structural Footer */}
      <Footer onViewChange={(view) => handleViewChange(view)} />

    </div>
  );
}
