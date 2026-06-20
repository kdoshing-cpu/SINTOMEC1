/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ServiceItem, CaseStudy, SupplyItem, MiningClient, Vacancy, FAQItem } from "./types";

export const BRAND_LOGO = "https://lh3.googleusercontent.com/aida/AP1WRLtvjoEXb0xf7M9jczqzmiZ6Ck63dxX8qKtSoyloxdmIDLYwic1FddtxZXyUG171tVS3RzjSizcIUW6GwUEBfecFH8G3GplnRPsJNoG40FYp0foj_SuT58dKgGc4ZivAUsPPWmC28cbuw4mmT2OTASJWCESiJBReGM2puBeZVwFZS-GGC0uvRZ0Arsdz9dpSimrd1jhHX1AdlQ3P23_OoIh7oiCK0OdtQT_bUN36rfa-5sGo3moumG1z1A";
export const PARTNERS_BAR = "https://lh3.googleusercontent.com/aida/AP1WRLul8YH0cPCQvQ8svvrLyLv1AHzluA3jvB4aPKmKie0zwCZiAo8_AUtyMEz_wflxHklTVfhy2wkgdaDh1sTE3Geuve0cPnabfTEUIcb0aJXUi6rq014lRsddBLv01pTSIFPVnEoDvds2DNHXx_NLnIfMOy-Hji01qsJNYvCdTDoA-HHkKpNZp920m62UFuuiFZMDoKD-dlQKLphFxzDSpioqcLSzUeZYICdEOrccyi54Y7ul69eHgzSATA";
export const CERTIFICATE_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuAqo0RQ5z51LWGIWqWEaHxEoAkTTzbPdiJvpoFNxp0DxOiROy_FnPQMdItE_9uyux7-rR4koX-nAPX7KFaCnIWmKutubaN43TQsSgRub6o1clFpenmNr6n-mx4Z2t2sMdQGXvjZoo_frVeyc1zPdpRLWHx3mgIXkKNto2yd8njjauZiwDCbECVBaXWuTZe6vaWeaeC8sfL-n0E-KxnRnAt_BdD9YNvcw2l0SrLhsgOhu0J6fKMvn1SmRBmRYQDrjTK5iQqGHIzWGA";

