import { 
  Text, 
  Badge,
  Button
} from "@radix-ui/themes";
import { MapPin } from "lucide-react";
import { formatTime } from "../../utils/formatters";
import { Schedule } from "../../types";

interface UpcomingScheduleCardProps {
  schedule: Schedule | null;
  calculateTimeRemaining: (timeString: string) => string;
}

export default function UpcomingScheduleCard({ schedule, calculateTimeRemaining }: UpcomingScheduleCardProps) {
  if (!schedule) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
        <Text color="gray">오늘 예정된 일정이 없습니다.</Text>
      </div>
    );
  }

  const timeInfo = formatTime(schedule.time);

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      {/* 시간 정보 - 카드 바깥쪽으로 확장 */}
      <div className="rounded-t-lg p-4 space-y-2" style={{ backgroundColor: 'var(--accent-3)' }}>
        <Text size="4" weight="medium" className="block" style={{ color: 'var(--accent-11)' }}>
          {timeInfo.start} ~ {timeInfo.end}
        </Text>
        <Text size="3" style={{ color: 'var(--accent-11)' }}>
          시작까지 {calculateTimeRemaining(schedule.time)} 전
        </Text>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">

          {/* 고객 정보 */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Text size="5" weight="bold">{schedule.clientName}님</Text>
              <div className="flex gap-2">
                <Badge color="blue" className="text-xs">{schedule.serviceType}</Badge>
                {schedule.isRegular && schedule.regularSequence && (
                  <Badge variant="soft" color="purple" className="text-xs">
                    {schedule.regularSequence.current}회차 (총 {schedule.regularSequence.total}회)
                  </Badge>
                )}
              </div>
            </div>
            
            {/* 주소와 네이버 지도 버튼 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-gray-500" />
                <Text size="3" color="gray">{schedule.address}</Text>
              </div>
              <Button size="2" variant="outline">
                네이버 지도로 보기
              </Button>
            </div>
          </div>

          {/* 고객 특이사항 */}
          <div className="pt-1">
            <Text size="2" color="gray">
              고객님께서 계단이 있는 3층에 거주하고 계십니다. 엘리베이터는 1층에만 있어서 2-3층은 계단을 이용해야 합니다. 고객님은 보행기 사용이 필요하시며, 화장실은 복도 끝에 위치해 있습니다. 방문 시에는 반드시 신발을 벗고 들어가시기 바랍니다.
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}
