import { Flex, Text } from "@radix-ui/themes";
import { WorkConditions } from "../../../types/workConditions";

interface TransportationSelectorProps {
  workConditions: WorkConditions;
  onTransportationClick: () => void;
}

export default function TransportationSelector({
  workConditions,
  onTransportationClick
}: TransportationSelectorProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onTransportationClick();
    }
  };

  return (
    <button 
      className="py-1 px-2 cursor-pointer hover:bg-gray-50 w-full text-left border-none bg-transparent" 
      onClick={onTransportationClick}
      onKeyDown={handleKeyDown}
      type="button"
    >
      <Flex justify="between" align="center">
        <Text size="3" weight="medium">이동수단</Text>
        <Text size="3" weight="medium">{workConditions.transportation}</Text>
      </Flex>
    </button>
  );
}
