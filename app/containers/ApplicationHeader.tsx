import { Link, useLoaderData } from "@remix-run/react";
import { loader } from "../root";
import UserAuthAccess from "./UserAuthAcess";
import AccountDropdown from "./AccountDropdown";

export default function ApplicationHeader() {
  const { profile } = useLoaderData<typeof loader>();
  return (
    <header className="grid grid-cols-[auto_1fr_15%] grid-rows-1 items-center col-span-full border-b px-5">
      <Link to="/" className="h-full">
        <img
          className="h-full"
          src="/assets/logo_trans_horizontal.png"
          alt="SPADE Mental Health Logo"
        />
      </Link>
      <form>
        <input type="search" />
      </form>
      {!profile ? <UserAuthAccess /> : <AccountDropdown profile={profile} />}
    </header>
  );
}
