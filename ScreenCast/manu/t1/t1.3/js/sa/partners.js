
// var partnerList = '';
// var callCount = '';
// var changeSelect = '';

auth.onAuthStateChanged(firebaseUser => {
  try {
    updateIntellisense();
    populatePartnersList(true);
    if (firebaseUser) {
      // document.getElementById('displayName').innerHTML = firebaseUser.displayName;
      // document.getElementById('customerProfileIcon').src = firebaseUser.photoURL;
      // document.getElementById('customerdisplayName').innerHTML = firebaseUser.displayName;

      // GetProfileData(firebaseUser);

      // getSiteURL();




      console.log('welcome' + firebaseUser.email);

    } else {
      console.log('User has been logged out');
      // window.location.href = "../login";
    }
  } catch (error) {
    console.log(error.message);
    // window.location.href = "../login";
  }
});

function populatePartnersList(flag) {

  var options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };


  db.collection("Partners")
  .get()
    .then((changes) => {

      changes.forEach(doc => {

        var specification = '';

        if (doc.data().partnerType === 'CLIENT') {
          specification = 'C';
        } else if (doc.data().partnerType === 'VENDOR') {
          specification = 'V';
        }

        var odeldate = new Date(doc.data().CreatedTimestamp.seconds * 1000);
        var delDate  = odeldate.toLocaleDateString("en-US", options);

        let partnersCard = document.createElement('a');
        partnersCard.setAttribute('href', 'partnerDetails.html?id=' + doc.id);
        partnersCard.setAttribute('class', 'ticket-card ' + doc.data().partnerStatus + ' ' + doc.data().partnerType + '');

          partnersCard.innerHTML =
          '<div class="">' +
            '<img src="' + doc.data().PartnerImgURL + '" alt="">' +
          '</div>' +
          '<div class="details">' +
            '<small>Partner ID: ' + doc.data().partnerID + '</small>' +
            '<h5>' + doc.data().partnerName + '</h5>' +
            '<span>' + doc.data().partnerLocation + '</span>' +
            '<br>' +
            '<small>' + delDate + '</small>' +
          '</div>' +
          '<div class="specification">' +
            '<span>' + specification + '</span>' +
          '</div>';

          document.getElementById('populateDataDiv').appendChild(partnersCard);

      });
      if (flag === true) {
        menuListClick('1');
      }

    });
}

function hideall(){
  $('.CLIENT').hide();
  $('.VENDOR').hide();
  $('.INACTIVE').hide();
};

function menuListClick(filter) {
  document.getElementById("wrongSearch").style.display="none";
  var searchDivInput = document.getElementById("searchDivInput").value;
  var opartnerLocationSelect = document.getElementById("partnerLocationSelect");
  var partnerLocationSelect = opartnerLocationSelect.options[opartnerLocationSelect.selectedIndex].value;
  var MenuListHr = document.getElementById('partnerMenuListHr');
  document.getElementById("clientTypeFilter").value=filter;
  hideall();
  console.log($('.CLIENT').length);
  if (filter === '1') {
    $('.CLIENT.ACTIVE').show("slide");
    if($('.CLIENT.ACTIVE').length === 0 )
    {
      if(searchDivInput === "")
      {
        document.getElementById("searchKeyText").innerHTML=" Client ";
      }
      else{
        document.getElementById("searchKeyText").innerHTML= searchDivInput + " as Client ";
      }
      document.getElementById("wrongSearch").style.display="block";
    }
    MenuListHr.style.transform = 'translateX(0%)';
  } else if (filter === '2') {
    $('.VENDOR.ACTIVE').show("slide");
    if($('.VENDOR.ACTIVE').length === 0 )
    {
      if(searchDivInput === "")
      {
        document.getElementById("searchKeyText").innerHTML=" Vendor ";
      }
      else{
        document.getElementById("searchKeyText").innerHTML= searchDivInput + " as Vendor ";
      }
      document.getElementById("wrongSearch").style.display="block";
    }
    MenuListHr.style.transform = 'translateX(100%)';
  } else if (filter === '3') {
    $('.INACTIVE').show("slide");
    if($('.INACTIVE').length === 0 )
    {
        if(searchDivInput === "")
        {
          document.getElementById("searchKeyText").innerHTML=" Inactive ";
        }
        else{
          document.getElementById("searchKeyText").innerHTML= searchDivInput + " as Inactive ";
        }
      document.getElementById("wrongSearch").style.display="block";
    }
    MenuListHr.style.transform = 'translateX(200%)';
  };

  if (partnerLocationSelect != 'All') {
    document.getElementById("searchKeyText").innerHTML=document.getElementById("searchKeyText").innerHTML + " in " + partnerLocationSelect;
  }

}


