/**
 * ALL CONTENT LIVES HERE.
 * Edit text, links, projects, certificates etc. in this one file.
 */

export const profile = {
  name: 'Anushree G S',
  logo: 'Anushree G S',
  role: 'BCA Student | Aspiring AI & Full-Stack Developer',
  location: 'Palani, Tamil Nadu, India',
  niche: 'AI Product Design & Full-Stack Web Experiences',
  brand: ['Human-Centered', 'Innovative', 'Practical'],
  goalRole: 'AI Product Designer & Full-Stack Developer',
  mission:
    'I help users and businesses solve real-world problems through intelligent, user-friendly, and scalable digital products.',
  heroEyebrow: 'AI Product Designer & Full-Stack Developer',
  heroHeadline: 'AI + Full-Stack Developer Building Intelligent Digital Experiences',
  heroSub:
    'BCA student combining AI, full-stack development, and user-centered design to turn real-world problems into practical digital products.',
  aboutLead: 'I build digital experiences that combine engineering, design and interaction.',
  story: [
    'I am Anushree G S, a BCA student passionate about Artificial Intelligence, Full-Stack Development, and UI/UX Design. I enjoy transforming real-world problems into simple, useful, and visually engaging digital solutions.',
    'My journey started with programming and gradually expanded into web development, AI, and product design. Building projects has helped me understand that a successful product needs both strong technology and a good user experience. I enjoy learning new technologies, experimenting with ideas, and turning concepts into working products. My goal is to become a developer who can combine technology, creativity, and user-centered thinking.',
  ],
};

export const resumeUrl =
  'https://drive.google.com/file/d/1M9oTGTC82IcUIOKfsNyYywSq5NNkFeST/view?usp=sharing';

export const socials = [
  { id: 'email', label: 'Email', href: 'mailto:gsanushree18@gmail.com', handle: 'gsanushree18@gmail.com' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/anushree-gs', handle: 'anushree-gs' },
  { id: 'github', label: 'GitHub', href: 'https://github.com/gsanushree18', handle: 'gsanushree18' },
  { id: 'x', label: 'X (Twitter)', href: 'https://x.com/gsanushree', handle: '@gsanushree' },
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/_.anxnu._?stkn=MXhsNXFicDM3emZ5cg==',
    handle: '_.anxnu._',
  },
] as const;

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'work', label: 'Work' },
  { id: 'journey', label: 'Journey' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
];

export const marqueeWords = [
  'Full-Stack Development',
  'AI Product Design',
  'UI/UX Design',
  'Machine Learning',
  'Human-Centered',
  'Innovative',
  'Practical',
];

/* ---------------- PASSION ---------------- */
export const passions = [
  'AI & Technology',
  'Boxing & Sports',
  'Building Projects & Continuous Learning',
];

export const passionText =
  'My interest in technology makes me curious about how new tools can solve real-world problems. Sports has taught me discipline, consistency, focus, and the importance of continuous improvement. Building projects helps me turn ideas into practical solutions and learn from experimentation.';

export const passionQuote = 'Keep learning. Keep building. Keep improving.';

export type MediaItem = { src: string; alt: string; width: number; height: number };

export const drawings: MediaItem[] = [
  { src: '/images/drawings/drawing-1.webp', alt: 'Pencil sketch of child Krishna holding a lotus', width: 1079, height: 1400 },
  { src: '/images/drawings/drawing-2.webp', alt: 'Pencil sketch of Ganesha seated in a bowl', width: 934, height: 1400 },
  { src: '/images/drawings/drawing-3.webp', alt: 'Pencil sketch of a girl wearing a cap', width: 719, height: 959 },
  { src: '/images/drawings/drawing-4.webp', alt: 'Pencil sketch of a woman’s face with closed eyes', width: 959, height: 719 },
  { src: '/images/drawings/drawing-5.webp', alt: 'Pencil sketch of a rose with leaves', width: 628, height: 959 },
  { src: '/images/drawings/drawing-6.webp', alt: 'Colour drawing of a cartoon mouse in a scarf', width: 719, height: 959 },
];

export const sports: MediaItem[] = [
  { src: '/images/sports/sport-1.webp', alt: 'Anushree in boxing gear and gloves', width: 282, height: 666 },
  { src: '/images/sports/sport-2.webp', alt: 'Team photo in matching jerseys', width: 1400, height: 661 },
  { src: '/images/sports/sport-3.webp', alt: 'Team with certificates and trophies', width: 1400, height: 788 },
  { src: '/images/sports/sport-4.webp', alt: 'Team posing with a basketball', width: 959, height: 539 },
  { src: '/images/sports/sport-5.webp', alt: 'Holding a winner’s trophy', width: 717, height: 886 },
  { src: '/images/sports/sport-6.webp', alt: 'Teams lined up on a basketball court', width: 434, height: 205 },
];

