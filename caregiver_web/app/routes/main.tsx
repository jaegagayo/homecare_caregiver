import { useState, useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "@remix-run/react";
import { 
  Button, 
  Flex, 
  Text
} from "@radix-ui/themes";
import { 
  Home, 
  Calendar, 
  User,
  ArrowLeft
} from "lucide-react";
import { getStoredCaregiverId } from "../api/auth";

export default function MainLayout() {
  const [currentTab, setCurrentTab] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPageTitle, setCurrentPageTitle] = useState("홈");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 인증 상태 확인 - caregiverId 사용
    const caregiverId = getStoredCaregiverId();
    if (!caregiverId) {
      navigate("/");
      return;
    }
    setIsAuthenticated(true);

    // 현재 경로에 따라 탭 설정
    const path = location.pathname;
    if (path.includes("/main/home")) {
      setCurrentTab(0);
      setCurrentPageTitle("홈");
    } else if (path.includes("/main/schedule")) {
      setCurrentTab(1);
      setCurrentPageTitle("일정");
    } else if (path.includes("/main/my-page")) {
      setCurrentTab(2);
      setCurrentPageTitle("내 정보");
    } else if (path.includes("/main/work-conditions")) {
      setCurrentPageTitle("근무 조건 설정");
    } else if (path.includes("/main/approval-waiting")) {
      setCurrentPageTitle("승인 대기");
    } else if (path.includes("/main/institution-registration")) {
      setCurrentPageTitle("기관 소속 등록");
    } else if (path.includes("/main/profile-management")) {
      setCurrentPageTitle("프로필 관리");
    } else if (path.includes("/main/review-management")) {
      setCurrentPageTitle("내 리뷰 관리");
    } else if (path.includes("/main/institution-settlement")) {
      setCurrentPageTitle("기관 및 정산 내역");
    } else if (path.includes("/main/customer-support")) {
      setCurrentPageTitle("고객센터");
    }
  }, [location.pathname, navigate]);

  const handleProfile = () => {
    navigate("/main/my-page");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const tabs = [
    { id: 0, label: "홈", icon: Home, path: "/main/home" },
    { id: 1, label: "일정", icon: Calendar, path: "/main/schedule" },
    { id: 2, label: "내 정보", icon: User, path: "/main/my-page" },
  ];

  const handleTabChange = (tabId: number) => {
    setCurrentTab(tabId);
    navigate(tabs[tabId].path);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 고정 헤더 */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-10">
        <Flex justify="between" align="center">
          <Flex align="center" gap="3">
            <Button 
              variant="ghost" 
              size="2" 
              onClick={handleGoBack}
              className="p-1"
            >
              <ArrowLeft size={16} />
            </Button>
            <Text size="4" weight="medium">{currentPageTitle}</Text>
          </Flex>
          <Button 
            variant="ghost" 
            size="2" 
            onClick={handleProfile}
            className="p-1"
          >
            <User size={16} />
          </Button>
        </Flex>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="pb-20">
        <Outlet />
      </div>

      {/* 하단 네비게이션 - 근무조건/승인대기/기관소속등록 페이지에서는 숨김 */}
      {!location.pathname.includes("/main/work-conditions") && !location.pathname.includes("/main/approval-waiting") && !location.pathname.includes("/main/institution-registration") && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
          <Flex justify="between" className="px-8 py-3">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = currentTab === tab.id;
              
              return (
                <Button
                  key={tab.id}
                  variant="ghost"
                  size="2"
                  className={`flex flex-col items-center gap-1 px-8 py-2 ${
                    isActive ? "text-accent" : "text-gray-500"
                  }`}
                  onClick={() => handleTabChange(tab.id)}
                >
                  <Icon size={20} />
                  <Text size="1" className={isActive ? "text-accent" : "text-gray-500"}>
                    {tab.label}
                  </Text>
                </Button>
              );
            })}
          </Flex>
        </div>
      )}
    </div>
  );
}
