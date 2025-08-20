import { useState, useEffect } from "react";
import { 
  Container, 
  Flex, 
  Heading, 
  Text
} from "@radix-ui/themes";
import { 
  TodayScheduleList, 
  TomorrowPreview, 
  RegularProposalNotification, 
  RecentAssignmentNotification 
} from "../components/Home";

interface Schedule {
  id: string;
  time: string;
  clientName: string;
  address: string;
  serviceType: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  isRegular?: boolean;
  regularSequence?: { current: number; total: number };
}

interface RegularProposal {
  id: string;
  applicantName: string;
  period: string;
  totalSessions: number;
  dayOfWeek: string;
  timeSlot: string;
  address: string;
  serviceType: string;
  specialRequests?: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface RecentAssignment {
  id: string;
  date: string;
  time: string;
  applicantName: string;
  location: string;
  institutionId?: string;
  isInstitutionSelected: boolean;
}

export default function HomePage() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [userName, setUserName] = useState("");
  const [regularProposals, setRegularProposals] = useState<RegularProposal[]>([]);
  const [recentAssignments, setRecentAssignments] = useState<RecentAssignment[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 사용자 이름 가져오기
    // 실제로는 API에서 사용자 정보를 가져와야 함
    setUserName("김케어");

    // 더미 데이터 로드
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSchedules([
        {
          id: "1",
          time: "09:00 - 11:00",
          clientName: "김영희",
          address: "서울시 강남구 역삼동",
          serviceType: "방문요양",
          status: "upcoming",
          isRegular: true,
          regularSequence: { current: 3, total: 5 }
        },
        {
          id: "2",
          time: "14:00 - 16:00",
          clientName: "박철수",
          address: "서울시 서초구 서초동",
          serviceType: "방문요양",
          status: "upcoming"
        },
        {
          id: "3",
          time: "08:00 - 10:00",
          clientName: "이순자",
          address: "서울시 마포구 합정동",
          serviceType: "방문요양",
          status: "completed",
          isRegular: true,
          regularSequence: { current: 1, total: 3 }
        },
        {
          id: "4",
          time: "10:00 - 12:00",
          clientName: "최민수",
          address: "서울시 송파구 문정동",
          serviceType: "방문요양",
          status: "upcoming",
          isRegular: true,
          regularSequence: { current: 2, total: 4 }
        },
        {
          id: "5",
          time: "15:00 - 17:00",
          clientName: "정수진",
          address: "서울시 강동구 천호동",
          serviceType: "방문요양",
          status: "upcoming",
          isRegular: true,
          regularSequence: { current: 1, total: 6 }
        }
      ]);

      // 정기 제안 더미 데이터
      setRegularProposals([
        {
          id: "proposal-1",
          applicantName: "이미라",
          period: "2025년 8월 20일 ~ 2025년 12월 31일",
          totalSessions: 20,
          dayOfWeek: "월요일, 수요일, 금요일",
          timeSlot: "09:00 - 11:00",
          address: "서울시 강남구 역삼동",
          serviceType: "방문요양",
          specialRequests: "부드럽고 친절한 서비스 부탁드립니다.",
          status: "pending"
        },
        {
          id: "proposal-2",
          applicantName: "박영수",
          period: "2025년 9월 1일 ~ 2025년 11월 30일",
          totalSessions: 12,
          dayOfWeek: "화요일, 목요일",
          timeSlot: "14:00 - 16:00",
          address: "서울시 서초구 서초동",
          serviceType: "방문요양",
          specialRequests: "경험이 풍부한 요양보호사 선호합니다.",
          status: "pending"
        }
      ]);

      // 최근 배정 더미 데이터
      setRecentAssignments([
        {
          id: "assignment-1",
          date: "2025-08-21",
          time: "14:00 - 16:00",
          applicantName: "김철수",
          location: "서울시 강남구 역삼동",
          isInstitutionSelected: false
        },
        {
          id: "6",
          date: "2025-08-22",
          time: "08:00 - 10:00",
          applicantName: "한지영",
          location: "서울시 중구 명동",
          isInstitutionSelected: true,
          institutionId: "inst-001"
        }
      ]);

      setIsLoading(false);
    };

    loadData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'blue';
      case 'completed': return 'green';
      case 'cancelled': return 'red';
      default: return 'gray';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming': return '예정';
      case 'completed': return '완료';
      case 'cancelled': return '취소';
      default: return '알 수 없음';
    }
  };

  const calculateTimeRemaining = (timeString: string) => {
    // "09:00 - 11:00" 형태에서 시작 시간 추출
    const startTime = timeString.split(' - ')[0];
    const [hours, minutes] = startTime.split(':').map(Number);
    
    // 오늘 날짜로 시작 시간 설정
    const today = new Date();
    const scheduleTime = new Date(today);
    scheduleTime.setHours(hours, minutes, 0, 0);
    
    // 현재 시간과의 차이 계산
    const now = new Date();
    const diffMs = scheduleTime.getTime() - now.getTime();
    
    if (diffMs <= 0) {
      return "곧 시작";
    }
    
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffHours > 0) {
      return `${diffHours}시간 ${diffMinutes}분`;
    } else {
      return `${diffMinutes}분`;
    }
  };

  if (isLoading) {
    return (
      <Container size="2" className="p-4">
        <Text>로딩 중...</Text>
      </Container>
    );
  }

  return (
    <Container size="2" className="p-4">
      <Flex direction="column" gap="6">
        {/* 환영 메시지 */}
        <div>
          <Heading size="5">안녕하세요, {userName}님! 👋</Heading>
          <Text size="3" color="gray">
            {schedules.filter(s => s.status === 'upcoming').length > 0 
              ? "곧 다가오는 일정을 확인해 보세요" 
              : "오늘도 좋은 하루 되세요"
            }
          </Text>
        </div>



        {/* 오늘의 일정 */}
        <TodayScheduleList 
          schedules={schedules}
          getStatusColor={getStatusColor}
          getStatusText={getStatusText}
          calculateTimeRemaining={calculateTimeRemaining}
        />

        {/* 내일 미리보기 */}
        <TomorrowPreview schedules={schedules} />

        {/* 정기 제안 알림 */}
        <RegularProposalNotification proposals={regularProposals} />

        {/* 최근 배정 알림 */}
        <RecentAssignmentNotification assignments={recentAssignments} />

      </Flex>
    </Container>
  );
}
