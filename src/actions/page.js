"use server";

import connectToDB from "@/app/database";
import User from "@/models/user";
import { revalidatePath } from "next/cache";

// add new user action

export async function addNewUserAction(formData , pathToRevalidate) {
  await connectToDB();
  try {
    const newlyCreatedUser = await User.create(formData);
    if (newlyCreatedUser) {
      revalidatePath(pathToRevalidate);
      return {
        success: true,
        message: "User added successfully",
      };
    } else {
      return {
        success: false,
        message: "Something went wrong , please try again",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong , please try again",
    };
  }
}

//fetch user data

export async function fetchUsersAction() {
  await connectToDB();
  try {
    const listOfUsers = await User.find({});
    if (listOfUsers) {
      return {
        success: true,
        data: JSON.parse(JSON.stringify(listOfUsers)),
      };
    } else {
      return {
        success: false,
        message: "Something went wrong , please try again",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong , please try again",
    };
  }
}


//delete user

export async function deleteUserAction(currentUserId , pathToRevalidate){
  await connectToDB();
  try{
    const deletedUser = await User.findByIdAndDelete(currentUserId);
    if(deletedUser){
      revalidatePath(pathToRevalidate)
      return{
        success : true,
        message : 'User deleted successful',
      };
      }else{
        return{
          success : false,
          message :'User deleted failed ! Please try again'
        };
    };

  }catch(error){
    console.log(error);
    return{
      success : false,
      message : 'Something went wrong ! Please try again'
    };
  }
}

//edit user

export async function editUserAction(currentUserID , formData , pathToRevalidate){
  await connectToDB();

  try{
    const {firstName , lastName , email , address } = formData;
    const updatedUser = await User.findOneAndUpdate({
      _id :  currentUserID ,
    }, {firstName , lastName , email , address },
    { new : true}
  );

    if(updatedUser){
      revalidatePath(pathToRevalidate)
      return{
        success : true , message : 'Update succesfully'
      }
    }else{
      return{
        success : false , message :'Unable to update'
      }
    }

  }catch(error){
    console.log(error);
    return{
      success : false,
      message : 'Something went wrong ! Please try again'
    };
  }
}