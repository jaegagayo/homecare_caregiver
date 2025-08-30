import { getStoredCaregiverId } from './auth';
import { getTodaySchedule, getTomorrowSchedule } from './schedule';
import { getRecurringOfferSummary } from './recurringOffer';
import { HomeData, CaregiverScheduleResponse, RecurringOfferSummaryResponse } from '../types';

// 홈 페이지 데이터 조회 - 프로필 API 제거
export const getHomeData = async (): Promise<HomeData> => {
  try {
    const caregiverId = getStoredCaregiverId();
    if (!caregiverId) {
      throw new Error('caregiverId not found in localStorage');
    }

    // 프로필 API 제거하고 스케줄과 제안만 조회
    const results = await Promise.allSettled([
      getTodaySchedule(caregiverId),
      getTomorrowSchedule(caregiverId),
      getRecurringOfferSummary(caregiverId),
    ]);

    // 각 결과 처리
    const [todayResult, tomorrowResult, proposalsResult] = results;

    return {
      caregiverName: '케어기버', // 기본 환영 메시지
      todaySchedules: todayResult.status === 'fulfilled' ? todayResult.value : [],
      tomorrowSchedules: tomorrowResult.status === 'fulfilled' ? tomorrowResult.value : [],
      regularProposals: proposalsResult.status === 'fulfilled' ? proposalsResult.value : [],
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
