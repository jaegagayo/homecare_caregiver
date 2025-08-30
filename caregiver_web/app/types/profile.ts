// 프로필 업데이트 요청 타입
export interface ProfileUpdateRequest {
  address: string;
  career: number;
  koreanProficiency: 'BASIC' | 'INTERMEDIATE' | 'ADVANCED' | 'NATIVE';
  isAccompanyOuting: boolean;
  selfIntroduction: string;
}

// 프로필 상세 응답 타입
export interface ProfileDetailResponse {
  caregiverId: string;
  caregiverName: string;
  email: string;
  birthDate: string;
  phone: string;
  address: string;
  career: number;
  koreanProficiency: 'BASIC' | 'INTERMEDIATE' | 'ADVANCED' | 'NATIVE';
  isAccompanyOuting: boolean;
  selfIntroduction: string;
  verifiedStatus: 'PENDING' | 'APPROVED' | 'REJECTED';
  serviceTypes: string[];
}

// 자격증 응답 타입
export interface CertificationResponse {
  certificationId: string;
  certificationNumber: string;
  certificationDate: string;
  trainStatus: boolean;
}

// 자격증 업데이트 요청 타입
export interface CertificationUpdateRequest {
  certificationNumber: string;
  certificationDate: string;
  trainStatus: boolean;
}
