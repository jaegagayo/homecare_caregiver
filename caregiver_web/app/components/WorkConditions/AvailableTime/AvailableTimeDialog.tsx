import { Dialog, Flex, Text, Button } from "@radix-ui/themes";
import { X } from "lucide-react";
import { useState } from "react";

interface AvailableTimeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentAvailableTime: number | null | undefined;
  onSave: (availableTime: number | null) => void;
  onCancel: () => void;
}

export default function AvailableTimeDialog({
  open,
  onOpenChange,
  currentAvailableTime,
  onSave,
  onCancel
}: AvailableTimeDialogProps) {
  // currentAvailableTime이 null이나 undefined일 경우 "상관없음" 표시
  const isNullValue = currentAvailableTime === null || currentAvailableTime === undefined;
  const [availableTime, setAvailableTime] = useState(
    isNullValue ? "상관없음" : currentAvailableTime.toString()
  );

  const handleSave = () => {
    // "상관없음"인 경우 null로 저장
    if (availableTime === "상관없음") {
      onSave(null);
      return;
    }
    
    const time = parseInt(availableTime);
    if (!isNaN(time) && time >= 0) {
      onSave(time);
    }
  };

  const handleAvailableTimeChange = (value: string) => {
    // "상관없음" 입력 허용
    if (value === "상관없음") {
      setAvailableTime(value);
      return;
    }
    
    const numValue = value.replace(/[^0-9]/g, '');
    setAvailableTime(numValue);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content>
        <Flex direction="column" gap="4">
          <Flex justify="between" align="center">
            <Dialog.Title className="flex items-center">이동 가능 시간 설정</Dialog.Title>
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
            <Text size="2" weight="medium" className="mb-2">이동 가능 시간 (분)</Text>
            <input
              type="text"
              value={availableTime}
              onChange={(e) => handleAvailableTimeChange(e.target.value)}
              placeholder="이동 가능 시간을 입력하세요"
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Text size="1" color="gray">
              근무지까지 이동하는데 걸리는 시간을 설정합니다.
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
