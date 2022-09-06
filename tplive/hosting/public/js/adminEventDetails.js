let eventDocUrl = new URL(location.href);
let searchParams = new URLSearchParams(eventDocUrl.search);
var eventID = searchParams.get('id');
var catDetails = "";
auth.onAuthStateChanged(async firebaseUser => {
    try {
        if (firebaseUser) {
            loggedinUser = firebaseUser;
            //console.log(firebaseUser.uid);
            console.log('Logged-in user phone number: ' + loggedinUser.phoneNumber);

            GetProfileData();
        } else {
            loggedinUser = null;
            console.log('User has been logged out');
            window.location.href = "../login/index.html";
        }
    } catch (error) {
        console.log(error.message);
        window.location.href = "../login/index.html";
    }
});

async function GetProfileData() {
    console.log('GetProfileData - Starts');
    var userProfile = JSON.parse(localStorage.getItem("userProfile"));
    if (userProfile != undefined && userProfile != "" && userProfile != null) {
        if (userProfile.id != "0") {

            if (userProfile.UserRole.findIndex(e => e.TYPE === "ADMIN") >= 0 || userProfile.UserRole.findIndex(e => e.TYPE === "ORGANIZER") >= 0) {
                console.log("in admin or organizer");
                // document.getElementById("fInput").style.display="none";
                getEventDetails();
            } else {
                console.log("not admin");
                document.getElementById("containerOrgList").style.display = "none";
                document.getElementById("errorMessage").style.display = "block";

            }
        } else {
            console.log("not admin");
            document.getElementById("containerOrgList").style.display = "none";
            document.getElementById("errorMessage").style.display = "block";
        }
    } else {
        window.location.assign('../index.html');
    }
}

function eventDetailsFormSlide(eventForm) {

    var EventStatusForm1 = document.getElementById('EventStatusForm1');
    var EventPosterForm2 = document.getElementById('EventPosterForm2');
    var EventSetupForm3 = document.getElementById('EventSetupForm3');
    var EventCategoryForm4 = document.getElementById('EventCategoryForm4');
    var PaymentSetupForm5 = document.getElementById('PaymentSetupForm5');

    if (eventForm === 'EventStatus') {
        EventStatusForm1.style.transform = 'translateX(0%)';
        EventPosterForm2.style.transform = 'translateX(0%)';
        EventSetupForm3.style.transform = 'translateX(0%)';
        EventCategoryForm4.style.transform = 'translateX(0%)';
        PaymentSetupForm5.style.transform = 'translateX(0%)';
    } else if (eventForm === 'EventPoster') {
        EventStatusForm1.style.transform = 'translateX(-100%)';
        EventPosterForm2.style.transform = 'translateX(-100%)';
        EventSetupForm3.style.transform = 'translateX(-100%)';
        EventCategoryForm4.style.transform = 'translateX(-100%)';
        PaymentSetupForm5.style.transform = 'translateX(-100%)';
    } else if (eventForm === 'EventSetup') {
        EventStatusForm1.style.transform = 'translateX(-200%)';
        EventPosterForm2.style.transform = 'translateX(-200%)';
        EventSetupForm3.style.transform = 'translateX(-200%)';
        EventCategoryForm4.style.transform = 'translateX(-200%)';
        PaymentSetupForm5.style.transform = 'translateX(-200%)';
    } else if (eventForm === 'EventCategory') {
        EventStatusForm1.style.transform = 'translateX(-300%)';
        EventPosterForm2.style.transform = 'translateX(-300%)';
        EventSetupForm3.style.transform = 'translateX(-300%)';
        EventCategoryForm4.style.transform = 'translateX(-300%)';
        PaymentSetupForm5.style.transform = 'translateX(-300%)';
    } else if (eventForm === 'PaymentSetup') {
        EventStatusForm1.style.transform = 'translateX(-400%)';
        EventPosterForm2.style.transform = 'translateX(-400%)';
        EventSetupForm3.style.transform = 'translateX(-400%)';
        EventCategoryForm4.style.transform = 'translateX(-400%)';
        PaymentSetupForm5.style.transform = 'translateX(-400%)';
    }

}

function saveEventStatus(val) {
    console.log("val : ", val);
    //save detailes in DB
    var EventID = document.getElementById("hfEventID").value;
    var EventStatus = "";
    EventStatus = val;
    console.log("EventStatus", EventStatus);
    var para1 = {};
    para1 = {
        EventID: eventID,
        EventStatus: EventStatus,
    };
    console.log(para1);
    // const ret1 = firebase.functions().httpsCallable("updateEventDetails_Dates");
    const ret1 = functions.httpsCallable("updateEventDetails_EventStatus");
    ret1(para1).then((result) => {
        //var record1 = result.data;
        console.log("Event ID: " + result.data.retCode);
        if (result.data.retCode === "0") {
            var confirmMessage = document.getElementById('saveMessage2');
            confirmMessage.style.display = "block";

            setTimeout(function () {
                confirmMessage.style.display = 'none';
            }, 5000);
        }
    });

};

