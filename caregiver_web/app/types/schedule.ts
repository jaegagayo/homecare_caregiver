// 요양보호사 스케줄 응답 타입 - 백엔드와 정확히 일치
export interface CaregiverScheduleResponse {
  serviceMatchId: string;
  consumerName: string;
  serviceDate: string;
  serviceStartTime: string;
  serviceEndTime: string;
  serviceAddress: string;
  serviceType: string;
  matchStatus: string;
  requestStatus: string;
}

// 요양보호사 스케줄 상세 응답 타입 - 백엔드와 정확히 일치
export interface CaregiverScheduleDetailResponse {
  consumerName: string;
  consumerPhone: string;
  guardianName: string;
  guardianPhone: string;
  serviceDate: string;
  serviceStartTime: string;
  serviceEndTime: string;
  duration: number;
  careGrade: number;
  disease: string;
  weight: number;
  cognitiveStatus: string;
  livingSituation: string;
  serviceAddress: string;
  entranceType: string;
  additionalInformation: string;
  serviceType: string;
  matchStatus: string;
}