export const SERVICES: ServiceItem[] = [
  {
    id: "mecanica",
    title: "Área Mecánica",
    description: "Diagnóstico y reparación de componentes críticos mediante metrología avanzada y personal altamente calificado.",
    longDescription: "Servicios de overhaul técnico completo para transmisiones de potencia industrial. Nos especializamos en la inspección, diagnóstico dimensional, alineación y reconstrucción de cajas reductoras multimarca de alta potencia, turbo acoplamientos e interfaces de accionamiento crítico.",
    image: "https://lh3.googleusercontent.com/aida/AP1WRLsFBvtd-dLG9AeipVhewa2poDSBlDKkZRi2C1FFGT9znWgjrW32wma8PLE9hZ2rXje73vef0FTgOeuRZoSpg6GQEu2mqnNJ2ecna35iYxoyvR71TQcrI18eE9_ByEVdlYw9GLtFnny_ylP2hpAnIhP8KZQ6Vh8oo6S3RPXZ8gXL_66bwuUMkzMSZowAXvc3NmrVOmDwcPCE_XFZ8HKaIafCtVYMyxxVVRlFzSitVC3DanO7MfXMqMqF4Q",
    icon: "Settings",
    specs: [
      "Overhaul completo de cajas reductoras de hasta 5,000 HP",
      "Análisis de metrología tridimensional y control dimensional micrométrico",
      "Diagnóstico vibracional y termografía no destructiva",
      "Regulación de precargas de rodamientos de alta velocidad",
      "Ajuste y alineación láser de sistemas motrices integrados"
    ],
    process: [
      "Recepción y registro fotográfico inicial con trazabilidad única",
      "Desarme técnico controlado bajo procedimientos de control HSEC",
      "Limpieza química y evaluación metrológica exhaustiva",
      "Propuesta de ingeniería correctiva y plano de intervención",
      "Reensamblaje de precisión y pruebas en vacío de temperatura y nivel sonoro",
      "Protocolización técnica, pintura industrial y despacho certificado"
    ],
    brands: ["Siemens", "FLENDER", "Falk", "Sumitomo", "SEW-Eurodrive", "Hansen"],
    downloadPdf: "/downloads/ficha-area-mecanica.pdf"
  },
  {
    id: "metalizados",
    title: "Metalizados",
    description: "Recuperación de superficies mediante procesos térmicos certificados para extender la vida útil de sus activos.",
    longDescription: "Mediante tecnología avanzada de proyección térmica o metalizado, recuperamos diámetros de alojamientos de rodamientos, cuellos de ejes y superficies de sello desgastadas. Devolvemos las dimensiones originales a componentes macizos de alto valor sin alterar sus propiedades metalúrgicas.",
    image: "https://lh3.googleusercontent.com/aida/AP1WRLvODC83sttHItLoFj7PA7XrJU-iSe1sc432Kt0MrIxkzuhX3OLNrfWj9Khsli0MYUpD0XtJ8Kl2RFSrijrF09Z-PiIQOyOb5N8UHBaG20RpInKqs9Fc-c9OjflnT43eXi0WuklV4Jq3qdqQeiYeU7Wzi1P1GUDyxJDZ4fODnqhHCCTWbWVkVi6pAEh1XkZNdGfl6f48yYxJBFc8S3B2g4k7DpPa-3QCnui6dsBq2558-x5cltMHYFGk-g",
    icon: "ShieldAlert",
    specs: [
      "Arco Eléctrico (Twin Wire Arc Spray) de alta densidad",
      "Proyección de aceros inoxidables, aleaciones de cromo-níquel y bronce",
      "Cero distorsión térmica: temperatura controlada menor a 120°C en pieza base",
      "Reconstitución estructural de asientos de rodamiento en ejes de transmisión",
      "Espesores aplicables desde 0.2mm hasta 5.0mm con óptima adherencia"
    ],
    process: [
      "Preparación metalúrgica de la zona afectada eliminando trazas de grasa",
      "Mecanizado previo de saneamiento y anclaje mecánico",
      "Proyección térmica robotizada/semiautomática controlando espesor y adherencia",
      "Mecanizado final de superacabado según la tolerancia original del fabricante (normalmente g6, h6 o js6)",
      "Inspección final mediante ensayos no destructivos (Tintas penetrantes/Metrología ultrasónica)"
    ],
    brands: ["Metco", "Castolin Eutectic", "Sulzer", "Tafa"],
    downloadPdf: "/downloads/ficha-area-metalizados.pdf"
  },
  {
    id: "maestranza",
    title: "Maestranza",
    description: "Fabricación de repuestos y mecanizado de alta precisión bajo planos originales o ingeniería inversa.",
    longDescription: "Nuestro taller cuenta con maquinarias y herramientas pesadas con capacidades excelentes para dar respuesta a la gran minería. Fabricamos componentes mecánicos complejos y engranajes, de acuerdo a planos suministrados, muestras físicas o mediante un completo proceso de ingeniería de reversa de alta fidelidad.",
    image: "https://lh3.googleusercontent.com/aida/AP1WRLu3rOymz26UCAFUcKDcOfdv1Sbegv1Om4NwnXbfC9yNjLkFsWGGkEp1sOYee4uv_4J0c4_6wcBO342Sg0p1OVxOokxP-zXQBN21Yx3Hj2fK7xitVSwWkpxTSFPZ8F1UQu0EG7KSwFtitwwi5BQXYW21sEM6dp8oEWwiJV2Ia0k0PcQYN3OwsCzK0-Al7NKlJ2kLj3YkmRM8mlax_kOd_NmFSvPmLJHxEztH7QniNSg7TzOj5VbqYYWnXA",
    icon: "ShieldQuestion",
    specs: [
      "Torno convencional horizontal pesado hasta 3.5m entre puntas",
      "Fresadoras de precisión para chaveteros y perfiles especiales",
      "Prensas hidráulicas de montaje y desmontaje de alta potencia de hasta 400 ton",
      "Capacidades de soldadura MIG, TIG e hilo tubular certificadas por AWS D1.1",
      "Equipos de taladrado radial pesado de gran alcance"
    ],
    process: [
      "Lectura y análisis de planos de fabricación o relevamiento físico",
      "Selección y certificación de material base (Aceros SAE 1045, SAE 4140, SAE 4340, Bronces AP)",
      "Procesos de desbaste primario y mecanizados preliminares",
      "Tratamientos térmicos especializados (Cementación, templado, nitrurado)",
      "Mecanizado final de superacabado y rectificado",
      "Certificación dimensional final y trazabilidad por lote"
    ],
    downloadPdf: "/downloads/ficha-area-maestranza.pdf"
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "case-1",
    area: "mecanica",
    title: "Reparación Integral de Transmisión Principal 3500HP",
    tag: "COBRE • GRAN MINERÍA",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfdGlgsE5y-GKF3pSi-8SMTBlWALAunssNfxQoeBn--Dq2SGty-t2sYUDn7Sn_FX0pCWkYc21IEroGJOhSIs5c8dCDTNx1DEEnh-87aDEC4TwNBCUHZP3LKwYwf_k-s4dRRlBo-R8ZVOTC7LOjtW6k4FH7OBkRfdiX6sBiMrj53NRIeIog1X3v5v2leVM6X36MngHQ4LJ2pub2fjx7aapZvG-qVRXOo9eGMp6tUYdwSE_hNUwp2RliN_t9b742weDM1tnDMffDXw",
    description: "Intervención y overhaul inmediato de reductor de molienda principal afectado por desalineación interna severa.",
    problem: "Falla catastrófica de rodamiento axial en reductor principal Flender de 3500HP, amenazando la detención total de la planta de molienda en faena minera crítica y provocando elevadas pérdidas de productividad por hora.",
    solution: "Se determinó el desarme en taller en un turno ininterrumpido de 24 horas, metrología dimensional en 3D, reparación de alojamientos mediante proyección por arco eléctrico, rectificado de precisión y reemplazo completo del paquete de rodamientos originales con ajuste de precarga mediante lainado calibrado.",
    result: "El reductor retornó a su operación óptima presentando valores de vibración y temperatura notablemente inferiores a los parámetros normales de partida, garantizando la continuidad del negocio minero.",
    metricLabel: "Días de entrega ahorrados",
    metricValue: "6 Días"
  },
  {
    id: "case-2",
    area: "metalizados",
    title: "Metalizado de Ejes Críticos de Molienda SAG",
    tag: "RECUPERACIÓN DE EJES",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC53CiZkgNynFCzzGLAAQAKQ--Mc6ZH77RmvJ-ZQ1Nb2vLqPoPui7g1nMSwwXZ2ZhBRYqdobhtTfm9Y1GEy96q-Lv-fL0evFaKVZiTR98PiS6asKT_NtBJg48tr-SfWU-F2LxunwtZTHMDsQ4f7fIbtGLaSbmHlc-mm1jlCtsJ6BEGPUTzyArBlg8D43_1nLQmAv46wIHOgKUCkKrp9WGonxD0c9Oa67MZioeO6h6IeRYz5-vOaUPu8mZQliLamaqHKrcOw1plFCw",
    description: "Reconstitución dimensional de cuellos de apoyo de rodamientos sin alteración estructural mediante Spray Térmico.",
    problem: "Eje piñón de accionamiento de molino SAG presentaba holgura de alojamiento por fatiga y fricción acumulada, provocando pérdida crítica de torque y cabeceo mecánico severo en el engrane principal.",
    solution: "Aplicación de pre-mecanizado de saneamiento, chorreado con óxido de aluminio para alta rugosidad, metalizado por Twin Wire Arc Spray usando aleación de alta dureza al cromo-níquel, y rectificado en torno pesado para restablecer ajuste original h6.",
    result: "Recuperación física del componente en un 25% del valor de adquisición de un eje nuevo, extendiendo la resistencia al desgaste superficial en un 150% debido a las propiedades superiores del revestimiento.",
    metricLabel: "Ahorro v/s Parte Nueva",
    metricValue: "75%"
  },
  {
    id: "case-3",
    area: "maestranza",
    title: "Fabricación de Piñones de Alta Aleación",
    tag: "INGENIERÍA E INGENIERÍA INVERSA",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBwCJBaYH__lzSVE2Wp1qk47ZOFJLRxYisY_4xMA1Ran9K5DXzqRC00pw3cDFX6pWgGGgVRWPHGTqQg5R6KeJKimexDmxFEqTJt6URsPV84w_VxPEZhpdeGWvBcoYTawW9mOUrAquBrNF_n9mC7trYo3xBkQ8oSgkoNH-da-fHksyekBIiKk_7mL5mw_ZGGByW1U7ICZpOV037Q0-g9Z2QjU-iLMY-7FsTpdo3EBPLsQXHWSPWzkpaV9M3xQmQlqOQjT6B6oFDL5g",
    description: "Modelado e ingeniería tridimensional en taller para fabricación acelerada de piñones estriados helicoidales.",
    problem: "Inexistencia de disponibilidad de repuestos originales de fabricante extranjero para piñón helicoidal inclinado, con tiempo de importación estimado de 4 meses.",
    solution: "Se ejecutó ingeniería de reversa mediante recolección de nubes de puntos de engranaje dañado, recreación CAD/CAM, selección de barra de acero SAE 4340 aleado recocido, mecanizado de ranuras en fresadora universal, tratamiento de cementación y revenido para 58 HRC de dureza superficial, y rectificado final.",
    result: "Suministro de engranaje óptimo de calidad y resistencia equivalente a la pieza original, fabricado localmente en Antofagasta en solo 12 días calendario.",
    metricLabel: "Semanas de plazo evitadas",
    metricValue: "14 Sem."
  }
];

