import { WorkConditions, DayOfWeek } from "../../../types/workConditions";

interface WorkDaysSelectorProps {
  workConditions: WorkConditions;
  onWorkDaysClick: () => void;
}

export default function WorkDaysSelector({
  workConditions,
  onWorkDaysClick
}: WorkDaysSelectorProps) {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onWorkDaysClick();
    }
  };

  // DayOfWeek enum을 한글로 표시하는 매핑
  const dayDisplayMap: Record<DayOfWeek, string> = {
    [DayOfWeek.MONDAY]: '월',
    [DayOfWeek.TUESDAY]: '화',
    [DayOfWeek.WEDNESDAY]: '수',
    [DayOfWeek.THURSDAY]: '목',
    [DayOfWeek.FRIDAY]: '금',
    [DayOfWeek.SATURDAY]: '토',
    [DayOfWeek.SUNDAY]: '일'
  };

  return (
    <button 
      type="button"
      className="py-1 px-2 cursor-pointer hover:bg-gray-50 w-full text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset" 
      onClick={onWorkDaysClick}
      onKeyDown={handleKeyDown}
    >
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">근무 가능 요일</span>
        <span className="text-sm font-medium">
          {workConditions.dayOfWeek.map(day => dayDisplayMap[day]).join(', ')}
        </span>
      </div>
    </button>
  );
}
