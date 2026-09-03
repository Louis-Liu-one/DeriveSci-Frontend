import request from '@/api/index'

import type { ApiResponse, User } from '../types'

export interface LoginParams {
  userName: string
  password: string
}

export interface RegisterParams {
  userName: string
  gender?: number | null
  password: string
  avatar?: File | null
}

export interface LoginData {
  token: string
  user: User
}

export type LoginResponse = ApiResponse<LoginData>
export type RegisterResponse = ApiResponse<LoginData>

export const login = (params: LoginParams): Promise<LoginResponse> => {
  return request.post('/auth/login', params)
}

export const register = (params: RegisterParams): Promise<RegisterResponse> => {
  const formData = new FormData()
  formData.append('userName', params.userName)
  formData.append('password', params.password)
  if (params.gender) formData.append('gender', String(params.gender))
  if (params.avatar) formData.append('avatar', params.avatar)
  return request.post('/auth/register', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}
