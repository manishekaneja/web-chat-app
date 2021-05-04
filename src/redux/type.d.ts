type Initial$UserState = User;

type Initial$ApplicationState = {
  isLoggedIn: boolean;
};
type Initial$LinkState = {
  records: Record<
    string,
    "unknown" | "friend" | "sendRequest" | "recievedRequest"
  >;
};
type Initial$ChatHistory = {
  history: ChatHistory[];
  loading: boolean;
};

type RootState = {
  user: Initial$UserState;
  application: Initial$ApplicationState;
  link: Initial$LinkState;
  history: Initial$ChatHistory;
};
