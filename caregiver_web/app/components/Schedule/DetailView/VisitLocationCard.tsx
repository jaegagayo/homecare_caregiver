import { Flex, Text, Card, Button } from '@radix-ui/themes';
import { MapPin, Navigation, Map } from 'lucide-react';
import { ScheduleDetail } from '../../../types';

interface VisitLocationCardProps {
  schedule: ScheduleDetail;
}

export default function VisitLocationCard({ schedule }: VisitLocationCardProps) {
  const handleNaverMap = () => {
    // 네이버 지도로 보기 기능 (실제 구현 시 네이버 지도 API 연동)
    console.log('네이버 지도로 보기');
  };

  const handleNavigation = () => {
    // 길찾기 기능 (실제 구현 시 네비게이션 앱 연동)
    console.log('길찾기');
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
            <MapPin size={12} style={{ color: 'white' }} />
          </div>
          <Text size="3" weight="medium">방문 장소</Text>
        </Flex>

        {/* 주소 섹션 */}
        <div className="space-y-2">
          <Text size="2" color="gray" className='block mb-1'>주소</Text>
          <Text size="3" weight="medium">{schedule.visitAddress}</Text>
        </div>

        <div className="w-full h-px bg-gray-200"></div>

        {/* 출입 방법 섹션 */}
        <div className="space-y-2">
          <Text size="2" color="gray" className='block mb-1'>출입 방법</Text>
          <Text size="3" weight="medium">{schedule.entryMethod}</Text>
        </div>

        <div className="w-full h-px bg-gray-200"></div>

        {/* 지도 영역 */}
        <div 
          style={{
            width: '100%',
            height: '200px',
            backgroundColor: 'var(--gray-3)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              backgroundColor: 'white',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}
          >
            <Navigation size={20} style={{ color: 'var(--accent-9)' }} />
          </div>
        </div>

        {/* 액션 버튼들 */}
        <Flex gap="3" justify="between">
          <Button 
            variant="ghost" 
            size="2"
            onClick={handleNaverMap}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--accent-9)',
              padding: '8px 16px'
            }}
          >
            <Map size={16} />
            <Text size="2" weight="medium">네이버 지도로 보기</Text>
          </Button>
          <Button 
            variant="ghost" 
            size="2"
            onClick={handleNavigation}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--accent-9)',
              padding: '8px 16px'
            }}
          >
            <Navigation size={16} />
            <Text size="2" weight="medium">길찾기</Text>
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
}
