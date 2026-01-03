// Database Types for Supabase

export interface Portfolio {
  id: string;
  title: string;
  category: '웨딩' | '부케' | '화환' | '클래스작품' | '기타';
  image_url: string; // 대표 이미지 (첫 번째 이미지)
  image_urls?: string[]; // 추가 이미지들
  description?: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface ClassCurriculum {
  step: string;
  title: string;
  content: string;
}

export interface ClassPolicy {
  refund: string;
  note: string;
}

export interface BankInfo {
  bank: string;
  account: string;
  holder: string;
}

export interface Class {
  id: string;
  title: string;
  subtitle?: string;
  category?: string;
  level?: string;
  description: string;
  image_url: string; // 대표 이미지 (첫 번째 이미지)
  image_urls?: string[]; // 추가 이미지들
  location: string;
  duration: string;
  price: number;
  price_display: string;
  capacity?: string;
  curriculum?: ClassCurriculum[];
  policy?: ClassPolicy;
  bank_info?: BankInfo;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ClassSchedule {
  id: string;
  class_id: string;
  schedule_date: string;
  schedule_display: string;
  available_seats: number;
  is_available: boolean;
  created_at: string;
}

export interface Order {
  id: string;
  class_id: string;
  schedule_id?: string;
  name: string;
  phone: string;
  email?: string;
  schedule_display: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface AdminSettings {
  id: string;
  key: string;
  value?: string;
  description?: string;
  updated_at: string;
}

// API Response Types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page?: number;
  limit?: number;
}

// Create/Update Types (without auto-generated fields)
export type PortfolioCreate = Omit<Portfolio, 'id' | 'created_at' | 'updated_at'>;
export type PortfolioUpdate = Partial<PortfolioCreate>;

export type ClassCreate = Omit<Class, 'id' | 'created_at' | 'updated_at'>;
export type ClassUpdate = Partial<ClassCreate>;

export type ClassScheduleCreate = Omit<ClassSchedule, 'id' | 'created_at'>;

export type OrderCreate = Omit<Order, 'id' | 'created_at' | 'updated_at' | 'status'>;
export type OrderUpdate = Pick<Order, 'status' | 'notes'>;
