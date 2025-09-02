import { Flex, Text } from "@radix-ui/themes";
import { WorkConditions } from "../../../types/workConditions";

interface LunchTimeSelectorProps {
  workConditions: WorkConditions;
  onLunchTimeClick: () => void;
}

export default function LunchTimeSelector({
  workConditions,
  onLunchTimeClick
}: LunchTimeSelectorProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onLunchTimeClick();
    }
  };

  return (
    <button 
      className="py-1 px-2 cursor-pointer hover:bg-gray-50 w-full text-left border-none bg-transparent" 
      onClick={onLunchTimeClick}
      onKeyDown={handleKeyDown}
      type="button"
    >
      <Flex justify="between" align="center">
        <Text size="3" weight="medium">점심시간</Text>
        <Text size="3" weight="medium">
          {workConditions.lunchBreak && workConditions.lunchBreak > 0 
            ? `${workConditions.lunchBreak}분` 
            : workConditions.lunchBreak === null 
              ? '상관없음' 
              : '포함 안함'
          }
        </Text>
      </Flex>
    </button>
  );
}
