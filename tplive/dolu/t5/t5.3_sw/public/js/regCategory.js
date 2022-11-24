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
    console.log('in getPlayerDetails')
    var para1 = {};
    para1 = {
        playerID: playerID
    };
    const ret1 = functions.httpsCallable("getPlayerDetails");
    ret1(para1).then((result) => {
        document.getElementById("hfPlayerDocID").value = result.data.id;
        document.getElementById("hfPlayerID").value = result.data.PlayerID;

        console.log(document.getElementById("playerName").innerHTML);
        console.log(result.data.UserName);
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
                        rederCategory(CategoryDetails[index], index);
                    }
                }
            }
        }


    });
}

function rederCategory(CategoryDetails, index) {
    console.log(CategoryDetails);
    var div1 = document.createElement("div");
    div1.setAttribute("class", "col-lg-4 col-md-6 col-sm-12");
    div1.setAttribute("style", "padding: 0;");

    var div2 = document.createElement("div");
    div2.setAttribute("style", "padding: 10px;");

    var div3 = document.createElement("div");
    div3.setAttribute("class", "reg-category-card");
    div3.setAttribute("id", "regCategory" + index);

    var div4 = document.createElement("div");
    div4.setAttribute("class", "display-flex-div");
    div4.setAttribute("onclick", "openPartnerSelection(gdDoublesDiv); selectCategory(regCategory" + index + ", regCategoryPrice" + index + ");");

    var div5 = document.createElement("div");
    div5.setAttribute("class", "category-details");

    var h11 = document.createElement("h1");
    h11.innerHTML = CategoryDetails.CategoryName;

    div5.appendChild(h11);

    var div6 = document.createElement("div");
    div6.setAttribute("class", "category-icons");

    if (CategoryDetails.EventType === 'Single') {
        var span1 = document.createElement("span");
        if (CategoryDetails.Gender === 'Female') {
            span1.setAttribute("class", "material-symbols-outlined female");
            span1.innerHTML = "woman";
        } else {
            span1.setAttribute("class", "material-symbols-outlined male");
            span1.innerHTML = "man";
        }
        div6.appendChild(span1);

    } else if (CategoryDetails.EventType === 'Double') {
        if (CategoryDetails.Gender === 'Female') {
            var span1 = document.createElement("span");
            span1.setAttribute("class", "material-symbols-outlined female");
            span1.innerHTML = "woman";
            div6.appendChild(span1);

            var span2 = document.createElement("span");
            span2.setAttribute("class", "material-symbols-outlined female");
            span2.innerHTML = "woman";
            div6.appendChild(span2);
        } else if (CategoryDetails.Gender === 'Male') {
            var span1 = document.createElement("span");
            span1.setAttribute("class", "material-symbols-outlined male");
            span1.innerHTML = "man";
            div6.appendChild(span1);

            var span2 = document.createElement("span");
            span2.setAttribute("class", "material-symbols-outlined male");
            span2.innerHTML = "man";
            div6.appendChild(span2);
        } else if (CategoryDetails.Gender === 'Mixed') {
            var span1 = document.createElement("span");
            span1.setAttribute("class", "material-symbols-outlined male");
            span1.innerHTML = "man";
            div6.appendChild(span1);

            var span2 = document.createElement("span");
            span2.setAttribute("class", "material-symbols-outlined female");
            span2.innerHTML = "woman";
            div6.appendChild(span2);
        }
    } else if (CategoryDetails.EventType === 'Team') {
        if (CategoryDetails.Gender === 'Female') {
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

        } else if (CategoryDetails.Gender === 'Male') {
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

        } else if (CategoryDetails.Gender === 'Mixed') {
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

    div5.appendChild(div6);
    var h31 = document.createElement("h3");
    var str1 = document.createElement("strong");
    str1.innerHTML = "Partner : ";
    h31.appendChild(str1);
    h31.innerHTML = h31.innerHTML + "Partner Name";
    div5.appendChild(h31);
    div4.appendChild(div5);

    var div7 = document.createElement("div");
    div7.setAttribute("class", "category-fees");

    var h2fee = document.createElement("h2");
    h2fee.setAttribute("id", "regCategoryPrice" + index);
    var curFormat = {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    };
    h2fee.innerHTML = CategoryDetails.Fees.toLocaleString('en-IN', curFormat);
    div7.appendChild(h2fee);

    div4.appendChild(div7);
    div3.appendChild(div4);

    var div8 = document.createElement("div");
    div8.setAttribute("class", "category-doubles-partner-div");
    div8.setAttribute("id", "gdDoublesDiv" + index);

    var hr = document.createElement("hr");
    hr.setAttribute("style", "margin: 0;");

    div8.appendChild(hr);

    var div9 = document.createElement("div");
    div9.setAttribute("style", "position: relative;padding: 0 10px;");

    var div10 = document.createElement("div");
    div10.setAttribute("class", "reg-participant-form-field");

    var input1 = document.createElement("input");
    input1.setAttribute("type", "text");
    input1.setAttribute("id", "idpartner" + index);
    input1.setAttribute("required", "true");

    div10.appendChild(input1);

    var span2 = document.createElement("span");
    span2.innerHTML = "Number Or Name";
    div10.appendChild(span2);

    div9.appendChild(div10);
    div8.appendChild(div9);

    /*
    <div style="position: relative;padding: 0 10px;">--div9
                                                
                                                <div class="partner-intelicence">--div11
                                                    <a href="">Kanika Kanwal - 6734265901</a>
                                                    <a href="">Ananya Gadgil - 6734265901</a>
                                                    <a href="">Purvi Baavikate - 6734265901</a>
                                                    <a href="">Tamanna Raturi - 6734265901</a>
                                                    <a href="">Akarshi Kashyap - 6734265901</a>
                                                    <a href="">Pusarla Venkata Sindhu - 6734265901</a>
                                                    <a href="">Malvika Bansod - 6734265901</a>
                                                    <a href="">Saad Darmadhikari - 6734265901</a>
                                                </div>
                                                <div class="cancel-partner"
                                                    onclick="closePartnerSelection(gdDoublesDiv); selectCategory(regCategoryGD17, regCategoryGD17Price);">--div12
                                                    <a href="#">Cancel</a>
                                                </div>
                                            </div>
    
    */
    div3.appendChild(div8);

    var div13 = document.createElement("div");
    div13.setAttribute("class", "select-category-div active");

    var span13 = document.createElement("span");
    span13.setAttribute("class", "material-symbols-outlined");
    span13.innerHTML = "done";
    div13.appendChild(span13);

    div3.appendChild(div13);
    div2.appendChild(div3);
    div1.appendChild(div2);
    document.getElementById("categoryDiv").appendChild(div1);
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

function GetAllParticipants() {

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

        document.getElementById("eventstatus").innerHTML = result.data.EventStatus;
        document.getElementById("organiser-email").innerHTML = result.data.EventOwnerEmail;
        document.getElementById("organiser-phone").innerHTML = result.data.EventOwnerPhone;
        getPlayerDetails();

    });
}


function closePartnerSelection(doubleDiv) {
    doubleDiv.classList.remove('show');
    doubleDiv.style.overflow = 'hidden';
}

function moveToRegCategory() {
    window.location.href = "regCategory.html";
}
function openPartnerSelection(doubleDiv) {

    if (doubleDiv.classList.contains('show')) {
        doubleDiv.classList.remove('show');
        doubleDiv.style.overflow = 'hidden';
    } else {
        doubleDiv.classList.add('show');

        setTimeout(() => {
            doubleDiv.style.overflow = 'visible';
        }, 1000)
    }
}
function selectCategory(category, entryFees) {
    category.classList.toggle('active');

    var feesInNumber = entryFees.innerHTML;

    var totalPrice = document.getElementById('totalPrice');
    var noOfCategories = document.getElementById('noOfCategories');

    var totalPriceInNumber = Number(totalPrice.innerHTML);
    var totalNoOfCategories = Number(noOfCategories.innerHTML);
    feesInNumber = feesInNumber.replace("₹", "").replace(" ", "").replaceAll(",", "");
    if (category.classList.contains('active')) {
        totalPrice.innerHTML = totalPriceInNumber + Number(feesInNumber);
        noOfCategories.innerHTML = totalNoOfCategories + 1;
    } else {
        totalPrice.innerHTML = totalPriceInNumber - Number(feesInNumber);
        noOfCategories.innerHTML = totalNoOfCategories - 1;
    }

    var checkOutDiv = document.getElementById('checkOutDiv');
    console.log(totalPriceInNumber);

    totalPriceInNumber = Number(totalPrice.innerHTML);

    if (totalPriceInNumber <= 0) {
        checkOutDiv.style.opacity = '0';
        checkOutDiv.style.pointerEvents = 'none';
        console.log('Inside else');
    } else {
        checkOutDiv.style.opacity = '1';
        checkOutDiv.style.pointerEvents = 'all';
        console.log('Inside <=0');
    }

}
function regProfileToThirdSlide() {
    var regProfileFirstSlide = document.getElementById('regProfileFirstSlide');
    var regProfileSecondSlide = document.getElementById('regProfileSecondSlide');
    var regProfileThirdSlide = document.getElementById('regProfileThirdSlide');

    regProfileFirstSlide.style.transform = 'translateX(-200%)';
    regProfileSecondSlide.style.transform = 'translateX(-200%)';
    regProfileThirdSlide.style.transform = 'translateX(-200%)';

    document.getElementById('firstFormDot').classList.remove('active');
    document.getElementById('SecondFormDot').classList.add('active');
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
    var regProfileFirstSlide = document.getElementById('regProfileFirstSlide');
    var regProfileSecondSlide = document.getElementById('regProfileSecondSlide');
    var regProfileThirdSlide = document.getElementById('regProfileThirdSlide');

    regProfileFirstSlide.style.transform = 'translateX(0%)';
    regProfileSecondSlide.style.transform = 'translateX(0%)';
    regProfileThirdSlide.style.transform = 'translateX(0%)';
}

