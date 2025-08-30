import { CaregiverScheduleResponse } from './schedule';
import { RecurringOfferSummaryResponse } from './recurringOffer';

// 홈 페이지에서 필요한 데이터 타입
export interface HomeData {
  caregiverName: string;
  todaySchedules: CaregiverScheduleResponse[];
  tomorrowSchedules: CaregiverScheduleResponse[];
  regularProposals: RecurringOfferSummaryResponse[];
}
