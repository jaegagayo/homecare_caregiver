import { Dialog, Flex, Text, Button } from "@radix-ui/themes";
import { X } from "lucide-react";
import { useState } from "react";

interface ServiceTypeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentServiceTypes: string[];
  onSave: (serviceTypes: string[]) => void;
  onCancel: () => void;
}

export default function ServiceTypeDialog({
  open,
  onOpenChange,
  currentServiceTypes,
  onSave,
  onCancel
}: ServiceTypeDialogProps) {
  const [selectedServiceTypes, setSelectedServiceTypes] = useState<string[]>(currentServiceTypes);

  const serviceTypeOptions = [
    '방문요양', '방문간호', '방문목욕', '방문재활', '주야간보호', '단기보호', '전체'
  ];

  const handleServiceTypeToggle = (serviceType: string) => {
    setSelectedServiceTypes(prev => 
      prev.includes(serviceType) 
        ? prev.filter(s => s !== serviceType)
        : [...prev, serviceType]
    );
  };

  const handleSelectAll = () => {
    setSelectedServiceTypes(serviceTypeOptions);
  };

  const handleDeselectAll = () => {
    setSelectedServiceTypes([]);
  };

  const handleSave = () => {
    onSave(selectedServiceTypes);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content>
        <Flex direction="column" gap="4">
          <Flex justify="between" align="center">
            <Dialog.Title className="flex items-center">서비스 유형 설정</Dialog.Title>
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
            <Flex gap="2" className="mb-2">
              <Button size="1" variant="outline" onClick={handleSelectAll}>
                전체 선택
              </Button>
              <Button size="1" variant="outline" onClick={handleDeselectAll}>
                전체 해제
              </Button>
            </Flex>

            <Flex direction="column" gap="2">
              {serviceTypeOptions.map((serviceType) => (
                <label key={serviceType} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedServiceTypes.includes(serviceType)}
                    onChange={() => handleServiceTypeToggle(serviceType)}
                    className="w-4 h-4"
                  />
                  <Text size="2">{serviceType}</Text>
                </label>
              ))}
            </Flex>
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
