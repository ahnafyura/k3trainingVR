// TypeScript Type Definitions
export interface User {
  id: number;
  name: string;
  nik: string;
  role: 'admin' | 'worker';
}

export interface Module {
  id: number;
  title: string;
  description: string;
  video_url: string;
  thumbnail?: string;
}

export interface UserProgress {
  id: number;
  user_id: number;
  module_id: number;
  status: 'not_started' | 'in_progress' | 'completed';
  completion_percentage: number;
}
