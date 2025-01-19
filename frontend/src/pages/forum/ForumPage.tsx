import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area"; // Assuming you have a forum store
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ForumPost } from "../../types/forum"; // Assuming this type exists
import { useForumStore } from "../../stores/useForumStore";


export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

type ForumPageProps = {
  currency: string; // Assuming this is passed as a prop
};

const ForumPage = ({ }: ForumPageProps) => {
  const { threadId } = useParams(); // Assuming threadId is passed as a param
  const { fetchThreadById, currentThread, isLoading } = useForumStore();
  // usePlayerStore(); // Assuming you want a similar music player in forum page (optional)

  useEffect(() => {
    if (threadId) fetchThreadById(threadId); // Fetch thread by threadId
  }, [fetchThreadById, threadId]);

  if (isLoading) return null;

  return (
    <div className='h-full'>
      <ScrollArea className='h-full rounded-md'>
        {/* Main Content */}
        <div className='relative min-h-full'>
          {/* bg gradient */}
          <div
            className='absolute inset-0 bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80
             to-zinc-900 pointer-events-none'
            aria-hidden='true'
          />

          {/* Content */}
          <div className='relative z-10'>
            <div className='flex p-6 gap-6 pb-8'>
              <div className='flex flex-col justify-end'>
                <p className='text-sm font-medium'>Forum Thread</p>
                <h1 className='text-7xl font-bold my-4'>{currentThread?.title}</h1>
                <div className='flex items-center gap-2 text-sm text-zinc-100'>
                  <span className='font-medium text-white'>{currentThread?.createdBy.username}</span>
                  <span>• {currentThread?.posts.length} posts</span>
                  <span>• {formatDate(currentThread?.createdAt)}</span>
                </div>
              </div>
            </div>

            {/* Thread Posts */}
            <div className='px-6'>
              <div className='space-y-2 py-4'>
                {currentThread?.posts.map((post: ForumPost) => (
                  <div key={post._id} className='border-b pb-4'>
                    <div className='font-medium text-white'>{post.createdBy.username}</div>
                    <div>{post.content}</div>
                    <div className='text-sm text-zinc-300'>{formatDate(post.createdAt)}</div>
                    <div className='mt-2'>
                      <Button className='bg-indigo-500 text-white px-2 py-1 rounded-md hover:bg-indigo-600'>
                        Reply
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Create New Post */}
            <div className='px-6 py-4'>
              <Button
                className='w-full bg-green-500 text-white'
                onClick={() => {
                  // Handle creating new post
                }}
              >
                Create New Post
              </Button>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default ForumPage;
