import { Flex, Heading, Card, Text, Button, Badge, ScrollArea, Checkbox, Tabs } from '@radix-ui/themes';
import { useState, useEffect } from 'react';
import { CaregiverApi } from '../../../api';
import { CAREGIVER_STATUS, CAREGIVER_STATUS_COLORS } from '../../../constants/caregiverStatus';
import { WORK_TYPES, WORK_TYPE_COLORS } from '../../../constants/workTypes';
import { formatCurrency } from '../../../utils/formatters';
import { getCaregiverProfile, getCaregiverCertification, CaregiverProfileApi, CaregiverCertificationApi } from '../../../api/caregiver';

interface CaregiverCardProps {
  selectedCaregiver: string | null;
  caregivers: CaregiverApi[];
}

// 돌봄을 받는 사람들의 샘플 데이터
const sampleClients = [
  { id: 1, name: '김영수', phone: '010-1111-2222', address: '서울시 강남구', status: '활동중' },
  { id: 2, name: '박미영', phone: '010-3333-4444', address: '서울시 서초구', status: '활동중' },
  { id: 3, name: '이철수', phone: '010-5555-6666', address: '서울시 마포구', status: '활동중' },
  { id: 4, name: '정순자', phone: '010-7777-8888', address: '서울시 용산구', status: '활동중' },
  { id: 5, name: '최민호', phone: '010-9999-0000', address: '서울시 서대문구', status: '활동중' },
];

