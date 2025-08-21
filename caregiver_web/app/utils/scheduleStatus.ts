export const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending_approval': return 'orange';
    case 'institution_not_selected': return 'red';
    case 'scheduled': return 'blue';
    case 'completed': return 'green';
    default: return 'gray';
  }
};

export const getStatusText = (status: string) => {
  switch (status) {
    case 'pending_approval': return '승인 대기';
    case 'institution_not_selected': return '기관 미선택';
    case 'scheduled': return '예정';
    case 'completed': return '완료';
    default: return '알 수 없음';
  }
};
