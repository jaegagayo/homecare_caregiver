import { useState } from 'react';
import { Card } from '@radix-ui/themes';
import { CalendarIcon, ClockIcon } from '@radix-ui/react-icons';

export default function CaregiverSchedulePage() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // 더미 일정 데이터
  const schedules = [
    {
      id: 1,
      date: '2024-08-08',
      time: '09:00-11:00',
      clientName: '김영희',
      service: '일상생활 지원',
      location: '강남구 역삼동',
      status: '예정',
    },
    {
      id: 2,
      date: '2024-08-08',
      time: '14:00-16:00',
      clientName: '박철수',
      service: '목욕 서비스',
      location: '서초구 서초동',
      status: '예정',
    },
    {
      id: 3,
      date: '2024-08-09',
      time: '10:00-12:00',
      clientName: '이순자',
      service: '식사 도움',
      location: '송파구 문정동',
      status: '예정',
    },
    {
      id: 4,
      date: '2024-08-09',
      time: '15:00-17:00',
      clientName: '정미영',
      service: '재활 보조',
      location: '강동구 천호동',
      status: '예정',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case '완료':
        return 'bg-green-100 text-green-800';
      case '예정':
        return 'bg-blue-100 text-blue-800';
      case '취소':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">일정 관리</h1>
      
      {/* 일정 필터 */}
      <div className="mb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <CalendarIcon />
            <span className="font-medium">날짜 선택:</span>
            <input
              type="date"
              value={selectedDate.toISOString().split('T')[0]}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
              className="border rounded px-3 py-1"
            />
          </div>
        </div>
      </div>

      {/* 일정 목록 */}
      <div className="space-y-4">
        {schedules.map((schedule) => (
          <Card key={schedule.id}>
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <ClockIcon className="text-gray-500" />
                    <span className="font-medium">{schedule.time}</span>
                    <span className="text-gray-500">|</span>
                    <span className="text-gray-600">{schedule.date}</span>
                  </div>
                  
                  <div className="mb-2">
                    <h3 className="text-lg font-semibold">{schedule.clientName}</h3>
                    <p className="text-gray-600">{schedule.service}</p>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>📍</span>
                    <span>{schedule.location}</span>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(schedule.status)}`}>
                    {schedule.status}
                  </span>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                      상세보기
                    </button>
                    <button className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600">
                      완료
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* 월간 통계 */}
      <Card className="mt-8">
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-4">이번 달 통계</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">24</div>
              <div className="text-sm text-gray-600">총 서비스</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">48</div>
              <div className="text-sm text-gray-600">총 시간</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">12</div>
              <div className="text-sm text-gray-600">고객 수</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
