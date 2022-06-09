let eventDocUrl = new URL(location.href);
let searchParams = new URLSearchParams(eventDocUrl.search);
var eventID = searchParams.get('id');

window.onload = function() {

  // getEventCategory();
  if (eventID === "" || eventID === undefined || eventID === null)
    eventID = localStorage.getItem("EventID");
  if (eventID === "" || eventID === undefined || eventID === null) {
    window.location.href = "eventList.html";
  } else {
    localStorage.setItem("EventID", eventID);
  }
  document.getElementById("hfEventID").value = eventID;
  getEventDetails();
  getEventCategory();
};

async function getEventDetails() {
  var para1 = {};
  para1 = {
    EventID: eventID
  };

  var options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  var eventDetails = JSON.parse(localStorage.getItem("eventDetails"));
  console.log(eventDetails);
  if (eventDetails === null) {
    const ret1 = await firebase.functions().httpsCallable("getEventDetails");
    ret1(para1).then((result) => {
      eventDetails = result.data
      console.log(result.data);
      localStorage.setItem("eventDetails", JSON.stringify(result.data));
    });
  } else {
    if (eventDetails.Eventid != eventID) {
      //get entry details
      const ret1 = await firebase.functions().httpsCallable("getEventDetails");
      ret1(para1).then((result) => {
        eventDetails = result.data
        console.log(result.data);
        localStorage.setItem("eventDetails", JSON.stringify(result.data));
      });
    }
  }
  console.log(eventDetails);
  document.getElementById("organiserName").innerHTML = eventDetails.EventOwnerName;

  if (eventDetails.EventStartDate != "" && eventDetails.EventStartDate != undefined && eventDetails.EventStartDate != null)
    document.getElementById("eventstartdate").innerHTML = new Date(eventDetails.EventStartDate._seconds * 1000).toLocaleDateString("en-US", options);
  if (eventDetails.EventEndDate != "" && eventDetails.EventEndDate != undefined && eventDetails.EventEndDate != null)
    document.getElementById("eventenddate").innerHTML = new Date(eventDetails.EventEndDate._seconds * 1000).toLocaleDateString("en-US", options);

  document.getElementById("eventprice").innerHTML = eventDetails.MinimumFee + " - " + eventDetails.MaximumFee;

  document.getElementById("eventVenue").innerHTML = eventDetails.EventVenue;
  document.getElementById("eventVenue").innerHTML = eventDetails.EventVenue;
  document.getElementById("organiser-email").innerHTML = eventDetails.EventOwnerEmail;
  document.getElementById("organiser-phone").innerHTML = eventDetails.EventOwnerPhone;

  if (eventDetails.WithdrawalEndDate != "" && eventDetails.WithdrawalEndDate != undefined && eventDetails.WithdrawalEndDate != null)
    document.getElementById("withdrawDate").innerHTML = new Date(eventDetails.WithdrawalEndDate._seconds * 1000).toLocaleDateString("en-US", options);


}
async function getEventCategory() {

  var para1 = {};
  para1 = {
    EventID: eventID
  };
  var entryDetails = [];
  var eventCategory = JSON.parse(localStorage.getItem("eventCategory"));
  console.log(eventCategory);
  if (eventCategory.EventID != eventID) {
    //get entry details
    var catList = "";
    const ret1 = await firebase.functions().httpsCallable("getEventCategoryDetails");
    ret1(para1).then((result) => {
      eventCategory = result.data
      console.log(result.data);
      localStorage.setItem("eventCategory", JSON.stringify(result.data));
    });
  }
  var eCategory = "";
  if (eventCategory.CategoryDetails != null && eventCategory.CategoryDetails != undefined) {
    if (eventCategory.CategoryDetails.length > 0) {
      console.log(para1);
      const ret2 = firebase.functions().httpsCallable("getAllEventEntryCount");
      ret2(para1).then((result1) => {
        var entryDetails = result1.data;
        for (index = 0; index < eventCategory.CategoryDetails.length; index++) {
          var inPos = entryDetails.findIndex(e => e.CategoryName === eventCategory.CategoryDetails[index].CategoryName);
          if (inPos >= 0) {
            console.log("line1");
            renderCategory(index, eventCategory.CategoryDetails[index].CategoryName, entryDetails[inPos].EntryCount);
          } else {
            console.log("line2");
            renderCategory(index, eventCategory.CategoryDetails[index].CategoryName, 0);
          }
          eCategory = eCategory + eventCategory.CategoryDetails[index].CategoryName + " ,";
        }
        document.getElementById("eventCategory").innerHTML = eCategory;
      });
    }
  }

}

function renderCategory(index, CategoryName, EntryCnt) {
  var tr = document.createElement("tr");
  var td1 = document.createElement("td");
  td1.innerHTML = index + 1;
  tr.appendChild(td1);

  var td2 = document.createElement("td");
  td2.innerHTML = CategoryName;
  tr.appendChild(td2);

  var td3 = document.createElement("td");
  var anchor = document.createElement("a");
  // anchor.setAttribute("href", "participantDetail.html?categoryName="+CategoryName);
  anchor.setAttribute("href", "participantDetail.html?categoryName=" + CategoryName);
  anchor.innerHTML = EntryCnt;
  td3.appendChild(anchor);
  tr.appendChild(td3);

  document.getElementById("tdCategory").appendChild(tr);
}


function btnBookingClick()
{
  //e.preventDefault();
  window.location.href = "eventRegistration.html?id=" + document.getElementById("hfEventID").value;
};
