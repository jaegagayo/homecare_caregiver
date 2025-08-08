import { useState, useEffect } from "react";
import { Link } from "@remix-run/react";
import { 
  Card, 
  Container, 
  Flex, 
  Heading, 
  Text, 
  Button,
  Badge,
  Separator
} from "@radix-ui/themes";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  DollarSign,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Users
} from "lucide-react";

interface Schedule {
  id: string;
  time: string;
  clientName: string;
  address: string;
  serviceType: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

interface Earnings {
  today: number;
  thisWeek: number;
  thisMonth: number;
}

export default function HomePage() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [earnings, setEarnings] = useState<Earnings>({
    today: 0,
    thisWeek: 0,
    thisMonth: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
          status: "upcoming"
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
          status: "completed"
        }
      ]);

      setEarnings({
        today: 45000,
        thisWeek: 280000,
        thisMonth: 1200000
      });

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
          <Heading size="5">안녕하세요! 👋</Heading>
          <Text size="3" color="gray">오늘도 좋은 하루 되세요</Text>
        </div>

        {/* 수익 요약 */}
        <Card className="p-4">
          <Flex direction="column" gap="4">
            <Heading size="4">수익 요약</Heading>
            <Flex gap="4" className="flex-wrap">
              <div className="flex-1 min-w-0">
                <Text size="2" color="gray">오늘</Text>
                <Text size="4" weight="bold" className="text-green-600">
                  ₩{earnings.today.toLocaleString()}
                </Text>
              </div>
              <div className="flex-1 min-w-0">
                <Text size="2" color="gray">이번 주</Text>
                <Text size="4" weight="bold">
                  ₩{earnings.thisWeek.toLocaleString()}
                </Text>
              </div>
              <div className="flex-1 min-w-0">
                <Text size="2" color="gray">이번 달</Text>
                <Text size="4" weight="bold">
                  ₩{earnings.thisMonth.toLocaleString()}
                </Text>
              </div>
            </Flex>
          </Flex>
        </Card>

        {/* 오늘의 일정 */}
        <Card className="p-4">
          <Flex direction="column" gap="4">
            <Flex justify="between" align="center">
              <Heading size="4">오늘의 일정</Heading>
              <Link to="/main/schedule">
                <Button variant="ghost" size="2">전체보기</Button>
              </Link>
            </Flex>
            
            {schedules.length > 0 ? (
              <Flex direction="column" gap="3">
                {schedules.map((schedule) => (
                  <div key={schedule.id} className="border border-gray-200 rounded-lg p-3">
                    <Flex justify="between" align="start" gap="3">
                      <Flex direction="column" gap="2" className="flex-1">
                        <Flex align="center" gap="2">
                          <Clock size={16} className="text-gray-500" />
                          <Text size="2" weight="medium">{schedule.time}</Text>
                          <Badge color={getStatusColor(schedule.status) as any}>
                            {getStatusText(schedule.status)}
                          </Badge>
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
                    </Flex>
                  </div>
                ))}
              </Flex>
            ) : (
              <Text color="gray" className="text-center py-4">
                오늘 예정된 일정이 없습니다.
              </Text>
            )}
          </Flex>
        </Card>

        {/* 빠른 액션 */}
        <Card className="p-4">
          <Flex direction="column" gap="4">
            <Heading size="4">빠른 액션</Heading>
            <Flex gap="3" className="flex-wrap">
              <Link to="/main/schedule" className="flex-1">
                <Button variant="outline" size="3" className="w-full">
                  <Calendar size={16} />
                  일정 확인
                </Button>
              </Link>
              <Link to="/main/matching" className="flex-1">
                <Button variant="outline" size="3" className="w-full">
                  <Users size={16} />
                  매칭 보기
                </Button>
              </Link>
              <Link to="/main/earnings" className="flex-1">
                <Button variant="outline" size="3" className="w-full">
                  <DollarSign size={16} />
                  정산 확인
                </Button>
              </Link>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </Container>
  );
}
