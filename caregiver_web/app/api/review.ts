import { API_CONFIG, API_ENDPOINTS } from './config';

// 리뷰 요약 응답 타입
export interface ReviewSummaryResponse {
  averageRating: number;
  totalReviews: number;
  reviews: ReviewResponse[];
}

// 리뷰 응답 타입
export interface ReviewResponse {
  reviewId: string;
  consumerName: string;
  rating: number;
  comment: string;
  serviceDate: string;
  serviceType: string;
  createdAt: string;
}

// 리뷰 상세 응답 타입
export interface ReviewDetailResponse {
  reviewId: string;
  consumerName: string;
  consumerPhone: string;
  rating: number;
  comment: string;
  serviceDate: string;
  serviceType: string;
  address: string;
  startTime: string;
  endTime: string;
  createdAt: string;
}

// 리뷰 요약 조회
export const getReviewSummary = async (caregiverId: string): Promise<ReviewSummaryResponse> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.REVIEW.LIST}?caregiverId=${caregiverId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Review summary fetch failed: ${response.status}`);
    }

    const data: ReviewSummaryResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Review summary fetch error:', error);
    throw error;
  }
};

// 리뷰 상세 조회
export const getReviewDetail = async (reviewId: string): Promise<ReviewDetailResponse> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.REVIEW.DETAIL.replace('{reviewId}', reviewId)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Review detail fetch failed: ${response.status}`);
    }

    const data: ReviewDetailResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Review detail fetch error:', error);
    throw error;
  }
};

