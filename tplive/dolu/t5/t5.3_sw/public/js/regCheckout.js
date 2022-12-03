var loggedinUser = "";
var district = "";
var city = "";
var state = "";
var country = "";
let eventDocUrl = new URL(location.href);
let searchParams = new URLSearchParams(eventDocUrl.search);
var playerID = searchParams.get('id');
var CategoryDetails = [];
var RegisteredEvents = [];
var eventID = "";
var catCnt = 0;
var totalAmount = 0;
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
        //window.location.href = "/login/index.html";
    }
});
function getEventDetails() {
    eventID = localStorage.getItem("EventID");
    document.getElementById("hfEventID").value = eventID;

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
        // 
        CategoryDetails = result.data.CategoryDetails;

        document.getElementById("organiserName").innerHTML = result.data.EventOwnerName;
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
        var withDate = "";
        if (result.data.WithdrawalEndDate != undefined && result.data.WithdrawalEndDate != null) {
            withDate = new Date(result.data.WithdrawalEndDate._seconds * 1000);
            withDate = withDate.toLocaleDateString("en-US", options);

        }
        document.getElementById("withdrawDate").innerHTML = withDate;
        if (result.data.ConvenienceCharge === null || result.data.ConvenienceCharge === undefined || result.data.ConvenienceCharge === 0) {
            document.getElementById("convenience-fee").style.display = "none";
        } else {
            document.getElementById("convenience-fee").style.display = "block";
            document.getElementById("hfConvenienceRate").value = result.data.ConvenienceCharge;
            document.getElementById("ConvenienceRate").innerHTML = result.data.ConvenienceCharge + "%";
        }
        document.getElementById("eventstatus").innerHTML = result.data.EventStatus;
        document.getElementById("organiser-email").innerHTML = result.data.EventOwnerEmail;
        document.getElementById("organiser-phone").innerHTML = result.data.EventOwnerPhone;
        getPlayerDetails();

    });
}
function getPlayerDetails() {
    console.log('in getPlayerDetails')
    var para1 = {};
    playerID = localStorage.getItem("TPPlayerID");
    document.getElementById("playerID").innerHTML = playerID;
    document.getElementById("hfPlayerID").value = playerID;
    para1 = {
        playerID: playerID
    };
    console.log(para1);
    const ret1 = functions.httpsCallable("getPlayerDetails");
    ret1(para1).then((result) => {
        document.getElementById("hfPlayerDocID").value = result.data.pID;
        document.getElementById("hfPlayerID").value = result.data.PlayerID;

        console.log(document.getElementById("playerName").innerHTML);
        console.log(result.data.UserName);
        document.getElementById("playerName").innerHTML = result.data.UserName;
        document.getElementById("playerID").innerHTML = result.data.PlayerID;
        //document.getElementById("playerGender").classList.remove("male");
        document.getElementById("hfGender").value = result.data.Gender;
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
        var catCount = 0;
        if (CategoryDetails != undefined && CategoryDetails != null) {
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
                        //                       renderCategory(CategoryDetails[index], catCount);
                        catCount = catCount + 1;
                    }
                }
            }
            document.getElementById("hfcatCount").value = catCount;

        }
        //getRegisteredEvent
        getRegisteredEvents();
    });
}
function getRegisteredEvents() {
    var playerID = document.getElementById("playerID").innerHTML;
    var para1 = {};
    para1 = {
        PlayerID: playerID,
        EventID: eventID,
    };
    const ret1 = functions.httpsCallable("getAllRegisteredEventList");
    ret1(para1).then((result) => {
        RegisteredEvents = result.data;
        console.log(RegisteredEvents);
        for (index = 0; index < RegisteredEvents.length; index++) {
            if (RegisteredEvents[index].RegType === 'Self' && RegisteredEvents[index].PaymentStatus === 'Pending') {
                totalAmount = totalAmount + Number(RegisteredEvents[index].Fees);
            }
            RenderRegisteredEvent(RegisteredEvents[index], index);

        }
        catCnt = RegisteredEvents.length;
        document.getElementById("noOfCategories").innerHTML = catCnt;
        if (document.getElementById("hfConvenienceRate").value != "") {
            var newTotal = Math.round(totalAmount * Number(document.getElementById("hfConvenienceRate").value) / 100);
            document.getElementById("totalPrice").innerHTML = totalAmount + newTotal;

            var curFormat = {
                style: 'currency',
                currency: 'INR',
                minimumFractionDigits: 0,
                maximumFractionDigits: 2
            };


            document.getElementById("ConvinienceCharge").innerHTML = newTotal.toLocaleString('en-IN', curFormat);;
        } else {
            document.getElementById("totalPrice").innerHTML = totalAmount;

        }


    });

}
function RenderRegisteredEvent(RegEvent, index) {

    var div1 = document.createElement("div");
    div1.setAttribute("class", "col-lg-12 col-md-12 col-sm-12");
    div1.setAttribute("style", "padding: 0;");

    var div2 = document.createElement("div");
    div2.setAttribute("style", "padding: 10px;");

    var div3 = document.createElement("div");
    console.log(RegEvent.PaymentStatus);
    if (RegEvent.PaymentStatus === 'Pending') {
        div3.setAttribute("class", "reg-category-card active payment-pending");
    } else {
        div3.setAttribute("class", "reg-category-card active payment-completed");
    }

    var div4 = document.createElement("div");
    div4.setAttribute("class", "display-flex-div");
    var div5 = document.createElement("div");
    div5.setAttribute("class", "category-details");

    var h11 = document.createElement("h1");
    h11.setAttribute("id", "categoryName" + index);
    h11.innerHTML = RegEvent.CategoryName;
    div5.appendChild(h11);
    var div6 = document.createElement("div");
    div6.setAttribute("class", "category-icons");
    if (RegEvent.EventType.toUpperCase() === 'SINGLE') {
        var span1 = document.createElement("span");
        if (RegEvent.Gender.toUpperCase() === 'FEMALE') {
            span1.setAttribute("class", "material-symbols-outlined female");
            span1.innerHTML = "woman";
        } else {
            span1.setAttribute("class", "material-symbols-outlined male");
            span1.innerHTML = "man";
        }
        div6.appendChild(span1);

    } else if (RegEvent.EventType.toUpperCase() === 'DOUBLE') {
        if (RegEvent.Gender.toUpperCase() === 'FEMALE') {
            console.log("Female double ");
            var span1 = document.createElement("span");
            span1.setAttribute("class", "material-symbols-outlined female");
            span1.innerHTML = "woman";
            div6.appendChild(span1);

            var span2 = document.createElement("span");
            span2.setAttribute("class", "material-symbols-outlined female");
            span2.innerHTML = "woman";
            div6.appendChild(span2);

        } else if (RegEvent.Gender.toUpperCase() === 'MALE') {
            console.log("Male double ");
            var span1 = document.createElement("span");
            span1.setAttribute("class", "material-symbols-outlined male");
            span1.innerHTML = "man";
            div6.appendChild(span1);

            var span2 = document.createElement("span");
            span2.setAttribute("class", "material-symbols-outlined male");
            span2.innerHTML = "man";
            div6.appendChild(span2);
        } else if (RegEvent.Gender.toUpperCase() === 'MIXED') {
            console.log("Mixed double ");
            var span1 = document.createElement("span");
            span1.setAttribute("class", "material-symbols-outlined male");
            span1.innerHTML = "man";
            div6.appendChild(span1);

            var span2 = document.createElement("span");
            span2.setAttribute("class", "material-symbols-outlined female");
            span2.innerHTML = "woman";
            div6.appendChild(span2);
        }
    } else if (RegEvent.EventType.toUpperCase() === 'TEAM') {
        if (RegEvent.Gender.toUpperCase() === 'FEMALE') {
            var span1 = document.createElement("span");
            span1.setAttribute("class", "material-symbols-outlined female");
            span1.innerHTML = "woman";
            div6.appendChild(span1);

            var span2 = document.createElement("span");
            span2.setAttribute("class", "material-symbols-outlined female");
            span2.innerHTML = "woman";
            div6.appendChild(span2);

            var span3 = document.createElement("span");
            span3.setAttribute("class", "material-symbols-outlined female");
            span3.innerHTML = "woman";
            div6.appendChild(span3);

            var span4 = document.createElement("span");
            span4.setAttribute("class", "material-symbols-outlined female");
            span4.innerHTML = "woman";
            div6.appendChild(span4);

            var span5 = document.createElement("span");
            span5.setAttribute("class", "material-symbols-outlined female");
            span5.innerHTML = "woman";
            div6.appendChild(span5);

            var span6 = document.createElement("span");
            span6.setAttribute("class", "material-symbols-outlined female");
            span6.innerHTML = "woman";
            div6.appendChild(span6);

        } else if (RegEvent.Gender.toUpperCase() === 'MALE') {
            var span1 = document.createElement("span");
            span1.setAttribute("class", "material-symbols-outlined male");
            span1.innerHTML = "man";
            div6.appendChild(span1);

            var span2 = document.createElement("span");
            span2.setAttribute("class", "material-symbols-outlined male");
            span2.innerHTML = "man";
            div6.appendChild(span2);

            var span3 = document.createElement("span");
            span3.setAttribute("class", "material-symbols-outlined male");
            span3.innerHTML = "man";
            div6.appendChild(span3);

            var span4 = document.createElement("span");
            span4.setAttribute("class", "material-symbols-outlined male");
            span4.innerHTML = "man";
            div6.appendChild(span4);

            var span5 = document.createElement("span");
            span5.setAttribute("class", "material-symbols-outlined male");
            span5.innerHTML = "man";
            div6.appendChild(span5);

            var span6 = document.createElement("span");
            span6.setAttribute("class", "material-symbols-outlined male");
            span6.innerHTML = "man";
            div6.appendChild(span6);

        } else if (RegEvent.Gender.toUpperCase() === 'MIXED') {
            var span1 = document.createElement("span");
            span1.setAttribute("class", "material-symbols-outlined female");
            span1.innerHTML = "woman";
            div6.appendChild(span1);

            var span2 = document.createElement("span");
            span2.setAttribute("class", "material-symbols-outlined male");
            span2.innerHTML = "man";
            div6.appendChild(span2);

            var span3 = document.createElement("span");
            span3.setAttribute("class", "material-symbols-outlined female");
            span3.innerHTML = "woman";
            div6.appendChild(span3);

            var span4 = document.createElement("span");
            span4.setAttribute("class", "material-symbols-outlined male");
            span4.innerHTML = "man";
            div6.appendChild(span4);

            var span5 = document.createElement("span");
            span5.setAttribute("class", "material-symbols-outlined female");
            span5.innerHTML = "woman";
            div6.appendChild(span5);

            var span6 = document.createElement("span");
            span6.setAttribute("class", "material-symbols-outlined male");
            span6.innerHTML = "man";
            div6.appendChild(span6);
        }

    }

    if (RegEvent.EventType.toUpperCase() === 'DOUBLE') {
        var h3P = document.createElement("h3");
        var strong1 = document.createElement("strong");
        if (RegEvent.RegType === 'Partner') {
            strong1.innerHTML = "(Registered By) Partner : ";
        } else {
            strong1.innerHTML = "Partner : ";
        }

        var spanP = document.createElement("span");
        if (RegEvent.RegType === 'Self') {
            spanP.innerHTML = RegEvent.PartnerPlayerName;
        } else {
            spanP.innerHTML = RegEvent.ParticipantName;
        }
        // strong1.appendChild(spanP);
        h3P.appendChild(strong1);
        h3P.appendChild(spanP);
        div6.appendChild(h3P);
    }
    var hfGender = document.createElement("input");
    hfGender.setAttribute("type", "hidden");
    hfGender.setAttribute("id", "catGender" + index);
    hfGender.value = CategoryDetails.Gender;
    div5.appendChild(hfGender);

    var hfEventType = document.createElement("input");
    hfEventType.setAttribute("type", "hidden");
    hfEventType.setAttribute("id", "catType" + index);
    hfEventType.value = CategoryDetails.EventType;
    div5.appendChild(hfEventType);


    div5.appendChild(div6);
    div4.appendChild(div5);
    var div7 = document.createElement("div");
    div7.setAttribute("class", "category-fees");

    var h21 = document.createElement("h2");
    h21.setAttribute("style", "position: relative;top: 5px;");

    var spanPrice = document.createElement("span");
    spanPrice.setAttribute("id", "fees" + index);
    var curFormat = {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    };
    spanPrice.innerHTML = RegEvent.Fees.toLocaleString('en-IN', curFormat);
    h21.appendChild(spanPrice);
    div7.appendChild(h21);
    div4.appendChild(div7);
    div3.appendChild(div4);

    var div8 = document.createElement("div");
    var h11PS = document.createElement("h1");
    if (RegEvent.PaymentStatus === "Pending") {
        div8.setAttribute("class", "payment-status pending");
        h11PS.innerHTML = "Payment Pending";
    } else {
        div8.setAttribute("class", "payment-status completed");
        h11PS.innerHTML = "Payment Completed";
    }
    div8.appendChild(h11PS);
    div3.appendChild(div8);
    div2.appendChild(div3);
    div1.appendChild(div2);

    document.getElementById("divRegEvent").appendChild(div1);

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
            } else if (usertmRole.State != undefined && userRole.State != null) {
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


function gotoDemo() {
    window.href.Address = "demoPayment.html"
}