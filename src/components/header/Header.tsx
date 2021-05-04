import { FC, Fragment } from "react";
import { Helmet } from "react-helmet";
import { NavLink, useLocation } from "react-router-dom";
import { Routes } from "../../constants/Routes";
import { useFirebaseLogin } from "../../hooks/useFirebaseLogin";
import { LogoutIcon } from "../../Icons/LogoutIcon";
const Header: FC<NoProps & { title?: string }> = ({ title = "Chat-App" }) => {
  const location = useLocation();
  const { signOut } = useFirebaseLogin();
  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
      </Helmet>
      <div className="dark-green w-full sticky top-0 z-30">
        <div className="text-white py-4 px-2 flex">
          <h3 className="font-medium text-2xl flex-1"> Chat-App</h3>
          <div className=" font-black text-2xl flex">
            {/* <span className="inline-flex items-center justify-center w-7 ml-3">
            <SearchIcon />
          </span> */}
            <button
              onClick={signOut}
              className="inline-flex items-center justify-center w-7 ml-3 focus:outline-none "
            >
              <LogoutIcon />
            </button>
          </div>
        </div>
        <nav className="text-white flex text-xs relative">
          <NavLink
            to={Routes.chat}
            activeClassName="opacity-100"
            className="flex-1 font-bold uppercase py-4 focus:outline-none flex items-center justify-center opacity-70"
          >
            <span>Chats</span>
          </NavLink>
          <NavLink
            to={Routes.contact}
            activeClassName="opacity-100"
            className="flex-1 font-bold uppercase py-4 focus:outline-none flex items-center justify-center opacity-70"
          >
            <p>Contacts</p>
          </NavLink>
          <NavLink
            to={Routes.request}
            activeClassName="opacity-100"
            className="flex-1 font-bold uppercase py-4 focus:outline-none flex items-center justify-center opacity-70"
          >
            <p>Requests</p>
          </NavLink>
          {[Routes.chat, Routes.contact, Routes.request].includes(
            location.pathname
          ) && (
            <div
              style={{
                height: 3,
                transform:
                  location.pathname === Routes.chat
                    ? "translateX(0%)"
                    : location.pathname === Routes.contact
                    ? "translateX(100%)"
                    : location.pathname === Routes.request
                    ? "translateX(200%)"
                    : "",
              }}
              className="bottom-0 rounded-t to green w-2/6 absolute"
            ></div>
          )}
        </nav>
      </div>
    </Fragment>
  );
};

export { Header };
