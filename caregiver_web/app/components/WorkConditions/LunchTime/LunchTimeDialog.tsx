import { Dialog, Flex, Text, Button } from "@radix-ui/themes";
import { X } from "lucide-react";
import { useState } from "react";

interface LunchTimeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentIncluded: boolean;
  currentDuration: number | null | undefined;
  onSave: (included: boolean, duration: number | null) => void;
  onCancel: () => void;
}

export default function LunchTimeDialog({
  open,
  onOpenChange,
  currentIncluded,
  currentDuration,
  onSave,
  onCancel
}: LunchTimeDialogProps) {
  const [included, setIncluded] = useState(currentIncluded);
  // currentDuration이 null이나 undefined일 경우 "상관없음" 표시
  const isNullValue = currentDuration === null || currentDuration === undefined;
  const [duration, setDuration] = useState(
    isNullValue ? "상관없음" : currentDuration.toString()
  );

  const handleSave = () => {
    // "상관없음"인 경우 null로 저장
    if (duration === "상관없음") {
      onSave(included, null);
      return;
    }
    
    const durationNum = parseInt(duration);
    if (!isNaN(durationNum) && durationNum > 0) {
      onSave(included, durationNum);
    }
  };

  const handleDurationChange = (value: string) => {
    // "상관없음" 입력 허용
    if (value === "상관없음") {
      setDuration(value);
      return;
    }
    
    const numValue = value.replace(/[^0-9]/g, '');
    setDuration(numValue);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content>
        <Flex direction="column" gap="4">
          <Flex justify="between" align="center">
            <Dialog.Title className="flex items-center">점심시간 설정</Dialog.Title>
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
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={included}
                onChange={(e) => setIncluded(e.target.checked)}
                className="w-4 h-4"
              />
              <Text size="2">점심시간 포함</Text>
            </label>

            {included && (
              <>
                <Text size="2" weight="medium" className="mb-2">점심시간 (분)</Text>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => handleDurationChange(e.target.value)}
                  placeholder="점심시간을 입력하세요"
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </>
            )}
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
