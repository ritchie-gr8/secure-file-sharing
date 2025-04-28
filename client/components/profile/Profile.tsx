"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import PasswordChange from "./PasswordChange";
import UserProfile from "./UserProfile";

export interface UserDataProps {
  id: string;
  name: string;
  email: string;
  public_key: string | null;
}

const Profile = ({ userData }: { userData: UserDataProps }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Management</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent>
        <UserProfile userData={userData} />
        <Separator />
        <PasswordChange />
      </CardContent>
    </Card>
  );
};

export default Profile;
