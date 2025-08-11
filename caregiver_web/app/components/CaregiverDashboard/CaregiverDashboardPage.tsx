import { Card } from '@radix-ui/themes';
import { CalendarIcon, ClockIcon, PersonIcon } from '@radix-ui/react-icons';

export default function CaregiverDashboardPage() {
  // 더미 데이터
  const stats = {
    todayServices: 3,
    monthlyEarnings: 2800000,
    totalHours: 156,
    rating: 4.8,
  };

  const recentServices = [
    {
      id: 1,
      clientName: '김영희',
      service: '목욕 서비스',
      date: '2024-08-08',
      time: '14:00-16:00',
      status: '완료',
    },
    {
      id: 2,
      clientName: '박철수',
      service: '식사 도움',
      date: '2024-08-08',
      time: '12:00-13:00',
      status: '완료',
    },
    {
      id: 3,
      clientName: '이순자',
      service: '일상생활 지원',
      date: '2024-08-08',
      time: '09:00-11:00',
      status: '완료',
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">요양보호사 대시보드</h1>
      
      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <CalendarIcon />
              <span className="font-medium">오늘 서비스</span>
            </div>
            <div className="text-2xl font-bold">{stats.todayServices}건</div>
          </div>
        </Card>

        <Card>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <span style={{ color: 'var(--accent-9)' }}>₩</span>
              <span className="font-medium">이번 달 수익</span>
            </div>
            <div className="text-2xl font-bold">
              {stats.monthlyEarnings.toLocaleString()}원
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <ClockIcon />
              <span className="font-medium">총 근무 시간</span>
            </div>
            <div className="text-2xl font-bold">{stats.totalHours}시간</div>
          </div>
        </Card>

        <Card>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <PersonIcon />
              <span className="font-medium">평점</span>
            </div>
            <div className="text-2xl font-bold">{stats.rating}/5.0</div>
          </div>
        </Card>
      </div>

      {/* 최근 서비스 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">최근 서비스</h3>
            <div className="space-y-4">
              {recentServices.map((service) => (
                <div key={service.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">{service.clientName}</div>
                    <div className="text-sm text-gray-600">{service.service}</div>
                    <div className="text-xs text-gray-500">{service.date} {service.time}</div>
                  </div>
                  <span className="px-2 py-1 text-xs rounded-full" style={{ backgroundColor: 'var(--accent-3)', color: 'var(--accent-11)' }}>
                    {service.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">오늘 일정</h3>
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="font-medium">오후 2시 - 목욕 서비스</div>
                <div className="text-sm text-gray-600">김영희 어르신</div>
                <div className="text-xs text-gray-500">2시간 예정</div>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <div className="font-medium">오후 4시 - 식사 도움</div>
                <div className="text-sm text-gray-600">박철수 어르신</div>
                <div className="text-xs text-gray-500">1시간 예정</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
