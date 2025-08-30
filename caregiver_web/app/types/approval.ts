// 승인 상태 응답 타입
export interface ApprovalStatusResponse {
  caregiverId: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedAt?: string;
  reviewerName?: string;
  rejectionReason?: string;
  estimatedReviewTime?: string;
}
