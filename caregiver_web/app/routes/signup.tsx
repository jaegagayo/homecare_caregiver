import { useState } from "react";
import { useNavigate, Link } from "@remix-run/react";
import { 
  Button, 
  Card, 
  Container, 
  Flex, 
  Heading, 
  Text, 
  TextField,
  Callout,
  Select
} from "@radix-ui/themes";


export default function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
    gender: "",
    birthDate: "",
    address: "",
    licenseNumber: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // 비밀번호 확인
    if (formData.password !== formData.confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      setIsLoading(false);
      return;
    }

    try {
      // 더미 회원가입 - 실제 API 호출로 대체 필요
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 회원가입 성공 시 로그인 페이지로 이동
      navigate("/login");
    } catch (err) {
      setError("회원가입에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container size="2" className="min-h-screen flex items-center justify-center py-8">
      <Card className="w-full max-w-lg p-8">
        <Flex direction="column" align="center" gap="6">
          <Flex direction="column" align="center" gap="4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 text-blue-600">🏥</div>
            </div>
            <Heading size="5" className="text-center">
              회원가입
            </Heading>
            <Text size="2" color="gray" className="text-center">
              케어기버 계정을 만들어보세요
            </Text>
          </Flex>

          <form onSubmit={handleSubmit} className="w-full">
            <Flex direction="column" gap="4" className="w-full">
              {error && (
                <Callout.Root color="red">
                  <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
              )}

              <Flex direction="column" gap="2">
                <Text size="2" weight="medium">이름 *</Text>
                <TextField.Root
                  placeholder="이름을 입력하세요"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  required
                />
              </Flex>

              <Flex direction="column" gap="2">
                <Text size="2" weight="medium">이메일 *</Text>
                <TextField.Root
                  type="email"
                  placeholder="이메일을 입력하세요"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                />
              </Flex>

              <Flex direction="column" gap="2">
                <Text size="2" weight="medium">비밀번호 *</Text>
                <TextField.Root
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  required
                />
              </Flex>

              <Flex direction="column" gap="2">
                <Text size="2" weight="medium">비밀번호 확인 *</Text>
                <TextField.Root
                  type="password"
                  placeholder="비밀번호를 다시 입력하세요"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange("confirmPassword", e.target.value)}
                  required
                />
              </Flex>

              <Flex direction="column" gap="2">
                <Text size="2" weight="medium">전화번호 *</Text>
                <TextField.Root
                  type="tel"
                  placeholder="전화번호를 입력하세요"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  required
                />
              </Flex>

              <Flex direction="column" gap="2">
                <Text size="2" weight="medium">성별</Text>
                <Select.Root 
                  value={formData.gender} 
                  onValueChange={(value) => handleChange("gender", value)}
                >
                  <Select.Trigger placeholder="성별을 선택하세요" />
                  <Select.Content>
                    <Select.Item value="male">남성</Select.Item>
                    <Select.Item value="female">여성</Select.Item>
                  </Select.Content>
                </Select.Root>
              </Flex>

              <Flex direction="column" gap="2">
                <Text size="2" weight="medium">생년월일</Text>
                <TextField.Root
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => handleChange("birthDate", e.target.value)}
                />
              </Flex>

              <Flex direction="column" gap="2">
                <Text size="2" weight="medium">주소</Text>
                <TextField.Root
                  placeholder="주소를 입력하세요"
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                />
              </Flex>

              <Flex direction="column" gap="2">
                <Text size="2" weight="medium">요양보호사 자격번호</Text>
                <TextField.Root
                  placeholder="요양보호사 자격번호를 입력하세요"
                  value={formData.licenseNumber}
                  onChange={(e) => handleChange("licenseNumber", e.target.value)}
                />
              </Flex>

              <Button 
                type="submit" 
                size="3" 
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? "가입 중..." : "회원가입"}
              </Button>
            </Flex>
          </form>

          <Flex direction="column" align="center" gap="2">
            <Text size="2" color="gray">
              이미 계정이 있으신가요?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                로그인
              </Link>
            </Text>
          </Flex>
        </Flex>
      </Card>
    </Container>
  );
}
