import { StudyMaterial, DiscussionThread, CampusEvent } from './types';

export const INITIAL_MATERIALS: StudyMaterial[] = [
  {
    id: 'mat-1',
    title: 'Data Structures & Algorithms Complete Comprehensive Notes',
    subject: 'Computer Science',
    type: 'Lecture Notes',
    author: 'Prof. Alan Turing',
    uploadDate: '2026-08-10',
    downloads: 342,
    upvotes: 89,
    description: 'Detailed walkthrough of Trees, Graphs, Dynamic Programming, and Sorting algorithms with time complexity analysis and Python/Java code examples.',
    fileSize: '4.2 MB',
    tags: ['DSA', 'Python', 'Algorithms', 'Interview Prep'],
    contentSnippet: 'Graphs: BFS vs DFS traversal comparison, Dijkstra shortest path algorithm implementation details...'
  },
  {
    id: 'mat-2',
    title: 'Multivariable Calculus & Differential Equations Cheat Sheet',
    subject: 'Mathematics',
    type: 'Cheat Sheet',
    author: 'Dr. Katherine Johnson',
    uploadDate: '2026-08-12',
    downloads: 512,
    upvotes: 142,
    description: 'Quick reference formulas for Stokes Theorem, Green Theorem, double/triple integrals, and Laplace transforms for midterms and finals.',
    fileSize: '1.8 MB',
    tags: ['Calculus', 'Math', 'Formulas', 'Exams'],
    contentSnippet: 'Green Theorem relates a line integral around a simple closed curve C to a double integral over the plane region D...'
  },
  {
    id: 'mat-3',
    title: 'Quantum Mechanics & Wave Functions Lab Manual',
    subject: 'Physics',
    type: 'Lab Manual',
    author: 'Dr. Richard Feynman',
    uploadDate: '2026-08-05',
    downloads: 189,
    upvotes: 45,
    description: 'Step-by-step experimental procedures for observing the photoelectric effect, atomic emission spectra, and uncertainty principle verification.',
    fileSize: '6.5 MB',
    tags: ['Quantum', 'Physics', 'Lab', 'Optics'],
    contentSnippet: 'Equipment setup: Mercury vapor lamp, diffraction grating spectrometer, and photomultiplier tube calibration...'
  },
  {
    id: 'mat-4',
    title: 'Macroeconomics Policy & Fiscal Stimulus Case Studies',
    subject: 'Economics',
    type: 'Textbook',
    author: 'John Maynard Keynes',
    uploadDate: '2026-07-28',
    downloads: 275,
    upvotes: 78,
    description: 'Analysis of central bank interest rate adjustments, inflation cycles, and post-pandemic economic recovery models across G7 economies.',
    fileSize: '8.1 MB',
    tags: ['Economics', 'Finance', 'Monetary Policy'],
    contentSnippet: 'IS-LM model extensions in open economies with capital mobility and flexible exchange rate regimes...'
  },
  {
    id: 'mat-5',
    title: 'VLSI Chip Design & CMOS Fabrication Guide',
    subject: 'Engineering',
    type: 'Lecture Notes',
    author: 'Dr. Carver Mead',
    uploadDate: '2026-08-14',
    downloads: 120,
    upvotes: 36,
    description: 'Covers transistor sizing, layout parasitics, clock tree distribution, and sub-nanometer lithography challenges.',
    fileSize: '5.3 MB',
    tags: ['VLSI', 'Electronics', 'Semiconductors'],
    contentSnippet: 'CMOS inverter VTC (Voltage Transfer Characteristics) and noise margin calculations...'
  }
];

