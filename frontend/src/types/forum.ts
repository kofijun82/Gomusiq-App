
export interface ForumThread {
  _id: string; // Unique identifier for the thread
  title: string; // Title of the thread
  content: string; // Main content of the thread
  category: {
    _id: string; // Unique identifier for the category
    name: string; // Name of the category
  };
  createdBy: {
    _id: string; // Unique identifier for the user who created the thread
    username: string; // Username of the creator
  };
  createdAt: string; // ISO string representing when the thread was created
  updatedAt?: string; // Optional: ISO string for the last update time
}

export interface ForumPost {
  _id: string; // Unique identifier for the post
  content: string; // Content of the post
  thread: ForumThread; // Reference to the thread this post belongs to
  createdBy: {
    _id: string; // Unique identifier for the user who created the post
    username: string; // Username of the creator
  };
  createdAt: string; // ISO string for when the post was created
  updatedAt?: string; // Optional: ISO string for when the post was last updated
  likes?: number; // Optional: Number of likes for the post
}

export interface ForumComment {
  _id: string; // Unique identifier for the comment
  content: string; // Content of the comment
  post: ForumPost; // Reference to the post this comment belongs to
  createdBy: {
    _id: string; // Unique identifier for the user who created the comment
    username: string; // Username of the creator
  };
  createdAt: string; // ISO string for when the comment was created
  updatedAt?: string; // Optional: ISO string for when the comment was last updated
  likes?: number; // Optional: Number of likes for the comment
}
