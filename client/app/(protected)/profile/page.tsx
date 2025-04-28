import { getMe } from "@/action/profile-handler";
import Profile from "@/components/profile/Profile";
import React from "react";

const ProfilePage = async () => {
  const userData = await getMe();

  return (
    <div className="p-4">
      <Profile userData={userData?.data?.user} />
    </div>
  );
};

export default ProfilePage;
