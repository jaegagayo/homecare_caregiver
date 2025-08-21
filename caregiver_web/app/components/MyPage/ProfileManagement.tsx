import { useState, useEffect } from "react";
import { useNavigate } from "@remix-run/react";
import {
  Container,
  Flex,
  Heading,
  Text,
  Button,
  TextField,
  Select,
  TextArea,
  Dialog
} from "@radix-ui/themes";
import {
  User,
  Phone,
  MapPin,
  Calendar,
  UserCheck,
  Award,
  Languages,
  Car,
  MessageSquare,
  X,
  Upload
} from "lucide-react";
import { CameraIcon } from "@radix-ui/react-icons";

interface UserInfo {
  name: string;
  phone: string;
  address: string;
  birthDate: string;
  gender: string;
  experience: string;
  koreanProficiency: string;
  outingAvailable: string;
  selfIntroduction: string;
  profileImage: string;
}

export default function ProfileManagement() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    phone: "",
    address: "",
    birthDate: "",
    gender: "",
    experience: "",
    koreanProficiency: "",
    outingAvailable: "",
    selfIntroduction: "",
    profileImage: ""
  });

  const [tempUserInfo, setTempUserInfo] = useState<UserInfo>({ ...userInfo });
  const [isEditing, setIsEditing] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // 실제로는 API에서 사용자 정보를 가져와야 함
    const mockUserInfo: UserInfo = {
      name: "김케어",
      phone: "010-1234-5678",
      address: "서울시 강남구",
      birthDate: "1990-01-01",
      gender: "여성",
      experience: "3년",
      koreanProficiency: "원어민",
      outingAvailable: "가능",
      selfIntroduction: "친절하고 책임감 있는 요양보호사입니다.",
      profileImage: ""
    };

    setUserInfo(mockUserInfo);
    setTempUserInfo(mockUserInfo);
  }, []);

  const handleEditField = (field: string) => {
    setEditingField(field);
    setTempUserInfo({ ...userInfo });
  };

  const handleSaveField = () => {
    if (editingField) {
      setUserInfo({ ...tempUserInfo });
      setEditingField(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingField(null);
    setTempUserInfo({ ...userInfo });
  };

  const handleChange = (field: string, value: string) => {
    setTempUserInfo(prev => ({ ...prev, [field]: value }));
  };

  const getFieldValue = (field: string) => {
    return userInfo[field as keyof UserInfo] || "";
  };

  const getFieldDisplayValue = (field: string) => {
    const value = getFieldValue(field);

    switch (field) {
      case "gender":
        return value === "female" ? "여성" : value === "male" ? "남성" : value;
      case "koreanProficiency":
        return value === "excellent" ? "매우 능숙" :
          value === "good" ? "능숙" :
            value === "fair" ? "보통" :
              value === "basic" ? "기본" : value;
      case "outingAvailable":
        return value === "yes" ? "가능" :
          value === "no" ? "불가능" :
            value === "limited" ? "제한적 가능" : value;
      default:
        return value;
    }
  };

  const isRequiredField = (field: string) => {
    return ["name", "phone", "address", "birthDate", "gender", "experience", "koreanProficiency", "outingAvailable", "selfIntroduction"].includes(field);
  };

  const canSave = () => {
    if (!editingField) return false;

    const requiredFields = ["name", "phone", "address", "birthDate", "gender", "experience", "koreanProficiency", "outingAvailable", "selfIntroduction"];
    return requiredFields.every(field => {
      if (field === editingField) {
        return tempUserInfo[field as keyof UserInfo] && tempUserInfo[field as keyof UserInfo].trim() !== "";
      }
      return userInfo[field as keyof UserInfo] && userInfo[field as keyof UserInfo].trim() !== "";
    });
  };

  const renderEditDialog = () => {
    if (!editingField) return null;

    const fieldConfig = {
      name: {
        title: "성명 수정",
        type: "text",
        placeholder: "성명을 입력하세요"
      },
      phone: {
        title: "휴대전화 수정",
        type: "tel",
        placeholder: "휴대전화를 입력하세요"
      },
      address: {
        title: "거주지 주소 수정",
        type: "text",
        placeholder: "거주지 주소를 입력하세요"
      },
      birthDate: {
        title: "생년월일 수정",
        type: "date",
        placeholder: ""
      },
      gender: {
        title: "성별 수정",
        type: "select",
        options: [
          { value: "male", label: "남성" },
          { value: "female", label: "여성" }
        ]
      },
      experience: {
        title: "경력 수정",
        type: "text",
        placeholder: "경력 연차를 입력하세요"
      },
      koreanProficiency: {
        title: "한국어 능숙도 수정",
        type: "select",
        options: [
          { value: "excellent", label: "매우 능숙" },
          { value: "good", label: "능숙" },
          { value: "fair", label: "보통" },
          { value: "basic", label: "기본" }
        ]
      },
      outingAvailable: {
        title: "외출동행 가능 여부 수정",
        type: "select",
        options: [
          { value: "yes", label: "가능" },
          { value: "no", label: "불가능" },
          { value: "limited", label: "제한적 가능" }
        ]
      },
      selfIntroduction: {
        title: "자기소개 수정",
        type: "textarea",
        placeholder: "자기소개를 한 줄로 입력하세요"
      }
    };

    const config = fieldConfig[editingField as keyof typeof fieldConfig];

    return (
      <Dialog.Root open={!!editingField} onOpenChange={() => setEditingField(null)}>
        <Dialog.Content>
          <Flex direction="column" gap="4">
            <Flex justify="between" align="center">
              <Dialog.Title>{config.title}</Dialog.Title>
              <Button
                variant="ghost"
                size="2"
                onClick={handleCancelEdit}
                className="flex items-center gap-1"
              >
                <X size={16} />
                <Text size="2" weight="medium">닫기</Text>
              </Button>
            </Flex>

            {config.type === "text" && (
              <TextField.Root
                placeholder={config.placeholder}
                value={tempUserInfo[editingField as keyof UserInfo]}
                onChange={(e) => handleChange(editingField, e.target.value)}
                size="3"
              />
            )}

            {config.type === "tel" && (
              <TextField.Root
                type="tel"
                placeholder={config.placeholder}
                value={tempUserInfo[editingField as keyof UserInfo]}
                onChange={(e) => handleChange(editingField, e.target.value)}
                size="3"
              />
            )}

            {config.type === "date" && (
              <TextField.Root
                type="date"
                value={tempUserInfo[editingField as keyof UserInfo]}
                onChange={(e) => handleChange(editingField, e.target.value)}
                size="3"
              />
            )}

            {config.type === "select" && (
              <Select.Root
                value={tempUserInfo[editingField as keyof UserInfo]}
                onValueChange={(value) => handleChange(editingField, value)}
              >
                <Select.Trigger placeholder={`${config.title}을 선택하세요`} />
                <Select.Content>
                  {config.options.map(option => (
                    <Select.Item key={option.value} value={option.value}>
                      {option.label}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            )}

            {config.type === "textarea" && (
              <TextArea
                placeholder={config.placeholder}
                value={tempUserInfo[editingField as keyof UserInfo]}
                onChange={(e) => handleChange(editingField, e.target.value)}
                size="3"
                rows={3}
              />
            )}

            <Flex gap="3" className="mt-4">
              <Button
                onClick={handleSaveField}
                disabled={!canSave()}
                className="flex-1"
              >
                저장
              </Button>
              <Button
                variant="outline"
                onClick={handleCancelEdit}
                className="flex-1"
              >
                취소
              </Button>
            </Flex>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    );
  };

  return (
    <Container size="2" className="p-4">
      <Flex direction="column" gap="6">
        {/* 헤더 */}
        <Flex direction="column" gap="1">
          <Heading size="4">프로필 수정</Heading>
          <Text size="2" color="gray">
            각 항목을 터치하여 수정할 수 있습니다.
          </Text>
        </Flex>

        {/* 프로필 정보 */}
        <Flex direction="column" gap="4">
          {/* 기본 정보 */}
          <Flex direction="column" gap="3">
            <Heading size="4">기본 정보</Heading>

            <button
              className="py-3 px-4 cursor-pointer hover:bg-gray-50 w-full text-left border border-gray-200 rounded-lg"
              onClick={() => handleEditField("name")}
            >
              <Flex justify="between" align="center">
                <Flex align="center" gap="3">
                  <User size={16} className="text-gray-500" />
                  <Text size="3" weight="medium">성명</Text>
                </Flex>
                <Text size="3" weight="medium">{getFieldDisplayValue("name")}</Text>
              </Flex>
            </button>

            <button
              className="py-3 px-4 cursor-pointer hover:bg-gray-50 w-full text-left border border-gray-200 rounded-lg"
              onClick={() => handleEditField("phone")}
            >
              <Flex justify="between" align="center">
                <Flex align="center" gap="3">
                  <Phone size={16} className="text-gray-500" />
                  <Text size="3" weight="medium">휴대전화</Text>
                </Flex>
                <Text size="3" weight="medium">{getFieldDisplayValue("phone")}</Text>
              </Flex>
            </button>

            <button
              className="py-3 px-4 cursor-pointer hover:bg-gray-50 w-full text-left border border-gray-200 rounded-lg"
              onClick={() => handleEditField("address")}
            >
              <Flex justify="between" align="center">
                <Flex align="center" gap="3">
                  <MapPin size={16} className="text-gray-500" />
                  <Text size="3" weight="medium">거주지 주소</Text>
                </Flex>
                <Text size="3" weight="medium">{getFieldDisplayValue("address")}</Text>
              </Flex>
            </button>

            <button
              className="py-3 px-4 cursor-pointer hover:bg-gray-50 w-full text-left border border-gray-200 rounded-lg"
              onClick={() => handleEditField("birthDate")}
            >
              <Flex justify="between" align="center">
                <Flex align="center" gap="3">
                  <Calendar size={16} className="text-gray-500" />
                  <Text size="3" weight="medium">생년월일</Text>
                </Flex>
                <Text size="3" weight="medium">{getFieldDisplayValue("birthDate")}</Text>
              </Flex>
            </button>

            <button
              className="py-3 px-4 cursor-pointer hover:bg-gray-50 w-full text-left border border-gray-200 rounded-lg"
              onClick={() => handleEditField("gender")}
            >
              <Flex justify="between" align="center">
                <Flex align="center" gap="3">
                  <UserCheck size={16} className="text-gray-500" />
                  <Text size="3" weight="medium">성별</Text>
                </Flex>
                <Text size="3" weight="medium">{getFieldDisplayValue("gender")}</Text>
              </Flex>
            </button>
          </Flex>

          {/* 자격 정보 */}
          <Flex direction="column" gap="3">
            <Heading size="4">자격 정보</Heading>

            <div className="py-3 px-4 border border-gray-200 rounded-lg bg-gray-50">
              <Flex align="center" gap="3">
                <Award size={16} className="text-gray-500" />
                <Text size="3" weight="medium">요양보호사 자격증</Text>
              </Flex>
            </div>

            <button
              className="py-3 px-4 cursor-pointer hover:bg-gray-50 w-full text-left border border-gray-200 rounded-lg"
              onClick={() => handleEditField("experience")}
            >
              <Flex justify="between" align="center">
                <Flex align="center" gap="3">
                  <Award size={16} className="text-gray-500" />
                  <Text size="3" weight="medium">경력</Text>
                </Flex>
                <Text size="3" weight="medium">{getFieldDisplayValue("experience")}</Text>
              </Flex>
            </button>
          </Flex>

          {/* 추가 정보 */}
          <Flex direction="column" gap="3">
            <Heading size="4">추가 정보</Heading>

            <button
              className="py-3 px-4 cursor-pointer hover:bg-gray-50 w-full text-left border border-gray-200 rounded-lg"
              onClick={() => handleEditField("koreanProficiency")}
            >
              <Flex justify="between" align="center">
                <Flex align="center" gap="3">
                  <Languages size={16} className="text-gray-500" />
                  <Text size="3" weight="medium">한국어 능숙도</Text>
                </Flex>
                <Text size="3" weight="medium">{getFieldDisplayValue("koreanProficiency")}</Text>
              </Flex>
            </button>

            <button
              className="py-3 px-4 cursor-pointer hover:bg-gray-50 w-full text-left border border-gray-200 rounded-lg"
              onClick={() => handleEditField("outingAvailable")}
            >
              <Flex justify="between" align="center">
                <Flex align="center" gap="3">
                  <Car size={16} className="text-gray-500" />
                  <Text size="3" weight="medium">외출동행 가능 여부</Text>
                </Flex>
                <Text size="3" weight="medium">{getFieldDisplayValue("outingAvailable")}</Text>
              </Flex>
            </button>

            <button
              className="py-3 px-4 cursor-pointer hover:bg-gray-50 w-full text-left border border-gray-200 rounded-lg"
              onClick={() => handleEditField("selfIntroduction")}
            >
              <Flex justify="between" align="center">
                <Flex align="center" gap="3">
                  <MessageSquare size={16} className="text-gray-500" />
                  <Text size="3" weight="medium">자기소개</Text>
                </Flex>
                <Text size="3" weight="medium" className="text-left">
                  {getFieldDisplayValue("selfIntroduction")}
                </Text>
              </Flex>
            </button>
          </Flex>
        </Flex>

        {/* 수정 다이얼로그 */}
        {renderEditDialog()}
      </Flex>
    </Container>
  );
}
