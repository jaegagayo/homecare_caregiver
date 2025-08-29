import { useState } from "react";
import { 
  Container, 
  Flex, 
  Heading, 
  Text, 
  Button,
  Card,
  Separator,
  Dialog,
  Badge
} from "@radix-ui/themes";
import { 
  HelpCircle, 
  Phone, 
  Mail, 
  MessageSquare,
  ChevronRight,
  ChevronDown,
  X
} from "lucide-react";
import React from "react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export default function CustomerSupport() {
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [selectedContactMethod, setSelectedContactMethod] = useState<string>('');

  const faqData: FAQItem[] = [
    {
      id: "1",
      question: "서비스 이용 방법은 어떻게 되나요?",
      answer: "앱에서 원하는 서비스를 선택하고 일정을 확인한 후 매칭을 신청하시면 됩니다. 매칭이 완료되면 알림을 받으실 수 있습니다.",
      category: "서비스 이용"
    },
    {
      id: "2",
      question: "정산은 언제 이루어지나요?",
      answer: "서비스 완료 후 3-5일 내에 정산이 이루어집니다. 정산 내역은 마이페이지의 '기관 및 정산 내역'에서 확인하실 수 있습니다.",
      category: "정산"
    },
    {
      id: "3",
      question: "서비스 취소는 언제까지 가능한가요?",
      answer: "서비스 시작 24시간 전까지는 무료로 취소 가능합니다. 24시간 이내 취소 시 취소 수수료가 발생할 수 있습니다.",
      category: "서비스 이용"
    },
    {
      id: "4",
      question: "급여 수준은 어떻게 되나요?",
      answer: "시급은 15,000원부터 시작하며, 경력과 자격에 따라 차등 적용됩니다. 상세한 급여 정보는 근무조건 설정에서 확인하실 수 있습니다.",
      category: "급여"
    },
    {
      id: "5",
      question: "기관 등록은 어떻게 하나요?",
      answer: "마이페이지에서 '기관 소속 등록'을 통해 기관을 등록할 수 있습니다. 기관 승인 후 서비스 이용이 가능합니다.",
      category: "기관 등록"
    },
    {
      id: "6",
      question: "리뷰는 언제 작성되나요?",
      answer: "서비스 완료 후 고객이 리뷰를 작성할 수 있으며, 작성된 리뷰는 마이페이지의 '내 리뷰 관리'에서 확인하실 수 있습니다.",
      category: "리뷰"
    }
  ];

  const contactMethods = [
    {
      id: "phone",
      title: "전화 문의",
      description: "평일 09:00 - 18:00",
      icon: Phone,
      action: "1588-1234",
      color: "blue"
    },
    {
      id: "email",
      title: "이메일 문의",
      description: "24시간 접수 가능",
      icon: Mail,
      action: "support@homecare.com",
      color: "green"
    },
    {
      id: "chat",
      title: "실시간 채팅",
      description: "평일 09:00 - 18:00",
      icon: MessageSquare,
      action: "채팅 시작",
      color: "purple"
    }
  ];

  const toggleFAQ = (faqId: string) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  const handleContact = (method: string) => {
    setSelectedContactMethod(method);
    setShowContactDialog(true);
  };

  const handleContactAction = () => {
    const method = contactMethods.find(m => m.id === selectedContactMethod);
    if (!method) return;

    switch (method.id) {
      case "phone":
        window.location.href = `tel:${method.action}`;
        break;
      case "email":
        window.location.href = `mailto:${method.action}`;
        break;
      case "chat":
        // 채팅 기능 구현 (실제로는 채팅 시스템 연동)
        alert("채팅 기능이 곧 구현될 예정입니다.");
        break;
    }
    setShowContactDialog(false);
  };

  return (
    <Container size="2" className="p-4">
      <Flex direction="column" gap="6">
        {/* 헤더 */}
        <Flex direction="column" gap="1">
          <Heading size="4">고객센터</Heading>
          <Text size="2" color="gray">
            고객 지원에 접근할 수 있습니다.
          </Text>
        </Flex>

        {/* FAQ 섹션 */}
        <div>
          <Heading size="4" className="mb-4">자주 묻는 질문</Heading>
          
          <Flex direction="column" gap="2">
            {faqData.map((faq) => (
              <Card key={faq.id} className="p-4">
                <Flex direction="column" gap="3">
                  <Button
                    variant="ghost"
                    size="3"
                    onClick={() => toggleFAQ(faq.id)}
                    className="justify-between p-0 h-auto"
                  >
                    <Flex direction="column" align="start" gap="1" className="flex-1">
                      <Text size="3" weight="medium" className="text-left">
                        {faq.question}
                      </Text>
                      <Badge color="gray" variant="soft">
                        {faq.category}
                      </Badge>
                    </Flex>
                    {expandedFAQ === faq.id ? (
                      <ChevronDown size={16} className="text-gray-500" />
                    ) : (
                      <ChevronRight size={16} className="text-gray-500" />
                    )}
                  </Button>
                  
                  {expandedFAQ === faq.id && (
                    <div className="mt-2 pl-4 border-l-2 border-gray-200">
                      <Text size="2" color="gray">
                        {faq.answer}
                      </Text>
                    </div>
                  )}
                </Flex>
              </Card>
            ))}
          </Flex>
        </div>

        {/* 문의하기 섹션 */}
        <div>
          <Heading size="4" className="mb-4">문의하기</Heading>
          
          <Flex direction="column" gap="3">
            {contactMethods.map((method) => {
              const Icon = method.icon;
              return (
                <Card key={method.id} className="p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                  <Button
                    variant="ghost"
                    size="3"
                    onClick={() => handleContact(method.id)}
                    className="justify-between w-full p-0 h-auto"
                  >
                    <Flex align="center" gap="3" className="flex-1">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `var(--${method.color}-3)` }}
                      >
                        <Icon size={20} style={{ color: `var(--${method.color}-9)` }} />
                      </div>
                      <Flex direction="column" align="start" gap="1">
                        <Text size="3" weight="medium">
                          {method.title}
                        </Text>
                        <Text size="2" color="gray">
                          {method.description}
                        </Text>
                      </Flex>
                    </Flex>
                    <ChevronRight size={16} className="text-gray-500" />
                  </Button>
                </Card>
              );
            })}
          </Flex>
        </div>

        {/* 문의하기 다이얼로그 */}
        <Dialog.Root open={showContactDialog} onOpenChange={setShowContactDialog}>
          <Dialog.Content>
            {selectedContactMethod && (
              <Flex direction="column" gap="4">
                <Flex justify="between" align="center">
                  <Dialog.Title>문의하기</Dialog.Title>
                  <Button
                    variant="ghost"
                    size="2"
                    onClick={() => setShowContactDialog(false)}
                    className="flex items-center gap-1"
                  >
                    <X size={16} />
                    <Text size="2" weight="medium">닫기</Text>
                  </Button>
                </Flex>

                {(() => {
                  const method = contactMethods.find(m => m.id === selectedContactMethod);
                  if (!method) return null;

                  return (
                    <Flex direction="column" gap="4">
                      <Flex align="center" gap="3">
                        <div 
                          className="w-12 h-12 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: `var(--${method.color}-3)` }}
                        >
                          {React.createElement(method.icon, { 
                            size: 24, 
                            style: { color: `var(--${method.color}-9)` } 
                          })}
                        </div>
                        <Flex direction="column" gap="1">
                          <Text size="3" weight="medium">
                            {method.title}
                          </Text>
                          <Text size="2" color="gray">
                            {method.description}
                          </Text>
                        </Flex>
                      </Flex>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <Text size="2" weight="medium" className="mb-2">
                          연락처 정보
                        </Text>
                        <Text size="3" weight="bold" style={{ color: `var(--${method.color}-9)` }}>
                          {method.action}
                        </Text>
                      </div>

                      <Flex gap="3">
                        <Button
                          onClick={handleContactAction}
                          className="flex-1"
                          style={{ backgroundColor: `var(--${method.color}-9)` }}
                        >
                          {method.id === "chat" ? "채팅 시작" : "연결하기"}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setShowContactDialog(false)}
                          className="flex-1"
                        >
                          취소
                        </Button>
                      </Flex>
                    </Flex>
                  );
                })()}
              </Flex>
            )}
          </Dialog.Content>
        </Dialog.Root>
      </Flex>
    </Container>
  );
}