var btnCreatePartner = document.getElementById('btnCreatePartner');

btnCreatePartner.addEventListener('click', function(e) {
  try {
    console.log("button clied");
    window.location.href = "partnerdetails.html?id=new";
    // var siteURL = localStorage.getItem("siteURL");
    // localStorage.setItem("siteURL", siteURL);
  } catch (err) {
    console.error(err.message);
  }
});

function toggleSearchInput() {
  var searchDiv = document.getElementById('searchDiv');
  var searchDivInput = document.getElementById('searchDivInput');
  searchDiv.classList.toggle('open');

  if (searchDiv.classList.contains('open')) {
    searchDivInput.focus();
  } else {
    searchDivInput.blur();
  }
}

function inputSearchFocus() {
  var intellisense = document.getElementById('intellisense');
  var searchDivInput = document.getElementById('searchDivInput');

  intellisense.style.width = '100%';
  intellisense.style.height = '200px';
  intellisense.style.pointerEvents = 'all';
  intellisense.style.opacity = '1';

  searchDivInput.style.color = '#666';
}


function inputSearchBlur() {
  var intellisense = document.getElementById('intellisense');
  var searchDivInput = document.getElementById('searchDivInput');

  intellisense.style.width = '0';
  intellisense.style.height = '0';
  intellisense.style.opacity = '0';
  searchDivInput.style.color = '#fff';
}

function filterFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("searchDivInput");
  filter = input.value.toUpperCase();
  //  console.log(filter);
  div = document.getElementById("intellisense");
  a = div.getElementsByTagName("div");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}

function updateIntellisense(){

  var intellisense = document.getElementById('intellisense');

  db.collection("Partners")
  .get()
    .then((changes) => {
      changes.forEach(doc => {
        var intellisenseItem = document.createElement('div');
        intellisenseItem.setAttribute('onclick', 'searchIntellisenseClick(' + doc.id + ')');
        intellisenseItem.innerHTML = doc.data().partnerName;

        var input = document.createElement('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('value', doc.data().partnerName);
        input.setAttribute('id', doc.id);

        intellisenseItem.appendChild(input);
        intellisense.appendChild(intellisenseItem);
      })
    });
}

function searchIntellisenseClick(docID){
  document.getElementById("wrongSearch").style.display="none";
  var partnerList = [];
  partnerList.push(docID.id);
  document.getElementById("searchDivInput").value = docID.value;
  document.getElementById('populateDataDiv').innerHTML="";
  document.getElementById('partnerLocationSelect').options[0].selected=true;
  RenderPartnerByPartnerID(partnerList, 0);
  // RenderPartnerByPartnerID(changeSelect, partnerList, 0);
}

function myChangeEvent() {
  console.log('myChnageEvent');
  document.getElementById("wrongSearch").style.display="none";

  document.getElementById("populateDataDiv").innerHTML = "";
  var noFlag= false;
  var input, filter, ul, li, a, i;
  input = document.getElementById("searchDivInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("intellisense");
  a = div.getElementsByTagName("div");
  var hfid = "";
  var partnerList = [];
  var partnerCnt = 0;
  var callCount = 1;
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      noFlag = true;;
      a[i].style.display = "";
      hfid = a[i].getElementsByTagName("input")[0];
      partnerList.push(hfid.id);
      partnerCnt = partnerCnt + 1;
      if (partnerCnt === 10) {
        RenderPartnerByPartnerID(partnerList, callCount);
        // RenderPartnerByPartnerID(changeSelect, partnerList, callCount);
        partnerList = [];
        partnerCnt = 0;
        callCount = callCount + 1;
      }
    } else {
      a[i].style.display = "none";
    }
  }
  if (partnerList.length > 0) {

    RenderPartnerByPartnerID(partnerList, callCount);
    // RenderPartnerByPartnerID(changeSelect, partnerList, callCount);
  }
  console.log(noFlag);
  if(noFlag === false)
  {
    document.getElementById("searchKeyText").innerHTML = filter;
    document.getElementById("wrongSearch").style.display="block";
  }
  console.log("before display none");
  document.getElementById("searchDivInput").blur();
  // myDropdown.classList.remove("show");
  // serachDiv.classList.remove("open");
}

