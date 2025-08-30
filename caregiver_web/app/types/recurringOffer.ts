// 정기 제안 요약 응답 타입 - 백엔드와 정확히 일치
export interface RecurringOfferSummaryResponse {
  recurringOfferId: string;
  consumerName: string;
  serviceStartDate: string;
  serviceEndDate: string;
  serviceStartTime: string;
  serviceEndTime: string;
  totalOccurrences: number;
  dayOfWeek: string[];
}
