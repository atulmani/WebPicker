  $(document).ready(function(){
    hideall();
    $('.text-ads').show("slide");
    $('#1').click(function() {
      hideall();
      // $('.all').toggle("slide");
      $('.text-ads').show("slide");
    });
    $('#2').click(function() {
      hideall();
      $('.image-ads').show("slide");
    });
    $('#3').click(function() {
      hideall();
      $('.second').show("slide");
    });
    $('#4').click(function() {
      hideall();
      $('.third').show("slide");
    });
});

function hideall(){
  $('.text-ads').hide();
  $('.image-ads').hide();
  $('.second').hide();
  $('.third').hide();
};

// Menu's nav-link highlighted those are active - start
  $(".select-tp-content-col .select-tp-card").on("click", function() {
    $(".select-tp-content-col").find(".active").removeClass("active");
    $(this).addClass("active");
  });
  // Menu's nav-link highlighted those are active - end
