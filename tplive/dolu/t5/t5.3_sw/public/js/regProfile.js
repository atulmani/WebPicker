var loggedinUser = "";
var district = "";
var city = "";
var state = "";
var country = "";

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
        //  window.location.href = "/login/index.html";
    }
});

function getProfileDetails() {
    var userRole;
    var userProfile = JSON.parse(localStorage.getItem("userProfile"));

    if (userProfile != undefined && userProfile != "" && userProfile != null) {
        console.log(userProfile.id);
        userRole = userProfile;
        if (userProfile.id != "0") {
            console.log("before getAllParticipants");
            //getAllParticipants();
            populateUserDetails(userProfile);

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
            console.log(result.data.pID);
            userRole = {
                id: result.data.pID,
                Address: result.data.Address,
                AlternatePhone: result.data.AlternatePhone,
                City: result.data.City,
                PlayerID: result.data.PlayerID,
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
            populateUserDetails(userRole);
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
        console.log(result.data);
        document.getElementById("EventName").innerHTML = result.data.EventName;
        document.getElementById("EventName1").innerHTML = result.data.EventName;
        document.getElementById("eventName2").innerHTML = result.data.EventName;


        document.getElementById("OrganiserName").innerHTML = result.data.EventOwnerName;
        document.getElementById("organiserName1").innerHTML = result.data.EventOwnerName;

        var startDate;
        var endDate;
        var options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        };
        startDate = new Date(result.data.EventStartDate._seconds * 1000);
        startDate = startDate.toLocaleDateString("en-US", options);
        if (result.data.EventEndDate != undefined && result.data.EventEndDate != null) {
            endDate = new Date(result.data.EventEndDate._seconds * 1000);
            endDate = endDate.toLocaleDateString("en-US", options);

        }

        document.getElementById("eventDate").innerHTML = startDate + "-" + endDate;
        document.getElementById("eventstartdate1").innerHTML = startDate;
        document.getElementById("eventenddate1").innerHTML = endDate;


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
        var withDate = "";
        if (result.data.WithdrawalEndDate != undefined && result.data.WithdrawalEndDate != null) {
            withDate = new Date(result.data.WithdrawalEndDate._seconds * 1000);
            withDate = withDate.toLocaleDateString("en-US", options);

        }
        document.getElementById("withdrawDate").innerHTML = withDate;

        document.getElementById("eventstatus").innerHTML = result.data.EventStatus;
        document.getElementById("organiser-email").innerHTML = result.data.EventOwnerEmail;
        document.getElementById("organiser-phone").innerHTML = result.data.EventOwnerPhone;

    });
}
function populateUserDetails(userRole) {
    document.getElementById("hfUserID").value = userRole.id;
    document.getElementById("hfEmail").value = userRole.Email;
    document.getElementById("hfPhone").value = userRole.Phone;
    document.getElementById("hfPlayerID").value = userRole.PlayerID;


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
}

function regProfileToThirdSlide() {
    var pinCode = document.getElementById("pinCode").value;
    console.log(pinCode);
    //var dob = new Date(document.getElementById("dob").value);
    $.getJSON("https://api.postalpincode.in/pincode/" + pinCode, async function (data) {
        console.log(data);
        console.log(data[0].Message);
        if (data[0].Message === "No records found") {
            document.getElementById("errorMessage").style.display = "block";

            setTimeout(function () {
                document.getElementById("errorMessage").style.display = "none";

            }, 5000);
        }
        else {
            district = data[0].PostOffice[0].District;
            city = data[0].PostOffice[0].Block;
            state = data[0].PostOffice[0].State;
            country = data[0].PostOffice[0].Country;

            var regProfileFirstSlide = document.getElementById('regProfileFirstSlide');
            var regProfileSecondSlide = document.getElementById('regProfileSecondSlide');
            var regProfileThirdSlide = document.getElementById('regProfileThirdSlide');

            regProfileFirstSlide.style.transform = 'translateX(-200%)';
            regProfileSecondSlide.style.transform = 'translateX(-200%)';
            regProfileThirdSlide.style.transform = 'translateX(-200%)';

            document.getElementById('firstFormDot').classList.remove('active');
            document.getElementById('SecondFormDot').classList.add('active');
        }
    });
}

