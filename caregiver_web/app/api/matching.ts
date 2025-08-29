import { API_CONFIG, API_ENDPOINTS } from './config';

// 매칭 제안 응답 타입
export interface MatchingProposalResponse {
  serviceRequestId: string;
  consumerName: string;
  consumerPhone: string;
  serviceDate: string;
  startTime: string;
  endTime: string;
  serviceType: string;
  address: string;
  careGrade: string;
  specialRequests?: string;
  hourlyRate: number;
  distance: number; // km 단위
  proposedAt: string;
  expiresAt: string;
}

// 매칭 상태 응답 타입
export interface MatchingStatusResponse {
  serviceRequestId: string;
  status: 'PROPOSED' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED';
  consumerName: string;
  serviceDate: string;
  startTime: string;
  endTime: string;
  serviceType: string;
  address: string;
  hourlyRate: number;
}

// 매칭 제안 목록 조회
export const getMatchingProposals = async (
  caregiverId: string,
  status?: 'PROPOSED' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED'
): Promise<MatchingProposalResponse[]> => {
  try {
    const params = new URLSearchParams({
      caregiverId,
    });

    if (status) {
      params.append('status', status);
    }

    const response = await fetch(`${API_CONFIG.BASE_URL}/matching/proposals?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Matching proposals fetch failed: ${response.status}`);
    }

    const data: MatchingProposalResponse[] = await response.json();
    return data;
  } catch (error) {
    console.error('Matching proposals fetch error:', error);
    throw error;
  }
};

// 매칭 제안 수락
export const acceptMatchingProposal = async (
  serviceRequestId: string,
  caregiverId: string
): Promise<void> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/matching/accept`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        serviceRequestId,
        caregiverId,
      }),
    });

    if (!response.ok) {
      throw new Error(`Accept matching proposal failed: ${response.status}`);
    }
  } catch (error) {
    console.error('Accept matching proposal error:', error);
    throw error;
  }
};

// 매칭 제안 거절
export const rejectMatchingProposal = async (
  serviceRequestId: string,
  caregiverId: string,
  reason?: string
): Promise<void> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/matching/reject`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        serviceRequestId,
        caregiverId,
        reason,
      }),
    });

    if (!response.ok) {
      throw new Error(`Reject matching proposal failed: ${response.status}`);
    }
  } catch (error) {
    console.error('Reject matching proposal error:', error);
    throw error;
  }
};

// 매칭 상태 조회
export const getMatchingStatus = async (
  serviceRequestId: string
): Promise<MatchingStatusResponse> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/matching/status/${serviceRequestId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Matching status fetch failed: ${response.status}`);
    }

    const data: MatchingStatusResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Matching status fetch error:', error);
    throw error;
  }
};

// 매칭 알림 설정
export interface MatchingNotificationSettings {
  enabled: boolean;
  pushNotification: boolean;
  emailNotification: boolean;
  smsNotification: boolean;
  notificationRadius: number; // km 단위
  minHourlyRate: number;
  preferredServiceTypes: string[];
}

// 매칭 알림 설정 조회
export const getMatchingNotificationSettings = async (
  caregiverId: string
): Promise<MatchingNotificationSettings> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/matching/notification-settings/${caregiverId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Matching notification settings fetch failed: ${response.status}`);
    }

    const data: MatchingNotificationSettings = await response.json();
    return data;
  } catch (error) {
    console.error('Matching notification settings fetch error:', error);
    throw error;
  }
};

// 매칭 알림 설정 업데이트
export const updateMatchingNotificationSettings = async (
  caregiverId: string,
  settings: MatchingNotificationSettings
): Promise<void> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/matching/notification-settings/${caregiverId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(settings),
    });

    if (!response.ok) {
      throw new Error(`Matching notification settings update failed: ${response.status}`);
    }
  } catch (error) {
    console.error('Matching notification settings update error:', error);
    throw error;
  }
};
