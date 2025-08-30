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
import { getWeeklySchedule } from "../api/schedule";
import { CaregiverScheduleResponse } from "../types";

export default function SchedulePage() {
  const [schedules, setSchedules] = useState<CaregiverScheduleResponse[]>([]);
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
    // 실제 API 데이터 로드
    const loadData = async () => {
      try {
        setIsLoading(true);
        
        // TODO: 실제 caregiverId를 사용해야 함 (현재는 임시로 "1" 사용)
        const caregiverId = "1";
        
        // 주간 일정 조회 - 백엔드 데이터를 그대로 사용
        const apiData = await getWeeklySchedule(caregiverId);
        
        setSchedules(apiData);
      } catch (error) {
        console.error('일정 데이터 로드 실패:', error);
        // 에러 발생 시 빈 배열로 설정
        setSchedules([]);
      } finally {
        setIsLoading(false);
      }
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
