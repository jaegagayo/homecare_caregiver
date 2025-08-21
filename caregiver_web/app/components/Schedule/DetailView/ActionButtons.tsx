import { useNavigate } from '@remix-run/react';
import { Flex, Button } from '@radix-ui/themes';
import { ScheduleDetail } from '../../../types';

interface ActionButtonsProps {
  schedule: ScheduleDetail;
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
      {schedule.status === 'institution_not_selected' && (
        <Button onClick={handleSelectInstitution} className="flex-1">
          기관 선택
        </Button>
      )}
      {schedule.status === 'scheduled' && !schedule.isRegular && (
        <>
          <Button variant="outline" onClick={() => navigate('/main/schedule')} className="flex-1">
            일정 목록으로 돌아가기
          </Button>
          <Button variant="soft" color="red" onClick={handleReject} className="flex-1">
            거절
          </Button>
        </>
      )}
      {schedule.status === 'scheduled' && schedule.isRegular && (
        <>
          <Button variant="outline" onClick={() => navigate('/main/schedule')} className="flex-1">
            일정 목록으로 돌아가기
          </Button>
          <Button variant="soft" color="orange" onClick={handleSkip} className="flex-1">
            이번 회차 건너뛰기
          </Button>
        </>
      )}
      {schedule.status === 'completed' && (
        <Button variant="outline" onClick={() => navigate('/main/schedule')} className="flex-1">
          일정 목록으로 돌아가기
        </Button>
      )}
    </Flex>
  );
}
