import { Flex, Text, Card } from '@radix-ui/themes';
import { Plus } from 'lucide-react';
import { CaregiverScheduleDetailResponse } from '../../../types';

interface ApplicantDetailCardProps {
  schedule: CaregiverScheduleDetailResponse;
}

export default function ApplicantDetailCard({ schedule }: ApplicantDetailCardProps) {
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
            <Plus size={12} style={{ color: 'white' }} />
          </div>
          <Text size="3" weight="medium">이용자 정보</Text>
        </Flex>

        {/* 2x2 그리드 */}
        <div className="grid grid-cols-2 gap-3">
          {/* 장기요양등급 */}
          <div 
            style={{
              backgroundColor: 'var(--gray-3)',
              borderRadius: '8px',
              padding: '12px'
            }}
          >
            <Text size="1" color="gray" style={{ marginBottom: '4px', display: 'block' }}>
              장기요양등급
            </Text>
            <Text size="3" weight="bold">
              {schedule.careGrade}등급
            </Text>
          </div>

          {/* 체중 */}
          <div 
            style={{
              backgroundColor: 'var(--gray-3)',
              borderRadius: '8px',
              padding: '12px'
            }}
          >
            <Text size="1" color="gray" style={{ marginBottom: '4px', display: 'block' }}>
              체중
            </Text>
            <Text size="3" weight="bold">
              {schedule.weight}kg
            </Text>
          </div>

          {/* 질병 */}
          <div 
            style={{
              backgroundColor: 'var(--gray-3)',
              borderRadius: '8px',
              padding: '12px'
            }}
          >
            <Text size="1" color="gray" style={{ marginBottom: '4px', display: 'block' }}>
              질병
            </Text>
            <Text size="3" weight="bold">
              {schedule.disease}
            </Text>
          </div>

          {/* 인지상태 */}
          <div 
            style={{
              backgroundColor: 'var(--gray-3)',
              borderRadius: '8px',
              padding: '12px'
            }}
          >
            <Text size="1" color="gray" style={{ marginBottom: '4px', display: 'block' }}>
              인지상태
            </Text>
            <Text size="3" weight="bold">
              {schedule.cognitiveStatus}
            </Text>
          </div>
        </div>

        <div className="w-full h-px bg-gray-200"></div>

        {/* 동거상황 */}
        <div className="space-y-2">
          <Text size="2" color="gray" className='block mb-1'>동거상황</Text>
          <Text size="3" weight="medium">{schedule.livingSituation}</Text>
        </div>
      </Flex>
    </Card>
  );
}
