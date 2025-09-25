export interface IUser {
  _id: string
  name: string
  email: string
  createdAt?: string
}

export interface IUserContext {
  users: IUser[]
  selectedUser: IUser | null
  isLoadingUsers: boolean
  isUpdatingUser: boolean
  isDeletingUser: boolean

  getAllUsers: (callback?: (res: any) => void) => Promise<void>
  getUserById: (id: string, callback?: (res: any) => void) => Promise<void>
  updateUser: (id: string, data: any, callback?: (res: any) => void) => Promise<void>
  deleteUser: (id: string, callback?: (res: any) => void) => Promise<void>
  clearSelectedUser: () => void
}

export interface UpdateUserData {
  name?: string
  email?: string
}