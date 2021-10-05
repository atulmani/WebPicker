

db.collection("ProductList").orderBy('CreatedTimestamp','desc').onSnapshot(snapshot => {
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
  console.log('Product Id: ' + doc.data().ProductId);

  let itemCol = document.createElement("div");
  itemCol.classList.add("col-lg-3");
  itemCol.classList.add("col-md-6");
  itemCol.classList.add("col-sm-12");

  itemCol.innerHTML =
    "<div style='padding: 10px;'>" +
      "<div class='item'>" +
        "<div class='post-slide'>" +
            "<div class='post-info'>" +
              "<table width='100%' border='0'>" +
                "<tr>" +
                  "<td style='widht:50%;'>" +
                  "<i class='fa fa-tag'>" +
                    "<a href='' style='padding-left:5px;'>" + doc.data().ProductType + "</a>" +
                  "</i>" +
                  "</td>" +
                  "<td style='text-align:right;'>" +
                    "<a href='' style='padding-right: 5px;'>" + doc.data().ProductSubCategory + "</a>" +
                    "<i class='fa fa-paperclip'></i>" +
                  "</td>" +
                "</tr>" +
              "</table>" +
            "</div>" +
            "<div class='post-img'>" +
              "<img style='height:100%' src='" + doc.data().ProductImageURL + "' alt=''>" +
            "</div>" +
            "<div class='post-content'>" +
              "<span class='post-author'>" +
                "<a href=''><img style='height:100%' src='" + doc.data().ThumbnailImageURL +"' alt=''></a>" +
              "</span>" +
              "<div style='padding-bottom:10px;'>" +
                // "<input id='1' type='hidden' name='' value='" + doc.id + ">" +
                "<input id='" + doc.data().ProductId + "' type='hidden' name='' value='" + doc.data().ProductLinkURL + "'>" +
                "<a href='../demo.html' onclick='getSiteURL(\"" + doc.data().ProductLinkURL + "\")' class='viewbtn'>" +
                  "<button type='button' class='btn btn-dark' style='color:#fff5c0;' >" +
                    "<span> View Demo </span>" +
                    "<i class='fad fa-angle-double-right'></i>" +
                  "</button>" +
                "</a>" +
              "</div>" +
              "<h3 class='post-title'>" + doc.data().ProductCategory + " | " + doc.data().ProductColorTheme + "</h3>" +
              "<p class='description'>" + doc.data().ProductDetails + "</p>" +
            "</div>" +
        "</div>" +
      "</div>" +
    "</div>";

  document.getElementById("allProductRow").appendChild(itemCol);

  document.getElementById('loading').style.display = 'none';
}
