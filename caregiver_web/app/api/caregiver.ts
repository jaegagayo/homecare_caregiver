import { API_CONFIG, API_ENDPOINTS } from './config';

// 요양보호사 정보 조회를 위한 API 응답 타입
export interface CaregiverProfileApi {
  caregiverName: string;
  email: string;
  birthDate: string;
  phone: string;
  address: string;
  status: string;
  serviceTypes: string[];
}

// 자격증 정보 조회를 위한 API 응답 타입
export interface CaregiverCertificationApi {
  certificationId: string;
  certificationNumber: string;
  certificationDate: string;
  trainStatus: boolean;
}

// 센터 정보 조회를 위한 API 응답 타입
export interface CaregiverCenterApi {
  caregiverCenterId: string;
  centerName: string;
  centerPhone: string;
}

// 요양보호사 프로필 조회 API 함수
export const getCaregiverProfile = async (caregiverId: string): Promise<CaregiverProfileApi> => {
  try {
    const params = new URLSearchParams({
      caregiverId: caregiverId,
    });

    const response = await fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.CAREGIVER.PROFILE}?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Caregiver profile fetch failed: ${response.status}`);
    }

    const data: CaregiverProfileApi = await response.json();
    return data;
  } catch (error) {
    console.error('Caregiver profile fetch error:', error);
    throw error;
  }
};

// 요양보호사 소속 센터 목록 조회 API 함수
export const getMyCenters = async (caregiverId: string): Promise<CaregiverCenterApi[]> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.CAREGIVER.CENTERS}?caregiverId=${caregiverId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Centers fetch failed: ${response.status}`);
    }

    const data: CaregiverCenterApi[] = await response.json();
    return data;
  } catch (error) {
    console.error('Centers fetch error:', error);
    throw error;
  }
};

// 요양보호사 센터 선택 API 함수
export const chooseCenter = async (request: {
  caregiverCenterId: string;
  serviceMatchId: string;
  distanceLog: string;
}): Promise<void> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.CAREGIVER.CHOOSE_CENTER}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Choose center failed: ${response.status}`);
    }
  } catch (error) {
    console.error('Choose center error:', error);
    throw error;
  }
}; 