import { useState, useEffect } from "react";
import { useSearchParams } from "@remix-run/react";
import { 
  Container, 
  Flex, 
  Heading, 
  Text
} from "@radix-ui/themes";
import { CaregiverScheduleDetailResponse } from '../../../types';
import { getScheduleDetail } from '../../../api/schedule';
import ApplicantInfoCard from './ApplicantInfoCard';
import ContactInfoCard from './ContactInfoCard';
import VisitLocationCard from './VisitLocationCard';
import ApplicantDetailCard from './ApplicantDetailCard';
import SpecialNotesCard from './SpecialNotesCard';
import ActionButtons from './ActionButtons';

export default function ScheduleDetailPage() {
  const [searchParams] = useSearchParams();
  const [schedule, setSchedule] = useState<CaregiverScheduleDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const scheduleId = searchParams.get('id');

  useEffect(() => {
    const loadScheduleDetail = async () => {
      if (!scheduleId) {
        setError("일정 ID가 없습니다.");
        setIsLoading(false);
        return;
      }

      try {
        // 실제 API 호출
        const scheduleDetail = await getScheduleDetail(scheduleId);
        setSchedule(scheduleDetail);
        setIsLoading(false);
      } catch (err) {
        console.error('일정 상세 조회 실패:', err);
        setError("일정을 불러올 수 없습니다.");
        setIsLoading(false);
      }
    };

    loadScheduleDetail();
  }, [scheduleId]);

  if (isLoading) {
    return (
      <Container size="2" className="p-4">
        <Text>로딩 중...</Text>
      </Container>
    );
  }

  if (error || !schedule) {
    return (
      <Container size="2" className="p-4">
        <Text color="red">{error || "일정을 불러올 수 없습니다."}</Text>
      </Container>
    );
  }

  return (
    <Container size="2" className="p-4">
      <Flex direction="column" gap="4">
        {/* 신청자 정보 */}
        <ApplicantInfoCard schedule={schedule} />

        {/* 연락처 정보 */}
        <ContactInfoCard schedule={schedule} />

        {/* 방문 위치 정보 */}
        <VisitLocationCard schedule={schedule} />

        {/* 신청자 상세 정보 */}
        <ApplicantDetailCard schedule={schedule} />

        {/* 신청자 입력 특이사항 */}
        <SpecialNotesCard schedule={schedule} />

        {/* 하단 CTA */}
        <ActionButtons schedule={schedule} scheduleId={scheduleId!} />
      </Flex>
    </Container>
  );
}
