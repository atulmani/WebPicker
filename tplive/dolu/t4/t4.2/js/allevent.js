var loggedinUser = "";

window.onload = function() {
  // yourFunction(param1, param2);
  GetEventList();
};
//
// auth.onAuthStateChanged(async firebaseUser => {
//   try {
//     if (firebaseUser) {
//       loggedinUser = firebaseUser;
//       //console.log(firebaseUser.uid);
//       console.log('Logged-in user phone number: ' + loggedinUser.phoneNumber);
//
//       GetProfileData();
//     } else {
//       loggedinUser = null;
//
//     }
//
//     GetEventList();
//   } catch (error) {
//     console.log(error.message);
//     // window.location.href = "../index.html";
//   }
// });

async function GetProfileData() {
  console.log('GetProfileData - Starts');
  var userProfile = JSON.parse(localStorage.getItem("userProfile"));
  if (userProfile != undefined && userProfile != "" && userProfile != null) {
    if (userProfile.id != "0") {
      // document.getElementById("userName").innerHTML = result.data.UserName

      if (userProfile.UserRole.findIndex(e => e.TYPE === "ADMIN") >= 0) {
        console.log("in admin");
      } else if (userProfile.UserRole.findIndex(e => e.TYPE === "ORGANIZER") >= 0) {
        console.log("organizer");
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
  }

}


function GetEventList() {
  var para = {};
  //console.log(userid);
  para = {
    approvalStatus: 'Approved',
    range: 'All',
  };
  console.log(para);
  var ret = firebase.functions().httpsCallable("getAllEventWithStatus");

  ret(para).then(results => {
    console.log("From Function " + results.data.length);
    for (index = 0; index < results.data.length; index++) {
      RenderEventDetails(index, results.data[index]);
    }
  });
}


function RenderEventDetails(index, doc) {
  console.log(index, doc);
  var div1 = document.createElement("div");
  div1.setAttribute("class", "col-lg-3 col-md-4 col-sm-12");

  var anchor = document.createElement("a");
  anchor.setAttribute("style", "text-decoration:none;");
  anchor.setAttribute("href", "EventDetail.html?id=" + doc.Eventid);

  var div2 = document.createElement("div");
  div2.setAttribute("class", "item");

  var div3 = document.createElement("div");
  div3.setAttribute("class", "post-slide");

  var div4 = document.createElement("div");
  div4.setAttribute("class", "post-img");

  var img = document.createElement("img");
  img.setAttribute("style", "border-radius:5%;");
  img.setAttribute("alt", "");
  img.setAttribute("src", "./img/card1.png");
  img.setAttribute("width", "100%");
  // img.setAttribute("src",doc.profileImage);

  div4.appendChild(img);

  div3.appendChild(div4);

  var div5 = document.createElement("div");
  div5.setAttribute("class", "post-content");

  var h1 = document.createElement("h3");
  h1.setAttribute("class", "post-title");
  // h1.setAttribute("id","homepage_eventname" + index);

  div5.appendChild(h1);

  var p1 = document.createElement("p");
  p1.setAttribute("class", "description");

  var span1 = document.createElement("span");
  span1.setAttribute("style", "font-weight:bold")
  span1.innerHTML = "Venue : ";
  // span1.innerHTML = doc.NumberOfEvent;
  p1.appendChild(span1);

  var span2 = document.createElement("span");
  span2.setAttribute("style", "letter-spacing:1px;");
  span2.setAttribute("id", "homepage_eventvenue" + index);
  span2.innerHTML = doc.EventVenue;
  p1.appendChild(span2);

  var br = document.createElement("br");
  p1.appendChild(br);

  var span3 = document.createElement("span");
  span3.setAttribute("style", "font-weight:bold")
  span3.innerHTML = "Date: ";
  // span1.innerHTML = doc.NumberOfEvent;
  p1.appendChild(span3);

  var options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };

  var span4 = document.createElement("span");
  span4.setAttribute("style", "letter-spacing:1px;");
  span4.setAttribute("id", "homepage_eventdate" + index);
  var stDate = "";
  var enDate = "";
  if (doc.EventStartDate != null && doc.EventStartDate != "" && doc.EventStartDate != undefined) {
    stDate = new Date(doc.EventStartDate._seconds * 1000).toLocaleDateString("en-US", options);
  }

  if (doc.EventEndDate != null && doc.EventEndDate != "" && doc.EventEndDate != undefined) {
    enDate = new Date(doc.EventEndDate._seconds * 1000).toLocaleDateString("en-US", options);
  }
  span4.innerHTML = stDate + " - " + enDate;

  p1.appendChild(span4);


  var br1 = document.createElement("br");
  p1.appendChild(br1);

  var span5 = document.createElement("span");
  span5.setAttribute("style", "letter-spacing:1px;line-height:14px;")
  span5.innerHTML = "Prize : ";
  // span1.innerHTML = doc.NumberOfEvent;
  p1.appendChild(span5);


  var span6 = document.createElement("span");
  span6.setAttribute("style", "font-weight:bold");
  span6.setAttribute("id", "homepage_eventprize" + index);
  span6.innerHTML = doc.EventPrizeRange;
  p1.appendChild(span6);
  div5.appendChild(p1);

  div3.appendChild(div5);
  div2.appendChild(div3);
  anchor.appendChild(div2);


  div1.appendChild(anchor);

  var hf = document.createElement("input");
  hf.setAttribute("id", "hfEventID" + index);
  hf.setAttribute("type", "hidden");
  hf.setAttribute("value", doc.Eventid);
  div1.appendChild(hf);

  document.getElementById("eventListDiv").appendChild(div1);
}


function GetEventDetails(index) {
  var hfid = document.getElementById("hfEventID" + index);
  console.log(hfid);
  window.location.href = "eventUpdate.html?id=" + hfid.value;

}
