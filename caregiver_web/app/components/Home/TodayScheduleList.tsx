import { useState } from "react";
import { Link } from "@remix-run/react";
import { 
  Flex, 
  Heading, 
  Text, 
  Button,
  Badge
} from "@radix-ui/themes";
import { 
  Clock, 
  MapPin, 
  User,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import UpcomingScheduleCard from "./UpcomingScheduleCard";

interface Schedule {
  id: string;
  time: string;
  clientName: string;
  address: string;
  serviceType: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  isRegular?: boolean;
  regularSequence?: { current: number; total: number };
}

interface TodayScheduleListProps {
  schedules: Schedule[];
  getStatusColor: (status: string) => string;
  getStatusText: (status: string) => string;
  calculateTimeRemaining: (timeString: string) => string;
}

export default function TodayScheduleList({ schedules, getStatusColor, getStatusText, calculateTimeRemaining }: TodayScheduleListProps) {
  const [expandedScheduleId, setExpandedScheduleId] = useState<string | null>(
    schedules.length > 0 ? schedules[0].id : null
  );

  const toggleExpanded = (scheduleId: string) => {
    setExpandedScheduleId(expandedScheduleId === scheduleId ? null : scheduleId);
  };

  return (
    <div>
      <Flex justify="between" align="center" className="mb-4">
        <Heading size="4">
          오늘의 일정 ({new Date().toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })})
        </Heading>
        <Link to="/main/schedule">
          <Button variant="ghost" size="2">전체보기</Button>
        </Link>
      </Flex>
      
      {schedules.length > 0 ? (
        <Flex direction="column" gap="3">
          {schedules.map((schedule) => {
            const isExpanded = expandedScheduleId === schedule.id;
            
            return (
              <div key={schedule.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                {isExpanded ? (
                  /* 확장된 상세 정보 */
                  <UpcomingScheduleCard 
                    schedule={schedule}
                    calculateTimeRemaining={calculateTimeRemaining}
                    onToggleExpanded={() => toggleExpanded(schedule.id)}
                  />
                ) : (
                  /* 간략한 정보 */
                  <div className="p-4">
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
                        <Badge color="blue" size="1">{schedule.serviceType}</Badge>
                        {schedule.isRegular && schedule.regularSequence && (
                          <Badge variant="soft" color="purple" size="1">
                            {schedule.regularSequence.current}회차 (총 {schedule.regularSequence.total}회)
                          </Badge>
                        )}
                      </Flex>
                      <Button 
                        variant="ghost" 
                        size="2" 
                        onClick={() => toggleExpanded(schedule.id)}
                        className="flex items-center gap-1"
                      >
                        <ChevronDown size={16} />
                        <Text size="2">자세히 보기</Text>
                      </Button>
                    </Flex>
                  </div>
                )}
              </div>
            );
          })}
        </Flex>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
          <Text color="gray">오늘 예정된 일정이 없습니다.</Text>
        </div>
      )}
    </div>
  );
}
