export interface IUser {
  _id: string
  name: string
  email: string
  createdAt?: string
}

export interface IAuthContext {
  authUser: IUser | null
  isSigningUp: boolean
  isLoggingIn: boolean

  isCheckingAuth: boolean
  isLoggingOut: boolean

  register: (data: any, callback?: (res: any) => void) => Promise<void>
  login: (data: any, callback?: (res: any) => void) => Promise<void>
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  name: string
  email: string
  password: string
}

export interface AuthResponse {
  message: string
  accessToken: string
  refreshToken: string
  user: IUser
}