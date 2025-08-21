export interface ScheduleDetail {
  id: string;
  date: string;
  time: string;
  applicantName: string;
  status: 'pending_approval' | 'institution_not_selected' | 'scheduled' | 'completed';
  isRegular: boolean;
  regularSequence?: { current: number; total: number };
  
  // 신청자 연락처 정보
  contactNumber: string;
  emergencyContact: string;
  
  // 방문 위치 정보
  visitAddress: string;
  entryMethod: string;
  
  // 신청자 정보
  careGrade: string;
  weight: string;
  hasDementia: boolean;
  isBedridden: boolean;
  cognitiveStatus: string;
  cohabitationStatus: string;
  
  // 신청자 입력 특이사항
  specialNotes: string;
}

