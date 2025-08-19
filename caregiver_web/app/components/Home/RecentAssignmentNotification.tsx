import { useState } from "react";
import { useNavigate } from "@remix-run/react";
import { 
  Flex, 
  Text,
  Badge,
  Heading,
  Button
} from "@radix-ui/themes";
import { Info, Calendar, User, MapPin, ChevronLeft, ChevronRight } from "lucide-react";

interface RecentAssignment {
  id: string;
  date: string;
  time: string;
  applicantName: string;
  location: string;
  institutionId?: string;
  isInstitutionSelected: boolean;
}

interface RecentAssignmentNotificationProps {
  assignments: RecentAssignment[];
}

export default function RecentAssignmentNotification({ assignments }: RecentAssignmentNotificationProps) {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  // 최근 배정된 건이 없으면 카드 미노출
  if (assignments.length === 0) {
    return null;
  }

  const handleCardClick = (assignment: RecentAssignment) => {
    if (!assignment.isInstitutionSelected) {
      // 기관이 선택되지 않은 경우 기관 선택 페이지로 이동
      navigate(`/main/institution-selection?assignmentId=${assignment.id}`);
    } else {
      // 기관이 이미 지정된 경우 일정 상세 페이지로 이동
      navigate(`/main/schedule-detail?id=${assignment.id}`);
    }
  };

  const handlePrevious = () => {
    setCurrentIndex(prev => prev > 0 ? prev - 1 : assignments.length - 1);
  };

  const handleNext = () => {
    setCurrentIndex(prev => prev < assignments.length - 1 ? prev + 1 : 0);
  };

  const currentAssignment = assignments[currentIndex];

  return (
    <div>
      <Flex align="center" justify="between" className="mb-4">
        <Heading size="4">최근 배정 알림</Heading>
        {assignments.length > 1 && (
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
              {currentIndex + 1} / {assignments.length}
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

      <div 
        className="bg-white rounded-lg p-6 border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => handleCardClick(currentAssignment)}
      >
        <Flex direction="column" gap="4">
          {/* 안내 문구 */}
          <Flex align="center" gap="2">
            <Info size={20} className="text-blue-500" />
            <Text size="3" color="gray">
              새로운 일정이 배정되었습니다.
            </Text>
          </Flex>

          {/* 일정 요약 */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <Flex align="center" gap="2">
              <Calendar size={16} className="text-gray-500" />
              <Text size="3" weight="medium">{currentAssignment.date} {currentAssignment.time}</Text>
            </Flex>
            <Flex align="center" gap="2">
              <User size={16} className="text-gray-500" />
              <Text size="3" weight="medium">{currentAssignment.applicantName}</Text>
            </Flex>
            <Flex align="center" gap="2">
              <MapPin size={16} className="text-gray-500" />
              <Text size="3" weight="medium">{currentAssignment.location}</Text>
            </Flex>
          </div>

          {/* 기관 선택 상태 표시 */}
          {!currentAssignment.isInstitutionSelected && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <Text size="2" color="yellow" className="flex items-center gap-2">
                <span className="text-yellow-600">⚠️</span>
                기관 선택이 필요합니다. 카드를 클릭하여 기관을 선택해 주세요.
              </Text>
            </div>
          )}
        </Flex>
      </div>
    </div>
  );
}
