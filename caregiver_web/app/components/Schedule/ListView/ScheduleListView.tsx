import { useState } from 'react';
import { useNavigate } from '@remix-run/react';
import { Flex, Select, Text, Heading } from '@radix-ui/themes';
import { ScheduleList } from '../../Common';
import { getStatusColor, getStatusText } from '../../../utils/scheduleStatus';

interface Schedule {
  id: string;
  date: string;
  time: string;
  clientName: string;
  address: string;
  serviceType: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  duration: number;
  hourlyRate: number;
  isRegular?: boolean;
  regularSequence?: { current: number; total: number };
}

interface ScheduleListViewProps {
  schedules: Schedule[];
}

export default function ScheduleListView({ schedules }: ScheduleListViewProps) {
  const [selectedFilter, setSelectedFilter] = useState<'scheduled-all' | 'scheduled-regular' | 'completed'>('scheduled-all');
  const navigate = useNavigate();

  // 필터별 일정 분류
  const getFilteredSchedules = () => {
    const now = new Date();
    
    switch (selectedFilter) {
      case 'scheduled-all':
        return schedules.filter(s => {
          const scheduleDateTime = new Date(`${s.date} ${s.time.split(' - ')[0]}`);
          return (s.status === 'scheduled') && scheduleDateTime > now;
        });
      case 'scheduled-regular':
        return schedules.filter(s => {
          const scheduleDateTime = new Date(`${s.date} ${s.time.split(' - ')[0]}`);
          return (s.status === 'scheduled') && s.isRegular && scheduleDateTime > now;
        });
      case 'completed':
        return schedules.filter(s => s.status === 'completed');
      default:
        return schedules;
    }
  };

  const filteredSchedules = getFilteredSchedules();

  // 정렬: 예정은 다가오는 순, 완료는 최근 순
  const sortedSchedules = [...filteredSchedules].sort((a, b) => {
    if (selectedFilter === 'completed') {
      // 완료된 일정은 최근 순 (역순)
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      // 예정된 일정은 다가오는 순
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
  });



  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    const weekday = weekdays[date.getDay()];
    return `${month}월 ${day}일 (${weekday})`;
  };

  const handleScheduleClick = (scheduleId: string) => {
    navigate(`/main/schedule-detail?id=${scheduleId}`);
  };

  return (
    <Flex direction="column" gap="4">
      {/* 필터 Select */}
      <Select.Root value={selectedFilter} onValueChange={(value) => setSelectedFilter(value as 'scheduled-all' | 'scheduled-regular' | 'completed')}>
        <Select.Trigger placeholder="필터 선택" />
        <Select.Content>
          <Select.Item value="scheduled-all">
            예정-전체 ({schedules.filter(s => {
              const now = new Date();
              const scheduleDateTime = new Date(`${s.date} ${s.time.split(' - ')[0]}`);
              return (s.status === 'scheduled') && scheduleDateTime > now;
            }).length})
          </Select.Item>
          <Select.Item value="scheduled-regular">
            예정-정기 ({schedules.filter(s => {
              const now = new Date();
              const scheduleDateTime = new Date(`${s.date} ${s.time.split(' - ')[0]}`);
              return (s.status === 'scheduled') && s.isRegular && scheduleDateTime > now;
            }).length})
          </Select.Item>
          <Select.Item value="completed">
            완료 ({schedules.filter(s => s.status === 'completed').length})
          </Select.Item>
        </Select.Content>
      </Select.Root>

      {/* 일정 리스트 */}
      {sortedSchedules.length === 0 ? (
        <div className="p-8 text-center">
          <Text color="gray" size="3">
            {selectedFilter === 'completed' ? '완료된 일정이 없습니다.' : '예정된 일정이 없습니다.'}
          </Text>
        </div>
      ) : (
        (() => {
          // 날짜별로 그룹화
          const groupedSchedules = sortedSchedules.reduce((groups, schedule) => {
            const date = schedule.date;
            if (!groups[date]) {
              groups[date] = [];
            }
            groups[date].push(schedule);
            return groups;
          }, {} as Record<string, Schedule[]>);

          return Object.entries(groupedSchedules).map(([date, daySchedules]) => (
            <div key={date}>
              {/* 날짜 헤더 */}
              <div className="mb-3 mt-4 first:mt-0">
                <Heading size="4">{formatDate(date)}</Heading>
              </div>
              
              {/* 해당 날짜의 일정 리스트 */}
              <ScheduleList
                schedules={daySchedules}
                showStatus={true}
                getStatusColor={getStatusColor}
                getStatusText={getStatusText}
                onClickSchedule={handleScheduleClick}
              />
            </div>
          ));
        })()
      )}
    </Flex>
  );
}
