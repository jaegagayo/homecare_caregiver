import { Text, Card, Flex } from '@radix-ui/themes';
import { MessageSquare } from 'lucide-react';
import { ScheduleDetail } from '../../../types';

interface SpecialNotesCardProps {
  schedule: ScheduleDetail;
}

export default function SpecialNotesCard({ schedule }: SpecialNotesCardProps) {
  return (
    <Card className="p-4">
      <Flex direction="column" gap="3">
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
            <MessageSquare size={12} style={{ color: 'white' }} />
          </div>
          <Text size="3" weight="medium">특이사항</Text>
        </Flex>

        {/* 특이사항 내용 */}
        <div
          style={{
            backgroundColor: 'var(--gray-3)',
            borderRadius: '8px',
            padding: '12px'
          }}
        >
          <Text size="2" className="whitespace-pre-wrap" style={{ lineHeight: '1.5' }}>
            {schedule.specialNotes}
          </Text>
        </div>
      </Flex>
    </Card>
  );
}
