// Central Data Store for PROSUR AI Demo Showcase (Cleaned State with Real Users, Companies & Firebase Sync)
import { 
  isFirebaseConfigured, 
  db, 
  collection, 
  doc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot 
} from './firebase.js';

const STORAGE_KEY = 'prosur_ai_showcase_state';

// Generate avatar placeholder helper
function getAvatar(name) {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D9488&color=fff&bold=true`;
}

// Official list of Companies (Empresas) from Reto IA Prosur
export const companies = [
  'Grupo Chesa',
  'Calzamoda',
  '5 Pinos',
  'CaFi',
  'Grupo Prosur',
  'Otra'
];

// Official list of Teams (Equipos) from the Reto IA Prosur Google Sheet
export const rawTeamsData = [
  {
    name: 'TORQUE LEAD IA',
    company: 'Grupo Chesa',
    department: 'Ventas',
    members: 'YAHIR IVAN LOPEZ GOMEZ',
    projectTitle: 'RMP CENTER IA',
    problem: 'Nuestro principal reto es Seekop, es un CRM necesario para el proceso de ventas pero con carencias de actualización.',
    solution: 'Basado en Seekop pero con integración de motores generadores de Multimedia, análisis de perfil de clientes, propuestas de cierre de ventas basadas en el comportamiento actual de compra, generador de argumentos inteligentes dirigidos a la persuasión y un cierre de ventas con seguimientos efectivos.',
    metrics: 'Satisfacción del usuario 24/7'
  },
  {
    name: 'Lead Pilot',
    company: 'Grupo Chesa',
    department: 'Ventas',
    members: 'VALERIA CAROLINA CONTRERAS GÓMEZ',
    projectTitle: 'Lead Pilot — Atención Digital',
    problem: 'Lentitud y poca objetividad en atención digital al cliente y perfilamiento.',
    solution: 'Asistente de IA para automatizar la atención digital inicial, perfilamiento objetivo de prospectos y agendamiento de citas en tiempo real.',
    metrics: 'Aumento en velocidad de respuesta y tasa de conversión de prospectos digitalizados.'
  },
  {
    name: 'Los que perdieron',
    company: 'Grupo Chesa',
    department: 'MKT',
    members: 'Marlon Octavio Giles García, Giovanni Trejo Matias',
    projectTitle: 'Recordatorio Inteligente de Servicios MKT',
    problem: 'Muchos clientes olvidan sus servicios de mantenimiento y ponen en riesgo la garantía de sus vehículos.',
    solution: 'Sistema automatizado de comunicación proactiva por WhatsApp y correo para alertar a clientes sobre fechas clave de servicio de garantía.',
    metrics: 'Reducción de garantías perdidas e incremento en retención de clientes en taller.'
  },
  {
    name: 'Procesos',
    company: 'Calzamoda',
    department: 'Auditoria y Procesos',
    members: 'Diego López Guzmán, Felipe de Jesús Paniagua Ruiz',
    projectTitle: 'Resurtido_compras_rv',
    problem: 'La planeación de compras en la empresa RIO VINYL DE MÉXICO requiere la extracción, validación y consolidación manual de información desde el ERP (Microsip) hacia hojas de cálculo, tomando 4 horas por ciclo operativo.',
    solution: 'Sistema que ejecuta automáticamente la planeación de compras y resurtido mediante un agente de IA Groq que procesa comandos por correo electrónico ("Realizar Resurtido") y ejecuta scripts automatizados de cálculo.',
    metrics: 'Tiempo por ciclo: de 4 horas a menos de 10 minutos. Errores de cálculo: de variable a cero. Dependencia de persona clave: eliminada.'
  },
  {
    name: 'T-800',
    company: 'CaFi',
    department: 'Marketing',
    members: 'Oswaldo Rafael Hernández Rodríguez',
    projectTitle: 'Automatización de captura, asignación de leads y atención de prospectos',
    problem: 'Proceso manual de asignación de leads desde CRM Kommo hacia Excel, demorando más de 4 horas en volumen elevado.',
    solution: 'Automatización integrada entre CRM Kommo, Google Sheets y agentes de IA de ElevenLabs mediante n8n/make. Fuera del horario laboral, un agente de IA realiza el primer contacto telefónico/chat con el prospecto.',
    metrics: 'Automatizar el 100% de asignación de leads. Ahorrar +20 horas semanales (80 hrs/mes), reduciendo tiempo de asignación de horas a segundos.'
  },
  {
    name: 'El ingeniero',
    company: 'Calzamoda',
    department: 'Sub Gerente',
    members: 'Los ingenieros (120034, 121805, 121830, 121750, 121476, 121405)',
    projectTitle: 'Venta Sugestiva e Inteligente',
    problem: 'La venta sugestiva y la atención a clientes por mensajería se realizan de forma manual, provocando respuestas tardías e inconsistentes.',
    solution: 'Bot conversacional con IA para mensajería directa que envía mensajes de venta sugestiva personalizada y resuelve preguntas frecuentes en tiempo real.',
    metrics: 'Incremento en ventas cruzadas y reducción inmediata en tiempo de respuesta al cliente.'
  },
  {
    name: 'RefaBot Team',
    company: 'Grupo Chesa',
    department: 'Refacciones',
    members: 'Carlos de Jesús Camacho Sánchez',
    projectTitle: 'RefaBot Posventa',
    problem: 'Falta de seguimiento inmediato del personal de refacciones y estancamiento en WhatsApp para solicitudes de insumos de mantenimiento Changan y Renault.',
    solution: 'Bot con inteligencia artificial de catálogo de refacciones para atender y priorizar solicitudes de insumos por WhatsApp para agencias y talleres.',
    metrics: 'Eliminación de cuellos de botella operativos en refacciones y aceleración en tiempos de entrega al cliente.'
  },
  {
    name: 'G&A',
    company: 'CaFi',
    department: 'Administración',
    members: 'KARINA SUAREZ ALVAREZ, JUAN GONZALO CRUZ LOPEZ, RIGOBERTO IVAN MALDONADO RAMOS, MARIO ARTURO LOPEZ GOMEZ',
    projectTitle: 'ContaAnalytics',
    problem: 'Grandes volúmenes de información financiera y operativa dispersos en múltiples archivos Excel/PDF entre sucursales, dificultando el análisis y retrasando reportes.',
    solution: 'ContaAnalytics: plataforma inteligente de análisis y visualización de datos que transforma automáticamente archivos de sucursales en dashboards ejecutivos, KPIs de inventarios, ventas, compras, gastos y costos.',
    metrics: 'Reducción drástica del tiempo de consolidación financiera, eliminación de errores manuales y disponibilidad de datos 24/7 para toma de decisiones.'
  },
  {
    name: 'OpTeam',
    company: 'Grupo Chesa',
    department: 'Ventas',
    members: 'Fernando De Jesús Mora Saldaña',
    projectTitle: 'OpTeam CRM Inteligente',
    problem: 'Dificultad para clasificar y dar seguimiento oportuno a prospectos en viajes o prospección fuera de agencia.',
    solution: 'Sistema móvil asistido por IA para categorización automática de prospectos por urgencia y recordatorios inteligentes de seguimiento.',
    metrics: 'Cero prospectos fríos olvidados y aumento del 30% en tasa de contacto efectivo.'
  },
  {
    name: 'TalentIA 360',
    company: 'Grupo Chesa',
    department: 'Talento Humano',
    members: 'MARIA ELIZABETH OVALLE ISLAS, ALEJANDRA JOCABETH GORDILLO MORALES',
    projectTitle: 'TalentIA360',
    problem: 'Gestión de más de 800 colaboradores en 24 agencias mediante 6 archivos Excel desconectados. Reportes tardaban 7 a 10 días de consolidación manual.',
    solution: 'Dashboard web conectado en tiempo real a plataforma interna que centraliza reclutamiento, rotación, polígrafo y vacantes en un solo panel ejecutivo.',
    metrics: 'Consolidación de reportes reducida de 7-10 días a 0 minutos (tiempo real). Ahorro de 5h/semana en carga manual. Costo $0 en infraestructura existente.'
  },
  {
    name: 'Impulso Inteligente',
    company: 'Grupo Chesa',
    department: 'BDC',
    members: 'Angel Francisco Lievano Trejo',
    projectTitle: 'PULSO BDC Servicio',
    problem: 'Uso de información dispersa de DMS, CRM, PROSUR y SIMA requería depurar y clasificar a mano registro por registro durante 12 horas-persona por semana.',
    solution: 'Tablero web que recibe archivos Excel de cualquier sucursal, detecta automáticamente el tipo de reporte, deduce la marca por VIN y clasifica órdenes/citas.',
    metrics: 'Ahorro de 12 horas a 1 hora por corte en consolidación y clasificación, entregando información el mismo día.'
  },
  {
    name: 'Smart Norm',
    company: 'Grupo Chesa',
    department: 'Talento Humano',
    members: 'GIBRAN HASHMED GARCIA CRUZ, LAURA JOVANNA TRUJILLO SOLORZANO',
    projectTitle: 'Cumplimiento normativo (STPS)',
    problem: 'Procesar más de 52,000 registros mensuales de asistencia de 600 colaboradores en 20 agencias para evaluar la norma de jornada laboral (40 hrs).',
    solution: 'Plataforma HTML con Claude que procesa 52,000 datos en menos de 15 minutos, calcula KPIs de jornada y genera PDF con firma tripartita para soporte documental STPS.',
    metrics: 'De semanas de trabajo manual a menos de 15 minutos. Eliminación total de checadas manuales.'
  },
  {
    name: 'La patrulla del chip perdido',
    company: 'CaFi',
    department: 'Administración',
    members: 'Stephanie Hernández, Cesar Flores, Vicente Jimenez Najera',
    projectTitle: 'Los GuardIAnes del Activo 🦹‍♂️🤖',
    problem: 'Control manual de activos fijos en Microsip y Excel consumiendo 8+ horas semanales, con riesgo de error en depreciaciones y falta de resguardos digitales.',
    solution: 'Sistema Inteligente de Control de Activos Fijos y Flotilla Vehicular en Claude: integra OCR para facturas PDF/XML, clasificación contable/ISR con LLM, visión artificial para inventario por códigos QR y pólizas automáticas para CONTPAQi.',
    metrics: 'Ahorro >80% de horas/mes en control de activos. Reducción del 90% en errores de depreciación. 100% resguardos digitales.'
  },
  {
    name: 'La santa conciliación',
    company: 'CaFi',
    department: 'Contabilidad',
    members: 'Elizabeth Carpio, Vicente Jimenez Najera',
    projectTitle: 'Conciliación tarjeta clara',
    problem: 'Conciliación manual de viáticos de Tarjeta Clara consumía 20 horas/mes cruzando 3 fuentes distintas contra provisión en Excel.',
    solution: 'Aplicación de escritorio con motor de conciliación de 3 pasadas y coincidencia aproximada de texto (rapidfuzz), generando pólizas automáticas CONTPAQi y correos de seguimiento a tarjetahabientes.',
    metrics: 'Ciclo completo 24 veces más rápido (4 horas a 10 min). Ahorro de 19.2 h/mes (-95.8% del tiempo). 100% de movimientos clasificados en julio 2026 ($294,716 MXN).'
  },
  {
    name: 'El Señor de los arrendamientos',
    company: 'CaFi',
    department: 'Contabilidad',
    members: 'Vicente Jiménez',
    projectTitle: 'Plataforma NIF Inteligente',
    problem: 'Cálculos de NIF D-3 (Pasivo laboral), D-4 (Impuesto diferido) y D-5 (Arrendamientos) hechos en hojas de trabajo manuales en Excel con alto riesgo de auditoría.',
    solution: 'Plataforma Flask + SQLite que automatiza el cálculo de pasivos por arrendamiento NIF D-5, provisiones NIF D-3 e impuestos diferidos NIF D-4, integrando un asistente conversacional Claude Sonnet 4.6 especializado.',
    metrics: 'Reducción de 10 a 12 horas por contador por cierre mensual. Generación de los 4 estados financieros NIF en menos de 15 minutos.'
  },
  {
    name: 'El oráculo corporativo',
    company: 'CaFi',
    department: 'Mejora Continua',
    members: 'Laura Villafuerte, Erika Camacho, Vicente Jimenez Najera',
    projectTitle: 'ProsurGPT',
    problem: 'Documentación de políticas, manuales y leyes dispersa y poco accesible, generando interrupciones constantes a las áreas de RRHH, Finanzas y Mejora Continua.',
    solution: 'ProsurGPT: Copiloto de conocimiento RAG que responde en lenguaje natural sobre manuales, políticas y directivas oficiales, citando fuente y página sin alucinaciones.',
    metrics: 'Búsqueda de información reducida de 30 minutos a 15 segundos. Reducción esperada del 40% en consultas repetitivas en los primeros 3 meses.'
  },
  {
    name: 'Apex GP',
    company: 'Grupo Chesa',
    department: 'Capacitación',
    members: 'José Iván Mayorga Ruiz, Alejandra Jocabeth Gordillo Morales, María Elizabeth Ovalle Islas',
    projectTitle: 'Apex Nissan',
    problem: 'Dificultad y lentitud para recopilar datos técnicos de vehículos y transformarlos en contenido de capacitación para colaboradores.',
    solution: 'Plataforma gamificada con IA Generativa (estilo Duolingo) para aprendizaje automotriz interactivo con rutas adaptativas según el desempeño del colaborador.',
    metrics: 'Reducción del 80% en tiempo de creación de contenido. Aumento en tasa de finalización de cursos y retención del conocimiento.'
  },
  {
    name: 'TU GUARDIAN CAFI',
    company: 'CaFi',
    department: 'Prevención de fraudes',
    members: 'Claudia Fabiola Morales Gordillo, Guadalupe Alejandra Bermúdez Abarca',
    projectTitle: 'Tu GuardIAn Cafi!!',
    problem: 'Revisión manual de 850 expedientes de crédito al mes (250 h/mes) para detectar alteraciones documentales en INE, comprobantes y nóminas.',
    solution: 'Sistema automatizado con Claude Sonnet 4.6 (Visión AI) que examina documentos en 45 segundos, validando CURP, MRZ, estructuras de nómina y coherencia de datos.',
    metrics: 'Tiempo de análisis por documento reducido de 15 minutos a 45 segundos. Liberación de +320 horas mensuales.'
  },
  {
    name: 'Talento Humano',
    company: 'Grupo Chesa',
    department: 'Recursos Humanos',
    members: 'MARIA ELIZABETH OVALLE ISLAS, ALEJANDRA JOCABETH GORDILLO MORALES, FATIMA PENELOPE PEREZ CERON',
    projectTitle: 'Autogestión Sala de Capacitación',
    problem: 'Reserva manual de sala de capacitación vía WhatsApp o llamadas, generando empalmes de horario y pérdida de tiempo.',
    solution: 'Aplicación web de autoservicio en Claude que valida automáticamente traslapes y permite reservar salas en tiempo real sin intermediarios.',
    metrics: 'Reducción del tiempo de coordinación de horas a segundos. Cero reservaciones dobles.'
  },
  {
    name: 'IVA Corporativa',
    company: 'Grupo Chesa',
    department: 'Innovación',
    members: 'Iván Esaú Nájera López, Armando Renato Ruiz Gómez, Víctor Hugo Liévano Pérez',
    projectTitle: 'Integración y pagos de reclamos de garantías CHESA',
    problem: 'Falta de orden y digitalización de reclamos de garantía en proceso y liquidados por la marca.',
    solution: 'Expediente digital automatizado conforme al manual de normas y procedimientos de garantías para agilizar reembolsos.',
    metrics: 'Ahorro sustancial de horas hombre e identificación inmediata de folios de reclamo pendientes.'
  },
  {
    name: 'Los chicos que lloran',
    company: 'Grupo Chesa',
    department: 'Análisis de Datos',
    members: 'Ivan Esau Najera Lopez, Brandon Humberto Nepomuceno Cruz, Susana Elizabeth Santiz Vazquez, Jose Armando Pinacho Lopez, Luis Gustavo Santiago Bonifaz',
    projectTitle: 'Centralización y Gestión de Información Corporativa',
    problem: 'Información de políticas y datos corporativos dispersa en múltiples archivos sin control de ciberseguridad.',
    solution: 'Repositorio centralizado con anonimización y encriptación de datos sensibles para uso seguro de IA en la organización.',
    metrics: '100% de información corporativa estandarizada y segura.'
  },
  {
    name: 'Enlace inteligente',
    company: 'CaFi',
    department: 'Riesgos',
    members: 'Luis Fernando Trujillo Gerardo, Esteban Sánchez Huerta, Linett Anahi Pimentel Castro',
    projectTitle: 'DataBridge AI',
    problem: 'Información operativa en Excel con estructuras deshomologadas. El área de Riesgos invertía de 2 a 5 días por ciclo limpiando datos.',
    solution: 'Herramienta web local con backend Python y LLM que reconoce columnas de Excel ambiguas y las homologa automáticamente contra un catálogo estándar.',
    metrics: 'Tiempo de homologación reducido de 2-5 días a menos de 5 minutos por archivo. Trazabilidad del 100%.'
  },
  {
    name: 'El Var del sándwich',
    company: 'Otra',
    department: 'Operacion',
    members: 'Luis Eugenio Lopez Najera, Jared Adin Lopez Cueto, Uri Orlando Mazariegos Guillen, Jonathan de Jesus Penagos Espinoza',
    projectTitle: 'SubGestor',
    problem: 'Control manual de inventarios, caducidades y facturas en restaurantes con múltiples sucursales, generando mermas y desabastos.',
    solution: 'SubGestor: plataforma integral web para control automático de stock, alertas de caducidad estilo semáforo y sugerencias inteligentes de compra.',
    metrics: 'Reducción del 50% en tiempo de gestión de inventario y 50% menos pérdidas por mermas.'
  },
  {
    name: 'La cazatraspasos',
    company: 'CaFi',
    department: 'Contabilidad',
    members: 'Nayely del Carmen Bautista Ramírez, Vicente Jimenez Najera',
    projectTitle: 'La cazatraspasos',
    problem: 'Captura manual de 25 comprobantes PDF diarios de traspasos bancarios entre cuentas para registro en CONTPAQi.',
    solution: 'Aplicación de escritorio que lee automáticamente comprobantes bancarios en PDF y genera la póliza de importación directa para CONTPAQi.',
    metrics: 'Generación instantánea de pólizas contables y 0% error de transcripción.'
  },
  {
    name: 'TEAM AMOS',
    company: 'CaFi',
    department: 'OPERATIVA - COMERCIAL',
    members: 'ANGELINA ASUNSUNCION DIAZ HERNANDEZ, MAYRA BERENICE MONTOYA GARCIA, MONTSERRAT SANDOVAL ZEPEDA, OSWALDO RAFAEL HERNANDEZ RODRIGUEZ',
    projectTitle: 'Automatización de adquisición de seguros',
    problem: 'Contacto tardío con clientes para renovación de pólizas de seguro.',
    solution: 'Flujo automatizado con IA para notificar y tramitar la renovación de pólizas de seguro de clientes de forma ágil.',
    metrics: 'Reducción de tiempos de respuesta e incremento en renovaciones de pólizas efectivas.'
  },
  {
    name: 'Chesa tu Nissan',
    company: 'Grupo Chesa',
    department: 'Posventa',
    members: 'Guadalupe del Carmen Solórzano García',
    projectTitle: 'Chesa tu Unidad DiadnoIA tu Nissan',
    problem: 'La recepción de unidades con fallas requiere 25 a 30 minutos por falta de precisión técnica en los comentarios del cliente.',
    solution: 'Formulario digital inteligente que aplica IA de texto a la Hoja de Diagnóstico Nissan para sugerir fallas probables y estimaciones de costo al técnico.',
    metrics: 'Tiempo de recepción en taller reducido de 25-30 min a 15-20 min.'
  },
  {
    name: 'AI',
    company: 'Grupo Chesa',
    department: 'MANTENIMIENTO',
    members: 'RICARDO CASTILLEJA DELGADO',
    projectTitle: 'Implementacion de calidad (tiempo, procesos y revision)',
    problem: 'Reloj checador desfasado (1.5h perdidas/mes) y revisiones nocturnas de unidades vulnerables a fallas visuales.',
    solution: 'Sincronización NTP del biométrico + Asistente IA para auditorías de mantenimiento + Escáner fotográfico 3D de carrocería.',
    metrics: 'Sincronización exacta de nómina y reporte instantáneo de daños de carrocería en tiempo real.'
  },
  {
    name: 'NIRAM',
    company: 'Grupo Chesa',
    department: 'CONTABILIDAD',
    members: 'ANGEL MARIN RUIZ RUIZ',
    projectTitle: 'BOT_CONTABLE',
    problem: 'Registro manual de 700 a 1000 notas de cargo mensuales en el sistema SIA, tomando de 5 a 10 minutos por registro.',
    solution: 'Bot contable local en Node.js + Playwright + interfaz HTML que simula la captura y completa registros en SIA automáticamente.',
    metrics: 'Tiempo por registro reducido de 10 minutos a 1 minuto. Eliminación de errores de captura.'
  },
  {
    name: 'Reclutapower',
    company: 'CaFi',
    department: 'Talento Humano',
    members: 'Felipe de Jesus Paniagua Ruiz, Jazmin Garduza Luna, Cinthya Velazquez Perez, Richard Alonso Nataren Chacon',
    projectTitle: 'TalentIQ CAFI — Sistema Inteligente de Talento y Reclutamiento',
    problem: 'Seguimiento de vacantes en Excel compartido sin captura simultánea, con 50% de candidato con estatus desactualizados.',
    solution: 'Sistema web en Node.js con captura simultánea en tiempo real, validaciones de datos y 2 capas de IA Claude para resúmenes ejecutivos y diagnósticos de reclutamiento.',
    metrics: 'Eliminación de 6 a 8 horas/semana de bloqueos por archivo compartido. Reportes ejecutivos en segundos.'
  },
  {
    name: 'Synergy',
    company: '5 Pinos',
    department: 'Construcción',
    members: 'Mario Alberto Hernández Solís',
    projectTitle: 'Uso de Claude IA como asistente en el diseño y construcción de proyectos eléctricos',
    problem: 'Cálculo de cuadros de carga y memorias técnicas eléctricas requiere días de trabajo manual y recalcular todo ante cualquier cambio de diseño.',
    solution: 'Flujo de trabajo con Claude Cowork que recibe datos de cargas y genera cuadro de cargas en Excel con fórmulas vivas y memoria de cálculo en Word según NOM-001-SEDE.',
    metrics: 'Reducción del 80% en tiempo de elaboración de memorias técnicas eléctricas y 0% margen de error de cálculo.'
  },
  {
    name: 'IA conec',
    company: 'Grupo Chesa',
    department: 'Ventas',
    members: 'Erick jhovanny zebadua cerda, Ibis Velez Morales',
    projectTitle: 'IA conec',
    problem: 'Redacción manual repetitiva de mensajes de WhatsApp y falta de clasificación para priorizar ~200 prospectos por asesor.',
    solution: 'Asistente de IA que prioriza prospectos (frío, tibio, caliente) y genera mensajes personalizados de WhatsApp por modelo (Versa, Sentra, Kicks).',
    metrics: 'Tiempo de redacción por mensaje de 5-8 min a <1 min. 1 a 2 horas diarias recuperadas por asesor.'
  },
  {
    name: 'Prompt-adores',
    company: 'Grupo Chesa',
    department: 'Contabilidad',
    members: 'Alexis Ivan Jiménez Morales, Alejandro Domínguez castellanos, Angel Marin Ruiz Ruiz',
    projectTitle: 'Herramienta HTML Conectores de WhatsApp y Playwright',
    problem: 'Carga manual de movimientos de tarjetas de crédito Clara y seguimiento tedioso a usuarios con comprobaciones pendientes.',
    solution: 'Sistema integrado de orquestación de datos que descarga movimientos y envía alertas automáticas por WhatsApp a tarjetahabientes pendientes.',
    metrics: 'Ahorro de horas hombre en carga de gastos y creación de hábito de comprobación oportuna.'
  },
  {
    name: 'Júpiter',
    company: 'Grupo Chesa',
    department: 'Mejora Continua',
    members: 'Ivonne Courtois',
    projectTitle: 'Tablero PitStop Posventa',
    problem: 'Ausencia de tablero en tiempo real para avance de taller (19.5% de inconformidades de clientes causadas por demoras).',
    solution: 'Tablero digital en tiempo real conectado al DMS con algoritmo predictivo que calcula la urgencia y asigna órdenes de reparación a técnicos libres.',
    metrics: 'Disminución del 20% en inconformidades por tiempo en servicio y aumento en CSI de marcas.'
  },
  {
    name: 'Erick Samuel García Jiménez',
    company: '5 Pinos',
    department: 'Talento Humano',
    members: 'Erick Samuel García Jiménez',
    projectTitle: 'SAM — Sistema de Análisis Milimétrico',
    problem: 'Cotejo manual de expedientes de personal y proveedores requiere 45 a 90 minutos por expediente con vulnerabilidad a firmas o documentos apócrifos.',
    solution: 'SAM: Plataforma de auditoría forense documental con OCR Visión IA, grafoscopía digital y matriz de coherencia cruzada contra SAT/INE/RENAPO.',
    metrics: 'Tiempo por expediente reducido de 1 hora a 3 minutos. Liberación de +20 horas/semana por usuario.'
  },
  {
    name: 'LexIA',
    company: 'Grupo Prosur',
    department: 'Planeación',
    members: 'Juan Carlos López Pérez, Claudia Roxana Ruíz Ruiz, Alondra Montserrat Hernández Sánchez',
    projectTitle: 'Portal de Accionistas — Grupo Prosur',
    problem: 'Redacción manual repetitiva de actas y libros corporativos, con riesgo legal por poderes notariales vencidos no identificados a tiempo.',
    solution: 'Asistente corporativo con Claude (Anthropic) + Portal Web de Accionistas que alerta vigencia de poderes y redacta libros bajo Ley General de Sociedades Mercantiles.',
    metrics: 'Cero uso de poderes vencidos. Reducción de horas en búsqueda y redacción legal.'
  },
  {
    name: 'Papeles de trabajo',
    company: 'Grupo Prosur',
    department: 'Contraloria',
    members: 'José Francisco Flores Zuñiga, Andrea Ricarda Velazco Trejo, Maria Nicolasa Santiz Diaz, Carina Alicia Santiz Lopez, Guadalupe del Carmen Jimenez Najera',
    projectTitle: 'Papeles de trabajo (Depreciaciones)',
    problem: 'Cálculo manual en Excel de depreciaciones contables/fiscales e INPC en activos fijos, con riesgo de sanciones o recargos del SAT.',
    solution: 'Aplicación que calcula sistemáticamente las depreciaciones según disposiciones fiscales e importa listados de activos e INPC automáticamente.',
    metrics: 'Eliminación completa de errores en cálculo de depreciaciones e INPC.'
  },
  {
    name: 'VacaIA',
    company: 'Grupo Chesa',
    department: 'Talento Humano',
    members: 'Alejandra Jocabeth Gordillo Morales, Maria Elizabeth Ovalle Islas',
    projectTitle: 'VacaIA — Dashboard Inteligente de Vacaciones CHESA',
    problem: 'Cruce manual quincenal en Excel de 3 reportes distintos de nómina para 500+ colaboradores en 24 agencias (toma 4 a 6 horas).',
    solution: 'Dashboard ejecutivo en el navegador donde se arrastran los 3 archivos Excel de nómina y genera al instante KPIs, ranking de riesgo y calendario visual.',
    metrics: 'Proceso quincenal reducido de 4-6 horas a menos de 5 minutos. 100% de cobertura en 24 agencias.'
  },
  {
    name: 'Talento y Desempeño con IA',
    company: 'Grupo Chesa',
    department: 'Talento Humano',
    members: 'MARIA ELIZABETH OVALLE ISLAS, ALEJANDRA JOCABETH GORDILLO MORALES',
    projectTitle: 'Talento y Desempeño con IA',
    problem: 'Evaluación manual en papel de 10 competencias Nissan Way para 765 colaboradores en 16 agencias, tomando semanas sin trazabilidad.',
    solution: 'Plataforma web en Netlify donde evaluadores califican competencias y Claude IA genera al instante el Plan de Desarrollo Individual (PDI) personalizado.',
    metrics: 'Levantamiento reducido de 3 semanas a 2 días (-85% tiempo). PDI individual generado en <30 segundos (574 horas ahorradas).'
  }
];

// Helper to convert team name into clean email
function makeEmail(str) {
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, ".") + "@prosur.com";
}

// Build participant user objects from all teams
const participantUsers = rawTeamsData.map((t, idx) => ({
  id: `usr-team-${idx + 1}`,
  name: `Equipo: ${t.name}`,
  teamName: t.name,
  roleType: 'participant',
  roleTitle: `Equipo (${t.department})`,
  unit: t.company,
  unitClass: 'badge-unit-agrifood',
  avatar: getAvatar(t.name),
  email: makeEmail(t.name),
  password: 'prosur2026',
  bio: `Integrantes: ${t.members}`,
  stats: { demosPublished: 1, totalViews: 0, totalLikes: 0, collaborations: 0 },
  savedDemoIds: [],
  badges: ['Equipo Oficial']
}));

// Build default Demos list for every team and project from the Google Sheet
const defaultDemosList = rawTeamsData.map((t, idx) => ({
  id: idx + 1,
  authorId: `usr-team-${idx + 1}`,
  title: t.projectTitle || `Solución de IA: ${t.name}`,
  subtitle: `Proyecto del ${t.name} (${t.company} - ${t.department}) para el Reto IA Prosur 2026.`,
  description: t.solution || t.problem,
  unit: t.company,
  unitClass: 'badge-unit-agrifood',
  category: t.company,
  problemStatement: t.problem,
  impactMetrics: t.metrics,
  tags: [t.company, 'Reto IA Prosur', t.department],
  author: `Equipo: ${t.name}`,
  authorRole: `Equipo (${t.department})`,
  authorAvatar: getAvatar(t.name),
  views: 0,
  likes: 0,
  rating: 0,
  duration: '3:30',
  thumbnail: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=800',
  
  specs: {
    modelType: 'Solución de IA Prosur',
    latency: 'En tiempo real',
    dataSources: `Base de datos ${t.company}`,
    status: 'En evaluación'
  },
  images: [],
  evaluations: [],
  comments: []
}));

// Add Diego Lopez's showcase demo
defaultDemosList.push({
  id: defaultDemosList.length + 1,
  authorId: 'usr-part-diego',
  title: 'Plataforma de Inteligencia Artificial Grupo Prosur',
  subtitle: 'Proyecto del Equipo Diego Lopez (Grupo Prosur).',
  description: 'Innovación en inteligencia artificial para la gestión y presentación de soluciones de IA.',
  unit: 'Grupo Prosur',
  unitClass: 'badge-unit-pharma',
  category: 'Grupo Prosur',
  problemStatement: 'Centralizar y evaluar proyectos de innovación de IA en tiempo real.',
  impactMetrics: '100% de proyectos evaluados bajo la rúbrica oficial.',
  tags: ['Grupo Prosur', 'Reto IA', 'Showcase'],
  author: 'Diego Lopez',
  authorRole: 'Líder del Proyecto Reto IA',
  authorAvatar: getAvatar('Diego Lopez'),
  views: 0,
  likes: 0,
  rating: 0,
  duration: '4:00',
  thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
  
  specs: {
    modelType: 'Full-Stack SPA + Firebase',
    latency: '<100ms',
    dataSources: 'Firestore Cloud DB',
    status: 'Desplegado en Producción'
  },
  images: [],
  evaluations: [],
  comments: []
});

// Build defaultState with Super Admin, 16 Judges, and all Teams as participants
const defaultState = {
  isAuthenticated: false,
  activeUserId: null,
  selectedCategory: 'all',
  selectedUnit: 'all',
  searchQuery: '',

  users: [
    // SUPER ADMIN
    {
      id: 'usr-admin-carlos',
      name: 'Carlos Barrientos',
      roleType: 'admin',
      roleTitle: 'Super Administrador de Plataforma',
      unit: 'Prosur Dirección TI',
      unitClass: 'badge-unit-tech',
      avatar: getAvatar('Carlos Barrientos'),
      email: 'carlos.barrientos@prosur.com',
      password: 'prosuradmin2026',
      bio: 'Super Administrador del Reto IA Prosur.',
      stats: { evaluationsDone: 0, pendingEvaluations: 0 },
      savedDemoIds: [],
      badges: ['Super Admin']
    },

    // JUECES (17)
    {
      id: 'usr-juez-dario',
      name: 'Dario',
      roleType: 'judge',
      roleTitle: 'Director General y Jurado',
      unit: 'Dirección General',
      unitClass: 'badge-unit-tech',
      avatar: getAvatar('Dario'),
      email: 'dario@prosur.com',
      password: 'dario2026',
      bio: 'Director General y Jurado Honorífico del Reto IA.',
      stats: { evaluationsDone: 0, pendingEvaluations: 0 },
      savedDemoIds: [],
      badges: ['Jurado', 'Director General']
    },
    {
      id: 'usr-juez-1',
      name: 'Cristhian',
      roleType: 'judge',
      roleTitle: 'Jurado Evaluador',
      unit: 'Comité Evaluador Prosur',
      unitClass: 'badge-unit-tech',
      avatar: getAvatar('Cristhian'),
      email: 'cristhian@prosur.com',
      password: 'cristhian2026',
      bio: 'Miembro del Jurado del Reto IA.',
      stats: { evaluationsDone: 0, pendingEvaluations: 1 },
      savedDemoIds: [],
      badges: ['Jurado']
    },
    {
      id: 'usr-juez-2',
      name: 'Rafael',
      roleType: 'judge',
      roleTitle: 'Jurado Evaluador',
      unit: 'Comité Evaluador Prosur',
      unitClass: 'badge-unit-tech',
      avatar: getAvatar('Rafael'),
      email: 'rafael@prosur.com',
      password: 'rafael2026',
      bio: 'Miembro del Jurado del Reto IA.',
      stats: { evaluationsDone: 0, pendingEvaluations: 1 },
      savedDemoIds: [],
      badges: ['Jurado']
    },
    {
      id: 'usr-juez-3',
      name: 'Juve',
      roleType: 'judge',
      roleTitle: 'Jurado Evaluador',
      unit: 'Comité Evaluador Prosur',
      unitClass: 'badge-unit-tech',
      avatar: getAvatar('Juve'),
      email: 'juve@prosur.com',
      password: 'juve2026',
      bio: 'Miembro del Jurado del Reto IA.',
      stats: { evaluationsDone: 0, pendingEvaluations: 1 },
      savedDemoIds: [],
      badges: ['Jurado']
    },
    {
      id: 'usr-juez-4',
      name: 'Angel',
      roleType: 'judge',
      roleTitle: 'Jurado Evaluador',
      unit: 'Comité Evaluador Prosur',
      unitClass: 'badge-unit-tech',
      avatar: getAvatar('Angel'),
      email: 'angel@prosur.com',
      password: 'angel2026',
      bio: 'Miembro del Jurado del Reto IA.',
      stats: { evaluationsDone: 0, pendingEvaluations: 1 },
      savedDemoIds: [],
      badges: ['Jurado']
    },
    {
      id: 'usr-juez-5',
      name: 'Victor Flores',
      roleType: 'judge',
      roleTitle: 'Jurado Evaluador',
      unit: 'Comité Evaluador Prosur',
      unitClass: 'badge-unit-tech',
      avatar: getAvatar('Victor Flores'),
      email: 'victor.flores@prosur.com',
      password: 'victorflores2026',
      bio: 'Miembro del Jurado del Reto IA.',
      stats: { evaluationsDone: 0, pendingEvaluations: 1 },
      savedDemoIds: [],
      badges: ['Jurado']
    },
    {
      id: 'usr-juez-6',
      name: 'Felisiano',
      roleType: 'judge',
      roleTitle: 'Jurado Evaluador',
      unit: 'Comité Evaluador Prosur',
      unitClass: 'badge-unit-tech',
      avatar: getAvatar('Felisiano'),
      email: 'felisiano@prosur.com',
      password: 'felisiano2026',
      bio: 'Miembro del Jurado del Reto IA.',
      stats: { evaluationsDone: 0, pendingEvaluations: 1 },
      savedDemoIds: [],
      badges: ['Jurado']
    },
    {
      id: 'usr-juez-7',
      name: 'Enrique Calzamoda',
      roleType: 'judge',
      roleTitle: 'Jurado Evaluador',
      unit: 'Comité Evaluador Prosur',
      unitClass: 'badge-unit-tech',
      avatar: getAvatar('Enrique Calzamoda'),
      email: 'enrique.calzamoda@prosur.com',
      password: 'enriquecalzamoda2026',
      bio: 'Miembro del Jurado del Reto IA.',
      stats: { evaluationsDone: 0, pendingEvaluations: 1 },
      savedDemoIds: [],
      badges: ['Jurado']
    },
    {
      id: 'usr-juez-8',
      name: 'Roberto Ortega',
      roleType: 'judge',
      roleTitle: 'Jurado Evaluador',
      unit: 'Comité Evaluador Prosur',
      unitClass: 'badge-unit-tech',
      avatar: getAvatar('Roberto Ortega'),
      email: 'roberto.ortega@prosur.com',
      password: 'robertoortega2026',
      bio: 'Miembro del Jurado del Reto IA.',
      stats: { evaluationsDone: 0, pendingEvaluations: 1 },
      savedDemoIds: [],
      badges: ['Jurado']
    },
    {
      id: 'usr-juez-9',
      name: 'Antonio Mata',
      roleType: 'judge',
      roleTitle: 'Jurado Evaluador',
      unit: 'Comité Evaluador Prosur',
      unitClass: 'badge-unit-tech',
      avatar: getAvatar('Antonio Mata'),
      email: 'antonio.mata@prosur.com',
      password: 'antoniomata2026',
      bio: 'Miembro del Jurado del Reto IA.',
      stats: { evaluationsDone: 0, pendingEvaluations: 1 },
      savedDemoIds: [],
      badges: ['Jurado']
    },
    {
      id: 'usr-juez-10',
      name: 'Ismael',
      roleType: 'judge',
      roleTitle: 'Jurado Evaluador',
      unit: 'Comité Evaluador Prosur',
      unitClass: 'badge-unit-tech',
      avatar: getAvatar('Ismael'),
      email: 'ismael@prosur.com',
      password: 'ismael2026',
      bio: 'Miembro del Jurado del Reto IA.',
      stats: { evaluationsDone: 0, pendingEvaluations: 1 },
      savedDemoIds: [],
      badges: ['Jurado']
    },
    {
      id: 'usr-juez-11',
      name: 'Jesus',
      roleType: 'judge',
      roleTitle: 'Jurado Evaluador',
      unit: 'Comité Evaluador Prosur',
      unitClass: 'badge-unit-tech',
      avatar: getAvatar('Jesus'),
      email: 'jesus@prosur.com',
      password: 'jesus2026',
      bio: 'Miembro del Jurado del Reto IA.',
      stats: { evaluationsDone: 0, pendingEvaluations: 1 },
      savedDemoIds: [],
      badges: ['Jurado']
    },
    {
      id: 'usr-juez-12',
      name: 'Victor Lievano',
      roleType: 'judge',
      roleTitle: 'Jurado Evaluador',
      unit: 'Comité Evaluador Prosur',
      unitClass: 'badge-unit-tech',
      avatar: getAvatar('Victor Lievano'),
      email: 'victor.lievano@prosur.com',
      password: 'victorlievano2026',
      bio: 'Miembro del Jurado del Reto IA.',
      stats: { evaluationsDone: 0, pendingEvaluations: 1 },
      savedDemoIds: [],
      badges: ['Jurado']
    },
    {
      id: 'usr-juez-13',
      name: 'Alberto',
      roleType: 'judge',
      roleTitle: 'Jurado Evaluador',
      unit: 'Comité Evaluador Prosur',
      unitClass: 'badge-unit-tech',
      avatar: getAvatar('Alberto'),
      email: 'alberto@prosur.com',
      password: 'alberto2026',
      bio: 'Miembro del Jurado del Reto IA.',
      stats: { evaluationsDone: 0, pendingEvaluations: 1 },
      savedDemoIds: [],
      badges: ['Jurado']
    },
    {
      id: 'usr-juez-14',
      name: 'Jose Luis',
      roleType: 'judge',
      roleTitle: 'Jurado Evaluador',
      unit: 'Comité Evaluador Prosur',
      unitClass: 'badge-unit-tech',
      avatar: getAvatar('Jose Luis'),
      email: 'jose.luis@prosur.com',
      password: 'joseluis2026',
      bio: 'Miembro del Jurado del Reto IA.',
      stats: { evaluationsDone: 0, pendingEvaluations: 1 },
      savedDemoIds: [],
      badges: ['Jurado']
    },
    {
      id: 'usr-juez-15',
      name: 'Bernardo Mijarez',
      roleType: 'judge',
      roleTitle: 'Jurado Evaluador',
      unit: 'Comité Evaluador Prosur',
      unitClass: 'badge-unit-tech',
      avatar: getAvatar('Bernardo Mijarez'),
      email: 'bernardo.mijarez@prosur.com',
      password: 'bernardomijarez2026',
      bio: 'Miembro del Jurado del Reto IA.',
      stats: { evaluationsDone: 0, pendingEvaluations: 1 },
      savedDemoIds: [],
      badges: ['Jurado']
    },
    {
      id: 'usr-juez-16',
      name: 'Francisco',
      roleType: 'judge',
      roleTitle: 'Jurado Evaluador',
      unit: 'Comité Evaluador Prosur',
      unitClass: 'badge-unit-tech',
      avatar: getAvatar('Francisco'),
      email: 'francisco@prosur.com',
      password: 'francisco2026',
      bio: 'Miembro del Jurado del Reto IA.',
      stats: { evaluationsDone: 0, pendingEvaluations: 1 },
      savedDemoIds: [],
      badges: ['Jurado']
    },

    // ALL EQUIPOS / TEAMS FROM GOOGLE SHEET AS PARTICIPANTS
    ...participantUsers
  ],

  // AI Demos List
  demos: defaultDemosList,

  posts: []
};

const CURRENT_DATA_VERSION = 3;

// Load initial state with localStorage persistence
function loadInitialState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && Array.isArray(parsed.users)) {
        const deletedDemoIds = Array.isArray(parsed.deletedDemoIds) ? parsed.deletedDemoIds : [];
        const deletedUserIds = Array.isArray(parsed.deletedUserIds) ? parsed.deletedUserIds : [];

        let users = parsed.users;
        let demos = parsed.demos;

        // Auto-upgrade state if stored cache is from an older version (e.g. before 38 real projects import)
        if (!parsed.dataVersion || parsed.dataVersion < CURRENT_DATA_VERSION) {
          const existingUserEmails = new Set((users || []).map(u => (u.email || '').toLowerCase()));
          const defaultUsersToAdd = defaultState.users.filter(
            u => !existingUserEmails.has((u.email || '').toLowerCase()) && !deletedUserIds.includes(u.id)
          );
          users = [...defaultUsersToAdd, ...(users || [])];

          // If cached demos list has fewer than 10 items, replace with 38 real projects
          if (!demos || demos.length < 10) {
            demos = defaultState.demos.filter(d => !deletedDemoIds.includes(String(d.id)));
          } else {
            const existingDemoTitles = new Set((demos || []).map(d => (d.title || '').toLowerCase().trim()));
            const defaultDemosToAdd = defaultState.demos.filter(
              d => !existingDemoTitles.has((d.title || '').toLowerCase().trim()) && !deletedDemoIds.includes(String(d.id))
            );
            demos = [...demos, ...defaultDemosToAdd];
          }
        }

        users = users.filter(u => !deletedUserIds.includes(u.id));
        demos = demos
          .filter(d => !deletedDemoIds.includes(String(d.id)))
          .map(d => ({
            ...d,
            likes: d.realLikes || 0,
            views: d.realViews || 0,
            videoUrl: formatYoutubeEmbedUrl(d.videoUrl)
          }));

        let activeUser = null;
        if (parsed.activeUserId) {
          activeUser = users.find(u => u.id === parsed.activeUserId) || null;
        }

        const newState = {
          ...defaultState,
          ...parsed,
          dataVersion: CURRENT_DATA_VERSION,
          users,
          demos,
          deletedDemoIds,
          deletedUserIds,
          currentUser: activeUser
        };

        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify({
            dataVersion: CURRENT_DATA_VERSION,
            isAuthenticated: newState.isAuthenticated,
            activeUserId: newState.activeUserId,
            selectedCategory: newState.selectedCategory,
            selectedUnit: newState.selectedUnit,
            users: newState.users,
            demos: newState.demos,
            posts: newState.posts,
            deletedDemoIds: newState.deletedDemoIds,
            deletedUserIds: newState.deletedUserIds
          }));
        } catch (err) {}

        return newState;
      }
    }
  } catch (e) {
    console.warn('Could not parse localStorage state:', e);
  }

  const initialState = {
    ...defaultState,
    dataVersion: CURRENT_DATA_VERSION,
    deletedDemoIds: [],
    deletedUserIds: [],
    currentUser: null
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      dataVersion: CURRENT_DATA_VERSION,
      isAuthenticated: initialState.isAuthenticated,
      activeUserId: initialState.activeUserId,
      selectedCategory: initialState.selectedCategory,
      selectedUnit: initialState.selectedUnit,
      users: initialState.users,
      demos: initialState.demos,
      posts: initialState.posts,
      deletedDemoIds: [],
      deletedUserIds: []
    }));
  } catch (err) {}

  return initialState;
}

export const state = loadInitialState();

export function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    dataVersion: CURRENT_DATA_VERSION,
    isAuthenticated: state.isAuthenticated,
    activeUserId: state.activeUserId,
    selectedCategory: state.selectedCategory,
    selectedUnit: state.selectedUnit,
    users: state.users,
    demos: state.demos,
    posts: state.posts,
    deletedDemoIds: state.deletedDemoIds || [],
    deletedUserIds: state.deletedUserIds || []
  }));
}

// -------------------------------------------------------------
// FIREBASE REALTIME SYNC & FIRESTORE INTEGRATION
// -------------------------------------------------------------
if (isFirebaseConfigured()) {
  console.log('🔥 Syncing state with Firebase Firestore...');
  
  onSnapshot(collection(db, 'users'), (snapshot) => {
    const cloudMap = new Map();
    if (!state.deletedUserIds) state.deletedUserIds = [];

    if (snapshot && !snapshot.empty) {
      snapshot.forEach(docSnap => {
        const data = docSnap.data();
        const userId = docSnap.id;
        
        if (data.isDeleted) {
          if (!state.deletedUserIds.includes(userId)) {
            state.deletedUserIds.push(userId);
          }
        } else {
          const delIdx = state.deletedUserIds.indexOf(userId);
          if (delIdx !== -1) {
            state.deletedUserIds.splice(delIdx, 1);
          }
          cloudMap.set(userId, { id: userId, ...data });
        }
      });
    }

    const localMap = new Map((state.users || []).map(u => [u.id, u]));
    const allUserIds = new Set([
      ...defaultState.users.map(u => u.id),
      ...localMap.keys(),
      ...cloudMap.keys()
    ]);

    const updatedUsers = [];
    allUserIds.forEach(id => {
      if (state.deletedUserIds.includes(id)) return;

      const defUser = defaultState.users.find(u => u.id === id);
      const localUser = localMap.get(id);
      const cloudUser = cloudMap.get(id);

      if (cloudUser || localUser || defUser) {
        updatedUsers.push({
          ...(defUser || {}),
          ...(cloudUser || {}),
          ...(localUser || {})
        });
      }
    });

    state.users = updatedUsers;
    if (state.activeUserId) {
      state.currentUser = state.users.find(u => u.id === state.activeUserId) || state.currentUser;
    }
    saveState();
    window.dispatchEvent(new CustomEvent('state-updated'));
  }, (err) => {
    console.warn('🔥 Firestore users snapshot warning:', err);
  });

  onSnapshot(collection(db, 'demos'), (snapshot) => {
    const cloudMap = new Map();
    if (!state.deletedDemoIds) state.deletedDemoIds = [];

    if (snapshot && !snapshot.empty) {
      snapshot.forEach(docSnap => {
        const data = docSnap.data();
        const demoId = isNaN(Number(docSnap.id)) ? docSnap.id : Number(docSnap.id);
        const strId = String(demoId);
        
        if (data.isDeleted) {
          if (!state.deletedDemoIds.includes(strId)) {
            state.deletedDemoIds.push(strId);
          }
        } else {
          const delIdx = state.deletedDemoIds.indexOf(strId);
          if (delIdx !== -1) {
            state.deletedDemoIds.splice(delIdx, 1);
          }
          cloudMap.set(strId, { id: demoId, ...data });
        }
      });
    }

    const localMap = new Map((state.demos || []).map(d => [String(d.id), d]));
    const allDemoIds = new Set([
      ...defaultState.demos.map(d => String(d.id)),
      ...localMap.keys(),
      ...cloudMap.keys()
    ]);

    const updatedDemos = [];
    allDemoIds.forEach(strId => {
      if (state.deletedDemoIds.includes(strId)) return;

      const defDemo = defaultState.demos.find(d => String(d.id) === strId);
      const localDemo = localMap.get(strId);
      const cloudDemo = cloudMap.get(strId);

      if (cloudDemo || localDemo || defDemo) {
        const merged = {
          ...(defDemo || {}),
          ...(cloudDemo || {}),
          ...(localDemo || {})
        };
        updatedDemos.push({
          ...merged,
          videoUrl: formatYoutubeEmbedUrl(
            cloudDemo?.videoUrl !== undefined && cloudDemo.videoUrl !== '' ? cloudDemo.videoUrl : 
            (localDemo?.videoUrl !== undefined ? localDemo.videoUrl : defDemo?.videoUrl || '')
          ),
          images: (cloudDemo?.images && cloudDemo.images.length > 0) ? cloudDemo.images : (localDemo?.images || defDemo?.images || []),
          evaluations: (cloudDemo?.evaluations && cloudDemo.evaluations.length > 0) ? cloudDemo.evaluations : (localDemo?.evaluations || defDemo?.evaluations || []),
          likes: (cloudDemo?.realLikes !== undefined) ? cloudDemo.realLikes : (localDemo?.likes || defDemo?.likes || 0),
          realLikes: (cloudDemo?.realLikes !== undefined) ? cloudDemo.realLikes : (localDemo?.realLikes || defDemo?.likes || 0),
          comments: (cloudDemo?.comments && cloudDemo.comments.length > 0) ? cloudDemo.comments : (localDemo?.comments || defDemo?.comments || [])
        });
      }
    });

    state.demos = updatedDemos;
    saveState();
    window.dispatchEvent(new CustomEvent('state-updated'));
  }, (err) => {
    console.warn('🔥 Firestore demos snapshot warning:', err);
  });
}

async function seedFirestoreUsers() {
  for (const u of defaultState.users) {
    try { await setDoc(doc(db, 'users', u.id), u, { merge: true }); } catch (e) {}
  }
}

async function seedFirestoreDemos() {
  for (const d of defaultState.demos) {
    try { await setDoc(doc(db, 'demos', String(d.id)), d, { merge: true }); } catch (e) {}
  }
}

// -------------------------------------------------------------
// AUTHENTICATION & USER ACTIONS
// -------------------------------------------------------------
export function login(email, password) {
  const user = state.users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
  if (user) {
    state.isAuthenticated = true;
    state.activeUserId = user.id;
    state.currentUser = user;
    saveState();
    return true;
  }
  return false;
}

export function logout() {
  state.activeUserId = null;
  state.currentUser = null;
  state.isAuthenticated = false;
  saveState();
}

export function getDemoById(id) {
  return state.demos.find(d => String(d.id) === String(id));
}

export function isOwner(demo) {
  if (!demo || !state.currentUser) return false;
  return demo.authorId === state.currentUser.id || demo.author === state.currentUser.name;
}

export function isJudge() {
  if (!state.currentUser) return false;
  return state.currentUser.roleType === 'judge' || state.currentUser.roleType === 'admin';
}

export function isAdmin() {
  if (!state.currentUser) return false;
  return state.currentUser.roleType === 'admin';
}

export function isDario() {
  if (!state.currentUser) return false;
  return state.currentUser.id === 'usr-juez-dario' || 
         state.currentUser.email === 'dario@prosur.com' ||
         (state.currentUser.name && state.currentUser.name.toLowerCase().includes('dario')) ||
         (state.currentUser.roleTitle && state.currentUser.roleTitle.toLowerCase().includes('director general'));
}

export function canViewRanking() {
  return isAdmin() || isDario();
}

export function toggleDemoReadyForEvaluation(demoId, isReady) {
  if (!isAdmin()) return false;
  const demo = getDemoById(demoId);
  if (!demo) return false;

  demo.readyForEvaluation = Boolean(isReady);
  saveState();
  if (isFirebaseConfigured()) {
    setDoc(doc(db, 'demos', String(demoId)), { readyForEvaluation: demo.readyForEvaluation }, { merge: true }).catch(e => { console.error('FIREBASE ERROR:', e); alert('Error al guardar en la nube: ' + e.message); });
  }
  return true;
}

export function toggleFavorite(demoId) {
  if (!state.currentUser) return;
  const numId = parseInt(demoId, 10);
  const index = state.currentUser.savedDemoIds.indexOf(numId);
  if (index >= 0) {
    state.currentUser.savedDemoIds.splice(index, 1);
  } else {
    state.currentUser.savedDemoIds.push(numId);
  }
  saveState();
  if (isFirebaseConfigured()) {
    setDoc(doc(db, 'users', state.currentUser.id), { savedDemoIds: state.currentUser.savedDemoIds }, { merge: true }).catch(e => { console.error('FIREBASE ERROR:', e); alert('Error al guardar en la nube: ' + e.message); });
  }
}

export function isFavorite(demoId) {
  if (!state.currentUser) return false;
  return state.currentUser.savedDemoIds.includes(parseInt(demoId, 10));
}

export function addCommentToDemo(demoId, commentText) {
  const demo = getDemoById(demoId);
  if (demo && commentText.trim() !== '' && state.currentUser) {
    const newComment = {
      id: 'c-' + Date.now(),
      author: state.currentUser.name,
      authorId: state.currentUser.id,
      avatar: state.currentUser.avatar,
      role: state.currentUser.roleTitle || state.currentUser.role,
      date: 'Justo ahora',
      text: commentText.trim()
    };
    if (!demo.comments) demo.comments = [];
    demo.comments.push(newComment);
    saveState();
    if (isFirebaseConfigured()) {
      setDoc(doc(db, 'demos', String(demoId)), { comments: demo.comments }, { merge: true }).catch(e => { console.error('FIREBASE ERROR:', e); alert('Error al guardar en la nube: ' + e.message); });
    }
  }
}

export function editCommentInDemo(demoId, commentId, newText) {
  const demo = getDemoById(demoId);
  if (!demo || !newText.trim() || !state.currentUser) return false;

  if (!demo.comments) demo.comments = [];
  const comment = demo.comments.find(c => c.id === commentId);
  if (!comment) return false;

  const isAuthor = comment.authorId ? (comment.authorId === state.currentUser.id) : (comment.author === state.currentUser.name);
  if (!isAuthor && !isAdmin()) return false;

  comment.text = newText.trim();
  comment.date = 'Editado recientemente';

  saveState();
  if (isFirebaseConfigured()) {
    setDoc(doc(db, 'demos', String(demoId)), { comments: demo.comments }, { merge: true }).catch(e => { console.error('FIREBASE ERROR:', e); alert('Error al guardar en la nube: ' + e.message); });
  }
  return true;
}

export function deleteCommentFromDemo(demoId, commentId) {
  const demo = getDemoById(demoId);
  if (!demo || !state.currentUser) return false;

  if (!demo.comments) demo.comments = [];
  const idx = demo.comments.findIndex(c => c.id === commentId);
  if (idx === -1) return false;

  const comment = demo.comments[idx];
  const isAuthor = comment.authorId ? (comment.authorId === state.currentUser.id) : (comment.author === state.currentUser.name);
  if (!isAuthor && !isAdmin()) return false;

  demo.comments.splice(idx, 1);

  saveState();
  if (isFirebaseConfigured()) {
    setDoc(doc(db, 'demos', String(demoId)), { comments: demo.comments }, { merge: true }).catch(e => { console.error('FIREBASE ERROR:', e); alert('Error al guardar en la nube: ' + e.message); });
  }
  return true;
}

export function formatYoutubeEmbedUrl(url) {
  if (!url) return '';
  url = url.trim();
  
  if (url.includes('youtube.com/embed/')) {
    return url;
  }
  
  const watchMatch = url.match(/(?:youtube\.com\/(?:watch\?.*v=|shorts\/)|youtu\.be\/)([^&?#/]+)/);
  if (watchMatch && watchMatch[1]) {
    return `https://www.youtube.com/embed/${watchMatch[1]}`;
  }
  
  return url;
}

