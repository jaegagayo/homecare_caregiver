import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "@remix-run/react";
import {
  RadioCards,
  Container,
  Flex,
  Text,
  Button,
  Heading,
  Card
} from "@radix-ui/themes";

interface Institution {
  id: string;
  name: string;
  hourlyWage: number;
  allowance: number;
  contactNumber: string;
}

interface Assignment {
  id: string;
  date: string;
  time: string;
  applicantName: string;
  location: string;
  institutions: Institution[];
}

export default function InstitutionSelectionPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const assignmentId = searchParams.get('assignmentId');
  const [selectedInstitutionId, setSelectedInstitutionId] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [assignment, setAssignment] = useState<Assignment | null>(null);

  // 배정 데이터 로드
  useEffect(() => {
    console.log('InstitutionSelectionPage - assignmentId:', assignmentId);

    // assignmentId가 있으면 해당 ID로, 없으면 기본 데이터 사용
    const targetId = assignmentId || "assignment-1";
    console.log('InstitutionSelectionPage - targetId:', targetId);

    // 서비스 시간 계산 (14:00 - 16:00 = 2시간)
    const [startTime, endTime] = "14:00 - 16:00".split(' - ');
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    const duration = (endHour * 60 + endMinute) - (startHour * 60 + startMinute);
    const workHours = duration / 60; // 2시간

    // 더미 데이터 - 실제로는 API에서 assignmentId로 데이터를 가져와야 함
    const mockAssignment: Assignment = {
      id: targetId,
      date: "2025-08-21",
      time: "14:00 - 16:00",
      applicantName: "김철수",
      location: "서울시 강남구 역삼동",
      institutions: [
        {
          id: "inst-1",
          name: "행복요양원",
          hourlyWage: 15000,
          allowance: Math.round(15000 * workHours), // 30,000원
          contactNumber: "02-123-4567"
        },
        {
          id: "inst-2",
          name: "사랑요양원",
          hourlyWage: 16000,
          allowance: Math.round(16000 * workHours), // 32,000원
          contactNumber: "02-123-4568"
        },
        {
          id: "inst-3",
          name: "희망요양원",
          hourlyWage: 14000,
          allowance: Math.round(14000 * workHours), // 28,000원
          contactNumber: "02-123-4569"
        }
      ]
    };

    console.log('InstitutionSelectionPage - mockAssignment:', mockAssignment);

    // 약간의 지연을 두어 로딩 상태를 시뮬레이션
    setTimeout(() => {
      setAssignment(mockAssignment);
      console.log('InstitutionSelectionPage - assignment set:', mockAssignment);
    }, 500);
  }, [assignmentId]);

  const handleConfirm = async () => {
    if (!selectedInstitutionId || !assignment) {
      alert('기관을 선택해주세요.');
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: 기관 선택 확정 API 호출
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('기관이 확정되었습니다.');
      navigate('/main/home');
    } catch (error) {
      alert('기관 선택 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    const weekday = weekdays[date.getDay()];
    return `${year}년 ${month}월 ${day}일 (${weekday})`;
  };

  if (!assignment) {
    return (
      <Container size="2" className="p-4">
        <Flex direction="column" align="center" gap="4" className="py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <Text>배정 정보를 불러오는 중...</Text>
        </Flex>
      </Container>
    );
  }

  return (
    <Container size="2" className="p-4">
      <Flex direction="column" gap="6">
        {/* 헤더 */}
        <div>
          <Heading size="5">기관 선택</Heading>
          <Text size="3" color="gray">
            해당 일정의 정산 기관을 선택해주세요.
          </Text>
        </div>

        {/* 상단 요약 - 일정 요약 */}
        <div>
          <div className="mb-4">
            <Heading size="4">일정 요약</Heading>
          </div>
          <Card className="p-4">
            <Flex direction="column" gap="4">
              {/* 신청자 */}
              <div>
                <Flex justify="between" align="center">
                  <Text size="2" weight="medium">신청자</Text>
                  <Text size="2" weight="medium">{assignment.applicantName}</Text>
                </Flex>
              </div>

              <div className="w-full h-px bg-gray-200"></div>

              {/* 일정 */}
              <div>
                <Flex justify="between" align="center">
                  <Text size="2" weight="medium">일정</Text>
                  <Text size="2" weight="medium">{formatDate(assignment.date)} {assignment.time}</Text>
                </Flex>
              </div>

              <div className="w-full h-px bg-gray-200"></div>

              {/* 주소 */}
              <div>
                <Flex justify="between" align="center">
                  <Text size="2" weight="medium">주소</Text>
                  <Text size="2" weight="medium">{assignment.location}</Text>
                </Flex>
              </div>
            </Flex>
          </Card>
        </div>

        {/* 기관 목록 */}
        <div>
          <div className="mb-4">
            <Heading size="3">기관 선택</Heading>
            <Text size="2" color="gray">
              정산을 원하는 기관을 선택해주세요.
            </Text>
          </div>

          <RadioCards.Root
            value={selectedInstitutionId}
            onValueChange={setSelectedInstitutionId}
            className="space-y-1"
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            {assignment.institutions.map((institution) => (
              <RadioCards.Item
                key={institution.id}
                value={institution.id}
                className="w-full"
              >
                <Flex direction="column" gap="2" className="w-full">
                  <Flex justify="between" align="center">
                    <Flex align="center" gap="2">
                      <div style={{
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        border: selectedInstitutionId === institution.id ? '2px solid var(--accent-9)' : '2px solid var(--gray-6)',
                        backgroundColor: selectedInstitutionId === institution.id ? 'var(--accent-9)' : 'transparent',
                        position: 'relative'
                      }}>
                        {selectedInstitutionId === institution.id && (
                          <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            backgroundColor: 'white'
                          }} />
                        )}
                      </div>
                      <Text size="3" weight="medium">{institution.name}</Text>
                    </Flex>
                  </Flex>
                  <Flex justify="between" align="center">
                    <Text size="2" color="gray">연락처</Text>
                    <Text size="2" weight="medium">{institution.contactNumber}</Text>
                  </Flex>
                  <div className="w-full h-px bg-gray-200 my-1"></div>
                                     <Flex justify="between" align="start">
                     <Text size="2" color="gray">수익</Text>
                     <Flex direction="column" align="end" gap="0">
                       <Text size="2" weight="medium" style={{ color: 'var(--accent-9)' }}>
                         {institution.allowance.toLocaleString()}원
                       </Text>
                       <Text size="1" color="gray">
                         ({institution.hourlyWage.toLocaleString()} × 2시간)
                       </Text>
                     </Flex>
                   </Flex>
                </Flex>
              </RadioCards.Item>
            ))}
          </RadioCards.Root>
        </div>

        {/* CTA 버튼 */}
        <Button
          onClick={handleConfirm}
          disabled={isSubmitting || !selectedInstitutionId}
          size="3"
          className="w-full"
        >
          {isSubmitting ? '확정 중...' : '이 기관으로 확정'}
        </Button>
      </Flex>
    </Container>
  );
}
