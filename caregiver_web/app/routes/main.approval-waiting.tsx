import { useState, useEffect } from "react";
import { useNavigate } from "@remix-run/react";
import { 
  Container, 
  Flex, 
  Text, 
  Button,
  Heading
} from "@radix-ui/themes";
import { 
  Clock,
  CheckCircle,
  XCircle
} from "lucide-react";

export default function ApprovalWaitingPage() {
  const navigate = useNavigate();
  const [approvalStatus, setApprovalStatus] = useState<'waiting' | 'approved' | 'rejected'>('waiting');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // 실제 구현에서는 서버에서 승인 상태를 확인
    checkApprovalStatus();
  }, []);

  const checkApprovalStatus = async () => {
    setIsLoading(true);
    try {
      // TODO: 실제 API 호출로 승인 상태 확인
      // 현재는 더미 데이터로 대체
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 더미 상태 - 실제로는 서버에서 받아온 상태
      const status = localStorage.getItem('approval_status') || 'waiting';
      setApprovalStatus(status as 'waiting' | 'approved' | 'rejected');
    } catch (error) {
      console.error('승인 상태 확인 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };



  const handleResubmit = () => {
    // 거절된 경우 재제출 화면으로 이동
    navigate("/signup");
  };

  const handleInstitutionRegistration = () => {
    // 승인 완료된 경우 기관 등록 안내로 이동
    navigate("/main/institution-registration");
  };

  // 테스트용 함수들
  const setApprovedStatus = () => {
    localStorage.setItem('approval_status', 'approved');
    setApprovalStatus('approved');
  };

  const setRejectedStatus = () => {
    localStorage.setItem('approval_status', 'rejected');
    setApprovalStatus('rejected');
  };

  const resetToWaiting = () => {
    localStorage.setItem('approval_status', 'waiting');
    setApprovalStatus('waiting');
  };

  if (isLoading) {
    return (
      <Container size="2" className="p-4">
        <Flex direction="column" align="center" justify="center" className="min-h-[60vh]">
          <Text size="4">승인 상태 확인 중...</Text>
        </Flex>
      </Container>
    );
  }

  // 승인 완료된 경우
  if (approvalStatus === 'approved') {
    return (
      <Container size="2" className="p-4">
        <Flex direction="column" align="center" justify="center" className="min-h-[60vh]">
          <div className="w-full max-w-md">
            <Flex direction="column" align="center" gap="6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle size={40} className="text-green-600" />
              </div>
              
              <Flex direction="column" align="center" gap="2">
                <Heading size="5" className="text-center">
                  승인 완료
                </Heading>
                <Text size="3" color="gray" className="text-center">
                  프로필이 성공적으로 승인되었습니다.
                </Text>
              </Flex>

              <Button 
                onClick={handleInstitutionRegistration}
                className="w-full"
                size="3"
              >
                기관 등록 안내로 이동
              </Button>

              {/* 테스트용 버튼들 */}
              <div className="w-full pt-4 border-t border-gray-200">
                <Text size="2" color="gray" className="text-center mb-3">테스트용</Text>
                <Flex gap="2" className="w-full">
                  <Button 
                    onClick={setApprovedStatus}
                    variant="outline"
                    size="2"
                    className="flex-1"
                  >
                    승인 완료
                  </Button>
                  <Button 
                    onClick={setRejectedStatus}
                    variant="outline"
                    size="2"
                    className="flex-1"
                  >
                    승인 거절
                  </Button>
                  <Button 
                    onClick={resetToWaiting}
                    variant="outline"
                    size="2"
                    className="flex-1"
                  >
                    대기 상태
                  </Button>
                </Flex>
              </div>
            </Flex>
          </div>
        </Flex>
      </Container>
    );
  }

  // 거절된 경우
  if (approvalStatus === 'rejected') {
    return (
      <Container size="2" className="p-4">
        <Flex direction="column" align="center" justify="center" className="min-h-[60vh]">
          <div className="w-full max-w-md">
            <Flex direction="column" align="center" gap="6">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                <XCircle size={40} className="text-red-600" />
              </div>
              
              <Flex direction="column" align="center" gap="2">
                <Heading size="5" className="text-center">
                  승인 거절
                </Heading>
                <Text size="3" color="gray" className="text-center">
                  제출하신 정보에 보완이 필요합니다.
                </Text>
              </Flex>

              <Button 
                onClick={handleResubmit}
                className="w-full"
                size="3"
              >
                보완/재제출
              </Button>

              {/* 테스트용 버튼들 */}
              <div className="w-full pt-4 border-t border-gray-200">
                <Text size="2" color="gray" className="text-center mb-3">테스트용</Text>
                <Flex gap="2" className="w-full">
                  <Button 
                    onClick={setApprovedStatus}
                    variant="outline"
                    size="2"
                    className="flex-1"
                  >
                    승인 완료
                  </Button>
                  <Button 
                    onClick={setRejectedStatus}
                    variant="outline"
                    size="2"
                    className="flex-1"
                  >
                    승인 거절
                  </Button>
                  <Button 
                    onClick={resetToWaiting}
                    variant="outline"
                    size="2"
                    className="flex-1"
                  >
                    대기 상태
                  </Button>
                </Flex>
              </div>
            </Flex>
          </div>
        </Flex>
      </Container>
    );
  }

  // 승인 대기 중인 경우 (기본 상태)
  return (
    <Container size="2" className="p-4">
      <Flex direction="column" align="center" justify="center" className="min-h-[60vh]">
        <div className="w-full max-w-md">
          <Flex direction="column" align="center" gap="6">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
              <Clock size={40} className="text-blue-600" />
            </div>
            
            <Flex direction="column" align="center" gap="2">
              <Heading size="5" className="text-center">
                승인 대기
              </Heading>
              <Text size="3" color="gray" className="text-center">
                제출하신 정보가 검토 중입니다.
              </Text>
              <Text size="2" color="gray" className="text-center">
                평균 1~2 영업일 소요됩니다.
              </Text>
            </Flex>

            <Button 
              onClick={checkApprovalStatus}
              variant="outline"
              className="w-full"
              size="3"
            >
              상태 확인
            </Button>

            {/* 테스트용 버튼들 */}
            <div className="w-full pt-4 border-t border-gray-200">
              <Text size="2" color="gray" className="text-center mb-3">테스트용</Text>
              <Flex gap="2" className="w-full">
                <Button 
                  onClick={setApprovedStatus}
                  variant="outline"
                  size="2"
                  className="flex-1"
                >
                  승인 완료
                </Button>
                <Button 
                  onClick={setRejectedStatus}
                  variant="outline"
                  size="2"
                  className="flex-1"
                >
                  승인 거절
                </Button>
                <Button 
                  onClick={resetToWaiting}
                  variant="outline"
                  size="2"
                  className="flex-1"
                >
                  대기 상태
                </Button>
              </Flex>
            </div>
          </Flex>
        </div>
      </Flex>
    </Container>
  );
}
