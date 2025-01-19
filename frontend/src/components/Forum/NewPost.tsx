import React, { useState } from "react";

interface NewPostProps {
    threadId: string;
    onPostCreated: () => void;
}

const NewPost: React.FC<NewPostProps> = ({ threadId, onPostCreated }) => {
    const [content, setContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!content.trim()) {
            return alert("Post content cannot be empty.");
        }

        setIsSubmitting(true);

        try {
            const response = await fetch(`/api/forum/posts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    threadId,
                    content,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to create post");
            }

            setContent("");
            onPostCreated();
        } catch (error) {
            console.error("Error creating post:", error);
            alert("Failed to create post. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-xl font-bold mb-4">Add a New Post</h2>
            <textarea
                className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring focus:ring-blue-300"
                rows={5}
                placeholder="Write your post here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={isSubmitting}
            ></textarea>
            <button
                type="submit"
                className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
                disabled={isSubmitting}
            >
                {isSubmitting ? "Posting..." : "Submit Post"}
            </button>
        </form>
    );
};

export default NewPost;
