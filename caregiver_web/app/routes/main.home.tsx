import { useState, useEffect } from "react";
import { Link } from "@remix-run/react";
import { 
  Container, 
  Flex, 
  Heading, 
  Text, 
  Button,
  Badge
} from "@radix-ui/themes";
import { 
  Clock, 
  MapPin, 
  User
} from "lucide-react";

interface Schedule {
  id: string;
  time: string;
  clientName: string;
  address: string;
  serviceType: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}



export default function HomePage() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [userName, setUserName] = useState("");

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

        {/* 곧 수행할 일정 */}
        {schedules.filter(s => s.status === 'upcoming').length > 0 ? (
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            {schedules.filter(s => s.status === 'upcoming').slice(0, 1).map((schedule) => (
              <div key={schedule.id} className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="space-y-0">
                      <div>
                        <Text size="5" weight="bold">{schedule.clientName}님</Text>
                      </div>
                      <div>
                        <Text size="3" color="gray">{schedule.address}</Text>
                      </div>
                    </div>
                    <Text size="2" color="gray" className="bg-gray-100 px-2 py-1 rounded">
                      {schedule.serviceType}
                    </Text>
                  </div>
                  <div className="w-full aspect-[4/3] bg-gray-200 rounded-lg flex items-center justify-center">
                    <Text size="2" color="gray">지도 영역</Text>
                  </div>
                  <div>
                    <Text size="3" color="gray">
                      시작까지 {calculateTimeRemaining(schedule.time)} 전 ({schedule.time})
                    </Text>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <Text size="2" color="gray">
                      고객님께서 계단이 있는 3층에 거주하고 계십니다. 엘리베이터는 1층에만 있어서 2-3층은 계단을 이용해야 합니다. 고객님은 보행기 사용이 필요하시며, 화장실은 복도 끝에 위치해 있습니다. 방문 시에는 반드시 신발을 벗고 들어가시기 바랍니다.
                    </Text>
                  </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
            <Text size="3" color="gray">오늘 예정된 일정이 없습니다.</Text>
          </div>
        )}

        {/* 오늘의 일정 */}
        <div>
          <Flex justify="between" align="center" className="mb-4">
            <Heading size="4">오늘의 일정</Heading>
            <Link to="/main/schedule">
              <Button variant="ghost" size="2">전체보기</Button>
            </Link>
          </Flex>
          
          {schedules.length > 0 ? (
            <Flex direction="column" gap="3">
              {schedules.map((schedule) => (
                <div key={schedule.id} className="bg-white border border-gray-200 rounded-lg p-3">
                  <Flex justify="between" align="start" gap="3">
                    <Flex direction="column" gap="2" className="flex-1">
                      <Flex align="center" gap="2">
                        <Clock size={16} className="text-gray-500" />
                        <Text size="2" weight="medium">{schedule.time}</Text>
                        <Badge color={getStatusColor(schedule.status) as "blue" | "green" | "red" | "gray"}>
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
            <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
              <Text color="gray">오늘 예정된 일정이 없습니다.</Text>
            </div>
          )}
        </div>


      </Flex>
    </Container>
  );
}
