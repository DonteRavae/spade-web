import UserAuthAccess from './UserAuthAcess';

export default function ApplicationHeader() {
  return (
    <header className="flex justify-between items-center col-span-full h-full border-b px-5">
      <img
        className="h-full"
        src="assets/logo_trans_horizontal.png"
        alt="SPADE Mental Health Logo"
      />
      <form>
        <input type="search" />
      </form>
      <UserAuthAccess />
    </header>
  );
}
