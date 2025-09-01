import { Dialog, Flex, Text, Button, Select } from "@radix-ui/themes";
import { X } from "lucide-react";
import { useState } from "react";

interface TransportationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentTransportation: string;
  onSave: (transportation: string) => void;
  onCancel: () => void;
}

export default function TransportationDialog({
  open,
  onOpenChange,
  currentTransportation,
  onSave,
  onCancel
}: TransportationDialogProps) {
  const [transportation, setTransportation] = useState(currentTransportation);

  const transportationOptions = [
    '대중교통', '자전거', '오토바이', '자동차', '도보', '기타'
  ];

  const handleSave = () => {
    onSave(transportation);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content>
        <Flex direction="column" gap="4">
          <Flex justify="between" align="center">
            <Dialog.Title className="flex items-center">이동수단 설정</Dialog.Title>
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
            <Text size="2" weight="medium" className="mb-2">이동수단 선택</Text>
            <Select.Root value={transportation} onValueChange={setTransportation}>
              <Select.Trigger />
              <Select.Content>
                {transportationOptions.map((option) => (
                  <Select.Item key={option} value={option}>
                    {option}
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