export function updateDemo(demoId, data) {
  const demo = getDemoById(demoId);
  if (!demo || (!isOwner(demo) && !isAdmin())) return false;

  if (data.title) demo.title = data.title;
  if (data.subtitle) demo.subtitle = data.subtitle;
  if (data.description) demo.description = data.description;
  if (data.category) demo.category = data.category;
  if (data.problemStatement) demo.problemStatement = data.problemStatement;
  if (data.impactMetrics) demo.impactMetrics = data.impactMetrics;
  if (data.videoUrl !== undefined) demo.videoUrl = formatYoutubeEmbedUrl(data.videoUrl);
  if (data.likes !== undefined) demo.likes = data.likes;
  if (data.realLikes !== undefined) demo.realLikes = data.realLikes;
  demo.isDeleted = false;

  if (state.deletedDemoIds) {
    const strId = String(demoId);
    const idx = state.deletedDemoIds.indexOf(strId);
    if (idx !== -1) state.deletedDemoIds.splice(idx, 1);
  }

  saveState();
  if (isFirebaseConfigured()) {
    setDoc(doc(db, 'demos', String(demoId)), { ...demo, isDeleted: false }, { merge: true }).catch(e => { console.error('FIREBASE ERROR:', e); alert('Error al guardar en la nube: ' + e.message); });
  }
  return true;
}