function saveEventMode(val) {
    console.log("val : ", val);
    //save detailes in DB
    var EventID = document.getElementById("hfEventID").value;
    var EventMode = "";
    EventMode = val;
    console.log("EventMode", EventMode);
    var para1 = {};
    para1 = {
        EventID: eventID,
        EventMode: EventMode,
    };
    console.log(para1);
    // const ret1 = firebase.functions().httpsCallable("updateEventDetails_Dates");
    const ret1 = functions.httpsCallable("updateEventDetails_EventMode");
    ret1(para1).then((result) => {
        //var record1 = result.data;
        console.log("Event ID: " + result.data.retCode);
        if (result.data.retCode === "0") {
            var confirmMessage = document.getElementById('saveMessage2');
            confirmMessage.style.display = "block";

            setTimeout(function () {
                confirmMessage.style.display = 'none';
            }, 5000);
        }
    });

};
function SaveRegistrationflag() {
    console.log('SaveRegistrationflag');
    var obj = document.getElementById('RegistrationToggleBtn');
    var flag = "";
    if (obj.classList.contains('on')) {
        flag = 'YES';
    } else {
        flag = 'NO';
    }


    document.getElementById("hfEventID").value = eventID;
    var para1 = {};
    para1 = {
        EventID: eventID,
        RegistrationOpenFlag: flag,
    };
    console.log(para1);
    const ret1 = functions.httpsCallable("updateEventFlag_RegistrationOn");
    ret1(para1).then((result) => {
    });
};

function SavePaymentflag() {
    console.log('SavePaymentflag');
    var obj = document.getElementById('paymentToggleBtn');
    var flag = "";
    if (obj.classList.contains('on')) {
        flag = 'YES';
    } else {
        flag = 'NO';
    }


    document.getElementById("hfEventID").value = eventID;
    var para1 = {};
    para1 = {
        EventID: eventID,
        OnlinePaymentModeFlag: flag,
    };
    console.log(para1);
    const ret1 = functions.httpsCallable("updateEventFlag_OnlinePaymentMode");
    ret1(para1).then((result) => {
    });
};

function SaveShowParticipantflag() {
    console.log('SaveRegistrationflag');
    var obj = document.getElementById('showParticipantToggleBtn');
    var flag = "";
    if (obj.classList.contains('on')) {
        flag = 'YES';
    } else {
        flag = 'NO';
    }


    document.getElementById("hfEventID").value = eventID;
    var para1 = {};
    para1 = {
        EventID: eventID,
        ShowParticipantFlag: flag,
    };
    console.log(para1);
    const ret1 = functions.httpsCallable("updateEventFlag_ShowParticipant");
    ret1(para1).then((result) => {
    });
};


function SaveShowParticipantPostPaymentflag() {
    var obj = document.getElementById('showPostPaymentToggleBtn');
    var flag = "";
    if (obj.classList.contains('on')) {
        flag = 'YES';
    } else {
        flag = 'NO';
    }


    document.getElementById("hfEventID").value = eventID;
    var para1 = {};
    para1 = {
        EventID: eventID,
        ShowParticipantPostPaymentFlag: flag,
    };
    console.log(para1);
    const ret1 = functions.httpsCallable("updateEventFlag_ShowParticipantPostPayment");
    ret1(para1).then((result) => {
    });
};


function SaveDrawPublishedFlag() {

    var obj = document.getElementById('DrawsToggleBtn');
    var flag = "";
    if (obj.classList.contains('on')) {
        flag = 'YES';
    } else {
        flag = 'NO';
    }


    document.getElementById("hfEventID").value = eventID;
    var para1 = {};
    para1 = {
        EventID: eventID,
        DrawPublishedFlag: flag,
    };
    console.log(para1);
    const ret1 = functions.httpsCallable("updateEventFlag_PublishDraw");
    ret1(para1).then((result) => {
    });
};


function SavePublishSeedFlag() {

    var obj = document.getElementById('SeedToggleBtn');
    var flag = "";
    if (obj.classList.contains('on')) {
        flag = 'YES';
    } else {
        flag = 'NO';
    }


    document.getElementById("hfEventID").value = eventID;
    var para1 = {};
    para1 = {
        EventID: eventID,
        PublishSeedEntryFlag: flag,
    };
    console.log(para1);
    const ret1 = functions.httpsCallable("updateEventFlag_PublishSeed");
    ret1(para1).then((result) => {
    });
};


function SavePublishResultFlag() {

    var obj = document.getElementById('ResultToggleBtn');
    var flag = "";
    if (obj.classList.contains('on')) {
        flag = 'YES';
    } else {
        flag = 'NO';
    }


    document.getElementById("hfEventID").value = eventID;
    var para1 = {};
    para1 = {
        EventID: eventID,
        PublishResultFlag: flag,
    };
    console.log(para1);
    const ret1 = functions.httpsCallable("updateEventFlag_PublishResult");
    ret1(para1).then((result) => {
    });
};


