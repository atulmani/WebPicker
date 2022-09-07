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
            if (eventID === "" || eventID === null || eventID === undefined) {
                eventID = localStorage.getItem("eventID");
            }
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
            document.getElementById("userName").innerHTML = userProfile.UserName;
            document.getElementById("userContact").innerHTML = userProfile.Phone;
            var listName = userProfile.UserName.split(" ");
            var userSName = "";
            for (i = 0; i < listName.length; i++) {
                userSName = userSName + listName[i][0];
            }
            document.getElementById("userShortName").innerHTML = userSName;

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

function getEventDetails() {

    document.getElementById("hfEventID").value = eventID;
    var responceJSON = localStorage.getItem("eventDetails");
    let obj = JSON.parse(responceJSON);

    var options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };

    if (obj != undefined && obj != null) {

        document.getElementById("eventName").innerHTML = obj.EventName;
        var eventStatus = obj.EventStatus;
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

        var eventMode = obj.EventMode;
        if (eventMode.toUpperCase() === 'BOOK') {
            document.getElementById("Book").checked = true
        } else if (eventMode.toUpperCase() === 'FIXTURE') {
            document.getElementById("Fixture").checked = true
        } else if (eventMode.toUpperCase() === 'OPEN') {
            document.getElementById("Open").checked = true
        }

        if (obj.RegistrationOpenFlag === 'YES') {
            document.getElementById("RegistrationToggleBtn").classList.remove('off');
            document.getElementById("RegistrationToggleBtn").classList.add('on');
            document.getElementById("RegistrationOn").classList.add('active');

        } else {
            document.getElementById("RegistrationToggleBtn").classList.remove('on');
            document.getElementById("RegistrationToggleBtn").classList.add('off');
            document.getElementById("RegistrationOff").classList.add('active');
        }

        if (obj.OnlinePaymentModeFlag === 'YES') {
            document.getElementById("paymentToggleBtn").classList.remove('off');
            document.getElementById("paymentToggleBtn").classList.add('on');
            document.getElementById("PaymentOn").classList.add('active');

        } else {
            document.getElementById("paymentToggleBtn").classList.remove('on');
            document.getElementById("paymentToggleBtn").classList.add('off');
            document.getElementById("PaymentOff").classList.add('active');
        }

        if (obj.ShowParticipantFlag === 'YES') {
            document.getElementById("showParticipantToggleBtn").classList.remove('off');
            document.getElementById("showParticipantToggleBtn").classList.add('on');
            document.getElementById("ShowParticipantsOn").classList.add('active');

        } else {
            document.getElementById("showParticipantToggleBtn").classList.remove('on');
            document.getElementById("showParticipantToggleBtn").classList.add('off');
            document.getElementById("ShowParticipantsOff").classList.add('active');
        }

        if (obj.ShowParticipantPostPaymentFlag === 'YES') {
            document.getElementById("showPostPaymentToggleBtn").classList.remove('off');
            document.getElementById("showPostPaymentToggleBtn").classList.add('on');
            document.getElementById("ShowParticipantsPostPaymentOn").classList.add('active');

        } else {
            document.getElementById("showPostPaymentToggleBtn").classList.remove('on');
            document.getElementById("showPostPaymentToggleBtn").classList.add('off');
            document.getElementById("ShowParticipantsPostPaymentOff").classList.add('active');
        }


        if (obj.DrawPublishedFlag === 'YES') {
            document.getElementById("DrawsToggleBtn").classList.remove('off');
            document.getElementById("DrawsToggleBtn").classList.add('on');
            document.getElementById("DrawsOn").classList.add('active');

        } else {
            document.getElementById("DrawsToggleBtn").classList.remove('on');
            document.getElementById("DrawsToggleBtn").classList.add('off');
            document.getElementById("DrawsOff").classList.add('active');
        }

        if (obj.PublishSeedEntryFlag === 'YES') {
            document.getElementById("SeedToggleBtn").classList.remove('off');
            document.getElementById("SeedToggleBtn").classList.add('on');
            document.getElementById("SeedOn").classList.add('active');

        } else {
            document.getElementById("SeedToggleBtn").classList.remove('on');
            document.getElementById("SeedToggleBtn").classList.add('off');
            document.getElementById("SeedOff").classList.add('active');
        }

        if (obj.PublishResultFlag === 'YES') {
            document.getElementById("ResultToggleBtn").classList.remove('off');
            document.getElementById("ResultToggleBtn").classList.add('on');
            document.getElementById("ResultOn").classList.add('active');

        } else {
            document.getElementById("ResultToggleBtn").classList.remove('on');
            document.getElementById("ResultToggleBtn").classList.add('off');
            document.getElementById("ResultOff").classList.add('active');
        }

        if (obj.PublishGalleryFlag === 'YES') {
            document.getElementById("gallaryToggleBtn").classList.remove('off');
            document.getElementById("gallaryToggleBtn").classList.add('on');
            document.getElementById("GalleryOn").classList.add('active');

        } else {
            document.getElementById("gallaryToggleBtn").classList.remove('on');
            document.getElementById("gallaryToggleBtn").classList.add('off');
            document.getElementById("GalleryOff").classList.add('active');
        }

        /*            
                                              
                    //category details
                    //CategoryDetailsDiv
                    catDetails = result.data.CategoryDetails;
                    document.getElementById("CategoryDetailsDiv").innerHTML = "";
                    for (i = 0; i < catDetails.length; i++) {
                        renderCategory(catDetails[i], i);
                    }
                    */

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

            var responceJSON = localStorage.getItem("eventDetails");

            let obj = JSON.parse(responceJSON);
            obj.EventStatus = EventStatus;
            responceJSON = JSON.stringify(obj);
            localStorage.setItem("eventDetails", responceJSON);

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
            var responceJSON = localStorage.getItem("eventDetails");

            let obj = JSON.parse(responceJSON);
            obj.EventMode = EventMode;
            responceJSON = JSON.stringify(obj);
            localStorage.setItem("eventDetails", responceJSON);


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
        var responceJSON = localStorage.getItem("eventDetails");
        let obj = JSON.parse(responceJSON);
        obj.RegistrationOpenFlag = flag;
        responceJSON = JSON.stringify(obj);
        localStorage.setItem("eventDetails", responceJSON);

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
        var responceJSON = localStorage.getItem("eventDetails");
        let obj = JSON.parse(responceJSON);
        obj.OnlinePaymentModeFlag = flag;
        responceJSON = JSON.stringify(obj);
        localStorage.setItem("eventDetails", responceJSON);

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
        var responceJSON = localStorage.getItem("eventDetails");
        let obj = JSON.parse(responceJSON);
        obj.ShowParticipantFlag = flag;
        responceJSON = JSON.stringify(obj);
        localStorage.setItem("eventDetails", responceJSON);

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
        var responceJSON = localStorage.getItem("eventDetails");
        let obj = JSON.parse(responceJSON);
        obj.ShowParticipantPostPaymentFlag = flag;
        responceJSON = JSON.stringify(obj);
        localStorage.setItem("eventDetails", responceJSON);

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
        var responceJSON = localStorage.getItem("eventDetails");
        let obj = JSON.parse(responceJSON);
        obj.DrawPublishedFlag = flag;
        responceJSON = JSON.stringify(obj);
        localStorage.setItem("eventDetails", responceJSON);

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
        var responceJSON = localStorage.getItem("eventDetails");
        let obj = JSON.parse(responceJSON);
        obj.PublishSeedEntryFlag = flag;
        responceJSON = JSON.stringify(obj);
        localStorage.setItem("eventDetails", responceJSON);

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
        var responceJSON = localStorage.getItem("eventDetails");
        let obj = JSON.parse(responceJSON);
        obj.PublishResultFlag = flag;
        responceJSON = JSON.stringify(obj);
        localStorage.setItem("eventDetails", responceJSON);

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
        var responceJSON = localStorage.getItem("eventDetails");
        let obj = JSON.parse(responceJSON);
        obj.PublishGalleryFlag = flag;
        responceJSON = JSON.stringify(obj);
        localStorage.setItem("eventDetails", responceJSON);

    });
};

