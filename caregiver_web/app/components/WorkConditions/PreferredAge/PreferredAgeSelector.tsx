import { Flex, Text } from "@radix-ui/themes";
import { WorkConditions } from "../../../types/workConditions";

interface PreferredAgeSelectorProps {
  workConditions: WorkConditions;
  onPreferredAgeClick: () => void;
}

export default function PreferredAgeSelector({
  workConditions,
  onPreferredAgeClick
}: PreferredAgeSelectorProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onPreferredAgeClick();
    }
  };

  return (
    <button 
      className="py-1 px-2 cursor-pointer hover:bg-gray-50 w-full text-left border-none bg-transparent" 
      onClick={onPreferredAgeClick}
      onKeyDown={handleKeyDown}
      type="button"
    >
      <Flex justify="between" align="center">
        <Text size="3" weight="medium">돌봄 선호 연령</Text>
        <Text size="3" weight="medium">
          {workConditions.preferredMinAge && workConditions.preferredMaxAge
            ? `${workConditions.preferredMinAge}세 ~ ${workConditions.preferredMaxAge}세`
            : "상관없음"
          }
        </Text>
      </Flex>
    </button>
  );
}