function SavePublishGalleryFlag() {

    var obj = document.getElementById('gallaryToggleBtn');
    var flag = "";
    if (obj.classList.contains('on')) {
        flag = 'YES';
    } else {
        flag = 'NO';
    }


    document.getElementById("hfEventID").value = eventID;
    var para1 = {};
    para1 = {
        EventID: eventID,
        PublishGalleryFlag: flag,
    };
    console.log(para1);
    const ret1 = functions.httpsCallable("updateEventFlag_PublishGallery");
    ret1(para1).then((result) => {
    });
};
function getEventDetails() {

    document.getElementById("hfEventID").value = eventID;
    var para1 = {};
    para1 = {
        EventID: eventID,
    };
    console.log(para1);
    const ret1 = functions.httpsCallable("getEventDetails_forAdmin");
    ret1(para1).then((result) => {
        //var record1 = result.data;
        console.log(result.data);
        console.log("Event EventName: " + result.data.EventName);
        if (result.data != undefined && result.data != null) {
            document.getElementById("eventName").innerHTML = result.data.EventName;
            var eventStatus = result.data.EventStatus;
            if (eventStatus.toUpperCase() === 'ACTIVE') {
                document.getElementById("Active").checked = true;
            } else if (eventStatus.toUpperCase() === 'INACTIVE') {
                document.getElementById("Inactive").checked = true;
            } else if (eventStatus.toUpperCase() === 'CLOSED') {
                document.getElementById("Closed").checked = true;
            } else if (eventStatus.toUpperCase() === 'HOLD') {
                document.getElementById("Onhold").checked = true;
            } else if (eventStatus.toUpperCase() === 'CANCELLED') {
                document.getElementById("Cancelled").checked = true;
            }

            var eventMode = result.data.EventMode;
            if (eventMode.toUpperCase() === 'BOOK') {
                document.getElementById("Book").checked = true
            } else if (eventMode.toUpperCase() === 'FIXTURE') {
                document.getElementById("Fixture").checked = true
            } else if (eventMode.toUpperCase() === 'OPEN') {
                document.getElementById("Open").checked = true
            }

            document.getElementById("organizationName").value = result.data.OrganizationName;
            document.getElementById("eventNametb").value = result.data.EventName;
            document.getElementById("venueName").value = result.data.EventVenue;
            document.getElementById("vanueContact").value = result.data.VenueContact;
            document.getElementById("vanueMap").value = result.data.LocationMap;

            var options = {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            };

            if (result.data.RegistrationStartDate != "" && result.data.RegistrationStartDate != undefined && result.data.RegistrationStartDate != null)
                document.getElementById("RegistrationOpenDate").value = new Date(result.data.RegistrationStartDate._seconds * 1000).toLocaleDateString("en-US", options);

            if (result.data.RegistrationEndDate != "" && result.data.RegistrationEndDate != undefined && result.data.RegistrationEndDate != null)
                document.getElementById("RegistrationClosedDate").value = new Date(result.data.RegistrationEndDate._seconds * 1000).toLocaleDateString("en-US", options);

            if (result.data.WithdrawalEndDate != "" && result.data.WithdrawalEndDate != undefined && result.data.WithdrawalEndDate != null)
                document.getElementById("RegistrationWithdrawDate").value = new Date(result.data.WithdrawalEndDate._seconds * 1000).toLocaleDateString("en-US", options);

            if (result.data.EventStartDate != "" && result.data.EventStartDate != undefined && result.data.EventStartDate != null)
                document.getElementById("EventStartDate").value = new Date(result.data.EventStartDate._seconds * 1000).toLocaleDateString("en-US", options);
            if (result.data.EventEndDate != "" && result.data.EventEndDate != undefined && result.data.EventEndDate != null)
                document.getElementById("EventEndDate").value = new Date(result.data.EventStartDate._seconds * 1000).toLocaleDateString("en-US", options);

            document.getElementById("maxEntry").value = result.data.MaxEntryForParticipant;

            if (result.data.RegistrationOpenFlag === 'YES') {
                document.getElementById("RegistrationToggleBtn").classList.remove('off');
                document.getElementById("RegistrationToggleBtn").classList.add('on');
                document.getElementById("RegistrationOn").classList.add('active');

            } else {
                document.getElementById("RegistrationToggleBtn").classList.remove('on');
                document.getElementById("RegistrationToggleBtn").classList.add('off');
                document.getElementById("RegistrationOff").classList.add('active');
            }

            if (result.data.OnlinePaymentModeFlag === 'YES') {
                document.getElementById("paymentToggleBtn").classList.remove('off');
                document.getElementById("paymentToggleBtn").classList.add('on');
                document.getElementById("PaymentOn").classList.add('active');

            } else {
                document.getElementById("paymentToggleBtn").classList.remove('on');
                document.getElementById("paymentToggleBtn").classList.add('off');
                document.getElementById("PaymentOff").classList.add('active');
            }

            if (result.data.ShowParticipantFlag === 'YES') {
                document.getElementById("showParticipantToggleBtn").classList.remove('off');
                document.getElementById("showParticipantToggleBtn").classList.add('on');
                document.getElementById("ShowParticipantsOn").classList.add('active');

            } else {
                document.getElementById("showParticipantToggleBtn").classList.remove('on');
                document.getElementById("showParticipantToggleBtn").classList.add('off');
                document.getElementById("ShowParticipantsOff").classList.add('active');
            }

            if (result.data.ShowParticipantPostPaymentFlag === 'YES') {
                document.getElementById("showPostPaymentToggleBtn").classList.remove('off');
                document.getElementById("showPostPaymentToggleBtn").classList.add('on');
                document.getElementById("ShowParticipantsPostPaymentOn").classList.add('active');

            } else {
                document.getElementById("showPostPaymentToggleBtn").classList.remove('on');
                document.getElementById("showPostPaymentToggleBtn").classList.add('off');
                document.getElementById("ShowParticipantsPostPaymentOff").classList.add('active');
            }


            if (result.data.DrawPublishedFlag === 'YES') {
                document.getElementById("DrawsToggleBtn").classList.remove('off');
                document.getElementById("DrawsToggleBtn").classList.add('on');
                document.getElementById("DrawsOn").classList.add('active');

            } else {
                document.getElementById("DrawsToggleBtn").classList.remove('on');
                document.getElementById("DrawsToggleBtn").classList.add('off');
                document.getElementById("DrawsOff").classList.add('active');
            }

            if (result.data.PublishSeedEntryFlag === 'YES') {
                document.getElementById("SeedToggleBtn").classList.remove('off');
                document.getElementById("SeedToggleBtn").classList.add('on');
                document.getElementById("SeedOn").classList.add('active');

            } else {
                document.getElementById("SeedToggleBtn").classList.remove('on');
                document.getElementById("SeedToggleBtn").classList.add('off');
                document.getElementById("SeedOff").classList.add('active');
            }

            if (result.data.PublishResultFlag === 'YES') {
                document.getElementById("ResultToggleBtn").classList.remove('off');
                document.getElementById("ResultToggleBtn").classList.add('on');
                document.getElementById("ResultOn").classList.add('active');

            } else {
                document.getElementById("ResultToggleBtn").classList.remove('on');
                document.getElementById("ResultToggleBtn").classList.add('off');
                document.getElementById("ResultOff").classList.add('active');
            }

            if (result.data.PublishGalleryFlag === 'YES') {
                document.getElementById("gallaryToggleBtn").classList.remove('off');
                document.getElementById("gallaryToggleBtn").classList.add('on');
                document.getElementById("GalleryOn").classList.add('active');

            } else {
                document.getElementById("gallaryToggleBtn").classList.remove('on');
                document.getElementById("gallaryToggleBtn").classList.add('off');
                document.getElementById("GalleryOff").classList.add('active');
            }

            if (result.data.NoticeBoard != undefined && result.data.NoticeBoard != null && result.data.NoticeBoard != "") {
                var onoticeboard = result.data.NoticeBoard;
                onoticeboard = onoticeboard.replaceAll(";", "\n");
                document.getElementById("noticeBoard").textContent = onoticeboard;
            }

            if (result.data.Announcement != undefined && result.data.Announcement != null && result.data.Announcement != "") {
                var valAnnouncement = result.data.Announcement;
                valAnnouncement = valAnnouncement.replaceAll(";", "\n");
                document.getElementById("accouncement").textContent = valAnnouncement;
            }
            if (result.data.RulesAndRegulations != undefined && result.data.RulesAndRegulations != null && result.data.RulesAndRegulations != "") {
                var valrulesAndRegulation = result.data.RulesAndRegulations;
                valrulesAndRegulationt = valrulesAndRegulation.replaceAll(";", "\n");
                document.getElementById("rulesAndRegulation").textContent = valrulesAndRegulation;
            }
            //category details
            //CategoryDetailsDiv
            catDetails = result.data.CategoryDetails;
            document.getElementById("CategoryDetailsDiv").innerHTML = "";
            for (i = 0; i < catDetails.length; i++) {
                renderCategory(catDetails[i], i);
            }

        }
    });

}

