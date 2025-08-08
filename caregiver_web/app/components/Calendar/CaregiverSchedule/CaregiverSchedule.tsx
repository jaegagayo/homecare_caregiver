import { Flex, Heading, Card, Tabs, Button } from '@radix-ui/themes';
import { useState, useRef, useEffect } from 'react';
import ScheduleList from './ScheduleList';
import MonthlyStats from './MonthlyStats';
import ScheduleGrid from './ScheduleGrid';
import { exportAndDownloadSchedule } from '../../../utils/scheduleImageExport';
import { CaregiverApi, getCaregiverSchedule, ServiceMatch } from '../../../api';

interface CaregiverScheduleProps {
  caregiver: CaregiverApi;
}

export default function CaregiverSchedule({ caregiver }: CaregiverScheduleProps) {
  const [selectedTab, setSelectedTab] = useState('schedule');
  const [isExporting, setIsExporting] = useState(false);
  const [apiSchedules, setApiSchedules] = useState<ServiceMatch[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scheduleGridRef = useRef<HTMLDivElement>(null);

  // API에서 요양보호사 스케줄 데이터 가져오기
  useEffect(() => {
    const fetchCaregiverSchedules = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getCaregiverSchedule(caregiver.caregiverId);
        setApiSchedules(data);
        console.log('요양보호사 스케줄 데이터 로드 성공:', data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '스케줄 로드 실패');
        console.error('요양보호사 스케줄 로드 실패:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCaregiverSchedules();
  }, [caregiver.caregiverId]);

  const tabs = [
    { key: 'schedule', label: '스케줄표' },
    { key: 'schedules', label: '스케줄 목록' },
    { key: 'monthly', label: '월별 통계' },
  ];



  // 이미지 출력 처리
  const handleExportImage = async () => {
    if (selectedTab !== 'schedule') {
      alert('스케줄표 탭에서만 이미지 출력이 가능합니다.');
      return;
    }
    
    if (!scheduleGridRef.current) {
      alert('스케줄 그리드를 찾을 수 없습니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    setIsExporting(true);
    try {
      const filename = `${caregiver.name}_보호사_스케줄_${new Date().toISOString().split('T')[0]}.png`;
      
      await exportAndDownloadSchedule(scheduleGridRef.current, {
        format: 'png',
        quality: 0.95,
        width: 1200,
        filename
      });
    } catch (error) {
      console.error('이미지 출력 실패:', error);
      alert('이미지 출력 중 오류가 발생했습니다.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Card style={{ flex: 3, display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
      <Flex direction="column" gap="4" p="4" style={{ flex: 1, minHeight: 0, height: '100%' }}>
        <Flex justify="between" align="center" style={{ flexShrink: 0 }}>
          <Heading size="4">{caregiver.name} 보호사 스케줄</Heading>
          <Button 
            variant="soft" 
            size="2" 
            onClick={handleExportImage}
            disabled={isExporting || selectedTab !== 'schedule'}
          >
            {isExporting ? '출력 중...' : '이미지로 출력'}
          </Button>
        </Flex>

        {/* 로딩 상태 표시 */}
        {loading && (
          <Flex justify="center" align="center" style={{ flex: 1 }}>
            <Heading size="3" color="gray">스케줄 데이터 로딩 중...</Heading>
          </Flex>
        )}

        {/* 에러 상태 표시 */}
        {error && (
          <Flex justify="center" align="center" style={{ flex: 1 }}>
            <Heading size="3" color="red">{error}</Heading>
          </Flex>
        )}

        {/* 스케줄 내용 */}
        {!loading && !error && (
          <Tabs.Root value={selectedTab} onValueChange={setSelectedTab} style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <Tabs.List style={{ flexShrink: 0 }}>
              {tabs.map(tab => (
                <Tabs.Trigger key={tab.key} value={tab.key}>
                  {tab.label}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
            
            <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
              {selectedTab === 'schedule' && (
                <ScheduleGrid ref={scheduleGridRef} schedules={apiSchedules} />
              )}

              {selectedTab === 'schedules' && (
                <ScheduleList schedules={apiSchedules} />
              )}

              {selectedTab === 'monthly' && (
                <MonthlyStats schedules={apiSchedules} />
              )}
            </div>
          </Tabs.Root>
        )}
      </Flex>
    </Card>
  );
} 