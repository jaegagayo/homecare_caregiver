import { API_CONFIG, API_ENDPOINTS } from './config';

// 센터 등록 요청 타입
export interface CenterRegistrationRequest {
  centerName: string;
  centerPhone: string;
  centerAddress: string;
  businessNumber: string;
  representativeName: string;
  representativePhone: string;
}

// 센터 등록 응답 타입
export interface CenterRegistrationResponse {
  centerId: string;
  centerName: string;
  registrationStatus: 'PENDING' | 'APPROVED' | 'REJECTED';
  submittedAt: string;
}

// 센터 검색 응답 타입
export interface CenterSearchResponse {
  centerId: string;
  centerName: string;
  centerPhone: string;
  centerAddress: string;
  distance: number; // km 단위
  isRegistered: boolean;
}

// 센터 등록
export const registerCenter = async (
  caregiverId: string,
  centerData: CenterRegistrationRequest
): Promise<CenterRegistrationResponse> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/center/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        caregiverId,
        ...centerData,
      }),
    });

    if (!response.ok) {
      throw new Error(`Center registration failed: ${response.status}`);
    }

    const data: CenterRegistrationResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Center registration error:', error);
    throw error;
  }
};

// 센터 검색
export const searchCenters = async (
  keyword: string,
  latitude?: number,
  longitude?: number
): Promise<CenterSearchResponse[]> => {
  try {
    const params = new URLSearchParams({
      keyword,
    });

    if (latitude && longitude) {
      params.append('latitude', latitude.toString());
      params.append('longitude', longitude.toString());
    }

    const response = await fetch(`${API_CONFIG.BASE_URL}/center/search?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Center search failed: ${response.status}`);
    }

    const data: CenterSearchResponse[] = await response.json();
    return data;
  } catch (error) {
    console.error('Center search error:', error);
    throw error;
  }
};

// 센터 등록 상태 조회
export const getCenterRegistrationStatus = async (
  caregiverId: string
): Promise<CenterRegistrationResponse[]> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/center/registration/${caregiverId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Center registration status fetch failed: ${response.status}`);
    }

    const data: CenterRegistrationResponse[] = await response.json();
    return data;
  } catch (error) {
    console.error('Center registration status fetch error:', error);
    throw error;
  }
};

// 근무 조건 설정
export interface WorkConditionsRequest {
  availableStartTime: string; // "09:00"
  availableEndTime: string; // "18:00"
  serviceTypes: string[];
  dayOfWeek: string[]; // ["MONDAY", "TUESDAY", ...]
  hourlyRate: number;
  maxDistance: number; // km 단위
  specialRequests?: string;
}

// 근무 조건 등록
export const registerWorkConditions = async (
  caregiverId: string,
  workConditions: WorkConditionsRequest
): Promise<void> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/caregiver/work-conditions/${caregiverId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(workConditions),
    });

    if (!response.ok) {
      throw new Error(`Work conditions registration failed: ${response.status}`);
    }
  } catch (error) {
    console.error('Work conditions registration error:', error);
    throw error;
  }
};

// 근무 조건 조회
export const getWorkConditions = async (
  caregiverId: string
): Promise<WorkConditionsRequest> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/caregiver/work-conditions/${caregiverId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Work conditions fetch failed: ${response.status}`);
    }

    const data: WorkConditionsRequest = await response.json();
    return data;
  } catch (error) {
    console.error('Work conditions fetch error:', error);
    throw error;
  }
};

