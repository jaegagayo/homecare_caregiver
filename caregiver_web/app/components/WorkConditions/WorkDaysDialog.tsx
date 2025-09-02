import { Dialog, Flex, Text, Button } from "@radix-ui/themes";
import { X } from "lucide-react";
import { DayOfWeek } from "../../types/workConditions";
import { getDayOfWeekKorean } from "../../utils";

interface WorkDaysDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDays: DayOfWeek[];
  onDayToggle: (day: DayOfWeek) => void;
  onWeekdaySelect: () => void;
  onWeekendSelect: () => void;
  onSave: () => void;
  onCancel: () => void;
  isAllWeekdaysSelected: () => boolean;
  isAllWeekendsSelected: () => boolean;
}

export default function WorkDaysDialog({
  open,
  onOpenChange,
  selectedDays,
  onDayToggle,
  onWeekdaySelect,
  onWeekendSelect,
  onSave,
  onCancel,
  isAllWeekdaysSelected,
  isAllWeekendsSelected
}: WorkDaysDialogProps) {
  const weekdays = [DayOfWeek.MONDAY, DayOfWeek.TUESDAY, DayOfWeek.WEDNESDAY, DayOfWeek.THURSDAY, DayOfWeek.FRIDAY];
  const weekends = [DayOfWeek.SATURDAY, DayOfWeek.SUNDAY];

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content>
        <Flex direction="column" gap="4">
          <Flex justify="between" align="center">
            <Dialog.Title className="flex items-center">근무 가능 일자 설정</Dialog.Title>
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
            {/* 요일 선택 섹션 */}
            <Text size="2" weight="medium" className="mb-2">요일 선택</Text>
            
            <Flex direction="column" gap="6">
              {/* 평일 */}
              <Flex gap="4" justify="center">
                {weekdays.map((day) => (
                  <button 
                    key={day} 
                    className={`aspect-square w-12 h-12 rounded-full text-center cursor-pointer transition-colors flex items-center justify-center ${
                      selectedDays.includes(day) 
                        ? 'text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    style={{
                      backgroundColor: selectedDays.includes(day) 
                        ? 'var(--accent-9)' 
                        : 'var(--gray-3)'
                    }}
                    onClick={() => onDayToggle(day)}
                  >
                    <Text size="3" weight="medium">{getDayOfWeekKorean(day)}</Text>
                  </button>
                ))}
              </Flex>
              
              {/* 주말 */}
              <Flex gap="4" justify="center">
                {weekends.map((day) => (
                  <button 
                    key={day} 
                    className={`aspect-square w-12 h-12 rounded-full text-center cursor-pointer transition-colors flex items-center justify-center ${
                      selectedDays.includes(day) 
                        ? 'text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    style={{
                      backgroundColor: selectedDays.includes(day) 
                        ? 'var(--accent-9)' 
                        : 'var(--gray-3)'
                    }}
                    onClick={() => onDayToggle(day)}
                  >
                    <Text size="3" weight="medium">{getDayOfWeekKorean(day)}</Text>
                  </button>
                ))}
              </Flex>
            </Flex>

            <div className="w-full h-px bg-gray-200 mt-4"></div>

            {/* 일괄 선택 섹션 */}
            <Text size="2" weight="medium" className="mb-2">일괄 선택</Text>
            
            <Flex gap="3">
              <Button 
                variant="outline" 
                size="2" 
                onClick={onWeekdaySelect}
                className="flex-1"
              >
                {isAllWeekdaysSelected() ? '평일 해제' : '평일 전체'}
              </Button>
              <Button 
                variant="outline" 
                size="2" 
                onClick={onWeekendSelect}
                className="flex-1"
              >
                {isAllWeekendsSelected() ? '주말 해제' : '주말 전체'}
              </Button>
            </Flex>

            <div className="w-full h-px bg-gray-200 mt-4"></div>

            {/* 선택된 요일 표시 */}
            <Text size="2" weight="medium" className="mb-2">선택된 요일</Text>
            <Text size="2" color="gray">
              {selectedDays.length > 0 
                ? selectedDays.map(day => getDayOfWeekKorean(day)).join(', ')
                : '선택된 요일이 없습니다.'
              }
            </Text>

            <div className="w-full h-px bg-gray-200 mt-4"></div>

            {/* 버튼 섹션 */}
            <Flex gap="3" className="mt-4">
              <Button onClick={onSave} className="flex-1">
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
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
