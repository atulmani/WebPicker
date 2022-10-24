var loggedinUser = "";
let eventDocUrl = new URL(location.href);
let searchParams = new URLSearchParams(eventDocUrl.search);
var eventID = searchParams.get('id');
var valList = [];
var RegisteredEventList = [];
auth.onAuthStateChanged(async firebaseUser => {
  try {
    if (firebaseUser) {
      loggedinUser = firebaseUser;
      //console.log(firebaseUser.uid);
      console.log('Logged-in user phone number: ' + loggedinUser.phoneNumber);
      //var ret = await getUserList();
      GetEventList();
      GetAllRegisteredEventList();
      GetProfileData();
    } else {
      loggedinUser = null;
      console.log('User has been logged out');
      window.location.href = "/login/index.html";
    }
  } catch (error) {
    console.log(error.message);
    //window.location.href = "index.html";
  }
});

async function GetProfileData() {
  console.log('GetProfileData - Starts');
  var userProfile = JSON.parse(localStorage.getItem("userProfile"));
  if (userProfile != undefined && userProfile != "" && userProfile != null) {
    if (userProfile.id != "0") {
      console.log(userProfile.UserName);

      document.getElementById("userName").value = userProfile.UserName;
      // document.getElementById("userlocation").innerHTML = userProfile.City;

      // if (userProfile.UserRole.findIndex(e => e.TYPE === "ADMIN") >= 0) {
      //   console.log("in admin");
      // } else if (userProfile.UserRole.findIndex(e => e.TYPE === "ORGANIZER") >= 0) {
      //   console.log("organizer");
      //   // document.getElementById("fInput").style.display="none";
      // } else {
      //   console.log("not admin");
      //   document.getElementById("containerOrgList").style.display = "none";
      //   document.getElementById("errorMessage").style.display = "block";
      // }
    }
  }

}

function GetEventList() {
  console.log(eventID);
  var para1 = {};
  para1 = {
    EventID: eventID,
    ParticipantID: loggedinUser.uid,
  };
  console.log(para1);
  const ret1 = functions.httpsCallable("getApplicableEvent");
  ret1(para1).then((result) => {
    var record1 = result.data;
    console.log(result.data);
    for (index = 0; index < result.data.length; index++) {
      var option = document.createElement("option");
      option.setAttribute("value", result.data[index].CategoryName + ":" +
        result.data[index].EventType + ":" +
        result.data[index].Fees + ":" +
        result.data[index].Gender + ":" +
        result.data[index].MaxTeamSize);

      option.innerHTML = result.data[index].CategoryName;
      document.getElementById("ddlCategory").appendChild(option);
    }
    //console.log(result.data);
  });
}

function renderEntry() {
  document.getElementById("tdRegistereEvent").innerHTML = "";
  for (index = 0; index < RegisteredEventList.length; index++) {
    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    td1.innerHTML = (index + 1);
    tr.appendChild(td1)

    var td2 = document.createElement("td");
    td2.innerHTML = RegisteredEventList[index].CategoryName;
    tr.appendChild(td2)

    var td3 = document.createElement("td");
    td3.innerHTML = RegisteredEventList[index].Fees;
    tr.appendChild(td3)

    var td4 = document.createElement("td");
    td4.innerHTML = RegisteredEventList[index].PaymentStatus;
    tr.appendChild(td4)

    var td4 = document.createElement("td");
    if (RegisteredEventList[index].PartnerList != undefined && RegisteredEventList[index].PartnerList != "") {
      td4.innerHTML = RegisteredEventList[index].PartnerList;
    } else {
      td4.innerHTML = "-";
    }
    tr.appendChild(td4)


    document.getElementById("tdRegistereEvent").appendChild(tr);
  }

}
function GetAllRegisteredEventList() {
  console.log(eventID);
  var para2 = {};
  para2 = {
    EventID: eventID,
    ParticipantID: loggedinUser.uid,
  };
  console.log(para2);
  const ret2 = functions.httpsCallable("getAllRegisteredEventList");

  ret2(para2).then((result1) => {
    console.log(result1.data);
    RegisteredEventList = result1.data;
    renderEntry();
    //console.log(result.data);
  });
}

function categoryChange() {
  var catList = document.getElementById("ddlCategory");
  var categoryValue = catList.options[catList.selectedIndex].value;
  var categoryText = catList.options[catList.selectedIndex].innerHTML;
  var split = categoryValue.split(":");
  console.log(split[4]);
  if (split[4] === "1") {
    document.getElementById("ddlPartner").disabled = true;
  } else {
    document.getElementById("ddlPartner").disabled = false;
  }

}

var btnSave = document.getElementById("btnSave");
btnSave.addEventListener('click', e => {
  e.preventDefault();
  var para1 = {};
  var catList = document.getElementById("ddlCategory");
  var categoryValue = catList.options[catList.selectedIndex].value;
  var categoryText = catList.options[catList.selectedIndex].innerHTML;
  var split = categoryValue.split(":");
  console.log(document.getElementById("userName").value);
  var iPos = RegisteredEventList.findIndex(e => e.CategoryName === split[0]);
  if (iPos < 0) {

    para1 = {
      EventID: eventID,
      ParticipantID: loggedinUser.uid,
      ParticipantName: document.getElementById("userName").value,
      CategoryName: split[0],
      EventType: split[1],
      Fees: Number(split[2]),
      Gender: split[3],
      MaxTeamSize: split[4]
    };
    console.log(para1);
    const ret1 = functions.httpsCallable("registerEvent");
    ret1(para1).then((result) => {
      var record1 = result.data;

      RegisteredEventList.push({
        EventID: eventID,
        ParticipantID: loggedinUser.uid,
        ParticipantName: document.getElementById("userName").value,
        CategoryName: split[0],
        EventType: split[1],
        Fees: Number(split[2]),
        Gender: split[3],
        MaxTeamSize: split[4],
        PaymentStatus: 'Pending',
        PartnerList: [],
      });

      var confirmMessage = document.getElementById("confirmationMessage");
      confirmMessage.innerHTML = "Event details saved Successfully !!";
      var message = document.getElementById("saveMessage");
      message.style.display = "block";

      renderEntry();
      setTimeout(function () {
        message.style.display = 'none';
      }, 5000);
    });
  }
  else {
    var confirmMessage = document.getElementById("confirmationMessage");
    confirmMessage.innerHTML = "Selected event is already registered";
    var message = document.getElementById("saveMessage");
    message.style.display = "block";

    setTimeout(function () {
      message.style.display = 'none';
    }, 5000);
  }
});