function getAllParticipants() {
    console.log('from getAllParticipants : ', loggedinUser.uid);
    var para1 = {};
    para1 = {
        userID: loggedinUser.uid
    };
    var userParticipant = [];
    var participant;
    console.log('para1', para1);
    const ret1 = functions.httpsCallable("getRegisteredParticant");
    ret1(para1).then((result) => {
        var record1 = result.data;
        console.log(record1.length);
        addParticipantTab();
        for (i = 0; i < record1.length; i++) {
            participant = {
                id: record1[i].id,
                City: record1[i].City,
                Country: record1[i].Country,
                DateOfBirth: record1[i].DateOfBirth,
                District: record1[i].District,
                Email: record1[i].Email,
                Gender: record1[i].Gender,
                ParticipantID: record1[i].ParticipantID,
                Phone: record1[i].Phone,
                Pincode: record1[i].Pincode,
                State: record1[i].State,
                UserName: record1[i].UserName,
                UserID: record1[i].UserID,
                PlayerID: record1[i].PlayerID,
            };
            userParticipant.push(participant);
            RenderPartcipant(participant, i);
        }
        console.log(userParticipant);

    });

}
function addParticipantTab() {
    document.getElementById("divParticipant").innerHTML = "";
    var div1 = document.createElement("div");
    div1.setAttribute("class", "col-lg-4 col-md-6 col-sm-12");
    div1.setAttribute("style", "padding: 0;");

    var div2 = document.createElement("div");
    div2.setAttribute("style", "padding: 10px;");

    var div3 = document.createElement("div");
    div3.setAttribute("class", "event-registration-participant-card add-paticipant-card");
    div3.setAttribute("onclick", "regProfileToSecondSlide();");

    var span1 = document.createElement("span");
    span1.setAttribute("class", "material-symbols-outlined");
    span1.innerHTML = "add";

    div3.appendChild(span1);

    var h11 = document.createElement("h1");
    h11.innerHTML = "ADD NEW";
    div3.appendChild(h11);
    div2.appendChild(div3);
    div1.appendChild(div2);
    document.getElementById("divParticipant").appendChild(div1);

}
function RenderPartcipant(participant, index) {

    var div1 = document.createElement("div");
    div1.setAttribute("class", "col-lg-4 col-md-6 col-sm-12");
    div1.setAttribute("style", "padding: 0;");

    var div2 = document.createElement("div");
    div2.setAttribute("style", "padding: 10px;");

    var div3 = document.createElement("div");
    div3.setAttribute("class", "event-registration-participant-card");
    div3.setAttribute("onclick", "moveToRegCategory(" + index + ");");

    var div4 = document.createElement("div");
    div4.setAttribute("class", "participant-name-div");

    var div5 = document.createElement("div");

    var span1 = document.createElement("span");
    if (participant.Gender.toUpperCase() === 'MALE') {
        span1.setAttribute("class", "material-symbols-outlined male");
        span1.innerHTML = "man";
    } else {
        span1.setAttribute("class", "material-symbols-outlined female");
        span1.innerHTML = "woman";
    }

    var hfid = document.createElement("input");
    hfid.setAttribute("type", "hidden");
    hfid.setAttribute("id", "hfID" + index);
    hfid.setAttribute("value", participant.id);
    div5.appendChild(hfid);


    var hfPid = document.createElement("input");
    hfPid.setAttribute("type", "hidden");
    hfPid.setAttribute("id", "hfPlayerID" + index);
    hfPid.setAttribute("value", participant.PlayerID);
    div5.appendChild(hfPid);

    div5.appendChild(span1);
    div4.appendChild(div5);
    console.log(participant);
    var div6 = document.createElement("div");
    div4.setAttribute("class", "participant-name-div");
    var h11 = document.createElement("h1");
    h11.innerHTML = participant.UserName + "(" + participant.PlayerID + ")";
    div6.appendChild(h11);

    if (participant.DateOfBirth != null) {
        var dob = new Date(participant.DateOfBirth._seconds * 1000);
        var options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        };

        dob = dob.toLocaleDateString("en-US", options);
        var ageDifMs = Date.now() - new Date(dob);
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        var iYears = Math.abs(ageDate.getUTCFullYear() - 1970);
        console.log(iYears);
        var h21 = document.createElement("h2");
        h21.innerHTML = dob + " - " + iYears + " Years";
        div6.appendChild(h21);

    }
    var anchor = document.createElement("a");

    anchor.setAttribute("class", "participant-edit-text");
    anchor.setAttribute("href", "regCategory.html");
    anchor.innerHTML = "Booking Details";
    div6.appendChild(anchor);
    div4.appendChild(div6);
    div3.appendChild(div4);

    var div7 = document.createElement("div");
    div7.setAttribute("class", "participant-card-arrow");

    var span2 = document.createElement("span");
    span2.setAttribute("class", "material-symbols-outlined");
    span2.innerHTML = "chevron_right";
    div7.appendChild(span2);
    div3.appendChild(div7);
    div2.appendChild(div3);
    div1.appendChild(div2);
    document.getElementById("divParticipant").appendChild(div1);

}

