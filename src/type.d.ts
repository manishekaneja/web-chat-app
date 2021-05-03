type NoProps = {};

type LoadingProps = {
  loading: booleam;
};

type Message = {
  id: string;
  message: string;
  timestamp: Date | string;
  sendBy: string;
  readBy: string[];
};

type PublicProfile = {
  id: string;
  name: string;
  email: string;
  isOnline?: boolean;
  profilePhoto: string;
  status: "unknown" | "friend" | "sendRequest" | "recievedRequest";
};

type User = PublicProfile & {
  friends: PublicProfile[];
  pendingRequest: PublicProfile[];
  sendRequest: PublicProfile[];
};

type ChatRoom = {
  id: string;
  members: string[];
  createdBy: "system" | string;
  creatdedAt: Date;
  active: boolean;
  messages?: Message[];
};

type FirestoreUser = Pick<
  User,
  | "id"
  | "email"
  | "friends"
  | "name"
  | "pendingRequest"
  | "profilePhoto"
  | "sendRequest"
>;
