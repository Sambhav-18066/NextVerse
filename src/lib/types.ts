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

// These types are kept for potential future use but are not currently used with local data.
export type CourseDocument = Omit<Course, 'id' | 'videos'>;
export type VideoDocument = Omit<Video, 'id'>;
