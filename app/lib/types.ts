export type UserProfile = {
  id: string;
  username: string;
  avatar: string;
  likes: string[];
};

export type GraphQLResponse = {
  success: boolean;
  message?: string;
  payload?: UserProfile;
};

export type ExpressionPost = {
  id: string;
  title: string;
  subtitle?: string;
  cover_image?: string;
  author: UserProfile;
  content: {
    kind: "text" | "image";
    value: string;
  };
  replies: Reply[];
  reply_count: number;
  likes: number;
  created_at: string;
  last_modified: string;
};

export type Reply = {
  id: string;
  author: UserProfile;
  parent: string;
  content: string;
  created_at: string;
  last_modified: string;
};
