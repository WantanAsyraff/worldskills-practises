let cashierOccupied = false; // 🍭 This is our state tracker!

function newClient() {
	if (queue_list < 10) {
		const preference = Math.floor(Math.random() * 4);
		const clientId = Date.now();
		const $client = $(`
			<div class="client" data-client-id="${clientId}">
				<span>Client for ${brandlist[preference]}</span>
			</div>
		`);

		$("#clients_queue").append($client);

		$client.draggable({
			revert: "invalid"
		});

		queue_list++;
		updateStats();

		setTimeout(newClient, Math.random() * 5000 + 1000);
	}
}

function updateStats() {
	$("#clients-served").text(`${queue_list} Clients`);
	$(".cars-sold").text(`${cars_sold} Cars sold`);
}

// When document is ready
$(document).ready(function () {
	updateStats();
	newClient();

	$("#cashier").droppable({
		accept: function($draggable) {
			return !cashierOccupied; // Only accept if not occupied!
		},
		drop: function (event, ui) {
			if (cashierOccupied) return; // Extra safety

			const $client = ui.draggable;

			$client.detach().appendTo(this).css({
				position: "relative", top: "", left: ""
			}).draggable("disable");

			queue_list--;
			cars_sold++;
			cashierOccupied = true;
			$(this).addClass("occupied");

			updateStats();

			// Optional: Automatically free cashier after some time (e.g., 5s)
			setTimeout(() => {
				$client.remove(); // Remove the client visually
				cashierOccupied = false;
				$("#cashier").removeClass("occupied");
			}, 5000);
		}
	});
});
