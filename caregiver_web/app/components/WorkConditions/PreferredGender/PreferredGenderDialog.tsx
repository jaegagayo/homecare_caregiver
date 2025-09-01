import { Dialog, Flex, Text, Button, Select } from "@radix-ui/themes";
import { X } from "lucide-react";
import { useState } from "react";

interface PreferredGenderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentPreferredGender: string;
  onSave: (preferredGender: string) => void;
  onCancel: () => void;
}

export default function PreferredGenderDialog({
  open,
  onOpenChange,
  currentPreferredGender,
  onSave,
  onCancel
}: PreferredGenderDialogProps) {
  const [preferredGender, setPreferredGender] = useState(currentPreferredGender);

  const genderOptions = [
    '상관없음', '남성', '여성'
  ];

  const handleSave = () => {
    onSave(preferredGender);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content>
        <Flex direction="column" gap="4">
          <Flex justify="between" align="center">
            <Dialog.Title className="flex items-center">선호 성별 설정</Dialog.Title>
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
            <Text size="2" weight="medium" className="mb-2">선호 성별 선택</Text>
            <Select.Root value={preferredGender} onValueChange={setPreferredGender}>
              <Select.Trigger />
              <Select.Content>
                {genderOptions.map((option) => (
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
