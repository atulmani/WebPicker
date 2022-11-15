var loggedinUser = "";
var district = "";
var city = "";
var state = "";
var country = "";
let eventDocUrl = new URL(location.href);
let searchParams = new URLSearchParams(eventDocUrl.search);
var playerID = searchParams.get('id');
var CategoryDetails = [];

auth.onAuthStateChanged(firebaseUser => {
    try {
        if (firebaseUser) {
            loggedinUser = firebaseUser;
            console.log('Logged-in user phone number: ' + loggedinUser.phoneNumber);
            userID = firebaseUser.uid;
            getEventDetails();
            getProfileDetails();
        } else {
            loggedinUser = null;
            console.log('User has been logged out');
            window.location.href = "/login/indexReg.html";
        }
    } catch (error) {
        console.log(error.message);
        window.location.href = "/login/index.html";
    }
});
function getPlayerDetails() {
    var para1 = {};
    para1 = {
        playerID: playerID
    };
    const ret1 = functions.httpsCallable("getPlayerDetails");
    ret1(para1).then((result) => {
        document.getElementById("hfPlayerID").value = result.data.id;
        document.getElementById("playerName").innerHTML = result.data.UserName;
        document.getElementById("playerGender").classList.remove("male");
        var playerGender = result.data.Gender.toUpperCase();
        if (playerGender === 'MALE') {
            document.getElementById("playerGender").classList.add("male");
            document.getElementById("playerGender").classList.remove("female");
        } else {
            document.getElementById("playerGender").classList.add("female");
            document.getElementById("playerGender").classList.remove("male");
        }
        document.getElementById("playerGender").innerHTML = result.data.Gender;
        console.log(CategoryDetails);

        var options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        };
        var dob = new Date(result.data.DateOfBirth._seconds * 1000);
        //dob = dob.toLocaleDateString("en-US", options);
        var flagGender = false;
        var flagDate = false;
        for (index = 0; index < CategoryDetails.length; index++) {
            // if (CategoryDetails[index].)
            flagGender = false;
            flagDate = false;
            var catGender = CategoryDetails[index].Gender.toUpperCase();
            if (catGender === playerGender) {
                flagGender = true;
            } else if (catGender === 'MIXED') {
                flagGender = true;
            }
            if (flagGender === true) {
                var refDate = new Date(CategoryDetails[index].ReferenceDate._seconds * 1000);
                if (CategoryDetails[index].DateRefType === 'Before' && dob <= refDate) {
                    flagDate = true;
                } else if (CategoryDetails[index].DateRefType === 'After' && dob >= refDate) {
                    flagDate = true;
                }
                if (flagDate === true) {
                    console.log("Render Category", CategoryDetails[index].CategoryName);
                    rederCategory(CategoryDetails[index], index);
                }
            }
        }

    });
}

