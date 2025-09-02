import { Dialog, Flex, Text, Button, Select } from "@radix-ui/themes";
import { X } from "lucide-react";
import { useState } from "react";

interface TimeRangeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentStartTime: string | null | undefined;
  currentEndTime: string | null | undefined;
  onSave: (startTime: string | null, endTime: string | null) => void;
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
  // currentStartTime과 currentEndTime이 null이나 undefined일 경우 "상관없음" 표시
  const isStartNull = currentStartTime === null || currentStartTime === undefined;
  const isEndNull = currentEndTime === null || currentEndTime === undefined;
  const [startTime, setStartTime] = useState(
    isStartNull ? "상관없음" : currentStartTime
  );
  const [endTime, setEndTime] = useState(
    isEndNull ? "상관없음" : currentEndTime
  );

  const handleSave = () => {
    // "상관없음"인 경우 null로 저장
    const finalStartTime = startTime === "상관없음" ? null : startTime;
    const finalEndTime = endTime === "상관없음" ? null : endTime;
    onSave(finalStartTime, finalEndTime);
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
                <Select.Item key="상관없음" value="상관없음">
                  상관없음
                </Select.Item>
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
                <Select.Item key="상관없음" value="상관없음">
                  상관없음
                </Select.Item>
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
