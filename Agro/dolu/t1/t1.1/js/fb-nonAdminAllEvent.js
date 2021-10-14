
//**************************SELECT/GET DATA*****************************//

db.collection("Events").orderBy('CreatedTimestamp','desc').onSnapshot(snapshot => {
  let changes = snapshot.docChanges();
  // alert('Snapsize from Homepage: ' + snapshot.size);
  // console.log(changes);
  changes.forEach(change => {
    if (change.type == 'added') {
      renderEvents(change.doc);
    }
  });
});


function renderEvents(doc) {
  console.log('Doc ID: ' + doc.id);
  console.log('Event Name: ' + doc.data().EventName);

  let itemCol = document.createElement("div");
  // itemCol.classList.add('col-lg-3 col-md-6 col-sm-12');
  itemCol.classList.add("col-lg-3");
  itemCol.classList.add("col-md-6");
  itemCol.classList.add("col-sm-12");
  itemCol.innerHTML = "<a style='text-decoration:none;' href='../productDetail/productDetail.html?id=" + doc.id + "&eventid=" + doc.data().EventId + "'>" +
    "<div class='item'>" +
    "<div class='post-slide'>" +
    "<div class='post-img'>" +
    "<img style='border-radius:10px;height:230px;' src='" + doc.data().EventImgURL + "' alt='' width='100%'>" +
    "</div>" +
    "<div class='post-content'>" +
    "<h3 class='post-title'>" +
    doc.data().EventName + "</h3>" +
    "<p class='description'>" +
      "<span style='letter-spacing:1px;font-weight:1000;'><span style='font-size:15px;'>By: </span>" +
       doc.data().EventOrganisationName +
       "</span>" +
       "<br>" +
       "<span style='letter-spacing:1px;font-weight:1000;line-height:30px;'><span style='font-weight:1000;'>Date: </span>" + doc.data().EventStartDate + " - " + doc.data().EventEndDate +
        "</span>" +
        "<br>" +
        "<span style='letter-spacing:1px;font-weight:1000;line-height:14px;'><span style='font-weight:1000'>Price: ₹</span>" + doc.data().Price + "</span>" +
         "<br>" +
    "</p>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</a>";


  document.getElementById("eventRow").appendChild(itemCol);
}
