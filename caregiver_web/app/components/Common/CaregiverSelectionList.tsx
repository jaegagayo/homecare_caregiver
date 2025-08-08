import { Flex, Text, Card, Button, Badge, ScrollArea } from '@radix-ui/themes';
import { useState, useEffect } from 'react';
import { getCaregivers, CaregiverApi } from '../../api';
import { WORK_TYPES, WORK_TYPE_COLORS } from '../../constants/workTypes';
import { CAREGIVER_STATUS, CAREGIVER_STATUS_COLORS } from '../../constants/caregiverStatus';

interface CaregiverSelectionListProps {
  searchTerm: string;
  selectedStatus: string;
  selectedCaregiver: string | null;
  onSearchChange: (value: string) => void;
  onStatusChange: (status: string) => void;
  onCaregiverSelect: (caregiverId: string) => void;
}

export default function CaregiverSelectionList({
  searchTerm,
  selectedStatus,
  selectedCaregiver,
  onSearchChange,
  onStatusChange,
  onCaregiverSelect
}: CaregiverSelectionListProps) {
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



  // 백엔드 API 데이터를 직접 필터링
  const filteredCaregivers = apiCaregivers.filter(caregiver => {
    const matchesSearch = caregiver.name.includes(searchTerm) || 
                         caregiver.phone.includes(searchTerm);
    const displayStatus = CAREGIVER_STATUS[caregiver.status as keyof typeof CAREGIVER_STATUS] || caregiver.status;
    const matchesStatus = selectedStatus === '전체' || 
                         displayStatus === selectedStatus;
    return matchesSearch && matchesStatus && caregiver.status !== 'RESIGNED';
  });

  return (
    <Flex direction="column" gap="4">
      <Text size="2" weight="medium">요양보호사 선택</Text>
      
      {/* 검색바 */}
      <input
        type="text"
        placeholder="이름 또는 전화번호로 검색"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{
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

      {/* 상태 필터 */}
      <Flex gap="2" wrap="wrap">
        {['전체', '활동중', '휴직'].map(status => (
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

      {/* 보호사 목록 */}
      {!loading && !error && (
        <ScrollArea type='always' scrollbars='vertical' style={{ height: '300px' }}>
          <Flex direction="column" gap="2">
            {filteredCaregivers.map(caregiver => (
              <Card 
                key={caregiver.caregiverId}
                style={{ 
                  padding: '12px',
                  cursor: 'pointer',
                  backgroundColor: selectedCaregiver === caregiver.caregiverId ? 'var(--accent-3)' : 'transparent',
                  marginRight: '4%'
                }}
                onClick={() => onCaregiverSelect(caregiver.caregiverId)}
              >
                <Flex justify="between" align="center">
                  <Flex direction="column" gap="1">
                    <Text weight="medium">{caregiver.name}</Text>
                    <Text size="1" color="gray">{caregiver.phone}</Text>
                    {/* 서비스 타입 표시 */}
                    <Flex gap="1" wrap="wrap">
                      {caregiver.serviceTypes.slice(0, 2).map((serviceType, index) => {
                        const displayType = WORK_TYPES[serviceType as keyof typeof WORK_TYPES] || serviceType;
                        const color = WORK_TYPE_COLORS[displayType as keyof typeof WORK_TYPE_COLORS] || 'gray';
                        return (
                          <Badge key={index} color={color as "blue" | "purple" | "green" | "orange" | "yellow" | "red" | "gray"} size="1">
                            {displayType}
                          </Badge>
                        );
                      })}
                      {caregiver.serviceTypes.length > 2 && (
                        <Badge color="gray" size="1">
                          +{caregiver.serviceTypes.length - 2}
                        </Badge>
                      )}
                    </Flex>
                  </Flex>
                  <Flex gap="2" align="center">
                    <Badge color={(CAREGIVER_STATUS_COLORS[CAREGIVER_STATUS[caregiver.status as keyof typeof CAREGIVER_STATUS] as keyof typeof CAREGIVER_STATUS_COLORS] || 'gray') as "green" | "yellow" | "red" | "gray"} size="1">
                      {CAREGIVER_STATUS[caregiver.status as keyof typeof CAREGIVER_STATUS] || caregiver.status}
                    </Badge>
                  </Flex>
                </Flex>
              </Card>
            ))}
          </Flex>
        </ScrollArea>
      )}
    </Flex>
  );
} 