export function updateDemoVideoUrl(demoId, videoUrl) {
  return updateDemo(demoId, { videoUrl });
}

export function addDemoImage(demoId, imageUrl, caption) {
  const demo = getDemoById(demoId);
  if (!demo || (!isOwner(demo) && !isAdmin())) return false;
  
  if (!demo.images) demo.images = [];
  const imgObj = {
    url: imageUrl,
    caption: caption || 'Evidencia cargada por el participante'
  };
  demo.images.push(imgObj);
  saveState();
  if (isFirebaseConfigured()) {
    setDoc(doc(db, 'demos', String(demoId)), { images: demo.images }, { merge: true }).catch(e => { console.error('FIREBASE ERROR:', e); alert('Error al guardar en la nube: ' + e.message); });
  }
  return true;
}

export function removeDemoImage(demoId, imageIndex) {
  const demo = getDemoById(demoId);
  if (!demo || (!isOwner(demo) && !isAdmin())) return false;
  demo.images.splice(imageIndex, 1);
  saveState();
  if (isFirebaseConfigured()) {
    setDoc(doc(db, 'demos', String(demoId)), { images: demo.images }, { merge: true }).catch(e => { console.error('FIREBASE ERROR:', e); alert('Error al guardar en la nube: ' + e.message); });
  }
  return true;
}

