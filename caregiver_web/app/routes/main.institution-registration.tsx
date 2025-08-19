import { useState, useEffect } from "react";
import { useNavigate } from "@remix-run/react";
import { 
  Container, 
  Flex, 
  Text, 
  Button,
  Heading,
  Card
} from "@radix-ui/themes";
import { 
  Building2
} from "lucide-react";

interface Institution {
  id: string;
  name: string;
  status: 'pending' | 'approved';
  contactPerson: string;
  contactPhone: string;
}

export default function InstitutionRegistrationPage() {
  const navigate = useNavigate();
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 실제 구현에서는 서버에서 기관 소속 정보를 가져옴
    loadInstitutions();
  }, []);

  const loadInstitutions = async () => {
    setIsLoading(true);
    try {
      // TODO: 실제 API 호출로 기관 소속 정보 가져오기
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 더미 데이터 - 실제로는 서버에서 받아온 데이터
      const savedInstitutions = localStorage.getItem('institutions');
      if (savedInstitutions) {
        setInstitutions(JSON.parse(savedInstitutions));
      } else {
        // 초기 상태: 기관 소속 없음
        setInstitutions([]);
      }
    } catch (error) {
      console.error('기관 소속 정보 로딩 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };





  const handleGoHome = () => {
    navigate("/main/home");
  };

  const getApprovedInstitutions = () => {
    return institutions.filter(inst => inst.status === 'approved');
  };

  const canEnterHome = getApprovedInstitutions().length >= 1;

  if (isLoading) {
    return (
      <Container size="2" className="p-4">
        <Flex direction="column" align="center" justify="center" className="min-h-[60vh]">
          <Text size="4">기관 소속 정보를 불러오는 중...</Text>
        </Flex>
      </Container>
    );
  }

  return (
    <Container size="2" className="p-4">
              <div className="w-full max-w-md mx-auto pt-8">
          <Flex direction="column" align="center" gap="6">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
              <Building2 size={40} className="text-blue-600" />
            </div>
            
            <Flex direction="column" align="center" gap="2">
              <Heading size="5" className="text-center">
                기관 소속 등록
              </Heading>
              { canEnterHome ? (
                <Text size="3" color="gray" className="text-center">
                    기관에 소속되어 있으며<br/>
                    서비스를 이용할 수 있습니다.
                </Text>
                ) : (
                <Text size="3" color="gray" className="text-center">
                    최소 1개 기관 소속이 필요합니다.<br/>
                    기관 담당자에게 연락하여 등록 절차를 진행해 주세요.
                </Text>
              )}
              
            </Flex>

            {/* 승인된 기관 목록 */}
            {getApprovedInstitutions().length > 0 && (
              <div className="w-full">
                <Text size="2" weight="medium" className="block mb-2">소속된 기관</Text>
                <Flex direction="column" gap="3">
                  {getApprovedInstitutions().map((institution) => (
                    <Card key={institution.id} className="p-4">
                      <Flex direction="column" gap="3">
                        <Flex justify="between" align="center">
                          <Text size="3" weight="medium">{institution.name}</Text>
                        </Flex>
                        
                        <Flex direction="column" gap="1">
                          <Text size="2" color="gray">담당자: {institution.contactPerson}</Text>
                          <Text size="2" color="gray">연락처: {institution.contactPhone}</Text>
                        </Flex>
                      </Flex>
                    </Card>
                  ))}
                </Flex>
              </div>
            )}

            {/* 기관이 없는 경우 */}
            {institutions.length === 0 && (
              <div className="w-full">
                <Text size="2" weight="medium" className="block mb-2">소속된 기관</Text>
                <Card className="p-4">
                  <div className="text-center">
                    <Text size="3" color="gray">
                      아직 소속된 기관이 없습니다
                    </Text>
                  </div>
                </Card>
              </div>
            )}

            {/* 액션 버튼들 */}
            <Flex direction="column" gap="3" className="w-full">
              {canEnterHome && (
                <Button 
                  onClick={handleGoHome}
                  variant="outline"
                  className="w-full"
                  size="3"
                >
                  홈으로 이동
                </Button>
              )}
            </Flex>

            {/* 테스트용 버튼들 */}
            <div className="w-full pt-4 border-t border-gray-200">
              <Text size="2" color="gray" className="text-center mb-3">테스트용</Text>
              <Flex gap="2" className="w-full">
                <Button 
                  onClick={() => {
                    const testInstitution: Institution = {
                      id: '1',
                      name: '테스트 요양원',
                      status: 'approved',
                      contactPerson: '김담당',
                      contactPhone: '010-1234-5678'
                    };
                    setInstitutions([testInstitution]);
                    localStorage.setItem('institutions', JSON.stringify([testInstitution]));
                  }}
                  variant="outline"
                  size="2"
                  className="flex-1"
                >
                  기관 추가
                </Button>
                <Button 
                  onClick={() => {
                    const testInstitutions: Institution[] = [
                      {
                        id: '1',
                        name: '테스트 요양원 1',
                        status: 'approved',
                        contactPerson: '김담당',
                        contactPhone: '010-1234-5678'
                      },
                      {
                        id: '2',
                        name: '테스트 요양원 2',
                        status: 'approved',
                        contactPerson: '이담당',
                        contactPhone: '010-8765-4321'
                      }
                    ];
                    setInstitutions(testInstitutions);
                    localStorage.setItem('institutions', JSON.stringify(testInstitutions));
                  }}
                  variant="outline"
                  size="2"
                  className="flex-1"
                >
                  기관 2개 추가
                </Button>
                <Button 
                  onClick={() => {
                    setInstitutions([]);
                    localStorage.removeItem('institutions');
                  }}
                  variant="outline"
                  size="2"
                  className="flex-1"
                >
                  기관 제거
                </Button>
              </Flex>
            </div>
          </Flex>
        </div>
    </Container>
  );
}
