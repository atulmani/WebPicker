
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

function saveEventStatus() {
    //save detailes in DB
    var EventID = document.getElementById("hfEventID").value;

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
});
