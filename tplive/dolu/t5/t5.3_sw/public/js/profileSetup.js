var loggedinUser;

auth.onAuthStateChanged(firebaseUser => {
    try {
        if (firebaseUser) {
            loggedinUser = firebaseUser;
            console.log('Logged-in user phone number: ' + firebaseUser.phoneNumber);
            getProfileDetails();
        } else {
            loggedinUser = null;
            console.log('User has been logged out');
            window.location.href = "/login/index.html";
        }
    } catch (error) {
        console.log(error.message);
        //        window.location.href = "/login/index.html";
    }
});


function getProfileDetails() {
    var userRole;
    console.log("in getProfileDetails");
    var userProfile = JSON.parse(localStorage.getItem("userProfile"));
    // if (userProfile != undefined && userProfile != "" && userProfile != null) {
    //     console.log(userProfile.id);
    //     userRole = userProfile;

    // } else

    {
        console.log('2 : ', loggedinUser.uid);
        var para1 = {};
        para1 = {
            userID: loggedinUser.uid
        };
        // const ret1 = firebase.functions().httpsCallable("getProfileDetails");
        const ret1 = functions.httpsCallable("getProfileDetails");
        ret1(para1).then((result) => {
            console.log(result.data.id);
            userProfile = {
                id: result.data.id,
                Address: result.data.Address,
                AlternatePhone: result.data.AlternatePhone,
                PlayerID: result.data.PlayerID,
                City: result.data.City,
                Country: result.data.Country,
                DateOfBirth: result.data.DateOfBirth,
                Email: result.data.Email,
                Gender: result.data.Gender,
                Phone: result.data.Phone,
                State: result.data.State,
                Pincode: result.data.Pincode,
                ProfilePicURL: result.data.ProfilePicURL,
                UserName: result.data.UserName,
                UserRole: result.data.UserRole,
            }
            console.log(userProfile.Gender);
            localStorage.setItem("userProfile", JSON.stringify(userProfile));
            document.getElementById("userContact").innerHTML = loggedinUser.phoneNumber.replace("+91", "");

            if (userProfile != undefined && userProfile != null) {
                console.log(userProfile.Gender);
                //        document.getElementById("userContact").innerHTML = userProfile.Phone;
                var genderMale = document.getElementById("regParticipantMale");
                var genderFemale = document.getElementById("regParticipantFemale");
                if (userProfile.Gender != undefined && userProfile.Gender != null) {
                    if (userProfile.Gender.toUpperCase() === "MALE") {
                        console.log("in Male");
                        genderMale.checked = true;
                    } else if (userProfile.Gender.toUpperCase() === "FEMALE") {
                        genderFemale.checked = true;
                    }
                }
                console.log(userProfile);
                if (userProfile.UserName != undefined && userProfile.UserName != null) {

                    document.getElementById("userName").value = userProfile.UserName;
                }
                if (userProfile.Email != undefined && userProfile.Email != null) {
                    document.getElementById("userEmail").value = userProfile.Email;
                }
                if (userProfile.Pincode != undefined) {
                    document.getElementById("pinCode").value = userProfile.Pincode;
                }

                if (userProfile.City != undefined && userProfile.City != null && userProfile.State != undefined && userProfile.State != null) {
                    document.getElementById("userLocation").innerHTML = userProfile.City + ", " + userProfile.State;
                } else if (userProfile.City != undefined && userProfile.City != null) {
                    document.getElementById("userLocation").innerHTML = userProfile.City;
                } else if (userProfile.State != undefined && userProfile.State != null) {
                    document.getElementById("userLocation").innerHTML = userProfile.State;
                } else {
                    document.getElementById("userLocation").innerHTML = "";
                }



            } else {
            }

        });

    }
    console.log(userProfile);
    console.log(loggedinUser.phoneNumber.replace("+91", ""));

}

function profileSetupToFirstSlide() {
    var profileSetupFirstForm = document.getElementById('profileSetupFirstForm');
    var profileSetupSecondForm = document.getElementById('profileSetupSecondForm');

    profileSetupFirstForm.style.transform = 'translateX(0%)';
    profileSetupSecondForm.style.transform = 'translateX(0%)';

    var profileSetupfirstFormDot = document.getElementById('profileSetupfirstFormDot');
    var profileSetupSecondFormDot = document.getElementById('profileSetupSecondFormDot');

    profileSetupfirstFormDot.classList.add('active');
    profileSetupSecondFormDot.classList.remove('active');

}

