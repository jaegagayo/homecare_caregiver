import { Dialog, Flex, Text, Button } from "@radix-ui/themes";
import { X } from "lucide-react";
import { useState } from "react";

interface DurationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentMinDuration: number;
  currentMaxDuration: number;
  onSave: (minDuration: number, maxDuration: number) => void;
  onCancel: () => void;
}

export default function DurationDialog({
  open,
  onOpenChange,
  currentMinDuration,
  currentMaxDuration,
  onSave,
  onCancel
}: DurationDialogProps) {
  const [minDuration, setMinDuration] = useState(currentMinDuration.toString());
  const [maxDuration, setMaxDuration] = useState(currentMaxDuration.toString());

  const handleSave = () => {
    const min = parseInt(minDuration);
    const max = parseInt(maxDuration);
    if (!isNaN(min) && !isNaN(max) && min <= max && min > 0 && max <= 24) {
      onSave(min, max); // 시간 단위로 저장
    }
  };

  const handleMinDurationChange = (value: string) => {
    const numValue = value.replace(/[^0-9]/g, '');
    setMinDuration(numValue);
  };

  const handleMaxDurationChange = (value: string) => {
    const numValue = value.replace(/[^0-9]/g, '');
    setMaxDuration(numValue);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content>
        <Flex direction="column" gap="4">
          <Flex justify="between" align="center">
            <Dialog.Title className="flex items-center">근무 시간 설정</Dialog.Title>
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
            <Text size="2" weight="medium" className="mb-2">최소 근무시간 (시간)</Text>
            <input
              type="text"
              value={minDuration}
              onChange={(e) => handleMinDurationChange(e.target.value)}
              placeholder="최소 근무시간을 입력하세요"
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <Text size="2" weight="medium" className="mb-2">최대 근무시간 (시간)</Text>
            <input
              type="text"
              value={maxDuration}
              onChange={(e) => handleMaxDurationChange(e.target.value)}
              placeholder="최대 근무시간을 입력하세요"
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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