export const SUPPLIES: SupplyItem[] = [
  {
    id: "sup-1",
    title: "Filtros Respiraderos Desecantes",
    category: "filtros",
    image: "https://lh3.googleusercontent.com/aida/AP1WRLvG8e7Y3V4ws6MvM-jBwXWMoGDT3DqdZDvQjR_P5R7QDMaNkBYfKpNLk3NZwgZJLxeca5yIz3JeYjLOUusCrJ-rAp7H_hVqDXMsnLdaAMY0f-0QsiXCKh3j97L6WT_kGc3CmLlv5oaZqGCaN3wFZQhtml6f48yYxJBFc8S3B2g4k7DpPa-3QCnui6dsBq2558-x5cltMHYFGk-g",
    description: "Sistemas avanzados de respiración con absorción de humedad y filtración de micropartículas sólidas de polvo sílice, ideales para mantener el aceite de lubricación de su reductor en perfectas condiciones NAS.",
    specs: [
      "Remueve humedad mediante gel de sílice de alta capacidad de absorción",
      "Retención de partículas sólidas de hasta 3 micrones",
      "Carcasa de policarbonato de alta resistencia al impacto y temperaturas extremas",
      "Indicador visual de saturación por cambio de color reactivo"
    ],
    pdfUrl: "/downloads/catalogo-filtros-respiraderos.pdf"
  },
  {
    id: "sup-2",
    title: "Ventiladores Axiales Industriales para Reductores",
    category: "ventiladores",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC53CiZkgNynFCzzGLAAQAKQ--Mc6ZH77RmvJ-ZQ1Nb2vLqPoPui7g1nMSwwXZ2ZhBRYqdobhtTfm9Y1GEy96q-Lv-fL0evFaKVZiTR98PiS6asKT_NtBJg48tr-SfWU-F2LxunwtZTHMDsQ4f7fIbtGLaSbmHlc-mm1jlCtsJ6BEGPUTzyArBlg8D43_1nLQmAv46wIHOgKUCkKrp9WGonxD0c9Oa67MZioeO6h6IeRYz5-vOaUPu8mZQliLamaqHKrcOw1plFCw",
    description: "Grupos ventiladores para montaje directo sobre ejes rápidos o como consolas independientes, garantizando la óptima evacuación térmica y disipación de calor acumulado por exigencias de molienda o correas de transporte.",
    specs: [
      "Aspas balanceadas dinámicamente con perfiles aerodinámicos de alta eficiencia",
      "Construcción estructural de aluminio inyectado o polímeros reforzados",
      "Sentido de giro reversible para limpieza rápida por soplado",
      "Bajo nivel de emisiones sonoras según normativas ambientales chilenas"
    ],
    pdfUrl: "/downloads/catalogo-ventiladores.pdf"
  },
  {
    id: "sup-3",
    title: "Protecciones Metálicas de Seguridad",
    category: "protecciones",
    image: "https://lh3.googleusercontent.com/aida/AP1WRLu3rOymz26UCAFUcKDcOfdv1Sbegv1Om4NwnXbfC9yNjLkFsWGGkEp1sOYee4uv_4J0c4_6wcBO342Sg0p1OVxOokxP-zXQBN21Yx3Hj2fK7xitVSwWkpxTSFPZ8F1UQu0EG7KSwFtitwwi5BQXYW21sEM6dp8oEWwiJV2Ia0k0PcQYN3OwsCzK0-Al7NKlJ2kLj3YkmRM8mlax_kOd_NmFSvPmLJHxEztH7QniNSg7TzOj5VbqYYWnXA",
    description: "Diseño y fabricación a la medida de cubiertas metálicas e intercambiadoras de calor integradas y jaulas protectoras HSEC para evitar zonas de atrapamiento en acoplamientos, poleas y terminales de eje.",
    specs: [
      "Rigurosa conformidad con normativas de seguridad minera chilenas",
      "Fabricación robusta con pintura de alta resistencia (esquema epóxico minero)",
      "Puntos de inspección visual rápida integrados sin necesidad de retiro",
      "Fácil anclaje mecánico modular adaptado al chasis de planta"
    ],
    pdfUrl: "/downloads/catalogo-protecciones.pdf"
  }
];

