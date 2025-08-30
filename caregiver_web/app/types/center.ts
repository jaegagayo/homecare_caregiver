// 센터 등록 요청 타입
export interface CenterRegistrationRequest {
  centerId: string;
  centerName: string;
  centerAddress: string;
  centerPhone: string;
  registrationDate: string;
}

// 센터 등록 응답 타입
export interface CenterRegistrationResponse {
  registrationId: string;
  status: 'pending' | 'approved' | 'rejected';
  message?: string;
}

// 센터 검색 응답 타입
export interface CenterSearchResponse {
  centerId: string;
  centerName: string;
  centerAddress: string;
  centerPhone: string;
  distance: number;
  rating: number;
  reviewCount: number;
}

// 근무 조건 요청 타입
export interface WorkConditionsRequest {
  centerId: string;
  preferredDays: string[];
  preferredTimeSlots: string[];
  hourlyRate: number;
  maxDistance: number;
  specialConditions?: string;
}
