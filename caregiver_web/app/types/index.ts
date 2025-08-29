// Schedule types
export * from './schedule';

// 요양보호사 관련 타입
export interface Caregiver {
  caregiverId: string;
  name: string;
  phone: string;
  address: string;
  career: number;
  koreanProficiency: 'BASIC' | 'INTERMEDIATE' | 'ADVANCED' | 'NATIVE';
  isAccompanyOuting: boolean;
  selfIntroduction: string;
  verifiedStatus: 'PENDING' | 'APPROVED' | 'REJECTED';
}

// 정기 제안 관련 타입
export interface RegularProposal {
  id: string;
  applicantName: string;
  period: string;
  totalSessions: number;
  dayOfWeek: string;
  timeSlot: string;
  address: string;
  serviceType: string;
  specialRequests?: string;
  status: 'pending' | 'approved' | 'rejected';
}

// 최근 배정 관련 타입
export interface RecentAssignment {
  id: string;
  date: string;
  time: string;
  applicantName: string;
  location: string;
  institutionId?: string;
  isInstitutionSelected: boolean;
} 