export function submitJudgeEvaluation(demoId, scores, feedback, isConfirmed = true) {
  const demo = getDemoById(demoId);
  if (!demo || !isJudge()) return false;

  // Judges can only evaluate if demo has been dictamined/presented by admin
  if (!demo.readyForEvaluation && !isAdmin()) return false;

  if (!demo.evaluations) demo.evaluations = [];

  const avg = (
    parseInt(scores.innovation) +
    parseInt(scores.viability) +
    parseInt(scores.pitch) +
    parseInt(scores.impact)
  );

  const existingIndex = demo.evaluations.findIndex(e => e.judgeId === state.currentUser.id);
  const evalData = {
    id: existingIndex >= 0 ? demo.evaluations[existingIndex].id : 'eval-' + Date.now(),
    judgeId: state.currentUser.id,
    judgeName: state.currentUser.name,
    judgeRole: state.currentUser.roleTitle,
    judgeAvatar: state.currentUser.avatar,
    date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' }),
    scores: {
      innovation: parseInt(scores.innovation),
      viability: parseInt(scores.viability),
      pitch: parseInt(scores.pitch),
      impact: parseInt(scores.impact)
    },
    average: avg,
    feedback: feedback.trim(),
    isConfirmed: Boolean(isConfirmed)
  };

  if (existingIndex >= 0) {
    demo.evaluations[existingIndex] = evalData;
  } else {
    demo.evaluations.push(evalData);
  }

  const totalAvg = demo.evaluations.reduce((sum, e) => sum + e.average, 0) / demo.evaluations.length;
  demo.rating = parseInt(totalAvg.toFixed(0));

  saveState();
  if (isFirebaseConfigured()) {
    setDoc(doc(db, 'demos', String(demoId)), { evaluations: demo.evaluations, rating: demo.rating }, { merge: true }).catch(e => { console.error('FIREBASE ERROR:', e); alert('Error al guardar en la nube: ' + e.message); });
  }
  return true;
}

