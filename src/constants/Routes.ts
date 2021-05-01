type RoutesTypes = "home" | "chat" | "contact" | "request" | "user" | "login";
const Routes: Record<RoutesTypes, string> = {
  chat: "/chat",
  contact: "/contact",
  home: "/",
  request: "/request",
  user: "/user",
  login: "/login",
};

export { Routes };
