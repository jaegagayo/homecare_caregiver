import { 
  Text, 
  Badge
} from "@radix-ui/themes";

interface Schedule {
  id: string;
  time: string;
  clientName: string;
  address: string;
  serviceType: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  isRegular?: boolean;
  regularSequence?: { current: number; total: number };
}

interface UpcomingScheduleCardProps {
  schedule: Schedule | null;
  calculateTimeRemaining: (timeString: string) => string;
}

export default function UpcomingScheduleCard({ schedule, calculateTimeRemaining }: UpcomingScheduleCardProps) {
  if (!schedule) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
        <Text color="gray">오늘 예정된 일정이 없습니다.</Text>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-4">
        <div className="space-y-3">
          <div className="space-y-0">
            <div>
              <Text size="5" weight="bold">{schedule.clientName}님</Text>
            </div>
            <div>
              <Text size="3" color="gray">{schedule.address}</Text>
            </div>
            <div className="flex gap-2">
              <Badge color="blue" className="mt-1">{schedule.serviceType}</Badge>
              {schedule.isRegular && schedule.regularSequence && (
                <Badge color="purple" className="mt-1">
                  {schedule.regularSequence.current}회차 (총 {schedule.regularSequence.total}회)
                </Badge>
              )}
            </div>
          </div>
          <div className="w-full aspect-[4/3] bg-gray-200 rounded-lg flex items-center justify-center">
            <Text size="2" color="gray">지도 영역</Text>
          </div>
          <div>
            <Text size="3" color="gray">
              시작까지 {calculateTimeRemaining(schedule.time)} 전 ({schedule.time})
            </Text>
          </div>
          <div className="border-t border-gray-200 pt-3">
            <Text size="2" color="gray">
              고객님께서 계단이 있는 3층에 거주하고 계십니다. 엘리베이터는 1층에만 있어서 2-3층은 계단을 이용해야 합니다. 고객님은 보행기 사용이 필요하시며, 화장실은 복도 끝에 위치해 있습니다. 방문 시에는 반드시 신발을 벗고 들어가시기 바랍니다.
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}
