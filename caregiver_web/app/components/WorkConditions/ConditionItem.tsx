import { Flex, Text } from "@radix-ui/themes";

interface ConditionItemProps {
  label: string;
  value: string | number | React.ReactNode;
  onClick?: () => void;
  isClickable?: boolean;
}

export default function ConditionItem({ 
  label, 
  value, 
  onClick, 
  isClickable = true 
}: ConditionItemProps) {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick?.();
    }
  };

  return (
    <>
      {isClickable ? (
        <button 
          type="button"
          className="py-1 px-2 w-full text-left cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
          onClick={onClick}
          onKeyDown={handleKeyDown}
        >
          <Flex justify="between" align="center">
            <Text size="3" weight="medium">{label}</Text>
            <Text size="3" weight="medium">{value}</Text>
          </Flex>
        </button>
      ) : (
        <div className="py-1 px-2 w-full text-left">
          <Flex justify="between" align="center">
            <Text size="3" weight="medium">{label}</Text>
            <Text size="3" weight="medium">{value}</Text>
          </Flex>
        </div>
      )}
      <div className="w-full h-px bg-gray-200"></div>
    </>
  );
}
