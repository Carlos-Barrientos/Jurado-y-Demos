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

// Official list of Teams (Equipos) from the Reto IA Prosur Table
export const rawTeamsData = [
  { name: 'AI', company: 'Grupo Chesa', department: 'MANTENIMIENTO', members: 'RICARDO CASTILLEJA DELGADO' },
  { name: 'El ingeniero', company: 'Calzamoda', department: 'Sub Gerente', members: '120034, 121805, 121830, 121750, 121476, 121406' },
  { name: 'IA conec', company: 'Grupo Chesa', department: 'Ventas', members: 'Erick Jhovanny babadua cerda, Iris Velez Morales' },
  { name: 'Impulso Inteligente', company: 'Grupo Chesa', department: 'BDC', members: 'Angel Francisco Lievano Trejo, Iván Esaú Nájera López' },
  { name: 'IVA Corporativa', company: 'Grupo Chesa', department: 'Innovación', members: 'Armando Renato Ruiz Gomez, Victor Hugo Liévano Pérez' },
  { name: 'NIRAMI', company: 'Grupo Chesa', department: 'CONTABILIDAD', members: 'ANGEL MARIN RUIZ RUIZ, Aleida Ivan Jiménez Morales' },
  { name: 'Prompt-actores', company: 'Grupo Chesa', department: 'Contabilidad', members: 'Alejandro Dominguez castellanos, Angel Marin Ruiz Ruiz' },
  { name: 'Synergy', company: '5 Pinos', department: 'Construcción', members: 'Mario Alberto Hernández Solís' },
  { name: 'Arquitectos de Ideas', company: 'Grupo Chesa', department: 'Tesoreria', members: 'Dulce Rocío Shilon Gómez, Beatriz Del Carmen Shilon Gomez, Karina Guadalupe Ruiz Martinez, Eber Alberto Lopez Torres, Luis Daniel Garcia Moreno' },
  { name: 'Cobranza', company: 'CaFi', department: 'Cobranza', members: 'Teresa Gomez Ruiz, Guadalupe Vazquez Maldonado, Martha De Jesus Gonzales Hernandez, Quebin Braitan Trujillo Dominguez' },
  { name: 'Conta Comercialitas', company: 'Otra', department: 'Contabilidad', members: 'Rosangela Lopez De La Cruz, Jaqueline Agustín González López, Daniel Arturo Morales Ton' },
  { name: 'Expediente Digital', company: 'Grupo Chesa', department: 'Soporte administrativo y Expediente Digital', members: 'Jonathan De Jesus Penagos Espinoza, Carlos Eduardo Garcia Villafuerte, Brayan Santiz Camaras, Uriel Duque Lara' },
  { name: 'Foresight Innovation', company: 'Grupo Chesa', department: 'Gerencia General', members: 'Francisco Javier Garcia Solis' },
  { name: 'IA Corporativa', company: 'Grupo Chesa', department: 'Innovación', members: 'Iván Esaú Nájera López, Armando Renato Ruiz Gomez' },
  { name: 'Lead Pilot', company: 'Grupo Chesa', department: 'Ventas', members: 'VALERIA CAROLINA CONTRERAS GÓMEZ' },
  { name: 'Lit (legal inivation team)', company: 'CaFi', department: 'Jurídico', members: 'Luis Roberto Ruiz Abarca, Jose Antonio Gutierrez Najera' },
  { name: 'Los chicos que van a llorar', company: 'Grupo Chesa', department: 'Análisis de Datos', members: 'Luis Gustavo Santiago Bonifaz, Brandon Humberto Nepomuceno Cruz, Susana Elizabeth Santiz Vazquez, Jose Armando Pinacho Lopez' },
  { name: 'Los chicos que ya lloraron', company: 'Grupo Chesa', department: 'Análisis de Datos', members: 'Iván Esaú Nájera López, Brandon Humberto Nepomuceno Cruz, Susana Elizabeth Santiz Vazquez, Jose Armando Pinacho Lopez, Luis Gustavo Santiago Bonifaz' },
  { name: 'Los que perdieron', company: 'Grupo Chesa', department: 'MKT', members: 'Marlon Octavio Giles Garcia, Giovanni Trejo Matias' },
  { name: 'Miguel y sus teclados A.C.', company: 'CaFi', department: 'Auditoria', members: 'Miguel Angel Martínez Gómez y Luis Fernando Hernández Gómez' },
  { name: 'OPERACIONES', company: 'CaFi', department: 'OPERACIONES', members: 'LUIS ENRIQUE SANTOS ENRIQUEZ, MELECIO ANTONIO RUIZ DEL CARPIO' },
  { name: 'OpTeam', company: 'Grupo Chesa', department: 'Ventas', members: 'Fernando De Jesús Mora Saldaña' },
  { name: 'Victor Flores Casas', company: '5 Pinos', department: 'Finanzas y proyectos estrategicos', members: 'Victor Flores Casas' },
  { name: 'RefaBot Team', company: 'Grupo Chesa', department: 'Refacciones', members: 'Carlos de Jesús Camacho Sánchez, Jose Iván Mayorga Ruiz' },
  { name: 'Apex GP', company: 'Grupo Chesa', department: 'Capacitación', members: 'Weynner Joaseth Gordillo Morales, Maria Elizabeth Ovalle Islas' },
  { name: 'Chesa tu Nassan', company: 'Grupo Chesa', department: 'Posventa', members: 'Guadalupe del Carmen Solorzano Garcia' },
  { name: 'El oraculo corporativo', company: 'CaFi', department: 'Mejora Continua', members: 'Laura villafuerte y erika camacho' },
  { name: 'El señor de los entrenamientos', company: 'CaFi', department: 'Contabilidad', members: 'Vicente Jimenez Najera' },
  { name: 'El Var del sandwich', company: 'Otra', department: 'Operación', members: 'Luis Eugenio Lopez Najera, Jared Adin Lopez Cueto, Livi Orlando Mazariegos Guillen' },
  { name: 'Enlace inteligente', company: 'CaFi', department: 'Riesgos', members: 'Jonathan De Jesus Penagos Espinoza, Luis Fernando Trujillo Gerardo, Esteban Sanchez Huerta, Linet Anahi Pimentel Castro' },
  { name: 'Erick Samuel Garcia Jimenez', company: '5 Pinos', department: 'Talento Humano', members: 'Erick Samuel Garcia Jimenez' },
  { name: 'G&A', company: 'CaFi', department: 'Administración', members: 'KARINA SUAREZ ALVAREZ, JUAN GONZALO CRUZ LOPEZ, RIGOBERTO IVAN MALDONADO RAMOS' },
  { name: 'Jüptar', company: 'Grupo Chesa', department: 'Mejora Continua', members: 'MARIO ARTURO LOPEZ GOMEZ, Ivonne Courtois' },
  { name: 'La cazatraspasos', company: 'CaFi', department: 'Contabilidad', members: 'Nayely del Carmen Bautista Ramirez, Vicente Jimenez Najera' },
  { name: 'La patrulla del chip perdido', company: 'CaFi', department: 'Administración', members: 'Stephania Hernández y Cesar Flores, Vicente Jimenez Najera' },
  { name: 'La santa conciliación', company: 'CaFi', department: 'Contabilidad', members: 'Elizabeth Carpio, Vicente Jimenez Najera' },
  { name: 'LEXIA', company: 'Grupo Prosur', department: 'Planeación', members: '1. Juan Carlos Pérez, 2. Claudia Roxana Ruiz Ruiz, 3. Alondra Montserrat Hernandez Sanchez' },
  { name: 'Los chicos que lloran', company: 'Grupo Chesa', department: 'Análisis de Datos', members: 'Iván Esaú Nájera López, Brandon Humberto Nepomuceno Cruz, Susana Elizabeth Santiz Vazquez, Jose Armando Pinacho Lopez, Luis Gustavo Santiago Bonifaz' },
  { name: 'Papeles de trabajo', company: 'Grupo Prosur', department: 'Contraloría', members: '1. Jose Francisco Flores Zuñiga, 2. Andrea Ricarda Velazco Trejo, 3. Maria Nicolasa Santiz Diaz, 4. Carina Alicia Santiz Lopez, 5. Guadalupe del Carmen Jimenez Najera' },
  { name: 'Procesos', company: 'Calzamoda', department: 'Auditoria y Procesos', members: 'Diego López Guzmán, Felipe de Jesús Paniagua Ruiz' },
  { name: 'Reclutapower', company: 'CaFi', department: 'Talento Humano', members: 'Jazmin Garduza Luna, Cintrya Velazquez Perez' },
  { name: 'Smart Norm', company: 'Grupo Chesa', department: 'Talento Humano', members: 'Richard Alonso Nataren Chacon, GIBRAN HASHMED GARCIA CRUZ, LAURA JOVANNA TRUJILLO SOLORZANO' },
  { name: 'T-800', company: 'CaFi', department: 'Marketing', members: 'Oswaldo Rafael Hernández Rodriguez' },
  { name: 'Talentia 360', company: 'Grupo Chesa', department: 'Talento Humano', members: 'MARIA ELIZABETH OVALLE ISLAS, ALEJANDRA JOCABETH GORDILLO MORALES' },
  { name: 'Talento Humano', company: 'Grupo Chesa', department: 'Recursos Humanos', members: 'MARIA ELIZABETH OVALLE ISLAS, ALEJANDRA JOCABETH GORDILLO MORALES' },
  { name: 'Talento y Desempeño con IA', company: 'Grupo Chesa', department: 'Talento Humano', members: 'FATIMA PENELOPE PEREZ CERON, MARIA ELIZABETH OVALLE ISLAS, ALEJANDRA JOCABETH GORDILLO MORALES' },
  { name: 'TEAM AMOS', company: 'CaFi', department: 'OPERATIVA - COMERCIAL', members: 'ANGELINA ASUNCION DIAZ HERNANDEZ, MONTSERRAT SANDOVAL ZEPEDA, OSWALDO RAFAEL HERNANDEZ RODRIGUEZ, MAYRA BERENICE MONTOYA GARCIA' },
  { name: 'TORQUE LEAD IA', company: 'Grupo Chesa', department: 'Ventas', members: 'YAHIR IVAN LOPEZ GOMEZ' },
  { name: 'TU GUARDIAN CAFI', company: 'CaFi', department: 'Prevención de fraudes', members: 'Claudia Patricia Morales Gordillo, Guadalupe Alejandra Bermudez Abarca' },
  { name: 'VocalIA', company: 'Grupo Chesa', department: 'Talento Humano', members: 'Alejandra Jocabeth Gordillo Morales, Maria Elizabeth Ovalle Islas' },
  { name: 'Talento IA', company: 'Grupo Prosur', department: 'Recursos Humanos', members: 'Yazmin Mijangos Zepeda, Jose Martin Flores Gomez' }
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

    // PARTICIPANTE INDIVIDUAL DIEGO LOPEZ
    {
      id: 'usr-part-diego',
      name: 'Diego Lopez',
      roleType: 'participant',
      roleTitle: 'Líder del Proyecto Reto IA',
      unit: 'Grupo Prosur',
      unitClass: 'badge-unit-agrifood',
      avatar: getAvatar('Diego Lopez'),
      email: 'diego.lopez@prosur.com',
      password: 'diegolopez2026',
      bio: 'Participante oficial del Reto de Inteligencia Artificial Prosur.',
      stats: { demosPublished: 1, totalViews: 0, totalLikes: 0, collaborations: 0 },
      savedDemoIds: [],
      badges: ['Participante Oficial']
    },

    // JUECES (16)
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

    // ALL EQUIPOS / TEAMS FROM TABLE IMAGE AS PARTICIPANTS
    ...participantUsers
  ],

  // AI Demos List
  demos: [
    {
      id: 1,
      authorId: 'usr-team-40', // Equipo Procesos (Calzamoda)
      title: 'Solución de IA: Optimización de Auditoría y Procesos',
      subtitle: 'Demo del Equipo Procesos (Calzamoda) para el Reto IA 2026.',
      description: 'Sistema inteligente de análisis y automatización de flujos de auditoría interna.',
      unit: 'Calzamoda',
      unitClass: 'badge-unit-agrifood',
      category: 'Calzamoda',
      problemStatement: 'Demoras en la verificación manual de procesos e inventarios.',
      impactMetrics: 'Reducción del 50% en tiempos de revisión de auditoría.',
      tags: ['Calzamoda', 'Reto IA', 'Procesos'],
      author: 'Equipo: Procesos',
      authorRole: 'Equipo (Auditoria y Procesos)',
      authorAvatar: getAvatar('Procesos'),
      views: 120,
      likes: 15,
      rating: 0,
      duration: '3:00',
      thumbnail: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=800',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      specs: {
        modelType: 'Custom AI Architecture',
        latency: 'Real-time',
        dataSources: 'Base de datos Calzamoda',
        status: 'En evaluación'
      },
      images: [],
      evaluations: [],
      comments: []
    },
    {
      id: 2,
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
      views: 240,
      likes: 42,
      rating: 0,
      duration: '4:00',
      thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      specs: {
        modelType: 'Full-Stack SPA + Firebase',
        latency: '<100ms',
        dataSources: 'Firestore Cloud DB',
        status: 'Desplegado en Producción'
      },
      images: [],
      evaluations: [],
      comments: []
    }
  ],

  posts: []
};

