type Initial$UserState = User;

type Initial$ApplicationState = {
  isLoggedIn: boolean;
};

type RootState = {
  user: Initial$UserState;
  application: Initial$ApplicationState;
};