function renderCategory(category, index) {

    var curFormat = {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    };

    var options = {
        year: '2-digit',
        // year: 'numeric',
        // month: 'short',
        month: '2-digit',
        day: 'numeric'
    };
    var div1 = document.createElement("div");
    div1.setAttribute("class", "col-lg-4 col-md-6 col-sm-12");
    div1.setAttribute("id", "catDiv" + index);

    var div2 = document.createElement("div");
    div2.setAttribute("class", "category-card");

    var input1 = document.createElement("input");
    input1.setAttribute("type", "text");
    input1.setAttribute("id", "catID" + index);
    input1.setAttribute("class", "category-name");
    input1.value = category.CategoryName;
    input1.setAttribute("readonly", "true");
    div2.appendChild(input1);

    var hf = document.createElement("input");
    hf.setAttribute("type", "hidden");
    hf.setAttribute("id", "catNameID" + index);
    hf.setAttribute("class", "category-name");
    hf.value = category.CategoryName;
    div2.appendChild(hf);

    var div3 = document.createElement("div");
    div3.setAttribute("class", "gender-event-div");

    var div4 = document.createElement("div");

    var smallGender = document.createElement("small");
    smallGender.setAttribute("id", "gender" + index);
    smallGender.innerHTML = category.Gender;
    div4.appendChild(smallGender);

    var selectGender = document.createElement("select");
    selectGender.setAttribute("id", "selectGender" + index);
    selectGender.setAttribute("style", "display:none;");

    var option1 = document.createElement("option");
    option1.setAttribute("value", "MALE");
    if (category.Gender.toUpperCase() === "MALE") {
        option1.setAttribute("selected", "true");
    }
    option1.innerHTML = "MALE";
    selectGender.appendChild(option1);

    var option2 = document.createElement("option");
    option2.setAttribute("value", "FEMALE");
    if (category.Gender.toUpperCase() === "FEMALE") {
        option2.setAttribute("selected", "true");
    }
    option2.innerHTML = "FEMALE";
    selectGender.appendChild(option2);

    var option3 = document.createElement("option");
    option3.setAttribute("value", "MIXED");
    if (category.Gender.toUpperCase() === "MIXED") {
        option3.setAttribute("selected", "true");
    }
    option3.innerHTML = "MIXED";
    selectGender.appendChild(option3);
    div4.appendChild(selectGender);
    div3.appendChild(div4);

    var span1 = document.createElement("span");
    span1.innerHTML = "|";

    div3.appendChild(span1);

    var div5 = document.createElement("div");

    var smallType = document.createElement("small");
    smallType.setAttribute("id", "catType" + index);
    smallType.innerHTML = category.EventType;
    div5.appendChild(smallType);

    var selectType = document.createElement("select");
    selectType.setAttribute("id", "selectType" + index);
    selectType.setAttribute("style", "display:none;");

    var option11 = document.createElement("option");
    option11.setAttribute("value", "SINGLE");
    if (category.Gender.toUpperCase() === "SINGLE") {
        option11.setAttribute("selected", "true");
    }
    option11.innerHTML = "SINGLE";
    selectType.appendChild(option11);

    var option21 = document.createElement("option");
    option21.setAttribute("value", "DOUBLE");
    if (category.Gender.toUpperCase() === "DOUBLE") {
        option21.setAttribute("selected", "true");
    }
    option21.innerHTML = "DOUBLE";
    selectType.appendChild(option21);

    var option31 = document.createElement("option");
    option31.setAttribute("value", "TEAM");
    if (category.Gender.toUpperCase() === "TEAM") {
        option31.setAttribute("selected", "true");
    }
    option31.innerHTML = "TEAM";
    selectType.appendChild(option31);

    div5.appendChild(selectType);
    div3.appendChild(div5);
    div2.appendChild(div3);

    var div6 = document.createElement("div");
    div6.setAttribute("class", "born-before-div");

    var h31 = document.createElement("h3");
    h31.setAttribute("onclick", "changeDateRef(" + index + ")");

    var span22 = document.createElement("span");
    span22.innerHTML = "Born";

    h31.appendChild(span22);

    var div7 = document.createElement("div");
    div7.setAttribute("id", "dateRefFlag" + index);
    if (category.DateRefType === 'Before') {
        div7.setAttribute("class", "before");
    } else {
        div7.setAttribute("class", "after");
    }

    var spanflagB = document.createElement("span");
    spanflagB.innerHTML = "Before";

    div7.appendChild(spanflagB);

    var spanK = document.createElement("span");
    spanK.setAttribute("class", "material-symbols-outlined");
    spanK.innerHTML = "keyboard_arrow_down";
    div7.appendChild(spanK);

    var spanA = document.createElement("span");
    spanA.innerHTML = "After";

    div7.appendChild(spanA);
    h31.appendChild(div7);

    var spanC = document.createElement("span");
    spanC.innerHTML = ":";
    h31.appendChild(spanC);
    div6.appendChild(h31);

    var refsdate = new Date(category.ReferenceDate._seconds * 1000);

    if (refsdate.toString() === 'Invalid Date') {
        refsdate = new Date(category.ReferenceDate);
    }
    console.log(refsdate);

    var valString = refsdate.toLocaleDateString("en-IN", options);

    var h41 = document.createElement("h4");
    h41.setAttribute("id", "refDate" + index);
    h41.setAttribute("style", "width: 100%;");

    h41.innerHTML = valString;
    div6.appendChild(h41);

    var div8 = document.createElement("div");
    div8.setAttribute("id", "dtDiv" + index);

    div8.setAttribute("class", "input-group date datetimepicker11");
    div8.setAttribute("style", "width: 70%;opacity: 0;pointer-events: none;");

    var inputROpen = document.createElement("input");
    inputROpen.setAttribute("id", "RegistrationOpenDate" + index);
    inputROpen.setAttribute("style", "height: 35px; background: #fff; border-right: 1px solid #ddd;")
    inputROpen.setAttribute("type", "text");
    inputROpen.setAttribute("placeholder", "Reg Start Date");
    inputROpen.setAttribute("class", "form-control");
    inputROpen.setAttribute("readonly", "true");
    inputROpen.setAttribute("value", valString);
    div8.appendChild(inputROpen);


    var div9 = document.createElement("div");

    div9.setAttribute("class", "input-group-addon input-group-prepend");

    var spanCal = document.createElement("span");
    spanCal.setAttribute("class", "input-group-text")
    spanCal.setAttribute("style", "height: 35px; background: #fff; border: none; border - radius: 0 4px 4px 0");

    var i1 = document.createElement("i");
    i1.setAttribute("class", "fas fa-calendar");
    i1.setAttribute("style", "font-size: 0.9em; color: #666;")
    spanCal.appendChild(i1);

    div9.appendChild(spanCal);
    div8.appendChild(div9);

    // $('.datepicker_init', div8).datetimepicker({
    //     format: 'MM-DD-YYYY',
    //     ignoreReadonly: true,
    //     useCurrent: true, //,
    //     defaultDate: new Date()
    //     // maxDate: new Date() //,

    // });

    // $('.datepicker_end', div8).datetimepicker({
    //     locale: 'es',
    //     format: 'YYYY-MM-DD HH:mm',
    //     useCurrent: false
    // });

    div6.appendChild(div8);
    div2.appendChild(div6);



    var div10 = document.createElement("div");
    div10.setAttribute("class", "born-before-div");

    var h3fee = document.createElement("h3");
    h3fee.innerHTML = "Fees : ";
    div10.appendChild(h3fee);


    var inputFee = document.createElement("input");
    inputFee.setAttribute("type", "text");
    inputFee.setAttribute("readonly", "true");

    inputFee.setAttribute("id", "fee" + index);
    inputFee.value = Number(category.Fees).toLocaleString('en-IN', curFormat);
    div10.appendChild(inputFee);
    div2.appendChild(div10);

    var div11 = document.createElement("div");
    div11.setAttribute("class", "category-card-edit");
    div11.setAttribute("onclick", "SetEditMode(" + index + ");");

    var spanEdit = document.createElement("span");
    spanEdit.setAttribute("class", "material-symbols-outlined");

    spanEdit.innerHTML = "edit_square";

    div11.appendChild(spanEdit);

    var smallBut = document.createElement("small");
    smallBut.setAttribute("id", "button" + index);
    smallBut.innerHTML = "Edit";
    div11.appendChild(smallBut);
    div2.appendChild(div11);
    div1.appendChild(div2);

    var br = document.createElement("br");
    div1.appendChild(br);
    document.getElementById("CategoryDetailsDiv").appendChild(div1);
}



