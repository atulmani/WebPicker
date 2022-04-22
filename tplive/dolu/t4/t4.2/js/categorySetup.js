var loggedinUser = "";
let eventDocUrl = new URL(location.href);
let searchParams = new URLSearchParams(eventDocUrl.search);
var eventID = searchParams.get('id');
var valList = [];

auth.onAuthStateChanged(async firebaseUser => {
  try {
    if (firebaseUser) {
      loggedinUser = firebaseUser;
      //console.log(firebaseUser.uid);
      console.log('Logged-in user phone number: ' + loggedinUser.phoneNumber);
      //var ret = await getUserList();
      GetProfileData();
    } else {
      loggedinUser = null;
      console.log('User has been logged out');
      window.location.href = "../index.html";
    }
  } catch (error) {
    console.log(error.message);
    window.location.href = "../index.html";
  }
});

async function GetProfileData() {
  console.log('GetProfileData - Starts');
  var userProfile = JSON.parse(localStorage.getItem("userProfile"));
  if (userProfile != undefined && userProfile != "" && userProfile != null) {
    var approvalStatus = document.getElementById("approvalStatus");
    if (userProfile.UserRole.findIndex(e => e.TYPE === "ADMIN") >= 0) {
      console.log("in admin");
      GetEventDetails();
    } else if (userProfile.UserRole.findIndex(e => e.TYPE === "ORGANIZER") >= 0) {

      console.log("Organizer");
      GetEventDetails();
    } else {
      console.log("not admin");
      document.getElementById("fInput").style.display = "none";
      document.getElementById("errorMessage").style.display = "block";
    }
  } else {
    window.location.assign('../index.html');
  }

}

function GetEventDetails() {
  console.log(eventID);
  var para1 = {};
  para1 = {
    EventID: eventID
  };
  const ret1 = firebase.functions().httpsCallable("getEventCategoryDetails");
  ret1(para1).then((result) => {
    var record1 = result.data;
    console.log(result.data);

    document.getElementById("hfEventID").value = result.data.Eventid;
    valList = result.data.CategoryDetails;
    console.log(valList);
    document.getElementById("existingEventCategory").innerHTML = "";
    if (valList != null && valList != undefined) {
      for (index = 0; index < valList.length; index++) {
        renderCategory(valList[index], index);
      }
    }
    // var options = {
    //   year: 'numeric',
    //   month: 'short',
    //   day: 'numeric'
    // };

  });
}

function eventTypeChange() {
  var eventType = document.getElementById("ddlEventType");
  var eventTypeVal = eventType.options[eventType.selectedIndex].value;
  console.log(eventTypeVal);
  if (eventTypeVal === 'Single') {
    document.getElementById("maxTeamSize").value = 1;
    document.getElementById("maxTeamSize").disabled = true;
  } else if (eventTypeVal === 'Double') {
    document.getElementById("maxTeamSize").value = 2;
    document.getElementById("maxTeamSize").disabled = true;
  } else if (eventTypeVal === 'Team') {
    document.getElementById("maxTeamSize").value = 1;
    document.getElementById("maxTeamSize").disabled = false;
  }
}

var btnSaveinDB = document.getElementById("btnSaveinDB");
btnSaveinDB.addEventListener('click', e => {
  e.preventDefault();
  console.log(eventID);
  var para1 = {};
  para1 = {
    EventID: eventID,
    CategoryDetails: valList,
  };
  const ret1 = firebase.functions().httpsCallable("setEventCategoryDetails");
  ret1(para1).then((result) => {
    // var record1 = result.data;
    // console.log(result.data);
    //
    // document.getElementById("hfEventID").value = result.data.Eventid;
    // valList = result.data.CategoryDetails;

  });
});
var btnSave = document.getElementById("btnSave");
btnSave.addEventListener('click', e => {
  e.preventDefault();
  var categoryName = document.getElementById("categoryName").value;
  var ogender = document.getElementById("ddlGender");
  var gender = ogender.options[ogender.selectedIndex].value;

  var oeventType = document.getElementById("ddlEventType");
  var eventType = oeventType.options[oeventType.selectedIndex].value;

  var maxTeamSize = document.getElementById("maxTeamSize").value;

  var referenceDate = document.getElementById("ReferenceDate").value;
  var oddlDateRef = document.getElementById("ddlDateRef");
  var dateRef = oddlDateRef.options[oddlDateRef.selectedIndex].value;
console.log(valList);
  if(valList != null && valList != undefined)
  {
  var selIndex = valList.findIndex(e => e.CategoryName === categoryName);
  if (selIndex >= 0) {
    valList.splice(selIndex, 1);
  }
}
else {
  valList = [];
}

  valList.push({
    CategoryName: categoryName,
    Gender: gender,
    EventType: eventType,
    MaxTeamSize: maxTeamSize,
    ReferenceDate: referenceDate,
    DateRefType: dateRef

  });
  console.log(valList);
  document.getElementById("existingEventCategory").innerHTML = "";
  for (index = 0; index < valList.length; index++) {
    renderCategory(valList[index], index);
  }
});


