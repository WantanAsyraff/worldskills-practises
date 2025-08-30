var brandlist = new Array("Porsche","Volkswagen","Audi","BMW");
var carStock = [4, 6, 5, 3] // Porsche,Volkswagen,Audi,BMW in that order
var clients = 0, clientServed = 0, carSold = 0, amount = 0;

function newClient(){
	if (clients <= 8){
		var preference = Math.floor((Math.random()*4));
		var time = Math.floor((Math.random()*10000)+1);
		var client = Math.floor((Math.random()*10)+1);

		var client_id = $('<div class="client client_'+client+'"><span class="preference">Client for '+brandlist[preference]+'</span></div>')

		$("#clients_queue").append(client_id);
		draggableClient();

		clients++;
		setTimeout(function(){newClient();},time);
		console.log(client_id);
	} 
	else
	{
		console.log("Queue Full");
	}

}

function draggableClient(){
	// Reset the function
	$(".client").each(function () {
  // Only destroy if draggable was initialized
  		if ($(this).data("uiDraggable")) {
    	$(this).draggable("destroy");
  }
});


	var firstClient = $("#clients_queue .client").first();

	if (firstClient.length) {
		firstClient.draggable({
			revert: "invalid"
		})
	}

}

function updateStats(){
	$("#clients-served").text("Clients Serverd: " + clientServed);
	$("#cars-sold").text("Cars sold: " + carSold);
	$("#amount").text("Total Amount: " + amount);
};


$("document").ready(function(e) {
	
	$("#cashier").droppable({
		accept: ".client",
		drop: function(event, ui) {
			let dragged = ui.draggable;
			clients--;
			draggableClient();
		}
	})

	$("#clients_queue").droppable({
		accept: ".client",
		drop: function(event, ui) {
			let dragged = ui.draggable;

			$("#clients_queue").prepend(dragged);
			draggableClient();
		}
	})


	newClient();
	updateStats();
});
