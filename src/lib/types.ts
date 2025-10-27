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
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
}
