import { Container, Flex, Heading, Text } from "@radix-ui/themes";

export default function InstitutionAndSettlement() {
  return (
    <Container size="2" className="p-4">
      <Flex direction="column" gap="6">
        <Heading size="4">기관 및 정산 내역</Heading>
        <Text size="2" color="gray">
          기관 및 정산 내역 기능이 구현될 예정입니다.
        </Text>
      </Flex>
    </Container>
  );
}