export function confirmJudgeEvaluation(demoId) {
  const demo = getDemoById(demoId);
  if (!demo || !isJudge() || !state.currentUser) return false;
  const evalObj = (demo.evaluations || []).find(e => e.judgeId === state.currentUser.id);
  if (evalObj) {
    evalObj.isConfirmed = true;
    saveState();
    if (isFirebaseConfigured()) {
      setDoc(doc(db, 'demos', String(demoId)), { evaluations: demo.evaluations }, { merge: true }).catch(e => { console.error('FIREBASE ERROR:', e); alert('Error al guardar en la nube: ' + e.message); });
    }
    return true;
  }
  return false;
}

export function createUser(userData) {
  if (!isAdmin()) return false;
  const newId = 'usr-' + Date.now();
  const newUser = {
    id: newId,
    name: userData.name,
    roleType: userData.roleType,
    roleTitle: userData.roleTitle,
    unit: userData.unit,
    unitClass: userData.roleType === 'judge' ? 'badge-unit-tech' : 'badge-unit-agrifood',
    avatar: getAvatar(userData.name),
    email: userData.email,
    password: userData.password,
    bio: 'Nuevo usuario registrado.',
    stats: { demosPublished: 0, totalViews: 0, totalLikes: 0, collaborations: 0, evaluationsDone: 0, pendingEvaluations: 0 },
    savedDemoIds: [],
    badges: []
  };
  state.users.push(newUser);
  saveState();
  if (isFirebaseConfigured()) {
    setDoc(doc(db, 'users', newId), newUser, { merge: true }).catch(e => { console.error('FIREBASE ERROR:', e); alert('Error al guardar en la nube: ' + e.message); });
  }
  return true;
}

