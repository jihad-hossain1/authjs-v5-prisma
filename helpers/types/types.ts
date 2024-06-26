export type User = {
  name: string;
  email: string;
  password: string;
  id: string;
};

export type Account = {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token: string;
  access_token: string;
  expires_at?: number;
  token_type: string;
  scope: string;
  id_token: string;
  session_state: string;
};