async function profileSetupToSecondSlide() {
    //SaveDetails_section1();
    var male = document.getElementById('regParticipantMale');
    var female = document.getElementById('regParticipantFemale');
    var genderSelected = '';
    if (male.checked) {
        genderSelected = male.value;
    }
    else if (female.checked) {
        genderSelected = female.value;
    }

    var para = {};
    para = {
        userID: loggedinUser.uid,
        UserName: document.getElementById('userName').value,
        Email: document.getElementById('userEmail').value,
        Gender: genderSelected,
    };
    console.log(para);

    // const ret = firebase.functions().httpsCallable("saveProfileDetailsStep1");
    const ret = await functions.httpsCallable("saveProfileDetailsStep1");
    ret(para).then(result => {
        console.log("From Function " + result.data);
        var profileSetupFirstForm = document.getElementById('profileSetupFirstForm');
        var profileSetupSecondForm = document.getElementById('profileSetupSecondForm');

        profileSetupFirstForm.style.transform = 'translateX(-100%)';
        profileSetupSecondForm.style.transform = 'translateX(-100%)';

        var profileSetupfirstFormDot = document.getElementById('profileSetupfirstFormDot');
        var profileSetupSecondFormDot = document.getElementById('profileSetupSecondFormDot');

        profileSetupfirstFormDot.classList.remove('active');
        profileSetupSecondFormDot.classList.add('active');
    });


}

async function profileSetupSave() {
    var pinCode = document.getElementById("pinCode").value;
    console.log(pinCode);
    var city;
    var state;
    var district;
    var dob = new Date(document.getElementById("dob").value);
    $.getJSON("https://api.postalpincode.in/pincode/" + pinCode, async function (data) {
        console.log(data);
        console.log(data[0].Message);
        if (data[0].Message === "No records found") {
            document.getElementById("errorMessage").style.display = "block";

            setTimeout(function () {
                document.getElementById("errorMessage").style.display = "none";

            }, 5000);

        } else {
            district = data[0].PostOffice[0].District;
            city = data[0].PostOffice[0].Block;
            state = data[0].PostOffice[0].State;
            country = data[0].PostOffice[0].Country;
            // console.log('district ', district);
            // console.log('block ', data[0].PostOffice[0].Block);
            // console.log('Region ', data[0].PostOffice[0].Region);

            // //console.log('city);
            // console.log('state ', state);

            //            SaveDetails_section2(pinCode, state, city, district, country, dob);
            var para = {};
            para = {
                userID: loggedinUser.uid,
                Pincode: pinCode,
                State: state,
                City: city,
                District: district,
                Country: country,
                DateOfBirth: dob,
            };
            console.log(para);

            const ret = await functions.httpsCallable("saveProfileDetailsStep3");
            ret(para).then(result => {
                console.log("From Function " + result.data);
                window.location.href = "/login/participantDashboard.html";

            });


        }

    })


}



// function SaveDetails_section1() {
//     console.log("SaveDetails_section1");
//     var male = document.getElementById('regParticipantMale');
//     var female = document.getElementById('regParticipantFemale');
//     var genderSelected = '';
//     if (male.checked) {
//         genderSelected = male.value;
//     }
//     else if (female.checked) {
//         genderSelected = female.value;
//     }

//     var para = {};
//     para = {
//         userID: loggedinUser.uid,
//         UserName: document.getElementById('userName').value,
//         Email: document.getElementById('userEmail').value,
//         Gender: genderSelected,
//     };
//     console.log(para);

//     // const ret = firebase.functions().httpsCallable("saveProfileDetailsStep1");
//     const ret = functions.httpsCallable("saveProfileDetailsStep1");
//     ret(para).then(result => {
//         console.log("From Function " + result.data);
//     });

// }

// function SaveDetails_section2(pincode, State, city, district, country, DateOfBirth) {
//     console.log("SaveDetails_section2");

//     var para = {};
//     para = {
//         userID: loggedinUser.uid,
//         Pincode: pincode,
//         State: State,
//         City: city,
//         District: district,
//         Country: country,
//         DateOfBirth: DateOfBirth,
//     };
//     console.log(para);

//     const ret = functions.httpsCallable("saveProfileDetailsStep3");
//     ret(para).then(result => {
//         console.log("From Function " + result.data);
//     });

// }
