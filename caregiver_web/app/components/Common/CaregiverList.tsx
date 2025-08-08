import { Flex, Heading, Card, Text, Button, Badge, Separator, ScrollArea, Checkbox } from '@radix-ui/themes';
import { MixerHorizontalIcon } from '@radix-ui/react-icons';
import { useState, useEffect } from 'react';

import { getCaregivers, CaregiverApi } from '../../api';
import { CAREGIVER_STATUS, CAREGIVER_STATUS_COLORS } from '../../constants/caregiverStatus';

interface CaregiverListProps {
  searchTerm: string;
  selectedStatus: string;
  multiSelectMode: boolean;
  selectedCaregiver: string | null;
  selectedCaregivers: string[];
  onSearchChange: (value: string) => void;
  onStatusChange: (status: string) => void;
  onCaregiverSelect: (caregiverId: string) => void;
  onMultiSelectToggle?: () => void;
  showMultiSelectToggle?: boolean;
}



export default function CaregiverList({
  searchTerm,
  selectedStatus,
  multiSelectMode,
  selectedCaregiver,
  selectedCaregivers,
  onSearchChange,
  onStatusChange,
  onCaregiverSelect,
  onMultiSelectToggle
}: CaregiverListProps) {
  const [apiCaregivers, setApiCaregivers] = useState<CaregiverApi[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // API에서 요양보호사 데이터 가져오기
  useEffect(() => {
    const fetchCaregivers = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getCaregivers();
        setApiCaregivers(data);
        console.log('요양보호사 데이터 로드 성공:', data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '요양보호사 로드 실패');
        console.error('요양보호사 로드 실패:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCaregivers();
  }, []);



  return (
    <Card style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Flex direction="column" gap="4" p="4" style={{ flex: 1, minHeight: 0 }}>
        {/* 검색 및 필터 */}
        <Flex direction="column" gap="3">
            <Flex justify="between" align="center">
              <Heading size="4">요양보호사 목록</Heading>
              {onMultiSelectToggle && (
                <Button
                  variant={multiSelectMode ? 'solid' : 'soft'}
                  size="2"
                  onClick={onMultiSelectToggle}
                >
                  {multiSelectMode ? '복수 선택 모드 해제' : '복수 선택 모드'}
                </Button>
              )}
            </Flex>
          
          {/* 검색바 */}
          <Flex gap="2" align="center">
            <input
              type="text"
              placeholder="이름 또는 전화번호로 검색"
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
              style={{
                flex: 1,
                padding: '8px 12px',
                border: '1px solid var(--gray-6)',
                borderRadius: '6px',
                fontSize: '14px',
                backgroundColor: 'var(--color-surface)',
                color: 'var(--color-foreground)',
                height: '32px',
                boxSizing: 'border-box'
              }}
            />
            <Button variant="soft" size="2" style={{ height: '32px' }}>
              <MixerHorizontalIcon />
            </Button>
          </Flex>

          {/* 상태 필터 */}
          <Flex gap="2" wrap="wrap">
            {['전체', '활동중', '휴직', '퇴사'].map(status => (
              <Button
                key={status}
                variant={selectedStatus === status ? 'solid' : 'soft'}
                size="1"
                onClick={() => onStatusChange(status)}
              >
                {status}
              </Button>
            ))}
          </Flex>
        </Flex>

        <Separator />

        {/* 로딩 상태 표시 */}
        {loading && (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            padding: '20px',
            fontSize: '14px',
            color: 'var(--gray-11)'
          }}>
            요양보호사 데이터 로딩 중...
          </div>
        )}

        {/* 에러 상태 표시 */}
        {error && (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            padding: '20px',
            fontSize: '14px',
            color: 'var(--red-9)'
          }}>
            {error}
          </div>
        )}

        {/* 요양보호사 목록 */}
        {!loading && !error && (
          <ScrollArea type='always' scrollbars='vertical' style={{ flex: 1, minHeight: 0 }}>
            <Flex direction="column" gap="3">
              {apiCaregivers.map(caregiver => (
                <Card
                  key={caregiver.caregiverId}
                  style={{
                    cursor: 'pointer',
                    backgroundColor: (!multiSelectMode && selectedCaregiver === caregiver.caregiverId) ? 'var(--accent-3)' : 'transparent',
                    marginRight: '10%'
                  }}
                  onClick={() => onCaregiverSelect(caregiver.caregiverId)}
                >
                  <Flex gap="2" p="1" align="center">
                    {multiSelectMode && (
                      <Checkbox 
                        checked={selectedCaregivers.includes(caregiver.caregiverId)}
                        onChange={() => onCaregiverSelect(caregiver.caregiverId)}
                        onClick={(e) => e.stopPropagation()}
                        style={{ marginRight: '2%' }}
                      />
                    )}
                    <Flex direction="column" gap="1" style={{ flex: 1 }}>
                      <Text weight="medium" size="2">{caregiver.name}</Text>
                      <Text size="1" color="gray">{caregiver.phone}</Text>
                    </Flex>
                    <Badge color={(CAREGIVER_STATUS_COLORS[CAREGIVER_STATUS[caregiver.status as keyof typeof CAREGIVER_STATUS] as keyof typeof CAREGIVER_STATUS_COLORS] || 'gray') as "green" | "yellow" | "red" | "gray"} size="1">
                      {CAREGIVER_STATUS[caregiver.status as keyof typeof CAREGIVER_STATUS] || caregiver.status}
                    </Badge>
                  </Flex>
                </Card>
              ))}
            </Flex>
          </ScrollArea>
        )}
      </Flex>
    </Card>
  );
} 