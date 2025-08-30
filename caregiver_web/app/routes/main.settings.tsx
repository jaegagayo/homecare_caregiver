import { useState } from "react";
import { useNavigate } from "@remix-run/react";
import {
  Container,
  Flex,
  Text,
  Button,
  Switch,
  Dialog,
  TextField,
  Card
} from "@radix-ui/themes";
import {
  Bell,
  Lock,
  UserMinus,
  Shield
} from "lucide-react";
import { clearStoredCaregiverId } from "../api/auth";

export default function SettingsPage() {
  const navigate = useNavigate();
  const [pushNotifications, setPushNotifications] = useState(true);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [showWithdrawDialog, setShowWithdrawDialog] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = () => {
    // TODO: 비밀번호 변경 API 호출
    console.log("비밀번호 변경:", { currentPassword, newPassword, confirmPassword });
    setShowPasswordDialog(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleLogout = () => {
    // caregiverId 삭제
    clearStoredCaregiverId();
    
    // 기존 토큰들도 삭제 (하위 호환성)
    localStorage.removeItem("caregiver_token");
    localStorage.removeItem("caregiver_email");
    
    navigate("/");
  };

  const handleWithdraw = () => {
    // TODO: 회원 탈퇴 API 호출
    console.log("회원 탈퇴");
    setShowWithdrawDialog(false);
    navigate("/");
  };

  return (
    <Container size="2" className="p-4">
      <Flex direction="column" gap="4">
        {/* 푸시 알림 설정 */}
        <Card className="p-4">
          <Flex justify="between" align="center">
            <Flex align="center" gap="3">
              <Bell size={20} className="text-gray-600" />
              <Text size="3" weight="medium">푸시 알림 설정</Text>
            </Flex>
            <Switch 
              checked={pushNotifications}
              onCheckedChange={setPushNotifications}
            />
          </Flex>
        </Card>

        {/* 비밀번호 변경 */}
        <Card className="p-4 cursor-pointer hover:bg-gray-50 transition-colors">
          <Flex justify="between" align="center" onClick={() => setShowPasswordDialog(true)}>
            <Flex align="center" gap="3">
              <Lock size={20} className="text-gray-600" />
              <Text size="3" weight="medium">비밀번호 변경</Text>
            </Flex>
            <Text size="2" color="gray">변경</Text>
          </Flex>
        </Card>

        {/* 로그아웃 */}
        <Card className="p-4 cursor-pointer hover:bg-gray-50 transition-colors">
          <Flex justify="between" align="center" onClick={handleLogout}>
            <Flex align="center" gap="3">
              <Shield size={20} className="text-gray-600" />
              <Text size="3" weight="medium">로그아웃</Text>
            </Flex>
            <Text size="2" color="gray">로그아웃</Text>
          </Flex>
        </Card>

        {/* 회원 탈퇴 */}
        <Card className="p-4 cursor-pointer hover:bg-red-50 transition-colors border-red-200">
          <Flex justify="between" align="center" onClick={() => setShowWithdrawDialog(true)}>
            <Flex align="center" gap="3">
              <UserMinus size={20} className="text-red-600" />
              <Text size="3" weight="medium" className="text-red-600">회원 탈퇴</Text>
            </Flex>
            <Text size="2" color="red">탈퇴</Text>
          </Flex>
        </Card>
      </Flex>

      {/* 비밀번호 변경 다이얼로그 */}
      <Dialog.Root open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <Dialog.Content>
          <Dialog.Title>비밀번호 변경</Dialog.Title>
          <Flex direction="column" gap="4" className="mt-4">
            <Flex direction="column" gap="2">
              <Text size="2" weight="medium">현재 비밀번호</Text>
              <TextField.Root
                type="password"
                placeholder="현재 비밀번호를 입력하세요"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                size="3"
              />
            </Flex>
            <Flex direction="column" gap="2">
              <Text size="2" weight="medium">새 비밀번호</Text>
              <TextField.Root
                type="password"
                placeholder="새 비밀번호를 입력하세요"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                size="3"
              />
            </Flex>
            <Flex direction="column" gap="2">
              <Text size="2" weight="medium">새 비밀번호 확인</Text>
              <TextField.Root
                type="password"
                placeholder="새 비밀번호를 다시 입력하세요"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                size="3"
              />
            </Flex>
          </Flex>
          <Flex gap="3" className="mt-6">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                취소
              </Button>
            </Dialog.Close>
            <Button onClick={handlePasswordChange}>
              변경
            </Button>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>

      {/* 회원 탈퇴 확인 다이얼로그 */}
      <Dialog.Root open={showWithdrawDialog} onOpenChange={setShowWithdrawDialog}>
        <Dialog.Content>
          <Dialog.Title>회원 탈퇴</Dialog.Title>
          <Text size="3" color="gray" className="mt-4">
            정말로 회원 탈퇴를 하시겠습니까? 이 작업은 되돌릴 수 없습니다.
          </Text>
          <Flex gap="3" className="mt-6">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                취소
              </Button>
            </Dialog.Close>
            <Button color="red" onClick={handleWithdraw}>
              탈퇴
            </Button>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </Container>
  );
}
