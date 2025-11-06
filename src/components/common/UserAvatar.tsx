import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const UserAvatar = ({
  name,
  image,
  classname,
}: {
  name: string;
  image: string | null | undefined;
  classname?: string;
}) => {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("");
  return (
    <Avatar className={classname}>
      <AvatarImage
        src={image ?? undefined}
        alt={name}
        className="aspect-square object-cover"
      />
      <AvatarFallback className="border">{initials}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
