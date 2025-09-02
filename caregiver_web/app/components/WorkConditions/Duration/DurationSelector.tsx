import { Flex, Text } from "@radix-ui/themes";
import { WorkConditions } from "../../../types/workConditions";

interface DurationSelectorProps {
  workConditions: WorkConditions;
  onDurationClick: () => void;
}

export default function DurationSelector({
  workConditions,
  onDurationClick
}: DurationSelectorProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onDurationClick();
    }
  };

  return (
    <button 
      className="py-1 px-2 cursor-pointer hover:bg-gray-50 w-full text-left border-none bg-transparent" 
      onClick={onDurationClick}
      onKeyDown={handleKeyDown}
      type="button"
    >
      <Flex justify="between" align="center">
        <Text size="3" weight="medium">1회 최소·최대 근무시간</Text>
        <Text size="3" weight="medium">
          {workConditions.workMinTime && workConditions.workMaxTime
            ? `${workConditions.workMinTime}시간 ~ ${workConditions.workMaxTime}시간`
            : "상관없음"
          }
        </Text>
      </Flex>
    </button>
  );
}
