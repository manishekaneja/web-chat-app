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
  status?: "unknown" | "friend" | "sendRequest" | "recievedRequest";
};

type User = PublicProfile & {
  friends: Array<PublicProfile & { roomId?: string }>;
  pendingRequest: PublicProfile[];
  sendRequest: PublicProfile[];
};

type ChatRoom = {
  id: string;
  members: PublicProfile[];
  createdBy: "system" | string;
  creatdedAt: Date;
  updatedAt: Date;
  active: boolean;
  membersCount: number;
  messages?: Message[];
  lastMessage: string;
  alias: string | null;
  roomPhoto: string | null;
};

type ChatHistory = Pick<
  ChatRoom,
  | "id"
  | "members"
  | "createdBy"
  | "creatdedAt"
  | "updatedAt"
  | "active"
  | "membersCount"
  | "lastMessage"
> & {
  alias: string;
  roomPhoto: string;
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
