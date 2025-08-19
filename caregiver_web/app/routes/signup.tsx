import { useState } from "react";
import { useNavigate, Link } from "@remix-run/react";
import { 
  Button, 
  Flex, 
  Heading, 
  Text, 
  TextField,
  Callout,
  Select,
  TextArea
} from "@radix-ui/themes";
import { ArrowLeft, Upload, X } from "lucide-react";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    gender: "",
    phone: "",
    address: "",
    experience: "",
    profileImage: null as File | null,
    koreanProficiency: "",
    outingAvailable: "",
    selfIntroduction: "",
    licenseImage: null as File | null
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (field: 'profileImage' | 'licenseImage', file: File) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const removeImage = (field: 'profileImage' | 'licenseImage') => {
    setFormData(prev => ({ ...prev, [field]: null }));
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // TODO: 테스트용으로 검증 비활성화
    // 필수 항목 검증
    // const requiredFields = ['name', 'birthDate', 'gender', 'phone', 'address', 'experience', 'koreanProficiency', 'outingAvailable', 'selfIntroduction'];
    // const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    // if (missingFields.length > 0) {
    //   setError("필수 항목을 입력해주세요.");
    //   setIsLoading(false);
    //   return;
    // }

    // 자격증 이미지 업로드 확인
    // if (!formData.licenseImage) {
    //   setError("자격증 이미지를 업로드해주세요.");
    //   setIsLoading(false);
    //   return;
    // }

    try {
      // 더미 회원가입 - 실제 API 호출로 대체 필요
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 회원가입 성공 시 토큰 저장 (임시)
      localStorage.setItem("caregiver_token", "temp_signup_token");
      
      // 회원가입 성공 시 근무조건 입력 페이지로 이동 (최초 생성 모드)
      navigate("/main/work-conditions?mode=initial");
    } catch (err) {
      setError("회원가입에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-1 to-accent-2 flex flex-col">
      {/* 헤더 */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-4 py-3">
        <Flex align="center" gap="3">
          <Button variant="ghost" size="2" onClick={handleGoBack}>
            <ArrowLeft size={16} />
          </Button>
          <div className="w-8 h-8 bg-accent-3 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 text-accent-11">🏥</div>
          </div>
          <Text size="3" weight="medium">케어기버</Text>
        </Flex>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="flex-1 px-6 py-8">
        <div className="w-full max-w-md mx-auto">
          <div className="p-8">
            <Flex direction="column" align="center" gap="6">
              <Flex direction="column" align="center" gap="4">
                <Heading size="6" className="text-center">
                  회원가입
                </Heading>
                <Text size="3" color="gray" className="text-center">
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

                    <Flex direction="column" gap="3">
                      <Text size="2" weight="medium">성명 *</Text>
                      <TextField.Root
                        placeholder="성명을 입력하세요"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        // required
                        size="3"
                      />
                    </Flex>

                    <Flex direction="column" gap="3">
                      <Text size="2" weight="medium">생년월일 *</Text>
                      <TextField.Root
                        type="date"
                        value={formData.birthDate}
                        onChange={(e) => handleChange("birthDate", e.target.value)}
                        // required
                        size="3"
                      />
                    </Flex>

                    <Flex direction="column" gap="3">
                      <Text size="2" weight="medium">성별 *</Text>
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

                    <Flex direction="column" gap="3">
                      <Text size="2" weight="medium">휴대전화 *</Text>
                      <TextField.Root
                        type="tel"
                        placeholder="휴대전화를 입력하세요"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        // required
                        size="3"
                      />
                    </Flex>

                    <Flex direction="column" gap="3">
                      <Text size="2" weight="medium">거주지 주소 *</Text>
                      <TextField.Root
                        placeholder="거주지 주소를 입력하세요"
                        value={formData.address}
                        onChange={(e) => handleChange("address", e.target.value)}
                        // required
                        size="3"
                      />
                    </Flex>

                                      <Flex direction="column" gap="3">
                      <Text size="2" weight="medium">경력(연차) *</Text>
                      <TextField.Root
                        type="number"
                        placeholder="경력 연차를 입력하세요"
                        value={formData.experience}
                        onChange={(e) => handleChange("experience", e.target.value)}
                        // required
                        size="3"
                      />
                    </Flex>

                  <Flex direction="column" gap="3">
                    <Text size="2" weight="medium">프로필 사진 (선택)</Text>
                    {formData.profileImage ? (
                      <Flex align="center" gap="2" className="p-3 border border-gray-200 rounded-md">
                        <img 
                          src={URL.createObjectURL(formData.profileImage)} 
                          alt="프로필 사진" 
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <Text size="2" className="flex-1">{formData.profileImage.name}</Text>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="1" 
                          onClick={() => removeImage('profileImage')}
                        >
                          <X size={14} />
                        </Button>
                      </Flex>
                    ) : (
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleImageUpload('profileImage', file);
                          }}
                          className="hidden"
                        />
                        <Flex align="center" gap="2" className="p-3 border border-gray-200 rounded-md hover:bg-gray-50">
                          <Upload size={16} />
                          <Text size="2">프로필 사진 업로드</Text>
                        </Flex>
                      </label>
                    )}
                  </Flex>

                    <Flex direction="column" gap="3">
                      <Text size="2" weight="medium">한국어 능숙도 *</Text>
                      <Select.Root 
                        value={formData.koreanProficiency} 
                        onValueChange={(value) => handleChange("koreanProficiency", value)}
                      >
                        <Select.Trigger placeholder="한국어 능숙도를 선택하세요" />
                        <Select.Content>
                          <Select.Item value="excellent">매우 능숙</Select.Item>
                          <Select.Item value="good">능숙</Select.Item>
                          <Select.Item value="fair">보통</Select.Item>
                          <Select.Item value="basic">기본</Select.Item>
                        </Select.Content>
                      </Select.Root>
                    </Flex>

                    <Flex direction="column" gap="3">
                      <Text size="2" weight="medium">외출동행 가능 여부 *</Text>
                      <Select.Root 
                        value={formData.outingAvailable} 
                        onValueChange={(value) => handleChange("outingAvailable", value)}
                      >
                        <Select.Trigger placeholder="외출동행 가능 여부를 선택하세요" />
                        <Select.Content>
                          <Select.Item value="yes">가능</Select.Item>
                          <Select.Item value="no">불가능</Select.Item>
                          <Select.Item value="limited">제한적 가능</Select.Item>
                        </Select.Content>
                      </Select.Root>
                    </Flex>

                    <Flex direction="column" gap="3">
                      <Text size="2" weight="medium">자기소개 한 줄 *</Text>
                      <TextArea
                        placeholder="자기소개를 한 줄로 입력하세요"
                        value={formData.selfIntroduction}
                        onChange={(e) => handleChange("selfIntroduction", e.target.value)}
                        // required
                        size="3"
                        rows={2}
                      />
                    </Flex>

                  <Flex direction="column" gap="3">
                    <Text size="2" weight="medium">자격증 이미지 업로드 *</Text>
                    {formData.licenseImage ? (
                      <Flex align="center" gap="2" className="p-3 border border-gray-200 rounded-md">
                        <img 
                          src={URL.createObjectURL(formData.licenseImage)} 
                          alt="자격증 이미지" 
                          className="w-12 h-12 rounded object-cover"
                        />
                        <Text size="2" className="flex-1">{formData.licenseImage.name}</Text>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="1" 
                          onClick={() => removeImage('licenseImage')}
                        >
                          <X size={14} />
                        </Button>
                      </Flex>
                    ) : (
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleImageUpload('licenseImage', file);
                          }}
                          className="hidden"
                        />
                        <Flex align="center" gap="2" className="p-3 border border-gray-200 rounded-md hover:bg-gray-50">
                          <Upload size={16} />
                          <Text size="2">자격증 이미지 업로드</Text>
                        </Flex>
                      </label>
                    )}
                  </Flex>

                  <Button 
                    type="submit" 
                    size="3" 
                    disabled={isLoading}
                    className="w-full"
                  >
                    {isLoading ? "제출하는 중..." : "제출하기"}
                  </Button>
                </Flex>
              </form>

              <Flex direction="column" align="center" gap="2">
                <Text size="2" color="gray">
                  이미 계정이 있으신가요?{" "}
                  <Link to="/login" className="text-accent-11 hover:underline">
                    로그인
                  </Link>
                </Text>
              </Flex>
            </Flex>
          </div>
        </div>
      </div>
    </div>
  );
}
