let eventDocUrl = new URL(location.href);
let searchParams = new URLSearchParams(eventDocUrl.search);
var eventID = searchParams.get('id');
var catDetails = "";
auth.onAuthStateChanged(async firebaseUser => {
    try {
        if (firebaseUser) {
            loggedinUser = firebaseUser;
            //console.log(firebaseUser.uid);
            console.log('Logged-in user phone number: ' + loggedinUser.phoneNumber);
            if (eventID === "" || eventID === null || eventID === undefined) {
                eventID = localStorage.getItem("eventID");
            }
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
            document.getElementById("userName").innerHTML = userProfile.UserName;
            document.getElementById("userContact").innerHTML = userProfile.Phone;
            var listName = userProfile.UserName.split(" ");
            var userSName = "";
            for (i = 0; i < listName.length; i++) {
                userSName = userSName + listName[i][0];
            }
            document.getElementById("userShortName").innerHTML = userSName;

            if (userProfile.UserRole.findIndex(e => e.TYPE === "ADMIN") >= 0 || userProfile.UserRole.findIndex(e => e.TYPE === "ORGANIZER") >= 0) {
                console.log("in admin or organizer");
                // document.getElementById("fInput").style.display="none";
                getEventDetails();
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

function getEventDetails() {

    document.getElementById("hfEventID").value = eventID;
    var responceJSON = localStorage.getItem("eventDetails");
    let obj = JSON.parse(responceJSON);

    if (obj != undefined && obj != null) {

        document.getElementById("eventName").innerHTML = obj.EventName;
        catDetails = obj.CategoryDetails;
        document.getElementById("CategoryDetailsDiv").innerHTML = "";
        if (catDetails != null && catDetails != undefined) {
            for (i = 0; i < catDetails.length; i++) {
                renderCategory(catDetails[i], i);
            }

        }


    }

}


function renderCategory(category, index) {

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
        // month: '2-digit',
        day: 'numeric'
    };
    var div1 = document.createElement("div");
    div1.setAttribute("class", "col-lg-4 col-md-6 col-sm-12");
    div1.setAttribute("id", "catDiv" + index);

    var div2 = document.createElement("div");
    div2.setAttribute("class", "category-card");

    var input1 = document.createElement("input");
    input1.setAttribute("type", "text");
    input1.setAttribute("id", "catID" + index);
    input1.setAttribute("class", "category-name");
    input1.value = category.CategoryName;
    input1.setAttribute("readonly", "true");
    div2.appendChild(input1);

    var hf = document.createElement("input");
    hf.setAttribute("type", "hidden");
    hf.setAttribute("id", "catNameID" + index);
    hf.value = category.CategoryName;
    div2.appendChild(hf);

    var div3 = document.createElement("div");
    div3.setAttribute("class", "gender-event-div");

    var div4 = document.createElement("div");

    var smallGender = document.createElement("small");
    smallGender.setAttribute("id", "gender" + index);
    smallGender.innerHTML = category.Gender;
    div4.appendChild(smallGender);

    var selectGender = document.createElement("select");
    selectGender.setAttribute("id", "selectGender" + index);
    selectGender.setAttribute("style", "display:none;");

    var option1 = document.createElement("option");
    option1.setAttribute("value", "MALE");
    if (category.Gender.toUpperCase() === "MALE") {
        option1.setAttribute("selected", "true");
    }
    option1.innerHTML = "MALE";
    selectGender.appendChild(option1);

    var option2 = document.createElement("option");
    option2.setAttribute("value", "FEMALE");
    if (category.Gender.toUpperCase() === "FEMALE") {
        option2.setAttribute("selected", "true");
    }
    option2.innerHTML = "FEMALE";
    selectGender.appendChild(option2);

    var option3 = document.createElement("option");
    option3.setAttribute("value", "MIXED");
    if (category.Gender.toUpperCase() === "MIXED") {
        option3.setAttribute("selected", "true");
    }
    option3.innerHTML = "MIXED";
    selectGender.appendChild(option3);
    div4.appendChild(selectGender);
    div3.appendChild(div4);

    var span1 = document.createElement("span");
    span1.innerHTML = "|";

    div3.appendChild(span1);

    var div5 = document.createElement("div");

    var smallType = document.createElement("small");
    smallType.setAttribute("id", "catType" + index);
    smallType.innerHTML = category.EventType;
    div5.appendChild(smallType);

    var selectType = document.createElement("select");
    selectType.setAttribute("id", "selectType" + index);
    selectType.setAttribute("style", "display:none;");

    var option11 = document.createElement("option");
    option11.setAttribute("value", "SINGLE");
    if (category.Gender.toUpperCase() === "SINGLE") {
        option11.setAttribute("selected", "true");
    }
    option11.innerHTML = "SINGLE";
    selectType.appendChild(option11);

    var option21 = document.createElement("option");
    option21.setAttribute("value", "DOUBLE");
    if (category.Gender.toUpperCase() === "DOUBLE") {
        option21.setAttribute("selected", "true");
    }
    option21.innerHTML = "DOUBLE";
    selectType.appendChild(option21);

    var option31 = document.createElement("option");
    option31.setAttribute("value", "TEAM");
    if (category.Gender.toUpperCase() === "TEAM") {
        option31.setAttribute("selected", "true");
    }
    option31.innerHTML = "TEAM";
    selectType.appendChild(option31);

    div5.appendChild(selectType);
    div3.appendChild(div5);
    div2.appendChild(div3);

    var div6 = document.createElement("div");
    div6.setAttribute("class", "born-before-div");

    var h31 = document.createElement("h3");
    h31.setAttribute("onclick", "changeDateRef(" + index + ")");

    var span22 = document.createElement("span");
    span22.innerHTML = "Born";

    h31.appendChild(span22);

    var div7 = document.createElement("div");
    div7.setAttribute("id", "dateRefFlag" + index);
    if (category.DateRefType === 'Before') {
        div7.setAttribute("class", "before");
    } else {
        div7.setAttribute("class", "after");
    }

    var spanflagB = document.createElement("span");
    spanflagB.innerHTML = "Before";

    div7.appendChild(spanflagB);

    var spanK = document.createElement("span");
    spanK.setAttribute("class", "material-symbols-outlined");
    spanK.innerHTML = "keyboard_arrow_down";
    div7.appendChild(spanK);

    var spanA = document.createElement("span");
    spanA.innerHTML = "After";

    div7.appendChild(spanA);
    h31.appendChild(div7);

    var spanC = document.createElement("span");
    spanC.innerHTML = ":";
    h31.appendChild(spanC);
    div6.appendChild(h31);

    var refsdate = new Date(category.ReferenceDate._seconds * 1000);

    if (refsdate.toString() === 'Invalid Date') {
        refsdate = new Date(category.ReferenceDate);
    }
    console.log(refsdate);

    var valString = refsdate.toLocaleDateString("en-IN", options);

    var h41 = document.createElement("h4");
    h41.setAttribute("id", "refDate" + index);
    h41.setAttribute("style", "width: 100%;");

    h41.innerHTML = valString;
    div6.appendChild(h41);

    var div8 = document.createElement("div");
    div8.setAttribute("id", "dtDiv" + index);
    div8.setAttribute("class", "input-group date datetimepicker11");
    div8.setAttribute("style", "width: 70%;opacity: 0;pointer-events: none;");

    var inputROpen = document.createElement("input");
    inputROpen.setAttribute("id", "RegistrationOpenDate" + index);
    inputROpen.setAttribute("style", "height: 35px; background: #fff; border-right: 1px solid #ddd;")
    inputROpen.setAttribute("type", "text");
    inputROpen.setAttribute("placeholder", "Reg Start Date");
    inputROpen.setAttribute("class", "form-control");
    inputROpen.setAttribute("readonly", "true");
    inputROpen.setAttribute("value", valString);
    div8.appendChild(inputROpen);


    var div9 = document.createElement("div");

    div9.setAttribute("class", "input-group-addon input-group-prepend");

    var spanCal = document.createElement("span");
    spanCal.setAttribute("class", "input-group-text")
    spanCal.setAttribute("style", "height: 35px; background: #fff; border: none; border - radius: 0 4px 4px 0");

    var i1 = document.createElement("i");
    i1.setAttribute("class", "fas fa-calendar");
    i1.setAttribute("style", "font-size: 0.9em; color: #666;")
    spanCal.appendChild(i1);

    div9.appendChild(spanCal);
    div8.appendChild(div9);

    // $('.datepicker_init', div8).datetimepicker({
    //     format: 'MM-DD-YYYY',
    //     ignoreReadonly: true,
    //     useCurrent: true, //,
    //     defaultDate: new Date()
    //     // maxDate: new Date() //,

    // });

    // $('.datepicker_end', div8).datetimepicker({
    //     locale: 'es',
    //     format: 'YYYY-MM-DD HH:mm',
    //     useCurrent: false
    // });

    div6.appendChild(div8);
    div2.appendChild(div6);

    var div10 = document.createElement("div");
    div10.setAttribute("class", "born-before-div");

    var h3fee = document.createElement("h3");
    h3fee.innerHTML = "Fees : ";
    div10.appendChild(h3fee);

    var inputFee = document.createElement("input");
    inputFee.setAttribute("type", "text");
    inputFee.setAttribute("readonly", "true");
    inputFee.setAttribute("id", "fee" + index);
    inputFee.value = Number(category.Fees).toLocaleString('en-IN', curFormat);
    div10.appendChild(inputFee);
    div2.appendChild(div10);

    var div11 = document.createElement("div");
    div11.setAttribute("class", "category-card-edit");

    var div12 = document.createElement("div");
    div12.setAttribute("onclick", "deleteCategory(" + index + ");");
    var spandelete = document.createElement("span");
    spandelete.setAttribute("class", "material-symbols-outlined");
    spandelete.innerHTML = "delete";

    div12.appendChild(spandelete);

    var smalldelete = document.createElement("small");
    smalldelete.innerHTML = "DELETE";
    div12.appendChild(smalldelete);

    div11.appendChild(div12);

    var spanError = document.createElement("span");
    spanError.setAttribute("id", "errorMessage" + index);
    spanError.setAttribute("class", "errorMessage");
    spanError.setAttribute("style", "display:none");

    spanError.innerHTML = "Enter All details";

    div11.appendChild(spanError);

    var div13 = document.createElement("div");
    div13.setAttribute("style", "text-align: right;");
    div13.setAttribute("onclick", "SetEditMode(" + index + ");");

    var spanEdit = document.createElement("span");
    spanEdit.setAttribute("class", "material-symbols-outlined");
    spanEdit.innerHTML = "edit_square";

    div13.appendChild(spanEdit);

    var smallBut = document.createElement("small");
    smallBut.setAttribute("id", "button" + index);
    smallBut.innerHTML = "Edit";

    div13.appendChild(smallBut);
    div11.appendChild(div13);
    div2.appendChild(div11);
    div1.appendChild(div2);

    var br = document.createElement("br");
    div1.appendChild(br);
    document.getElementById("CategoryDetailsDiv").appendChild(div1);
}



function SetEditMode(index) {

    var curFormat = {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    };
    console.log('SetEditMode');
    if (document.getElementById("button" + index).innerHTML === "Edit") {
        document.getElementById("catID" + index).removeAttribute("readonly");
        document.getElementById("gender" + index).setAttribute("style", "display:none;");
        document.getElementById("selectGender" + index).setAttribute("style", "display:block;");
        document.getElementById("catType" + index).setAttribute("style", "display:none;");
        document.getElementById("selectType" + index).setAttribute("style", "display:block;");

        document.getElementById("refDate" + index).setAttribute("style", "display:none;");
        document.getElementById("dtDiv" + index).setAttribute("style", "width: 70%;opacity: 1;pointer-events: all;");
        var feeCon = document.getElementById("fee" + index);
        feeCon.removeAttribute("readonly")
        console.log(feeCon.value);
        feeCon.value = feeCon.value.replace('₹', '').replaceAll(",", "").replaceAll(" ", "");
        document.getElementById("button" + index).innerHTML = "Update";

    } else {
        var flag = updateCategory(index);
        if (flag) {


            document.getElementById("catID" + index).setAttribute("readonly", true);
            document.getElementById("gender" + index).setAttribute("style", "display:block;");
            document.getElementById("selectGender" + index).setAttribute("style", "display:none;");
            document.getElementById("catType" + index).setAttribute("style", "display:block;");
            document.getElementById("selectType" + index).setAttribute("style", "display:none;");

            document.getElementById("refDate" + index).setAttribute("style", "display:block;");
            document.getElementById("dtDiv" + index).setAttribute("style", "width: 70%;opacity: 0;pointer-events: none;");

            var feeCon = document.getElementById("fee" + index);
            feeCon.setAttribute("readonly", true)
            // feeCon.value = feeCon.value.replace('₹', '').replaceAll(",", "").replaceAll(" ", "");
            feeCon.value = Number(feeCon.value).toLocaleString('en-IN', curFormat);
            document.getElementById("button" + index).innerHTML = "Edit";
        }
        /////

    }

}

/////
function addCategory() {
    console.log('addCategory');

    var categoryName = document.getElementById("catNameAdd").value;
    document.getElementById("catNameAdd").value = "";

    var genderSelCnt = document.getElementById("genderAdd");
    var genderSelVal = genderSelCnt.options[genderSelCnt.selectedIndex].text;

    var categoryTypeCnt = document.getElementById("catTypeAdd");
    var categoryTypeVal = categoryTypeCnt.options[categoryTypeCnt.selectedIndex].text;

    var dateRefFlagCnt = document.getElementById("dateRefFlagadd");
    var dateRefFlagVal = "";
    if (dateRefFlagCnt.classList.contains('before')) {
        dateRefFlagVal = 'Before';
    } else {
        dateRefFlagVal = 'After';
    }

    var RegistrationOpenDate = document.getElementById("RegistrationOpenDateAdd");
    var RegistrationOpenDateVal = RegistrationOpenDate.value;

    if (categoryTypeVal === 'SINGLE') {
        maxTeam = 1;
    } else if (categoryTypeVal === 'DOUBLE') {
        maxTeam = 2;
    } else {
        maxTeam = -1;
    }

    var fees = document.getElementById("feeAdd").value;
    document.getElementById("feeAdd").value = "0";
    var feeval = fees.replace('₹', '').replaceAll(",", "").replaceAll(" ", "");
    if (categoryName === "" || genderSelVal === "" ||
        feeval === "" || categoryTypeVal === "" || RegistrationOpenDateVal === "" || dateRefFlagVal === "") {
        document.getElementById("errorMessage").style = "display:block";
        setTimeout(function () {
            document.getElementById("errorMessage").style.display = 'none';
        }, 5000);
    }
    else {
        console.log(catDetails);
        if (catDetails != null && catDetails != undefined) {
            var selIndex = catDetails.findIndex(e => e.CategoryName === categoryName);
            if (selIndex >= 0) {
                catDetails.splice(selIndex, 1);
            }
        }
        else {
            catDetails = [];
        }
        console.log('RegistrationOpenDateVal', new Date(RegistrationOpenDateVal));
        catDetails.push({
            CategoryName: categoryName,
            Gender: genderSelVal,
            Fees: Number(feeval),
            EventType: categoryTypeVal,
            MaxTeamSize: Number(maxTeam),
            ReferenceDate: new Date(RegistrationOpenDateVal),
            DateRefType: dateRefFlagVal

        });
        //console.log(catDetails);

        document.getElementById("CategoryDetailsDiv").innerHTML = "";
        for (i = 0; i < catDetails.length; i++) {
            renderCategory(catDetails[i], i);
        }
        document.getElementById("divAddCategory").style = "display:none;";

    }
}
function SaveCategory() {
    var para1 = {};
    for (i = 0; i < catDetails.length; i++) {

        console.log('refsdate', catDetails[i].ReferenceDate);
        var refsdate = new Date(catDetails[i].ReferenceDate._seconds * 1000);

        if (refsdate.toString() === 'Invalid Date') {
            refsdate = new Date(catDetails[i].ReferenceDate);
        }
        catDetails[i].ReferenceDate = refsdate;
    }

    para1 = {
        EventID: eventID,
        CategoryDetails: catDetails,
    };
    console.log(catDetails);
    // const ret1 = firebase.functions().httpsCallable("setEventCategoryDetails");
    const ret1 = functions.httpsCallable("setEventCategoryDetails");
    ret1(para1).then((result) => {

        var responceJSON = localStorage.getItem("eventDetails");

        let obj = JSON.parse(responceJSON);
        obj.CategoryDetails = catDetails;
        responceJSON = JSON.stringify(obj);
        localStorage.setItem("eventDetails", responceJSON);

    });

}
function updateCategory(index) {
    console.log('updateCategory', index);

    var categoryName = document.getElementById("catID" + index).value;
    var categoryNameOld = document.getElementById("catNameID" + index).value;
    var genderSelCnt = document.getElementById("selectGender" + index);
    var genderSelVal = genderSelCnt.options[genderSelCnt.selectedIndex].text;
    document.getElementById("gender" + index).innerHTML = genderSelVal;

    var categoryTypeCnt = document.getElementById("selectType" + index);
    var categoryTypeVal = categoryTypeCnt.options[categoryTypeCnt.selectedIndex].text;
    document.getElementById("catType" + index).innerHTML = categoryTypeVal;

    var dateRefFlagCnt = document.getElementById("dateRefFlag" + index);
    var dateRefFlagVal = "";
    if (dateRefFlagCnt.classList.contains('before')) {
        dateRefFlagVal = 'Before';
    } else {
        dateRefFlagVal = 'After';
    }

    var RegistrationOpenDate = document.getElementById("RegistrationOpenDate" + index);
    var RegistrationOpenDateVal = RegistrationOpenDate.value;
    console.log(new Date(RegistrationOpenDate.value));
    console.log((RegistrationOpenDate.value));
    document.getElementById("refDate" + index).value = RegistrationOpenDateVal;

    if (categoryTypeVal === 'SINGLE') {
        maxTeam = 1;
    } else if (categoryTypeVal === 'DOUBLE') {
        maxTeam = 2;
    } else {
        maxTeam = -1;
    }

    var fees = document.getElementById("fee" + index).value;

    var feeval = fees.replace('₹', '').replaceAll(",", "").replaceAll(" ", "");

    if (categoryName === "" || genderSelVal === "" ||
        feeval === "" || categoryTypeVal === "" || RegistrationOpenDateVal === "" || dateRefFlagVal === "") {
        document.getElementById("errorMessage" + index).style = "display:block";
        setTimeout(function () {
            document.getElementById("errorMessage" + index).style.display = 'none';
        }, 5000);
        return false;
    } else {



        console.log(catDetails);
        if (catDetails != null && catDetails != undefined) {
            var selIndex = catDetails.findIndex(e => e.CategoryName === categoryNameOld);
            if (selIndex >= 0) {
                catDetails.splice(selIndex, 1);
            }
        }
        else {
            catDetails = [];
        }

        catDetails.push({
            CategoryName: categoryName,
            Gender: genderSelVal,
            Fees: Number(feeval),
            EventType: categoryTypeVal,
            MaxTeamSize: Number(maxTeam),
            ReferenceDate: new Date(RegistrationOpenDateVal),
            DateRefType: dateRefFlagVal

        });
        console.log(catDetails);
        //document.getElementById("existingEventCategory").innerHTML = "";
        //for (index = 0; index < valList.length; index++) {
        //    renderCategory(valList[index], index);
        //}
        return true;
    }
};

/////////


function ShowAddCategory() {
    console.log('ShowAddCategory');
    document.getElementById("divAddCategory").style.display = "block";
}

function changeDateRef(index) {
    var dateRefFlag = document.getElementById('dateRefFlag' + index);
    console.log(dateRefFlag);
    if (dateRefFlag.classList.contains('before')) {
        dateRefFlag.classList.remove('before');
        dateRefFlag.classList.add('after');
    } else if (dateRefFlag.classList.contains('after')) {
        dateRefFlag.classList.remove('after');
        dateRefFlag.classList.add('before');
    }
}

function deleteCategory(index) {
    console.log("deleteCategory", index);
    catDetails.splice(index, 1);
    console.log(catDetails);
    document.getElementById("CategoryDetailsDiv").innerHTML = "";
    for (index = 0; index < catDetails.length; index++) {
        renderCategory(catDetails[index], index);
    }
}