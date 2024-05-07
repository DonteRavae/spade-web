export default function UserAvatar({
  avatarUrl,
  username,
}: {
  avatarUrl: string;
  username: string;
}) {
  return (
    <img
      className="h-full w-auto rounded-full text-center cursor-pointer"
      src={avatarUrl}
      alt={`${username}'s avatar`}
    />
  );
}
