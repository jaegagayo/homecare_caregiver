import { useState, useEffect } from "react";
import { 
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
  DollarSign, 
  TrendingUp, 
  Calendar, 
  Clock,
  Filter
} from "lucide-react";

interface Earnings {
  id: string;
  date: string;
  clientName: string;
  serviceType: string;
  duration: number;
  hourlyRate: number;
  totalAmount: number;
  status: 'completed' | 'pending' | 'cancelled';
}

interface EarningsSummary {
  total: number;
  thisWeek: number;
  thisMonth: number;
  lastMonth: number;
  averagePerDay: number;
  totalHours: number;
}

export default function EarningsPage() {
  const [earnings, setEarnings] = useState<Earnings[]>([]);
  const [summary, setSummary] = useState<EarningsSummary>({
    total: 0,
    thisWeek: 0,
    thisMonth: 0,
    lastMonth: 0,
    averagePerDay: 0,
    totalHours: 0
  });
  const [selectedPeriod, setSelectedPeriod] = useState<string>('thisMonth');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 더미 데이터 로드
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const dummyEarnings: Earnings[] = [
        {
          id: "1",
          date: "2024-01-15",
          clientName: "김영희",
          serviceType: "방문요양",
          duration: 2,
          hourlyRate: 15000,
          totalAmount: 30000,
          status: "completed"
        },
        {
          id: "2",
          date: "2024-01-14",
          clientName: "박철수",
          serviceType: "방문요양",
          duration: 3,
          hourlyRate: 15000,
          totalAmount: 45000,
          status: "completed"
        },
        {
          id: "3",
          date: "2024-01-13",
          clientName: "이순자",
          serviceType: "방문요양",
          duration: 2,
          hourlyRate: 15000,
          totalAmount: 30000,
          status: "completed"
        },
        {
          id: "4",
          date: "2024-01-12",
          clientName: "최민수",
          serviceType: "방문요양",
          duration: 4,
          hourlyRate: 15000,
          totalAmount: 60000,
          status: "completed"
        },
        {
          id: "5",
          date: "2024-01-11",
          clientName: "정영수",
          serviceType: "방문요양",
          duration: 2,
          hourlyRate: 15000,
          totalAmount: 30000,
          status: "pending"
        }
      ];

      setEarnings(dummyEarnings);

      // 요약 계산
      const completedEarnings = dummyEarnings.filter(e => e.status === 'completed');
      const totalAmount = completedEarnings.reduce((sum, e) => sum + e.totalAmount, 0);
      const totalHours = completedEarnings.reduce((sum, e) => sum + e.duration, 0);

      setSummary({
        total: totalAmount,
        thisWeek: totalAmount * 0.4, // 더미 데이터
        thisMonth: totalAmount * 0.8,
        lastMonth: totalAmount * 0.7,
        averagePerDay: totalAmount / completedEarnings.length,
        totalHours
      });

      setIsLoading(false);
    };

    loadData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'green';
      case 'pending': return 'yellow';
      case 'cancelled': return 'red';
      default: return 'gray';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return '완료';
      case 'pending': return '대기';
      case 'cancelled': return '취소';
      default: return '알 수 없음';
    }
  };

  const filteredEarnings = earnings.filter(earning => {
    if (selectedStatus !== 'all' && earning.status !== selectedStatus) {
      return false;
    }
    return true;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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


        {/* 수익 요약 */}
        <div>
          <Heading size="4" className="mb-4">이번 달 요약</Heading>
          
          {/* 이번 달 정산 예정 카드 */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-sm">
            <Flex align="center" justify="between">
              <Text size="2" color="gray">정산 예정</Text>
                <Flex align="center" gap="2">
                  <Text size="5" weight="bold" style={{ color: 'var(--accent-9)' }}>
                    ₩{summary.thisMonth.toLocaleString()}
                  </Text>
                  <Text size="2" className="text-accent-8 flex items-center gap-1">
                    <TrendingUp size={12} />
                    지난 달 대비 +15%
                  </Text>
                </Flex>
            </Flex>
          </div>

          {/* 시급 및 근무 시간 카드 */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <Flex align="center" justify="between">
              {/* 평균 시급 */}
              <div className="flex-1">
                <Flex align="center" justify="between">
                  <Text size="2" color="gray">평균 시급</Text>
                  <Text size="4" weight="bold">
                    ₩{Math.round(summary.thisMonth / summary.totalHours).toLocaleString()}
                  </Text>
                </Flex>
              </div>
              
              {/* 세로 구분선 */}
              <div className="w-px h-6 bg-gray-300 mx-4"></div>
              
              {/* 총 근무 시간 */}
              <div className="flex-1">
                <Flex align="center" justify="between">
                  <Text size="2" color="gray">총 근무 시간</Text>
                  <Text size="4" weight="bold">
                    {summary.totalHours}시간
                  </Text>
                </Flex>
              </div>
            </Flex>
          </div>
        </div>



        {/* 정산 내역 */}
        <div>
          <Flex justify="between" align="center" className="mb-4">
            <Heading size="4">정산 내역</Heading>
            <Flex gap="3">
              <Select.Root value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <Select.Trigger placeholder="기간 선택" />
                <Select.Content>
                  <Select.Item value="thisWeek">이번 주</Select.Item>
                  <Select.Item value="thisMonth">이번 달</Select.Item>
                  <Select.Item value="lastMonth">지난 달</Select.Item>
                  <Select.Item value="all">전체</Select.Item>
                </Select.Content>
              </Select.Root>

              <Select.Root value={selectedStatus} onValueChange={setSelectedStatus}>
                <Select.Trigger placeholder="상태별 필터" />
                <Select.Content>
                  <Select.Item value="all">전체</Select.Item>
                  <Select.Item value="completed">완료</Select.Item>
                  <Select.Item value="pending">대기</Select.Item>
                  <Select.Item value="cancelled">취소</Select.Item>
                </Select.Content>
              </Select.Root>
            </Flex>
          </Flex>
          
          {filteredEarnings.length > 0 ? (
            <Flex direction="column" gap="3">
              {filteredEarnings.map((earning) => (
                <div key={earning.id} className="bg-white border border-gray-200 rounded-lg p-4">
                  <Flex justify="between" align="start" gap="3">
                    <Flex direction="column" gap="2" className="flex-1">
                      <Flex align="center" gap="2">
                        <Calendar size={16} className="text-gray-500" />
                        <Text size="2" weight="medium">
                          {formatDate(earning.date)}
                        </Text>
                        <Badge color={getStatusColor(earning.status) as any}>
                          {getStatusText(earning.status)}
                        </Badge>
                      </Flex>
                      <Flex align="center" gap="2">
                        <Text size="2">{earning.clientName}</Text>
                      </Flex>
                      <Flex align="center" gap="2">
                        <Clock size={16} className="text-gray-500" />
                        <Text size="2">{earning.duration}시간</Text>
                      </Flex>
                      <Text size="1" color="gray">{earning.serviceType}</Text>
                    </Flex>
                    <Flex direction="column" align="end" gap="1">
                      <Text size="3" weight="bold">
                        ₩{earning.totalAmount.toLocaleString()}
                      </Text>
                      <Text size="1" color="gray">
                        ₩{earning.hourlyRate.toLocaleString()}/시간
                      </Text>
                    </Flex>
                  </Flex>
                </div>
              ))}
            </Flex>
          ) : (
            <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
              <DollarSign size={48} className="text-gray-400 mx-auto mb-3" />
              <Text size="3" color="gray">정산 내역이 없습니다</Text>
              <Text size="2" color="gray">완료된 일정이 정산 내역에 표시됩니다</Text>
            </div>
          )}
        </div>
      </Flex>
    </Container>
  );
}
