import { useState } from 'react';
import { Card } from '@radix-ui/themes';
import { StarIcon, ClockIcon, PersonIcon } from '@radix-ui/react-icons';

export default function CaregiverMatchingPage() {
  const [filter, setFilter] = useState('all');

  // 더미 매칭 데이터
  const matchingRequests = [
    {
      id: 1,
      clientName: '김영희',
      age: 78,
      location: '강남구 역삼동',
      service: '목욕 서비스',
      date: '2024-08-10',
      time: '14:00-16:00',
      hourlyRate: 20000,
      rating: 4.8,
      status: '매칭 대기',
      description: '치매 어르신으로 세심한 케어가 필요합니다.',
    },
    {
      id: 2,
      clientName: '박철수',
      age: 82,
      location: '서초구 서초동',
      service: '식사 도움',
      date: '2024-08-11',
      time: '12:00-13:00',
      hourlyRate: 18000,
      rating: 4.5,
      status: '매칭 대기',
      description: '거동이 불편하여 식사 도움이 필요합니다.',
    },
    {
      id: 3,
      clientName: '이순자',
      age: 75,
      location: '송파구 문정동',
      service: '일상생활 지원',
      date: '2024-08-12',
      time: '09:00-11:00',
      hourlyRate: 19000,
      rating: 4.9,
      status: '매칭 완료',
      description: '외출 동행과 일상생활 지원이 필요합니다.',
    },
    {
      id: 4,
      clientName: '정미영',
      age: 80,
      location: '강동구 천호동',
      service: '재활 보조',
      date: '2024-08-13',
      time: '15:00-17:00',
      hourlyRate: 22000,
      rating: 4.7,
      status: '매칭 대기',
      description: '재활치료 후 보조가 필요합니다.',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case '매칭 완료':
        return 'bg-green-100 text-green-800';
      case '매칭 대기':
        return 'bg-yellow-100 text-yellow-800';
      case '매칭 거절':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredRequests = matchingRequests.filter(request => {
    if (filter === 'all') return true;
    return request.status === filter;
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">매칭</h1>
      
      {/* 필터 */}
      <div className="mb-6">
        <div className="flex items-center gap-4">
          <span className="font-medium">상태 필터:</span>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded ${
                filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              전체
            </button>
            <button
              onClick={() => setFilter('매칭 대기')}
              className={`px-3 py-1 rounded ${
                filter === '매칭 대기' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              매칭 대기
            </button>
            <button
              onClick={() => setFilter('매칭 완료')}
              className={`px-3 py-1 rounded ${
                filter === '매칭 완료' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              매칭 완료
            </button>
          </div>
        </div>
      </div>

      {/* 매칭 요청 목록 */}
      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <Card key={request.id}>
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <PersonIcon className="text-gray-500" />
                    <span className="font-medium">{request.clientName}</span>
                    <span className="text-gray-500">({request.age}세)</span>
                    <div className="flex items-center gap-1">
                      <StarIcon className="text-yellow-500" />
                      <span className="text-sm">{request.rating}</span>
                    </div>
                  </div>
                  
                  <div className="mb-2">
                    <h3 className="text-lg font-semibold">{request.service}</h3>
                    <p className="text-gray-600">{request.description}</p>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <span>📍</span>
                      <span>{request.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ClockIcon />
                      <span>{request.date} {request.time}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                    {request.status}
                  </span>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-600">
                      {request.hourlyRate.toLocaleString()}원/시간
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600">
                      수락
                    </button>
                    <button className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600">
                      거절
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* 매칭 통계 */}
      <Card className="mt-8">
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-4">매칭 통계</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">12</div>
              <div className="text-sm text-gray-600">총 매칭 요청</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">8</div>
              <div className="text-sm text-gray-600">수락한 매칭</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">3</div>
              <div className="text-sm text-gray-600">대기 중</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">4.8</div>
              <div className="text-sm text-gray-600">평균 평점</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