/* ---------------- SKILLS ---------------- */
export const skillGroups = [
  {
    title: 'Development',
    items: ['C', 'C++', 'SQL', 'HTML', 'CSS', 'JavaScript', 'Full-Stack Development'],
  },
  {
    title: 'AI / ML',
    items: ['Artificial Intelligence', 'Machine Learning', 'AI Fundamentals'],
  },
  {
    title: 'Design',
    items: ['UI/UX', 'Wireframing', 'Prototyping', 'User Flow', 'Visual Design'],
  },
  {
    title: 'Other',
    items: ['Git', 'GitHub', 'Problem Solving', 'Data Structures'],
  },
];

export const tools = [
  { name: 'C', use: 'Programming' },
  { name: 'C++', use: 'Programming' },
  { name: 'SQL', use: 'Databases' },
  { name: 'HTML', use: 'Structure' },
  { name: 'CSS', use: 'Styling' },
  { name: 'JavaScript', use: 'Interaction' },
  { name: 'Git', use: 'Version control' },
  { name: 'GitHub', use: 'Collaboration' },
];

/* ---------------- PROJECTS ---------------- */
export type Project = {
  id: string;
  index: string;
  title: string;
  category: string;
  summary: string;
  type: string;
  team: string;
  duration: string;
  role: string;
  status: string;
  /** Fill this in when you know the stack, e.g. ['HTML', 'CSS', 'JavaScript'] */
  tech: string[];
  github: string;
  /** Optional: put a screenshot in /public/projects and set e.g. '/projects/recipe.webp' */
  image?: string;
  wire: 'recipe' | 'shop' | 'dashboard';
  case: {
    situation: string;
    task: string;
    action: string;
    result: string;
    affected: string;
    userFlow: string;
    emotion: string;
    validation?: string;
  };
};

export const projects: Project[] = [
  {
    id: 'anus-recipe',
    index: '01',
    title: 'Anu’s Recipe',
    category: 'Food & Recipe / Lifestyle',
    summary:
      'A recipe discovery website that brings recipes, ingredients and cooking steps into one clear, easy-to-follow flow.',
    type: 'Website, Web Application',
    team: 'Solo',
    duration: '1 week',
    role: 'Full-Stack Developer + UI/UX Designer',
    status: 'Research, Prototype',
    tech: [],
    github: 'https://github.com/gsanushree18',
    image: '/projects/recipe.webp',
    wire: 'recipe',
    case: {
      situation:
        'Many people search for recipes online, but recipe information can sometimes be scattered across different websites and difficult to follow while cooking.',
      task: 'I wanted to create a simple and visually appealing recipe website where users could easily discover recipes and access ingredients and cooking instructions.',
      action:
        'I planned the website structure, designed the user interface, organized recipes into categories, created user flows and responsive layouts, and developed the website. I focused on clear typography, food imagery, easy navigation, and presenting recipe information in a simple format.',
      result:
        'I created a user-friendly recipe platform that combines visual design with practical web development. The project helped me improve my skills in UI/UX, responsive web design, frontend development, and structuring content for users.',
      affected: 'Students, beginners, home cooks, and anyone looking for simple recipes.',
      userFlow: 'Discover → Select → Understand → Cook',
      emotion: 'Comfortable, inspired, and confident.',
      validation:
        'Recipe discovery time, task completion rate, user satisfaction, and usability are still to be validated.',
    },
  },
  {
    id: 'shop-ease',
    index: '02',
    title: 'Shop Ease',
    category: 'E-commerce / Retail',
    summary:
      'A simple e-commerce experience built around clear product discovery, an easy cart and a smooth shopping flow.',
    type: 'Website / Full-Stack Web Application',
    team: 'Solo',
    duration: '2 days',
    role: 'Full-Stack Developer + UI/UX Designer',
    status: 'Research / Prototype',
    tech: [],
    github: 'https://github.com/gsanushree18',
    image: '/projects/shop.webp',
    wire: 'shop',
    case: {
      situation:
        'Online shoppers often have to navigate through multiple pages while searching for products, comparing options, and managing their cart.',
      task: 'Build a simple e-commerce platform with an intuitive interface and smooth shopping experience.',
      action:
        'I planned the website structure, designed the user interface, organized product information, created the main user flows, developed the web application, and refined the interface based on usability considerations.',
      result:
        'I created a functional e-commerce experience and gained practical experience in combining frontend development, product structure, UI design, and user-centered thinking.',
      affected: 'Online shoppers: students, young adults, and general online shoppers.',
      userFlow: 'Home → Discover → Explore → Select → Cart → Checkout',
      emotion: 'Confident and comfortable.',
      validation: 'Task completion rate, time-on-task, and user satisfaction are still to be validated.',
    },
  },
  {
    id: 'student-management',
    index: '03',
    title: 'Student Management System',
    category: 'Education Technology',
    summary:
      'An application for adding, searching, updating and deleting student records quickly and clearly.',
    type: 'Application',
    team: 'Solo',
    duration: '2 days',
    role: 'Developer + UI/UX Planner',
    status: 'Completed',
    tech: [],
    github: 'https://github.com/gsanushree18',
    image: '/projects/dashboard.webp',
    wire: 'dashboard',
    case: {
      situation: 'Managing student information manually can become difficult when records increase.',
      task: 'Create a simple system for managing and accessing student records efficiently.',
      action:
        'I planned the data structure, designed the application flow, implemented CRUD-related functionality, and focused on making common student-management tasks straightforward.',
      result:
        'The project helped me strengthen my programming, data-management, logical thinking, and application-development skills.',
      affected: 'Students, teachers, and administrators.',
      userFlow: 'Login → Dashboard → Student Records → Add / Edit / Search → Save',
      emotion: 'Organized and confident.',
    },
  },
];

