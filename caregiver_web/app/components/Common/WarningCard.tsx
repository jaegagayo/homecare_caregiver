import { Flex, Text } from "@radix-ui/themes";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface WarningCardProps {
  message: string;
  className?: string;
}

export default function WarningCard({ message, className = "" }: WarningCardProps) {
  return (
    <div className={`bg-amber-50 border border-amber-200 rounded-lg p-3 ${className}`}>
      <Flex align="center" className="px-1" gap="3">
        <ExclamationTriangleIcon className="text-amber-800" width="32" height="32" />
        <Text size="2" className="text-amber-800 font-medium whitespace-pre-line">
          {message}
        </Text>
      </Flex>
    </div>
  );
}
