import { useState } from "react";
import { 
  Container, 
  Flex, 
  Text, 
  Button,
  TextArea,
  Heading,
  Card,
  Select,
  Checkbox,
  Dialog
} from "@radix-ui/themes";
import { 
  ArrowLeft,
  X
} from "lucide-react";
import { useNavigate } from "@remix-run/react";

interface WorkConditions {
  hourlyRate: {
    min: number;
    max: number;
  };
  workDays: string[];
  workHours: {
    start: string;
    end: string;
  };
  workAreas: string[];
  serviceTypes: string[];
  specialNotes: string[];
}

export default function WorkConditionsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('natural');
  const [naturalInput, setNaturalInput] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [isFromAnalysis, setIsFromAnalysis] = useState<boolean>(false);
  const [isWorkDaysDialogOpen, setIsWorkDaysDialogOpen] = useState<boolean>(false);
  const [tempWorkDays, setTempWorkDays] = useState<string[]>([]);
  const [workConditions, setWorkConditions] = useState<WorkConditions>({
    hourlyRate: { min: 0, max: 50000 },
    workDays: ['월', '화', '수', '목', '금', '토', '일'],
    workHours: { start: '00:00', end: '23:59' },
    workAreas: ['전체'],
    serviceTypes: ['전체'],
    specialNotes: ['없음']
  });

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    // TODO: 실제 AI 분석 로직 구현
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsAnalyzing(false);
    setIsFromAnalysis(true);
    setActiveTab('result');
  };

  const handleWorkDaysClick = () => {
    setTempWorkDays([...workConditions.workDays]);
    setIsWorkDaysDialogOpen(true);
  };

  const handleDayToggle = (day: string) => {
    setTempWorkDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  const handleWeekdaySelect = () => {
    const weekdays = ['월', '화', '수', '목', '금'];
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
    const weekends = ['토', '일'];
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
    const weekdays = ['월', '화', '수', '목', '금'];
    return weekdays.every(day => tempWorkDays.includes(day));
  };

  const isAllWeekendsSelected = () => {
    const weekends = ['토', '일'];
    return weekends.every(day => tempWorkDays.includes(day));
  };

  const handleWorkDaysSave = () => {
    setWorkConditions(prev => ({
      ...prev,
      workDays: tempWorkDays
    }));
    setIsWorkDaysDialogOpen(false);
  };

  const handleWorkDaysCancel = () => {
    setIsWorkDaysDialogOpen(false);
  };

  const handleSave = () => {
    // TODO: 설정 저장 로직
    navigate(-1);
  };

  return (
    <Container size="2" className="p-4">
      <Flex direction="column" gap="6">
        {/* 자연어 입력 섹션 */}
        {activeTab === 'natural' && (
          <Flex direction="column" gap="4">
            <div>
              <Heading size="4">
                어떤 조건으로 근무하고 싶으신가요?
              </Heading>
              <Text size="2" color="gray">
                줄글로 자유롭게 적어주시면 AI가 알아서 설정해드립니다.
              </Text>
            </div>

            <Card className="p-4">
              <Text size="2" weight="medium" className="mb-2 block">입력 예시</Text>
              <Text size="1" color="gray" className="leading-relaxed">
                • &quot;평일 오전에 강남구에서 방문요양 하고 싶어요&quot;<br/>
                • &quot;시급은 15만원 정도면 좋겠어요&quot;<br/>
                • &quot;치매 케어 경험이 있어서 중증 어르신도 괜찮아요&quot;<br/>
                • &quot;야간은 어렵고, 평일 오전에만 가능해요&quot;
              </Text>
            </Card>

            <TextArea
              placeholder="평일 오전 9시부터 6시까지 강남구, 서초구에서 방문요양 하고 싶어요. 시급은 15만원 정도면 좋겠고, 치매 케어 경험이 있어요."
              value={naturalInput}
              onChange={(e) => setNaturalInput(e.target.value)}
              className="min-h-32"
            />

            <Button 
              onClick={handleAnalyze}
              disabled={!naturalInput.trim() || isAnalyzing}
              className="w-full"
              size="3"
            >
              {isAnalyzing ? '분석 중...' : '분석하기'}
            </Button>

            <div className="flex items-center justify-center my-4">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="px-4 text-sm text-gray-500">직접 설정하고 싶으시다면</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            <Button 
              variant="outline"
              onClick={() => setActiveTab('result')}
              className="w-full"
              size="3"
            >
              세부 조정으로 이동
            </Button>
          </Flex>
        )}

        {/* 분석 결과 섹션 */}
        {activeTab === 'result' && (
          <Flex direction="column" gap="4">
            <div className="mb-2">
              <Heading size="4">
                {isFromAnalysis ? 'AI가 이해한 내용을 확인해주세요' : '근무 조건을 설정해주세요'}
              </Heading>
              <Text size="2" color="gray">
                {isFromAnalysis 
                  ? '각 항목을 터치하여 수정할 수 있습니다.' 
                  : '각 항목을 터치하여 원하는 조건으로 설정해주세요.'
                }
              </Text>
            </div>

            <Flex direction="column" gap="4">
              {/* 근무 가능 요일 섹션 */}
              <button 
                className="py-1 px-2 cursor-pointer hover:bg-gray-50 w-full text-left" 
                onClick={handleWorkDaysClick}
              >
                <Flex justify="between" align="center">
                  <Text size="3" weight="medium">근무 가능 요일</Text>
                  <Text size="3" weight="medium">{workConditions.workDays.join(', ')}</Text>
                </Flex>
              </button>

              <div className="w-full h-px bg-gray-200"></div>

              {/* 근무 가능 시간 섹션 */}
              <div className="py-1 px-2 cursor-pointer hover:bg-gray-50">
                <Flex justify="between" align="center">
                  <Text size="3" weight="medium">근무 가능 시간</Text>
                  <Text size="3" weight="medium">{workConditions.workHours.start} ~ {workConditions.workHours.end}</Text>
                </Flex>
              </div>

              <div className="w-full h-px bg-gray-200"></div>

              {/* 근무 지역 섹션 */}
              <div className="py-1 px-2 cursor-pointer hover:bg-gray-50">
                <Flex justify="between" align="center">
                  <Text size="3" weight="medium">근무 지역</Text>
                  <Text size="3" weight="medium">{workConditions.workAreas.join(', ')}</Text>
                </Flex>
              </div>

              <div className="w-full h-px bg-gray-200"></div>

              {/* 서비스 유형 섹션 */}
              <div className="py-1 px-2 cursor-pointer hover:bg-gray-50">
                <Flex justify="between" align="center">
                  <Text size="3" weight="medium">서비스 유형</Text>
                  <Text size="3" weight="medium">{workConditions.serviceTypes.join(', ')}</Text>
                </Flex>
              </div>

              <div className="w-full h-px bg-gray-200"></div>

              {/* 희망 시급 섹션 */}
              <div className="py-1 px-2 cursor-pointer hover:bg-gray-50">
                <Flex justify="between" align="center">
                  <Text size="3" weight="medium">희망 시급</Text>
                  <Text size="4" weight="bold" style={{ color: 'var(--accent-9)' }}>
                    ₩{workConditions.hourlyRate.min.toLocaleString()} ~ ₩{workConditions.hourlyRate.max.toLocaleString()}
                  </Text>
                </Flex>
              </div>

              <div className="w-full h-px bg-gray-200"></div>

              {/* 특이사항 섹션 */}
              <div className="py-1 px-2 cursor-pointer hover:bg-gray-50">
                <Flex direction="column" gap="2">
                  <Text size="3" weight="medium">특이사항</Text>
                  <Flex gap="1" wrap="wrap">
                    <div className="px-3 py-1.5 rounded-full text-sm" style={{ backgroundColor: 'var(--accent-3)', color: 'var(--accent-9)' }}>
                      치매케어
                    </div>
                    <div className="px-3 py-1.5 rounded-full text-sm" style={{ backgroundColor: 'var(--accent-3)', color: 'var(--accent-9)' }}>
                      경험자
                    </div>
                    <div className="px-3 py-1.5 rounded-full text-sm" style={{ backgroundColor: 'var(--accent-3)', color: 'var(--accent-9)' }}>
                      야간가능
                    </div>
                    <div className="px-3 py-1.5 rounded-full text-sm" style={{ backgroundColor: 'var(--accent-3)', color: 'var(--accent-9)' }}>
                      남성선호
                    </div>
                  </Flex>
                </Flex>
              </div>
            </Flex>

            <Flex gap="3" className="mt-4">
              <Button onClick={handleSave} className="flex-1">
                저장
              </Button>
              <Button 
                variant="outline"
                onClick={() => setActiveTab('natural')}
                className="flex-1"
              >
                자연어 입력으로 돌아가기
              </Button>
            </Flex>
          </Flex>
        )}

        {/* 근무 가능 일자 수정 다이얼로그 */}
        <Dialog.Root open={isWorkDaysDialogOpen} onOpenChange={setIsWorkDaysDialogOpen}>
          <Dialog.Content>
            <Flex direction="column" gap="4">
              <Flex justify="between" align="center">
                <Dialog.Title className="flex items-center">근무 가능 일자 설정</Dialog.Title>
                <Button 
                  variant="ghost" 
                  size="2"
                  onClick={handleWorkDaysCancel}
                  className="flex items-center gap-1 self-center -mt-4"
                >
                  <X size={16} />
                  <Text size="2" weight="medium">닫기</Text>
                </Button>
              </Flex>
              <Flex direction="column" gap="3">
                {/* 요일 선택 섹션 */}
                <Text size="2" weight="medium" className="mb-2">요일 선택</Text>
                
                <Flex direction="column" gap="6">
                  {/* 평일 */}
                  <Flex gap="4" justify="center">
                    {['월', '화', '수', '목', '금'].map((day) => (
                      <button 
                        key={day} 
                        className={`aspect-square w-12 h-12 rounded-full text-center cursor-pointer transition-colors flex items-center justify-center ${
                          tempWorkDays.includes(day) 
                            ? 'text-white' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                        style={{
                          backgroundColor: tempWorkDays.includes(day) 
                            ? 'var(--accent-9)' 
                            : 'var(--gray-3)'
                        }}
                        onClick={() => handleDayToggle(day)}
                      >
                        <Text size="3" weight="medium">{day}</Text>
                      </button>
                    ))}
                  </Flex>
                  
                  {/* 주말 */}
                  <Flex gap="4" justify="center">
                    {['토', '일'].map((day) => (
                      <button 
                        key={day} 
                        className={`aspect-square w-12 h-12 rounded-full text-center cursor-pointer transition-colors flex items-center justify-center ${
                          tempWorkDays.includes(day) 
                            ? 'text-white' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                        style={{
                          backgroundColor: tempWorkDays.includes(day) 
                            ? 'var(--accent-9)' 
                            : 'var(--gray-3)'
                        }}
                        onClick={() => handleDayToggle(day)}
                      >
                        <Text size="3" weight="medium">{day}</Text>
                      </button>
                    ))}
                  </Flex>
                </Flex>

                <div className="w-full h-px bg-gray-200 mt-4"></div>

                {/* 일괄 선택 섹션 */}
                <Text size="2" weight="medium" className="mb-2">일괄 선택</Text>
                
                <Flex gap="4" justify="center">
                  <button 
                    className={`py-3 px-6 rounded-full text-center cursor-pointer transition-colors ${
                      isAllWeekdaysSelected() 
                        ? 'text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    style={{
                      backgroundColor: isAllWeekdaysSelected() 
                        ? 'var(--accent-9)' 
                        : 'var(--gray-3)'
                    }}
                    onClick={handleWeekdaySelect}
                  >
                    <Text size="2" weight="medium">평일 전체</Text>
                  </button>
                  <button 
                    className={`py-3 px-6 rounded-full text-center cursor-pointer transition-colors ${
                      isAllWeekendsSelected() 
                        ? 'text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    style={{
                      backgroundColor: isAllWeekendsSelected() 
                        ? 'var(--accent-9)' 
                        : 'var(--gray-3)'
                    }}
                    onClick={handleWeekendSelect}
                  >
                    <Text size="2" weight="medium">주말 전체</Text>
                  </button>
                </Flex>
              </Flex>
              
              <Flex gap="3" className="mt-4">
                <Button 
                  onClick={handleWorkDaysSave}
                  className="flex-1"
                >
                  저장
                </Button>
                <Button 
                  variant="outline"
                  onClick={handleWorkDaysCancel}
                  className="flex-1"
                >
                  취소
                </Button>
              </Flex>
            </Flex>
          </Dialog.Content>
        </Dialog.Root>
      </Flex>
    </Container>
  );
}
