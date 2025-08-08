import { Card, Text, Checkbox, Flex, Heading, Badge } from '@radix-ui/themes';
import { useState, useEffect } from 'react';
import { getScheduleByDay, WorkMatch } from '../../../api';
import { WORK_TYPES, WORK_TYPE_COLORS, WorkType } from '../../../constants/workTypes';

function getDaysArray(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= lastDate; d++) days.push(d);
  while (days.length % 7 !== 0) days.push(null);
  return days;
}

// 날짜를 YYYY-MM-DD 형식으로 변환
function formatDate(year: number, month: number, day: number): string {
  const monthStr = (month + 1).toString().padStart(2, '0');
  const dayStr = day.toString().padStart(2, '0');
  return `${year}-${monthStr}-${dayStr}`;
}

interface CalendarSidebarProps {
  selectedDate: Date;
  onWorkTypeFilterChange?: (filters: Record<WorkType, boolean>) => void;
}

export default function CalendarSidebar({ selectedDate, onWorkTypeFilterChange }: CalendarSidebarProps) {
  const today = new Date();
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDays = getDaysArray(todayYear, todayMonth);
  const [apiSchedules, setApiSchedules] = useState<WorkMatch[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // 체크박스 상태 관리
  const [workTypeFilters, setWorkTypeFilters] = useState<Record<WorkType, boolean>>({
    [WORK_TYPES.VISITING_CARE]: true,
    [WORK_TYPES.DAY_NIGHT_CARE]: true,
    [WORK_TYPES.RESPITE_CARE]: true,
    [WORK_TYPES.VISITING_BATH]: true,
    [WORK_TYPES.IN_HOME_SUPPORT]: true,
    [WORK_TYPES.VISITING_NURSING]: true
  });

  // API에서 해당 월의 스케줄 데이터 가져오기
  useEffect(() => {
    const fetchMonthSchedules = async () => {
      setLoading(true);
      setError(null);
      try {
        const allSchedules: WorkMatch[] = [];
        
        // 해당 월의 모든 날짜에 대해 스케줄 데이터 가져오기
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        for (let day = 1; day <= daysInMonth; day++) {
          try {
            const data = await getScheduleByDay(year, month, day);
            allSchedules.push(...data);
          } catch (err) {
            console.error(`스케줄 로드 실패 (${year}-${month + 1}-${day}):`, err);
          }
        }
        
        setApiSchedules(allSchedules);
        console.log('월별 스케줄 데이터 로드 성공:', allSchedules);
      } catch (err) {
        setError(err instanceof Error ? err.message : '스케줄 로드 실패');
        console.error('스케줄 로드 실패:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMonthSchedules();
  }, [year, month]);
  
  // 해당 월의 스케줄만 필터링
  const monthSchedules = apiSchedules.filter(schedule => {
    const scheduleDate = new Date(schedule.workDate);
    return scheduleDate.getFullYear() === year && scheduleDate.getMonth() === month;
  });
  
  // 날짜별로 스케줄 그룹화 (WorkMatch 형식에 맞춰 수정)
  const schedulesByDate = monthSchedules.reduce((acc, schedule) => {
    const dateKey = schedule.workDate;
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(schedule);
    return acc;
  }, {} as Record<string, WorkMatch[]>);
  
  // 근무 유형별 통계 (WORK_TYPES 키-값 형태 사용)
  const workTypeStats = Object.entries(WORK_TYPES).reduce((acc, [key, value]) => {
    acc[value] = monthSchedules.filter(s => {
      const serviceType = s.serviceType && s.serviceType.length > 0 ? s.serviceType[0] : '';
      return serviceType === key;
    }).length;
    return acc;
  }, {} as Record<string, number>);
  
  // 상태별 통계
  const statusStats = {
    '배정됨': monthSchedules.filter(s => s.status === 'PLANNED').length,
    '미배정': monthSchedules.filter(s => s.status === 'UNASSIGNED').length,
    '완료': monthSchedules.filter(s => s.status === 'COMPLETED').length,
  };

  const handleWorkTypeFilterChange = (workType: WorkType, checked: boolean) => {
    const newFilters = { ...workTypeFilters, [workType]: checked };
    setWorkTypeFilters(newFilters);
    if (onWorkTypeFilterChange) {
      onWorkTypeFilterChange(newFilters);
    }
  };

  return (
    <Card style={{ width: 280, minHeight: 500, background: 'var(--gray-3)', padding: 20 }}>
      <Heading size="3" mb="4">근무 현황</Heading>
      
      {/* 로딩 상태 표시 */}
      {loading && (
        <Flex justify="center" align="center" p="4">
          <Text size="2" color="gray">스케줄 데이터 로딩 중...</Text>
        </Flex>
      )}

      {/* 에러 상태 표시 */}
      {error && (
        <Flex justify="center" align="center" p="4">
          <Text size="2" color="red">{error}</Text>
        </Flex>
      )}

      {/* 근무 유형별 필터 */}
      {!loading && !error && (
        <>
          <Text size="2" weight="bold">근무 유형</Text>
          <Flex direction="column" gap="2" mt="2" mb="4">
            {Object.values(WORK_TYPES).map(workType => (
              <Flex key={workType} align="center" justify="between">
                <Flex align="center" gap="2">
                  <Checkbox 
                    checked={workTypeFilters[workType]}
                    onCheckedChange={(checked) => handleWorkTypeFilterChange(workType, checked as boolean)}
                    id={workType} 
                  />
                  <label htmlFor={workType}><Text size="2">{workType}</Text></label>
                </Flex>
                <Badge 
                  color={WORK_TYPE_COLORS[workType] as "blue" | "purple" | "green" | "orange" | "yellow" | "red"} 
                  size="1"
                >
                  {workTypeStats[workType]}
                </Badge>
              </Flex>
            ))}
          </Flex>
          
          {/* 상태별 통계 */}
          <Text size="2" weight="bold">근무 상태</Text>
          <Flex direction="column" gap="2" mt="2" mb="4">
            <Flex align="center" justify="between">
              <Text size="2">배정됨</Text>
              <Badge color="green" size="1">{statusStats['배정됨']}</Badge>
            </Flex>
            <Flex align="center" justify="between">
              <Text size="2">미배정</Text>
              <Badge color="yellow" size="1">{statusStats['미배정']}</Badge>
            </Flex>
            <Flex align="center" justify="between">
              <Text size="2">완료</Text>
              <Badge color="blue" size="1">{statusStats['완료']}</Badge>
            </Flex>
          </Flex>
          
          {/* 미니 캘린더 */}
          <Text size="2" weight="bold">{today.getFullYear()}년 {today.getMonth() + 1}월</Text>
          <Flex gap="1" mt="2" mb="4">
            {['일', '월', '화', '수', '목', '금', '토'].map(d => (
              <Text key={d} size="1" style={{ flex: 1, textAlign: 'center', color: 'var(--gray-10)' }}>{d}</Text>
            ))}
          </Flex>
          <Flex direction="column" gap="1">
            {Array.from({ length: todayDays.length / 7 }).map((_, weekIdx) => (
              <Flex key={weekIdx} gap="1">
                {todayDays.slice(weekIdx * 7, weekIdx * 7 + 7).map((d, i) => {
                  const isToday = d && d === today.getDate();
                  const dateStr = d ? formatDate(today.getFullYear(), today.getMonth(), d) : '';
                  const hasSchedule = d && schedulesByDate[dateStr] && schedulesByDate[dateStr].length > 0;
                  
                  return (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        height: 24,
                        borderRadius: 4,
                        background: isToday ? 'var(--accent-9)' : 'none',
                        color: isToday ? 'white' : 'var(--gray-12)',
                        textAlign: 'center',
                        lineHeight: '24px',
                        fontWeight: isToday ? 700 : 400,
                        fontSize: 14,
                        position: 'relative',
                      }}
                    >
                      {d || ''}
                      {hasSchedule && (
                        <div style={{
                          position: 'absolute',
                          bottom: 0,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: 4,
                          height: 4,
                          borderRadius: '50%',
                          background: 'var(--accent-9)',
                        }} />
                      )}
                    </div>
                  );
                })}
              </Flex>
            ))}
          </Flex>
        </>
      )}
    </Card>
  );
} 