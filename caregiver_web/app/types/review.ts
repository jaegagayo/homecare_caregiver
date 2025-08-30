// 리뷰 요약 응답 타입
export interface ReviewSummaryResponse {
  reviewId: string;
  consumerName: string;
  serviceDate: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// 리뷰 응답 타입
export interface ReviewResponse {
  reviewId: string;
  serviceMatchId: string;
  consumerName: string;
  serviceDate: string;
  serviceType: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// 리뷰 상세 응답 타입
export interface ReviewDetailResponse {
  reviewId: string;
  serviceMatchId: string;
  consumerName: string;
  consumerPhone: string;
  serviceDate: string;
  serviceStartTime: string;
  serviceEndTime: string;
  serviceType: string;
  serviceAddress: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}
