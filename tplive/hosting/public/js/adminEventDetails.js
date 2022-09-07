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
