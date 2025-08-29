import { API_CONFIG, API_ENDPOINTS } from './config';

// 수익 내역 응답 타입
export interface EarningsResponse {
  settlementId: string;
  serviceDate: string;
  consumerName: string;
  serviceType: string;
  duration: number; // 시간 단위
  hourlyRate: number;
  totalAmount: number;
  status: 'completed' | 'pending' | 'cancelled';
  centerName: string;
}

// 수익 요약 응답 타입
export interface EarningsSummaryResponse {
  total: number;
  thisWeek: number;
  thisMonth: number;
  lastMonth: number;
  averagePerDay: number;
  totalHours: number;
}

// 수익 내역 조회
export const getEarnings = async (
  caregiverId: string,
  year?: number,
  month?: number,
  status?: string
): Promise<EarningsResponse[]> => {
  try {
    const params = new URLSearchParams({
      caregiverId,
    });

    if (year) params.append('year', year.toString());
    if (month) params.append('month', month.toString());
    if (status && status !== 'all') params.append('status', status);

    const response = await fetch(`${API_CONFIG.BASE_URL}/settlement/caregiver/${caregiverId}?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Earnings fetch failed: ${response.status}`);
    }

    const data: EarningsResponse[] = await response.json();
    return data;
  } catch (error) {
    console.error('Earnings fetch error:', error);
    throw error;
  }
};

// 수익 요약 조회
export const getEarningsSummary = async (caregiverId: string): Promise<EarningsSummaryResponse> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/settlement/caregiver/${caregiverId}/summary`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Earnings summary fetch failed: ${response.status}`);
    }

    const data: EarningsSummaryResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Earnings summary fetch error:', error);
    throw error;
  }
};

// 특정 기간 수익 조회
export const getEarningsByPeriod = async (
  caregiverId: string,
  startDate: string,
  endDate: string
): Promise<EarningsResponse[]> => {
  try {
    const params = new URLSearchParams({
      caregiverId,
      startDate,
      endDate,
    });

    const response = await fetch(`${API_CONFIG.BASE_URL}/settlement/caregiver/${caregiverId}/period?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Earnings by period fetch failed: ${response.status}`);
    }

    const data: EarningsResponse[] = await response.json();
    return data;
  } catch (error) {
    console.error('Earnings by period fetch error:', error);
    throw error;
  }
};
