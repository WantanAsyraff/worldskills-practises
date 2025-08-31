$(document).ready(function(){
    $("#color-range").on("input change", function(){
        //Change body background color
        $("body").css("background-color", $(this).val());
        //Change h1 to color white if body color is black
        if ($("#color-range").val() <= "#242424") {
            $("h1").css("color", "white");
        }
        else {
            $("h1").css("color", "black");
        }

    })
});