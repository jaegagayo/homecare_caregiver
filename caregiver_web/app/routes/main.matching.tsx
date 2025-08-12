import { useState, useEffect } from "react";
import { useNavigate } from "@remix-run/react";
import { 
  Card, 
  Container, 
  Flex, 
  Heading, 
  Text, 
  Button,
  Badge,
  Select,
  Dialog
} from "@radix-ui/themes";
import { 
  Users, 
  MapPin, 
  Clock, 
  Calendar,
  User,
  Check,
  X
} from "lucide-react";

interface Matching {
  id: string;
  clientName: string;
  clientAge: number;
  clientGender: string;
  address: string;
  serviceType: string;
  date: string;
  time: string;
  duration: number;
  hourlyRate: number;
  totalAmount: number;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  description: string;
  requirements: string[];
  contactPhone: string;
}

export default function MatchingPage() {
  const navigate = useNavigate();
  const [matchings, setMatchings] = useState<Matching[]>([]);
  const [sortBy, setSortBy] = useState<string>('date');
  const [selectedMatching, setSelectedMatching] = useState<Matching | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    // 더미 데이터 로드
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMatchings([
        {
          id: "1",
          clientName: "김영희",
          clientAge: 75,
          clientGender: "여",
          address: "서울시 강남구 역삼동",
          serviceType: "방문요양",
          date: "2024-01-20",
          time: "09:00 - 11:00",
          duration: 2,
          hourlyRate: 15000,
          totalAmount: 30000,
          status: "pending",
          description: "일상생활 지원이 필요한 어르신입니다. 식사 준비, 청소, 세탁 등을 도와주세요.",
          requirements: ["요양보호사 자격증 필수", "경험자 우대", "친절하고 인내심 있는 분"],
          contactPhone: "010-1234-5678"
        },
        {
          id: "2",
          clientName: "박철수",
          clientAge: 82,
          clientGender: "남",
          address: "서울시 서초구 서초동",
          serviceType: "방문요양",
          date: "2024-01-21",
          time: "14:00 - 16:00",
          duration: 2,
          hourlyRate: 16000,
          totalAmount: 32000,
          status: "pending",
          description: "치매 초기 단계로 기억력이 좋지 않으신 어르신입니다. 안전 관리에 주의해주세요.",
          requirements: ["치매 케어 경험자", "인내심 있는 분", "안전 관리 능력"],
          contactPhone: "010-2345-6789"
        },
        {
          id: "3",
          clientName: "이순자",
          clientAge: 78,
          clientGender: "여",
          address: "서울시 마포구 합정동",
          serviceType: "방문요양",
          date: "2024-01-19",
          time: "08:00 - 10:00",
          duration: 2,
          hourlyRate: 15000,
          totalAmount: 30000,
          status: "accepted",
          description: "관절염이 있으셔서 움직임이 불편하신 어르신입니다. 부드럽게 도와주세요.",
          requirements: ["관절염 케어 경험", "부드러운 터치", "체력 좋은 분"],
          contactPhone: "010-3456-7890"
        },
        {
          id: "4",
          clientName: "최민수",
          clientAge: 85,
          clientGender: "남",
          address: "서울시 송파구 문정동",
          serviceType: "방문요양",
          date: "2024-01-22",
          time: "10:00 - 12:00",
          duration: 2,
          hourlyRate: 17000,
          totalAmount: 34000,
          status: "pending",
          description: "시각 장애가 있으신 어르신입니다. 큰소리로 상황을 설명해주시고 안전에 유의해 주셨으면 좋겠습니다...!",
          requirements: ["시각 장애 케어 경험", "음성 안내 능력", "안전 관리 능력"],
          contactPhone: "010-4567-8901"
        }
      ]);

      setIsLoading(false);
    };

    loadData();
  }, []);



  const sortedMatchings = matchings
    .filter(matching => matching.status === 'pending' || matching.status === 'completed')
    .sort((a, b) => {
      switch (sortBy) {
        case 'hourlyRate':
          return b.hourlyRate - a.hourlyRate; // 시급 높은 순
        case 'date':
        default:
          return new Date(a.date).getTime() - new Date(b.date).getTime(); // 날짜 빠른 순
      }
    });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      month: 'long',
      day: 'numeric',
      weekday: 'short'
    });
  };

  const handleViewDetails = (matching: Matching) => {
    setSelectedMatching(matching);
    setIsDialogOpen(true);
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
        {/* 헤더 및 필터 */}
        <Flex justify="between" align="center">
          {matchings.filter(m => m.status === 'pending').length > 0 && (
            <Heading size="4">
              {matchings.filter(m => m.status === 'pending').length}건의 대기중인 매칭이 있어요
            </Heading>
          )}
          <Select.Root value={sortBy} onValueChange={setSortBy}>
            <Select.Trigger placeholder="정렬 기준" />
            <Select.Content>
              <Select.Item value="date">시작 날짜순</Select.Item>
              <Select.Item value="hourlyRate">시급순</Select.Item>
            </Select.Content>
          </Select.Root>
                  </Flex>

          {/* 내 근무 조건 확인 영역 */}
          <Card className="p-4">
            <Flex direction="column" gap="3">
              <Flex justify="between" align="center">
                <Text size="3" weight="medium">내 근무 조건</Text>
                <Button 
                  variant="ghost" 
                  size="2"
                  onClick={() => navigate('/main/work-conditions')}
                >
                  자세히 보기
                </Button>
              </Flex>
              
              <Flex direction="column" gap="2">
                <Flex justify="between" align="center">
                  <Text size="2" color="gray">희망 시급</Text>
                  <Text size="2" weight="medium">₩15,000 ~ ₩20,000</Text>
                </Flex>
                
                <Flex justify="between" align="center">
                  <Text size="2" color="gray">근무 가능 시간</Text>
                  <Text size="2" weight="medium">평일 09:00-18:00</Text>
                </Flex>
                
                <Flex justify="between" align="center">
                  <Text size="2" color="gray">근무 가능 지역</Text>
                  <Text size="2" weight="medium">서울시 강남구, 서초구</Text>
                </Flex>
                
                <Flex justify="between" align="center">
                  <Text size="2" color="gray">선호 서비스</Text>
                  <Text size="2" weight="medium">방문요양, 방문목욕</Text>
                </Flex>
              </Flex>
            </Flex>
          </Card>

          {/* 매칭 목록 */}
        <Flex direction="column" gap="3">
          {sortedMatchings.length > 0 ? (
            sortedMatchings.map((matching) => (
              <Card key={matching.id} className="p-4">
                <Flex direction="column" gap="3">
                  <Flex justify="between" align="start">
                    <Flex direction="column" gap="2" className="flex-1">
                      <Flex align="center" gap="2">
                        <User size={16} className="text-gray-500" />
                        <Text size="2" weight="medium">{matching.clientName}</Text>
                        <Text size="1" color="gray">
                          ({matching.clientAge}세, {matching.clientGender})
                        </Text>
                        <Badge color="blue">
                          {matching.serviceType}
                        </Badge>
                      </Flex>
                      <Flex align="center" gap="2">
                        <Calendar size={16} className="text-gray-500" />
                        <Text size="2">{formatDate(matching.date)}</Text>
                      </Flex>
                      <Flex align="center" gap="2">
                        <Clock size={16} className="text-gray-500" />
                        <Text size="2">{matching.time}</Text>
                      </Flex>
                      <Flex align="center" gap="2">
                        <MapPin size={16} className="text-gray-500" />
                        <Text size="2" color="gray">{matching.address}</Text>
                      </Flex>
                    </Flex>
                    <Flex direction="column" align="end" gap="1">
                      <Text size="3" weight="bold">
                        ₩{matching.totalAmount.toLocaleString()}
                      </Text>
                      <Text size="1" color="gray">
                        {matching.duration}시간 × ₩{matching.hourlyRate.toLocaleString()}
                      </Text>
                    </Flex>
                  </Flex>
                  
                  {matching.status === 'pending' && (
                    <Button 
                      size="2" 
                      variant="solid"
                      onClick={() => handleViewDetails(matching)}
                      className="w-full"
                    >
                      확인하고 결정하기
                    </Button>
                  )}
                </Flex>
              </Card>
            ))
          ) : (
            <Card className="p-8">
              <Flex direction="column" align="center" gap="3">
                <Users size={48} className="text-gray-400" />
                <Text size="3" color="gray">매칭 요청이 없습니다</Text>
                <Text size="2" color="gray">새로운 매칭 요청을 기다려주세요</Text>
              </Flex>
            </Card>
          )}
        </Flex>

        {/* 상세 정보 다이얼로그 */}
        <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <Dialog.Content>
            {selectedMatching && (
              <Flex direction="column" gap="4">
                <Flex justify="between" align="center">
                  <Dialog.Title className="flex items-center">매칭 상세 정보</Dialog.Title>
                  <Button 
                    variant="ghost" 
                    size="2"
                    onClick={() => setIsDialogOpen(false)}
                    className="flex items-center gap-1 self-center -mt-4"
                  >
                    <X size={16} />
                    <Text size="2" weight="medium">닫기</Text>
                  </Button>
                </Flex>                
                <Flex direction="column" gap="4">
                  {/* 고객 정보 섹션 */}
                  <div>
                    <Flex justify="between" align="center" className="mb-2">
                      <Text size="2" weight="medium">고객명</Text>
                      <Text size="2" weight="bold">{selectedMatching.clientName}</Text>
                    </Flex>
                    <Flex justify="between" align="center" className="mb-2">
                      <Text size="2" weight="medium">나이/성별</Text>
                      <Text size="2" color="gray">{selectedMatching.clientAge}세, {selectedMatching.clientGender}</Text>
                    </Flex>
                    <Flex justify="between" align="center">
                      <Text size="2" weight="medium">연락처</Text>
                      <Text size="2" color="gray">{selectedMatching.contactPhone}</Text>
                    </Flex>
                  </div>

                  <div className="w-full h-px bg-gray-200"></div>

                  {/* 근무 유형 섹션 */}
                  <div>
                    <Flex justify="between" align="center">
                      <Text size="2" weight="medium">근무 유형</Text>
                      <Badge color="blue">{selectedMatching.serviceType}</Badge>
                    </Flex>
                  </div>

                  <div className="w-full h-px bg-gray-200"></div>

                  {/* 시간 정보 섹션 */}
                  <div>
                    <Flex justify="between" align="center" className="mb-2">
                      <Text size="2" weight="medium">날짜/시간</Text>
                      <Text size="2">{formatDate(selectedMatching.date)} {selectedMatching.time}</Text>
                    </Flex>
                    <Flex justify="between" align="center">
                      <Text size="2" weight="medium">근무 시간</Text>
                      <Text size="2" color="gray">{selectedMatching.duration}시간</Text>
                    </Flex>
                  </div>

                  <div className="w-full h-px bg-gray-200"></div>

                  {/* 위치 섹션 */}
                  <div>
                    <Flex justify="between" align="center">
                      <Text size="2" weight="medium">주소</Text>
                      <Text size="2">{selectedMatching.address}</Text>
                    </Flex>
                  </div>

                  <div className="w-full h-px bg-gray-200"></div>

                  {/* 특이사항 섹션 */}
                  <div>
                    <div><Text size="2" weight="medium" className="mb-3">특이사항</Text></div>
                    <div><Text size="2" className="leading-relaxed whitespace-pre-line">{selectedMatching.description}</Text></div>
                  </div>

                  <div className="w-full h-px bg-gray-200"></div>

                  {/* 수당 섹션 */}
                  <div>
                    <Flex justify="between" align="center" className="mb-2">
                      <Text size="2" weight="medium">수당</Text>
                      <Text size="3" weight="bold" style={{ color: 'var(--accent-9)' }}>
                        ₩{selectedMatching.totalAmount.toLocaleString()}
                      </Text>
                    </Flex>
                    <Flex justify="between" align="center">
                      <Text size="2" weight="medium">시급</Text>
                      <Text size="2" color="gray">
                        ₩{selectedMatching.hourlyRate.toLocaleString()}/시간
                      </Text>
                    </Flex>
                  </div>
                </Flex>
                
                <Flex gap="3" className="mt-4">
                  <Button 
                    color="green" 
                    className="flex-1"
                    onClick={() => {
                      setMatchings(prev => 
                        prev.map(m => 
                          m.id === selectedMatching.id ? { ...m, status: 'accepted' as const } : m
                        )
                      );
                      setIsDialogOpen(false);
                    }}
                  >
                    <Check size={16} />
                    수락
                  </Button>
                  <Button 
                    color="red" 
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setMatchings(prev => 
                        prev.map(m => 
                          m.id === selectedMatching.id ? { ...m, status: 'rejected' as const } : m
                        )
                      );
                      setIsDialogOpen(false);
                    }}
                  >
                    <X size={16} />
                    거절
                  </Button>
                </Flex>
              </Flex>
            )}
          </Dialog.Content>
        </Dialog.Root>
      </Flex>
    </Container>
  );
}
