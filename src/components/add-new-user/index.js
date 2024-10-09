"use client";
import { addNewUserAction, editUserAction } from "@/actions/page";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserContext } from "@/context";
import { addNewUserFormControl, addNewUserFormInitialState } from "@/utils";
import { useContext } from "react";

const { Button } = require("../ui/button");

function AddNewUser() {
  const { openPopUp , setOpenPopUp , addNewUserFromData , setAddNewUserFromData , currentEditedID , setCurrentEditedID } = useContext(UserContext);
  console.log(addNewUserFromData)

  function handleSaveButtonValid(){
    return Object.keys(addNewUserFromData).map(key => addNewUserFromData[key].trim() !== '')
  }
  async function handleAddNewUserAction(){
    const result = currentEditedID !== null ? await editUserAction(currentEditedID , addNewUserFromData, '/user-management') : await addNewUserAction(addNewUserFromData ,'/user-management');
    console.log(result);
    setOpenPopUp(false);
    setAddNewUserFromData(addNewUserFormInitialState);
    setCurrentEditedID(null);
  }

  const formControl = [];
  return (
    <div>
      <Button onClick={() => setOpenPopUp(true)}> Add New User </Button>
      <Dialog open={openPopUp} onOpenChange={()=>{
        setOpenPopUp(false);
        setAddNewUserFromData(addNewUserFormInitialState);
        setCurrentEditedID(null);
      }}>
        <DialogContent className="sm:max-w-[425px] bg-white text-black">
          <DialogHeader>
            <DialogTitle>
              {
                currentEditedID !== null ? 'Edit user' : 'Add new User'
              }
            </DialogTitle>
          </DialogHeader>
          <form action={handleAddNewUserAction} className="grid gap-4 py-4">
            <div className="mb-5">
              {addNewUserFormControl.map((controlItem) => (
                <div key={controlItem.name}>
                  <Label htmlFor={controlItem.name} className="text-right">
                    {controlItem.label}
                  </Label>
                  <Input
                    id={controlItem.name}
                    name={controlItem.name}
                    placeholder={controlItem.placeholder}
                    className="col-span-3"
                    type={controlItem.type}
                    value={addNewUserFromData[controlItem.name]}
                    onChange={(event) => setAddNewUserFromData({
                      ...addNewUserFromData, [controlItem.name]: event.target.value,
                    })}
                  />
                </div>
              ))}
            </div>
            <DialogFooter>
            <Button className="disabled:opacit-55" disabled={!handleSaveButtonValid} type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewUser;
