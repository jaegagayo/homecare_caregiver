import { Container, Flex, Heading, Text } from "@radix-ui/themes";

export default function WorkConditions() {
  return (
    <Container size="2" className="p-4">
      <Flex direction="column" gap="6">
        <Heading size="4">근무조건 설정</Heading>
        <Text size="2" color="gray">
          근무조건 설정 기능이 구현될 예정입니다.
        </Text>
      </Flex>
    </Container>
  );
}
