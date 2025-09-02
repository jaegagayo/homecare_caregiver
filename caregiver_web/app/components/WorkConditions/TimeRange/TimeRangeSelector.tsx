import { Flex, Text } from "@radix-ui/themes";
import { WorkConditions } from "../../../types/workConditions";

interface TimeRangeSelectorProps {
  workConditions: WorkConditions;
  onTimeRangeClick: () => void;
}

export default function TimeRangeSelector({
  workConditions,
  onTimeRangeClick
}: TimeRangeSelectorProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onTimeRangeClick();
    }
  };

  return (
    <button 
      className="py-1 px-2 cursor-pointer hover:bg-gray-50 w-full text-left border-none bg-transparent" 
      onClick={onTimeRangeClick}
      onKeyDown={handleKeyDown}
      type="button"
    >
      <Flex justify="between" align="center">
        <Text size="3" weight="medium">근무 가능 시간</Text>
        <Text size="3" weight="medium">
          {workConditions.workStartTime && workConditions.workEndTime 
            ? `${workConditions.workStartTime} ~ ${workConditions.workEndTime}`
            : "상관없음"
          }
        </Text>
      </Flex>
    </button>
  );
}
