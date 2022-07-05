var loggedinUser = "";

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
  var userProfile =JSON.parse( localStorage.getItem("userProfile"));

  if (userProfile != undefined && userProfile != "" && userProfile != null) {

    if (userProfile.id != "0") {
      document.getElementById("userName").innerHTML = userProfile.UserName

      if (userProfile.UserRole.findIndex(e => e.TYPE === "ADMIN") >= 0) {
        console.log("in admin");
        populateOrganizationList("All");
        // document.getElementById("fInput").style.display="none";
      } else if (userProfile.UserRole.findIndex(e => e.TYPE === "ORGANIZER") >= 0) {
        console.log("organizer");
        populateOrganizationList(loggedinUser.uid);
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
//
// async function GetProfileDataOld() {
//   console.log('GetProfileData - Starts');
//
//   var para1 = {};
//   para1 = {
//     userID: loggedinUser.uid
//     // userID: '35667789999'
//   };
//   const ret1 = firebase.functions().httpsCallable("getProfileDetails");
//   ret1(para1).then((result) => {
//     var record1 = result.data;
//     console.log(result.data);
//     // console.log(result.data.UserRole.findIndex(e=> e.TYPE==="ADMIN"));
//
//     if (result.data.id != "0") {
//       document.getElementById("userName").innerHTML = result.data.UserName
//
//       if (result.data.UserRole.findIndex(e => e.TYPE === "ADMIN") >= 0) {
//         console.log("in admin");
//         populateOrganizationList("All");
//         // document.getElementById("fInput").style.display="none";
//       } else if (result.data.UserRole.findIndex(e => e.TYPE === "ORGANIZER") >= 0) {
//         console.log("organizer");
//         populateOrganizationList(loggedinUser.uid);
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

function fullcard(arrowVar) {
  // console.log(arrowVar).;
  arrowVar.classList.toggle('active');

}

function populateOrganizationList(userid) {
  var para = {};
  console.log(userid);
  para = {
    organizerID: loggedinUser.uid
  };
  console.log(para);
  var ret = "";
  if (userid === "All") {
    // ret = firebase.functions().httpsCallable("getAllOrganizationDetails");
    ret = functions.httpsCallable("getAllOrganizationDetails");

  } else {
    // ret = firebase.functions().httpsCallable("getAllOrganizationDetailsForOrganizer");
    ret = functions.httpsCallable("getAllOrganizationDetailsForOrganizer");

  }
  ret(para).then(results => {
    console.log("From Function " + results.data.length);
    // console.log("From Function " + results.data[0].resultsid);
    for (index = 0; index < results.data.length; index++) {
      // console.log(results.data[index]);
      RenderOrganizationDetails(index, results.data[index]);
    }
  });
}

function RenderOrganizationDetails(index, doc) {
  // console.log(index, doc);
  var div1 = document.createElement("div");
  div1.setAttribute("class", "col-lg-4");
  div1.setAttribute("style", "display: flex; justify-content: center; padding:2%");

  var div2 = document.createElement("div");
  div2.setAttribute("id", "arrowOrg" + index);
  div2.setAttribute("class", "dashboardCardBoxOrg");

  var div3 = document.createElement("div");
  div3.setAttribute("onclick", "fullcard(arrowOrg" + index + ")");
  div3.setAttribute("class", "");

  var div4 = document.createElement("div");
  div4.setAttribute("class", "createEventCircleother");

  var img = document.createElement("img");
  img.setAttribute("style", "height:80px; border-radius:50%;");
  img.setAttribute("alt", "");
  img.setAttribute("src", "../img/e1.png");
  // img.setAttribute("src",doc.profileImage);

  div4.appendChild(img);

  div3.appendChild(div4);

  var div5 = document.createElement("div");
  div5.setAttribute("class", "bigNum");

  var h1 = document.createElement("h3");

  var span1 = document.createElement("span");
  span1.innerHTML = "0";
  // span1.innerHTML = doc.NumberOfEvent;
  h1.appendChild(span1);

  var span2 = document.createElement("span");
  span2.setAttribute("class", "material-icons-outlined");
  span2.innerHTML = "expand_more";
  h1.appendChild(span2);
  div5.appendChild(h1);

  var h2 = document.createElement("h6");
  h2.innerHTML = "Total Events Conducted";
  div5.appendChild(h2);
  console.log(doc.resultsid);
  var hf = document.createElement("input");
  hf.setAttribute("id", "hfOrganizationID" + index);
  hf.setAttribute("type", "hidden");
  hf.setAttribute("value", doc.resultsid);
  div3.appendChild(hf);

  var i1 = document.createElement("i");
  i1.setAttribute("onclick", "GetOrganizationDetails(" + index + ");");
  i1.setAttribute("class", "far fa-edit address-edit-icon");
  i1.setAttribute("style", "padding: 0 5px 0 5px;bottom:0px;z-index:0;");

  div3.appendChild(i1);

  div3.appendChild(div5);

  div2.appendChild(div3);

  var div6 = document.createElement("div");
  div6.setAttribute("class", "dashboardCardAnalytics");

  var div7 = document.createElement("div");
  div7.setAttribute("class", "analyticsLineorg");

  var span3 = document.createElement("span");
  span3.setAttribute("class", "analyticsSpanHead");

  var span4 = document.createElement("span");
  span4.setAttribute("class", "analyticsSpanHeadValue");
  span4.innerHTML = doc.OrganizationName;

  span3.innerHTML = "Organization Name :- ";
  span3.appendChild(span4);

  div7.appendChild(span3);
  div6.appendChild(div7);

  var div8 = document.createElement("div");
  div8.setAttribute("class", "analyticsLineorg");

  var span5 = document.createElement("span");
  span5.setAttribute("class", "analyticsSpanHead");

  var span6 = document.createElement("span");
  span6.setAttribute("class", "analyticsSpanHeadValue");
  span6.innerHTML = doc.City;

  span5.innerHTML = "Location :- ";
  span5.appendChild(span6);

  div8.appendChild(span5);
  div6.appendChild(div8);

  var div9 = document.createElement("div");
  div9.setAttribute("class", "analyticsLineorg");

  var span7 = document.createElement("span");
  span7.setAttribute("class", "analyticsSpanHead");

  var span8 = document.createElement("span");
  span8.setAttribute("class", "analyticsSpanHeadValue");
  span8.innerHTML = doc.PartnerName;

  span7.innerHTML = "Owner Name :- ";
  span7.appendChild(span8);

  div9.appendChild(span7);
  div6.appendChild(div9);


  var div10 = document.createElement("div");
  div10.setAttribute("class", "analyticsLineorg");

  var span9 = document.createElement("span");
  span9.setAttribute("class", "analyticsSpanHead");

  var span10 = document.createElement("span");
  span10.setAttribute("class", "analyticsSpanHeadValue");
  span10.innerHTML = doc.PartnerEmailID;

  span9.innerHTML = "Email Id :- ";
  span9.appendChild(span10);

  div10.appendChild(span9);
  div6.appendChild(div10);

  var div11 = document.createElement("div");
  div11.setAttribute("class", "analyticsLineorg");

  var span11 = document.createElement("span");
  span11.setAttribute("class", "analyticsSpanHead");

  var span12 = document.createElement("span");
  span12.setAttribute("class", "analyticsSpanHeadValue");
  span12.innerHTML = doc.PartnerPhone;

  span11.innerHTML = "Phone No :- ";
  span11.appendChild(span12);

  div11.appendChild(span11);
  div6.appendChild(div11);

  div2.appendChild(div6);

  div1.appendChild(div2);

  document.getElementById("containerOrgList").appendChild(div1);
}

function GetOrganizationDetails(index) {
  var hfid = document.getElementById("hfOrganizationID" + index);
  window.location.href = "organizationUpdate.html?id=" + hfid.value;

}
