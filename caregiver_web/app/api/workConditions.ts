import { API_CONFIG, API_ENDPOINTS } from './config';
import { WorkConditions, MatchingServerWorkConditions, convertMatchingServerToWorkConditions } from '../types/workConditions';

// 근무 조건 조회 API
export const getWorkConditions = async (caregiverId: string): Promise<WorkConditions | null> => {
  try {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_ENDPOINTS.WORK_CONDITIONS.GET}?caregiverId=${caregiverId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 404) {
      // 근무 조건이 없는 경우
      return null;
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // 백엔드 응답을 프론트엔드 타입으로 변환
    return {
      caregiverPreferenceId: data.caregiverPreferenceId,
      dayOfWeek: Array.from(data.dayOfWeek),
      workStartTime: data.workStartTime,
      workEndTime: data.workEndTime,
      workMinTime: data.workMinTime,
      workMaxTime: data.workMaxTime,
      availableTime: data.availableTime,
      workArea: data.workArea,
      addressType: data.addressType,
      location: data.location,
      transportation: data.transportation,
      lunchBreak: data.lunchBreak,
      bufferTime: data.bufferTime,
      supportedConditions: Array.from(data.supportedConditions),
      preferredMinAge: data.preferredMinAge,
      preferredMaxAge: data.preferredMaxAge,
      preferredGender: data.preferredGender,
      serviceTypes: Array.from(data.serviceTypes),
    };
  } catch (error) {
    console.error('근무 조건 조회 실패:', error);
    throw error;
  }
};

// 자연어 분석 API (매칭 서버 사용)
export const analyzeNaturalLanguage = async (naturalInput: string): Promise<WorkConditions> => {
  try {
    const response = await fetch(
      `${API_CONFIG.MATCHING_SERVER_URL}/converting/convert`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          non_structured_data: naturalInput.trim(),
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`자연어 분석 실패: ${response.status}`);
    }

    const data: MatchingServerWorkConditions = await response.json();
    
    // 매칭 서버 응답을 프론트엔드 타입으로 변환
    return convertMatchingServerToWorkConditions(data);
  } catch (error) {
    console.error('자연어 분석 실패:', error);
    throw error;
  }
};

// 근무 조건 생성 API (회원가입 시 사용)
export const createWorkConditions = async (caregiverId: string, workConditions: WorkConditions): Promise<void> => {
  try {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_ENDPOINTS.WORK_CONDITIONS.CREATE}?caregiverId=${caregiverId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dayOfWeek: workConditions.dayOfWeek,
          workStartTime: workConditions.workStartTime,
          workEndTime: workConditions.workEndTime,
          workMinTime: workConditions.workMinTime,
          workMaxTime: workConditions.workMaxTime,
          availableTime: workConditions.availableTime,
          workArea: workConditions.workArea,
          addressType: workConditions.addressType,
          location: workConditions.location,
          transportation: workConditions.transportation,
          lunchBreak: workConditions.lunchBreak,
          bufferTime: workConditions.bufferTime,
          supportedConditions: workConditions.supportedConditions,
          preferredMinAge: workConditions.preferredMinAge,
          preferredMaxAge: workConditions.preferredMaxAge,
          preferredGender: workConditions.preferredGender,
          serviceTypes: workConditions.serviceTypes,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('근무 조건 생성 실패:', error);
    throw error;
  }
};

// 근무 조건 수정 API (마이페이지에서 사용)
export const updateWorkConditions = async (caregiverId: string, workConditions: WorkConditions): Promise<void> => {
  try {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_ENDPOINTS.WORK_CONDITIONS.UPDATE}?caregiverId=${caregiverId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          caregiverPreferenceId: workConditions.caregiverPreferenceId,
          dayOfWeek: workConditions.dayOfWeek,
          workStartTime: workConditions.workStartTime,
          workEndTime: workConditions.workEndTime,
          workMinTime: workConditions.workMinTime,
          workMaxTime: workConditions.workMaxTime,
          availableTime: workConditions.availableTime,
          workArea: workConditions.workArea,
          addressType: workConditions.addressType,
          location: workConditions.location,
          transportation: workConditions.transportation,
          lunchBreak: workConditions.lunchBreak,
          bufferTime: workConditions.bufferTime,
          supportedConditions: workConditions.supportedConditions,
          preferredMinAge: workConditions.preferredMinAge,
          preferredMaxAge: workConditions.preferredMaxAge,
          preferredGender: workConditions.preferredGender,
          serviceTypes: workConditions.serviceTypes,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('근무 조건 수정 실패:', error);
    throw error;
  }
};

// 근무 조건 생성/수정 API (기존 호환성을 위한 함수)
export const saveWorkConditions = async (
  caregiverId: string, 
  workConditions: WorkConditions, 
  isUpdate: boolean = false
): Promise<void> => {
  if (isUpdate) {
    return updateWorkConditions(caregiverId, workConditions);
  } else {
    return createWorkConditions(caregiverId, workConditions);
  }
};
