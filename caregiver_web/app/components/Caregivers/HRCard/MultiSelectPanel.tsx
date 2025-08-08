import { Card, Flex, Heading, Button, Table, ScrollArea, Badge, Text } from '@radix-ui/themes';
import { ChatBubbleIcon, EnvelopeClosedIcon, PersonIcon, DownloadIcon } from '@radix-ui/react-icons';
import { CaregiverApi } from '../../../api';
import { CAREGIVER_STATUS, CAREGIVER_STATUS_COLORS } from '../../../constants/caregiverStatus';
import { WORK_TYPES, WORK_TYPE_COLORS } from '../../../constants/workTypes';
import { 
  exportToExcel, 
  convertCaregiverApisToExcelData, 
  generateFilename 
} from '../../../utils/excel';

interface MultiSelectPanelProps {
  selectedCaregivers: CaregiverApi[];
  onClearSelection: () => void;
  onRemoveCaregiver: (caregiverId: string) => void;
}

export default function MultiSelectPanel({ selectedCaregivers, onClearSelection, onRemoveCaregiver }: MultiSelectPanelProps) {
  const handleExportToExcel = () => {
    if (selectedCaregivers.length === 0) {
      alert('엑셀로 출력할 요양보호사를 선택해주세요.');
      return;
    }

    try {
      // 요양보호사 데이터를 엑셀 형식으로 변환
      const excelData = convertCaregiverApisToExcelData(selectedCaregivers);
      
      // 파일명 생성
      const filename = generateFilename('요양보호사_목록');
      
      // 엑셀 파일 생성 및 다운로드
      const success = exportToExcel(excelData, filename, '요양보호사 목록');
      
      if (success) {
        console.log('엑셀 파일이 성공적으로 생성되었습니다.');
      } else {
        alert('엑셀 파일 생성 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('엑셀 출력 중 오류:', error);
      alert('엑셀 파일 생성 중 오류가 발생했습니다.');
    }
  };

  return (
    <Card style={{ flex: 3, display: 'flex', flexDirection: 'column' }}>
      <Flex direction="column" p="4" style={{ flex: 1, minHeight: 0 }}>
        <Flex justify="between" align="center" style={{ marginBottom: 8 }}>
          <Heading size="4">선택된 요양보호사 ({selectedCaregivers.length}명)</Heading>
          <Button variant="soft" size="2" color='red'onClick={onClearSelection}>
            전체 선택 취소
          </Button>
        </Flex>

        <Table.Root style={{ tableLayout: 'fixed', width: '100%' }}>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell style={{ width: '20%' }}>이름</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell style={{ width: '25%' }}>전화번호</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell style={{ width: '15%' }}>상태</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell style={{ width: '20%' }}>근무유형</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell style={{ width: '20%' }}></Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
        </Table.Root>
        
        <ScrollArea style={{ flex: 1, minHeight: 0, marginTop: 0 }}>
          <Table.Root style={{ tableLayout: 'fixed', width: '100%' }}>
            <Table.Body>
              {selectedCaregivers.map(caregiver => (
                <Table.Row key={caregiver.caregiverId}>
                  <Table.Cell style={{ width: '20%' }}>
                    <Text weight="medium" size="2">{caregiver.name}</Text>
                  </Table.Cell>
                  <Table.Cell style={{ width: '25%' }}>
                    <Text size="2" color="gray">{caregiver.phone}</Text>
                  </Table.Cell>
                  <Table.Cell style={{ width: '15%' }}>
                    <Badge color={(CAREGIVER_STATUS_COLORS[CAREGIVER_STATUS[caregiver.status as keyof typeof CAREGIVER_STATUS] as keyof typeof CAREGIVER_STATUS_COLORS] || 'gray') as "green" | "yellow" | "red" | "gray"} size="1">
                      {CAREGIVER_STATUS[caregiver.status as keyof typeof CAREGIVER_STATUS] || caregiver.status}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell style={{ width: '20%' }}>
                    <Badge color={(WORK_TYPE_COLORS[WORK_TYPES[caregiver.serviceTypes[0] as keyof typeof WORK_TYPES] as keyof typeof WORK_TYPE_COLORS] || 'gray') as "blue" | "purple" | "green" | "orange" | "yellow" | "red" | "gray"} size="1">
                      {caregiver.serviceTypes.length > 1 
                        ? `${WORK_TYPES[caregiver.serviceTypes[0] as keyof typeof WORK_TYPES] || caregiver.serviceTypes[0]} 외 ${caregiver.serviceTypes.length - 1}개`
                        : WORK_TYPES[caregiver.serviceTypes[0] as keyof typeof WORK_TYPES] || caregiver.serviceTypes[0]
                      }
                    </Badge>
                  </Table.Cell>
                  <Table.Cell style={{ width: '20%' }}>
                    <Button
                      variant="soft"
                      size="1"
                      color="red"
                      onClick={() => onRemoveCaregiver(caregiver.caregiverId)}
                    >
                      선택 취소
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </ScrollArea>

        {/* 일괄 작업 버튼들 */}
        <Card style={{ marginTop: 16 }}>
          <Heading size="3" mb="3">일괄 작업</Heading>
          <Flex gap="3" wrap="wrap">
            <Button variant="soft" size="2">
              <ChatBubbleIcon />
              일괄 메시지 보내기
            </Button>
            <Button variant="soft" size="2">
              <EnvelopeClosedIcon />
              일괄 이메일 보내기
            </Button>
            <Button variant="soft" size="2">
              <PersonIcon />
              일괄 근무 상태 수정
            </Button>
            <Button variant="soft" size="2" onClick={handleExportToExcel}>
              <DownloadIcon />
              엑셀로 출력하기
            </Button>
          </Flex>
        </Card>
      </Flex>
    </Card>
  );
} 