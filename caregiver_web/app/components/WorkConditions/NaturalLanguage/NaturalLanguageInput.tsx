import { Flex, Text, Button, TextArea, Heading, Card } from "@radix-ui/themes";

interface NaturalLanguageInputProps {
  naturalInput: string;
  setNaturalInput: (value: string) => void;
  isAnalyzing: boolean;
  onAnalyze: () => void;
  onDirectSetup: () => void;
}

export default function NaturalLanguageInput({
  naturalInput,
  setNaturalInput,
  isAnalyzing,
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
        placeholder="평일 오전 9시부터 6시까지 강남구, 서초구에서 방문요양 하고 싶어요. 시급은 15만원 정도면 좋겠고, 치매 케어 경험이 있어요."
        value={naturalInput}
        onChange={(e) => setNaturalInput(e.target.value)}
        className="min-h-32"
      />

      <Button 
        onClick={onAnalyze}
        disabled={!naturalInput.trim() || isAnalyzing}
        className="w-full"
        size="3"
      >
        {isAnalyzing ? '분석 중...' : '분석하기'}
      </Button>

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
