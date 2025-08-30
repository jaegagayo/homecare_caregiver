// 알림 설정 응답 타입
export interface NotificationSettingsResponse {
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  marketingNotifications: boolean;
  scheduleReminders: boolean;
  reviewReminders: boolean;
  paymentNotifications: boolean;
}

// 개인정보 설정 응답 타입
export interface PrivacySettingsResponse {
  profileVisibility: 'public' | 'private' | 'contacts_only';
  locationSharing: boolean;
  dataUsage: boolean;
  thirdPartySharing: boolean;
  accountDeletion: {
    requested: boolean;
    scheduledDate?: string;
  };
}

// 계정 설정 응답 타입
export interface AccountSettingsResponse {
  email: string;
  phone: string;
  language: string;
  timezone: string;
  currency: string;
  twoFactorAuth: boolean;
  lastLogin: string;
  accountCreated: string;
}
