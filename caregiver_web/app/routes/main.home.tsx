import { useState, useEffect } from "react";
import { 
  Container, 
  Flex, 
  Heading, 
  Text
} from "@radix-ui/themes";

import { 
  UpcomingScheduleCard,
  RegularProposalNotification, 
  RecentAssignmentNotification 
} from "../components/Home";
import { ScheduleList, WarningCard } from "../components/Common";
import { formatToday } from "../utils/formatters";
import { getHomeData } from "../api/home";
import { HomeData } from "../types";

export default function HomePage() {
  const [homeData, setHomeData] = useState<HomeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [partialErrors, setPartialErrors] = useState<string[]>([]);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        setPartialErrors([]);
        const data = await getHomeData();
        setHomeData(data);
      } catch (err) {
        console.error('홈 데이터 로드 실패:', err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('데이터를 불러오는데 실패했습니다.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadHomeData();
  }, []);

  const getStatusColor = (matchStatus: string) => {
    switch (matchStatus) {
      case 'SCHEDULED': return 'blue';
      case 'COMPLETED': return 'green';
      case 'CANCELLED': return 'red';
      default: return 'gray';
    }
  };

  const getStatusText = (matchStatus: string) => {
    switch (matchStatus) {
      case 'SCHEDULED': return '예정';
      case 'COMPLETED': return '완료';
      case 'CANCELLED': return '취소';
      default: return '알 수 없음';
    }
  };

  const calculateTimeRemaining = (startTime: string) => {
    // "09:00" 형태에서 시간 추출
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

  if (error) {
    return (
      <Container size="2" className="p-4">
        <Text color="red">{error}</Text>
      </Container>
    );
  }

  if (!homeData) {
    return (
      <Container size="2" className="p-4">
        <Text>데이터가 없습니다.</Text>
      </Container>
    );
  }

  return (
    <Container size="2" className="p-4">
      <Flex direction="column" gap="6">
        {/* 환영 메시지 */}
        <div>
          <Heading size="5">안녕하세요, {homeData.caregiverName}님! 👋</Heading>
          <Text size="3" color="gray">
            {homeData.todaySchedules.length > 0 
              ? "곧 다가오는 일정을 확인해 보세요" 
              : "오늘도 좋은 하루 되세요"
            }
          </Text>
        </div>

        {/* 오늘 일정 섹션 */}
        <Flex direction="column" gap="4">

          {/* 오늘 날짜 */}
          <Heading size="4">{formatToday()}</Heading>
          
          {/* 바로 수행할 일정 (상세 정보) */}
          <UpcomingScheduleCard 
            schedule={homeData.todaySchedules.length > 0 ? homeData.todaySchedules[0] : null}
            calculateTimeRemaining={calculateTimeRemaining}
          />

          {/* 나머지 일정들 */}
          <ScheduleList 
            schedules={homeData.todaySchedules.slice(1)} // 첫 번째 일정 제외
            showStatus={true}
            getStatusColor={getStatusColor}
            getStatusText={getStatusText}
            emptyMessage="추가 일정이 없습니다."
          />
        </Flex>

        {/* 내일 미리보기 섹션 */}
        <Flex direction="column" gap="4">
          <Heading size="4" className="mb-1">내일 일정 미리보기</Heading>
          <WarningCard 
            message="내일로 넘어가는 자정 이후에는 변경이 불가합니다. 필요 시 오늘 안에 확인해 주세요."
          />
          <ScheduleList 
            schedules={homeData.tomorrowSchedules}
            showStatus={false} // 내일 일정은 모두 "예정"이므로 상태 배지 숨김
            emptyMessage="내일 배정된 일정이 없습니다."
          />
        </Flex>

        {/* 정기 제안 알림 */}
        <RegularProposalNotification proposals={homeData.regularProposals} />

        {/* 최근 배정 알림 - 백엔드에 해당 API가 없으므로 빈 배열 전달 */}
        <RecentAssignmentNotification assignments={[]} />

      </Flex>
    </Container>
  );
}
