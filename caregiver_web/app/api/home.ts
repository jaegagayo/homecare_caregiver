import { getStoredCaregiverId } from './auth';
import { getCaregiverProfile } from './caregiver';
import { getTodaySchedule, getTomorrowSchedule } from './schedule';
import { getRecurringOfferSummary } from './recurringOffer';
import { Schedule, RegularProposal } from '../types';

// 홈 페이지에서 필요한 데이터 타입
export interface HomeData {
  userName: string;
  todaySchedules: Schedule[];
  tomorrowSchedules: Schedule[];
  regularProposals: RegularProposal[];
}

// 홈 페이지 데이터 조회
export const getHomeData = async (): Promise<HomeData> => {
  try {
    const caregiverId = getStoredCaregiverId();
    if (!caregiverId) {
      throw new Error('caregiverId not found in localStorage');
    }

    // 병렬로 모든 데이터 조회
    const [profile, todaySchedules, tomorrowSchedules, regularProposals] = await Promise.all([
      getCaregiverProfile(caregiverId),
      getTodaySchedule(caregiverId),
      getTomorrowSchedule(caregiverId),
      getRecurringOfferSummary(caregiverId),
    ]);

    // API 응답을 컴포넌트에서 사용할 형태로 변환
    const transformedTodaySchedules: Schedule[] = todaySchedules.map(schedule => ({
      id: schedule.serviceMatchId,
      time: `${schedule.startTime} - ${schedule.endTime}`,
      clientName: schedule.consumerName,
      address: schedule.address,
      serviceType: schedule.serviceType,
      status: schedule.status === 'SCHEDULED' ? 'scheduled' : 
              schedule.status === 'COMPLETED' ? 'completed' : 'cancelled',
      isRegular: schedule.isRegular,
      regularSequence: schedule.regularSequence,
    }));

    const transformedTomorrowSchedules: Schedule[] = tomorrowSchedules.map(schedule => ({
      id: schedule.serviceMatchId,
      time: `${schedule.startTime} - ${schedule.endTime}`,
      clientName: schedule.consumerName,
      address: schedule.address,
      serviceType: schedule.serviceType,
      status: 'scheduled', // 내일 일정은 모두 예정
      isRegular: schedule.isRegular,
      regularSequence: schedule.regularSequence,
    }));

    const transformedRegularProposals: RegularProposal[] = regularProposals.map(proposal => ({
      id: proposal.recurringOfferId,
      applicantName: proposal.consumerName,
      period: proposal.period,
      totalSessions: proposal.totalSessions,
      dayOfWeek: proposal.dayOfWeek,
      timeSlot: proposal.timeSlot,
      address: proposal.address,
      serviceType: proposal.serviceType,
      specialRequests: proposal.specialRequests,
      status: proposal.status,
    }));

    return {
      userName: profile.caregiverName,
      todaySchedules: transformedTodaySchedules,
      tomorrowSchedules: transformedTomorrowSchedules,
      regularProposals: transformedRegularProposals,
    };
  } catch (error) {
    console.error('Home data fetch error:', error);
    throw error;
  }
};

// 오늘 스케줄만 조회
export const getTodaySchedules = async (): Promise<Schedule[]> => {
  try {
    const caregiverId = getStoredCaregiverId();
    if (!caregiverId) {
      throw new Error('caregiverId not found in localStorage');
    }

    const schedules = await getTodaySchedule(caregiverId);
    
    return schedules.map(schedule => ({
      id: schedule.serviceMatchId,
      time: `${schedule.startTime} - ${schedule.endTime}`,
      clientName: schedule.consumerName,
      address: schedule.address,
      serviceType: schedule.serviceType,
      status: schedule.status === 'SCHEDULED' ? 'scheduled' : 
              schedule.status === 'COMPLETED' ? 'completed' : 'cancelled',
      isRegular: schedule.isRegular,
      regularSequence: schedule.regularSequence,
    }));
  } catch (error) {
    console.error('Today schedules fetch error:', error);
    throw error;
  }
};

// 내일 스케줄만 조회
export const getTomorrowSchedules = async (): Promise<Schedule[]> => {
  try {
    const caregiverId = getStoredCaregiverId();
    if (!caregiverId) {
      throw new Error('caregiverId not found in localStorage');
    }

    const schedules = await getTomorrowSchedule(caregiverId);
    
    return schedules.map(schedule => ({
      id: schedule.serviceMatchId,
      time: `${schedule.startTime} - ${schedule.endTime}`,
      clientName: schedule.consumerName,
      address: schedule.address,
      serviceType: schedule.serviceType,
      status: 'scheduled', // 내일 일정은 모두 예정
      isRegular: schedule.isRegular,
      regularSequence: schedule.regularSequence,
    }));
  } catch (error) {
    console.error('Tomorrow schedules fetch error:', error);
    throw error;
  }
};

// 정기 제안만 조회
export const getRegularProposals = async (): Promise<RegularProposal[]> => {
  try {
    const caregiverId = getStoredCaregiverId();
    if (!caregiverId) {
      throw new Error('caregiverId not found in localStorage');
    }

    const proposals = await getRecurringOfferSummary(caregiverId);
    
    return proposals.map(proposal => ({
      id: proposal.recurringOfferId,
      applicantName: proposal.consumerName,
      period: proposal.period,
      totalSessions: proposal.totalSessions,
      dayOfWeek: proposal.dayOfWeek,
      timeSlot: proposal.timeSlot,
      address: proposal.address,
      serviceType: proposal.serviceType,
      specialRequests: proposal.specialRequests,
      status: proposal.status,
    }));
  } catch (error) {
    console.error('Regular proposals fetch error:', error);
    throw error;
  }
};