export function createDemo(demoData, authorId) {
  if (!isAdmin()) return false;
  const author = state.users.find(u => u.id === authorId);
  if (!author) return false;
  
  const newId = Date.now();
  const newDemo = {
    id: newId,
    authorId: author.id,
    title: demoData.title,
    subtitle: demoData.subtitle || 'Sin subtítulo',
    description: demoData.description || 'Sin descripción',
    unit: author.unit,
    unitClass: 'badge-unit-agrifood',
    category: demoData.category || 'Grupo Prosur',
    problemStatement: demoData.problemStatement || 'Describe el problema operativo a resolver',
    impactMetrics: demoData.impactMetrics || 'Describe las métricas de impacto (antes y después)',
    tags: ['Nuevo'],
    author: author.name,
    authorRole: author.roleTitle,
    authorAvatar: author.avatar,
    views: 0,
    likes: 0,
    rating: 0,
    duration: '0:00',
    thumbnail: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=800',
    
    specs: {
      modelType: 'N/A',
      latency: 'N/A',
      dataSources: 'N/A',
      status: 'En diseño'
    },
    images: [],
    evaluations: [],
    comments: []
  };
  state.demos.push(newDemo);
  saveState();
  if (isFirebaseConfigured()) {
    setDoc(doc(db, 'demos', String(newId)), newDemo, { merge: true }).catch(e => { console.error('FIREBASE ERROR:', e); alert('Error al guardar en la nube: ' + e.message); });
  }
  return true;
}