export const MINING_CLIENTS: MiningClient[] = [
  {
    id: "centinela",
    name: "Minera Centinela",
    logo: "https://lh3.googleusercontent.com/aida/AP1WRLul8YH0cPCQvQ8svvrLyLv1AHzluA3jvB4aPKmKie0zwCZiAo8_AUtyMEz_wflxHklTVfhy2wkgdaDh1sTE3Geuve0cPnabfTEUIcb0aJXUi6rq014lRsddBLv01pTSIFPVnEoDvds2DNHXx_NLnIfMOy-Hji01qsJNYvCdTDoA-HHkKpNZp920m62UFuuiFZMDoKD-dlQKLphFxzDSpioqcLSzUeZYICdEOrccyi54Y7ul69eHgzSATA",
    faena: "Faena Centinela, Antofagasta Minerals",
    servicesProvided: ["Overhaul caja reductora secundaria de harnero", "Metalizado de alojamientos de descansos de correa principal 102"],
    status: "Proveedor habilitado"
  },
  {
    id: "antucoya",
    name: "Minera Antucoya",
    logo: "https://lh3.googleusercontent.com/aida/AP1WRLul8YH0cPCQvQ8svvrLyLv1AHzluA3jvB4aPKmKie0zwCZiAo8_AUtyMEz_wflxHklTVfhy2wkgdaDh1sTE3Geuve0cPnabfTEUIcb0aJXUi6rq014lRsddBLv01pTSIFPVnEoDvds2DNHXx_NLnIfMOy-Hji01qsJNYvCdTDoA-HHkKpNZp920m62UFuuiFZMDoKD-dlQKLphFxzDSpioqcLSzUeZYICdEOrccyi54Y7ul69eHgzSATA",
    faena: "Faena Antucoya, Sierra Gorda",
    servicesProvided: ["Reparación acelerada de acoplamiento hidráulico de transmisión", "Fabricación de poleas tensoras en taller de maestranza"],
    status: "Proveedor habilitado"
  },
  {
    id: "sqm",
    name: "SQM",
    logo: "https://lh3.googleusercontent.com/aida/AP1WRLul8YH0cPCQvQ8svvrLyLv1AHzluA3jvB4aPKmKie0zwCZiAo8_AUtyMEz_wflxHklTVfhy2wkgdaDh1sTE3Geuve0cPnabfTEUIcb0aJXUi6rq014lRsddBLv01pTSIFPVnEoDvds2DNHXx_NLnIfMOy-Hji01qsJNYvCdTDoA-HHkKpNZp920m62UFuuiFZMDoKD-dlQKLphFxzDSpioqcLSzUeZYICdEOrccyi54Y7ul69eHgzSATA",
    faena: "Faena Salar de Atacama & María Elena",
    servicesProvided: ["Metalizado anti-corrosión en ejes de bombas dosificadoras", "Revisión estructural de poleas deflectoras"],
    status: "Proveedor habilitado"
  },
  {
    id: "bhpescondida",
    name: "BHP Escondida",
    logo: "https://lh3.googleusercontent.com/aida/AP1WRLul8YH0cPCQvQ8svvrLyLv1AHzluA3jvB4aPKmKie0zwCZiAo8_AUtyMEz_wflxHklTVfhy2wkgdaDh1sTE3Geuve0cPnabfTEUIcb0aJXUi6rq014lRsddBLv01pTSIFPVnEoDvds2DNHXx_NLnIfMOy-Hji01qsJNYvCdTDoA-HHkKpNZp920m62UFuuiFZMDoKD-dlQKLphFxzDSpioqcLSzUeZYICdEOrccyi54Y7ul69eHgzSATA",
    faena: "Minera Escondida, Antofagasta",
    servicesProvided: ["Estudio de ingeniería inversa para piñón reductor principal", "Diagnóstico por ultrasonido in-situ de descansos mecánicos"],
    status: "En proceso de habilitación"
  },
  {
    id: "codelco",
    name: "Codelco",
    logo: "https://lh3.googleusercontent.com/aida/AP1WRLul8YH0cPCQvQ8svvrLyLv1AHzluA3jvB4aPKmKie0zwCZiAo8_AUtyMEz_wflxHklTVfhy2wkgdaDh1sTE3Geuve0cPnabfTEUIcb0aJXUi6rq014lRsddBLv01pTSIFPVnEoDvds2DNHXx_NLnIfMOy-Hji01qsJNYvCdTDoA-HHkKpNZp920m62UFuuiFZMDoKD-dlQKLphFxzDSpioqcLSzUeZYICdEOrccyi54Y7ul69eHgzSATA",
    faena: "División Chuquicamata & División Radomiro Tomic",
    servicesProvided: ["Overhaul mayor reductor sumador de correa de alta potencia", "Maquetado CAD de repuestos descontinuados de chancador primario"],
    status: "Proveedor habilitado"
  }
];

