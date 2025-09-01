import { Dialog, Flex, Text, Button } from "@radix-ui/themes";
import { X } from "lucide-react";
import { useState } from "react";

interface BufferTimeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentBufferTime: number;
  onSave: (bufferTime: number) => void;
  onCancel: () => void;
}

export default function BufferTimeDialog({
  open,
  onOpenChange,
  currentBufferTime,
  onSave,
  onCancel
}: BufferTimeDialogProps) {
  const [bufferTime, setBufferTime] = useState(currentBufferTime.toString());

  const handleSave = () => {
    const time = parseInt(bufferTime);
    if (!isNaN(time) && time >= 0) {
      onSave(time);
    }
  };

  const handleBufferTimeChange = (value: string) => {
    const numValue = value.replace(/[^0-9]/g, '');
    setBufferTime(numValue);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content>
        <Flex direction="column" gap="4">
          <Flex justify="between" align="center">
            <Dialog.Title className="flex items-center">쉬는 시간 설정</Dialog.Title>
            <Button 
              variant="ghost" 
              size="2"
              onClick={onCancel}
              className="flex items-center gap-1 self-center -mt-4"
            >
              <X size={16} />
              <Text size="2" weight="medium">닫기</Text>
            </Button>
          </Flex>
          
          <Flex direction="column" gap="3">
            <Text size="2" weight="medium" className="mb-2">쉬는 시간 (분)</Text>
            <input
              type="text"
              value={bufferTime}
              onChange={(e) => handleBufferTimeChange(e.target.value)}
              placeholder="쉬는 시간을 입력하세요"
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Text size="1" color="gray">
              근무 간 이동 시간을 제외한 휴식 시간을 설정합니다.
            </Text>
          </Flex>
          
          <Flex gap="3" className="mt-4">
            <Button 
              onClick={handleSave}
              className="flex-1"
            >
              저장
            </Button>
            <Button 
              variant="outline"
              onClick={onCancel}
              className="flex-1"
            >
              취소
            </Button>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
