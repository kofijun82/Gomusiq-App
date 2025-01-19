import React, { useState } from "react";

interface NewThreadProps {
    categoryId: string;
    onThreadCreated: () => void;
}

const NewThread: React.FC<NewThreadProps> = ({ categoryId, onThreadCreated }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim() || !content.trim()) {
            return alert("Both title and content are required.");
        }

        setIsSubmitting(true);

        try {
            const response = await fetch(`/api/forum/threads`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    categoryId,
                    title,
                    content,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to create thread");
            }

            setTitle("");
            setContent("");
            onThreadCreated();
        } catch (error) {
            console.error("Error creating thread:", error);
            alert("Failed to create thread. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-xl font-bold mb-4">Create a New Thread</h2>
            <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-4 mb-4 focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Thread Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={isSubmitting}
            />
            <textarea
                className="w-full border border-gray-300 rounded-lg p-4 mb-4 focus:outline-none focus:ring focus:ring-blue-300"
                rows={5}
                placeholder="Thread Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={isSubmitting}
            ></textarea>
            <button
                type="submit"
                className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
                disabled={isSubmitting}
            >
                {isSubmitting ? "Creating..." : "Create Thread"}
            </button>
        </form>
    );
};

export default NewThread;
