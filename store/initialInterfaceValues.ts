import { Access, UserAccess } from "./loginInterfaces"

export const defaultAccessValue: Access = {
  name: '',
  email: '',
  client: '',
  uid: '',
  accessToken: '',
}

export const userDefaultValue: UserAccess = {
  user: defaultAccessValue,
  feedback: '',
  isLoading: false,
  doLogin: () => { },
  doLogout: () => { },
}