export const VACANCIES: Vacancy[] = [
  {
    id: "vac-1",
    title: "Soldador de Alta Precisión (Certificación AWS D1.1)",
    area: "Taller Maestranza, Antofagasta",
    contractType: "Plazo Fijo, luego Indefinido",
    salary: "$1,300,000 - $1,600,000 Líquido",
    experienceYears: 4,
    description: "Buscamos un soldador calificado y certificado según código AWS D1.1 con amplia experiencia en recuperación estructural de piezas pesadas, mecanizados y relleno metalúrgico mediante sistemas MIG, TIG de aleaciones de alta resistencia.",
    requirements: [
      "Certificación AWS D1.1 vigente y al día",
      "Mínimo 4 años comprobables en talleres de maestranza minera u obras pesadas",
      "Residencia en la ciudad de Antofagasta (excluyente, no contamos con campamento)",
      "Capacidad excelente de lectura e interpretación de planos mecánicos y de soldadura",
      "Aprobación de exámenes pre-ocupacionales técnicos y de altura geográfica"
    ]
  },
  {
    id: "vac-2",
    title: "Técnico de Metrología y Diagnóstico Mecánico",
    area: "Área Mecánica, Antofagasta",
    contractType: "Contrato Indefinido",
    salary: "$1,400,000 - $1,750,000 Líquido",
    experienceYears: 3,
    description: "Responsable de guiar el desarme, diagnosticar tolerancias y holguras de montaje micrométricas, registrar informes de metrología interna de cajas reductoras pesadas de engranaje y asegurar la trazabilidad del proceso.",
    requirements: [
      "Título Técnico Profesional de nivel Superior en Mecánica Industrial o similar",
      "Manejo avanzado de herramientas micrométricas (Alexómetros, micrómetros de interiores y exteriores)",
      "Habilidad analítica para documentar informes de fallo y hojas de ruta en formato digital",
      "Experiencia comprobable en reductoras de alta potencia Flender, Falk o Hansen",
      "Licencia de conducir Clase B (Deseable para visitas y tomas de datos en terreno)"
    ]
  },
  {
    id: "vac-3",
    title: "Operador de Torno y Mandrinadora Convencional Pesada",
    area: "Taller Maestranza, Antofagasta",
    contractType: "Plazo Fijo / Por Turno",
    salary: "$1,200,000 - $1,500,000 Líquido",
    experienceYears: 5,
    description: "Operación especializada de tornos convencionales horizontales pesados de hasta 4 metros entre puntas para rectificado, cilindrado de ejes de transmisión y mecanizado de precisiones según tolerancias mecánicas estrictas g6/js6.",
    requirements: [
      "Experiencia mínima demostrable de 5 años operando maquinarias pesadas en maestranza",
      "Precisión micrométrica absoluta y autónoma (preparación y montaje de piezas de gran tonelaje)",
      "Dominio y cuidado de herramientas de afilado de cuchillas de corte rápido y carburo",
      "Compromiso inquebrantable con las normas de seguridad del taller (Control HSEC)",
      "Disponibilidad para trabajar en régimen de turnos rotativos en caso de emergencias mineras"
    ]
  }
];

