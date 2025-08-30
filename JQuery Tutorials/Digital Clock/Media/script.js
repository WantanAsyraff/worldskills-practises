$(document).ready(function(){
  // Display time
  function showTime(){
    // Get current time/date
    var date = new Date();

    // make variables to get hours, minute and second
    var hours = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();

    // AM, PM setting
    var session = "AM";

    if (hours == 0) {
      hours = 12;
    }
    if (hours >= 12){
      session = "PM";
    }

    if (hours > 12) {
      hours -= 12;
    }

    // Ternary operation for formatting
    hours = hours < 10 ? "0" + hours : hours;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;

    // Set the variable to span tag
    $("#hours").text(hours);
    $("#min").text(min);
    $("#sec").text(sec);
    $("#period").text(session);

    // To change time every second
    setTimeout(showTime, 1000);
  }

  showTime();
}
);