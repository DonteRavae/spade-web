export default function UserAvatar({
  avatarUrl,
  username,
}: {
  avatarUrl: string;
  username: string;
}) {
  return (
    <img
      className="h-3/4 w-auto rounded-full text-center cursor-pointer"
      src={avatarUrl}
      alt={`${username}'s avatar`}
    />
  );
}