export default function CaregiverCard({ selectedCaregiver, caregivers }: CaregiverCardProps) {
  const [blacklist, setBlacklist] = useState<number[]>([]);
  const [selectedTab, setSelectedTab] = useState('basic');
  const [profileData, setProfileData] = useState<CaregiverProfileApi | null>(null);
  const [certificationData, setCertificationData] = useState<CaregiverCertificationApi | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 선택된 요양보호사 찾기
  const selectedCaregiverData = caregivers.find(c => c.caregiverId === selectedCaregiver);

  // API에서 인사카드 데이터와 자격증 데이터 가져오기
  useEffect(() => {
    if (!selectedCaregiver) {
      setProfileData(null);
      setCertificationData(null);
      setError(null);
      return;
    }

    const fetchCaregiverData = async () => {
      setLoading(true);
      setError(null);
      
      let profile: CaregiverProfileApi | null = null;
      let certification: CaregiverCertificationApi | null = null;

      // 인사카드 정보 가져오기
      try {
        profile = await getCaregiverProfile(selectedCaregiver);
      } catch (err) {
        console.error('Failed to fetch caregiver profile:', err);
      }

      // 자격증 정보 가져오기
      try {
        certification = await getCaregiverCertification(selectedCaregiver);
      } catch (err) {
        console.error('Failed to fetch caregiver certification:', err);
        // 자격증 정보 실패는 에러로 처리하지 않음
      }

      // 인사카드 정보가 없으면 에러 처리
      if (!profile) {
        setError('인사카드 정보를 불러오는데 실패했습니다.');
        setProfileData(null);
        setCertificationData(null);
      } else {
        setProfileData(profile);
        setCertificationData(certification);
      }

      setLoading(false);
    };

    fetchCaregiverData();
  }, [selectedCaregiver]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR');
  };

  const handleBlacklistToggle = (clientId: number) => {
    setBlacklist(prev => 
      prev.includes(clientId) 
        ? prev.filter(id => id !== clientId)
        : [...prev, clientId]
    );
  };

  return (
    <Card style={{ flex: 3, display: 'flex', flexDirection: 'column' }}>
      <Flex direction="column" gap="4" p="4" style={{ flex: 1 }}>
        <Flex justify="between" align="center">
          <Heading size="4">인사카드</Heading>
          <Button variant="soft" size="2">편집</Button>
        </Flex>

        {loading ? (
          <Flex justify="center" align="center" style={{ flex: 1 }}>
            <Text size="3" color="gray">로딩 중...</Text>
          </Flex>
        ) : error ? (
          <Flex justify="center" align="center" style={{ flex: 1 }}>
            <Text size="3" color="red">{error}</Text>
          </Flex>
        ) : selectedCaregiverData && profileData ? (
          <Tabs.Root value={selectedTab} onValueChange={setSelectedTab}>
            <Tabs.List>
              <Tabs.Trigger value="basic">인사 정보</Tabs.Trigger>
              <Tabs.Trigger value="blacklist">
                블랙리스트
                {blacklist.length > 0 && (
                  <Badge color="red" size="1" style={{ marginLeft: '4px' }}>
                    {blacklist.length}
                  </Badge>
                )}
              </Tabs.Trigger>
            </Tabs.List>

            <ScrollArea style={{ flex: 1, marginTop: '16px' }}>
              {/* 인사 정보 탭 */}
              {selectedTab === 'basic' && (
                <Flex direction="column" gap="6">
                  {/* 기본 정보 */}
                  <Card>
                    <Heading size="3" mb="3">기본 정보</Heading>
                    <Flex gap="6" wrap="wrap">
                      <Flex direction="column" gap="2" style={{ minWidth: 200 }}>
                        <Text size="2" color="gray">이름</Text>
                        <Text size="3" weight="medium">{profileData.caregiverName}</Text>
                      </Flex>
                      <Flex direction="column" gap="2" style={{ minWidth: 200 }}>
                        <Text size="2" color="gray">생년월일</Text>
                        <Text size="3" weight="medium">{profileData.birthDate ? formatDate(profileData.birthDate) : '-'}</Text>
                      </Flex>
                      <Flex direction="column" gap="2" style={{ minWidth: 200 }}>
                        <Text size="2" color="gray">전화번호</Text>
                        <Text size="3" weight="medium">{profileData.phone}</Text>
                      </Flex>
                      <Flex direction="column" gap="2" style={{ minWidth: 200 }}>
                        <Text size="2" color="gray">이메일</Text>
                        <Text size="3" weight="medium">{profileData.email || '-'}</Text>
                      </Flex>
                      <Flex direction="column" gap="2" style={{ minWidth: 200 }}>
                        <Text size="2" color="gray">주소</Text>
                        <Text size="3" weight="medium">{profileData.address || '-'}</Text>
                      </Flex>
                    </Flex>
                  </Card>

                  {/* 근무 정보 */}
                  <Card>
                    <Heading size="3" mb="3">근무 정보</Heading>
                    <Flex gap="6" wrap="wrap">
                      <Flex direction="column" gap="2" style={{ minWidth: 200 }}>
                        <Text size="2" color="gray">상태</Text>
                        <Badge color={(CAREGIVER_STATUS_COLORS[CAREGIVER_STATUS[selectedCaregiverData.status as keyof typeof CAREGIVER_STATUS] as keyof typeof CAREGIVER_STATUS_COLORS] || 'gray') as "green" | "yellow" | "red" | "gray"} size="2">
                          {CAREGIVER_STATUS[selectedCaregiverData.status as keyof typeof CAREGIVER_STATUS] || selectedCaregiverData.status}
                        </Badge>
                      </Flex>
                      <Flex direction="column" gap="2" style={{ minWidth: 200 }}>
                        <Text size="2" color="gray">근무 유형</Text>
                        <Flex gap="2" wrap="wrap">
                          {selectedCaregiverData.serviceTypes.map((serviceType, index) => {
                            const displayType = WORK_TYPES[serviceType as keyof typeof WORK_TYPES] || serviceType;
                            const color = WORK_TYPE_COLORS[displayType as keyof typeof WORK_TYPE_COLORS] || 'gray';
                            return (
                              <Badge 
                                key={index} 
                                color={color as "blue" | "purple" | "green" | "orange" | "yellow" | "red"} 
                                size="2"
                              >
                                {displayType}
                              </Badge>
                            );
                          })}
                        </Flex>
                      </Flex>
                      <Flex direction="column" gap="2" style={{ minWidth: 200 }}>
                        <Text size="2" color="gray">입사일</Text>
                        <Text size="3" weight="medium">{new Date().toLocaleDateString('ko-KR')}</Text>
                      </Flex>
                      <Flex direction="column" gap="2" style={{ minWidth: 200 }}>
                        <Text size="2" color="gray">근무 지역</Text>
                        <Text size="3" weight="medium">서울시</Text>
                      </Flex>
                    </Flex>
                  </Card>

                  {/* 자격 정보 */}
                  <Card>
                    <Heading size="3" mb="3">자격 정보</Heading>
                    <Flex gap="6" wrap="wrap">
                      <Flex direction="column" gap="2" style={{ minWidth: 200 }}>
                        <Text size="2" color="gray">요양보호사 자격증</Text>
                        <Text size="3" weight="medium">{certificationData?.certificationNumber || '-'}</Text>
                      </Flex>
                      <Flex direction="column" gap="2" style={{ minWidth: 200 }}>
                        <Text size="2" color="gray">자격 취득일</Text>
                        <Text size="3" weight="medium">{certificationData?.certificationDate ? formatDate(certificationData.certificationDate) : '-'}</Text>
                      </Flex>
                      <Flex direction="column" gap="2" style={{ minWidth: 200 }}>
                        <Text size="2" color="gray">교육 이수</Text>
                        <Text size="3" weight="medium">{certificationData?.trainStatus ? '완료' : '미완료'}</Text>
                      </Flex>
                    </Flex>
                  </Card>

                  {/* 급여 정보 */}
                  <Card>
                    <Heading size="3" mb="3">급여 정보</Heading>
                    <Flex gap="6" wrap="wrap">
                      <Flex direction="column" gap="2" style={{ minWidth: 200 }}>
                        <Text size="2" color="gray">시급</Text>
                        <Text size="3" weight="medium">{formatCurrency(12000)}</Text>
                      </Flex>
                      <Flex direction="column" gap="2" style={{ minWidth: 200 }}>
                        <Text size="2" color="gray">이번달 근무시간</Text>
                        <Text size="3" weight="medium">160시간</Text>
                      </Flex>
                      <Flex direction="column" gap="2" style={{ minWidth: 200 }}>
                        <Text size="2" color="gray">이번달 급여</Text>
                        <Text size="3" weight="medium">{formatCurrency(12000 * 160)}</Text>
                      </Flex>
                    </Flex>
                  </Card>
                </Flex>
              )}

              {/* 블랙리스트 탭 */}
              {selectedTab === 'blacklist' && (
                <Flex direction="column" gap="4">
                  <Flex direction="column" gap="3">
                    <Text size="2" color="gray" mb="2">
                      이 요양보호사와 매칭되지 않기를 원하는 돌봄 대상자 목록입니다.
                    </Text>
                    <ScrollArea style={{ height: '100%' }}>
                      <Flex direction="column" gap="2">
                        {sampleClients.map(client => (
                          <Flex 
                            key={client.id} 
                            justify="between" 
                            align="center" 
                            p="3" 
                            style={{ 
                              background: blacklist.includes(client.id) ? 'var(--red-2)' : 'var(--gray-2)',
                              borderRadius: '6px',
                              border: blacklist.includes(client.id) ? '1px solid var(--red-6)' : '1px solid var(--gray-6)'
                            }}
                          >
                            <Flex align="center" gap="3">
                              <Checkbox 
                                checked={blacklist.includes(client.id)}
                                onCheckedChange={() => handleBlacklistToggle(client.id)}
                              />
                              <Flex direction="column" gap="1">
                                <Text weight="medium" size="2">{client.name}</Text>
                                <Text size="1" color="gray">{client.phone} • {client.address}</Text>
                              </Flex>
                            </Flex>
                            <Badge 
                              color={blacklist.includes(client.id) ? 'red' : 'green'} 
                              size="1"
                            >
                              {blacklist.includes(client.id) ? '매칭 제외' : '매칭 가능'}
                            </Badge>
                          </Flex>
                        ))}
                      </Flex>
                    </ScrollArea>
                    <Flex justify="between" align="center">
                      <Text size="2" color="gray" mt='2'>
                        총 {sampleClients.length}명 중 {blacklist.length}명 매칭 제외
                      </Text>
                      <Button variant="soft" size="1" color="red">
                        블랙리스트 초기화
                      </Button>
                    </Flex>
                  </Flex>
                </Flex>
              )}
            </ScrollArea>
          </Tabs.Root>
        ) : (
          <Flex justify="center" align="center" style={{ flex: 1 }}>
            <Text size="3" color="gray">보호사를 선택해주세요</Text>
          </Flex>
        )}
      </Flex>
    </Card>
  );
} 