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

// 요양보호사 스케줄 상세 응답 타입
export interface CaregiverScheduleDetailResponse {
  serviceMatchId: string;
  consumerName: string;
  consumerPhone: string;
  emergencyContact: string;
  serviceDate: string;
  startTime: string;
  endTime: string;
  serviceType: string;
  address: string;
  entryMethod: string;
  careGrade: string;
  weight: string;
  hasDementia: boolean;
  isBedridden: boolean;
  cognitiveStatus: string;
  cohabitationStatus: string;
  specialNotes: string;
  status: string;
}



