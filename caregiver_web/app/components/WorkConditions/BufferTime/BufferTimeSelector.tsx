import { Flex, Text } from "@radix-ui/themes";
import { WorkConditions } from "../../../types/workConditions";

interface BufferTimeSelectorProps {
  workConditions: WorkConditions;
  onBufferTimeClick: () => void;
}

export default function BufferTimeSelector({
  workConditions,
  onBufferTimeClick
}: BufferTimeSelectorProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onBufferTimeClick();
    }
  };

  return (
    <button 
      className="py-1 px-2 cursor-pointer hover:bg-gray-50 w-full text-left border-none bg-transparent" 
      onClick={onBufferTimeClick}
      onKeyDown={handleKeyDown}
      type="button"
    >
      <Flex justify="between" align="center">
        <Text size="3" weight="medium">이동 시간 제외 사이 버퍼 간격</Text>
        <Text size="3" weight="medium">
          {workConditions.bufferTime ? `${workConditions.bufferTime}분` : "상관없음"}
        </Text>
      </Flex>
    </button>
  );
}
