import type { Course, Video, CourseDocument, VideoDocument } from './types';
import { getFirebaseAdmin } from './firebase-admin';

// This data is now only used for the one-time migration to Firestore.
export const courses: Course[] = [
  {
    id: 'quantum-computing',
    title: 'Quantum Computing Explained',
    description: 'Dive into the weird and wonderful world of quantum computing. Learn the basics of qubits, superposition, and entanglement.',
    image: 'quantum-computing-course',
    subject: 'Engineering',
    videos: [
      { id: 'qc-intro', title: 'Introduction to Quantum Computing', youtubeId: 'F_Riqjdh2oM' },
      { id: 'qc-qubits', title: 'Qubits: The Building Blocks', youtubeId: 'g_IaVepNDT4' },
      { id: 'qc-superposition', title: 'Superposition and Entanglement', youtubeId: 'ZzRc_P5I2D8' },
      { id: 'qc-algorithms', title: 'Quantum Algorithms', youtubeId: 'h32h4s0_i3w' },
    ],
  },
  {
    id: 'future-of-ai',
    title: 'The Future of Artificial Intelligence',
    description: 'Explore the cutting edge of AI, from large language models to generative art and beyond. What does the future hold?',
    image: 'future-of-ai-course',
    subject: 'Engineering',
    videos: [
      { id: 'ai-history', title: 'A Brief History of AI', youtubeId: '3gy31n4C3u8' },
      { id: 'ai-llms', title: 'Large Language Models (LLMs)', youtubeId: 'iR2O2GPbB0E' },
      { id: 'ai-ethics', title: 'The Ethics of Artificial Intelligence', youtubeId: 'q-w_I2Q3aoc' },
      { id: 'ai-agi', title: 'The Quest for Artificial General Intelligence (AGI)', youtubeId: 's-y_G12yOqM' },
    ],
  },
  {
    id: 'analog-digital-modulation',
    title: 'Analog and Digital Modulation',
    description: 'An introduction to the fundamental concepts of analog and digital modulation techniques in communication systems.',
    image: 'analog-digital-modulation-course',
    subject: 'Engineering',
    videos: [
      { id: 'adm-intro', title: 'Analog vs. Digital Signals', youtubeId: 'A_sY9-MyX9o' },
      { id: 'adm-am', title: 'Amplitude Modulation (AM)', youtubeId: 'M3hV_z3g25g' },
      { id: 'adm-fm-pm', title: 'Frequency & Phase Modulation (FM/PM)', youtubeId: 't5K5Zfd-gwo' },
      { id: 'adm-pcm', title: 'Pulse Code Modulation (PCM)', youtubeId: 'OaM6gItg6co' },
    ],
  },
  {
    id: 'structural-analysis',
    title: 'Civil Engineering: Structural Analysis',
    description: 'Learn the fundamentals of structural analysis, including forces, moments, and how to analyze simple trusses and beams.',
    image: 'civil-engineering-course',
    subject: 'Engineering',
    videos: [
      { id: 'sa-intro', title: 'Introduction to Statics', youtubeId: 'zjbT-4W2a-4' },
      { id: 'sa-trusses', title: 'Method of Joints for Truss Analysis', youtubeId: 'Yv4iK9tY1yM' },
      { id: 'sa-beams', title: 'Shear and Moment Diagrams', youtubeId: 'fP15pG24-I4' },
      { id: 'sa-deflection', title: 'Beam Deflection', youtubeId: 'Ibi5vPr1lRw' },
    ],
  },
  {
    id: 'wireless-networking-fundamentals',
    title: 'Wireless Networking Fundamentals',
    description: 'Understand the basics of wireless networking, including Wi-Fi standards, network security, and how data travels through the air.',
    image: 'wireless-networking-course',
    subject: 'Engineering',
    videos: [
      { id: 'wn-intro', title: 'What is Wi-Fi?', youtubeId: '7_06-g22S3E' },
      { id: 'wn-standards', title: 'Wi-Fi Standards Explained (802.11ax)', youtubeId: 'p2n2M5i3J2o' },
      { id: 'wn-security', title: 'Wireless Security (WPA3, WEP, etc.)', youtubeId: 'ToGao_cooEY' },
      { id: 'wn-setup', title: 'How to Set Up a Home Network', youtubeId: 'u_ve-G4i9dc' },
    ],
  },
  {
    id: 'soil-science',
    title: 'Agriculture: Introduction to Soil Science',
    description: 'Explore the composition, properties, and importance of soil in agriculture and ecosystem health.',
    image: 'soil-science-course',
    subject: 'Agriculture',
    videos: [
      { id: 'ss-intro', title: 'What is Soil?', youtubeId: 'o-47cCy9xNc' },
      { id: 'ss-texture', title: 'Soil Texture and Structure', youtubeId: 'ihj2NQjo3lg' },
      { id: 'ss-nutrients', title: 'Soil Nutrients and Fertility', youtubeId: 'vBi_j3Vp-yE' },
      { id: 'ss-conservation', title: 'Soil Conservation', youtubeId: 'w221_a2AI5s' },
    ],
  },
  {
    id: 'human-anatomy',
    title: 'Health Science: Human Anatomy Fundamentals',
    description: 'A beginner-friendly overview of the major organ systems of the human body and their functions.',
    image: 'human-anatomy-course',
    subject: 'Health Science',
    videos: [
      { id: 'ha-intro', title: 'Introduction to the Human Body', youtubeId: 'gEUu-A2wfSE' },
      { id: 'ha-skeletal', title: 'The Skeletal System', youtubeId: 'rDGqkMHf4bQ' },
      { id: 'ha-muscular', title: 'The Muscular System', youtubeId: 'Vask8qjKx_I' },
      { id: 'ha-nervous', title: 'The Nervous System', youtubeId: '71pCilo8k4M' },
    ],
  },
];

// Fetches a course and its videos from Firestore
export async function getCourseWithVideos(courseId: string): Promise<{ course: CourseDocument; videos: Video[] } | null> {
  const { db } = getFirebaseAdmin();
  const courseRef = db.collection('courses').doc(courseId);
  const courseDoc = await courseRef.get();

  if (!courseDoc.exists) {
    return null;
  }

  const videosSnapshot = await courseRef.collection('videos').get();
  const videos = videosSnapshot.docs.map(doc => ({ ...doc.data() as VideoDocument, id: doc.id }));

  return {
    course: courseDoc.data() as CourseDocument,
    videos: videos,
  };
}

// Fetches a single video from a course in Firestore
export async function getVideoFromCourse(courseId: string, videoId: string): Promise<Video | null> {
  const { db } = getFirebaseAdmin();
  const videoRef = db.collection('courses').doc(courseId).collection('videos').doc(videoId);
  const videoDoc = await videoRef.get();

  if (!videoDoc.exists) {
    return null;
  }

  return { ...videoDoc.data() as VideoDocument, id: videoDoc.id };
}
