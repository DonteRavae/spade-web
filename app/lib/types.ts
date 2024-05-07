export type UserProfile = {
  [key: string]: string | string[];
  id: string;
  username: string;
  avatar: string;
  likes: string[];
};

export type GraphQLResponse = {
  [key: string]:
    | boolean
    | string
    | UserProfile
    | ExpressionPost
    | Reply
    | ExpressionPostAggregate
    | undefined;
  success: boolean;
  message?: string;
  payload?: UserProfile | ExpressionPost | Reply | ExpressionPostAggregate;
};

export type ExpressionPostAggregate = {
  posts: ExpressionPost[];
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
