import { getStoredCaregiverId } from './auth';
import { getCaregiverProfile } from './caregiver';
import { getTodaySchedule, getTomorrowSchedule } from './schedule';
import { getRecurringOfferSummary } from './recurringOffer';
import { HomeData, CaregiverScheduleResponse, RecurringOfferSummaryResponse } from '../types';

// 홈 페이지 데이터 조회 - 백엔드 API 응답을 그대로 사용
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

    return {
      caregiverName: profile.caregiverName,
      todaySchedules: todaySchedules,
      tomorrowSchedules: tomorrowSchedules,
      regularProposals: regularProposals,
    };
  } catch (error) {
    console.error('Home data fetch error:', error);
    throw error;
  }
};

// 오늘 스케줄만 조회 - 백엔드 API 응답을 그대로 사용
export const getTodaySchedules = async (): Promise<CaregiverScheduleResponse[]> => {
  try {
    const caregiverId = getStoredCaregiverId();
    if (!caregiverId) {
      throw new Error('caregiverId not found in localStorage');
    }

    return await getTodaySchedule(caregiverId);
  } catch (error) {
    console.error('Today schedules fetch error:', error);
    throw error;
  }
};

// 내일 스케줄만 조회 - 백엔드 API 응답을 그대로 사용
export const getTomorrowSchedules = async (): Promise<CaregiverScheduleResponse[]> => {
  try {
    const caregiverId = getStoredCaregiverId();
    if (!caregiverId) {
      throw new Error('caregiverId not found in localStorage');
    }

    return await getTomorrowSchedule(caregiverId);
  } catch (error) {
    console.error('Tomorrow schedules fetch error:', error);
    throw error;
  }
};

// 정기 제안만 조회 - 백엔드 API 응답을 그대로 사용
export const getRegularProposals = async (): Promise<RecurringOfferSummaryResponse[]> => {
  try {
    const caregiverId = getStoredCaregiverId();
    if (!caregiverId) {
      throw new Error('caregiverId not found in localStorage');
    }

    return await getRecurringOfferSummary(caregiverId);
  } catch (error) {
    console.error('Regular proposals fetch error:', error);
    throw error;
  }
};
