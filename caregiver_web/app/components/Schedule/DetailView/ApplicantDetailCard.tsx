import { Flex, Text, Card } from '@radix-ui/themes';
import { Plus } from 'lucide-react';
import { ScheduleDetail } from '../../../types';

interface ApplicantDetailCardProps {
  schedule: ScheduleDetail;
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
              {schedule.careGrade}
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
              {schedule.weight}
            </Text>
          </div>

          {/* 치매 */}
          <div 
            style={{
              backgroundColor: 'var(--gray-3)',
              borderRadius: '8px',
              padding: '12px'
            }}
          >
            <Text size="1" color="gray" style={{ marginBottom: '4px', display: 'block' }}>
              치매
            </Text>
            <Text 
              size="3" 
              weight="bold"
              style={{ 
                color: schedule.hasDementia ? 'var(--red-9)' : 'inherit' 
              }}
            >
              {schedule.hasDementia ? '있음' : '없음'}
            </Text>
          </div>

          {/* 와상상태 */}
          <div 
            style={{
              backgroundColor: 'var(--gray-3)',
              borderRadius: '8px',
              padding: '12px'
            }}
          >
            <Text size="1" color="gray" style={{ marginBottom: '4px', display: 'block' }}>
              와상상태
            </Text>
            <Text size="3" weight="bold">
              {schedule.isBedridden ? '예' : '아니오'}
            </Text>
          </div>
        </div>

        <div className="w-full h-px bg-gray-200"></div>

        {/* 인지상태 */}
        <div className="space-y-2">
          <Text size="2" color="gray" className='block mb-1'>인지상태</Text>
          <Text size="3" weight="medium">{schedule.cognitiveStatus}</Text>
        </div>

        <div className="w-full h-px bg-gray-200"></div>

        {/* 동거인 */}
        <div className="space-y-2">
          <Text size="2" color="gray" className='block mb-1'>동거인</Text>
          <Text size="3" weight="medium">{schedule.cohabitationStatus}</Text>
        </div>
      </Flex>
    </Card>
  );
}
