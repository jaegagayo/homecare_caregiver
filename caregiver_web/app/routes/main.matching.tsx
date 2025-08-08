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
  Tabs,
  Dialog
} from "@radix-ui/themes";
import { 
  Users, 
  MapPin, 
  Clock, 
  Calendar,
  DollarSign,
  User,
  Phone,
  Info,
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
  const [matchings, setMatchings] = useState<Matching[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
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
          clientGender: "여성",
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
          clientGender: "남성",
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
          clientGender: "여성",
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
          clientGender: "남성",
          address: "서울시 송파구 문정동",
          serviceType: "방문요양",
          date: "2024-01-22",
          time: "10:00 - 12:00",
          duration: 2,
          hourlyRate: 17000,
          totalAmount: 34000,
          status: "pending",
          description: "시각 장애가 있으신 어르신입니다. 음성으로 상황을 설명해주시고 안전하게 보호해주세요.",
          requirements: ["시각 장애 케어 경험", "음성 안내 능력", "안전 관리 능력"],
          contactPhone: "010-4567-8901"
        }
      ]);

      setIsLoading(false);
    };

    loadData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'yellow';
      case 'accepted': return 'green';
      case 'rejected': return 'red';
      case 'completed': return 'blue';
      default: return 'gray';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return '대기중';
      case 'accepted': return '수락됨';
      case 'rejected': return '거절됨';
      case 'completed': return '완료';
      default: return '알 수 없음';
    }
  };

  const filteredMatchings = matchings.filter(matching => {
    if (selectedStatus !== 'all' && matching.status !== selectedStatus) {
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

  const handleAccept = (matchingId: string) => {
    setMatchings(prev => 
      prev.map(m => 
        m.id === matchingId ? { ...m, status: 'accepted' as const } : m
      )
    );
  };

  const handleReject = (matchingId: string) => {
    setMatchings(prev => 
      prev.map(m => 
        m.id === matchingId ? { ...m, status: 'rejected' as const } : m
      )
    );
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
        {/* 헤더 */}
        <Flex justify="between" align="center">
          <Heading size="5">매칭 관리</Heading>
          <Badge color="blue">
            {matchings.filter(m => m.status === 'pending').length}건 대기중
          </Badge>
        </Flex>

        {/* 통계 카드 */}
        <Card className="p-4">
          <Flex gap="4" className="flex-wrap">
            <div className="flex-1 min-w-0">
              <Text size="2" color="gray">대기중</Text>
              <Text size="4" weight="bold" className="text-yellow-600">
                {matchings.filter(m => m.status === 'pending').length}건
              </Text>
            </div>
            <div className="flex-1 min-w-0">
              <Text size="2" color="gray">수락됨</Text>
              <Text size="4" weight="bold" className="text-green-600">
                {matchings.filter(m => m.status === 'accepted').length}건
              </Text>
            </div>
            <div className="flex-1 min-w-0">
              <Text size="2" color="gray">완료</Text>
              <Text size="4" weight="bold" className="text-blue-600">
                {matchings.filter(m => m.status === 'completed').length}건
              </Text>
            </div>
            <div className="flex-1 min-w-0">
              <Text size="2" color="gray">예상 수익</Text>
              <Text size="4" weight="bold">
                ₩{matchings
                  .filter(m => m.status === 'pending' || m.status === 'accepted')
                  .reduce((sum, m) => sum + m.totalAmount, 0)
                  .toLocaleString()}
              </Text>
            </div>
          </Flex>
        </Card>

        {/* 필터 */}
        <Select.Root value={selectedStatus} onValueChange={setSelectedStatus}>
          <Select.Trigger placeholder="상태별 필터" />
          <Select.Content>
            <Select.Item value="all">전체</Select.Item>
            <Select.Item value="pending">대기중</Select.Item>
            <Select.Item value="accepted">수락됨</Select.Item>
            <Select.Item value="rejected">거절됨</Select.Item>
            <Select.Item value="completed">완료</Select.Item>
          </Select.Content>
        </Select.Root>

        {/* 매칭 목록 */}
        <Flex direction="column" gap="3">
          {filteredMatchings.length > 0 ? (
            filteredMatchings.map((matching) => (
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
                        <Badge color={getStatusColor(matching.status) as any}>
                          {getStatusText(matching.status)}
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
                      <Text size="1" color="gray">{matching.serviceType}</Text>
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
                    <Flex gap="2">
                      <Button 
                        size="2" 
                        variant="outline"
                        onClick={() => handleViewDetails(matching)}
                      >
                        <Info size={16} />
                        상세보기
                      </Button>
                      <Button 
                        size="2" 
                        color="green"
                        onClick={() => handleAccept(matching.id)}
                      >
                        <Check size={16} />
                        수락
                      </Button>
                      <Button 
                        size="2" 
                        color="red"
                        variant="outline"
                        onClick={() => handleReject(matching.id)}
                      >
                        <X size={16} />
                        거절
                      </Button>
                    </Flex>
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
                <Dialog.Title>매칭 상세 정보</Dialog.Title>
                
                <Flex direction="column" gap="3">
                  <div>
                    <Text size="2" weight="medium">고객 정보</Text>
                    <Text size="2">{selectedMatching.clientName} ({selectedMatching.clientAge}세, {selectedMatching.clientGender})</Text>
                  </div>
                  
                  <div>
                    <Text size="2" weight="medium">서비스 정보</Text>
                    <Text size="2">{selectedMatching.serviceType}</Text>
                    <Text size="2">{formatDate(selectedMatching.date)} {selectedMatching.time}</Text>
                    <Text size="2">{selectedMatching.duration}시간</Text>
                  </div>
                  
                  <div>
                    <Text size="2" weight="medium">주소</Text>
                    <Text size="2">{selectedMatching.address}</Text>
                  </div>
                  
                  <div>
                    <Text size="2" weight="medium">연락처</Text>
                    <Text size="2">{selectedMatching.contactPhone}</Text>
                  </div>
                  
                  <div>
                    <Text size="2" weight="medium">서비스 설명</Text>
                    <Text size="2">{selectedMatching.description}</Text>
                  </div>
                  
                  <div>
                    <Text size="2" weight="medium">요구사항</Text>
                    <Flex direction="column" gap="1">
                      {selectedMatching.requirements.map((req, index) => (
                        <Text key={index} size="2">• {req}</Text>
                      ))}
                    </Flex>
                  </div>
                  
                  <div>
                    <Text size="2" weight="medium">수당</Text>
                    <Text size="3" weight="bold">₩{selectedMatching.totalAmount.toLocaleString()}</Text>
                    <Text size="1" color="gray">
                      {selectedMatching.duration}시간 × ₩{selectedMatching.hourlyRate.toLocaleString()}/시간
                    </Text>
                  </div>
                </Flex>
                
                <Flex gap="3" className="mt-4">
                  <Button 
                    color="green" 
                    className="flex-1"
                    onClick={() => {
                      handleAccept(selectedMatching.id);
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
                      handleReject(selectedMatching.id);
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
