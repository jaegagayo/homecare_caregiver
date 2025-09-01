import { Dialog, Flex, Text, Button, Select } from "@radix-ui/themes";
import { X } from "lucide-react";
import { useState } from "react";

interface TimeRangeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentStartTime: string;
  currentEndTime: string;
  onSave: (startTime: string, endTime: string) => void;
  onCancel: () => void;
}

export default function TimeRangeDialog({
  open,
  onOpenChange,
  currentStartTime,
  currentEndTime,
  onSave,
  onCancel
}: TimeRangeDialogProps) {
  const [startTime, setStartTime] = useState(currentStartTime);
  const [endTime, setEndTime] = useState(currentEndTime);

  const handleSave = () => {
    onSave(startTime, endTime);
  };

  const timeOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return `${hour}:00`;
  });

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content>
        <Flex direction="column" gap="4">
          <Flex justify="between" align="center">
            <Dialog.Title className="flex items-center">근무 가능 시간 설정</Dialog.Title>
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
            <Text size="2" weight="medium" className="mb-2">시작 시간</Text>
            <Select.Root value={startTime} onValueChange={setStartTime}>
              <Select.Trigger />
              <Select.Content>
                {timeOptions.map((time) => (
                  <Select.Item key={time} value={time}>
                    {time}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>

            <Text size="2" weight="medium" className="mb-2">종료 시간</Text>
            <Select.Root value={endTime} onValueChange={setEndTime}>
              <Select.Trigger />
              <Select.Content>
                {timeOptions.map((time) => (
                  <Select.Item key={time} value={time}>
                    {time}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
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
