import { useNavigate } from "@remix-run/react";
import {
  Flex,
  Heading,
  Text,
  Badge
} from "@radix-ui/themes";
import {
  Clock,
  MapPin
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

interface ScheduleListProps {
  schedules: Schedule[];
  title?: string;
  subtitle?: string;
  filterFunction?: (schedule: Schedule) => boolean;
  showStatus?: boolean;
  getStatusColor?: (status: string) => string;
  getStatusText?: (status: string) => string;
  onClickSchedule?: (scheduleId: string) => void;
  emptyMessage?: string;
}

export default function ScheduleList({ 
  schedules, 
  title, 
  subtitle,
  filterFunction,
  showStatus = true,
  getStatusColor,
  getStatusText,
  onClickSchedule,
  emptyMessage = "일정이 없습니다."
}: ScheduleListProps) {
  const navigate = useNavigate();

  // 필터링된 일정들
  const filteredSchedules = filterFunction ? schedules.filter(filterFunction) : schedules;

  // 소요 시간 계산 함수
  const calculateDuration = (timeString: string) => {
    const [startTime, endTime] = timeString.split(' - ');
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    
    let durationMinutes = (endHour * 60 + endMinute) - (startHour * 60 + startMinute);
    
    if (durationMinutes < 0) {
      durationMinutes += 24 * 60; // 자정을 넘어가는 경우
    }
    
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;
    
    if (hours > 0 && minutes > 0) {
      return `${hours}시간 ${minutes}분`;
    } else if (hours > 0) {
      return `${hours}시간`;
    } else {
      return `${minutes}분`;
    }
  };

  // 시간 포맷팅 함수 (시작:시각 (~ 종료:시각) 형식)
  const formatTime = (timeString: string) => {
    const [startTime, endTime] = timeString.split(' - ');
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);
    
    const startPeriod = startHours >= 12 ? 'PM' : 'AM';
    const endPeriod = endHours >= 12 ? 'PM' : 'AM';
    
    const startDisplayHours = startHours === 0 ? 12 : startHours > 12 ? startHours - 12 : startHours;
    const endDisplayHours = endHours === 0 ? 12 : endHours > 12 ? endHours - 12 : endHours;
    
    const startFormatted = `${startDisplayHours.toString().padStart(2, '0')}:${startMinutes.toString().padStart(2, '0')} ${startPeriod}`;
    const endFormatted = `${endDisplayHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')} ${endPeriod}`;
    
    return { start: startFormatted, end: endFormatted };
  };

  const handleScheduleClick = (scheduleId: string) => {
    if (onClickSchedule) {
      onClickSchedule(scheduleId);
    } else {
      // 기본 동작: 상세 페이지로 이동
      navigate(`/main/schedule-detail?id=${scheduleId}`);
    }
  };

  return (
    <div>
      {/* 헤더 */}
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <Heading size="4" className="mb-1">{title}</Heading>}
          {subtitle && (
            <Text size="2" color="gray" className="flex items-center">
              {subtitle}
            </Text>
          )}
        </div>
      )}

      {filteredSchedules.length > 0 ? (
        <Flex direction="column" gap="3">
          {filteredSchedules.map((schedule) => {
            const timeInfo = formatTime(schedule.time);
            
            return (
              <div
                key={schedule.id} 
                className={`p-4 ${onClickSchedule ? 'cursor-pointer hover:bg-gray-50 transition-colors' : ''}`}
                onClick={() => handleScheduleClick(schedule.id)}
              >
                <Flex justify="between" align="center" gap="4">
                  {/* 왼쪽: 시간 */}
                  <div className="w-20">
                    <Flex direction="column" gap="0">
                      <Text size="3" weight="medium" className="text-gray-900">
                        {timeInfo.start}
                      </Text>
                      <Text size="1" color="gray" className="text-xs">
                        (~ {timeInfo.end})
                      </Text>
                    </Flex>
                  </div>

                  {/* 세로 구분선 */}
                  <div className="w-px h-12 bg-gray-200"></div>

                  {/* 중앙: 주요 정보 */}
                  <Flex direction="column" gap="2" className="flex-1">
                    {/* 고객명과 상태 */}
                    <Flex align="center" gap="3">
                      <Text size="3" weight="medium">{schedule.clientName} 님</Text>
                      {showStatus && (
                        <>
                          {getStatusColor && getStatusText ? (
                            <Badge 
                              color={getStatusColor(schedule.status) as "blue" | "green" | "red" | "gray"}
                              className="text-xs"
                            >
                              {getStatusText(schedule.status)}
                            </Badge>
                          ) : (
                            <Badge color="blue" className="text-xs">
                              예정
                            </Badge>
                          )}
                        </>
                      )}
                      {schedule.isRegular && schedule.regularSequence && (
                        <Badge variant="soft" color="purple" className="text-xs">
                          {schedule.regularSequence.current}회차 (총 {schedule.regularSequence.total}회)
                        </Badge>
                      )}
                    </Flex>

                    {/* 주소와 소요 시간 - 세로 배치 */}
                    <Flex direction="column" gap="1">
                      <Flex align="center" gap="1">
                        <MapPin size={14} className="text-gray-500" />
                        <Text size="2" color="gray">{schedule.address}</Text>
                      </Flex>
                      <Flex align="center" gap="1">
                        <Clock size={14} className="text-gray-500" />
                        <Text size="2" color="gray">{calculateDuration(schedule.time)}</Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
              </div>
            );
          })}
        </Flex>
      ) : (
        <div className="p-8 text-center">
          <Text color="gray">{emptyMessage}</Text>
        </div>
      )}
    </div>
  );
}
