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
    } else {
      loggedinUser = null;
      console.log('User has been logged out');
      //window.location.href = "index.html";
    }
  } catch (error) {
    console.log(error.message);
    //window.location.href = "index.html";
  }
});

function GetEventList() {
  console.log(eventID);
  var para1 = {};
  para1 = {
    EventID: eventID,
    ParticipantID: loggedinUser.uid,
  };
  console.log(para1);
  const ret1 = firebase.functions().httpsCallable("getApplicableEvent");
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

function GetAllRegisteredEventList() {
  console.log(eventID);
  var para2 = {};
  para2 = {
    EventID: eventID,
    ParticipantID: loggedinUser.uid,
  };
  console.log(para2);
  const ret2 = firebase.functions().httpsCallable("getAllRegisteredEventList");
  ret2(para2).then((result1) => {
    console.log(result1.data);
    RegisteredEventList = result1.data;
    for (index = 0; index < result1.data.length; index++) {
      var tr = document.createElement("tr");
      var td1 = document.createElement("td");
      td1.innerHTML = (index + 1);
      tr.appendChild(td1)

      var td2 = document.createElement("td");
      td2.innerHTML = result1.data[index].CategoryName;
      tr.appendChild(td2)

      var td3 = document.createElement("td");
      td3.innerHTML = result1.data[index].Fees;
      tr.appendChild(td3)

      var td4 = document.createElement("td");
      td4.innerHTML = result1.data[index].PaymentStatus;
      tr.appendChild(td4)

      var td4 = document.createElement("td");
      if (result1.data[index].PartnerList != undefined && result1.data[index].PartnerList != "") {
        td4.innerHTML = result1.data[index].PartnerList;
      } else {
        td4.innerHTML = "-";
      }
      tr.appendChild(td4)


      document.getElementById("tdRegistereEvent").appendChild(tr);
    }
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

var iPos = RegisteredEventList.findIndex(e=>e.CategoryName === split[0]);
if(iPos < 0 )
{

  para1 = {
    EventID: eventID,
    ParticipantID: loggedinUser.uid,
    CategoryName: split[0],
    EventType: split[1],
    Fees: Number(split[2]),
    Gender: split[3],
    MaxTeamSize: split[4]
  };
  console.log(para1);
  const ret1 = firebase.functions().httpsCallable("registerEvent");
  ret1(para1).then((result) => {
    var record1 = result.data;

    RegisteredEventList.push({
      EventID: eventID,
      ParticipantID: loggedinUser.uid,
      CategoryName: split[0],
      EventType: split[1],
      Fees: Number(split[2]),
      Gender: split[3],
      MaxTeamSize: split[4],
      PaymentStatus : 'Pending',
      PartnerList : [],
    });

    var confirmMessage = document.getElementById("confirmationMessage");
    confirmMessage.innerHTML = "Event details saved Successfully !!";
    var message = document.getElementById("saveMessage");
    message.style.display = "block";

    setTimeout(function() {
      message.style.display = 'none';
    }, 5000);
  });
}
else {
  var confirmMessage = document.getElementById("confirmationMessage");
  confirmMessage.innerHTML = "Selected event is already registered";
  var message = document.getElementById("saveMessage");
  message.style.display = "block";

  setTimeout(function() {
    message.style.display = 'none';
  }, 5000);
}
});