// Load initial state with localStorage persistence
function loadInitialState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && Array.isArray(parsed.users) && parsed.users.length > 0) {
        let activeUser = null;
        if (parsed.activeUserId) {
          activeUser = parsed.users.find(u => u.id === parsed.activeUserId) || null;
        }
        return {
          ...defaultState,
          ...parsed,
          users: parsed.users,
          demos: (Array.isArray(parsed.demos) && parsed.demos.length > 0) ? parsed.demos : defaultState.demos,
          currentUser: activeUser
        };
      }
    }
  } catch (e) {
    console.warn('Could not parse localStorage state:', e);
  }

  return {
    ...defaultState,
    currentUser: null
  };
}

export const state = loadInitialState();

export function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    isAuthenticated: state.isAuthenticated,
    activeUserId: state.activeUserId,
    selectedCategory: state.selectedCategory,
    selectedUnit: state.selectedUnit,
    users: state.users,
    demos: state.demos,
    posts: state.posts
  }));
}

// -------------------------------------------------------------
// FIREBASE REALTIME SYNC & FIRESTORE INTEGRATION
// -------------------------------------------------------------
if (isFirebaseConfigured()) {
  console.log('🔥 Syncing state with Firebase Firestore...');
  
  onSnapshot(collection(db, 'users'), (snapshot) => {
    if (snapshot && !snapshot.empty) {
      const cloudUsers = [];
      snapshot.forEach(docSnap => cloudUsers.push({ id: docSnap.id, ...docSnap.data() }));
      if (cloudUsers.length > 0) {
        state.users = cloudUsers;
        if (state.activeUserId) {
          state.currentUser = state.users.find(u => u.id === state.activeUserId) || state.currentUser;
        }
        saveState();
      }
    } else {
      seedFirestoreUsers().catch(err => console.warn('Seed users warning:', err));
    }
  }, (err) => {
    console.warn('Firestore users snapshot warning:', err);
  });

  onSnapshot(collection(db, 'demos'), (snapshot) => {
    if (snapshot && !snapshot.empty) {
      const cloudDemos = [];
      snapshot.forEach(docSnap => {
        const data = docSnap.data();
        cloudDemos.push({ id: isNaN(Number(docSnap.id)) ? docSnap.id : Number(docSnap.id), ...data });
      });
      if (cloudDemos.length > 0) {
        state.demos = cloudDemos;
        saveState();
      }
    } else {
      seedFirestoreDemos().catch(err => console.warn('Seed demos warning:', err));
    }
  }, (err) => {
    console.warn('Firestore demos snapshot warning:', err);
  });
}

