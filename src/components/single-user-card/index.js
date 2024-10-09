"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { deleteUserAction } from "@/actions/page";
import { useContext } from "react";
import { UserContext } from "@/context";

function SingleUserCard({ user }) {
  const { setOpenPopUp, setAddNewUserFromData, setCurrentEditedID } =
    useContext(UserContext);

  async function handleDelete(getCurrentUserID) {
    const result = await deleteUserAction(getCurrentUserID, "/user-management");

    console.log(result);
  }

  function handleEdit(getCurrentUser) {
    setOpenPopUp(true);
    setAddNewUserFromData({
      firstName: getCurrentUser?.firstName,
      lastName: getCurrentUser?.lastName,
      email: getCurrentUser?.email,
      address: getCurrentUser?.address,
    });
    setCurrentEditedID(getCurrentUser?._id);
  }
  return (
    <Card>
      <CardHeader>
        <div>
          {" "}
          Mr/Mrs <CardTitle>{user?.firstName}</CardTitle>
          <CardDescription>{user?.lastName}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="font-bold"> Email : </p>
        <p>{user?.email}</p>
      </CardContent>
      <CardContent>
        <p className="font-bold"> Address : </p>
        <p> {user?.address}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={() => handleEdit(user)}>Edit</Button>
        <Button onClick={() => handleDelete(user?._id)}>Delete</Button>
      </CardFooter>
    </Card>
  );
}

export default SingleUserCard;
