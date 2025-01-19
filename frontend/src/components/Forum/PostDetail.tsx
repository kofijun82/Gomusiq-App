import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ForumPost, ForumComment } from '../../types/forum';
import { useAuthStore } from '@/stores/useAuthStore';

const PostDetail: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<ForumPost | null>(null);
  const [comments, setComments] = useState<ForumComment[]>([]);
  const [newComment, setNewComment] = useState<string>('');

  const { user, token } = useAuthStore((state) => state);  // Get user and token from the store

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const postResponse = await axios.get(`/api/forum/thread/${postId}`);
        setPost(postResponse.data);
        const commentsResponse = await axios.get(`/api/forum/comments/${postId}`);
        setComments(commentsResponse.data);
      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    };

    if (postId) {
      fetchPostDetails();
    }
  }, [postId]);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) {
      return;
    }

    try {
      const response = await axios.post(
        '/api/forum/comment',
        {
          content: newComment,
          post: postId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,  // Use the token stored in the store
          },
        }
      );
      setComments((prevComments) => [...prevComments, response.data]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="post-detail">
      {post ? (
        <div className="post-content">
          <h2>{post.content}</h2>
          <div className="comments-section">
            <h3>Comments</h3>
            {comments.length > 0 ? (
              <ul>
                {comments.map((comment) => (
                  <li key={comment._id}>
                    <div>
                      <strong>{comment.createdBy.username}</strong>
                      <p>{comment.content}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No comments yet.</p>
            )}
            {user ? (
              <form onSubmit={handleAddComment}>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  required
                />
                <button type="submit">Add Comment</button>
              </form>
            ) : (
              <p>You must be logged in to comment.</p>
            )}
          </div>
        </div>
      ) : (
        <p>Loading post details...</p>
      )}
    </div>
  );
};

export default PostDetail;
