export interface Login {
  email: string;
  password: string;
}

export interface Access {
  name: string;
  email: string;
  client: string;
  uid: string;
  accessToken: string;
}

export interface UserAccess {
  user: Access;
  isLoading: boolean;
  doLogin(email: string, password: string): any;
  doLogout: any;
  feedback: string;
}
