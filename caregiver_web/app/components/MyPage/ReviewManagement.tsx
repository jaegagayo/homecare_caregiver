import { useState, useEffect } from "react";
import { 
  Container, 
  Flex, 
  Heading, 
  Text, 
  Button,
  Badge,
  Dialog,
  Card
} from "@radix-ui/themes";
import { 
  Star, 
  Calendar, 
  Clock,
  User,
  MessageSquare,
  ChevronRight,
  X
} from "lucide-react";

interface Review {
  id: string;
  date: string;
  clientName: string;
  serviceType: string;
  startTime: string;
  endTime: string;
  duration: number;
  rating: number;
  reviewText: string;
  scheduleSummary: string;
}

interface ReviewSummary {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    [key: number]: number;
  };
}

export default function ReviewManagement() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [summary, setSummary] = useState<ReviewSummary>({
    averageRating: 0,
    totalReviews: 0,
    ratingDistribution: {}
  });
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 더미 데이터 로드
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const dummyReviews: Review[] = [
        {
          id: "1",
          date: "2024-01-15",
          clientName: "김영희",
          serviceType: "방문요양",
          startTime: "09:00",
          endTime: "11:00",
          duration: 2,
          rating: 5,
          reviewText: "매우 친절하고 전문적인 서비스를 제공해주셨습니다. 어머니께서도 만족하시고 계시고, 다음에도 꼭 부탁드리고 싶습니다.",
          scheduleSummary: "방문요양 서비스 - 2시간"
        },
        {
          id: "2",
          date: "2024-01-14",
          clientName: "박철수",
          serviceType: "방문요양",
          startTime: "14:00",
          endTime: "17:00",
          duration: 3,
          rating: 4,
          reviewText: "시간을 정확히 지켜주시고, 아버지께서 편안하게 지내실 수 있도록 도와주셨습니다. 감사합니다.",
          scheduleSummary: "방문요양 서비스 - 3시간"
        },
        {
          id: "3",
          date: "2024-01-13",
          clientName: "이순자",
          serviceType: "방문요양",
          startTime: "10:00",
          endTime: "12:00",
          duration: 2,
          rating: 5,
          reviewText: "정말 감사합니다. 어머니께서 오랜만에 웃으시며 좋은 시간을 보내셨다고 하시네요. 다음에도 부탁드립니다.",
          scheduleSummary: "방문요양 서비스 - 2시간"
        },
        {
          id: "4",
          date: "2024-01-12",
          clientName: "최민수",
          serviceType: "방문요양",
          startTime: "15:00",
          endTime: "19:00",
          duration: 4,
          rating: 3,
          reviewText: "서비스는 괜찮았지만, 조금 더 세심한 배려가 있었으면 좋겠습니다.",
          scheduleSummary: "방문요양 서비스 - 4시간"
        },
        {
          id: "5",
          date: "2024-01-11",
          clientName: "정영수",
          serviceType: "방문요양",
          startTime: "08:00",
          endTime: "10:00",
          duration: 2,
          rating: 5,
          reviewText: "아침 일찍부터 정말 수고 많으셨습니다. 아버지께서도 만족하시고 계시고, 다음에도 꼭 부탁드리고 싶습니다.",
          scheduleSummary: "방문요양 서비스 - 2시간"
        }
      ];

      setReviews(dummyReviews);

      // 평균 평점 계산
      const totalRating = dummyReviews.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = totalRating / dummyReviews.length;
      
      // 평점 분포 계산
      const ratingDistribution: { [key: number]: number } = {};
      for (let i = 1; i <= 5; i++) {
        ratingDistribution[i] = dummyReviews.filter(review => review.rating === i).length;
      }

      setSummary({
        averageRating,
        totalReviews: dummyReviews.length,
        ratingDistribution
      });

      setIsLoading(false);
    };

    loadData();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        fill={index < rating ? "gold" : "none"}
        color={index < rating ? "gold" : "#d1d5db"}
      />
    ));
  };

  const getRatingText = (rating: number) => {
    switch (rating) {
      case 5: return "매우 만족";
      case 4: return "만족";
      case 3: return "보통";
      case 2: return "불만족";
      case 1: return "매우 불만족";
      default: return "";
    }
  };

  if (isLoading) {
    return (
      <Container size="2" className="p-4">
        <Text>로딩 중...</Text>
      </Container>
    );
  }

  return (
    <Container size="2" className="p-4">
      <Flex direction="column" gap="6">
        {/* 헤더 */}
        <Flex direction="column" gap="1">
          <Heading size="4">내 리뷰 관리</Heading>
          <Text size="2" color="gray">
            신청자가 남긴 리뷰 및 평점을 확인할 수 있습니다.
          </Text>
        </Flex>

        {/* 평균 평점 */}
        <Card className="p-4">
          <Flex direction="column" gap="4">
            <Heading size="4">평균 평점</Heading>
            
            <Flex align="center" gap="4">
              <Flex direction="column" align="center" gap="2">
                <Text size="6" weight="bold" style={{ color: 'var(--accent-9)' }}>
                  {summary.averageRating.toFixed(1)}
                </Text>
                <Flex gap="1">
                  {renderStars(Math.round(summary.averageRating))}
                </Flex>
                <Text size="2" color="gray">
                  총 {summary.totalReviews}개의 리뷰
                </Text>
              </Flex>
              
              <div className="flex-1">
                <Flex direction="column" gap="2">
                  {[5, 4, 3, 2, 1].map(rating => (
                    <Flex key={rating} align="center" gap="2">
                      <Text size="2" className="w-8">{rating}점</Text>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-yellow-400 h-2 rounded-full"
                          style={{ 
                            width: `${(summary.ratingDistribution[rating] / summary.totalReviews) * 100}%` 
                          }}
                        />
                      </div>
                      <Text size="2" className="w-8 text-right">
                        {summary.ratingDistribution[rating]}
                      </Text>
                    </Flex>
                  ))}
                </Flex>
              </div>
            </Flex>
          </Flex>
        </Card>

        {/* 리뷰 리스트 */}
        <div>
          <Heading size="4" className="mb-4">리뷰 리스트</Heading>
          
          {reviews.length > 0 ? (
            <Flex direction="column" gap="3">
              {reviews.map((review) => (
                <Card key={review.id} className="p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                  <Flex justify="between" align="start" gap="3" onClick={() => setSelectedReview(review)}>
                    <Flex direction="column" gap="2" className="flex-1">
                      <Flex align="center" gap="2">
                        <Calendar size={16} className="text-gray-500" />
                        <Text size="2" weight="medium">
                          {formatDate(review.date)}
                        </Text>
                        <Badge color="blue">
                          {review.scheduleSummary}
                        </Badge>
                      </Flex>
                      
                      <Flex align="center" gap="2">
                        <User size={16} className="text-gray-500" />
                        <Text size="2">{review.clientName}</Text>
                      </Flex>
                      
                      <Flex align="center" gap="2">
                        <Clock size={16} className="text-gray-500" />
                        <Text size="2">{review.startTime} - {review.endTime} ({review.duration}시간)</Text>
                      </Flex>
                      
                      <Flex align="center" gap="2">
                        <Flex gap="1">
                          {renderStars(review.rating)}
                        </Flex>
                        <Text size="2" weight="medium">
                          {getRatingText(review.rating)}
                        </Text>
                      </Flex>
                      
                      <Text size="2" color="gray" className="line-clamp-2">
                        {review.reviewText}
                      </Text>
                    </Flex>
                    
                    <ChevronRight size={16} className="text-gray-400" />
                  </Flex>
                </Card>
              ))}
            </Flex>
          ) : (
            <Card className="p-8 text-center">
              <MessageSquare size={48} className="text-gray-400 mx-auto mb-3" />
              <Text size="3" color="gray">아직 받은 리뷰가 없습니다</Text>
              <Text size="2" color="gray">완료된 서비스에 대한 리뷰가 여기에 표시됩니다</Text>
            </Card>
          )}
        </div>

        {/* 리뷰 상세 다이얼로그 */}
        <Dialog.Root open={!!selectedReview} onOpenChange={() => setSelectedReview(null)}>
          <Dialog.Content>
            {selectedReview && (
              <Flex direction="column" gap="4">
                <Flex justify="between" align="center">
                  <Dialog.Title>리뷰 상세</Dialog.Title>
                  <Button
                    variant="ghost"
                    size="2"
                    onClick={() => setSelectedReview(null)}
                    className="flex items-center gap-1 self-center -mt-4"
                  >
                    <X size={16} />
                    <Text size="2" weight="medium">닫기</Text>
                  </Button>
                </Flex>

                <Flex direction="column" gap="3">
                  <Flex align="center" gap="2">
                    <Calendar size={16} className="text-gray-500" />
                    <Text size="2" weight="medium">
                      {formatDate(selectedReview.date)}
                    </Text>
                  </Flex>
                  
                  <Flex align="center" gap="2">
                    <User size={16} className="text-gray-500" />
                    <Text size="2">{selectedReview.clientName}</Text>
                  </Flex>
                  
                  <Flex align="center" gap="2">
                    <Clock size={16} className="text-gray-500" />
                    <Text size="2">{selectedReview.startTime} - {selectedReview.endTime} ({selectedReview.duration}시간)</Text>
                  </Flex>
                  
                  <Badge color="blue">
                    {selectedReview.scheduleSummary}
                  </Badge>
                  
                  <Flex align="center" gap="2">
                    <Flex gap="1">
                      {renderStars(selectedReview.rating)}
                    </Flex>
                    <Text size="2" weight="medium">
                      {getRatingText(selectedReview.rating)}
                    </Text>
                  </Flex>
                  
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <Text size="2">{selectedReview.reviewText}</Text>
                  </div>
                </Flex>
              </Flex>
            )}
          </Dialog.Content>
        </Dialog.Root>
      </Flex>
    </Container>
  );
}
