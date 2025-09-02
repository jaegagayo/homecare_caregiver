import { DayOfWeek, PreferredGender, ServiceType, Disease, AddressType } from '../types/workConditions';

/**
 * 요양보호사 스케줄 매치 상태를 한글로 변환
 * @param status - 백엔드 매치 상태
 * @returns 한글 매치 상태
 */
export const getMatchStatusKorean = (status: string): string => {
  switch (status) {
    case 'PENDING': return '대기중';
    case 'CONFIRMED': return '예정';
    case 'COMPLETED': return '완료';
    case 'CANCELLED': return '취소';
    default: return status;
  }
};

/**
 * 요양보호사 스케줄 매치 상태에 따른 색상 반환
 * @param status - 백엔드 매치 상태
 * @returns 색상 문자열
 */
export const getMatchStatusColor = (status: string): string => {
  switch (status) {
    case 'PENDING': return 'yellow';
    case 'CONFIRMED': return 'blue';
    case 'COMPLETED': return 'green';
    case 'CANCELLED': return 'red';
    default: return 'gray';
  }
};

/**
 * 요양보호사 스케줄 요청 상태를 한글로 변환
 * @param status - 백엔드 요청 상태
 * @returns 한글 요청 상태
 */
export const getRequestStatusKorean = (status: string): string => {
  switch (status) {
    case 'PENDING': return '대기중';
    case 'APPROVED': return '승인됨';
    case 'REJECTED': return '거절됨';
    case 'RECURRING': return '정기';
    case 'COMPLETED': return '완료';
    default: return status;
  }
};

/**
 * 요양보호사 스케줄 요청 상태에 따른 색상 반환
 * @param status - 백엔드 요청 상태
 * @returns 색상 문자열
 */
export const getRequestStatusColor = (status: string): string => {
  switch (status) {
    case 'PENDING': return 'yellow';
    case 'APPROVED': return 'green';
    case 'REJECTED': return 'red';
    case 'RECURRING': return 'blue';
    case 'COMPLETED': return 'green';
    default: return 'gray';
  }
};

/**
 * 근무 요일을 한글로 변환
 * @param dayOfWeek - 백엔드 요일
 * @returns 한글 요일
 */
export const getDayOfWeekKorean = (dayOfWeek: DayOfWeek): string => {
  switch (dayOfWeek) {
    case DayOfWeek.MONDAY: return '월';
    case DayOfWeek.TUESDAY: return '화';
    case DayOfWeek.WEDNESDAY: return '수';
    case DayOfWeek.THURSDAY: return '목';
    case DayOfWeek.FRIDAY: return '금';
    case DayOfWeek.SATURDAY: return '토';
    case DayOfWeek.SUNDAY: return '일';
    default: return dayOfWeek;
  }
};

/**
 * 근무 요일을 긴 한글로 변환
 * @param dayOfWeek - 백엔드 요일
 * @returns 긴 한글 요일
 */
export const getDayOfWeekKoreanLong = (dayOfWeek: DayOfWeek): string => {
  switch (dayOfWeek) {
    case DayOfWeek.MONDAY: return '월요일';
    case DayOfWeek.TUESDAY: return '화요일';
    case DayOfWeek.WEDNESDAY: return '수요일';
    case DayOfWeek.THURSDAY: return '목요일';
    case DayOfWeek.FRIDAY: return '금요일';
    case DayOfWeek.SATURDAY: return '토요일';
    case DayOfWeek.SUNDAY: return '일요일';
    default: return dayOfWeek;
  }
};

/**
 * 선호 성별을 한글로 변환
 * @param gender - 백엔드 선호 성별
 * @returns 한글 선호 성별
 */
export const getPreferredGenderKorean = (gender: PreferredGender): string => {
  switch (gender) {
    case PreferredGender.ALL: return '상관없음';
    case PreferredGender.MALE: return '남성';
    case PreferredGender.FEMALE: return '여성';
    default: return gender;
  }
};

/**
 * 서비스 유형을 한글로 변환
 * @param serviceType - 백엔드 서비스 유형
 * @returns 한글 서비스 유형
 */
export const getServiceTypeKorean = (serviceType: ServiceType): string => {
  switch (serviceType) {
    case ServiceType.VISITING_CARE: return '방문요양';
    case ServiceType.VISITING_BATH: return '방문목욕';
    case ServiceType.VISITING_NURSING: return '방문간호';
    case ServiceType.DAY_NIGHT_CARE: return '주야간보호';
    case ServiceType.RESPITE_CARE: return '단기보호';
    case ServiceType.IN_HOME_SUPPORT: return '재가지원';
    default: return serviceType;
  }
};

/**
 * 지원 가능 질환을 한글로 변환
 * @param disease - 백엔드 질환
 * @returns 한글 질환
 */
export const getDiseaseKorean = (disease: Disease): string => {
  switch (disease) {
    case Disease.DEMENTIA: return '치매';
    case Disease.BEDRIDDEN: return '와상';
    default: return disease;
  }
};

/**
 * 주소 유형을 한글로 변환
 * @param addressType - 백엔드 주소 유형
 * @returns 한글 주소 유형
 */
export const getAddressTypeKorean = (addressType: AddressType): string => {
  switch (addressType) {
    case AddressType.ROAD: return '도로명';
    case AddressType.JIBUN: return '지번';
    default: return addressType;
  }
};

/**
 * 정기 제안 상태를 한글로 변환
 * @param status - 백엔드 정기 제안 상태
 * @returns 한글 정기 제안 상태
 */
export const getRecurringStatusKorean = (status: string): string => {
  switch (status) {
    case 'PENDING': return '승인 대기';
    case 'APPROVED': return '승인 완료';
    case 'REJECTED': return '거절';
    default: return status;
  }
};

/**
 * 정기 제안 상태에 따른 색상 반환
 * @param status - 백엔드 정기 제안 상태
 * @returns 색상 문자열
 */
export const getRecurringStatusColor = (status: string): string => {
  switch (status) {
    case 'PENDING': return 'yellow';
    case 'APPROVED': return 'green';
    case 'REJECTED': return 'red';
    default: return 'gray';
  }
};

/**
 * 근무 조건 상태를 한글로 변환
 * @param status - 백엔드 근무 조건 상태
 * @returns 한글 근무 조건 상태
 */
export const getWorkConditionStatusKorean = (status: string): string => {
  switch (status) {
    case 'ACTIVE': return '활성';
    case 'INACTIVE': return '비활성';
    case 'PENDING': return '대기중';
    default: return status;
  }
};

/**
 * 근무 조건 상태에 따른 색상 반환
 * @param status - 백엔드 근무 조건 상태
 * @returns 색상 문자열
 */
export const getWorkConditionStatusColor = (status: string): string => {
  switch (status) {
    case 'ACTIVE': return 'green';
    case 'INACTIVE': return 'gray';
    case 'PENDING': return 'yellow';
    default: return 'gray';
  }
};