function SetEditMode(index) {

    var curFormat = {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    };
    console.log('SetEditMode');
    if (document.getElementById("button" + index).innerHTML === "Edit") {
        document.getElementById("catID" + index).removeAttribute("readonly");
        document.getElementById("gender" + index).setAttribute("style", "display:none;");
        document.getElementById("selectGender" + index).setAttribute("style", "display:block;");
        document.getElementById("catType" + index).setAttribute("style", "display:none;");
        document.getElementById("selectType" + index).setAttribute("style", "display:block;");

        document.getElementById("refDate" + index).setAttribute("style", "display:none;");
        document.getElementById("dtDiv" + index).setAttribute("style", "width: 70%;opacity: 1;pointer-events: all;");
        var feeCon = document.getElementById("fee" + index);
        feeCon.removeAttribute("readonly")
        console.log(feeCon.value);
        feeCon.value = feeCon.value.replace('₹', '').replaceAll(",", "").replaceAll(" ", "");
        document.getElementById("button" + index).innerHTML = "Update";

    } else {
        document.getElementById("catID" + index).setAttribute("readonly", true);
        document.getElementById("gender" + index).setAttribute("style", "display:block;");
        document.getElementById("selectGender" + index).setAttribute("style", "display:none;");
        document.getElementById("catType" + index).setAttribute("style", "display:block;");
        document.getElementById("selectType" + index).setAttribute("style", "display:none;");

        document.getElementById("refDate" + index).setAttribute("style", "display:block;");
        document.getElementById("dtDiv" + index).setAttribute("style", "width: 70%;opacity: 0;pointer-events: none;");

        var feeCon = document.getElementById("fee" + index);
        feeCon.setAttribute("readonly", true)
        // feeCon.value = feeCon.value.replace('₹', '').replaceAll(",", "").replaceAll(" ", "");
        feeCon.value = Number(feeCon.value).toLocaleString('en-IN', curFormat);
        document.getElementById("button" + index).innerHTML = "Edit";

        /////
        updateCategory(index);

    }

}

