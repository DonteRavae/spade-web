/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { Form, Link } from "@remix-run/react";
import { UserProfile } from "../lib/types";
import UserAvatar from "../components/UserAvatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightToBracket,
  faCaretDown,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function AccountDropdown({ profile }: { profile: UserProfile }) {
  const { username, avatar } = profile;
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const handleClick = () => setShowMenu((prev) => !prev);

  return (
    <nav className={`h-full relative flex p-1`}>
      <button
        className="h-full w-full flex justify-end items-center gap-2 py-2 border-none bg-none cursor-pointer"
        onClick={handleClick}
      >
        <h4 className="m-0">{username}</h4>
        <UserAvatar username={username} avatarUrl={avatar} />
        <FontAwesomeIcon icon={faCaretDown} className="h-5" color="black" />
      </button>
      <menu
        className={`w-full block m-0 absolute top-[60px] p-0 shadow-2xl rounded-md ${
          showMenu ? "bg-black z-20 right-0" : "right-[9999px]"
        }`}
      >
        <li className="flex w-full items-center h-12">
          <Link
            className="h-full flex items-center flex-auto gap-2 p-3 text-white hover:bg-white hover:text-black text-left"
            onClick={handleClick}
            onBlur={handleClick}
            to={`/users/${username}`}
          >
            <UserAvatar username={username} avatarUrl={avatar} />
            My Profile
          </Link>
        </li>
        <li className="flex w-full items-center h-12">
          <Link
            className="h-full flex items-center flex-auto gap-2 p-3 text-white hover:bg-white hover:text-black text-left"
            onClick={handleClick}
            to={`/settings`}
          >
            <FontAwesomeIcon icon={faGear} className="h-4 w-6" />
            Settings
          </Link>
        </li>
        <li className="flex h-12">
          <Form method="post" className="flex-auto">
            <button
              className="w-full flex items-center gap-2 p-3 text-white hover:bg-white hover:text-black text-left"
              onClick={handleClick}
              name="requestType"
              value="logout-request"
            >
              <FontAwesomeIcon
                icon={faArrowRightToBracket}
                className="h-4 w-6"
              />
              Log Out
            </button>
          </Form>
        </li>
      </menu>
      <div
        className={
          showMenu ? "block fixed top-0 right-0 left-0 bottom-0 z-10" : "hidden"
        }
        onClick={handleClick}
      />
    </nav>
  );
}
