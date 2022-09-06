var loggedinUser = "";
var cntActive = 0;
var cntClosed = 0;
var cntOthers = 0;

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
      // document.getElementById("userName").innerHTML = result.data.UserName

      if (userProfile.UserRole.findIndex(e => e.TYPE === "ADMIN") >= 0) {
        console.log("in admin");
        populateEventList("All");
      } else if (userProfile.UserRole.findIndex(e => e.TYPE === "ORGANIZER") >= 0) {
        console.log("organizer");
        populateEventList(loggedinUser.uid);
        // document.getElementById("fInput").style.display="none";
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

function changestatus(status) {
  var btnActive = document.getElementById("btnActive");
  var btnClose = document.getElementById("btnClose");
  var btnOthers = document.getElementById("btnOthers");

  btnActive.classList.remove("active");
  btnClose.classList.remove("active");
  btnOthers.classList.remove("active");
  var activeList = document.getElementsByClassName('statusActive');
  var closeList = document.getElementsByClassName('statusClosed');
  var othersList = document.getElementsByClassName('statusOthers');

  for (let i = 0; i < activeList.length; i++) {
    activeList[i].style.display = "none";
  }

  for (let i = 0; i < closeList.length; i++) {
    closeList[i].style.display = "none";
  }

  for (let i = 0; i < othersList.length; i++) {
    othersList[i].style.display = "none";
  }


  if (status === 'Active') {
    btnActive.classList.add("active");
    for (let i = 0; i < activeList.length; i++) {
      activeList[i].style.display = "block";
    }

  } else if (status === 'Closed') {
    btnClose.classList.add("active");

    for (let i = 0; i < closeList.length; i++) {
      closeList[i].style.display = "block";
    }
  } else if (status === 'Others') {
    btnOthers.classList.add("active");

    for (let i = 0; i < othersList.length; i++) {
      othersList[i].style.display = "block";
    }
  }

}

function changestatussmall(status) {
  var btnActiveSmall = document.getElementById("btnActiveSmall");
  var btnCloseSmall = document.getElementById("btnCloseSmall");
  var btnOthersSmall = document.getElementById("btnOthersSmall");

  btnActiveSmall.classList.remove("active");
  btnCloseSmall.classList.remove("active");
  btnOthersSmall.classList.remove("active");

  var activeList = document.getElementsByClassName('statusActive');
  var closeList = document.getElementsByClassName('statusClosed');
  var othersList = document.getElementsByClassName('statusOthers');

  for (let i = 0; i < activeList.length; i++) {
    activeList[i].style.display = "none";
  }

  for (let i = 0; i < closeList.length; i++) {
    closeList[i].style.display = "none";
  }

  for (let i = 0; i < othersList.length; i++) {
    othersList[i].style.display = "none";
  }


  if (status === 'Active') {
    btnActiveSmall.classList.add("active");
    for (let i = 0; i < activeList.length; i++) {
      activeList[i].style.display = "block";
    }
  } else if (status === 'Closed') {
    btnCloseSmall.classList.add("active");
    for (let i = 0; i < closeList.length; i++) {
      closeList[i].style.display = "block";
    }
  } else if (status === 'Others') {
    btnOthersSmall.classList.add("active");
    for (let i = 0; i < othersList.length; i++) {
      othersList[i].style.display = "block";
    }
  }

}
//
// async function GetProfileDataOld() {
//   console.log('GetProfileData - Starts');
//
//   var para1 = {};
//   para1 = {
//     userID: loggedinUser.uid
//   };
//   const ret1 = firebase.functions().httpsCallable("getProfileDetails");
//   ret1(para1).then((result) => {
//     var record1 = result.data;
//     console.log(result.data);
//     if (result.data.id != "0") {
//       // document.getElementById("userName").innerHTML = result.data.UserName
//
//       if (result.data.UserRole.findIndex(e => e.TYPE === "ADMIN") >= 0) {
//         console.log("in admin");
//         populateEventList("All");
//       } else if (result.data.UserRole.findIndex(e => e.TYPE === "ORGANIZER") >= 0) {
//         console.log("organizer");
//         populateEventList(loggedinUser.uid);
//         // document.getElementById("fInput").style.display="none";
//       } else {
//         console.log("not admin");
//         document.getElementById("containerOrgList").style.display = "none";
//         document.getElementById("errorMessage").style.display = "block";
//       }
//     } else {
//       console.log("not admin");
//       document.getElementById("containerOrgList").style.display = "none";
//       document.getElementById("errorMessage").style.display = "block";
//     }
//   });
//
// }


function SelectCityChange1() {
  var objCiy = document.getElementById("citySelect1");
  var cityName = objCiy.options[objCiy.selectedIndex].value;

  poulateEventByCity(cityName)
}

function SelectCityChange2() {
  var objCiy = document.getElementById("citySelect2");
  var cityName = objCiy.options[objCiy.selectedIndex].value;

  poulateEventByCity(cityName)
}
function addCreateEventDiv() {
  changestatussmall('Active');
  changestatus('Active');
  cntActive = 0;
  cntClosed = 0;
  cntOthers = 0;

  var div1 = document.createElement("div");
  div1.setAttribute("class", "col-lg-4 col-md-6 col-sm-12");
  div1.setAttribute("style", "padding: 10px 15px;");

  var div2 = document.createElement("a");
  div2.setAttribute("href", "eventCreate.html");
  div2.setAttribute("class", "event-list-card");
  div2.setAttribute("style", "border: none;");

  var div3 = document.createElement("div");
  div3.setAttribute("class", "add-new");

  var span1 = document.createElement("span");
  span1.setAttribute("class", "material-symbols-outlined");
  span1.innerHTML = "add";
  div3.appendChild(span1);

  var h1 = document.createElement("h1");
  h1.innerHTML = "Create Event";
  div3.appendChild(h1);
  div2.appendChild(div3);
  div1.appendChild(div2);
  document.getElementById("eventPlaceholder").appendChild(div1);

}
function poulateEventByCity(cityName) {
  var para = {};
  console.log(cityName);
  para = {
    City: cityName
  };
  console.log(para);
  var ret = "";
  if (cityName === "All") {
    // ret = firebase.functions().httpsCallable("getAllEventDetails");
    ret = functions.httpsCallable("getAllEventDetails");

  } else {
    // ret = firebase.functions().httpsCallable("getAllEventDetailsForOrganizer");
    ret = functions.httpsCallable("getAllEventDetailsByCity");

  }
  ret(para).then(results => {
    console.log("From Function " + results.data.length);
    document.getElementById("eventPlaceholder").innerHTML = "";
    addCreateEventDiv();
    // console.log("From Function " + results.data[0].resultsid);
    for (index = 0; index < results.data.length; index++) {
      // console.log(results.data[index]);
      RenderEventDetails(index, results.data[index]);
    }
    console.log('cntActive : ', cntActive);
    console.log('cntClosed : ', cntClosed);
    console.log('cntOthers : ', cntOthers);

    document.getElementById("active1").innerHTML = cntActive;
    document.getElementById("active2").innerHTML = cntActive;
    document.getElementById("active3").innerHTML = cntActive;
    document.getElementById("active4").innerHTML = cntActive;

    document.getElementById("close1").innerHTML = cntClosed;
    document.getElementById("close2").innerHTML = cntClosed;
    document.getElementById("close3").innerHTML = cntClosed;
    document.getElementById("close4").innerHTML = cntClosed;

    document.getElementById("others1").innerHTML = cntOthers;
    document.getElementById("others2").innerHTML = cntOthers;
    document.getElementById("others3").innerHTML = cntOthers;
    document.getElementById("others4").innerHTML = cntOthers;

  });
}

function populateEventList(userid) {
  var para = {};
  console.log(userid);
  para = {
    organizerID: loggedinUser.uid
  };
  console.log(para);
  var ret = "";
  if (userid === "All") {
    // ret = firebase.functions().httpsCallable("getAllEventDetails");
    ret = functions.httpsCallable("getAllEventDetails");

  } else {
    // ret = firebase.functions().httpsCallable("getAllEventDetailsForOrganizer");
    ret = functions.httpsCallable("getAllEventDetailsForOrganizer");

  }
  ret(para).then(results => {
    console.log("From Function " + results.data.length);
    // console.log("From Function " + results.data[0].resultsid);
    document.getElementById("eventPlaceholder").innerHTML = "";
    addCreateEventDiv();

    for (index = 0; index < results.data.length; index++) {
      // console.log(results.data[index]);
      RenderEventDetails(index, results.data[index]);
    }
    console.log('cntActive : ', cntActive);
    console.log('cntClosed : ', cntClosed);
    console.log('cntOthers : ', cntOthers);

    document.getElementById("active1").innerHTML = cntActive;
    document.getElementById("active2").innerHTML = cntActive;
    document.getElementById("active3").innerHTML = cntActive;
    document.getElementById("active4").innerHTML = cntActive;

    document.getElementById("close1").innerHTML = cntClosed;
    document.getElementById("close2").innerHTML = cntClosed;
    document.getElementById("close3").innerHTML = cntClosed;
    document.getElementById("close4").innerHTML = cntClosed;

    document.getElementById("others1").innerHTML = cntOthers;
    document.getElementById("others2").innerHTML = cntOthers;
    document.getElementById("others3").innerHTML = cntOthers;
    document.getElementById("others4").innerHTML = cntOthers;

  });
}

function fullcard(arrowVar) {
  // console.log(arrowVar).;
  arrowVar.classList.toggle('active');

}

function RenderEventDetails(index, doc) {

  var curFormat = {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  };

  var options = {
    year: '2-digit',
    // year: 'numeric',
    month: 'short',
    day: 'numeric'
  };

  var div1 = document.createElement("div");
  if (doc.EventStatus === 'Active') {
    cntActive = cntActive + 1;
    div1.setAttribute("class", "col-lg-4 col-md-6 col-sm-12 statusActive");

    div1.setAttribute("style", "padding:10px 15px; display:block;");

  } else if (doc.EventStatus === 'Closed') {
    cntClosed = cntClosed + 1;
    div1.setAttribute("class", "col-lg-4 col-md-6 col-sm-12 statusClosed");

    div1.setAttribute("style", "padding:10px 15px; display:none;");

  } else {
    cntOthers = cntOthers + 1;
    div1.setAttribute("class", "col-lg-4 col-md-6 col-sm-12 statusOthers");

    div1.setAttribute("style", "padding:10px 15px; display:none;");

  }


  var div2 = document.createElement("a");
  div2.setAttribute("class", "event-list-card");
  div2.setAttribute("href", "eventDetails.html?id=" + doc.Eventid);
  if (doc.EventStatus === 'Active') {

    div2.setAttribute("style", "border-top: 3px solid green;");
  } else if (doc.EventStatus === 'Closed') {

    div2.setAttribute("style", "border-top: 3px solid orange;");
  } else {

    div2.setAttribute("style", "border-top: 3px solid red;");
  }

  var div3 = document.createElement("div");
  div3.setAttribute("class", "");

  var hf1 = document.createElement("input");
  hf1.setAttribute("type", "hidden");
  hf1.value = doc.Eventid;

  div3.appendChild(hf1);

  var h11 = document.createElement("h1");
  h11.innerHTML = doc.EventName;
  div3.appendChild(h11);

  var h12 = document.createElement("h2");
  h12.innerHTML = doc.OrganizationName;
  div3.appendChild(h12);

  var h13 = document.createElement("h3");

  var valString = "";
  if (doc.EventStartDate != undefined && doc.EventStartDate != null && doc.EventStartDate != "") {
    var refsdate = new Date(doc.EventStartDate._seconds * 1000);
    valString = refsdate.toLocaleDateString("en-IN", options);
  }
  if (doc.EventEndDate != undefined && doc.EventEndDate != null && doc.EventEndDate != "" && doc.EventEndDate != doc.EventStartDate) {
    var refedate = new Date(doc.EventStartDate._seconds * 1000);
    valString = valString + " to " + refedate.toLocaleDateString("en-IN", options);
  }

  valString = valString + " | " + doc.City;
  h13.innerHTML = valString;

  div3.appendChild(h13);
  div2.appendChild(div3);

  var div4 = document.createElement("div");
  div4.setAttribute("class", "event-id");

  var h15 = document.createElement("h5");
  h15.innerHTML = doc.EventCode;
  div4.appendChild(h15);

  div2.appendChild(div4);

  var div5 = document.createElement("div");
  div5.setAttribute("class", "second-div");
  div5.setAttribute("style", "min-width: 27%;t;ext-align: center;");

  var h16 = document.createElement("h4");
  if (doc.EntryCount != undefined && doc.EntryCount != null && doc.EntryCount != "") {
    var cntEntry = 1234;
    h16.innerHTML = cntEntry; //doc.EntryCount;
  } else {
    h16.innerHTML = "12345"
  }
  div5.appendChild(h16);

  var div6 = document.createElement("div");
  div6.setAttribute("class", "");
  div6.setAttribute("style", "position: relative;display: flex;align-items: center;justify-content: space-between;");

  var div7 = document.createElement("div");
  div7.setAttribute("class", "");
  var completedPayment = 123400;
  var span1 = document.createElement("span");
  span1.setAttribute("style", "color: green;");
  span1.innerHTML = Number(completedPayment).toLocaleString('en-IN', curFormat);

  div7.appendChild(span1);
  var br1 = document.createElement("br");
  div7.appendChild(br1);

  var completedCnt = 456;
  var small1 = document.createElement("small");
  small1.innerHTML = "(" + completedCnt + ")";
  div7.appendChild(small1);

  div6.appendChild(div7);

  var span2 = document.createElement("span");
  span2.setAttribute("class", "entries-pipe");
  span2.setAttribute("style", "font-weight: lighter;font-size: 2rem;");
  span2.innerHTML = "|";

  div6.appendChild(span2);

  var div8 = document.createElement("div");
  div8.setAttribute("class", "");
  var pendingPayment = 50000;
  var span3 = document.createElement("span");
  span3.setAttribute("style", "color: orange;");
  span3.innerHTML = Number(pendingPayment).toLocaleString('en-IN', curFormat)

  div8.appendChild(span3);
  var br2 = document.createElement("br");
  div8.appendChild(br2);


  var pendingCnt = 456;
  var small2 = document.createElement("small");
  small2.innerHTML = "(" + pendingCnt + ")";
  div8.appendChild(small2);

  div6.appendChild(div8);
  div5.appendChild(div6);
  div2.appendChild(div5);
  div1.appendChild(div2);

  document.getElementById("eventPlaceholder").appendChild(div1);

}
// function RenderEventDetailsOld(index, doc) {
//   // console.log(index, doc);
//   var div1 = document.createElement("div");
//   div1.setAttribute("class", "col-lg-4");
//   div1.setAttribute("style", "display: flex; justify-content: center; padding:2%");
//
//   var div2 = document.createElement("div");
//   div2.setAttribute("id", "arrowEvent" + index);
//   div2.setAttribute("class", "dashboardCardBoxOrg");
//
//   var div3 = document.createElement("div");
//   div3.setAttribute("onclick", "fullcard(arrowEvent" + index + ")");
//   div3.setAttribute("class", "");
//
//   var div4 = document.createElement("div");
//   div4.setAttribute("class", "createEventCircleother");
//
//   var img = document.createElement("img");
//   img.setAttribute("style", "height:80px; border-radius:50%;");
//   img.setAttribute("alt", "");
//   img.setAttribute("src", "../img/e3.png");
//   // img.setAttribute("src",doc.profileImage);
//
//   div4.appendChild(img);
//
//   div3.appendChild(div4);
//
//   var div5 = document.createElement("div");
//   div5.setAttribute("class", "bigNum");
//
//   var h1 = document.createElement("h3");
//
//   var span1 = document.createElement("span");
//   span1.innerHTML = "0";
//   // span1.innerHTML = doc.NumberOfEvent;
//   h1.appendChild(span1);
//
//   var span2 = document.createElement("span");
//   span2.setAttribute("class", "material-icons-outlined");
//   span2.innerHTML = "expand_more";
//   h1.appendChild(span2);
//   div5.appendChild(h1);
//
//   var h2 = document.createElement("h6");
//   // h2.innerHTML = "Total Events Conducted";
//   h2.innerHTML = doc.EventCode;
//   div5.appendChild(h2);
//   console.log(doc.Eventid);
//   var hf = document.createElement("input");
//   hf.setAttribute("id", "hfEventID" + index);
//   hf.setAttribute("type", "hidden");
//   hf.setAttribute("value", doc.Eventid);
//   div3.appendChild(hf);
//
//   var i1 = document.createElement("i");
//   i1.setAttribute("onclick", "GetEventDetails(" + index + ");");
//   i1.setAttribute("class", "far fa-edit address-edit-icon");
//   i1.setAttribute("style", "padding: 0 5px 0 5px;bottom:0px;z-index:0;");
//
//   div3.appendChild(i1);
//
//   div3.appendChild(div5);
//
//   div2.appendChild(div3);
//
//   var div6 = document.createElement("div");
//   div6.setAttribute("class", "dashboardCardAnalytics");
//
//   var div7 = document.createElement("div");
//   div7.setAttribute("class", "analyticsLineorg");
//
//   var span3 = document.createElement("span");
//   span3.setAttribute("class", "analyticsSpanHead");
//
//   var span4 = document.createElement("span");
//   span4.setAttribute("class", "analyticsSpanHeadValue");
//   span4.innerHTML = doc.EventName;
//
//   span3.innerHTML = "Event Name :- ";
//   span3.appendChild(span4);
//
//   div7.appendChild(span3);
//   div6.appendChild(div7);
//
//   var div8 = document.createElement("div");
//   div8.setAttribute("class", "analyticsLineorg");
//
//   var span5 = document.createElement("span");
//   span5.setAttribute("class", "analyticsSpanHead");
//
//   var span6 = document.createElement("span");
//   span6.setAttribute("class", "analyticsSpanHeadValue");
//   span6.innerHTML = doc.EventVenue;
//
//   span5.innerHTML = "Venue :- ";
//   span5.appendChild(span6);
//
//   div8.appendChild(span5);
//   div6.appendChild(div8);
//
//   var div9 = document.createElement("div");
//   div9.setAttribute("class", "analyticsLineorg");
//
//   var span7 = document.createElement("span");
//   span7.setAttribute("class", "analyticsSpanHead");
//
//   var span8 = document.createElement("span");
//   span8.setAttribute("class", "analyticsSpanHeadValue");
//   span8.innerHTML = '30-May-2022';
//   // span8.innerHTML = doc.EventDate;
//
//   span7.innerHTML = "Event Date :- ";
//   span7.appendChild(span8);
//
//   div9.appendChild(span7);
//   div6.appendChild(div9);
//
//   var div10 = document.createElement("div");
//   div10.setAttribute("class", "analyticsLineorg");
//
//   var span9 = document.createElement("span");
//   span9.setAttribute("class", "analyticsSpanHead");
//
//   var span10 = document.createElement("span");
//   span10.setAttribute("class", "analyticsSpanHeadValue");
//   span10.innerHTML = doc.EventOwnerName;
//
//   span9.innerHTML = "Event Owner Name :- ";
//   span9.appendChild(span10);
//
//   div10.appendChild(span9);
//   div6.appendChild(div10);
//
//   var div11 = document.createElement("div");
//   div11.setAttribute("class", "analyticsLineorg");
//
//   var span11 = document.createElement("span");
//   span11.setAttribute("class", "analyticsSpanHead");
//
//   var span12 = document.createElement("span");
//   span12.setAttribute("class", "analyticsSpanHeadValue");
//   span12.innerHTML = 'Yet to Start';
//   // span12.innerHTML = doc.EventStatus;
//
//   span11.innerHTML = "Event Status :- ";
//   span11.appendChild(span12);
//
//   div11.appendChild(span11);
//   div6.appendChild(div11);
//
//   div2.appendChild(div6);
//
//   div1.appendChild(div2);
//
//   document.getElementById("eventListDiv").appendChild(div1);
// }


function GetEventDetails(index) {
  var hfid = document.getElementById("hfEventID" + index);
  console.log(hfid);
  window.location.href = "eventUpdate.html?id=" + hfid.value;

}
