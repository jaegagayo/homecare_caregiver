import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "@remix-run/react";
import { 
  Container, 
  Flex, 
  Text, 
  Button,
  Heading,
  Card,
  Badge
} from "@radix-ui/themes";
import { 
  User,
  MapPin
} from "lucide-react";

interface RegularProposal {
  id: string;
  applicantName: string;
  period: string;
  totalSessions: number;
  dayOfWeek: string;
  timeSlot: string;
  address: string;
  serviceType: string;
  specialRequests?: string;
  status: 'pending' | 'approved' | 'rejected';
}

export default function RegularProposalDetailPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const proposalId = searchParams.get('id');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [proposal, setProposal] = useState<RegularProposal | null>(null);

  // 정기 제안 데이터 로드
  useEffect(() => {
    if (proposalId) {
      // 더미 데이터 - 실제로는 API에서 proposalId로 데이터를 가져와야 함
      const mockProposal: RegularProposal = {
        id: proposalId,
        applicantName: "이미라",
        period: "2025년 8월 20일 ~ 2025년 12월 31일",
        totalSessions: 20,
        dayOfWeek: "월요일, 수요일, 금요일",
        timeSlot: "09:00 - 11:00",
        address: "서울시 강남구 테헤란로 123",
        serviceType: "방문요양",
        specialRequests: "부드럽고 친절한 서비스 부탁드립니다.",
        status: "pending"
      };

      setProposal(mockProposal);
    }
  }, [proposalId]);

  const handleApprove = async () => {
    if (!proposal) return;

    setIsSubmitting(true);
    
    try {
      // TODO: 정기 제안 승인 API 호출
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('정기 제안을 승인했습니다.');
      navigate('/main/home');
    } catch (error) {
      alert('정기 제안 승인 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (!proposal) return;

    setIsSubmitting(true);
    
    try {
      // TODO: 정기 제안 거절 API 호출
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('정기 제안을 거절했습니다.');
      navigate('/main/home');
    } catch (error) {
      alert('정기 제안 거절 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!proposal) {
    return (
      <Container size="2" className="p-4">
        <Flex direction="column" align="center" gap="4" className="py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <Text>정기 제안 정보를 불러오는 중...</Text>
        </Flex>
      </Container>
    );
  }

  return (
    <Container size="2" className="p-4">
      <Flex direction="column" gap="6">
        {/* 헤더 */}
        <div>
          <Heading size="5">정기 제안 상세</Heading>
          <Text size="3" color="gray">
            정기 제안 내용을 확인하고 승인 또는 거절할 수 있습니다.
          </Text>
        </div>

        {/* 신청자 정보 */}
        <div>
          <div className="mb-4">
            <Heading size="3">신청자 정보</Heading>
          </div>
          <Card className="p-4">
            <Flex direction="column" gap="4">
              <Flex align="center" gap="2">
                <User size={16} className="text-gray-500" />
                <Text size="3" weight="medium">{proposal.applicantName}</Text>
              </Flex>
              <Flex align="center" gap="2">
                <MapPin size={16} className="text-gray-500" />
                <Text size="2">{proposal.address}</Text>
              </Flex>
            </Flex>
          </Card>
        </div>

        {/* 서비스 정보 */}
        <div>
          <div className="mb-4">
            <Heading size="3">서비스 정보</Heading>
          </div>
          <Card className="p-4">
            <Flex direction="column" gap="4">
              <Flex justify="between" align="center">
                <Text size="2" weight="medium">서비스 유형</Text>
                <Badge color="blue">{proposal.serviceType}</Badge>
              </Flex>
              <div className="w-full h-px bg-gray-200"></div>
              <Flex justify="between" align="center">
                <Text size="2" weight="medium">서비스 기간</Text>
                <Text size="2">{proposal.period}</Text>
              </Flex>
              <div className="w-full h-px bg-gray-200"></div>
              <Flex justify="between" align="center">
                <Text size="2" weight="medium">총 회차</Text>
                <Text size="2">{proposal.totalSessions}회</Text>
              </Flex>
              <div className="w-full h-px bg-gray-200"></div>
              <Flex justify="between" align="center">
                <Text size="2" weight="medium">서비스 요일</Text>
                <Text size="2">{proposal.dayOfWeek}</Text>
              </Flex>
              <div className="w-full h-px bg-gray-200"></div>
              <Flex justify="between" align="center">
                <Text size="2" weight="medium">서비스 시간</Text>
                <Text size="2">{proposal.timeSlot}</Text>
              </Flex>
            </Flex>
          </Card>
        </div>

        {/* 특별 요청사항 */}
        {proposal.specialRequests && (
          <div>
            <div className="mb-4">
              <Heading size="3">특별 요청사항</Heading>
            </div>
            <Card className="p-4">
              <Text size="2">{proposal.specialRequests}</Text>
            </Card>
          </div>
        )}

        {/* 예상 수익 */}
        <div>
          <div className="mb-4">
            <Heading size="3">예상 수익</Heading>
          </div>
          <Card className="p-4">
            <Flex direction="column" gap="2">
              <Flex justify="between">
                <Text size="2" color="gray">시급</Text>
                <Text size="2">15,000원</Text>
              </Flex>
              <Flex justify="between">
                <Text size="2" color="gray">서비스 시간</Text>
                <Text size="2">{proposal.timeSlot}</Text>
              </Flex>
              <Flex justify="between">
                <Text size="2" color="gray">1회 수익</Text>
                <Text size="2">{(() => {
                  const [startTime, endTime] = proposal.timeSlot.split(' - ');
                  const [startHour, startMinute] = startTime.split(':').map(Number);
                  const [endHour, endMinute] = endTime.split(':').map(Number);
                  const duration = (endHour * 60 + endMinute) - (startHour * 60 + startMinute);
                  return (15000 * duration / 60).toLocaleString();
                })()}원</Text>
              </Flex>
              <div className="w-full h-px bg-gray-200 my-2"></div>
              <Flex justify="between">
                <Text size="3" weight="medium">총 예상 수익</Text>
                <Text size="3" weight="medium" color="blue">
                  {(() => {
                    const [startTime, endTime] = proposal.timeSlot.split(' - ');
                    const [startHour, startMinute] = startTime.split(':').map(Number);
                    const [endHour, endMinute] = endTime.split(':').map(Number);
                    const duration = (endHour * 60 + endMinute) - (startHour * 60 + startMinute);
                    return (15000 * duration / 60 * proposal.totalSessions).toLocaleString();
                  })()}원
                </Text>
              </Flex>
            </Flex>
          </Card>
        </div>

        {/* 액션 버튼 */}
        <Flex gap="3">
          <Button 
            variant="outline"
            color="red"
            onClick={handleReject}
            disabled={isSubmitting}
            className="flex-1"
          >
            {isSubmitting ? '처리 중...' : '거절'}
          </Button>
          <Button 
            onClick={handleApprove}
            disabled={isSubmitting}
            className="flex-1"
          >
            {isSubmitting ? '처리 중...' : '승인'}
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
}
