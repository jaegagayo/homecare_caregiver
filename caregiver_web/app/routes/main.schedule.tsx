import { useState, useEffect } from "react";
import { 
  Card, 
  Container, 
  Flex, 
  Heading, 
  Text, 
  Button,
  Badge,
  Select,
  Tabs
} from "@radix-ui/themes";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Plus
} from "lucide-react";

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
}

export default function SchedulePage() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  const [selectedView, setSelectedView] = useState<'list' | 'calendar'>('list');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 더미 데이터 로드
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSchedules([
        {
          id: "1",
          date: "2024-01-15",
          time: "09:00 - 11:00",
          clientName: "김영희",
          address: "서울시 강남구 역삼동",
          serviceType: "방문요양",
          status: "upcoming",
          duration: 2,
          hourlyRate: 15000
        },
        {
          id: "2",
          date: "2024-01-15",
          time: "14:00 - 16:00",
          clientName: "박철수",
          address: "서울시 서초구 서초동",
          serviceType: "방문요양",
          status: "upcoming",
          duration: 2,
          hourlyRate: 15000
        },
        {
          id: "3",
          date: "2024-01-14",
          time: "08:00 - 10:00",
          clientName: "이순자",
          address: "서울시 마포구 합정동",
          serviceType: "방문요양",
          status: "completed",
          duration: 2,
          hourlyRate: 15000
        },
        {
          id: "4",
          date: "2024-01-16",
          time: "10:00 - 12:00",
          clientName: "최민수",
          address: "서울시 송파구 문정동",
          serviceType: "방문요양",
          status: "upcoming",
          duration: 2,
          hourlyRate: 15000
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

  const filteredSchedules = schedules.filter(schedule => {
    if (selectedStatus !== 'all' && schedule.status !== selectedStatus) {
      return false;
    }
    return true;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      month: 'long',
      day: 'numeric',
      weekday: 'short'
    });
  };

  const getTotalEarnings = (schedules: Schedule[]) => {
    return schedules
      .filter(s => s.status === 'completed')
      .reduce((total, s) => total + (s.duration * s.hourlyRate), 0);
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
        {/* 헤더 */}
        <Flex justify="end">
          <Button size="2">
            <Plus size={16} />
            새 일정
          </Button>
        </Flex>

        {/* 통계 카드 */}
        <Card className="p-4">
          <Flex gap="4" className="flex-wrap">
            <div className="flex-1 min-w-0">
              <Text size="2" color="gray">이번 주 일정</Text>
              <Text size="4" weight="bold">
                {schedules.filter(s => s.status === 'upcoming').length}건
              </Text>
            </div>
            <div className="flex-1 min-w-0">
              <Text size="2" color="gray">완료된 일정</Text>
              <Text size="4" weight="bold" style={{ color: 'var(--accent-9)' }}>
                {schedules.filter(s => s.status === 'completed').length}건
              </Text>
            </div>
            <div className="flex-1 min-w-0">
              <Text size="2" color="gray">이번 주 수익</Text>
              <Text size="4" weight="bold">
                ₩{getTotalEarnings(schedules).toLocaleString()}
              </Text>
            </div>
          </Flex>
        </Card>

        {/* 필터 및 뷰 선택 */}
        <Flex gap="3" className="flex-wrap">
          <Select.Root value={selectedStatus} onValueChange={setSelectedStatus}>
            <Select.Trigger placeholder="상태별 필터" />
            <Select.Content>
              <Select.Item value="all">전체</Select.Item>
              <Select.Item value="upcoming">예정</Select.Item>
              <Select.Item value="completed">완료</Select.Item>
              <Select.Item value="cancelled">취소</Select.Item>
            </Select.Content>
          </Select.Root>

          <Tabs.Root value={selectedView} onValueChange={(value) => setSelectedView(value as 'list' | 'calendar')}>
            <Tabs.List>
              <Tabs.Trigger value="list">목록</Tabs.Trigger>
              <Tabs.Trigger value="calendar">캘린더</Tabs.Trigger>
            </Tabs.List>

            {/* 일정 목록 */}
            <Tabs.Content value="list">
              <Flex direction="column" gap="3">
                {filteredSchedules.length > 0 ? (
                  filteredSchedules.map((schedule) => (
                    <Card key={schedule.id} className="p-4">
                      <Flex direction="column" gap="3">
                        <Flex justify="between" align="start">
                          <Flex direction="column" gap="2" className="flex-1">
                            <Flex align="center" gap="2">
                              <Calendar size={16} className="text-gray-500" />
                              <Text size="2" weight="medium">
                                {formatDate(schedule.date)}
                              </Text>
                              <Badge color={getStatusColor(schedule.status) as "blue" | "green" | "red" | "gray"}>
                                {getStatusText(schedule.status)}
                              </Badge>
                            </Flex>
                            <Flex align="center" gap="2">
                              <Clock size={16} className="text-gray-500" />
                              <Text size="2">{schedule.time}</Text>
                            </Flex>
                            <Flex align="center" gap="2">
                              <User size={16} className="text-gray-500" />
                              <Text size="2">{schedule.clientName}</Text>
                            </Flex>
                            <Flex align="center" gap="2">
                              <MapPin size={16} className="text-gray-500" />
                              <Text size="2" color="gray">{schedule.address}</Text>
                            </Flex>
                            <Text size="1" color="gray">{schedule.serviceType}</Text>
                          </Flex>
                          <Flex direction="column" align="end" gap="1">
                            <Text size="2" weight="medium">
                              ₩{(schedule.duration * schedule.hourlyRate).toLocaleString()}
                            </Text>
                            <Text size="1" color="gray">
                              {schedule.duration}시간 × ₩{schedule.hourlyRate.toLocaleString()}
                            </Text>
                          </Flex>
                        </Flex>
                        
                        {schedule.status === 'upcoming' && (
                          <Flex gap="2">
                            <Button size="2" variant="outline">상세보기</Button>
                            <Button size="2" variant="outline">완료 처리</Button>
                          </Flex>
                        )}
                      </Flex>
                    </Card>
                  ))
                ) : (
                  <Card className="p-8">
                    <Flex direction="column" align="center" gap="3">
                      <Calendar size={48} className="text-gray-400" />
                      <Text size="3" color="gray">일정이 없습니다</Text>
                  <Text size="2" color="gray">새로운 일정을 추가해보세요</Text>
                </Flex>
              </Card>
            )}
          </Flex>
        </Tabs.Content>

        {/* 캘린더 뷰 */}
        <Tabs.Content value="calendar">
          <Card className="p-4">
            <Flex direction="column" align="center" gap="4">
              <Text size="3" color="gray">캘린더 뷰는 준비 중입니다</Text>
              <Text size="2" color="gray">목록 뷰를 사용해주세요</Text>
            </Flex>
          </Card>
        </Tabs.Content>
      </Tabs.Root>
    </Flex>
      </Flex>
    </Container>
  );
}
