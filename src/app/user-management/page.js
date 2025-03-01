import { fetchUsersAction } from "@/actions/page";
import AddNewUser from "@/components/add-new-user";
import SingleUserCard from "@/components/single-user-card";


async function UserManagement(){

    const getListOfUsers = await fetchUsersAction();

    console.log(getListOfUsers)

    return(
        <div className="p-20 max-w-6xl ">
            <div className="flex justify-between">
                <h1>User Management</h1>
                <AddNewUser/>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-5">
                    {
                        getListOfUsers && getListOfUsers.data && getListOfUsers.data.length > 0 ?
                        getListOfUsers.data.map(userItem => <SingleUserCard user={userItem}/>)
                        : <h3> No User Found . Please create one</h3>
                    }
                </div>
        </div>
    )
}

export default UserManagement;