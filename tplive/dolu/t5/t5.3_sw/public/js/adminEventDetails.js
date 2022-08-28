let eventDocUrl = new URL(location.href);
let searchParams = new URLSearchParams(eventDocUrl.search);
var eventID = searchParams.get('id');
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
            document.getElementById("valueContact").value = result.data.VenueContact;
            document.getElementById("valueMap").value = result.data.LocationMap;

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



        }
    });

}