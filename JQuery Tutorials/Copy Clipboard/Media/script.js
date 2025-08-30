$(document).ready(function (){
  function add(){
    $(".copied").addClass("bounce-effect");
  }
  
  function remove(){
    $(".copied").removeClass("bounce-effect");
  }

  // Use the correct button class
  $(".copy-button").click(function(){
    $("#textfield").select();
    document.execCommand("copy");
    add();
    setTimeout(remove, 800);
  });
});
