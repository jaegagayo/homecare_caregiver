import { Flex, Text } from "@radix-ui/themes";
import { WorkConditions, Disease } from "../../../types/workConditions";

interface CareTypeSelectorProps {
  workConditions: WorkConditions;
  onCareTypeClick: () => void;
}

export default function CareTypeSelector({
  workConditions,
  onCareTypeClick
}: CareTypeSelectorProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onCareTypeClick();
    }
  };

  const getCareTypesText = () => {
    const types = [];
    if (workConditions.supportedConditions.includes(Disease.DEMENTIA)) {
      types.push('치매');
    }
    if (workConditions.supportedConditions.includes(Disease.BEDRIDDEN)) {
      types.push('와상');
    }
    return types.length > 0 ? types.join(', ') : '없음';
  };

  return (
    <button 
      className="py-1 px-2 cursor-pointer hover:bg-gray-50 w-full text-left border-none bg-transparent" 
      onClick={onCareTypeClick}
      onKeyDown={handleKeyDown}
      type="button"
    >
      <Flex justify="between" align="center">
        <Text size="3" weight="medium">케어 유형</Text>
        <Text size="3" weight="medium">{getCareTypesText()}</Text>
      </Flex>
    </button>
  );
}
