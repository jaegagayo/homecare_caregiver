// API 설정 관리
export const API_CONFIG = {
  BASE_URL: 'http://localhost:8080/api', // 백엔드 서버 URL
  TIMEOUT: 10000, // 요청 타임아웃 (10초)
  RETRY_ATTEMPTS: 3, // 재시도 횟수
} as const;

// API 엔드포인트 정의 - 요양보호사용
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/caregiver/login',
    SIGNUP: '/caregiver/register',
    VERIFIED_STATUS: '/caregiver/verified',
  },
  CAREGIVER: {
    PROFILE: '/caregiver/profile',
    CENTERS: '/caregiver/center',
    CHOOSE_CENTER: '/caregiver/center',
  },
  SCHEDULE: {
    WEEKLY: '/caregiver/schedule',
    DETAIL: '/caregiver/schedule/{id}',
    TODAY: '/caregiver/home/today-schedule',
    TOMORROW: '/caregiver/home/next-schedule',
  },
  REVIEW: {
    LIST: '/caregiver/review',
    DETAIL: '/caregiver/review/{reviewId}',
  },
  RECURRING_OFFER: {
    SUMMARY: '/recurringOffer/caregiver',
    APPROVE: '/recurringOffer/caregiver/approve',
    REJECT: '/recurringOffer/caregiver/reject',
  },
  WORK_CONDITIONS: {
    GET: '/caregiver/preference',
    CREATE: '/caregiver/preference',
  },
} as const; 