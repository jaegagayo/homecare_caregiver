import { useState } from "react";
import { useNavigate } from "@remix-run/react";
import { 
  Flex, 
  Text,
  Badge,
  Heading,
  Button
} from "@radix-ui/themes";
import { Info, Calendar, User, ChevronLeft, ChevronRight } from "lucide-react";

interface RegularProposal {
  id: string;
  applicantName: string;
  period: string;
  totalSessions: number;
  dayOfWeek: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface RegularProposalNotificationProps {
  proposals: RegularProposal[];
}

export default function RegularProposalNotification({ proposals }: RegularProposalNotificationProps) {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  // 승인 대기 중인 제안만 필터링
  const pendingProposals = proposals.filter(proposal => proposal.status === 'pending');

  // 승인 대기 제안이 없으면 카드 미노출
  if (pendingProposals.length === 0) {
    return null;
  }

  const handleViewDetails = (proposal: RegularProposal) => {
    navigate(`/main/regular-proposal-detail?id=${proposal.id}`);
  };

  const handlePrevious = () => {
    setCurrentIndex(prev => prev > 0 ? prev - 1 : pendingProposals.length - 1);
  };

  const handleNext = () => {
    setCurrentIndex(prev => prev < pendingProposals.length - 1 ? prev + 1 : 0);
  };

  const currentProposal = pendingProposals[currentIndex];

  return (
    <div>
      <Flex align="center" justify="between" className="mb-4">
        <Heading size="4">정기 제안 알림</Heading>
        {pendingProposals.length > 1 && (
          <Flex align="center" gap="4">
            <Button 
              variant="ghost" 
              size="3" 
              onClick={handlePrevious}
              className="p-2"
            >
              <ChevronLeft size={20} />
            </Button>
            <Text size="4" color="gray" className="tracking-widest">
              {currentIndex + 1} / {pendingProposals.length}
            </Text>
            <Button 
              variant="ghost" 
              size="3" 
              onClick={handleNext}
              className="p-2"
            >
              <ChevronRight size={20} />
            </Button>
          </Flex>
        )}
      </Flex>

      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <Flex direction="column" gap="4">
          {/* 안내 문구 */}
          <Flex align="center" gap="2">
            <Info size={20} className="text-blue-500" />
            <Text size="3" color="gray">
              새로운 정기 제안이 도착했습니다. 확인 후 승인 또는 거절할 수 있습니다.
            </Text>
          </Flex>

          {/* 요약 정보 */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <Flex align="center" gap="2">
              <User size={16} className="text-gray-500" />
              <Text size="3" weight="medium">{currentProposal.applicantName}</Text>
            </Flex>
            <Flex align="center" gap="2">
              <Calendar size={16} className="text-gray-500" />
              <Text size="3" weight="medium">{currentProposal.period}</Text>
            </Flex>
            <Flex align="center" gap="2">
              <Info size={16} className="text-gray-500" />
              <Text size="3" weight="medium">총 {currentProposal.totalSessions}회차</Text>
            </Flex>
            <Flex align="center" gap="2">
              <Calendar size={16} className="text-gray-500" />
              <Text size="3" weight="medium">{currentProposal.dayOfWeek}</Text>
            </Flex>
          </div>

          {/* CTA 버튼 */}
          <Button 
            className="w-full"
            onClick={() => handleViewDetails(currentProposal)}
          >
            상세 보기
          </Button>
        </Flex>
      </div>
    </div>
  );
}
