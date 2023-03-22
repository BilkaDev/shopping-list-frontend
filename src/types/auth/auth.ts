export type LoginRequest = {
  email: string;
  pwd: string;
};

export type AuthLogin = {
  user: {
    userId: string;
    email: string;
  };
};
