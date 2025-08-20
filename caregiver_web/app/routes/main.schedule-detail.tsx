import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "@remix-run/react";
import { 
  Container, 
  Flex, 
  Heading, 
  Text, 
  Button,
  Badge,
  Card
} from "@radix-ui/themes";


interface ScheduleDetail {
  id: string;
  date: string;
  time: string;
  applicantName: string;
  status: 'pending_approval' | 'institution_not_selected' | 'scheduled' | 'completed';
  isRegular: boolean;
  regularSequence?: { current: number; total: number };
  
  // 신청자 연락처 정보
  contactNumber: string;
  emergencyContact: string;
  
  // 방문 위치 정보
  visitAddress: string;
  entryMethod: string;
  
  // 신청자 정보
  careGrade: string;
  weight: string;
  hasDementia: boolean;
  isBedridden: boolean;
  cognitiveStatus: string;
  cohabitationStatus: string;
  
  // 신청자 입력 특이사항
  specialNotes: string;
}

export default function ScheduleDetailPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState<ScheduleDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const scheduleId = searchParams.get('id');

  useEffect(() => {
    const loadScheduleDetail = async () => {
      if (!scheduleId) {
        setError("일정 ID가 없습니다.");
        setIsLoading(false);
        return;
      }

      try {
        // 실제로는 API 호출
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // 메인 일정 페이지의 더미 데이터와 연동
        const allSchedules = [
          // 8월 20일 (화요일) - 오늘
          {
            id: "1",
            date: "2025-08-20",
            time: "09:00 - 11:00",
            clientName: "정미영",
            address: "서울시 강서구 화곡동",
            serviceType: "방문요양",
            status: "completed",
            duration: 2,
            hourlyRate: 15000
          },
          {
            id: "2",
            date: "2025-08-20",
            time: "14:00 - 16:00",
            clientName: "김철수",
            address: "서울시 영등포구 여의도동",
            serviceType: "방문요양",
            status: "upcoming",
            duration: 2,
            hourlyRate: 18000,
            isRegular: true,
            regularSequence: { current: 3, total: 5 }
          },
          {
            id: "3",
            date: "2025-08-20",
            time: "18:00 - 20:00",
            clientName: "박영희",
            address: "서울시 성동구 성수동",
            serviceType: "방문요양",
            status: "upcoming",
            duration: 2,
            hourlyRate: 16000,
            isRegular: true,
            regularSequence: { current: 1, total: 3 }
          },
          
          // 8월 21일 (수요일)
          {
            id: "4",
            date: "2025-08-21",
            time: "10:00 - 12:00",
            clientName: "이미라",
            address: "서울시 광진구 구의동",
            serviceType: "방문요양",
            status: "upcoming",
            duration: 2,
            hourlyRate: 15000
          },
          {
            id: "5",
            date: "2025-08-21",
            time: "15:00 - 17:00",
            clientName: "최동욱",
            address: "서울시 동대문구 신설동",
            serviceType: "방문요양",
            status: "upcoming",
            duration: 2,
            hourlyRate: 17000
          },
          
          // 8월 22일 (목요일)
          {
            id: "6",
            date: "2025-08-22",
            time: "08:00 - 10:00",
            clientName: "한지영",
            address: "서울시 중구 명동",
            serviceType: "방문요양",
            status: "upcoming",
            duration: 2,
            hourlyRate: 16000
          },
          {
            id: "7",
            date: "2025-08-22",
            time: "13:00 - 15:00",
            clientName: "송민호",
            address: "서울시 용산구 이태원동",
            serviceType: "방문요양",
            status: "upcoming",
            duration: 2,
            hourlyRate: 15000
          },
          
          // 8월 23일 (금요일)
          {
            id: "8",
            date: "2025-08-23",
            time: "11:00 - 13:00",
            clientName: "윤서연",
            address: "서울시 서대문구 신촌동",
            serviceType: "방문요양",
            status: "upcoming",
            duration: 2,
            hourlyRate: 15000
          },
          {
            id: "9",
            date: "2025-08-23",
            time: "16:00 - 18:00",
            clientName: "임태현",
            address: "서울시 종로구 종로",
            serviceType: "방문요양",
            status: "upcoming",
            duration: 2,
            hourlyRate: 17000
          },
          
          // 8월 24일 (토요일)
          {
            id: "10",
            date: "2025-08-24",
            time: "09:00 - 11:00",
            clientName: "강미영",
            address: "서울시 노원구 공릉동",
            serviceType: "방문요양",
            status: "upcoming",
            duration: 2,
            hourlyRate: 15000
          },
          
          // 8월 25일 (일요일)
          {
            id: "11",
            date: "2025-08-25",
            time: "09:00 - 11:00",
            clientName: "김영희",
            address: "서울시 강남구 역삼동",
            serviceType: "방문요양",
            status: "upcoming",
            duration: 2,
            hourlyRate: 15000
          },
          {
            id: "12",
            date: "2025-08-25",
            time: "14:00 - 16:00",
            clientName: "박철수",
            address: "서울시 서초구 서초동",
            serviceType: "방문요양",
            status: "upcoming",
            duration: 2,
            hourlyRate: 16000
          },
          
          // 8월 26일 (월요일)
          {
            id: "13",
            date: "2025-08-26",
            time: "08:00 - 10:00",
            clientName: "이순자",
            address: "서울시 마포구 합정동",
            serviceType: "방문요양",
            status: "upcoming",
            duration: 2,
            hourlyRate: 15000
          },
          {
            id: "14",
            date: "2025-08-26",
            time: "13:00 - 15:00",
            clientName: "최민수",
            address: "서울시 송파구 문정동",
            serviceType: "방문요양",
            status: "upcoming",
            duration: 2,
            hourlyRate: 17000
          }
        ];

        // ID로 일정 찾기
        const foundSchedule = allSchedules.find(s => s.id === scheduleId);
        
        if (!foundSchedule) {
          setError("해당 일정을 찾을 수 없습니다.");
          setIsLoading(false);
          return;
        }

        // ScheduleDetail 형태로 변환
        const scheduleDetail: ScheduleDetail = {
          id: foundSchedule.id,
          date: foundSchedule.date,
          time: foundSchedule.time,
          applicantName: foundSchedule.clientName,
          status: foundSchedule.status === 'upcoming' ? 'scheduled' : 'completed',
          isRegular: foundSchedule.isRegular || false,
          regularSequence: foundSchedule.regularSequence,
          
          // 연락처 정보 (실제로는 API에서 가져와야 함)
          contactNumber: "010-1234-5678",
          emergencyContact: "010-9876-5432",
          
          // 방문 위치 정보
          visitAddress: foundSchedule.address,
          entryMethod: "1층 엘리베이터 이용 후 3층에서 내려서 301호",
          
          // 신청자 정보 (실제로는 API에서 가져와야 함)
          careGrade: "등급 2",
          weight: "65kg",
          hasDementia: false,
          isBedridden: false,
          cognitiveStatus: "정상",
          cohabitationStatus: "가족과 동거",
          
          // 특이사항 (실제로는 API에서 가져와야 함)
          specialNotes: "고객님께서 계단이 있는 3층에 거주하고 계십니다. 엘리베이터는 1층에만 있어서 2-3층은 계단을 이용해야 합니다. 고객님은 보행기 사용이 필요하시며, 화장실은 복도 끝에 위치해 있습니다. 방문 시에는 반드시 신발을 벗고 들어가시기 바랍니다."
        };

        setSchedule(scheduleDetail);
        setIsLoading(false);
      } catch (err) {
        setError("일정을 불러올 수 없습니다.");
        setIsLoading(false);
      }
    };

    loadScheduleDetail();
  }, [scheduleId]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending_approval': return 'orange';
      case 'institution_not_selected': return 'red';
      case 'scheduled': return 'blue';
      case 'completed': return 'green';
      default: return 'gray';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending_approval': return '승인 대기';
      case 'institution_not_selected': return '기관 미선택';
      case 'scheduled': return '예정';
      case 'completed': return '완료';
      default: return '알 수 없음';
    }
  };



  const handleSelectInstitution = () => {
    navigate(`/main/institution-selection?scheduleId=${scheduleId}`);
  };

  const handleReject = () => {
    // 거절 처리 로직
    alert('일정이 거절되었습니다.');
    navigate(-1);
  };

  const handleSkip = () => {
    // 건너뛰기 처리 로직
    alert('일정이 건너뛰어졌습니다.');
    navigate(-1);
  };

  if (isLoading) {
    return (
      <Container size="2" className="p-4">
        <Text>로딩 중...</Text>
      </Container>
    );
  }

  if (error || !schedule) {
    return (
      <Container size="2" className="p-4">
        <Text color="red">{error || "일정을 불러올 수 없습니다."}</Text>
      </Container>
    );
  }

  return (
    <Container size="2" className="p-4">
      <Flex direction="column" gap="6">
        {/* 신청자 정보 */}
        <div>
          <Heading size="4" className="mb-4">신청자 정보</Heading>
          <Card className="p-4">
            <Flex direction="column" gap="4">
              {/* 기본 정보 */}
              <div>
                <Flex justify="between" align="center">
                  <Text size="2" weight="medium">신청자</Text>
                  <Text size="2" weight="medium">{schedule.applicantName}</Text>
                </Flex>
              </div>

              <div className="w-full h-px bg-gray-200"></div>

              {/* 날짜/시간 */}
              <div>
                <Flex justify="between" align="center">
                  <Text size="2" weight="medium">일정</Text>
                  <Text size="2" weight="medium">{schedule.date} {schedule.time}</Text>
                </Flex>
              </div>

              <div className="w-full h-px bg-gray-200"></div>

              {/* 상태 */}
              <div>
                <Flex justify="between" align="center">
                  <Text size="2" weight="medium">상태</Text>
                  <Flex align="center" gap="2">
                    <Badge color={getStatusColor(schedule.status) as 'orange' | 'red' | 'blue' | 'green' | 'gray'}>
                      {getStatusText(schedule.status)}
                    </Badge>
                    {schedule.isRegular && schedule.regularSequence && (
                      <Badge variant="soft" color="purple">
                        {schedule.regularSequence.current}회차 (총 {schedule.regularSequence.total}회)
                      </Badge>
                    )}
                  </Flex>
                </Flex>
              </div>

              <div className="w-full h-px bg-gray-200"></div>

              {/* 연락처 */}
              <div>
                <Flex justify="between" align="center">
                  <Text size="2" weight="medium">연락처</Text>
                  <Text size="2" weight="medium">{schedule.contactNumber}</Text>
                </Flex>
              </div>

              <div className="w-full h-px bg-gray-200"></div>

              {/* 비상연락처 */}
              <div>
                <Flex justify="between" align="center">
                  <Text size="2" weight="medium">비상연락처</Text>
                  <Text size="2" weight="medium">{schedule.emergencyContact}</Text>
                </Flex>
              </div>
            </Flex>
          </Card>
        </div>

        {/* 방문 위치 정보 */}
        <div>
          <Heading size="4" className="mb-4">방문 위치 정보</Heading>
          <Card className="p-4">
            <Flex direction="column" gap="4">
              <div>
                <Flex justify="between" align="center">
                  <Text size="2" weight="medium">주소</Text>
                  <Text size="2" weight="medium">{schedule.visitAddress}</Text>
                </Flex>
              </div>

              <div className="w-full h-px bg-gray-200"></div>

              <div>
                <Flex justify="between" align="center">
                  <Text size="2" weight="medium">출입 방법</Text>
                  <Text size="2" weight="medium">{schedule.entryMethod}</Text>
                </Flex>
              </div>
            </Flex>
          </Card>
        </div>

        {/* 신청자 상세 정보 */}
        <div>
          <Heading size="4" className="mb-4">신청자 상세 정보</Heading>
          <Card className="p-4">
            <div className="grid grid-cols-2 gap-4">
              {/* 왼쪽 열 */}
              <div className="space-y-3">
                {/* 장기요양 인정 등급 */}
                <div>
                  <Flex justify="between" align="center">
                    <Text size="2" weight="medium">장기요양 인정 등급</Text>
                    <Text size="2" weight="medium">{schedule.careGrade}</Text>
                  </Flex>
                </div>

                <div className="w-full h-px bg-gray-200"></div>

                {/* 체중 */}
                <div>
                  <Flex justify="between" align="center">
                    <Text size="2" weight="medium">체중</Text>
                    <Text size="2" weight="medium">{schedule.weight}</Text>
                  </Flex>
                </div>

                <div className="w-full h-px bg-gray-200"></div>

                {/* 치매 여부 */}
                <div>
                  <Flex justify="between" align="center">
                    <Text size="2" weight="medium">치매 여부</Text>
                    <Text size="2" weight="medium">{schedule.hasDementia ? '예' : '아니오'}</Text>
                  </Flex>
                </div>
              </div>

              {/* 오른쪽 열 */}
              <div className="space-y-3">
                {/* 거동 불가 여부 */}
                <div>
                  <Flex justify="between" align="center">
                    <Text size="2" weight="medium">거동 불가 여부</Text>
                    <Text size="2" weight="medium">{schedule.isBedridden ? '예' : '아니오'}</Text>
                  </Flex>
                </div>

                <div className="w-full h-px bg-gray-200"></div>

                {/* 인지 상태 */}
                <div>
                  <Flex justify="between" align="center">
                    <Text size="2" weight="medium">인지 상태</Text>
                    <Text size="2" weight="medium">{schedule.cognitiveStatus}</Text>
                  </Flex>
                </div>

                <div className="w-full h-px bg-gray-200"></div>

                {/* 동거 상태 */}
                <div>
                  <Flex justify="between" align="center">
                    <Text size="2" weight="medium">동거 상태</Text>
                    <Text size="2" weight="medium">{schedule.cohabitationStatus}</Text>
                  </Flex>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* 신청자 입력 특이사항 */}
        <div>
          <Heading size="4" className="mb-4">신청자 입력 특이사항</Heading>
          <Card className="p-4">
            <Text size="2" className="whitespace-pre-wrap">{schedule.specialNotes}</Text>
          </Card>
        </div>

        {/* 하단 CTA */}
        <Flex gap="3" justify="center">
          {schedule.status === 'institution_not_selected' && (
            <Button onClick={handleSelectInstitution} className="flex-1">
              기관 선택
            </Button>
          )}
          {schedule.status === 'scheduled' && !schedule.isRegular && (
            <>
              <Button variant="outline" onClick={() => navigate('/main/schedule')} className="flex-1">
                일정 목록으로 돌아가기
              </Button>
              <Button variant="soft" color="red" onClick={handleReject} className="flex-1">
                거절
              </Button>
            </>
          )}
          {schedule.status === 'scheduled' && schedule.isRegular && (
            <>
              <Button variant="outline" onClick={() => navigate('/main/schedule')} className="flex-1">
                일정 목록으로 돌아가기
              </Button>
              <Button variant="soft" color="orange" onClick={handleSkip} className="flex-1">
                이번 회차 건너뛰기
              </Button>
            </>
          )}
          {schedule.status === 'completed' && (
            <Button variant="outline" onClick={() => navigate('/main/schedule')} className="flex-1">
              일정 목록으로 돌아가기
            </Button>
          )}
        </Flex>
      </Flex>
    </Container>
  );
}
