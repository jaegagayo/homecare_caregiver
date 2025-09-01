import { Dialog, Flex, Text, Button } from "@radix-ui/themes";
import { X } from "lucide-react";
import { useState } from "react";

interface PreferredAgeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentMinAge: number;
  currentMaxAge: number;
  onSave: (minAge: number, maxAge: number) => void;
  onCancel: () => void;
}

export default function PreferredAgeDialog({
  open,
  onOpenChange,
  currentMinAge,
  currentMaxAge,
  onSave,
  onCancel
}: PreferredAgeDialogProps) {
  const [minAge, setMinAge] = useState(currentMinAge.toString());
  const [maxAge, setMaxAge] = useState(currentMaxAge.toString());

  const handleSave = () => {
    const min = parseInt(minAge);
    const max = parseInt(maxAge);
    if (!isNaN(min) && !isNaN(max) && min <= max && min >= 0 && max <= 120) {
      onSave(min, max);
    }
  };

  const handleMinAgeChange = (value: string) => {
    const numValue = value.replace(/[^0-9]/g, '');
    setMinAge(numValue);
  };

  const handleMaxAgeChange = (value: string) => {
    const numValue = value.replace(/[^0-9]/g, '');
    setMaxAge(numValue);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content>
        <Flex direction="column" gap="4">
          <Flex justify="between" align="center">
            <Dialog.Title className="flex items-center">선호 연령 설정</Dialog.Title>
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
            <Text size="2" weight="medium" className="mb-2">최소 연령 (세)</Text>
            <input
              type="text"
              value={minAge}
              onChange={(e) => handleMinAgeChange(e.target.value)}
              placeholder="최소 연령을 입력하세요"
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <Text size="2" weight="medium" className="mb-2">최대 연령 (세)</Text>
            <input
              type="text"
              value={maxAge}
              onChange={(e) => handleMaxAgeChange(e.target.value)}
              placeholder="최대 연령을 입력하세요"
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