export const FAQS: FAQItem[] = [
  {
    id: "faq-1",
    category: "servicios",
    question: "¿Qué marcas y tipos de cajas reductoras están capacitados para reparar?",
    answer: "Reparamos y realizamos overhaul técnico a transmisiones de potencia industriales de todas las marcas líderes del mercado, entre ellas Siemens, FLENDER, Falk, Sumitomo, SEW-Eurodrive y Hansen. Trabajamos tanto en cajas reductoras planetarias, helicoidales, colineales y de ejes paralelos de hasta 5,000 HP."
  },
  {
    id: "faq-2",
    category: "procesos",
    question: "¿En qué consiste el proceso de control dimensional o metrotécnico?",
    answer: "Cada componente ingresado es desarmado técnicamente previo registro fotográfico. Con micrómetros de rango calibrados por laboratorios acreditados, registramos las cotas dimensionales exactas de asientos de rodamiento, chaveteros, terminales y cuellos. Posteriormente, emitimos un protocolo oficial antes de iniciar cualquier proceso correctivo."
  },
  {
    id: "faq-3",
    category: "plazos",
    question: "¿Cuál es el tiempo de respuesta frente a una emergencia correctiva de molienda?",
    answer: "Entendemos que un chancador o molino detenido representa pérdidas inmensables. Contamos con un servicio de guardia técnica y turnos de maestranza ininterrumpidos 24/7. Las intervenciones de emergencia se planifican para comenzar inmediatamente tras recibir el componente en nuestro taller de Antofagasta."
  },
  {
    id: "faq-4",
    category: "garantias",
    question: "¿Qué tipo de garantía ofrecen en sus reparaciones mecánicas y mecánicos?",
    answer: "Todas nuestras intervenciones mayores cuentan con una garantía técnica estándar de 12 meses frente a defectos latentes de ejecución o tolerancias de mecanizado. Cada entrega incluye un dossier de aseguramiento de calidad con planos, certificados de metrología, análisis de rodamientos de repuestos e informe de pruebas de rodaje en vacío."
  },
  {
    id: "faq-5",
    category: "servicios",
    question: "¿Se encuentra Sintomec inscrita en registros de proveedores?",
    answer: "Sí, actualmente nos encontramos plenamente registrados y homologados en los principales portales de abastecimiento industrial, cumpliendo con todas las exigencias legales y técnicas que nos habilitan para postular e intervenir en contratos de la gran minería."
  }
];

