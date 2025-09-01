import { Flex, Text } from "@radix-ui/themes";
import { WorkConditions, ServiceType } from "../../../types/workConditions";

interface ServiceTypeSelectorProps {
  workConditions: WorkConditions;
  onServiceTypeClick: () => void;
}

export default function ServiceTypeSelector({
  workConditions,
  onServiceTypeClick
}: ServiceTypeSelectorProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onServiceTypeClick();
    }
  };

  // ServiceType enum을 한글로 표시하는 매핑
  const serviceTypeDisplayMap: Record<ServiceType, string> = {
    [ServiceType.VISITING_CARE]: '방문 요양',
    [ServiceType.VISITING_BATH]: '방문 목욕',
    [ServiceType.VISITING_NURSING]: '방문 간호',
    [ServiceType.DAY_NIGHT_CARE]: '주야간 보호',
    [ServiceType.RESPITE_CARE]: '단기 보호',
    [ServiceType.IN_HOME_SUPPORT]: '재가 요양 지원'
  };

  return (
    <button 
      className="py-1 px-2 cursor-pointer hover:bg-gray-50 w-full text-left border-none bg-transparent" 
      onClick={onServiceTypeClick}
      onKeyDown={handleKeyDown}
      type="button"
    >
      <Flex justify="between" align="center">
        <Text size="3" weight="medium">서비스 유형</Text>
        <Text size="3" weight="medium">
          {workConditions.serviceTypes.map(type => serviceTypeDisplayMap[type]).join(', ')}
        </Text>
      </Flex>
    </button>
  );
}
