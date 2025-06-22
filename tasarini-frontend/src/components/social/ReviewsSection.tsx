
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, ThumbsUp, MessageSquare } from "lucide-react";
import { Review } from "@/types/social";

interface ReviewsSectionProps {
  destinationName: string;
  reviews: Review[];
  onAddReview: (review: Omit<Review, 'id' | 'userId' | 'userName' | 'date' | 'helpful'>) => void;
}

const ReviewsSection = ({ destinationName, reviews, onAddReview }: ReviewsSectionProps) => {
  const [showAddReview, setShowAddReview] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmitReview = () => {
    if (comment.trim()) {
      onAddReview({
        rating,
        comment: comment.trim(),
        userAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b900?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
        verified: false
      });
      setComment("");
      setRating(5);
      setShowAddReview(false);
    }
  };

  const renderStars = (rating: number, interactive = false) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating 
            ? 'text-yellow-400 fill-yellow-400' 
            : 'text-gray-300'
        } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
        onClick={interactive ? () => setRating(i + 1) : undefined}
      />
    ));
  };

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">Avis sur {destinationName}</h3>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex">{renderStars(Math.round(averageRating))}</div>
            <span className="text-lg font-semibold">{averageRating.toFixed(1)}</span>
            <span className="text-gray-600">({reviews.length} avis)</span>
          </div>
        </div>
        
        <Button onClick={() => setShowAddReview(!showAddReview)}>
          <MessageSquare className="w-4 h-4 mr-2" />
          Laisser un avis
        </Button>
      </div>

      {showAddReview && (
        <Card>
          <CardHeader>
            <CardTitle>Votre avis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Note</label>
              <div className="flex gap-1">
                {renderStars(rating, true)}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Commentaire</label>
              <Textarea
                placeholder="Partagez votre expérience..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
              />
            </div>
            
            <div className="flex gap-2">
              <Button onClick={handleSubmitReview}>Publier</Button>
              <Button variant="outline" onClick={() => setShowAddReview(false)}>
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src={review.userAvatar} alt={review.userName} />
                  <AvatarFallback>
                    {review.userName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold">{review.userName}</span>
                    {review.verified && (
                      <Badge variant="secondary" className="text-xs">
                        Vérifié
                      </Badge>
                    )}
                    <div className="flex">{renderStars(review.rating)}</div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  
                  <p className="text-gray-700 mb-3">{review.comment}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <button className="flex items-center gap-1 hover:text-blue-600">
                      <ThumbsUp className="w-4 h-4" />
                      Utile ({review.helpful})
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReviewsSection;
