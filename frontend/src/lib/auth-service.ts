import api from './api';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  roles: string[];
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: UserProfile;
}

export const authService = {
  async login(loginData: any): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/login', loginData);
    return response.data;
  },

  async getMe(): Promise<UserProfile> {
    const response = await api.get<UserProfile>('/auth/me');
    return response.data;
  },
};
