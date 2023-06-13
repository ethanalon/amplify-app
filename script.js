
function copyColor(color){
    navigator.clipboard.writeText(color);
    alert("Copied the color: " + color)
}

$(document).ready(function() {
    $('.toggle').click(function() {
      $('.menu').toggleClass('active');
    });
  });