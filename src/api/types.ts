export interface User {
  uid: number
  userName: string
  isAdmin: boolean
  gender: number
  introduction: string | null
  avatar: string | null
}

export interface ApiResponse<T = unknown> {
  msg: string
  data: T
  code?: string
}
