// 정산 내역 응답 타입
export interface EarningsResponse {
  id: string;
  date: string;
  clientName: string;
  serviceType: string;
  duration: number;
  hourlyRate: number;
  totalAmount: number;
  status: 'completed' | 'pending' | 'cancelled';
}

// 정산 요약 응답 타입
export interface EarningsSummaryResponse {
  total: number;
  thisWeek: number;
  thisMonth: number;
  lastMonth: number;
  averagePerDay: number;
  totalHours: number;
}
