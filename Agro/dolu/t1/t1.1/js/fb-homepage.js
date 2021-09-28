//**************************SELECT/GET DATA*****************************//

db.collection("Events").onSnapshot(snapshot => {
  let changes = snapshot.docChanges();
  // alert('Snapsize from Homepage: ' + snapshot.size);
  console.log(changes);
  changes.forEach(change => {
    if (change.type == 'added') {
      // console.log("Start Date Is :");
      // itemlist = document.getElementById("firebase-event-list");
      let item = document.createElement('div');
      // console.log("Start Date Is :");
      item.classList.add("item");
      // console.log("Image URL :" + change.doc.data().EventImgURL );
      // console.log("Image URL :");

      // item.innerHTML = "<div class='post-content'><h3 class='post-title'>" + change.doc.data().EventName + "</h3></div>";


      var link = "<a style='text-decoration:none;' href='./productDetail/productDetail.html?id=" + change.doc.id + "&eventid=" + change.doc.data().EventId + "'>";
      // var link = "<a style='text-decoration:none;' href='./Events/EventDetails.html?id=" + change.doc.data().EventId + "'>";
      item.innerHTML = link +
        "<div class='item'>" +
        "<div class='post-slide'>" +
        "<div class='post-img'>" +
        "<img style='border-radius:10px;height:230px;' src='" + change.doc.data().EventImgURL + "' alt='' width='100%'>" +
        "</div>" +
        "<div class= 'post-content'>" +
        "<h3 class= 'post-title'>" +
        change.doc.data().EventName + "</h3>" +
        "<p class= 'description'>" +
        "<span style='letter-spacing:1px;font-weight:1000;'><span style='font-size:15px;'>By: </span>" +
        change.doc.data().EventOrganisationName +
        "</span>" +
        "<br>" +
        "<span style='letter-spacing:1px;font-weight:1000;line-height:30px;'><span style='font-weight:1000;'>Date: </span>" + change.doc.data().EventStartDate + " - " + change.doc.data().EventEndDate +
        "</span>" +
        "<br>" +
        "<span style='letter-spacing:1px;font-weight:1000;line-height:14px;'><span style='font-weight:1000'>Price: ₹</span>" + change.doc.data().Price + "</span>" +
        "<br>" +
        "<span><button style='float:right; background:#fde834; color:#4b7d59; font-weight:1000;' class='btn' type='button' name='button'>Details</button> </span>" +

        "</p>" +

        "</div>" +
        "</div>" +
        "</div>" +
        "</a>";


      // console.log("Start Date Is2 :");
      // item.innerHTML = "<a style='text-decoration:none;' href='./Events/EventDetails.html?id=" + change.doc.data().EventId + ">" +
      // item.innerHTML = link +
      // "<div class='item'>" +
      // "<div class='post-slide'>" +
      // "<div class='post-img'>" +
      // "<img style='border-radius:10px;height:230px;' src='" + doc.data().EventImgURL + "' alt='' width='100%'>" +
      // "</div>" +
      // "<div class='post-content'>" +
      // "<h3 class='post-title'>" +
      // doc.data().EventName + "</h3>" +
      // "<p class='description'>" +
      //   "<span style='letter-spacing:1px;font-weight:1000;'><span style='font-size:15px;'>By: </span>" +
      //    doc.data().EventOrganisationName +
      //    "</span>" +
      //    "<br>" +
      //    "<span style='letter-spacing:1px;font-weight:1000;line-height:30px;'><span style='font-weight:1000;'>Date: </span>" + doc.data().EventStartDate + " - " + doc.data().EventEndDate +
      //     "</span>" +
      //     "<br>" +
      //     "<span style='letter-spacing:1px;font-weight:1000;line-height:14px;'><span style='font-weight:1000'>Price: ₹</span>" + doc.data().Price + "</span>" +
      //      "<br>" +
      // "</p>" +
      // "</div>" +
      // "</div>" +
      // "</div>" +
      // "</a>";

      // $('#event-list').trigger('add.owl.carousel', [item]).trigger('refresh.owl.carousel');
      $('#event-list').trigger('add.owl.carousel', [item]).trigger('refresh.owl.carousel');

      // console.log(change.doc.data().EventName);
    }
  })
});
