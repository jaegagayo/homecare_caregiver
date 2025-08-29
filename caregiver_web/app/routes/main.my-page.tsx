import { useState, useEffect } from "react";
import { useNavigate } from "@remix-run/react";
import {
  Container, Flex, Heading, Text, Button, Card, Separator
} from "@radix-ui/themes";
import {
  User, Settings, Building, Star, HelpCircle, ChevronRight
} from "lucide-react";
import { CameraIcon } from "@radix-ui/react-icons";

export default function MyPage() {
  const [userName, setUserName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // 실제로는 API에서 사용자 정보를 가져와야 함
    setUserName("김케어");
  }, []);



  const handleMenuClick = (menu: string) => {
    switch (menu) {
      case "profile":
        navigate("/main/profile-management");
        break;
      case "work-conditions":
        navigate("/main/work-conditions");
        break;
      case "institution":
        navigate("/main/institution-settlement");
        break;
      case "reviews":
        navigate("/main/review-management");
        break;
      case "settings":
        navigate("/main/settings");
        break;
      case "support":
        navigate("/main/customer-support");
        break;
    }
  };

  return (
    <Container size="2" className="p-4">
      <Flex direction="column" gap="6">
        {/* 프로필 섹션 */}
        <Flex direction="column" align="center" gap="4" className="py-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-100 shadow-lg">
              <div 
                className="w-full h-full flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, var(--accent-3) 0%, var(--accent-6) 100%)`
                }}
              >
                <User size={40} style={{ color: 'var(--accent-9)' }} />
              </div>
            </div>
            <button 
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-colors"
              style={{
                backgroundColor: 'var(--accent-9)',
                color: 'var(--accent-1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--accent-10)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--accent-9)';
              }}
            >
              <CameraIcon width="16" height="16" />
            </button>
          </div>
          <Flex direction="column" align="center" gap="1">
            <Heading size="5">{userName}</Heading>
            <Text size="2" color="gray">요양보호사</Text>
          </Flex>
        </Flex>

        {/* 메뉴 */}
        <Card className="p-4">
          <Flex direction="column" gap="3">
            <Button 
              variant="ghost" 
              size="3" 
              onClick={() => handleMenuClick("profile")}
              className="justify-between"
            >
              <Flex align="center" gap="3">
                <User size={16} />
                <Text>프로필 관리</Text>
              </Flex>
              <ChevronRight size={16} />
            </Button>
            
            <Separator size="4"/>
            
            <Button 
              variant="ghost" 
              size="3" 
              onClick={() => handleMenuClick("work-conditions")}
              className="justify-between"
            >
              <Flex align="center" gap="3">
                <Settings size={16} />
                <Text>근무조건 설정</Text>
              </Flex>
              <ChevronRight size={16} />
            </Button>
            
            <Separator size="4"/>
            
            <Button 
              variant="ghost" 
              size="3" 
              onClick={() => handleMenuClick("institution")}
              className="justify-between"
            >
              <Flex align="center" gap="3">
                <Building size={16} />
                <Text>기관 및 정산 내역</Text>
              </Flex>
              <ChevronRight size={16} />
            </Button>
            
            <Separator size="4"/>
            
            <Button 
              variant="ghost" 
              size="3" 
              onClick={() => handleMenuClick("reviews")}
              className="justify-between"
            >
              <Flex align="center" gap="3">
                <Star size={16} />
                <Text>내 리뷰 관리</Text>
              </Flex>
              <ChevronRight size={16} />
            </Button>
            
            <Separator size="4"/>
            
            <Button 
              variant="ghost" 
              size="3" 
              onClick={() => handleMenuClick("settings")}
              className="justify-between"
            >
              <Flex align="center" gap="3">
                <Settings size={16} />
                <Text>설정</Text>
              </Flex>
              <ChevronRight size={16} />
            </Button>
            
            <Separator size="4"/>
            
            <Button 
              variant="ghost" 
              size="3" 
              onClick={() => handleMenuClick("support")}
              className="justify-between"
            >
              <Flex align="center" gap="3">
                <HelpCircle size={16} />
                <Text>고객센터</Text>
              </Flex>
              <ChevronRight size={16} />
            </Button>
          </Flex>
        </Card>




      </Flex>
    </Container>
  );
}
