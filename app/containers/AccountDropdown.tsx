import { Form, Link } from "@remix-run/react";
import { UserProfile } from "../lib/types";
import UserAvatar from "../components/UserAvatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function AccountDropdown({ profile }: { profile: UserProfile }) {
  const { username, avatar } = profile;
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const handleClick = () => setShowMenu((prev) => !prev);

  return (
    <div className={`h-full relative flex p-1 ${showMenu ? "" : ""}`}>
      <button
        className="h-full w-full flex justify-end items-center gap-2 border-none bg-none cursor-pointer"
        onClick={handleClick}
      >
        <h4 className="m-0">{username}</h4>
        <UserAvatar username={username} avatarUrl={avatar} />
        <FontAwesomeIcon icon={faCaretDown} className="h-5" color="black" />
      </button>
      <menu
        className={`w-full m-0 absolute top-[60px] right-0 p-0 shadow-2xl rounded-md ${
          showMenu ? "block bg-black z-10" : "hidden"
        }`}
        onBlur={handleClick}
      >
        <li className="h-full w-full min-h-10">
          <Link
            className="h-full w-full text-white hover:bg-white hover:text-black text-left"
            to={`/user/${username}`}
          >
            My Profile
          </Link>
        </li>
        <li className="h-full w-full min-h-10">
          <Form method="post">
            <button className="w-full py-2 px-3 text-white hover:bg-white hover:text-black text-left">
              Log Out
            </button>
          </Form>
        </li>
      </menu>
    </div>
  );
}
