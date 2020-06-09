export type User = {
  id: string;
  first: string;
  last: string;
  phone: string;
  email: string;
  plan: string;
};

export interface AuthContext {
  authenticated: boolean;
  authenticating: boolean;
  user: User | null;
  token: string;
  signIn: (userName: string, password: string) => Promise<boolean>;
  signOut: () => Promise<boolean>;
  authError: Error | null;
}