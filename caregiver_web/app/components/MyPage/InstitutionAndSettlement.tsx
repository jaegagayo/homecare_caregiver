import { useState, useEffect } from "react";
import { 
  Container, 
  Flex, 
  Heading, 
  Text, 
  Badge,
  Select,
  Separator
} from "@radix-ui/themes";
import { 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  Clock,
  Building,
  MapPin
} from "lucide-react";
import {
  CaregiverCenterSettlementResponse,
  SettlementByCaregiverResponse
} from "../../types";

// 정산 요약 데이터 타입
interface SettlementOverview {
  totalAmount: number;
  completedCount: number;
  plannedCount: number;
  totalHours: number;
  totalDistance: number;
}

export default function InstitutionAndSettlement() {
  const [settlementData, setSettlementData] = useState<CaregiverCenterSettlementResponse[]>([]);
  const [summary, setSummary] = useState<SettlementOverview>({
    totalAmount: 0,
    completedCount: 0,
    plannedCount: 0,
    totalHours: 0,
    totalDistance: 0
  });
  const [selectedPeriod, setSelectedPeriod] = useState<string>('thisMonth');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 더미 데이터 로드 (나중에 실제 API로 교체 예정)
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 백엔드 구조에 맞는 더미 데이터
      const dummySettlementData: CaregiverCenterSettlementResponse[] = [
        {
          centerName: "행복요양센터",
          settlements: [
            {
              centerName: "행복요양센터",
              settlementId: "1",
              caregiverName: "김영희",
              serviceDate: "2024-01-15",
              serviceStartTime: "09:00:00",
              serviceEndTime: "11:00:00",
              settlementAmount: 30000,
              distanceLog: 5.2,
              isPaid: true
            },
            {
              centerName: "행복요양센터",
              settlementId: "2",
              caregiverName: "박철수",
              serviceDate: "2024-01-14",
              serviceStartTime: "14:00:00",
              serviceEndTime: "17:00:00",
              settlementAmount: 45000,
              distanceLog: 8.1,
              isPaid: true
            },
            {
              centerName: "행복요양센터",
              settlementId: "3",
              caregiverName: "이순자",
              serviceDate: "2024-01-13",
              serviceStartTime: "10:00:00",
              serviceEndTime: "12:00:00",
              settlementAmount: 30000,
              distanceLog: 3.8,
              isPaid: false
            }
          ]
        },
        {
          centerName: "사랑요양센터",
          settlements: [
            {
              centerName: "사랑요양센터",
              settlementId: "4",
              caregiverName: "최민수",
              serviceDate: "2024-01-12",
              serviceStartTime: "13:00:00",
              serviceEndTime: "17:00:00",
              settlementAmount: 60000,
              distanceLog: 12.5,
              isPaid: true
            },
            {
              centerName: "사랑요양센터",
              settlementId: "5",
              caregiverName: "정영수",
              serviceDate: "2024-01-11",
              serviceStartTime: "08:00:00",
              serviceEndTime: "10:00:00",
              settlementAmount: 30000,
              distanceLog: 4.2,
              isPaid: false
            }
          ]
        },
        {
          centerName: "희망요양센터",
          settlements: [
            {
              centerName: "희망요양센터",
              settlementId: "6",
              caregiverName: "한미라",
              serviceDate: "2024-01-10",
              serviceStartTime: "15:00:00",
              serviceEndTime: "18:00:00",
              settlementAmount: 45000,
              distanceLog: 6.8,
              isPaid: true
            }
          ]
        }
      ];

      setSettlementData(dummySettlementData);

      // 요약 계산
      const allSettlements = dummySettlementData.flatMap(center => center.settlements);
      const totalAmount = allSettlements.reduce((sum, s) => sum + s.settlementAmount, 0);
      const completedCount = allSettlements.filter(s => s.isPaid).length;
      const plannedCount = allSettlements.filter(s => !s.isPaid).length;
      const totalHours = allSettlements.reduce((sum, s) => sum + calculateDuration(s.serviceStartTime, s.serviceEndTime), 0);
      const totalDistance = allSettlements.reduce((sum, s) => sum + s.distanceLog, 0);

      setSummary({
        totalAmount,
        completedCount,
        plannedCount,
        totalHours,
        totalDistance
      });

      setIsLoading(false);
    };

    loadData();
  }, []);

  const getStatusColor = (isPaid: boolean) => {
    return isPaid ? 'green' : 'yellow';
  };

  const getStatusText = (isPaid: boolean) => {
    return isPaid ? '완료' : '대기';
  };

  const filteredSettlementData = settlementData.map(center => ({
    ...center,
    settlements: center.settlements.filter(settlement => {
      if (selectedStatus !== 'all') {
        if (selectedStatus === 'completed' && !settlement.isPaid) return false;
        if (selectedStatus === 'pending' && settlement.isPaid) return false;
      }
      return true;
    })
  })).filter(center => center.settlements.length > 0);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return timeString.substring(0, 5); // HH:MM 형식으로 변환
  };

  const calculateDuration = (startTime: string, endTime: string) => {
    const start = new Date(`2000-01-01T${startTime}`);
    const end = new Date(`2000-01-01T${endTime}`);
    const diffMs = end.getTime() - start.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    return Math.round(diffHours * 10) / 10; // 소수점 첫째자리까지
  };

  const calculateCenterSummary = (settlements: SettlementByCaregiverResponse[]) => {
    const totalAmount = settlements.reduce((sum, s) => sum + s.settlementAmount, 0);
    const completedCount = settlements.filter(s => s.isPaid).length;
    const totalHours = settlements.reduce((sum, s) => sum + calculateDuration(s.serviceStartTime, s.serviceEndTime), 0);
    const totalDistance = settlements.reduce((sum, s) => sum + s.distanceLog, 0);
    
    return { totalAmount, completedCount, totalHours, totalDistance };
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
        <Flex direction="column" gap="1">
          <Heading size="4">기관 및 정산 내역</Heading>
          <Text size="2" color="gray">
            근무한 기관과 정산 내역을 확인할 수 있습니다.
          </Text>
        </Flex>

        {/* 전체 요약 */}
        <div>
          <Heading size="4" className="mb-4">전체 요약</Heading>
          
          {/* 전체 정산 현황 카드 */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-sm">
            <Flex align="center" justify="between">
              <Text size="2" color="gray">총 정산 금액</Text>
              <Flex align="center" gap="2">
                <Text size="5" weight="bold" style={{ color: 'var(--accent-9)' }}>
                  ₩{summary.totalAmount.toLocaleString()}
                </Text>
                <Text size="2" className="text-accent-8 flex items-center gap-1">
                  <TrendingUp size={12} />
                  완료: {summary.completedCount}건, 대기: {summary.plannedCount}건
                </Text>
              </Flex>
            </Flex>
          </div>

          {/* 통계 카드들 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <Flex direction="column" gap="1">
                <Text size="1" color="gray">총 근무 시간</Text>
                <Text size="3" weight="bold">{summary.totalHours}시간</Text>
              </Flex>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <Flex direction="column" gap="1">
                <Text size="1" color="gray">총 이동 거리</Text>
                <Text size="3" weight="bold">{summary.totalDistance.toFixed(1)}km</Text>
              </Flex>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <Flex direction="column" gap="1">
                <Text size="1" color="gray">정산 완료</Text>
                <Text size="3" weight="bold">{summary.completedCount}건</Text>
              </Flex>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <Flex direction="column" gap="1">
                <Text size="1" color="gray">정산 대기</Text>
                <Text size="3" weight="bold">{summary.plannedCount}건</Text>
              </Flex>
            </div>
          </div>
        </div>

        {/* 필터 */}
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
                </Select.Content>
              </Select.Root>
            </Flex>
          </Flex>
          
          {filteredSettlementData.length > 0 ? (
            <Flex direction="column" gap="6">
              {filteredSettlementData.map((center, centerIndex) => {
                const centerSummary = calculateCenterSummary(center.settlements);
                
                return (
                  <div key={centerIndex} className="bg-white border border-gray-200 rounded-lg shadow-sm">
                    {/* 센터 헤더 */}
                    <div className="p-4 border-b border-gray-100 bg-gray-50">
                      <Flex justify="between" align="center">
                        <Flex align="center" gap="2">
                          <Building size={20} className="text-blue-600" />
                          <Heading size="3">{center.centerName}</Heading>
                        </Flex>
                        <Flex gap="4" className="text-sm text-gray-600">
                          <Text>총 {center.settlements.length}건</Text>
                          <Text>₩{centerSummary.totalAmount.toLocaleString()}</Text>
                          <Text>{centerSummary.totalHours}시간</Text>
                        </Flex>
                      </Flex>
                    </div>
                    
                    {/* 센터별 정산 내역 */}
                    <div className="p-4">
                      <Flex direction="column" gap="3">
                        {center.settlements.map((settlement) => (
                          <div key={settlement.settlementId} className="border border-gray-100 rounded-lg p-3 hover:bg-gray-50">
                            <Flex justify="between" align="start" gap="3">
                              <Flex direction="column" gap="2" className="flex-1">
                                <Flex align="center" gap="2">
                                  <Calendar size={16} className="text-gray-500" />
                                  <Text size="2" weight="medium">
                                    {formatDate(settlement.serviceDate)}
                                  </Text>
                                  <Badge color={getStatusColor(settlement.isPaid) as 'green' | 'yellow'}>
                                    {getStatusText(settlement.isPaid)}
                                  </Badge>
                                </Flex>
                                
                                <Flex align="center" gap="2">
                                  <Clock size={16} className="text-gray-500" />
                                  <Text size="2">
                                    {formatTime(settlement.serviceStartTime)} - {formatTime(settlement.serviceEndTime)} 
                                    ({calculateDuration(settlement.serviceStartTime, settlement.serviceEndTime)}시간)
                                  </Text>
                                </Flex>
                                
                                <Flex align="center" gap="2">
                                  <MapPin size={16} className="text-gray-500" />
                                  <Text size="2" color="gray">이동 거리: {settlement.distanceLog}km</Text>
                                </Flex>
                              </Flex>
                              
                              <Flex direction="column" align="end" gap="1">
                                <Text size="3" weight="bold">
                                  ₩{settlement.settlementAmount.toLocaleString()}
                                </Text>
                                <Text size="1" color="gray">
                                  {calculateDuration(settlement.serviceStartTime, settlement.serviceEndTime)}시간 근무
                                </Text>
                              </Flex>
                            </Flex>
                          </div>
                        ))}
                      </Flex>
                    </div>
                  </div>
                );
              })}
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