export function assignDemo(demoId, authorId) {
  if (!isAdmin()) return false;
  const demo = getDemoById(demoId);
  const author = state.users.find(u => u.id === authorId);
  if (demo && author) {
    demo.authorId = author.id;
    demo.author = author.name;
    demo.authorRole = author.roleTitle;
    demo.authorAvatar = author.avatar;
    saveState();
    if (isFirebaseConfigured()) {
      setDoc(doc(db, 'demos', String(demoId)), {
        authorId: author.id,
        author: author.name,
        authorRole: author.roleTitle,
        authorAvatar: author.avatar
      }, { merge: true }).catch(e => { console.error('FIREBASE ERROR:', e); alert('Error al guardar en la nube: ' + e.message); });
    }
    return true;
  }
  return false;
}

export function updateUser(userId, data) {
  if (!isAdmin()) return false;
  const user = state.users.find(u => u.id === userId);
  if (!user) return false;

  if (data.name) user.name = data.name;
  if (data.email) user.email = data.email;
  if (data.password) user.password = data.password;
  if (data.roleType) user.roleType = data.roleType;
  if (data.roleTitle) user.roleTitle = data.roleTitle;
  if (data.unit) user.unit = data.unit;
  user.isDeleted = false;

  if (state.deletedUserIds) {
    const idx = state.deletedUserIds.indexOf(userId);
    if (idx !== -1) state.deletedUserIds.splice(idx, 1);
  }

  state.demos.forEach(d => {
    if (d.authorId === userId) {
      d.author = user.name;
      d.authorRole = user.roleTitle;
      d.unit = user.unit;
    }
  });

  saveState();
  if (isFirebaseConfigured()) {
    setDoc(doc(db, 'users', userId), { ...user, isDeleted: false }, { merge: true }).catch(e => { console.error('FIREBASE ERROR:', e); alert('Error al guardar en la nube: ' + e.message); });
  }
  return true;
}

