export const getStatusColor = (status: string) => {
  switch (status) {
    case 'CONFIRMED': return 'blue';
    case 'COMPLETED': return 'green';
    case 'CANCELLED': return 'red';
    default: return 'gray';
  }
};

export const getStatusText = (status: string) => {
  switch (status) {
    case 'CONFIRMED': return '예정';
    case 'COMPLETED': return '완료';
    case 'CANCELLED': return '취소';
    default: return '알 수 없음';
  }
};
