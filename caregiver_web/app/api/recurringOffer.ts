import { API_CONFIG, API_ENDPOINTS } from './config';
import { RecurringOfferSummaryResponse } from '../types';

// 정기 제안 알림 조회
export const getRecurringOfferSummary = async (caregiverId: string): Promise<RecurringOfferSummaryResponse[]> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.RECURRING_OFFER.SUMMARY}?caregiverId=${caregiverId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Recurring offer summary fetch failed: ${response.status}`);
    }

    const data: RecurringOfferSummaryResponse[] = await response.json();
    return data;
  } catch (error) {
    console.error('Recurring offer summary fetch error:', error);
    throw error;
  }
};

// 정기 제안 승인
export const approveRecurringOffer = async (recurringStatusId: string): Promise<void> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.RECURRING_OFFER.APPROVE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recurringStatusId),
    });

    if (!response.ok) {
      throw new Error(`Approve recurring offer failed: ${response.status}`);
    }
  } catch (error) {
    console.error('Approve recurring offer error:', error);
    throw error;
  }
};

// 정기 제안 거절
export const rejectRecurringOffer = async (recurringStatusId: string): Promise<void> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.RECURRING_OFFER.REJECT}?recurringStatusId=${recurringStatusId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Reject recurring offer failed: ${response.status}`);
    }
  } catch (error) {
    console.error('Reject recurring offer error:', error);
    throw error;
  }
};