function renderCategory(obj, index) {
  var div1 = document.createElement("div");
  div1.setAttribute("class", "form-group col-md-6");

  var div2 = document.createElement("div");
  div2.setAttribute("class", "item");

  var div3 = document.createElement("div");
  div3.setAttribute("class", "post-slide");

  var div4 = document.createElement("div");
  div4.setAttribute("class", "post-content");

  var h1 = document.createElement("h3");
  h1.setAttribute("class", "post-title");
  h1.setAttribute("style", "font-weight:bold");
  h1.innerHTML = obj.CategoryName;

  div4.appendChild(h1);

  var p1 = document.createElement("p");
  p1.setAttribute("class", "description");

  var span1 = document.createElement("span");
  span1.setAttribute("style", "font-weight:bold");
  span1.innerHTML = obj.Gender + " - " + obj.EventType;

  p1.appendChild(span1);
  var br1 = document.createElement("br");
  p1.appendChild(br1);

  var span2 = document.createElement("span");
  span2.setAttribute("style", "letter-spacing:1px;");
  span2.innerHTML = "Born " + obj.DateRefType + " : " + obj.ReferenceDate;

  p1.appendChild(span2);
  var br2 = document.createElement("br");
  p1.appendChild(br2);

  var span3 = document.createElement("span");
  span3.setAttribute("style", "letter-spacing:1px;");
  span3.innerHTML = "Max Team Size :" + obj.MaxTeamSize;

  p1.appendChild(span3);
  var br3 = document.createElement("br");
  p1.appendChild(br3);

  var i1 = document.createElement("i");
  i1.setAttribute("onclick", "EditCategoryDetails(" + index + ");");
  i1.setAttribute("class", "far fa-edit address-edit-icon");
  i1.setAttribute("style", "padding: 0 5px 0 5px;");
  p1.appendChild(i1);

  var i2 = document.createElement("i");
  i2.setAttribute("onclick", "DeleteCategoryDetails(" + index + ");");
  i2.setAttribute("class", "far fa-trash address-edit-icon");
  i2.setAttribute("style", "padding: 0 5px 0 5px;");
  p1.appendChild(i2);
  //
  // var br4 = document.createElement("br");
  // p1.appendChild(br4);
  div4.appendChild(p1);
  div3.appendChild(div4);
  div2.appendChild(div3);
  div1.appendChild(div2);
  document.getElementById("existingEventCategory").appendChild(div1);
}

function EditCategoryDetails(index) {
  console.log(index);
  console.log(valList[index]);
  document.getElementById("categoryName").value = valList[index].CategoryName;
  var ogender = document.getElementById("ddlGender");
  for (rCnt = 0; rCnt < ogender.length; rCnt++) {
    ogender.options[rCnt].value;
    if (ogender.options[rCnt].value === valList[index].Gender)
      ogender.options[rCnt].selected = true;
  }
  var oeventType = document.getElementById("ddlEventType");
  for (rCnt = 0; rCnt < oeventType.length; rCnt++) {
    if (oeventType.options[rCnt].value === valList[index].EventType)
      oeventType.options[rCnt].selected = true;
  }
  document.getElementById("maxTeamSize").value = valList[index].MaxTeamSize;

  document.getElementById("ReferenceDate").value = valList[index].ReferenceDate;
  var oddlDateRef = document.getElementById("ddlDateRef");
  for (rCnt = 0; rCnt < oddlDateRef.length; rCnt++) {
    if (oddlDateRef.options[rCnt].value === valList[index].DateRefType)
      oddlDateRef.options[rCnt].selected = true;
  }
}

function DeleteCategoryDetails(index) {
  valList.splice(index, 1);
  console.log(valList);
  document.getElementById("existingEventCategory").innerHTML = "";
  for (index = 0; index < valList.length; index++) {
    renderCategory(valList[index], index);
  }
}
