import { Flex, Text } from "@radix-ui/themes";
import { WorkConditions, PreferredGender } from "../../../types/workConditions";

interface PreferredGenderSelectorProps {
  workConditions: WorkConditions;
  onPreferredGenderClick: () => void;
}

export default function PreferredGenderSelector({
  workConditions,
  onPreferredGenderClick
}: PreferredGenderSelectorProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onPreferredGenderClick();
    }
  };

  // PreferredGender enum을 한글로 표시하는 매핑
  const genderDisplayMap: Record<PreferredGender, string> = {
    [PreferredGender.ALL]: '상관없음',
    [PreferredGender.MALE]: '남성',
    [PreferredGender.FEMALE]: '여성'
  };

  return (
    <button 
      className="py-1 px-2 cursor-pointer hover:bg-gray-50 w-full text-left border-none bg-transparent" 
      onClick={onPreferredGenderClick}
      onKeyDown={handleKeyDown}
      type="button"
    >
      <Flex justify="between" align="center">
        <Text size="3" weight="medium">돌봄 선호 성별</Text>
        <Text size="3" weight="medium">{genderDisplayMap[workConditions.preferredGender]}</Text>
      </Flex>
    </button>
  );
}
