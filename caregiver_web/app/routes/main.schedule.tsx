import { useState, useEffect } from "react";
import { 
  Container, 
  Flex, 
  Text
} from "@radix-ui/themes";
import ViewToggle from "../components/Schedule/ViewToggle";
import ScheduleListView from "../components/Schedule/ListView/ScheduleListView";
import ScheduleHeader from "../components/Schedule/CalendarView/ScheduleHeader";
import ScheduleGridBody from "../components/Schedule/CalendarView/ScheduleGridBody";

interface Schedule {
  id: string;
  date: string;
  time: string;
  clientName: string;
  address: string;
  serviceType: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  duration: number; // 시간 단위
  hourlyRate: number;
  isRegular?: boolean;
  regularSequence?: { current: number; total: number };
}

export default function SchedulePage() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [currentView, setCurrentView] = useState<'calendar' | 'list'>('calendar');
  const [currentDayIndex, setCurrentDayIndex] = useState(() => {
    // 오늘 날짜가 가운데로 오도록 초기 인덱스 설정
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0: 일요일, 1: 월요일, ..., 6: 토요일
    
    // 오늘 날짜가 3일 중 가운데로 오도록 계산
    if (dayOfWeek <= 1) {
      return 0; // 일(0), 월(1)은 0-2일 (0,1,2)
    } else if (dayOfWeek >= 5) {
      return 4; // 금(5), 토(6)는 4-6일 (4,5,6)
    } else {
      return dayOfWeek - 1; // 화(2), 수(3), 목(4)은 각각 가운데
    }
  }); // 현재 표시할 3일의 시작 인덱스

  // 주간 네비게이션 함수
  const navigateWeek = (direction: 'prev' | 'next' | 'today') => {
    if (direction === 'today') {
      setCurrentWeek(new Date());
    } else {
      const newWeek = new Date(currentWeek);
      newWeek.setDate(currentWeek.getDate() + (direction === 'next' ? 7 : -7));
      setCurrentWeek(newWeek);
    }
  };

  // 3일 단위 네비게이션 함수
  const navigateDays = (direction: 'prev' | 'next' | number) => {
    if (typeof direction === 'number') {
      setCurrentDayIndex(direction);
    } else {
      const newIndex = direction === 'next' 
        ? Math.min(4, currentDayIndex + 1)
        : Math.max(0, currentDayIndex - 1);
      setCurrentDayIndex(newIndex);
    }
  };

  useEffect(() => {
    // 더미 데이터 로드
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSchedules([
        // 8월 28일 (목요일) - 내일
        {
          id: "1",
          date: "2025-08-28",
          time: "09:00 - 11:00",
          clientName: "정미영",
          address: "서울시 강서구 화곡동",
          serviceType: "방문요양",
          status: "scheduled",
          duration: 2,
          hourlyRate: 15000
        },
        {
          id: "2",
          date: "2025-08-28",
          time: "14:00 - 16:00",
          clientName: "김철수",
          address: "서울시 영등포구 여의도동",
          serviceType: "방문요양",
          status: "scheduled",
          duration: 2,
          hourlyRate: 18000,
          isRegular: true,
          regularSequence: { current: 3, total: 5 }
        },
        {
          id: "3",
          date: "2025-08-28",
          time: "18:00 - 20:00",
          clientName: "박영희",
          address: "서울시 성동구 성수동",
          serviceType: "방문요양",
          status: "scheduled",
          duration: 2,
          hourlyRate: 16000,
          isRegular: true,
          regularSequence: { current: 1, total: 3 }
        },
        
        // 8월 29일 (금요일)
        {
          id: "4",
          date: "2025-08-29",
          time: "10:00 - 12:00",
          clientName: "이미라",
          address: "서울시 광진구 구의동",
          serviceType: "방문요양",
          status: "scheduled",
          duration: 2,
          hourlyRate: 15000
        },
        {
          id: "5",
          date: "2025-08-29",
          time: "15:00 - 17:00",
          clientName: "최동욱",
          address: "서울시 동대문구 신설동",
          serviceType: "방문요양",
          status: "scheduled",
          duration: 2,
          hourlyRate: 17000
        },
        
        // 8월 30일 (토요일)
        {
          id: "6",
          date: "2025-08-30",
          time: "08:00 - 10:00",
          clientName: "한지영",
          address: "서울시 중구 명동",
          serviceType: "방문요양",
          status: "scheduled",
          duration: 2,
          hourlyRate: 16000
        },
        {
          id: "7",
          date: "2025-08-30",
          time: "13:00 - 15:00",
          clientName: "송민호",
          address: "서울시 용산구 이태원동",
          serviceType: "방문요양",
          status: "scheduled",
          duration: 2,
          hourlyRate: 15000
        },
        
        // 8월 31일 (일요일)
        {
          id: "8",
          date: "2025-08-31",
          time: "11:00 - 13:00",
          clientName: "윤서연",
          address: "서울시 서대문구 신촌동",
          serviceType: "방문요양",
          status: "scheduled",
          duration: 2,
          hourlyRate: 15000
        },
        {
          id: "9",
          date: "2025-08-31",
          time: "16:00 - 18:00",
          clientName: "임태현",
          address: "서울시 종로구 종로",
          serviceType: "방문요양",
          status: "scheduled",
          duration: 2,
          hourlyRate: 17000
        },
        
        // 9월 1일 (월요일)
        {
          id: "10",
          date: "2025-09-01",
          time: "09:00 - 11:00",
          clientName: "강미영",
          address: "서울시 노원구 공릉동",
          serviceType: "방문요양",
          status: "scheduled",
          duration: 2,
          hourlyRate: 15000
        },
        
        // 9월 2일 (화요일)
        {
          id: "11",
          date: "2025-09-02",
          time: "09:00 - 11:00",
          clientName: "김영희",
          address: "서울시 강남구 역삼동",
          serviceType: "방문요양",
          status: "scheduled",
          duration: 2,
          hourlyRate: 15000
        },
        {
          id: "12",
          date: "2025-09-02",
          time: "14:00 - 16:00",
          clientName: "박철수",
          address: "서울시 서초구 서초동",
          serviceType: "방문요양",
          status: "scheduled",
          duration: 2,
          hourlyRate: 16000
        },
        
        // 9월 3일 (수요일)
        {
          id: "13",
          date: "2025-09-03",
          time: "08:00 - 10:00",
          clientName: "이순자",
          address: "서울시 마포구 합정동",
          serviceType: "방문요양",
          status: "scheduled",
          duration: 2,
          hourlyRate: 15000
        },
        {
          id: "14",
          date: "2025-09-03",
          time: "13:00 - 15:00",
          clientName: "최민수",
          address: "서울시 송파구 문정동",
          serviceType: "방문요양",
          status: "scheduled",
          duration: 2,
          hourlyRate: 17000
        }
      ]);

      setIsLoading(false);
    };

    loadData();
  }, []);





  if (isLoading) {
    return (
      <Container size="2" className="p-4">
        <Text>로딩 중...</Text>
      </Container>
    );
  }

  return (
    <Container size="2" style={{ 
      height: currentView === 'calendar' ? '80vh' : 'auto',
      overflow: currentView === 'calendar' ? 'hidden' : 'visible',
      paddingLeft: '16px',
      paddingRight: '16px',
      paddingBottom: '16px'
    }}>
      <Flex direction="column" style={{ height: currentView === 'calendar' ? '100%' : 'auto' }}>
        {/* 뷰 전환 토글 */}
        <ViewToggle 
          currentView={currentView}
          onViewChange={setCurrentView}
        />

        {/* 뷰에 따른 스케줄 표시 */}
        {currentView === 'calendar' ? (
          <>
            {/* 캘린더 뷰 헤더 */}
            <ScheduleHeader 
              currentWeek={currentWeek} 
              currentDayIndex={currentDayIndex}
              schedules={schedules}
              onNavigateWeek={navigateWeek}
              onNavigateDays={navigateDays}
            />
            <ScheduleGridBody 
              schedules={schedules} 
              currentWeek={currentWeek} 
              currentDayIndex={currentDayIndex}
              onDayIndexChange={setCurrentDayIndex}
            />
          </>
        ) : (
          <ScheduleListView schedules={schedules} />
        )}
      </Flex>
    </Container>
  );
}
