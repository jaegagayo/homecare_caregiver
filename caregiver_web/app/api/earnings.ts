import { API_CONFIG, API_ENDPOINTS } from './config';
import {
  CaregiverCenterSettlementResponse
} from '../types';

// 요양보호사 정산 내역 조회
export const getSettlementHistory = async (
  caregiverId: string
): Promise<CaregiverCenterSettlementResponse[]> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.SETTLEMENT.HISTORY}?caregiverId=${caregiverId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Settlement history fetch failed: ${response.status}`);
    }

    const data: CaregiverCenterSettlementResponse[] = await response.json();
    return data;
  } catch (error) {
    console.error('Settlement history fetch error:', error);
    throw error;
  }
};

