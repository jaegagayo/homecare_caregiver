import { Link, useNavigate } from "@remix-run/react";
import {
  Flex,
  Heading,
  Text,
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
  isRegular?: boolean;
  regularSequence?: { current: number; total: number };
}

interface TomorrowPreviewProps {
  schedules: Schedule[];
}

export default function TomorrowPreview({ schedules }: TomorrowPreviewProps) {
  const navigate = useNavigate();
  
  // 내일 날짜 계산
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowString = tomorrow.toISOString().split('T')[0]; // YYYY-MM-DD 형식

  // 내일 일정 필터링 (실제로는 날짜 기반으로 필터링해야 함)
  const tomorrowSchedules = schedules.filter(schedule =>
    schedule.status === 'upcoming' && schedule.isRegular
  );

  const handleScheduleClick = (scheduleId: string) => {
    // 일정 상세 페이지로 이동
    navigate(`/main/schedule-detail?id=${scheduleId}`);
  };

  return (
    <div>
      {/* 헤더 */}
      <div className="mb-4">
        <Heading size="4" className="mb-1">내일 일정 미리보기</Heading>
        <Text size="2" color="gray" className="flex items-center">
            내일로 넘어가는 자정 이후에는 변경이 불가합니다.<br/>필요 시 오늘 안에 확인해 주세요.
        </Text>
      </div>

      {tomorrowSchedules.length > 0 ? (
        <Flex direction="column" gap="3">
          {tomorrowSchedules.map((schedule) => (
            <div
              key={schedule.id}
              className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => handleScheduleClick(schedule.id)}
            >
              <Flex direction="column" gap="3">
                {/* 시간 */}
                <Flex align="center" gap="2">
                  <Clock size={16} className="text-gray-500" />
                  <Text size="2" weight="medium">{schedule.time}</Text>
                </Flex>

                {/* 이용자 */}
                <Flex align="center" gap="2">
                  <User size={16} className="text-gray-500" />
                  <Text size="2">{schedule.clientName}</Text>
                </Flex>

                {/* 위치 */}
                <Flex align="center" gap="2">
                  <MapPin size={16} className="text-gray-500" />
                  <Text size="2" color="gray">{schedule.address}</Text>
                </Flex>

                {/* 정기 배지 */}
                {schedule.isRegular && schedule.regularSequence && (
                  <Badge variant="soft" color="purple" size="1">
                    {schedule.regularSequence.current}회차 (총 {schedule.regularSequence.total}회)
                  </Badge>
                )}
              </Flex>
            </div>
          ))}
        </Flex>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
          <Text color="gray">내일 배정된 일정이 없습니다.</Text>
        </div>
      )}
    </div>
  );
}