/////
function addCategory() {
    console.log('addCategory');

    var categoryName = document.getElementById("catNameAdd").value;
    document.getElementById("catNameAdd").value = "";

    var genderSelCnt = document.getElementById("genderAdd");
    var genderSelVal = genderSelCnt.options[genderSelCnt.selectedIndex].text;

    var categoryTypeCnt = document.getElementById("catTypeAdd");
    var categoryTypeVal = categoryTypeCnt.options[categoryTypeCnt.selectedIndex].text;

    var dateRefFlagCnt = document.getElementById("dateRefFlagadd");
    var dateRefFlagVal = "";
    if (dateRefFlagCnt.classList.contains('before')) {
        dateRefFlagVal = 'Before';
    } else {
        dateRefFlagVal = 'After';
    }

    var RegistrationOpenDate = document.getElementById("RegistrationOpenDateAdd");
    var RegistrationOpenDateVal = RegistrationOpenDate.value;

    if (categoryTypeVal === 'SINGLE') {
        maxTeam = 1;
    } else if (categoryTypeVal === 'DOUBLE') {
        maxTeam = 2;
    } else {
        maxTeam = -1;
    }

    var fees = document.getElementById("feeAdd").value;
    document.getElementById("feeAdd").value = "0";
    var feeval = fees.replace('₹', '').replaceAll(",", "").replaceAll(" ", "");
    if (categoryName === "" || genderSelVal === "" ||
        feeval === "" || categoryTypeVal === "" || RegistrationOpenDateVal === "" || dateRefFlagVal === "") {
        document.getElementById("errorMessage").style = "display:block";
    }
    else {
        console.log(catDetails);
        if (catDetails != null && catDetails != undefined) {
            var selIndex = catDetails.findIndex(e => e.CategoryName === categoryName);
            if (selIndex >= 0) {
                catDetails.splice(selIndex, 1);
            }
        }
        else {
            catDetails = [];
        }
        console.log('RegistrationOpenDateVal', new Date(RegistrationOpenDateVal));
        catDetails.push({
            CategoryName: categoryName,
            Gender: genderSelVal,
            Fees: Number(feeval),
            EventType: categoryTypeVal,
            MaxTeamSize: Number(maxTeam),
            ReferenceDate: new Date(RegistrationOpenDateVal),
            DateRefType: dateRefFlagVal

        });
        //console.log(catDetails);

        document.getElementById("CategoryDetailsDiv").innerHTML = "";
        for (i = 0; i < catDetails.length; i++) {
            renderCategory(catDetails[i], i);
        }
        document.getElementById("divAddCategory").style = "display:none;";

    }
}
function SaveCategory() {
    var para1 = {};
    for (i = 0; i < catDetails.length; i++) {

        var refsdate = new Date(catDetails[i].ReferenceDate._seconds * 1000);

        if (refsdate.toString() === 'Invalid Date') {
            refsdate = new Date(catDetails[i].ReferenceDate);
        }
        catDetails[i].ReferenceDate = refsdate;
    }

    para1 = {
        EventID: eventID,
        CategoryDetails: catDetails,
    };
    console.log(catDetails);
    // const ret1 = firebase.functions().httpsCallable("setEventCategoryDetails");
    const ret1 = functions.httpsCallable("setEventCategoryDetails");
    ret1(para1).then((result) => {

    });

}
function updateCategory(index) {
    console.log('updateCategory', index);

    var categoryName = document.getElementById("catID" + index).value;
    var categoryNameOld = document.getElementById("catNameID" + index).value;
    var genderSelCnt = document.getElementById("selectGender" + index);
    var genderSelVal = genderSelCnt.options[genderSelCnt.selectedIndex].text;
    document.getElementById("gender" + index).innerHTML = genderSelVal;

    var categoryTypeCnt = document.getElementById("selectType" + index);
    var categoryTypeVal = categoryTypeCnt.options[categoryTypeCnt.selectedIndex].text;
    document.getElementById("catType" + index).innerHTML = categoryTypeVal;

    var dateRefFlagCnt = document.getElementById("dateRefFlag" + index);
    var dateRefFlagVal = "";
    if (dateRefFlagCnt.classList.contains('before')) {
        dateRefFlagVal = 'Before';
    } else {
        dateRefFlagVal = 'After';
    }

    var RegistrationOpenDate = document.getElementById("RegistrationOpenDate" + index);
    var RegistrationOpenDateVal = RegistrationOpenDate.value;
    document.getElementById("refDate" + index).value = RegistrationOpenDateVal;

    if (categoryTypeVal === 'SINGLE') {
        maxTeam = 1;
    } else if (categoryTypeVal === 'DOUBLE') {
        maxTeam = 2;
    } else {
        maxTeam = -1;
    }

    var fees = document.getElementById("fee" + index).value;

    var feeval = fees.replace('₹', '').replaceAll(",", "").replaceAll(" ", "");

    console.log(catDetails);
    if (catDetails != null && catDetails != undefined) {
        var selIndex = catDetails.findIndex(e => e.CategoryName === categoryNameOld);
        if (selIndex >= 0) {
            catDetails.splice(selIndex, 1);
        }
    }
    else {
        catDetails = [];
    }

    catDetails.push({
        CategoryName: categoryName,
        Gender: genderSelVal,
        Fees: Number(feeval),
        EventType: categoryTypeVal,
        MaxTeamSize: Number(maxTeam),
        ReferenceDate: new Date(RegistrationOpenDateVal),
        DateRefType: dateRefFlagVal

    });
    console.log(catDetails);
    //document.getElementById("existingEventCategory").innerHTML = "";
    //for (index = 0; index < valList.length; index++) {
    //    renderCategory(valList[index], index);
    //}
};