export const INITIAL_THREADS: DiscussionThread[] = [
  {
    id: 'thread-1',
    title: 'Best strategy for mastering Dynamic Programming in coding interviews?',
    category: 'Computer Science',
    author: 'Alex Chen',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    createdAt: '2 hours ago',
    upvotes: 45,
    repliesCount: 12,
    content: 'I always struggle with figuring out whether to use memoization or tabulation, and how to define state transitions. Any recommended problem patterns or practice sheets?',
    tags: ['DSA', 'Interviews', 'Coding'],
    solved: false,
    comments: [
      {
        id: 'c-1',
        author: 'Sarah Jenkins',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
        content: 'Start with Fibonacci and Coin Change to understand bottom-up tabulation. Once you master the "Choice Tree", DP becomes second nature!',
        createdAt: '1 hour ago',
        upvotes: 18
      },
      {
        id: 'c-2',
        author: 'David Kim',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        content: 'Check out Striver’s DP playlist on YouTube. It categorizes problems into distinct patterns like LIS, LCS, and Knapsack variations.',
        createdAt: '30 mins ago',
        upvotes: 9
      }
    ]
  },
  {
    id: 'thread-2',
    title: 'Looking for study partners for Advanced Linear Algebra final exam',
    category: 'Exam Help',
    author: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
    createdAt: '1 day ago',
    upvotes: 24,
    repliesCount: 6,
    content: 'We are forming a study group to review eigenspaces, SVD, and Jordan canonical forms every Tuesday evening at the Science Library. Join us!',
    tags: ['Math', 'StudyGroup', 'Finals'],
    solved: true,
    comments: [
      {
        id: 'c-3',
        author: 'Marcus Vance',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
        content: 'Count me in! I need urgent help with singular value decomposition.',
        createdAt: '18 hours ago',
        upvotes: 5
      }
    ]
  },
  {
    id: 'thread-3',
    title: 'Hackathon 2026 Team Formation: AI for Sustainable Agriculture',
    category: 'Project Collab',
    author: 'Liam O’Connor',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150',
    createdAt: '2 days ago',
    upvotes: 67,
    repliesCount: 19,
    content: 'We need a frontend React developer and a backend/ML engineer for next month’s campus hackathon. We are building drone-based crop health analysis tools.',
    tags: ['Hackathon', 'AI', 'React', 'TeamCollab'],
    solved: false,
    comments: []
  },
  {
    id: 'thread-4',
    title: 'Tips for landing a Software Engineering internship as a sophomore?',
    category: 'Career Advice',
    author: 'Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    createdAt: '3 days ago',
    upvotes: 112,
    repliesCount: 34,
    content: 'Is LeetCode alone enough, or should I focus more on building full-stack side projects and open-source contributions? Would love advice from seniors.',
    tags: ['Career', 'Internships', 'Resume'],
    solved: false,
    comments: []
  }
];

export const INITIAL_EVENTS: CampusEvent[] = [
  {
    id: 'ev-1',
    title: 'Annual Fall Tech Hackathon 2026',
    category: 'Tech',
    date: '2026-09-15',
    time: '09:00 AM - 09:00 PM',
    location: 'University Student Union & Innovation Lab',
    organizer: 'IEEE Student Branch',
    description: '48-hour coding marathon with $10,000 in prizes, mentorship from top tech companies, free food, and swag!',
    attendeesCount: 240,
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600'
  },
  {
    id: 'ev-2',
    title: 'Midterm Exam Prep Workshop: Calculus & Physics',
    category: 'Academic',
    date: '2026-08-22',
    time: '04:00 PM - 06:30 PM',
    location: 'Science Hall 101 & Zoom Live Stream',
    organizer: 'Academic Success Center',
    description: 'Intensive problem-solving session led by senior TAs. Bring your past homework and graphing calculators.',
    attendeesCount: 95,
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600'
  },
  {
    id: 'ev-3',
    title: 'Inter-Departmental Cultural Fest & Open Mic',
    category: 'Cultural',
    date: '2026-09-02',
    time: '05:30 PM - 10:00 PM',
    location: 'Campus Amphitheater',
    organizer: 'Student Union Cultural Board',
    description: 'Music performances, dance battles, stand-up comedy, and food trucks representing global cuisines.',
    attendeesCount: 450,
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600'
  },
  {
    id: 'ev-4',
    title: 'AI & Future of Work Career Panel',
    category: 'Workshop',
    date: '2026-08-28',
    time: '02:00 PM - 04:00 PM',
    location: 'Auditorium B',
    organizer: 'Career Services & AI Research Group',
    description: 'Guest speakers from Google, OpenAI, and DeepMind discussing industry trends, AI ethics, and job market opportunities.',
    attendeesCount: 180,
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600'
  }
];
