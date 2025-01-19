import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForumStore } from "@/stores/useForumStore";

const CreateThreadPage = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { createThread } = useForumStore(); // Using updated createThread
  const navigate = useNavigate();

  const handleCreateThread = async () => {
    if (!title.trim() || !content.trim()) return;

    setIsLoading(true);

    try {
      const newThread = await createThread({ title, content }); // Updated usage
      navigate(`/forum/thread/${newThread._id}`);
    } catch (error) {
      console.error("Error creating thread:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full p-6">
      <div className="max-w-xl mx-auto bg-zinc-800 p-8 rounded-md shadow-md">
        <h1 className="text-3xl font-bold text-white mb-6">Create a New Thread</h1>

        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="text-sm text-zinc-300">Thread Title</label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2 text-white"
              placeholder="Enter thread title"
              required
            />
          </div>

          <div>
            <label htmlFor="content" className="text-sm text-zinc-300">Thread Content</label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="mt-2 text-white"
              placeholder="Enter thread content"
              rows={6}
              required
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button
              onClick={handleCreateThread}
              className="bg-green-500 text-white hover:bg-green-400 disabled:opacity-50"
              disabled={isLoading || !title || !content}
            >
              {isLoading ? "Creating..." : "Create Thread"}
            </Button>
            <Button
              onClick={() => navigate("/forum")}
              className="bg-gray-500 text-white hover:bg-gray-400"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateThreadPage;
