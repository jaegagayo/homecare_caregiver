// 백엔드 enum들과 일치하는 타입 정의
export enum DayOfWeek {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY'
}

export enum PreferredGender {
  ALL = 'ALL',
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

export enum ServiceType {
  VISITING_CARE = 'VISITING_CARE',      // 방문 요양
  VISITING_BATH = 'VISITING_BATH',      // 방문 목욕
  VISITING_NURSING = 'VISITING_NURSING', // 방문 간호
  DAY_NIGHT_CARE = 'DAY_NIGHT_CARE',    // 주야간 보호
  RESPITE_CARE = 'RESPITE_CARE',        // 단기 보호
  IN_HOME_SUPPORT = 'IN_HOME_SUPPORT'   // 재가 요양 지원
}

export enum Disease {
  DEMENTIA = 'DEMENTIA', // 치매
  BEDRIDDEN = 'BEDRIDDEN' // 와상
}

export enum AddressType {
  ROAD = 'ROAD',   // 도로명
  JIBUN = 'JIBUN'  // 지번
}

// Location 타입 (백엔드의 Location 엔티티와 일치)
export interface Location {
  latitude: number;  // Double in backend
  longitude: number; // Double in backend
}

// 백엔드 CaregiverPreference와 완전히 일치하는 인터페이스
export interface WorkConditions {
  // 기본 정보
  caregiverPreferenceId?: string; // UUID
  
  // 근무 가능 요일 (백엔드: Set<DayOfWeek>)
  dayOfWeek: DayOfWeek[];
  
  // 근무 시간 (백엔드: LocalTime)
  workStartTime: string; // "HH:mm:ss" 형식
  workEndTime: string;   // "HH:mm:ss" 형식
  
  // 근무 시간 (분 단위, 백엔드: Integer)
  workMinTime: number;   // 최소 근무 시간 (분)
  workMaxTime: number;   // 최대 근무 시간 (분)
  
  // 이동 가능 시간 (분 단위, 백엔드: Integer)
  availableTime: number;
  
  // 근무 지역
  workArea: string;      // 백엔드: String
  addressType: AddressType; // 백엔드: AddressType enum
  location: Location;    // 백엔드: Location embeddable
  
  // 이동수단 (백엔드: String)
  transportation: string;
  
  // 점심시간 (분 단위, 백엔드: Integer)
  lunchBreak: number;
  
  // 버퍼 시간 (분 단위, 백엔드: Integer)
  bufferTime: number;
  
  // 지원 가능 질환 (백엔드: Set<Disease>)
  supportedConditions: Disease[];
  
  // 선호 연령 (백엔드: Integer)
  preferredMinAge: number;
  preferredMaxAge: number;
  
  // 선호 성별 (백엔드: PreferredGender enum)
  preferredGender: PreferredGender;
  
  // 서비스 유형 (백엔드: Set<ServiceType>)
  serviceTypes: ServiceType[];
}
