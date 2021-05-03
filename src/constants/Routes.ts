type RoutesTypes =
  | "home"
  | "chat"
  | "contact"
  | "request"
  | "user"
  | "login"
  | "room";
const Routes: Record<RoutesTypes, string> = {
  chat: "/chat",
  contact: "/contact",
  home: "/",
  request: "/request",
  user: "/user",
  login: "/login",
  room: "/room",
};

export { Routes };
