import { Flex, Text } from "@radix-ui/themes";
import { WorkConditions } from "../../../types/workConditions";

interface AreaSelectorProps {
  workConditions: WorkConditions;
  onAreaClick: () => void;
}

export default function AreaSelector({
  workConditions,
  onAreaClick
}: AreaSelectorProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onAreaClick();
    }
  };

  return (
    <button 
      className="py-1 px-2 cursor-pointer hover:bg-gray-50 w-full text-left border-none bg-transparent" 
      onClick={onAreaClick}
      onKeyDown={handleKeyDown}
      type="button"
    >
      <Flex justify="between" align="center">
        <Text size="3" weight="medium">근무 지역</Text>
        <Text size="3" weight="medium">{workConditions.workArea}</Text>
      </Flex>
    </button>
  );
}