async function seedFirestoreUsers() {
  for (const u of defaultState.users) {
    try { await setDoc(doc(db, 'users', u.id), u); } catch (e) {}
  }
}

async function seedFirestoreDemos() {
  for (const d of defaultState.demos) {
    try { await setDoc(doc(db, 'demos', String(d.id)), d); } catch (e) {}
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
    updateDoc(doc(db, 'users', state.currentUser.id), { savedDemoIds: state.currentUser.savedDemoIds });
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
      avatar: state.currentUser.avatar,
      role: state.currentUser.roleTitle || state.currentUser.role,
      date: 'Justo ahora',
      text: commentText.trim()
    };
    demo.comments.push(newComment);
    saveState();
    if (isFirebaseConfigured()) {
      updateDoc(doc(db, 'demos', String(demoId)), { comments: demo.comments });
    }
  }
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
  if (data.videoUrl !== undefined) demo.videoUrl = data.videoUrl;

  saveState();
  if (isFirebaseConfigured()) {
    updateDoc(doc(db, 'demos', String(demoId)), demo);
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
    updateDoc(doc(db, 'demos', String(demoId)), { images: demo.images });
  }
  return true;
}

export function removeDemoImage(demoId, imageIndex) {
  const demo = getDemoById(demoId);
  if (!demo || (!isOwner(demo) && !isAdmin())) return false;
  demo.images.splice(imageIndex, 1);
  saveState();
  if (isFirebaseConfigured()) {
    updateDoc(doc(db, 'demos', String(demoId)), { images: demo.images });
  }
  return true;
}