function regProfileToSecondSlide() {
    var regProfileFirstSlide = document.getElementById('regProfileFirstSlide');
    var regProfileSecondSlide = document.getElementById('regProfileSecondSlide');
    var regProfileThirdSlide = document.getElementById('regProfileThirdSlide');

    regProfileFirstSlide.style.transform = 'translateX(-100%)';
    regProfileSecondSlide.style.transform = 'translateX(-100%)';
    regProfileThirdSlide.style.transform = 'translateX(-100%)';

    document.getElementById('firstFormDot').classList.add('active');
    document.getElementById('SecondFormDot').classList.remove('active');
}

function regProfileToFirstSlide() {
    updateParticipant();
    var regProfileFirstSlide = document.getElementById('regProfileFirstSlide');
    var regProfileSecondSlide = document.getElementById('regProfileSecondSlide');
    var regProfileThirdSlide = document.getElementById('regProfileThirdSlide');

    regProfileFirstSlide.style.transform = 'translateX(0%)';
    regProfileSecondSlide.style.transform = 'translateX(0%)';
    regProfileThirdSlide.style.transform = 'translateX(0%)';
}

function moveToRegCategory(index) {
    console.log(document.getElementById("hfID" + index));
    var playerid = document.getElementById("hfID" + index).value;
    window.location.href = "regCategory.html?id=" + playerid;
}


function updateParticipant() {
    //Save details in DB (Gender , Pin)

    /////////////////////

    var pinCode = document.getElementById("pinCode").value;
    console.log(pinCode);
    //var dob = new Date(document.getElementById("dob").value);
    var gender = "";
    if (document.getElementById("regParticipantMale").checked) {
        gender = "Male";
    } else if (document.getElementById("regParticipantFemale").checked) {
        gender = "Female";
    }

    var Email = document.getElementById("hfEmail").value;
    var Phone = document.getElementById("hfPhone").value;

    // var para = {};
    // para = {

    // };
    // console.log(para);

    // const ret = await functions.httpsCallable("createParticipants");
    // ret(para).then(result => {
    //     console.log("From Function " + result.data);
    //     console.log("From Function " + result.data.ParticipantID);
    // });


    ////////////////////////



    var userName = document.getElementById("tbUserName").value;
    var dob = document.getElementById("dobParticipant").value;
    var ParticipantAddress = document.getElementById("tbParticipantAddress").value;
    var selsize = document.getElementById("selSize");
    var size = selsize.options[selsize.selectedIndex].text;
    var identity = document.getElementById("tbIdentity").value;
    var companyName = document.getElementById("tbCompanyName").value;
    var HRContant = document.getElementById("tbHRContant").value;
    var CompanyAddress = document.getElementById("tbCompanyAddress").value;

    var selGrade = document.getElementById("selGrade");
    var grade = selGrade.options[selGrade.selectedIndex].text
    var SchoolAddress = document.getElementById("tbSchoolAddress").value;
    var CollageName = document.getElementById("tbCollageName").value;
    var PlayerID = document.getElementById("hfPlayerID").value;

    var para = {};
    para = {
        userID: loggedinUser.uid,
        PinCode: pinCode,
        State: state,
        City: city,
        District: district,
        Country: country,
        Gender: gender,
        PlayerID: PlayerID,
        Email: Email,
        Phone: Phone,
        UserName: userName,
        DOB: dob,
        ParticipantAddress: ParticipantAddress,
        Size: size,
        Identity: identity,
        CompanyName: companyName,
        HRContant: HRContant,
        CompanyAddress: CompanyAddress,
        CollageName: CollageName,
        Grade: grade,
        SchoolAddress: SchoolAddress,
    };
    console.log(para);

    const ret = functions.httpsCallable("updateParticipants");
    ret(para).then(result => {
        console.log("From Function " + result.data);
        console.log("From Function " + result.data.ParticipantID);
        document.getElementById("hfParticipantID").value = result.data.ParticipantID;
        getAllParticipants();
    });

}