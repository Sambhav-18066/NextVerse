import type { Course, Video } from './types';

export const courses: Course[] = [
  {
    id: 'quantum-computing',
    title: 'Quantum Computing Explained',
    description: 'Dive into the weird and wonderful world of quantum computing. Learn the basics of qubits, superposition, and entanglement.',
    image: 'quantum-computing-course',
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
    videos: [
      { id: 'ai-history', title: 'A Brief History of AI', youtubeId: '3gy31n4C3u8' },
      { id: 'ai-llms', title: 'Large Language Models (LLMs)', youtubeId: 'iR2O2GPbB0E' },
      { id: 'ai-ethics', title: 'The Ethics of Artificial Intelligence', youtubeId: 'q-w_I2Q3aoc' },
      { id: 'ai-agi', title: 'The Quest for Artificial General Intelligence (AGI)', youtubeId: 's-y_G12yOqM' },
    ],
  },
];

export function getCourseById(id: string): Course | undefined {
  return courses.find((course) => course.id === id);
}

export function getVideoById(id: string): Video | undefined {
  for (const course of courses) {
    const video = course.videos.find((v) => v.id === id);
    if (video) return video;
  }
  return undefined;
}

export function getNextVideo(courseId: string, currentVideoId: string): Video | undefined {
  const course = getCourseById(courseId);
  if (!course) return undefined;

  const currentIndex = course.videos.findIndex((v) => v.id === currentVideoId);
  if (currentIndex === -1 || currentIndex === course.videos.length - 1) {
    return undefined; // No next video
  }

  return course.videos[currentIndex + 1];
}