/////////


function changestatus(sectionName) {
    document.getElementById("btnDetails").classList.remove('active');
    document.getElementById("btnNotice").classList.remove('active');
    document.getElementById("btnAnnouncement").classList.remove('active');
    document.getElementById("btnRegulation").classList.remove('active');

    if (sectionName === 'Details') {
        document.getElementById("btnDetails").classList.add('active');
        document.getElementById('detailsDiv').style.display = 'block';
        document.getElementById('noticeDiv').style.display = 'none';
        document.getElementById('accouncementDiv').style.display = 'none';
        document.getElementById('regulationDiv').style.display = 'none';
    } else if (sectionName === 'Notice') {
        document.getElementById("btnNotice").classList.add('active');
        document.getElementById('detailsDiv').style.display = 'none';
        document.getElementById('noticeDiv').style.display = 'block';
        document.getElementById('accouncementDiv').style.display = 'none';
        document.getElementById('regulationDiv').style.display = 'none';
    } else if (sectionName === 'Announcement') {
        document.getElementById("btnAnnouncement").classList.add('active');
        document.getElementById('detailsDiv').style.display = 'none';
        document.getElementById('noticeDiv').style.display = 'none';
        document.getElementById('accouncementDiv').style.display = 'block';
        document.getElementById('regulationDiv').style.display = 'none';
    } else if (sectionName === 'Regulation') {
        document.getElementById("btnRegulation").classList.add('active');
        document.getElementById('detailsDiv').style.display = 'none';
        document.getElementById('noticeDiv').style.display = 'none';
        document.getElementById('accouncementDiv').style.display = 'none';
        document.getElementById('regulationDiv').style.display = 'block';
    }
}

