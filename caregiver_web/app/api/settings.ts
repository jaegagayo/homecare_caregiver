import { API_CONFIG, API_ENDPOINTS } from './config';

// 알림 설정 응답 타입
export interface NotificationSettingsResponse {
  pushNotification: boolean;
  emailNotification: boolean;
  smsNotification: boolean;
  scheduleReminder: boolean;
  reminderTime: number; // 분 단위 (예: 30분 전)
  marketingNotification: boolean;
}

// 개인정보 설정 응답 타입
export interface PrivacySettingsResponse {
  profileVisibility: 'PUBLIC' | 'PRIVATE' | 'CENTER_ONLY';
  locationSharing: boolean;
  contactInfoSharing: boolean;
  dataUsageConsent: boolean;
}

// 계정 설정 응답 타입
export interface AccountSettingsResponse {
  email: string;
  phone: string;
  language: 'KO' | 'EN' | 'ZH';
  timezone: string;
  autoLogout: boolean;
  autoLogoutTime: number; // 분 단위
}

// 알림 설정 조회
export const getNotificationSettings = async (
  caregiverId: string
): Promise<NotificationSettingsResponse> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/settings/notification/${caregiverId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Notification settings fetch failed: ${response.status}`);
    }

    const data: NotificationSettingsResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Notification settings fetch error:', error);
    throw error;
  }
};

// 알림 설정 업데이트
export const updateNotificationSettings = async (
  caregiverId: string,
  settings: NotificationSettingsResponse
): Promise<void> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/settings/notification/${caregiverId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(settings),
    });

    if (!response.ok) {
      throw new Error(`Notification settings update failed: ${response.status}`);
    }
  } catch (error) {
    console.error('Notification settings update error:', error);
    throw error;
  }
};

// 개인정보 설정 조회
export const getPrivacySettings = async (
  caregiverId: string
): Promise<PrivacySettingsResponse> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/settings/privacy/${caregiverId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Privacy settings fetch failed: ${response.status}`);
    }

    const data: PrivacySettingsResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Privacy settings fetch error:', error);
    throw error;
  }
};

// 개인정보 설정 업데이트
export const updatePrivacySettings = async (
  caregiverId: string,
  settings: PrivacySettingsResponse
): Promise<void> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/settings/privacy/${caregiverId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(settings),
    });

    if (!response.ok) {
      throw new Error(`Privacy settings update failed: ${response.status}`);
    }
  } catch (error) {
    console.error('Privacy settings update error:', error);
    throw error;
  }
};

// 계정 설정 조회
export const getAccountSettings = async (
  caregiverId: string
): Promise<AccountSettingsResponse> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/settings/account/${caregiverId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Account settings fetch failed: ${response.status}`);
    }

    const data: AccountSettingsResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Account settings fetch error:', error);
    throw error;
  }
};

// 계정 설정 업데이트
export const updateAccountSettings = async (
  caregiverId: string,
  settings: Partial<AccountSettingsResponse>
): Promise<void> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/settings/account/${caregiverId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(settings),
    });

    if (!response.ok) {
      throw new Error(`Account settings update failed: ${response.status}`);
    }
  } catch (error) {
    console.error('Account settings update error:', error);
    throw error;
  }
};

// 비밀번호 변경
export const changePassword = async (
  caregiverId: string,
  currentPassword: string,
  newPassword: string
): Promise<void> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/settings/password/${caregiverId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        currentPassword,
        newPassword,
      }),
    });

    if (!response.ok) {
      throw new Error(`Password change failed: ${response.status}`);
    }
  } catch (error) {
    console.error('Password change error:', error);
    throw error;
  }
};

// 계정 삭제
export const deleteAccount = async (
  caregiverId: string,
  password: string
): Promise<void> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/settings/account/${caregiverId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password,
      }),
    });

    if (!response.ok) {
      throw new Error(`Account deletion failed: ${response.status}`);
    }
  } catch (error) {
    console.error('Account deletion error:', error);
    throw error;
  }
};
