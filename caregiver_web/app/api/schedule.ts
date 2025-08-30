import { API_CONFIG, API_ENDPOINTS } from './config';
import { CaregiverScheduleResponse, CaregiverScheduleDetailResponse } from '../types';

// 주간 스케줄 조회
export const getWeeklySchedule = async (caregiverId: string): Promise<CaregiverScheduleResponse[]> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.SCHEDULE.WEEKLY}?caregiverId=${caregiverId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Weekly schedule fetch failed: ${response.status}`);
    }

    const data: CaregiverScheduleResponse[] = await response.json();
    return data;
  } catch (error) {
    console.error('Weekly schedule fetch error:', error);
    throw error;
  }
};

// 오늘 스케줄 조회
export const getTodaySchedule = async (caregiverId: string): Promise<CaregiverScheduleResponse[]> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.SCHEDULE.TODAY}?caregiverId=${caregiverId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Today schedule fetch failed: ${response.status}`);
    }

    const data: CaregiverScheduleResponse[] = await response.json();
    return data;
  } catch (error) {
    console.error('Today schedule fetch error:', error);
    throw error;
  }
};

// 내일 스케줄 조회
export const getTomorrowSchedule = async (caregiverId: string): Promise<CaregiverScheduleResponse[]> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.SCHEDULE.TOMORROW}?caregiverId=${caregiverId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Tomorrow schedule fetch failed: ${response.status}`);
    }

    const data: CaregiverScheduleResponse[] = await response.json();
    return data;
  } catch (error) {
    console.error('Tomorrow schedule fetch error:', error);
    throw error;
  }
};

// 스케줄 상세 조회
export const getScheduleDetail = async (scheduleId: string): Promise<CaregiverScheduleDetailResponse> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.SCHEDULE.DETAIL.replace('{id}', scheduleId)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Schedule detail fetch failed: ${response.status}`);
    }

    const data: CaregiverScheduleDetailResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Schedule detail fetch error:', error);
    throw error;
  }
}; 