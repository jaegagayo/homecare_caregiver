import { useState, useEffect } from "react";
import { Container, Flex } from "@radix-ui/themes";
import { useNavigate, useSearchParams } from "@remix-run/react";
import { 
  NaturalLanguageInput, 
  DetailSettingsForm, 
  WorkDaysDialog,
  TimeRangeDialog,
  AreaDialog,
  ServiceTypeDialog,
  DurationDialog,
  TransportationDialog,
  LunchTimeDialog,
  BufferTimeDialog,
  CareTypeDialog,
  PreferredAgeDialog,
  PreferredGenderDialog,
  AvailableTimeDialog
} from "../components/WorkConditions";
import { WorkConditions, DayOfWeek, ServiceType, Disease, PreferredGender, AddressType } from "../types/workConditions";
import { getWorkConditions, saveWorkConditions } from "../api/workConditions";

// localStorage에서 caregiverId를 가져오는 함수
const getStoredCaregiverId = (): string => {
  return localStorage.getItem('caregiverId') || '';
};

export default function WorkConditionsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  // 최초 생성인지 변경인지 확인 - URL 파라미터로만 판단
  const isInitialSetup = searchParams.get('mode') === 'initial';
  
  // 기존 사용자는 세부 설정 화면부터, 신규 사용자는 자연어 입력 화면부터
  const [activeTab, setActiveTab] = useState<string>(isInitialSetup ? 'natural' : 'result');
  const [naturalInput, setNaturalInput] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [isFromAnalysis, setIsFromAnalysis] = useState<boolean>(false);
  const [isWorkDaysDialogOpen, setIsWorkDaysDialogOpen] = useState<boolean>(false);
  const [tempWorkDays, setTempWorkDays] = useState<DayOfWeek[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // 다이얼로그 상태들
  const [isTimeRangeDialogOpen, setIsTimeRangeDialogOpen] = useState<boolean>(false);
  const [isAvailableTimeDialogOpen, setIsAvailableTimeDialogOpen] = useState<boolean>(false);
  const [isAreaDialogOpen, setIsAreaDialogOpen] = useState<boolean>(false);
  const [isServiceTypeDialogOpen, setIsServiceTypeDialogOpen] = useState<boolean>(false);
  const [isDurationDialogOpen, setIsDurationDialogOpen] = useState<boolean>(false);
  const [isTransportationDialogOpen, setIsTransportationDialogOpen] = useState<boolean>(false);
  const [isLunchTimeDialogOpen, setIsLunchTimeDialogOpen] = useState<boolean>(false);
  const [isBufferTimeDialogOpen, setIsBufferTimeDialogOpen] = useState<boolean>(false);
  const [isCareTypeDialogOpen, setIsCareTypeDialogOpen] = useState<boolean>(false);
  const [isPreferredAgeDialogOpen, setIsPreferredAgeDialogOpen] = useState<boolean>(false);
  const [isPreferredGenderDialogOpen, setIsPreferredGenderDialogOpen] = useState<boolean>(false);
  
  // 새로운 타입에 맞는 초기값
  const [workConditions, setWorkConditions] = useState<WorkConditions>({
    dayOfWeek: [DayOfWeek.MONDAY, DayOfWeek.TUESDAY, DayOfWeek.WEDNESDAY, DayOfWeek.THURSDAY, DayOfWeek.FRIDAY, DayOfWeek.SATURDAY, DayOfWeek.SUNDAY],
    workStartTime: '09:00:00',
    workEndTime: '18:00:00',
    workMinTime: 2, // 2시간
    workMaxTime: 8, // 8시간
    availableTime: 30, // 30분
    workArea: '전체',
    addressType: AddressType.ROAD,
    location: { latitude: 37.5665, longitude: 126.9780 }, // 서울시청 기본값
    transportation: '대중교통',
    lunchBreak: 60, // 60분
    bufferTime: 30, // 30분
    supportedConditions: [],
    preferredMinAge: 60,
    preferredMaxAge: 90,
    preferredGender: PreferredGender.ALL,
    serviceTypes: [ServiceType.VISITING_CARE]
  });

  // 컴포넌트 마운트 시 근무 조건 불러오기
  useEffect(() => {
    const loadWorkConditions = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const caregiverId = getStoredCaregiverId();
        if (!caregiverId) {
          setError('로그인이 필요합니다.');
          setIsLoading(false);
          return;
        }

        const savedConditions = await getWorkConditions(caregiverId);
        if (savedConditions) {
          console.log('savedConditions', savedConditions);
          setWorkConditions(savedConditions);
          // 기존 사용자는 세부 설정 화면부터
          setActiveTab('result');
        } else {
          // 신규 사용자는 자연어 입력 화면부터
          setActiveTab('natural');
        }
      } catch (err) {
        console.error('근무 조건 로드 실패:', err);
        setError('근무 조건을 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    loadWorkConditions();
  }, []);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    // TODO: 실제 AI 분석 로직 구현
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsAnalyzing(false);
    setIsFromAnalysis(true);
    setActiveTab('result');
  };

  const handleWorkDaysClick = () => {
    setTempWorkDays([...workConditions.dayOfWeek]);
    setIsWorkDaysDialogOpen(true);
  };

  const handleDayToggle = (day: DayOfWeek) => {
    setTempWorkDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  const handleWeekdaySelect = () => {
    const weekdays = [DayOfWeek.MONDAY, DayOfWeek.TUESDAY, DayOfWeek.WEDNESDAY, DayOfWeek.THURSDAY, DayOfWeek.FRIDAY];
    const allWeekdaysSelected = weekdays.every(day => tempWorkDays.includes(day));
    
    if (allWeekdaysSelected) {
      // 모든 평일이 선택되어 있으면 평일 전체 해제
      setTempWorkDays(prev => prev.filter(day => !weekdays.includes(day)));
    } else {
      // 평일 전체 선택
      const nonWeekdays = tempWorkDays.filter(day => !weekdays.includes(day));
      setTempWorkDays([...nonWeekdays, ...weekdays]);
    }
  };

  const handleWeekendSelect = () => {
    const weekends = [DayOfWeek.SATURDAY, DayOfWeek.SUNDAY];
    const allWeekendsSelected = weekends.every(day => tempWorkDays.includes(day));
    
    if (allWeekendsSelected) {
      // 모든 주말이 선택되어 있으면 주말 전체 해제
      setTempWorkDays(prev => prev.filter(day => !weekends.includes(day)));
    } else {
      // 주말 전체 선택
      const nonWeekends = tempWorkDays.filter(day => !weekends.includes(day));
      setTempWorkDays([...nonWeekends, ...weekends]);
    }
  };

  const isAllWeekdaysSelected = () => {
    const weekdays = [DayOfWeek.MONDAY, DayOfWeek.TUESDAY, DayOfWeek.WEDNESDAY, DayOfWeek.THURSDAY, DayOfWeek.FRIDAY];
    return weekdays.every(day => tempWorkDays.includes(day));
  };

  const isAllWeekendsSelected = () => {
    const weekends = [DayOfWeek.SATURDAY, DayOfWeek.SUNDAY];
    return weekends.every(day => tempWorkDays.includes(day));
  };

  const handleWorkDaysSave = () => {
    setWorkConditions(prev => ({
      ...prev,
      dayOfWeek: tempWorkDays
    }));
    setIsWorkDaysDialogOpen(false);
  };

  const handleWorkDaysCancel = () => {
    setIsWorkDaysDialogOpen(false);
  };

  const handleSave = async () => {
    try {
      const caregiverId = getStoredCaregiverId();
      if (!caregiverId) {
        setError('로그인이 필요합니다.');
        return;
      }

      if (isInitialSetup) {
        // 회원가입 시에만 API 호출
        await saveWorkConditions(caregiverId, workConditions);
        // 로컬 스토리지에 저장 완료 표시
        localStorage.setItem('work_conditions_saved', 'true');
        // 승인 대기 페이지로 이동
        navigate("/main/approval-waiting");
      } else {
        // 마이페이지에서 수정 시에는 API 호출하지 않음
        // 개발용 안내 문구 표시
        alert('개발용 안내: 마이페이지 수정 시에는 백엔드 API가 호출되지 않습니다. 백엔드 팀에서 수정용 API 개발 완료 시 연동 예정입니다.');
        
        // 로컬 스토리지에 저장 완료 표시
        localStorage.setItem('work_conditions_saved', 'true');
        // 메인 페이지로 돌아가기
        navigate("/main/home");
      }
    } catch (err) {
      console.error('근무 조건 저장 실패:', err);
      setError('근무 조건 저장에 실패했습니다.');
    }
  };

  // 로딩 중이거나 에러가 있는 경우
  if (isLoading) {
    return (
      <Container size="2" className="p-4">
        <Flex justify="center" align="center" className="h-32">
          <div>로딩 중...</div>
        </Flex>
      </Container>
    );
  }

  if (error) {
    return (
      <Container size="2" className="p-4">
        <Flex justify="center" align="center" className="h-32">
          <div className="text-red-500">{error}</div>
        </Flex>
      </Container>
    );
  }

  return (
    <Container size="2" className="p-4">
      <Flex direction="column" gap="6">
        {/* 자연어 입력 섹션 */}
        {activeTab === 'natural' && (
          <NaturalLanguageInput
            naturalInput={naturalInput}
            setNaturalInput={setNaturalInput}
            isAnalyzing={isAnalyzing}
            onAnalyze={handleAnalyze}
            onDirectSetup={() => setActiveTab('result')}
          />
        )}

        {/* 분석 결과 섹션 */}
        {activeTab === 'result' && (
          <DetailSettingsForm
            workConditions={workConditions}
            isFromAnalysis={isFromAnalysis}
            onWorkDaysClick={handleWorkDaysClick}
            onTimeRangeClick={() => setIsTimeRangeDialogOpen(true)}
            onAvailableTimeClick={() => setIsAvailableTimeDialogOpen(true)}
            onAreaClick={() => setIsAreaDialogOpen(true)}
            onServiceTypeClick={() => setIsServiceTypeDialogOpen(true)}
            onDurationClick={() => setIsDurationDialogOpen(true)}
            onTransportationClick={() => setIsTransportationDialogOpen(true)}
            onLunchTimeClick={() => setIsLunchTimeDialogOpen(true)}
            onBufferTimeClick={() => setIsBufferTimeDialogOpen(true)}
            onCareTypeClick={() => setIsCareTypeDialogOpen(true)}
            onPreferredAgeClick={() => setIsPreferredAgeDialogOpen(true)}
            onPreferredGenderClick={() => setIsPreferredGenderDialogOpen(true)}
            onSave={handleSave}
            onBackToNatural={() => setActiveTab('natural')}
          />
        )}

        {/* 근무 가능 일자 수정 다이얼로그 */}
        <WorkDaysDialog
          open={isWorkDaysDialogOpen}
          onOpenChange={setIsWorkDaysDialogOpen}
          selectedDays={tempWorkDays}
          onDayToggle={handleDayToggle}
          onWeekdaySelect={handleWeekdaySelect}
          onWeekendSelect={handleWeekendSelect}
          onSave={handleWorkDaysSave}
          onCancel={handleWorkDaysCancel}
          isAllWeekdaysSelected={isAllWeekdaysSelected}
          isAllWeekendsSelected={isAllWeekendsSelected}
        />

        {/* 기타 다이얼로그들 */}
        <TimeRangeDialog
          open={isTimeRangeDialogOpen}
          onOpenChange={setIsTimeRangeDialogOpen}
          currentStartTime={workConditions.workStartTime}
          currentEndTime={workConditions.workEndTime}
          onSave={(start, end) => {
            setWorkConditions(prev => ({
              ...prev,
              workStartTime: start,
              workEndTime: end
            }));
            setIsTimeRangeDialogOpen(false);
          }}
          onCancel={() => setIsTimeRangeDialogOpen(false)}
        />

        <AvailableTimeDialog
          open={isAvailableTimeDialogOpen}
          onOpenChange={setIsAvailableTimeDialogOpen}
          currentAvailableTime={workConditions.availableTime}
          onSave={(availableTime) => {
            setWorkConditions(prev => ({
              ...prev,
              availableTime
            }));
            setIsAvailableTimeDialogOpen(false);
          }}
          onCancel={() => setIsAvailableTimeDialogOpen(false)}
        />

        <AreaDialog
          open={isAreaDialogOpen}
          onOpenChange={setIsAreaDialogOpen}
          currentAreas={[workConditions.workArea]}
          onSave={(areas) => {
            setWorkConditions(prev => ({
              ...prev,
              workArea: areas[0] || '전체'
            }));
            setIsAreaDialogOpen(false);
          }}
          onCancel={() => setIsAreaDialogOpen(false)}
        />

        <ServiceTypeDialog
          open={isServiceTypeDialogOpen}
          onOpenChange={setIsServiceTypeDialogOpen}
          currentServiceTypes={workConditions.serviceTypes}
          onSave={(types) => {
            setWorkConditions(prev => ({
              ...prev,
              serviceTypes: types as ServiceType[]
            }));
            setIsServiceTypeDialogOpen(false);
          }}
          onCancel={() => setIsServiceTypeDialogOpen(false)}
        />

        <DurationDialog
          open={isDurationDialogOpen}
          onOpenChange={setIsDurationDialogOpen}
          currentMinDuration={workConditions.workMinTime}
          currentMaxDuration={workConditions.workMaxTime}
          onSave={(min, max) => {
            setWorkConditions(prev => ({
              ...prev,
              workMinTime: min,
              workMaxTime: max
            }));
            setIsDurationDialogOpen(false);
          }}
          onCancel={() => setIsDurationDialogOpen(false)}
        />

        <TransportationDialog
          open={isTransportationDialogOpen}
          onOpenChange={setIsTransportationDialogOpen}
          currentTransportation={workConditions.transportation}
          onSave={(transportation) => {
            setWorkConditions(prev => ({
              ...prev,
              transportation
            }));
            setIsTransportationDialogOpen(false);
          }}
          onCancel={() => setIsTransportationDialogOpen(false)}
        />

        <LunchTimeDialog
          open={isLunchTimeDialogOpen}
          onOpenChange={setIsLunchTimeDialogOpen}
          currentIncluded={workConditions.lunchBreak > 0}
          currentDuration={workConditions.lunchBreak}
          onSave={(included, duration) => {
            setWorkConditions(prev => ({
              ...prev,
              lunchBreak: included ? duration : 0
            }));
            setIsLunchTimeDialogOpen(false);
          }}
          onCancel={() => setIsLunchTimeDialogOpen(false)}
        />

        <BufferTimeDialog
          open={isBufferTimeDialogOpen}
          onOpenChange={setIsBufferTimeDialogOpen}
          currentBufferTime={workConditions.bufferTime}
          onSave={(bufferTime) => {
            setWorkConditions(prev => ({
              ...prev,
              bufferTime
            }));
            setIsBufferTimeDialogOpen(false);
          }}
          onCancel={() => setIsBufferTimeDialogOpen(false)}
        />

        <CareTypeDialog
          open={isCareTypeDialogOpen}
          onOpenChange={setIsCareTypeDialogOpen}
          currentDementiaCare={workConditions.supportedConditions.includes(Disease.DEMENTIA)}
          currentBedriddenCare={workConditions.supportedConditions.includes(Disease.BEDRIDDEN)}
          onSave={(dementiaCare, bedriddenCare) => {
            const newConditions: Disease[] = [];
            if (dementiaCare) newConditions.push(Disease.DEMENTIA);
            if (bedriddenCare) newConditions.push(Disease.BEDRIDDEN);
            
            setWorkConditions(prev => ({
              ...prev,
              supportedConditions: newConditions
            }));
            setIsCareTypeDialogOpen(false);
          }}
          onCancel={() => setIsCareTypeDialogOpen(false)}
        />

        <PreferredAgeDialog
          open={isPreferredAgeDialogOpen}
          onOpenChange={setIsPreferredAgeDialogOpen}
          currentMinAge={workConditions.preferredMinAge}
          currentMaxAge={workConditions.preferredMaxAge}
          onSave={(min, max) => {
            setWorkConditions(prev => ({
              ...prev,
              preferredMinAge: min,
              preferredMaxAge: max
            }));
            setIsPreferredAgeDialogOpen(false);
          }}
          onCancel={() => setIsPreferredAgeDialogOpen(false)}
        />

        <PreferredGenderDialog
          open={isPreferredGenderDialogOpen}
          onOpenChange={setIsPreferredGenderDialogOpen}
          currentPreferredGender={workConditions.preferredGender}
          onSave={(preferredGender) => {
            setWorkConditions(prev => ({
              ...prev,
              preferredGender: preferredGender as PreferredGender
            }));
            setIsPreferredGenderDialogOpen(false);
          }}
          onCancel={() => setIsPreferredGenderDialogOpen(false)}
        />
      </Flex>
    </Container>
  );
}
