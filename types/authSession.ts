export const durations = {
  hour: 60 * 60 * 1000,
  week: 7 * 24 * 60 * 60 * 1000,
};

export interface AuthSession {
  authToken: string;
  userUid: string;
  createdAt: Date;
  expiresAt: Date;
}
export interface CreateAuthSessionBody {
  userUid: string;
  keep?: boolean;
}
