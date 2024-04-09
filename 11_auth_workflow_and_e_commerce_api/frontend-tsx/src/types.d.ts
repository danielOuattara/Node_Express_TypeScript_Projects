interface IUser {
  name: string;
}

interface IAppContext {
  isLoading: boolean;
  saveUser(user: IUser): void;
  user: IUser | null;
  logoutUser(): void;
}
