import { API_CONFIG, API_ENDPOINTS } from './config';

// 프로필 수정 요청 타입
export interface ProfileUpdateRequest {
  address?: string;
  career?: number;
  koreanProficiency?: 'BASIC' | 'INTERMEDIATE' | 'ADVANCED' | 'NATIVE';
  isAccompanyOuting?: boolean;
  selfIntroduction?: string;
}

// 프로필 상세 응답 타입
export interface ProfileDetailResponse {
  caregiverId: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  career: number;
  koreanProficiency: 'BASIC' | 'INTERMEDIATE' | 'ADVANCED' | 'NATIVE';
  isAccompanyOuting: boolean;
  selfIntroduction: string;
  verifiedStatus: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
  updatedAt: string;
}

// 자격증 정보 응답 타입
export interface CertificationResponse {
  certificationId: string;
  certificationNumber: string;
  certificationDate: string;
  trainStatus: boolean;
}

// 자격증 수정 요청 타입
export interface CertificationUpdateRequest {
  certificationNumber: string;
  certificationDate: string;
}

// 프로필 상세 조회
export const getProfileDetail = async (caregiverId: string): Promise<ProfileDetailResponse> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.CAREGIVER.PROFILE}?caregiverId=${caregiverId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Profile detail fetch failed: ${response.status}`);
    }

    const data: ProfileDetailResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Profile detail fetch error:', error);
    throw error;
  }
};

// 프로필 수정
export const updateProfile = async (
  caregiverId: string,
  updateData: ProfileUpdateRequest
): Promise<void> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/caregiver/profile/${caregiverId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      throw new Error(`Profile update failed: ${response.status}`);
    }
  } catch (error) {
    console.error('Profile update error:', error);
    throw error;
  }
};

// 자격증 정보 조회
export const getCertification = async (caregiverId: string): Promise<CertificationResponse> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/caregiver/certification/${caregiverId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Certification fetch failed: ${response.status}`);
    }

    const data: CertificationResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Certification fetch error:', error);
    throw error;
  }
};

// 자격증 정보 수정
export const updateCertification = async (
  caregiverId: string,
  updateData: CertificationUpdateRequest
): Promise<void> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/caregiver/certification/${caregiverId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      throw new Error(`Certification update failed: ${response.status}`);
    }
  } catch (error) {
    console.error('Certification update error:', error);
    throw error;
  }
};

// 프로필 이미지 업로드
export const uploadProfileImage = async (
  caregiverId: string,
  file: File
): Promise<{ imageUrl: string }> => {
  try {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`${API_CONFIG.BASE_URL}/caregiver/profile/${caregiverId}/image`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Profile image upload failed: ${response.status}`);
    }

    const data: { imageUrl: string } = await response.json();
    return data;
  } catch (error) {
    console.error('Profile image upload error:', error);
    throw error;
  }
};

