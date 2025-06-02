
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: string;
}

interface PostCommentsProps {
  postId: string;
  comments: Comment[];
  onAddComment: (postId: string, content: string) => void;
}

const PostComments = ({ postId, comments, onAddComment }: PostCommentsProps) => {
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const navigate = useNavigate();

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    onAddComment(postId, newComment);
    setNewComment("");
  };

  const handleUserClick = (userId: string) => {
    navigate(`/user-profile/${userId}`);
  };

  return (
    <div>
      {comments.length > 0 && (
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-xs text-muted-foreground mb-2"
          onClick={() => setShowComments(!showComments)}
        >
          {showComments ? "Masquer" : "Voir"} les {comments.length} commentaire{comments.length > 1 ? "s" : ""}
        </Button>
      )}

      {showComments && (
        <div className="space-y-3 mb-3">
          {comments.map(comment => (
            <div key={comment.id} className="flex space-x-2">
              <Avatar 
                className="h-6 w-6 cursor-pointer" 
                onClick={() => handleUserClick(comment.userId)}
              >
                <AvatarImage src={comment.userAvatar} alt={comment.userName} />
                <AvatarFallback className="bg-forest text-white text-xs">
                  {comment.userName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="bg-muted p-2 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <h4 
                      className="font-medium text-xs cursor-pointer hover:underline"
                      onClick={() => handleUserClick(comment.userId)}
                    >
                      {comment.userName}
                    </h4>
                    <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                  </div>
                  <p className="text-xs">{comment.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex space-x-2 mt-2">
        <Avatar className="h-6 w-6">
          <AvatarFallback className="bg-forest text-white text-xs">JD</AvatarFallback>
        </Avatar>
        <div className="flex-1 flex space-x-2">
          <Input 
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Ajouter un commentaire..."
            className="text-xs h-8"
            onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
          />
          <Button 
            size="sm"
            disabled={!newComment.trim()}
            onClick={handleAddComment}
            className="h-8 w-8 p-0"
          >
            <Send className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostComments;
