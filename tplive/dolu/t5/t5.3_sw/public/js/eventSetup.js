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
    var para1 = {};
    para1 = {
        EventID: eventID,
    };
    console.log(para1);
    const ret1 = functions.httpsCallable("getEventDetails_forAdmin");
    ret1(para1).then((result) => {
        //var record1 = result.data;
        console.log(result.data);

        var options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        };
        console.log("Event EventName: " + result.data.EventName);
        if (result.data != undefined && result.data != null) {

            const responceJSON = JSON.stringify(result.data);
            localStorage.setItem("eventDetails", responceJSON);
            localStorage.setItem("eventID", eventID);
            document.getElementById("organizationName").value = result.data.OrganizationName;
            document.getElementById("eventNametb").value = result.data.EventName;
            document.getElementById("eventName").innerHTML = result.data.EventName;
            document.getElementById("venueName").value = result.data.EventVenue;
            document.getElementById("vanueContact").value = result.data.VenueContact;
            document.getElementById("vanueMap").value = result.data.LocationMap;
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

            /*            
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
            
            
                        //category details
                        //CategoryDetailsDiv
                        catDetails = result.data.CategoryDetails;
                        document.getElementById("CategoryDetailsDiv").innerHTML = "";
                        for (i = 0; i < catDetails.length; i++) {
                            renderCategory(catDetails[i], i);
                        }
                        */

        }
    });

}

function SaveEventDetails() {

    document.getElementById("hfEventID").value = eventID;
    var para1 = {};
    var orgName = document.getElementById('organizationName').value;
    var eventName = document.getElementById('eventNametb').value;
    var vanueName = document.getElementById('venueName').value;
    var vanueContact = document.getElementById('vanueContact').value;
    var vanueMap = document.getElementById('vanueMap').value;
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

        var responceJSON = localStorage.getItem("eventDetails");

        let obj = JSON.parse(responceJSON);
        obj.EventName = eventName;
        obj.OrganizationName = orgName;
        obj.EventVenue = vanueName;
        obj.VenueContact = vanueContact;
        obj.LocationMap = vanueMap;
        obj.RegistrationStartDate = new Date(RegistrationOpenDate);
        obj.RegistrationEndDate = new Date(RegistrationClosedDate);
        obj.WithdrawalEndDate = new Date(RegistrationWithdrawDate);
        obj.EventStartDate = new Date(EventStartDate);
        obj.EventEndDate = new Date(EventEndDate);
        obj.MaxEntryForParticipant = maxEntry;

        responceJSON = JSON.stringify(obj);
        document.getElementById('eventName').innerHTML = document.getElementById('eventNametb').value;
        localStorage.setItem("eventDetails", responceJSON);
        document.getElementById("errorMssage").innerHTML = "Details Saved Successfully!!";
        document.getElementById("errorMsg").style = "display:block";
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
        var responceJSON = localStorage.getItem("eventDetails");

        let obj = JSON.parse(responceJSON);
        obj.NoticeBoard = notice;

        responceJSON = JSON.stringify(obj);
        localStorage.setItem("eventDetails", responceJSON);

        document.getElementById("errorMssageNotice").innerHTML = "Details Saved Successfully!!";
        document.getElementById("errorMsgNotice").style = "display:block";

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
        var responceJSON = localStorage.getItem("eventDetails");

        let obj = JSON.parse(responceJSON);
        obj.Announcement = accouncement;
        responceJSON = JSON.stringify(obj);
        localStorage.setItem("eventDetails", responceJSON);

        document.getElementById("errorMssageAnnouncement").innerHTML = "Details Saved Successfully!!";
        document.getElementById("errorMsgAnnouncement").style = "display:block";

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
        var responceJSON = localStorage.getItem("eventDetails");

        let obj = JSON.parse(responceJSON);
        obj.RulesAndRegulations = RulesAndRegulations;
        responceJSON = JSON.stringify(obj);
        localStorage.setItem("eventDetails", responceJSON);

        document.getElementById("errorMssageRegulation").innerHTML = "Details Saved Successfully!!";
        document.getElementById("errorMsgRegulation").style = "display:block";

    });
}


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
        document.getElementById("errorMsg").style = "display:none";

    } else if (sectionName === 'Notice') {
        document.getElementById("btnNotice").classList.add('active');
        document.getElementById('detailsDiv').style.display = 'none';
        document.getElementById('noticeDiv').style.display = 'block';
        document.getElementById('accouncementDiv').style.display = 'none';
        document.getElementById('regulationDiv').style.display = 'none';
        document.getElementById("errorMsgNotice").style = "display:none";
    } else if (sectionName === 'Announcement') {
        document.getElementById("btnAnnouncement").classList.add('active');
        document.getElementById('detailsDiv').style.display = 'none';
        document.getElementById('noticeDiv').style.display = 'none';
        document.getElementById('accouncementDiv').style.display = 'block';
        document.getElementById('regulationDiv').style.display = 'none';
        document.getElementById("errorMsgAnnouncement").style = "display:none";
    } else if (sectionName === 'Regulation') {
        document.getElementById("btnRegulation").classList.add('active');
        document.getElementById('detailsDiv').style.display = 'none';
        document.getElementById('noticeDiv').style.display = 'none';
        document.getElementById('accouncementDiv').style.display = 'none';
        document.getElementById('regulationDiv').style.display = 'block';
        document.getElementById("errorMsgRegulation").style = "display:none";
    }
}