export function deleteUser(userId) {
  if (!isAdmin()) return false;
  if (!state.deletedUserIds) state.deletedUserIds = [];
  if (!state.deletedUserIds.includes(userId)) {
    state.deletedUserIds.push(userId);
  }
  
  const idx = state.users.findIndex(u => u.id === userId);
  if (idx !== -1) {
    state.users.splice(idx, 1);
  }
  
  saveState();
  if (isFirebaseConfigured()) {
    setDoc(doc(db, 'users', userId), { isDeleted: true }, { merge: true }).catch(e => { console.error('FIREBASE ERROR:', e); alert('Error al guardar en la nube: ' + e.message); });
  }
  return true;
}

export function deleteDemo(demoId) {
  if (!isAdmin()) return false;
  const strId = String(demoId);
  if (!state.deletedDemoIds) state.deletedDemoIds = [];
  if (!state.deletedDemoIds.includes(strId)) {
    state.deletedDemoIds.push(strId);
  }

  const idx = state.demos.findIndex(d => String(d.id) === strId);
  if (idx !== -1) {
    state.demos.splice(idx, 1);
  }

  saveState();
  if (isFirebaseConfigured()) {
    setDoc(doc(db, 'demos', strId), { isDeleted: true }, { merge: true }).catch(e => { console.error('FIREBASE ERROR:', e); alert('Error al guardar en la nube: ' + e.message); });
  }
  return true;
}

export function addPost(title, content, category) {
  if (!title || !content || !state.currentUser) return;
  const newPost = {
    id: 'post-' + Date.now(),
    author: state.currentUser.name,
    avatar: state.currentUser.avatar,
    role: state.currentUser.roleTitle || 'Participante',
    unit: state.currentUser.unit,
    unitClass: state.currentUser.unitClass,
    date: 'Justo ahora',
    type: category || 'Discusión',
    title: title,
    content: content,
    likes: 1,
    commentsCount: 0,
    tags: ['Comunidad', 'AI Showcase'],
    commentsList: []
  };
  state.posts.unshift(newPost);
  saveState();
  if (isFirebaseConfigured()) {
    setDoc(doc(db, 'posts', newPost.id), newPost).catch(e => { console.error('FIREBASE ERROR:', e); alert('Error al guardar en la nube: ' + e.message); });
  }
}

export async function resetState() {
  localStorage.removeItem(STORAGE_KEY);
  state.isAuthenticated = false;
  state.activeUserId = null;
  state.currentUser = null;
  state.selectedCategory = 'all';
  state.selectedUnit = 'all';
  state.deletedDemoIds = [];
  state.deletedUserIds = [];
  state.users = [...defaultState.users];
  state.demos = [...defaultState.demos];
  state.posts = [...defaultState.posts];
  saveState();
  if (isFirebaseConfigured()) {
    try {
      await seedFirestoreUsers();
      await seedFirestoreDemos();
    } catch (e) {
      console.error('FIREBASE ERROR:', e); 
      alert('Error al guardar en la nube: ' + e.message);
    }
  }
  window.location.reload();
}

// Escuchar cambios en otras pestañas para mantener todas las páginas sincronizadas
window.addEventListener('storage', (e) => {
  if (e.key === STORAGE_KEY && e.newValue) {
    try {
      const parsed = JSON.parse(e.newValue);
      if (parsed) {
        state.isAuthenticated = parsed.isAuthenticated;
        state.activeUserId = parsed.activeUserId;
        state.selectedCategory = parsed.selectedCategory;
        state.selectedUnit = parsed.selectedUnit;
        state.users = parsed.users || state.users;
        state.demos = parsed.demos || state.demos;
        state.posts = parsed.posts || state.posts;
        if (state.activeUserId) {
          state.currentUser = state.users.find(u => u.id === state.activeUserId) || null;
        } else {
          state.currentUser = null;
        }
        // Notificar a la interfaz que debe actualizarse en esta pestaña
        window.dispatchEvent(new CustomEvent('state-updated'));
      }
    } catch(err) {
      console.warn('Error sincronizando localStorage:', err);
    }
  }
});
