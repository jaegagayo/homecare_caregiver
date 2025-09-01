// 백엔드 정산 내역 응답 타입 (GetCaregiverCenterSettlementResponse)
export interface CaregiverCenterSettlementResponse {
  centerName: string;
  settlements: SettlementByCaregiverResponse[];
}

// 백엔드 개별 정산 내역 응답 타입 (GetSettlementByCaregiverResponse)
export interface SettlementByCaregiverResponse {
  centerName: string;
  settlementId: string;
  caregiverName: string;
  serviceDate: string;
  serviceStartTime: string;
  serviceEndTime: string;
  settlementAmount: number;
  distanceLog: number;
  isPaid: boolean;
}

// 정산 요약 응답 타입 (GetSettlementSummaryByCaregiverResponse)
export interface SettlementSummaryResponse {
  totalAmount: number;
  completedCount: number;
  plannedCount: number;
  cancelledCount: number;
}
