import { useNavigate } from '@remix-run/react';
import { Flex, Button } from '@radix-ui/themes';
import { CaregiverScheduleDetailResponse } from '../../../types';

interface ActionButtonsProps {
  schedule: CaregiverScheduleDetailResponse;
  scheduleId: string;
}

export default function ActionButtons({ schedule, scheduleId }: ActionButtonsProps) {
  const navigate = useNavigate();

  const handleSelectInstitution = () => {
    navigate(`/main/institution-selection?scheduleId=${scheduleId}`);
  };

  const handleReject = () => {
    // 거절 처리 로직
    alert('일정이 거절되었습니다.');
    navigate(-1);
  };

  const handleSkip = () => {
    // 건너뛰기 처리 로직
    alert('일정이 건너뛰어졌습니다.');
    navigate(-1);
  };

  return (
    <Flex gap="3" justify="center">
      {schedule.matchStatus === 'CONFIRMED' && (
        <>
          <Button variant="outline" onClick={() => navigate('/main/schedule')} className="flex-1">
            일정 목록으로 돌아가기
          </Button>
          <Button variant="soft" color="red" onClick={handleReject} className="flex-1">
            거절
          </Button>
        </>
      )}
      {schedule.matchStatus === 'COMPLETED' && (
        <Button variant="outline" onClick={() => navigate('/main/schedule')} className="flex-1">
          일정 목록으로 돌아가기
        </Button>
      )}
    </Flex>
  );
}
