
import React from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import PostComments from "./PostComments";

interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: string;
}

interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  image?: string;
  activityId?: string;
  activityType?: string;
  location?: string;
  date: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  postComments: Comment[];
}

interface PostCardProps {
  post: Post;
  onLike: () => void;
  onComment: () => void;
  onAddComment: (postId: string, content: string) => void;
}

const PostCard = ({ post, onLike, onComment, onAddComment }: PostCardProps) => {
  const navigate = useNavigate();

  const handleUserClick = () => {
    navigate(`/user-profile/${post.userId}`);
  };

  return (
    <Card className="p-4">
      <div className="flex items-start space-x-3 mb-3">
        <Avatar className="cursor-pointer" onClick={handleUserClick}>
          <AvatarImage src={post.userAvatar} alt={post.userName} />
          <AvatarFallback className="bg-forest text-white">
            {post.userName.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 
            className="font-semibold cursor-pointer hover:underline" 
            onClick={handleUserClick}
          >
            {post.userName}
          </h3>
          <p className="text-xs text-muted-foreground flex items-center">
            {post.date}
            {post.location && (
              <>
                <span className="mx-1">•</span>
                <MapPin className="h-3 w-3 inline mr-0.5" />
                {post.location}
              </>
            )}
          </p>
        </div>
      </div>
      
      <div className="mb-3">
        <p className="text-sm">{post.content}</p>
      </div>
      
      {post.image && (
        <div className="mb-3">
          <img 
            src={post.image} 
            alt="Post" 
            className="rounded-md w-full h-48 object-cover"
          />
        </div>
      )}
      
      {post.activityType && (
        <div className="mb-3">
          <span className="text-xs px-2 py-1 rounded-full bg-forest/10 text-forest">
            {post.activityType}
          </span>
        </div>
      )}
      
      <div className="flex justify-between items-center mt-2 pt-2 border-t">
        <Button 
          variant="ghost" 
          size="sm" 
          className={cn("flex gap-1", post.isLiked && "text-red-500")}
          onClick={onLike}
        >
          <Heart className={cn("h-4 w-4", post.isLiked && "fill-red-500")} /> 
          {post.likes}
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex gap-1"
          onClick={onComment}
        >
          <MessageSquare className="h-4 w-4" /> 
          {post.comments}
        </Button>
      </div>

      {/* Section des commentaires */}
      <div className="mt-3 pt-3 border-t">
        <PostComments 
          postId={post.id}
          comments={post.postComments}
          onAddComment={onAddComment}
        />
      </div>
    </Card>
  );
};

export default PostCard;
