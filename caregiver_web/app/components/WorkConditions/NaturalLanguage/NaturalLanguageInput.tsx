import { Flex, Text, Button, TextArea, Heading, Card } from "@radix-ui/themes";

interface NaturalLanguageInputProps {
  naturalInput: string;
  setNaturalInput: (value: string) => void;
  isAnalyzing: boolean;
  analysisError?: string | null;
  onAnalyze: () => void;
  onDirectSetup: () => void;
}

export default function NaturalLanguageInput({
  naturalInput,
  setNaturalInput,
  isAnalyzing,
  analysisError = null,
  onAnalyze,
  onDirectSetup
}: NaturalLanguageInputProps) {
  return (
    <Flex direction="column" gap="4">
      <div>
        <Heading size="4">
          어떤 조건으로 근무하고 싶으신가요?
        </Heading>
        <Text size="2" color="gray">
          줄글로 자유롭게 적어주시면 AI가 알아서 설정해드립니다.
        </Text>
      </div>

      <Card className="p-4">
        <Text size="2" weight="medium" className="mb-2 block">입력 예시</Text>
        <Text size="1" color="gray" className="leading-relaxed">
          • &quot;평일 오전에 강남구에서 방문요양 하고 싶어요&quot;<br/>
          • &quot;시급은 15만원 정도면 좋겠어요&quot;<br/>
          • &quot;치매 케어 경험이 있어서 중증 어르신도 괜찮아요&quot;<br/>
          • &quot;야간은 어렵고, 평일 오전에만 가능해요&quot;
        </Text>
      </Card>

      <TextArea
        placeholder="주말엔 제가 일을 못 하고요, 평일엔 오후 두 시부터 저녁 여덟 시까지만 할 수 있어요. 하루에 짧게는 두 시간, 길어도 여섯 시간 정도가 딱 좋아요. 근무지는 강남역 근처였으면 하고, 이동은 지하철만 타요. 점심시간은 따로 없어도 되고, 시작하기 전에 한 삼십 분 정도 여유만 있으면 좋겠네요. 저는 60세에서 85세 사이 여성분들이랑 같이 일하는 게 편하고, 원하는 일은 재가 요양 서비스예요."
        value={naturalInput}
        onChange={(e) => setNaturalInput(e.target.value)}
        className="min-h-48 p-2"
      />

      <Button 
        onClick={onAnalyze}
        disabled={!naturalInput.trim() || isAnalyzing}
        className="w-full"
        size="3"
      >
        {isAnalyzing ? '분석 중...' : '분석하기'}
      </Button>

      {/* 분석 에러 메시지 */}
      {analysisError && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
          <Text size="2" color="red" className="text-center">
            {analysisError}
          </Text>
        </div>
      )}

      <div className="flex items-center justify-center my-4">
        <div className="flex-1 h-px bg-gray-300"></div>
        <span className="px-4 text-sm text-gray-500">직접 설정하고 싶으시다면</span>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>

      <Button 
        variant="outline"
        onClick={onDirectSetup}
        className="w-full"
        size="3"
      >
        직접 설정하러 가기
      </Button>
    </Flex>
  );
}
