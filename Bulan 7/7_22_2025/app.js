//On document is loaded
$(document).ready(function () {
    
    // $("css-selector"").method("optional parameters"); <- general JQUERY syntax

    /* Types of methods so far
        html()
        getJSON("relative-path.json", function(data){action})
        text("text")
        click()
        append("html tag")

    */
    
    let cars = [];
    
    $.getJSON("data/cars.json", function(data){
        //console.log(JSON.stringify(data)); - debugging
        //car_data = JSON.stringify(data);
        cars = data;

        update_stock(data);
        get_car_image(data);
        car_statistics();
    });

    $.getJSON("data/customers.json", function(data){
        // customer data here
    })
    
    // Method declarations
    function update_stock(car_data){
        let carshow = car_data.length;

        //Iterate to get stocks
        for (let i = 0; i < carshow; i++){
            let brand = car_data[i].brand;
            let brand_id = `#${brand}-stock`;

            $(brand_id).text("Cars in stock: " + car_data[i].stock);
        }
    }
    
    function get_car_image(car_data){
        // JSON manipulation
        //  Get the total length of the json
        let carshow = car_data.length;
        
        for (let i = 0; i < carshow; i++) {
            // backticks work like f-strings, use ${var} 
            let brand = car_data[i].brand;
            let brand_name = `#${brand}-img-stock`;
            
            
            for (let j = 0; j < car_data[i].stock; j++) {
                let generateImgID = Math.floor(Math.random() * 5) + 1;
                let image_path = `images/${brand}_${generateImgID}.jpg`;

                $(brand_name).append(`<img src=${image_path} alt="${brand} car">`);
        }
    }

    }

    function car_statistics(){
        let clients = 3;
        let sold = 1;
        let profit = 10023;
        
        $("#clients-served").text("Clients Served: " + clients);
        $("#cars-sold").text("Cars Sold: " + sold);
        $("#net-profit").text("Today's Profit: RM" + profit);
        
    }

    //Jquery Method declarations
    // $(this) will select the current html element (usually divs/p/etc)
    //when the user clicks on the div or button with the id named accept
    

    $("#accept").click(function () { 
    alert("Customer request ACCEPTED");
  });
  $("#deny").click(function(){
    alert("Customer request DENIED");
  });
  
  $("#assign-volks").click(function(){
    
    if (cars[1].stock > 0) {
        $("#volkswagen-img-stock img").first().remove();
        cars[1].stock -= 1;
        $("#volkswagen-stock").text("Current in stock: " + cars[1].stock);
    } 
    else {
        alert("Out of stock");
    }
})

$("#assign-porsche").click(function(){
    
    if (cars[0].stock > 0) {
        $("#porsche-img-stock img").first().remove();
        cars[0].stock -= 1;
        $("#porsche-stock").text("Current in stock: " + cars[0].stock);
    } 
    else {
        alert("Out of stock");
    }
})

$("#assign-audi").click(function(){
    
    if (cars[2].stock > 0) {
        $("#audi-img-stock img").first().remove();
        cars[2].stock -= 1;
        $("#audi-stock").text("Current in stock: " + cars[2].stock);
    } 
    else {
        alert("Out of stock");
    }
})

$("#assign-bmw").click(function(){
    
    if (cars[3].stock > 0) {
        $("#bmw-img-stock img").first().remove();
        cars[3].stock -= 1;
        $("#bmw-stock").text("Current in stock: " + cars[3].stock);
    } 
    else {
        alert("Out of stock");
    }
})
});
