export interface Video {
  id: string;
  title: string;
  youtubeId: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  videos: Video[];
  subject: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

// Firestore-specific types
export type CourseDocument = Omit<Course, 'id' | 'videos'>;
export type VideoDocument = Omit<Video, 'id'>;
