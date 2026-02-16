// TypeScript Type Definitions — K3 VR Training

export interface User {
  id: string;
  nik: string;
  name: string;
  email: string;
  phone?: string;
  role: "admin" | "worker";
  department?: string;
  status: "active" | "inactive" | "suspended";
  avatar_url?: string;
  created_at: any; // Firestore Timestamp
  updated_at: any;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  category: string;
  video_url: string;
  thumbnail?: string;
  duration_minutes: number;
  status: "active" | "draft" | "archived";
  difficulty?: "beginner" | "intermediate" | "advanced";
  order?: number;
  created_by?: string;
  created_at: any;
  updated_at: any;
}

export interface UserProgress {
  id: string;
  user_id: string;
  user_nik: string;
  module_id: string;
  status: "not_started" | "in_progress" | "completed";
  completion_percentage: number;
  last_position_seconds: number;
  score?: number;
  started_at?: any;
  completed_at?: any;
  created_at: any;
  updated_at: any;
}
