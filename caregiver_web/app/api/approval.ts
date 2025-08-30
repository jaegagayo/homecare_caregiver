import { API_CONFIG, API_ENDPOINTS } from './config';

// 승인 상태 응답 타입
export interface ApprovalStatusResponse {
  caregiverId: string;
  verifiedStatus: 'PENDING' | 'APPROVED' | 'REJECTED';
  submittedAt: string;
  reviewedAt?: string;
  rejectionReason?: string;
}

// 승인 상태 조회
export const getApprovalStatus = async (caregiverId: string): Promise<ApprovalStatusResponse> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.AUTH.VERIFIED_STATUS}?caregiverId=${caregiverId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Approval status fetch failed: ${response.status}`);
    }

    const data: ApprovalStatusResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Approval status fetch error:', error);
    throw error;
  }
};

// 승인 상태 폴링 (실시간 업데이트용)
export const pollApprovalStatus = async (
  caregiverId: string,
  onStatusChange: (status: ApprovalStatusResponse) => void,
  interval: number = 5000 // 5초마다 체크
): Promise<() => void> => {
  let isPolling = true;
  let lastStatus: string | null = null;

  const poll = async () => {
    if (!isPolling) return;

    try {
      const status = await getApprovalStatus(caregiverId);
      
      // 상태가 변경된 경우에만 콜백 호출
      if (lastStatus !== status.verifiedStatus) {
        lastStatus = status.verifiedStatus;
        onStatusChange(status);
      }
    } catch (error) {
      console.error('Polling error:', error);
    }

    if (isPolling) {
      setTimeout(poll, interval);
    }
  };

  poll();

  // 폴링 중지 함수 반환
  return () => {
    isPolling = false;
  };
};

