/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  icon: string; // lucide icon name
  specs: string[];
  process: string[];
  brands?: string[];
  downloadPdf: string;
}

export interface CaseStudy {
  id: string;
  area: "mecanica" | "metalizados" | "maestranza";
  title: string;
  tag: string;
  image: string;
  description: string;
  problem: string;
  solution: string;
  result: string;
  metricLabel: string;
  metricValue: string;
}

export interface SupplyItem {
  id: string;
  title: string;
  category: "filtros" | "ventiladores" | "protecciones" | "otros";
  image: string;
  description: string;
  specs: string[];
  pdfUrl: string;
}

export interface MiningClient {
  id: string;
  name: string;
  logo: string;
  faena: string;
  servicesProvided: string[];
  status: "Proveedor habilitado" | "En proceso de habilitación" | "Proyectado";
}

export interface Vacancy {
  id: string;
  title: string;
  area: string;
  contractType: string;
  salary?: string;
  experienceYears: number;
  description: string;
  requirements: string[];
}

export interface FAQItem {
  id: string;
  category: "servicios" | "procesos" | "plazos" | "garantias";
  question: string;
  answer: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  serviceArea: string;
  problemDescription: string;
  mineralFaena: string;
  urgency: string;
  attachments?: File[];
}
