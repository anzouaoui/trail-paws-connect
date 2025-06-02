
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PostCard from "@/components/PostCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: string;
  likes: number;
}

const PostDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);

  // Sample post data - in a real app, fetch based on the post ID
  const [post, setPost] = useState({
    id: id || "1",
    userId: "user1",
    userName: "Sarah Johnson",
    userAvatar: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    content: "Had an amazing run with Max today! We crushed our personal best time on the forest trail.",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    activityId: "1",
    activityType: "canicross",
    location: "Forest Hills Trail",
    date: "2025-05-22",
    likes: 24,
    comments: 2,
    isLiked: false,
    postComments: [
      {
        id: "c1",
        userId: "user3",
        userName: "Emma Wilson",
        userAvatar: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
        content: "That's amazing! How long did it take?",
        timestamp: "2 hours ago"
      },
      {
        id: "c2",
        userId: "user2",
        userName: "Mike Roberts",
        userAvatar: "",
        content: "Great job! Which trail did you guys take? I'm looking for new routes.",
        timestamp: "1 hour ago"
      }
    ]
  });

  // Sample comments
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "c1",
      userId: "user3",
      userName: "Emma Wilson",
      userAvatar: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
      content: "That's amazing! How long did it take?",
      timestamp: "2 hours ago",
      likes: 3
    },
    {
      id: "c2",
      userId: "user2",
      userName: "Mike Roberts",
      userAvatar: "",
      content: "Great job! Which trail did you guys take? I'm looking for new routes.",
      timestamp: "1 hour ago",
      likes: 1
    }
  ]);

  const handleLike = () => {
    setPost({
      ...post,
      likes: isLiked ? post.likes - 1 : post.likes + 1,
      isLiked: !isLiked
    });
    setIsLiked(!isLiked);
  };

  const handleAddComment = (postId: string, content: string) => {
    if (!content.trim()) return;

    const newCommentObj = {
      id: `c${post.postComments.length + 1}`,
      userId: "currentUser",
      userName: "John Doe",
      userAvatar: "",
      content: content,
      timestamp: "Just now"
    };

    setPost({
      ...post,
      comments: post.comments + 1,
      postComments: [...post.postComments, newCommentObj]
    });
  };

  const handleAddCommentLegacy = () => {
    if (!newComment.trim()) return;

    const newCommentObj: Comment = {
      id: `c${comments.length + 1}`,
      userId: "currentUser",
      userName: "John Doe",
      userAvatar: "",
      content: newComment,
      timestamp: "Just now",
      likes: 0
    };

    setComments([...comments, newCommentObj]);
    setPost({
      ...post,
      comments: post.comments + 1
    });
    setNewComment("");
  };

  return (
    <div className="pb-24">
      <header className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex items-center p-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold ml-2">Post</h1>
        </div>
      </header>
      
      <div className="p-4">
        <PostCard 
          post={post}
          onLike={handleLike}
          onComment={() => {}}
          onAddComment={handleAddComment}
        />
        
        <Separator className="my-4" />
        
        <h2 className="font-semibold mb-4">Comments ({comments.length})</h2>
        
        <div className="space-y-4 mb-6">
          {comments.map(comment => (
            <div key={comment.id} className="flex space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={comment.userAvatar} alt={comment.userName} />
                <AvatarFallback className="bg-forest text-white text-xs">
                  {comment.userName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="bg-muted p-3 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-semibold text-sm">{comment.userName}</h3>
                    <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                  </div>
                  <p className="text-sm">{comment.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-3">
          <div className="flex space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-forest text-white">JD</AvatarFallback>
            </Avatar>
            <div className="flex-1 flex space-x-2">
              <Input 
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1"
              />
              <Button 
                size="icon"
                disabled={!newComment.trim()}
                onClick={handleAddCommentLegacy}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;
