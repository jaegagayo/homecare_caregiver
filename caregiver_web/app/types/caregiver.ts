// 요양보호사 정보 조회를 위한 API 응답 타입 - 백엔드와 정확히 일치
export interface CaregiverProfileApi {
  caregiverName: string;
  email: string;
  birthDate: string;
  phone: string;
  address: string;
  serviceTypes: string[];
}

// 자격증 정보 조회를 위한 API 응답 타입
export interface CaregiverCertificationApi {
  certificationId: string;
  certificationNumber: string;
  certificationDate: string;
  trainStatus: boolean;
}

// 센터 정보 조회를 위한 API 응답 타입
export interface CaregiverCenterApi {
  caregiverCenterId: string;
  centerName: string;
  centerPhone: string;
}
