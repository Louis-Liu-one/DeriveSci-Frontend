import request from '@/api/index'

import type { ApiResponse, User } from '../types'

export interface LoginParams {
  userName: string
  password: string
}

export interface LoginData {
  token: string
  user: User
}

export type LoginResponse = ApiResponse<LoginData>

export const login = (params: LoginParams): Promise<LoginResponse> => {
  return request.post('/auth/login', params)
}