/* ---------------- JOURNEY ---------------- */
export const journey = [
  { title: 'Before design', text: 'A BCA student mainly focused on programming and technical skills.' },
  {
    title: 'The challenge',
    text: 'I wanted to build useful projects but initially focused more on functionality than on how users would experience the product.',
  },
  {
    title: 'The turning point',
    text: 'While building real-world projects, I realized that technology alone is not enough. A good product needs both strong development and thoughtful design.',
  },
  {
    title: 'What design changed in me',
    text: 'Design taught me to understand users, think visually, simplify complex problems, and consider the experience behind every technical decision.',
  },
  {
    title: 'What I believe now',
    text: 'Good design is not only about appearance. It is about solving the right problem and making technology easier and more useful for people.',
  },
];

/* ---------------- ACHIEVEMENTS ---------------- */
export const certifications: { title: string; issuer?: string }[] = [
  { title: 'AI Ethics', issuer: 'IBM' },
  { title: 'Artificial Intelligence Fundamentals', issuer: 'IBM' },
  { title: 'Deep Learning vs Artificial Intelligence', issuer: 'Online Internship' },
  { title: 'Machine Learning and Deep Learning', issuer: 'IBM iX' },
  { title: 'Natural Language Processing and Computer Vision', issuer: 'IBM iX' },
  { title: 'Introduction to Artificial Intelligence', issuer: 'IBM iX' },
  { title: 'Programming in C++', issuer: 'Sololearn' },
  { title: 'Communicating with Impacts', issuer: 'IBM iX' },
  { title: 'Agile Project Management', issuer: 'HP LIFE & HP Foundation' },
  { title: 'Trending Project Domains & Ideas', issuer: 'Online Internship' },
  { title: 'Introduction to PHP', issuer: 'Simplilearn' },
  { title: 'Basic Cybersecurity & Digital Nudging', issuer: 'NGM College' },
  { title: 'Certificate of Appreciation', issuer: 'Drug Free Tamil Nadu 2026' },
  { title: 'Freshers’ Party Night Challenge', issuer: 'Google Student Ambassador Program 2026' },
  { title: 'Master SQL for Data/Business Analytics with AI Skills' },
  { title: 'Hindi Language Proficiency Certificate' },
];

export const badges = [
  {
    label: 'Google Skills Public Profile Badge',
    href: 'https://www.skills.google/public_profiles/5b29f12d-3f8b-4f93-95ef-730eb89468d8/badges/28034930',
  },
  { label: 'Credly Badge', href: 'https://www.credly.com/badges/2590e001-42cf-4872-9ee4-0a8c97f6a9fe/public_url' },
  { label: 'Google Skills Boost Earned Badge', href: 'https://developers.google.com/profile/badges/skillsboost/earned-badge' },
  { label: 'GDG Discovery', href: 'https://developers.google.com/profile/badges/community/gdg/discovery' },
  { label: 'NVIDIA Developer', href: 'https://developers.google.com/profile/badges/nvidia-developer' },
  { label: 'Recognitions: Learnings', href: 'https://developers.google.com/profile/badges/recognitions/learnings' },
  { label: 'Antigravity Arcade: Learn', href: 'https://developers.google.com/profile/badges/playlists/solutions/antigravity-arcade/learn' },
  { label: 'Antigravity Arcade: Complete', href: 'https://developers.google.com/profile/badges/playlists/solutions/antigravity-arcade/complete' },
  { label: 'SDLC Agents: GCA Agents', href: 'https://developers.google.com/profile/badges/community/sdlcagents/gca-agents' },
  { label: 'Google Developer Profile Created', href: 'https://developers.google.com/profile/badges/profile/created-profile' },
];

export const projectTypes = [
  'Internship Opportunity',
  'Full-Stack Project',
  'AI Product',
  'UI/UX / Product Design',
  'Other',
];
