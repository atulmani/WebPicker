import { functions } from '../firebase.js'
import { httpsCallable } from "firebase/functions";

export const GetUserDetails = (props) => {
    let flag = false;
    let para1 = {};
    const ret1 = httpsCallable(functions, "getProfileDetails");

    para1 = {
        userID: props
    };

    return ret1(para1).then(async (result) => {
        var record1 = result.data;
        console.log(result.data.id);
        var userRole = {
            id: result.data.id,
            PlayerID: result.data.PlayerID,
            Address: result.data.Address,
            AlternatePhone: result.data.AlternatePhone,
            City: result.data.City,
            Country: result.data.Country,
            DateOfBirth: result.data.DateOfBirth,
            Email: result.data.Email,
            Gender: result.data.Gender,
            Phone: result.data.Phone,
            Pincode: result.data.Pincode,
            ProfilePicURL: result.data.ProfilePicURL,
            State: result.data.State,
            UserName: result.data.UserName,
            UserRole: result.data.UserRole,
        }

        console.log(userRole);
        window.localStorage.setItem("userProfile", JSON.stringify(userRole));
        return true;
    });
    //return flag;
}
