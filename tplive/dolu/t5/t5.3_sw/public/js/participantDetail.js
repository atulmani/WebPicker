let eventDocUrl = new URL(location.href);
let searchParams = new URLSearchParams(eventDocUrl.search);
var eventID = searchParams.get('id');
var loggedinUser = "";
var categortList = [];
var EntryList = [];
auth.onAuthStateChanged(async firebaseUser => {
  try {
    if (eventID === "" || eventID === undefined || eventID === null)
      eventID = localStorage.getItem("EventID");
    console.log(eventID);

    if (firebaseUser) {
      loggedinUser = firebaseUser;
      //console.log(firebaseUser.uid);
      console.log('Logged-in user phone number: ' + loggedinUser.phoneNumber);

      GetProfileData();

    } else {
      loggedinUser = null;

    }

  } catch (error) {
    console.log(error.message);
    // window.location.href = "../index.html";
  }
  getAllCategory();
  getallPartcipant();

});



async function GetProfileData() {
  console.log('GetProfileData - Starts');
  var userProfile = JSON.parse(localStorage.getItem("userProfile"));
  // getAllCategory();
  // getallPartcipant();
  // if (userProfile != undefined && userProfile != "" && userProfile != null) {
  //   if (userProfile.id != "0") {
  //     document.getElementById("userName").innerHTML = userProfile.UserName;
  //     document.getElementById("userlocation").innerHTML = userProfile.City;
  //
  //     if (userProfile.UserRole.findIndex(e => e.TYPE === "ADMIN") >= 0) {
  //       console.log("in admin");
  //     } else if (userProfile.UserRole.findIndex(e => e.TYPE === "ORGANIZER") >= 0) {
  //       console.log("organizer");
  //       // document.getElementById("fInput").style.display="none";
  //     } else {
  //       console.log("not admin");
  //       document.getElementById("containerOrgList").style.display = "none";
  //       document.getElementById("errorMessage").style.display = "block";
  //     }
  //   } else {
  //     console.log("not admin");
  //     document.getElementById("containerOrgList").style.display = "none";
  //     document.getElementById("errorMessage").style.display = "block";
  //   }
  // }

}

function getAllCategory() {
  categortList = JSON.parse(localStorage.getItem("eventCategory"));
  console.log(categortList);
  var div = "";
   categortList.CategoryDetails.unshift({
    CategoryName : "All",
  })
  for (index = 1; index <= categortList.CategoryDetails.length; index++) {
    if ((index ) % 4 === 1) {
      div = document.createElement("div");
      div.setAttribute("style", "");
      div.setAttribute("class", "anchor-tag");


    }
    // if(index === 1)
    // {
    //   var anchorAll = document.createElement("div");
    //   anchorAll.setAttribute("onclick", "getPartcipantForEvent('All'" + ")");
    //   // anchor.setAttribute("class","col-lg-3");
    //   anchorAll.innerHTML = "All";
    //   div.appendChild(anchorAll);
    //
    // }
    var anchor = document.createElement("div");
    anchor.setAttribute("onclick", "getPartcipantForEvent('" + categortList.CategoryDetails[index - 1].CategoryName + "'" + ")");
    // anchor.setAttribute("class","col-lg-3");
    anchor.innerHTML = categortList.CategoryDetails[index - 1].CategoryName ;

    div.appendChild(anchor);
    if ((index) % 4 === 0)
      document.getElementById("eventCategory").appendChild(div);
  }
  if ((index ) % 4 != 0)
    document.getElementById("eventCategory").appendChild(div);

}

function getallPartcipant() {
  var para1 = {};
  para1 = {
    EventID: eventID
  };

  // const ret1 = firebase.functions().httpsCallable("getParticipants");
  const ret1 = functions.httpsCallable("getParticipants");
  ret1(para1).then((result) => {
    console.log(result.data);
    EntryList = result.data;
    renderEntry(EntryList,'All');
  });

}

function renderEntry(doc, Category) {
  var curFormat = {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  };

  console.log(doc);
  // console.log(Category);
  document.getElementById("Category").innerHTML = Category;
  document.getElementById("Category1").innerHTML = Category;
  var cnt =0;
  //document.getElementById("diventry").innerHTML = "<thead>  <tr>   <th>#</th>   <th>Participant</th>    <th>Amount</th>  <th>Payment</th>   </tr>  </thead>";
  document.getElementById("diventry").innerHTML = "";
  document.getElementById("diventry1").innerHTML = "";
  for (index = 0; index < doc.length; index++) {
    if (Category === "All" || Category === doc[index].CategoryName) {
      cnt = cnt + 1;
      //Mobile
      var tr = document.createElement("tr");
      tr.setAttribute("class", "");
      var td1 = document.createElement("td");
      td1.innerHTML = index + 1;
      tr.appendChild(td1);

      var td2 = document.createElement("td");
      td2.innerHTML = doc[index].ParticipantName;
      tr.appendChild(td2);

      var td3 = document.createElement("td");
      td3.innerHTML = doc[index].Fees.toLocaleString('en-IN', curFormat);
      tr.appendChild(td3);

      var td4 = document.createElement("td");
      if (doc[index].PaymentStatus === "Pending") {

        td4.innerHTML = "Click to Pay";
      } else {
        td4.innerHTML = doc[index].PaymentStatus;

      }
      tr.appendChild(td4);

      //desktop
      var tr1 = document.createElement("tr");
      tr1.setAttribute("class", "");
      var td11 = document.createElement("td");
      td11.innerHTML = index + 1;
      tr1.appendChild(td11);

      var td21 = document.createElement("td");
      td21.innerHTML = doc[index].ParticipantName;
      tr1.appendChild(td21);

      var td31 = document.createElement("td");
      td31.innerHTML = doc[index].Fees.toLocaleString('en-IN', curFormat);
      tr1.appendChild(td31);

      var td41 = document.createElement("td");
      if (doc[index].PaymentStatus === "Pending") {

        td41.innerHTML = "Click to Pay";
      } else {
        td41.innerHTML = doc[index].PaymentStatus;

      }
      tr1.appendChild(td41);

      // console.log(tr.innerHTML);
      document.getElementById("diventry").appendChild(tr);
      document.getElementById("diventry1").appendChild(tr1);
    }
  }
  document.getElementById("totalCount").innerHTML = cnt;
  document.getElementById("totalCount1").innerHTML = cnt;

}

function getPartcipantForEvent(eventName) {
  // console.log(eventName);
renderEntry(EntryList,eventName);
}
