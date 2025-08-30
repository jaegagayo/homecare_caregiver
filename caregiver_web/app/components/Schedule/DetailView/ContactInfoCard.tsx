import { Flex, Text, Card, Button } from '@radix-ui/themes';
import { Phone, User, Shield, Contact } from 'lucide-react';
import { CaregiverScheduleDetailResponse } from '../../../types';

interface ContactInfoCardProps {
  schedule: CaregiverScheduleDetailResponse;
}

export default function ContactInfoCard({ schedule }: ContactInfoCardProps) {
  const handleCall = (phoneNumber: string) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <Card className="p-4">
      <Flex direction="column" gap="4">
        {/* 헤더 */}
        <Flex align="center" gap="2">
          <div 
            style={{ 
              width: '20px', 
              height: '20px', 
              backgroundColor: 'var(--accent-9)', 
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Contact size={12} style={{ color: 'white' }} />
          </div>
          <Text size="3" weight="medium">연락처 정보</Text>
        </Flex>

        {/* 이용자 연락처 */}
        <Flex gap="3" align="center">
          <User size={16} style={{ color: 'var(--accent-9)' }} />
          <Flex direction="column" gap="1" style={{ flex: 1 }}>
            <Text size="2" color="gray">이용자</Text>
            <Text size="3" weight="medium">{schedule.consumerPhone}</Text>
          </Flex>
          <div
            onClick={() => handleCall(schedule.consumerPhone)}
            style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%',
              backgroundColor: 'var(--gray-3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--gray-4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--gray-3)';
            }}
          >
            <Phone size={18} style={{ color: 'var(--accent-9)' }} />
          </div>
        </Flex>

        <div className="w-full h-px bg-gray-200"></div>

        {/* 보호자 연락처 */}
        <Flex gap="3" align="center">
          <Shield size={16} style={{ color: 'var(--accent-9)' }} />
          <Flex direction="column" gap="1" style={{ flex: 1 }}>
            <Text size="2" color="gray">보호자</Text>
            <Text size="3" weight="medium">{schedule.guardianPhone}</Text>
          </Flex>
          <div
            onClick={() => handleCall(schedule.guardianPhone)}
            style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%',
              backgroundColor: 'var(--gray-3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--gray-4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--gray-3)';
            }}
          >
            <Phone size={18} style={{ color: 'var(--accent-9)' }} />
          </div>
        </Flex>
      </Flex>
    </Card>
  );
}