export function submitJudgeEvaluation(demoId, scores, feedback) {
  const demo = getDemoById(demoId);
  if (!demo || !isJudge()) return false;

  if (!demo.evaluations) demo.evaluations = [];

  const avg = (
    parseInt(scores.innovation) +
    parseInt(scores.viability) +
    parseInt(scores.pitch) +
    parseInt(scores.impact)
  );

  const existingIndex = demo.evaluations.findIndex(e => e.judgeId === state.currentUser.id);
  const evalData = {
    id: 'eval-' + Date.now(),
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
    feedback: feedback.trim()
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
    updateDoc(doc(db, 'demos', String(demoId)), { evaluations: demo.evaluations, rating: demo.rating }).catch(() => {});
  }
  return true;
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
    setDoc(doc(db, 'users', newId), newUser).catch(() => {});
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
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
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
    setDoc(doc(db, 'demos', String(newId)), newDemo).catch(() => {});
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
      updateDoc(doc(db, 'demos', String(demoId)), {
        authorId: author.id,
        author: author.name,
        authorRole: author.roleTitle,
        authorAvatar: author.avatar
      }).catch(() => {});
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

  state.demos.forEach(d => {
    if (d.authorId === userId) {
      d.author = user.name;
      d.authorRole = user.roleTitle;
      d.unit = user.unit;
    }
  });

  saveState();
  if (isFirebaseConfigured()) {
    setDoc(doc(db, 'users', userId), user).catch(() => {});
  }
  return true;
}

export function deleteUser(userId) {
  if (!isAdmin()) return false;
  const idx = state.users.findIndex(u => u.id === userId);
  if (idx !== -1) {
    state.users.splice(idx, 1);
    saveState();
    if (isFirebaseConfigured()) {
      deleteDoc(doc(db, 'users', userId)).catch(() => {});
    }
    return true;
  }
  return false;
}

export function deleteDemo(demoId) {
  if (!isAdmin()) return false;
  const idx = state.demos.findIndex(d => String(d.id) === String(demoId));
  if (idx !== -1) {
    state.demos.splice(idx, 1);
    saveState();
    if (isFirebaseConfigured()) {
      deleteDoc(doc(db, 'demos', String(demoId))).catch(() => {});
    }
    return true;
  }
  return false;
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
    setDoc(doc(db, 'posts', newPost.id), newPost).catch(() => {});
  }
}

export function resetState() {
  localStorage.removeItem(STORAGE_KEY);
  window.location.reload();
}