export const TEAM_MEMBERS = [
  {
    name: "Jonathan Salinas",
    role: "Gerente de Servicios & Especialista Técnico",
    specialty: "Ingeniería de Transmisiones de Cajas Reductoras de Alta Potencia • Ex-Flender Chile",
    photo: "https://lh3.googleusercontent.com/aida-public/AB6AXuC53CiZkgNynFCzzGLAAQAKQ--Mc6ZH77RmvJ-ZQ1Nb2vLqPoPui7g1nMSwwXZ2ZhBRYqdobhtTfm9Y1GEy96q-Lv-fL0evFaKVZiTR98PiS6asKT_NtBJg48tr-SfWU-F2LxunwtZTHMDsQ4f7fIbtGLaSbmHlc-mm1jlCtsJ6BEGPUTzyArBlg8D43_1nLQmAv46wIHOgKUCkKrp9WGonxD0c9Oa67MZioeO6h6IeRYz5-vOaUPu8mZQliLamaqHKrcOw1plFCw"
  },
  {
    name: "Héctor Valenzuela",
    role: "Jefe de Taller de Maestranza",
    specialty: "Mecanizados de Alta Tolerancia y Control de Calidad AWS D1.1 • 18 Años de Maestranza",
    photo: "https://lh3.googleusercontent.com/aida-public/AB6AXuBwCJBaYH__lzSVE2Wp1qk47ZOFJLRxYisY_4xMA1Ran9K5DXzqRC00pw3cDFX6pWgGGgVRWPHGTqQg5R6KeJKimexDmxFEqTJt6URsPV84w_VxPEZhpdeGWvBcoYTawW9mOUrAquBrNF_n9mC7trYo3xBkQ8oSgkoNH-da-fHksyekBIiKk_7mL5mw_ZGGByW1U7ICZpOV037Q0-g9Z2QjU-iLMY-7FsTpdo3EBPLsQXHWSPWzkpaV9M3xQmQlqOQjT6B6oFDL5g"
  }
];
