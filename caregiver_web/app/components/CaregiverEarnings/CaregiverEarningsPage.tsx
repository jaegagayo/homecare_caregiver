import { useState } from 'react';
import { Card } from '@radix-ui/themes';
import { CalendarIcon, ClockIcon } from '@radix-ui/react-icons';

export default function CaregiverEarningsPage() {
  const [selectedMonth, setSelectedMonth] = useState('2024-08');

  // 더미 정산 데이터
  const earnings = {
    currentMonth: 2800000,
    previousMonth: 2650000,
    totalHours: 156,
    hourlyRate: 18000,
    services: 24,
  };

  const monthlyBreakdown = [
    { week: '1주차', amount: 650000, hours: 36 },
    { week: '2주차', amount: 720000, hours: 40 },
    { week: '3주차', amount: 680000, hours: 38 },
    { week: '4주차', amount: 750000, hours: 42 },
  ];

  const recentTransactions = [
    {
      id: 1,
      date: '2024-08-08',
      clientName: '김영희',
      service: '목욕 서비스',
      hours: 2,
      amount: 36000,
      status: '정산완료',
    },
    {
      id: 2,
      date: '2024-08-07',
      clientName: '박철수',
      service: '식사 도움',
      hours: 1,
      amount: 18000,
      status: '정산완료',
    },
    {
      id: 3,
      date: '2024-08-06',
      clientName: '이순자',
      service: '일상생활 지원',
      hours: 2,
      amount: 36000,
      status: '정산완료',
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">정산 확인</h1>
      
      {/* 월 선택 */}
      <div className="mb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <CalendarIcon />
            <span className="font-medium">월 선택:</span>
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="border rounded px-3 py-1"
            />
          </div>
        </div>
      </div>

      {/* 주요 통계 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <span style={{ color: 'var(--accent-9)' }}>₩</span>
              <span className="font-medium">이번 달 수익</span>
            </div>
            <div className="text-2xl font-bold">
              {earnings.currentMonth.toLocaleString()}원
            </div>
            <div className="text-sm flex items-center gap-1" style={{ color: 'var(--accent-9)' }}>
              <span>↗</span>
              +{((earnings.currentMonth - earnings.previousMonth) / earnings.previousMonth * 100).toFixed(1)}%
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <ClockIcon />
              <span className="font-medium">총 근무 시간</span>
            </div>
            <div className="text-2xl font-bold">{earnings.totalHours}시간</div>
            <div className="text-sm text-gray-600">평균 {Math.round(earnings.totalHours / 4)}시간/주</div>
          </div>
        </Card>

        <Card>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <span style={{ color: 'var(--accent-9)' }}>₩</span>
              <span className="font-medium">시급</span>
            </div>
            <div className="text-2xl font-bold">
              {earnings.hourlyRate.toLocaleString()}원
            </div>
            <div className="text-sm text-gray-600">시간당</div>
          </div>
        </Card>

        <Card>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <span style={{ color: 'var(--accent-9)' }}>📋</span>
              <span className="font-medium">서비스 건수</span>
            </div>
            <div className="text-2xl font-bold">{earnings.services}건</div>
            <div className="text-sm text-gray-600">이번 달</div>
          </div>
        </Card>
      </div>

      {/* 주별 정산 내역 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">주별 정산 내역</h3>
            <div className="space-y-4">
              {monthlyBreakdown.map((week) => (
                <div key={week.week} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">{week.week}</div>
                    <div className="text-sm text-gray-600">{week.hours}시간</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{week.amount.toLocaleString()}원</div>
                    <div className="text-sm text-gray-600">
                      {Math.round(week.amount / week.hours).toLocaleString()}원/시간
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">최근 정산 내역</h3>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">{transaction.clientName}</div>
                    <div className="text-sm text-gray-600">{transaction.service}</div>
                    <div className="text-xs text-gray-500">{transaction.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{transaction.amount.toLocaleString()}원</div>
                    <div className="text-sm text-gray-600">{transaction.hours}시간</div>
                    <span className="px-2 py-1 text-xs rounded-full" style={{ backgroundColor: 'var(--accent-3)', color: 'var(--accent-11)' }}>
                      {transaction.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* 정산 요청 */}
      <Card>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">다음 정산일: 2024년 8월 25일</p>
              <p className="text-sm text-gray-500">매월 25일에 정산이 진행됩니다.</p>
            </div>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              정산 요청
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
