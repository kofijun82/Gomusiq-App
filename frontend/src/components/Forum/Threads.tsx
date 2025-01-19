import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ForumThread } from '../../types/forum'; // Assuming you have this type

const Threads: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>(); // Get category ID from URL
  const [threads, setThreads] = useState<ForumThread[]>([]); // State for threads
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  // Fetch threads by category when the component mounts or categoryId changes
  useEffect(() => {
    const fetchThreads = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/forum/threads/${categoryId}`);
        setThreads(response.data);
      } catch (error) {
        console.error('Error fetching threads:', error);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchThreads();
    }
  }, [categoryId]);

  return (
    <div className="threads-list">
      <h2>Threads</h2>
      {loading ? (
        <p>Loading threads...</p>
      ) : (
        <ul>
          {threads.length > 0 ? (
            threads.map((thread) => (
              <li key={thread._id}>
                <Link to={`/thread/${thread._id}`}>
                  <h3>{thread.title}</h3>
                  <p>Created by: {thread.createdBy.username}</p>
                </Link>
              </li>
            ))
          ) : (
            <p>No threads available in this category.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default Threads;