function SaveEventDetails() {

    document.getElementById("hfEventID").value = eventID;
    var para1 = {};
    var orgName = document.getElementById('organizationName').value;
    var eventName = document.getElementById('eventNametb').value;
    var vanueName = document.getElementById('venueName').value;
    var vanueContact = document.getElementById('valueContact').value;
    var vanueMap = document.getElementById('valueMap').value;
    var RegistrationOpenDate = document.getElementById('RegistrationOpenDate').value;
    var RegistrationClosedDate = document.getElementById('RegistrationClosedDate').value;
    var RegistrationWithdrawDate = document.getElementById('RegistrationWithdrawDate').value;
    var EventStartDate = document.getElementById('EventStartDate').value;
    var EventEndDate = document.getElementById('EventEndDate').value;
    var maxEntry = document.getElementById('maxEntry').value;


    para1 = {
        EventID: eventID,
        EventName: eventName,
        //EventOwnerName : ,
        OrganizationName: orgName,
        EventVenue: vanueName,
        VenueContact: vanueContact,
        LocationMap: vanueMap,
        RegistrationStartDate: RegistrationOpenDate,
        RegistrationEndDate: RegistrationClosedDate,
        WithdrawalEndDate: RegistrationWithdrawDate,
        EventStartDate: EventStartDate,
        EventEndDate: EventEndDate,
        MaxEntryForParticipant: maxEntry

    };

    console.log(para1);
    const ret1 = functions.httpsCallable("updateEventBasicDetails");
    ret1(para1).then((result) => {

    });
}
function SaveNotice() {
    document.getElementById("hfEventID").value = eventID;
    var para1 = {};
    var notice = document.getElementById('noticeBoard').value;
    notice = notice.replaceAll("\n", ";");

    para1 = {
        EventID: eventID,
        NoticeBoard: notice,
    };

    console.log(para1);
    const ret1 = functions.httpsCallable("updateEventDetails_NoticeBoard");
    ret1(para1).then((result) => {

    });
}


function SaveAnnouncement() {
    document.getElementById("hfEventID").value = eventID;
    var para1 = {};
    var accouncement = document.getElementById('accouncement').value;
    accouncement = accouncement.replaceAll("\n", ";");

    para1 = {
        EventID: eventID,
        Announcement: accouncement,
    };

    console.log(para1);
    const ret1 = functions.httpsCallable("updateEventDetails_Announcement");
    ret1(para1).then((result) => {

    });
}

function SaveRegulation() {
    document.getElementById("hfEventID").value = eventID;
    var para1 = {};
    var RulesAndRegulations = document.getElementById('rulesAndRegulation').value;
    RulesAndRegulations = RulesAndRegulations.replaceAll("\n", ";");

    para1 = {
        EventID: eventID,
        RulesAndRegulations: RulesAndRegulations,
    };

    console.log(para1);
    const ret1 = functions.httpsCallable("updateEventDetails_RulesAndRegulations");
    ret1(para1).then((result) => {

    });
}
function ShowAddCategory() {
    console.log('ShowAddCategory');
    document.getElementById("divAddCategory").style.display = "block";
}

function changeDateRef(index) {
    var dateRefFlag = document.getElementById('dateRefFlag' + index);
    console.log(dateRefFlag);
    if (dateRefFlag.classList.contains('before')) {
        dateRefFlag.classList.remove('before');
        dateRefFlag.classList.add('after');
    } else if (dateRefFlag.classList.contains('after')) {
        dateRefFlag.classList.remove('after');
        dateRefFlag.classList.add('before');
    }
}