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
  Callout
} from "@radix-ui/themes";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // 더미 로그인 - 실제 API 호출로 대체 필요
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 로그인 성공 시 토큰 저장
      localStorage.setItem("caregiver_token", "dummy_token");
      localStorage.setItem("caregiver_email", email);
      
      navigate("/main/home");
    } catch (err) {
      setError("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container size="2" className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md p-8">
        <Flex direction="column" align="center" gap="6">
          <Flex direction="column" align="center" gap="4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 text-blue-600">🏥</div>
            </div>
            <Heading size="5" className="text-center">
              로그인
            </Heading>
            <Text size="2" color="gray" className="text-center">
              케어기버 계정으로 로그인하세요
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
                <Text size="2" weight="medium">이메일</Text>
                <TextField.Root
                  type="email"
                  placeholder="이메일을 입력하세요"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Flex>

              <Flex direction="column" gap="2">
                <Text size="2" weight="medium">비밀번호</Text>
                <TextField.Root
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Flex>

              <Button 
                type="submit" 
                size="3" 
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? "로그인 중..." : "로그인"}
              </Button>
            </Flex>
          </form>

          <Flex direction="column" align="center" gap="2">
            <Text size="2" color="gray">
              계정이 없으신가요?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">
                회원가입
              </Link>
            </Text>
          </Flex>
        </Flex>
      </Card>
    </Container>
  );
}
