import { auth, currentUser } from "@clerk/nextjs";
import { db } from "./db";

export const CreateUser = async () => {
  const { id, emailAddresses, firstName, lastName } = await currentUser();

  let user;

  const check_user_id = await db.user.findUnique({
    where: {
      clerkId: id,
    },
  });


  if (!check_user_id) {
    user = await db.user.create({
      data: {
        clerkId: id,
        email: emailAddresses[0].emailAddress,
        firstname: firstName,
        lastname: lastName,
        name: `${firstName} ${lastName}`,
      },
    });
  }

  return { user };
};
