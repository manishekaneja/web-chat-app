import { FC } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Routes } from "../../constants/Routes";
import { DotsVerticalIcon } from "../../Icons/DotsVerticalIcon";
import { SearchIcon } from "../../Icons/SearchIcon";

const Header: FC<NoProps> = () => {
  const location = useLocation();
  return (
    <div className="dark-green w-full sticky top-0 z-30">
      <div className="text-white py-4 px-2 flex">
        <h3 className="font-medium text-2xl flex-1"> WhatsApp</h3>
        <div className=" font-black text-2xl flex">
          <span className="inline-flex items-center justify-center w-7 ml-3">
            <SearchIcon />
          </span>
          <span className="inline-flex items-center justify-center w-7 ml-3">
            <DotsVerticalIcon />
          </span>
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
            className="bottom-0 rounded bg-white w-2/6 absolute"
          ></div>
        )}
      </nav>
    </div>
  );
};

export { Header };
