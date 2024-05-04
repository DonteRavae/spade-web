export type UserProfile = {
  [x: string]: any;
  id: string;
  username: string;
  avatar: string;
  likes: string[];
};

export type AuthResponse = {
  register: any;
  success: boolean;
  message?: string;
  payload?: UserProfile;
};
