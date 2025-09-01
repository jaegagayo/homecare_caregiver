import { Flex, Text, Button, Heading } from "@radix-ui/themes";
import { WorkConditions, DayOfWeek } from "../../../types/workConditions";
import {
  ConditionItem,
  TimeRangeSelector,
  AreaSelector,
  ServiceTypeSelector,
  DurationSelector,
  TransportationSelector,
  LunchTimeSelector,
  BufferTimeSelector,
  CareTypeSelector,
  PreferredAgeSelector,
  PreferredGenderSelector
} from "../index";

interface DetailSettingsFormProps {
  workConditions: WorkConditions;
  isFromAnalysis?: boolean;
  onWorkDaysClick: () => void;
  onTimeRangeClick: () => void;
  onAvailableTimeClick: () => void;
  onAreaClick: () => void;
  onServiceTypeClick: () => void;
  onDurationClick: () => void;
  onTransportationClick: () => void;
  onLunchTimeClick: () => void;
  onBufferTimeClick: () => void;
  onCareTypeClick: () => void;
  onPreferredAgeClick: () => void;
  onPreferredGenderClick: () => void;
  onSave: () => void;
  onBackToNatural: () => void;
}

export default function DetailSettingsForm({
  workConditions,
  isFromAnalysis = false,
  onWorkDaysClick,
  onTimeRangeClick,
  onAvailableTimeClick,
  onAreaClick,
  onServiceTypeClick,
  onDurationClick,
  onTransportationClick,
  onLunchTimeClick,
  onBufferTimeClick,
  onCareTypeClick,
  onPreferredAgeClick,
  onPreferredGenderClick,
  onSave,
  onBackToNatural
}: DetailSettingsFormProps) {
  // DayOfWeek enum을 한글로 표시하는 매핑
  const dayDisplayMap: Record<DayOfWeek, string> = {
    [DayOfWeek.MONDAY]: '월',
    [DayOfWeek.TUESDAY]: '화',
    [DayOfWeek.WEDNESDAY]: '수',
    [DayOfWeek.THURSDAY]: '목',
    [DayOfWeek.FRIDAY]: '금',
    [DayOfWeek.SATURDAY]: '토',
    [DayOfWeek.SUNDAY]: '일'
  };

  return (
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
        <ConditionItem
          label="근무 가능 요일"
          value={workConditions.dayOfWeek.map(day => dayDisplayMap[day]).join(', ')}
          onClick={onWorkDaysClick}
        />

        {/* 근무 가능 시간 섹션 */}
        <TimeRangeSelector
          workConditions={workConditions}
          onTimeRangeClick={onTimeRangeClick}
        />

        <div className="w-full h-px bg-gray-200"></div>

        {/* 1회 최소·최대 근무시간 섹션 */}
        <DurationSelector
          workConditions={workConditions}
          onDurationClick={onDurationClick}
        />

        <div className="w-full h-px bg-gray-200"></div>

        {/* 이동 가능 시간 섹션 */}
        <ConditionItem
          label="이동 가능 시간"
          value={`${workConditions.availableTime}분`}
          onClick={onAvailableTimeClick}
        />

        {/* 근무 지역 섹션 */}
        <AreaSelector
          workConditions={workConditions}
          onAreaClick={onAreaClick}
        />

        <div className="w-full h-px bg-gray-200"></div>

        {/* 이동수단 섹션 */}
        <TransportationSelector
          workConditions={workConditions}
          onTransportationClick={onTransportationClick}
        />

        <div className="w-full h-px bg-gray-200"></div>

        {/* 점심시간 섹션 */}
        <LunchTimeSelector
          workConditions={workConditions}
          onLunchTimeClick={onLunchTimeClick}
        />

        <div className="w-full h-px bg-gray-200"></div>

        {/* 이동 시간 제외 사이 버퍼 간격 섹션 */}
        <BufferTimeSelector
          workConditions={workConditions}
          onBufferTimeClick={onBufferTimeClick}
        />

        <div className="w-full h-px bg-gray-200"></div>

        {/* 케어 유형 섹션 */}
        <CareTypeSelector
          workConditions={workConditions}
          onCareTypeClick={onCareTypeClick}
        />

        <div className="w-full h-px bg-gray-200"></div>

        {/* 돌봄 선호 연령 섹션 */}
        <PreferredAgeSelector
          workConditions={workConditions}
          onPreferredAgeClick={onPreferredAgeClick}
        />

        <div className="w-full h-px bg-gray-200"></div>

        {/* 돌봄 선호 성별 섹션 */}
        <PreferredGenderSelector
          workConditions={workConditions}
          onPreferredGenderClick={onPreferredGenderClick}
        />

        <div className="w-full h-px bg-gray-200"></div>

        {/* 서비스 유형 섹션 */}
        <ServiceTypeSelector
          workConditions={workConditions}
          onServiceTypeClick={onServiceTypeClick}
        />
      </Flex>

      <Flex gap="3" className="mt-4">
        <Button onClick={onSave} className="flex-1">
          조건 저장
        </Button>
        <Button
          variant="outline"
          onClick={onBackToNatural}
          className="flex-1"
        >
          자연어 입력으로 돌아가기
        </Button>
      </Flex>
    </Flex>
  );
}
