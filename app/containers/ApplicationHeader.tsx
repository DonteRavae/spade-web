import { useLoaderData } from "@remix-run/react";
import { UserProfile } from "../lib/types";
import { loader } from "../root";
import UserAuthAccess from "./UserAuthAcess";
import AccountDropdown from "./AccountDropdown";

export default function ApplicationHeader() {
  const { profile } = useLoaderData<typeof loader>() as UserProfile;
  return (
    <header className="grid grid-cols-[30%_1fr_15%] grid-rows-1 items-center col-span-full border-b px-5">
      <img
        className="h-full"
        src="assets/logo_trans_horizontal.png"
        alt="SPADE Mental Health Logo"
      />
      <form>
        <input type="search" />
      </form>
      {!profile ? <UserAuthAccess /> : <AccountDropdown profile={profile} />}
    </header>
  );
}
