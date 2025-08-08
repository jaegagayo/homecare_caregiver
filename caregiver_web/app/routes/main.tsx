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
  Wallet, 
  Users,
  LogOut
} from "lucide-react";

export default function MainLayout() {
  const [currentTab, setCurrentTab] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 인증 상태 확인
    const token = localStorage.getItem("caregiver_token");
    if (!token) {
      navigate("/");
      return;
    }
    setIsAuthenticated(true);

    // 현재 경로에 따라 탭 설정
    const path = location.pathname;
    if (path.includes("/main/home")) setCurrentTab(0);
    else if (path.includes("/main/schedule")) setCurrentTab(1);
    else if (path.includes("/main/earnings")) setCurrentTab(2);
    else if (path.includes("/main/matching")) setCurrentTab(3);
  }, [navigate, location]);

  const handleLogout = () => {
    localStorage.removeItem("caregiver_token");
    localStorage.removeItem("caregiver_email");
    navigate("/");
  };

  const tabs = [
    { id: 0, label: "홈", icon: Home, path: "/main/home" },
    { id: 1, label: "일정", icon: Calendar, path: "/main/schedule" },
    { id: 2, label: "정산", icon: Wallet, path: "/main/earnings" },
    { id: 3, label: "매칭", icon: Users, path: "/main/matching" },
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
      {/* 헤더 */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <Flex justify="between" align="center">
          <Flex align="center" gap="3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 text-blue-600">🏥</div>
            </div>
            <Text size="4" weight="medium">케어기버</Text>
          </Flex>
          <Button variant="ghost" size="2" onClick={handleLogout}>
            <LogOut size={16} />
          </Button>
        </Flex>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="flex-1 pb-20">
        <Outlet />
      </div>

      {/* 하단 네비게이션 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <Flex justify="between" className="px-4 py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            
            return (
              <Button
                key={tab.id}
                variant="ghost"
                size="2"
                className={`flex flex-col items-center gap-1 p-2 ${
                  isActive ? "text-blue-600" : "text-gray-500"
                }`}
                onClick={() => handleTabChange(tab.id)}
              >
                <Icon size={20} />
                <Text size="1" className={isActive ? "text-blue-600" : "text-gray-500"}>
                  {tab.label}
                </Text>
              </Button>
            );
          })}
        </Flex>
      </div>
    </div>
  );
}
