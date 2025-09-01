import { Dialog, Flex, Text, Button } from "@radix-ui/themes";
import { X } from "lucide-react";
import { useState } from "react";

interface AreaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentAreas: string[];
  onSave: (areas: string[]) => void;
  onCancel: () => void;
}

export default function AreaDialog({
  open,
  onOpenChange,
  currentAreas,
  onSave,
  onCancel
}: AreaDialogProps) {
  const [selectedAreas, setSelectedAreas] = useState<string[]>(currentAreas);

  const seoulAreas = [
    '강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구',
    '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구',
    '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구'
  ];

  const handleAreaToggle = (area: string) => {
    setSelectedAreas(prev => 
      prev.includes(area) 
        ? prev.filter(a => a !== area)
        : [...prev, area]
    );
  };

  const handleSelectAll = () => {
    setSelectedAreas(seoulAreas);
  };

  const handleDeselectAll = () => {
    setSelectedAreas([]);
  };

  const handleSave = () => {
    onSave(selectedAreas);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content>
        <Flex direction="column" gap="4">
          <Flex justify="between" align="center">
            <Dialog.Title className="flex items-center">근무 지역 설정</Dialog.Title>
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

            <div className="max-h-60 overflow-y-auto">
              <Flex direction="column" gap="2">
                {seoulAreas.map((area) => (
                  <label key={area} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedAreas.includes(area)}
                      onChange={() => handleAreaToggle(area)}
                      className="w-4 h-4"
                    />
                    <Text size="2">{area}</Text>
                  </label>
                ))}
              </Flex>
            </div>
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
