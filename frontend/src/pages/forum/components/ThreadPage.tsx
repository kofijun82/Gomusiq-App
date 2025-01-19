import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useForumStore } from "@/stores/useForumStore";
import { Clock } from "lucide-react";

// Utility function to format durations (fallback if not imported)
const formatDuration = (durationInSeconds: number) => {
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = durationInSeconds % 60;
  return `${minutes}m ${seconds}s`;
};

const ThreadPage = () => {
  const { threadId } = useParams<{ threadId: string }>();
  const {
    fetchThreadById,
    currentThread,
    posts,
    isLoading,
    createNewPost,
    error,
  } = useForumStore();

  const [newPostContent, setNewPostContent] = useState<string>("");

  useEffect(() => {
    if (threadId) {
      fetchThreadById(threadId); // Fetch the thread details and posts when the component mounts
    } else {
      console.error("Thread ID is undefined");
    }
  }, [fetchThreadById, threadId]);

  const handleAddPost = async () => {
    if (!newPostContent.trim()) return;
    try {
      if (threadId) {
        await createNewPost(newPostContent, threadId);
        setNewPostContent(""); // Clear the input after adding the post
      } else {
        console.error("Thread ID is missing");
      }
    } catch (err) {
      console.error("Error adding post:", err);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading thread: {error}</div>;

  return (
    <div className="h-full">
      <ScrollArea className="h-full rounded-md">
        <div className="relative min-h-full">
          {/* Background gradient */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80
            to-zinc-900 pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10">
            {/* Thread Title and Content */}
            <div className="flex p-6 gap-6 pb-8">
              <div className="flex flex-col justify-end">
                <p className="text-sm font-medium">Thread</p>
                <h1 className="text-7xl font-bold my-4">{currentThread?.title || "Untitled"}</h1>
                <div className="flex items-center gap-2 text-sm text-zinc-100">
                  <span className="font-medium text-white">
                    {currentThread?.createdBy?.username || "Unknown"}
                  </span>
                  <span>• {currentThread?.createdAt?.split("T")[0] || "N/A"}</span>
                </div>
                <p className="text-lg text-zinc-300 mt-4">{currentThread?.content || "No content available."}</p>
              </div>
            </div>

            {/* Post Section */}
            <div className="bg-black/20 backdrop-blur-sm">
              {/* Add a post form */}
              <div className="px-6 py-4">
                <textarea
                  placeholder="Write a post..."
                  className="w-full p-4 bg-zinc-800 text-white rounded-md"
                  rows={4}
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                />
                <Button
                  className="mt-4 bg-green-500 text-white hover:bg-green-400"
                  onClick={handleAddPost}
                >
                  Add Post
                </Button>
              </div>

              {/* Posts List */}
              <div className="px-6 py-4">
                <div className="space-y-2">
                  {posts.length > 0 ? (
                    posts.map((post) => (
                      <div
                        key={post._id}
                        className="bg-zinc-800 rounded-md p-4 text-white"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{post.createdBy?.username || "Anonymous"}</span>
                            <span className="text-sm text-zinc-400">
                              {post.createdAt?.split("T")[0] || "N/A"}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-zinc-400">
                            <Clock className="h-4 w-4" />
                            <span>{post.duration ? formatDuration(post.duration) : "0m 0s"}</span>
                          </div>
                        </div>
                        <p className="mt-2">{post.content || "No content."}</p>
                      </div>
                    ))
                  ) : (
                    <p>No posts yet.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default ThreadPage;