function rederCategory(CategoryDetails, index) {

}
function getProfileDetails() {
    var userRole;
    var userProfile = JSON.parse(localStorage.getItem("userProfile"));

    if (userProfile != undefined && userProfile != "" && userProfile != null) {
        console.log(userProfile.id);
        userRole = userProfile;
        if (userProfile.id != "0") {
            console.log("before getAllParticipants");

        }
    } else {

        console.log('2 : ', loggedinUser.uid);
        var para1 = {};
        para1 = {
            userID: loggedinUser.uid
        };
        // const ret1 = firebase.functions().httpsCallable("getProfileDetails");
        const ret1 = functions.httpsCallable("getProfileDetails");
        ret1(para1).then((result) => {
            var record1 = result.data;
            console.log(result.data.id);
            userRole = {
                id: result.data.id,
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
            localStorage.setItem("userProfile", JSON.stringify(userRole));

            console.log(userRole);
            //          populateUserDetails(userRole);
            /*
            document.getElementById("hfUserID").value = userRole.id;
            document.getElementById("hfEmail").value = userRole.Email;
            document.getElementById("hfPhone").value = userRole.Phone;

            document.getElementById("userEmail").innerHTML = userRole.Email;
            document.getElementById("userContact").innerHTML = userRole.Phone;
            var gender = userRole.Gender;
            var userGender = document.getElementById("userGender");
            userGender.classList.remove("male");
            userGender.classList.remove("female");
            if (gender.toUpperCase() === 'MALE') {
                userGender.classList.add("male");
                userGender.innerHTML = "Male";
            } else {
                userGender.classList.add("female");
                userGender.innerHTML = "Female";
            }
            if (userRole.City != undefined && userRole.City != null && userRole.State != undefined && userRole.State != null) {
                document.getElementById("userLocation").innerHTML = userRole.City + ", " + userRole.State;
            } else if (userRole.City != undefined && userRole.City != null) {
                document.getElementById("userLocation").innerHTML = userRole.City;
            } else if (userRole.State != undefined && userRole.State != null) {
                document.getElementById("userLocation").innerHTML = userRole.State;
            } else {
                document.getElementById("userLocation").innerHTML = "";
            }
            console.log("before getAllParticipants");
            getAllParticipants();
            */
        });
    }

}


function getEventDetails() {
    var eventID = localStorage.getItem("EventID");

    var para1 = {};
    para1 = {
        EventID: eventID,
    };
    // const ret1 = firebase.functions().httpsCallable("getProfileDetails");
    const ret1 = functions.httpsCallable("getEventDetails");
    ret1(para1).then((result) => {
        var record1 = result.data;
        console.log(result.data.id);
        document.getElementById("EventName").innerHTML = result.data.EventName;
        document.getElementById("EventName1").innerHTML = result.data.EventName;
        // document.getElementById("eventName2").innerHTML = result.data.EventName;
        CategoryDetails = result.data.CategoryDetails;

        document.getElementById("organiserName").innerHTML = result.data.EventOwnerName;
        //        document.getElementById("organiserName1").innerHTML = result.data.EventOwnerName;

        var startDate;
        var endDate;
        var options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        };
        startDate = new Date(result.data.EventStartDate._seconds * 1000);
        startDate = startDate.toLocaleDateString("en-US", options);

        endDate = new Date(result.data.EventEndDate._seconds * 1000);
        endDate = endDate.toLocaleDateString("en-US", options);

        document.getElementById("eventDate").innerHTML = startDate + "-" + endDate;
        document.getElementById("eventstartdate").innerHTML = startDate;
        document.getElementById("eventenddate").innerHTML = endDate;


        var curFormat = {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        };

        document.getElementById("eventFees").innerHTML = result.data.MinimumFee.toLocaleString('en-IN', curFormat);

        document.getElementById("organizationName").innerHTML = result.data.EventOwnerName;

        document.getElementById("City").innerHTML = result.data.City;
        document.getElementById("eventStartDate").innerHTML = startDate;
        document.getElementById("entryFees1").innerHTML = result.data.MinimumFee.toLocaleString('en-IN', curFormat);
        document.getElementById("eventprice").innerHTML = result.data.MinimumFee.toLocaleString('en-IN', curFormat);

        document.getElementById("eventVenue").innerHTML = result.data.EventVenue;

        var varCategoryName = "";
        if (result.data.CategoryDetails != null && result.data.CategoryDetails != undefined) {
            for (i = 0; i < result.data.CategoryDetails.length; i++) {
                varCategoryName = varCategoryName + result.data.CategoryDetails[i].CategoryName + ",";
            }
        }
        document.getElementById("eventCategory").innerHTML = varCategoryName;

        var withDate = new Date(result.data.WithdrawalEndDate._seconds * 1000);
        withDate = withDate.toLocaleDateString("en-US", options);
        document.getElementById("withdrawDate").innerHTML = withDate;

        document.getElementById("eventstatus").innerHTML = result.data.EventStatus;
        document.getElementById("organiser-email").innerHTML = result.data.EventOwnerEmail;
        document.getElementById("organiser-phone").innerHTML = result.data.EventOwnerPhone;
        getPlayerDetails();

    });
}
