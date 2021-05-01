type UserPublicInfo = {
  id: string;
  name: string;
  email: string;
  profile: string;
};

type UserInfo = UserPublicInfo & {
  friends: UserPublicInfo[];
  pendingRequest: UserPublicInfo[];
  sendRequest: UserPublicInfo[];
};

type Reducer$ApplicationState = {
  isLoggedIn: boolean;
};

type RootState = {
  user: UserInfo;
  application: Reducer$ApplicationState;
};
