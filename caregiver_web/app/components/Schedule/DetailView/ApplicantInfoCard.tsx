import { Flex, Text, Badge, Card } from '@radix-ui/themes';
import { Calendar, Clock } from 'lucide-react';
import { CaregiverScheduleDetailResponse } from '../../../types';
import { getStatusColor, getStatusText } from '../../../utils';

interface ApplicantInfoCardProps {
  schedule: CaregiverScheduleDetailResponse;
}

export default function ApplicantInfoCard({ schedule }: ApplicantInfoCardProps) {
  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    const weekday = weekdays[date.getDay()];
    return `${year}년 ${month}월 ${day}일 (${weekday})`;
  };

  // 시간 포맷팅 함수
  const formatTime = (startTime: string, endTime: string) => {
    return `${startTime} - ${endTime}`;
  };

  return (
    <Card className="p-4">
      <Flex direction="column" gap="3">
        {/* 신청자 이름과 상태 정보 */}
        <Flex justify="between" align="center">
          <Text size="4" weight="bold">{schedule.consumerName} 님</Text>
          <Badge color={getStatusColor(schedule.matchStatus) as 'orange' | 'red' | 'blue' | 'green' | 'gray'}>
            {getStatusText(schedule.matchStatus)}
          </Badge>
        </Flex>

        {/* 날짜와 시간 */}
        <div className="space-y-2">
          <Flex align="center" gap="2">
            <Calendar size={16} style={{ color: 'var(--accent-9)' }} />
            <Text size="2" color="gray">{formatDate(schedule.serviceDate)}</Text>
          </Flex>
          <Flex align="center" gap="2">
            <Clock size={16} style={{ color: 'var(--accent-9)' }} />
            <Text size="2" color="gray">{formatTime(schedule.serviceStartTime, schedule.serviceEndTime)} ({schedule.duration}시간)</Text>
          </Flex>
        </div>
      </Flex>
    </Card>
  );
}
