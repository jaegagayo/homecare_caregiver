import { Dialog, Flex, Text, Button } from "@radix-ui/themes";
import { X } from "lucide-react";
import { useState } from "react";

interface CareTypeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentDementiaCare: boolean;
  currentBedriddenCare: boolean;
  onSave: (dementiaCare: boolean, bedriddenCare: boolean) => void;
  onCancel: () => void;
}

export default function CareTypeDialog({
  open,
  onOpenChange,
  currentDementiaCare,
  currentBedriddenCare,
  onSave,
  onCancel
}: CareTypeDialogProps) {
  const [dementiaCare, setDementiaCare] = useState(currentDementiaCare);
  const [bedriddenCare, setBedriddenCare] = useState(currentBedriddenCare);

  const handleSave = () => {
    onSave(dementiaCare, bedriddenCare);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content>
        <Flex direction="column" gap="4">
          <Flex justify="between" align="center">
            <Dialog.Title className="flex items-center">케어 유형 설정</Dialog.Title>
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
                checked={dementiaCare}
                onChange={(e) => setDementiaCare(e.target.checked)}
                className="w-4 h-4"
              />
              <Text size="2">치매 환자 케어 가능</Text>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={bedriddenCare}
                onChange={(e) => setBedriddenCare(e.target.checked)}
                className="w-4 h-4"
              />
              <Text size="2">와상 환자 케어 가능</Text>
            </label>
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