function changePartnerLocation() {
  document.getElementById('searchDivInput').value = '';
  var partnerLocationSelect = document.getElementById('partnerLocationSelect');
  var changeSelect = partnerLocationSelect.options[partnerLocationSelect.selectedIndex].text;

  console.log(changeSelect);

  RenderPartnerByLocation(changeSelect);

}

function RenderPartnerByPartnerID(partnerList, callCount) {

  var options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  var partnerType="";
  var firstFlag =true;
  var DBrows = db.collection("Partners")
    .where("__name__", "in", partnerList)
    .get();
  DBrows.then((changes) => {
    changes.forEach(doc => {

      var odeldate = new Date(doc.data().CreatedTimestamp.seconds * 1000);
      var delDate  = odeldate.toLocaleDateString("en-US", options);
      console.log('in for loop');
      let partnersCard = document.createElement('a');
      partnersCard.setAttribute('href', 'partnerDetails.html?id=' + doc.id);
      partnersCard.setAttribute('class', 'ticket-card ' + doc.data().partnerStatus + ' ' + doc.data().partnerType + '');
      if(firstFlag === true)
      {
        partnerType=doc.data().partnerType;
        console.log(partnerType);
        firstFlag = false;
      }
        partnersCard.innerHTML =
        '<div class="">' +
          '<img src="' + doc.data().PartnerImgURL + '" alt="">' +
        '</div>' +
        '<div class="details">' +
          '<small>Partner ID: ' + doc.data().partnerID + '</small>' +
          '<h5>' + doc.data().partnerName + '</h5>' +
          '<span>' + doc.data().partnerLocation + '</span>' +
          '<br>' +
          '<small>' + delDate + '</small>' +
        '</div>';
        console.log(partnersCard.innerHTML);
        document.getElementById('populateDataDiv').appendChild(partnersCard);

    });
    console.log(partnerType);
    if(partnerType === 'CLIENT'){
      menuListClick("1");
    }else if(partnerType === 'VENDOR'){
      menuListClick("2");
    }


  });

  var searchDiv = document.getElementById('searchDiv');
  searchDiv.classList.remove("open");

}

function RenderPartnerByLocation(changeSelect) {

  var options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  var clientTypeFilter = document.getElementById("clientTypeFilter").value;

  document.getElementById('populateDataDiv').innerHTML = '';

  var DBrows;

  if (changeSelect === 'All') {
   DBrows = db.collection("Partners")
    .get();
  } else {
    DBrows = db.collection("Partners")
     .where("partnerLocation", "==", changeSelect)
     .get();
  }

  DBrows.then((changes) => {
    changes.forEach(doc => {

      var odeldate = new Date(doc.data().CreatedTimestamp.seconds * 1000);
      var delDate  = odeldate.toLocaleDateString("en-US", options);

      let partnersCard = document.createElement('a');
      partnersCard.setAttribute('href', 'partnerDetails.html?id=' + doc.id);
      partnersCard.setAttribute('class', 'ticket-card ' + doc.data().partnerStatus + ' ' + doc.data().partnerType + '');

        partnersCard.innerHTML =
        '<div class="">' +
          '<img src="../img/clients/8.png" alt="">' +
        '</div>' +
        '<div class="details">' +
          '<small>Partner ID: ' + doc.data().partnerID + '</small>' +
          '<h5>' + doc.data().partnerName + '</h5>' +
          '<span>' + doc.data().partnerLocation + '</span>' +
          '<br>' +
          '<small>' + delDate + '</small>' +
        '</div>';
        console.log(partnersCard.innerHTML);
        document.getElementById('populateDataDiv').appendChild(partnersCard);

    });
    menuListClick(clientTypeFilter);
  });

  var searchDiv = document.getElementById('searchDiv');
  searchDiv.classList.remove("open");

}
