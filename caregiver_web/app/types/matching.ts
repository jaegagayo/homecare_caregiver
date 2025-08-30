// 매칭 제안 응답 타입
export interface MatchingProposalResponse {
  proposalId: string;
  consumerName: string;
  serviceDate: string;
  serviceStartTime: string;
  serviceEndTime: string;
  serviceType: string;
  serviceAddress: string;
  hourlyRate: number;
  specialRequests?: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

// 매칭 상태 응답 타입
export interface MatchingStatusResponse {
  totalProposals: number;
  pendingProposals: number;
  acceptedProposals: number;
  rejectedProposals: number;
  lastUpdated: string;
}

// 매칭 알림 설정 타입
export interface MatchingNotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  notificationFrequency: 'immediate' | 'hourly' | 'daily';
  quietHours: {
    enabled: boolean;
    startTime: string;
    endTime: string;
  };
}
