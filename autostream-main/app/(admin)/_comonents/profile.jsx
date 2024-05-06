import { currentUser } from "@clerk/nextjs";

export const Profile = async () => {
  const { firstName,lastName } = await currentUser();
  return (
    <div className="w-full">
      <div className="truncate text-xs w-fit">
        {firstName} {lastName}
      </div>
      <div className="text-zinc-500 text-sm">Administrator</div>
    </div>
  );
};
