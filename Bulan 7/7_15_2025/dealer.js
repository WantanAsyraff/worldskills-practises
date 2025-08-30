let cars = ["audi", "volkswagen", "porsche", "bmw"]; // Cars offered
let cars_for_sale = [4, 6, 5, 3];
let queue = [], clients_queue = [];
let clients_served = 0, cars_sold = 0, profit = 0;
let currentCarInCashier = null; // Track what car is currently in cashier

// Event listeners for move buttons
document.addEventListener("DOMContentLoaded", function() {
    updateStatistic(clients_served, cars_sold, profit);
    addCarForSale();
    
    // Add event listeners for move buttons
    document.getElementById("move-porsche").addEventListener("click", () => moveCarToCashier("porsche", 2));
    document.getElementById("move-volks").addEventListener("click", () => moveCarToCashier("volkswagen", 1));
    document.getElementById("move-audi").addEventListener("click", () => moveCarToCashier("audi", 0));
    document.getElementById("move-bmw").addEventListener("click", () => moveCarToCashier("bmw", 3));
    
    // Existing deny button listener
    const deny = document.getElementById("deny");
    deny.addEventListener("click", () => {
        alert("Removed customer");
        removeClient();
        updateClientDisplay();
        clearCashier(); // Clear cashier when denying
    });
    
    // Accept button listener
    const accept = document.getElementById("accept");
    accept.addEventListener("click", () => {
        acceptTransaction();
    });
});

function moveCarToCashier(carType, carIndex) {
    // Check if there's a current client
    if (clients_queue.length === 0) {
        alert("No client to serve!");
        return;
    }
    
    let currentClient = clients_queue[0];
    let clientWantedCarIndex = currentClient.car_index;
    
    // Check if the moved car matches client's preference
    if (carIndex === clientWantedCarIndex) {
        // Check if car is available in inventory
        if (cars_for_sale[carIndex] > 0) {
            // Clear previous car in cashier if any
            clearCashier();
            
            // Create car image for cashier
            let cashierBox = document.getElementById("cashier");
            let carImg = document.createElement("img");
            carImg.src = "Media/images/" + carType + "_" + (Math.floor(Math.random()*4) + 1) + ".jpg";
            carImg.alt = carType + " for sale";
            carImg.width = 60;
            carImg.height = 60;
            carImg.style.borderRadius = "5px";
            carImg.style.margin = "10px";
            carImg.style.border = "2px solid green";
            carImg.id = "cashier-car";
            
            cashierBox.appendChild(carImg);
            currentCarInCashier = { type: carType, index: carIndex };
            
            console.log("Moved ${carType} to cashier for client who wants ${cars[clientWantedCarIndex]}");
            alert("${carType.toUpperCase()} moved to cashier! Client is happy!");
        } else {
            alert(`No ${carType} available in inventory!`);
        }
    } else {
        alert(`Client wants ${cars[clientWantedCarIndex].toUpperCase()}, not ${carType.toUpperCase()}!`);
        console.log(`Client wants ${cars[clientWantedCarIndex]}, but you tried to give ${carType}`);
    }
}

function clearCashier() {
    let cashierBox = document.getElementById("cashier");
    let existingCar = document.getElementById("cashier-car");
    if (existingCar) {
        cashierBox.removeChild(existingCar);
    }
    currentCarInCashier = null;
}

function acceptTransaction() {
    if (clients_queue.length === 0) {
        alert("No client to serve!");
        return;
    }
    
    if (currentCarInCashier === null) {
        alert("No car in cashier! Move a car first.");
        return;
    }
    
    let currentClient = clients_queue[0];
    let carIndex = currentCarInCashier.index;
    
    // Process the sale
    cars_for_sale[carIndex]--;
    cars_sold++;
    profit += 50000; // RM 50,000 per car
    
    // Remove car from inventory display
    let carContainer = document.getElementById(currentCarInCashier.type);
    if (carContainer.children.length > 1) { // Check if there are car images (not just the h4)
        let carImages = carContainer.querySelectorAll("img");
        if (carImages.length > 0) {
            carContainer.removeChild(carImages[0]);
        }
    }
    
    // Clear cashier
    clearCashier();
    
    // Remove client
    removeClient();
    updateClientDisplay();
    
    alert(`✅ Sale completed! Sold ${currentCarInCashier.type.toUpperCase()} for RM 50,000`);
    console.log(`Sale completed: ${currentCarInCashier.type} sold`);
}

function updateStatistic(served, sold, profit) {
    document.getElementById("clients-served").innerHTML = "<h3>Clients served: " + served + "</h3>";
    document.getElementById("cars-sold").innerHTML = "<h3>Cars sold: " + sold + "</h3>";
    document.getElementById("profit").innerHTML = "<h3>Profit earned: RM " + profit + "</h3>";
}

function createCarImage(car_name, parent) {
    let imgSrc = "Media/images/" + car_name + "_" + (Math.floor(Math.random()*4) + 1) + ".jpg";
    let carImg = document.createElement("img");
    carImg.src = imgSrc;
    carImg.alt = "Car for sale";
    carImg.width = 50;
    carImg.height = 50;
    carImg.style.borderRadius = "5px";
    carImg.style.margin = "2px";
    document.getElementById(parent).appendChild(carImg);
}

function createClientImage() {
    let imgSrc = "Media/images/client_" + (Math.floor(Math.random()*9) + 1) + ".jpg";
    let clientImage = document.createElement("img");
    clientImage.src = imgSrc;
    clientImage.alt = "Customer Picture";
    clientImage.width = 50;
    clientImage.height = 50;
    clientImage.style.border = "1px solid #ccc";
    clientImage.style.borderRadius = "5px";
    clientImage.style.margin = "2px";
    document.getElementById("queue").appendChild(clientImage);
   
    return clientImage;
}

function createClient() {
    let clientImg = createClientImage();
    let car_preference = Math.floor(Math.random()*4);
    let preference_string = "I want to purchase: " + cars[car_preference].toString().toUpperCase();
   
    // Create client data object
    let clientData = {
        img: clientImg,
        preference: preference_string,
        car_index: car_preference
    };
    
    // Add to clients_queue
    clients_queue.push(clientData);
    
    // Update display only if it's the first client
    let clientDescBox = document.getElementById("client-desc");
    if (clientDescBox.children.length === 0) {
        updateClientDisplay();
    }
   
    return clientData;
}

function updateClientDisplay() {
    let clientDescBox = document.getElementById("client-desc");
    let clientPrefDesc = document.getElementById("client-pref-desc");
    
    // Clear current display
    clientDescBox.innerHTML = "";
    
    // If there are clients in queue, show the first one
    if (clients_queue.length > 0) {
        let nextClient = clients_queue[0];
        clientDescBox.appendChild(nextClient.img.cloneNode(true));
        clientPrefDesc.innerText = nextClient.preference;
        console.log("Updated display with next client:", nextClient.preference);
    } else {
        clientPrefDesc.innerText = "No clients in queue";
        console.log("No clients to display");
    }
}

function addCarForSale() {
    for (let i = 0; i < cars.length; i++) {
        for (let j = 0; j < cars_for_sale[i]; j++) {
            createCarImage(cars[i], cars[i]);
        }
    }
}

function removeClient() {
    let clientQueue = document.getElementById("queue");
    
    // Remove from clients_queue array (first client)
    if (clients_queue.length > 0) {
        let removedClient = clients_queue.shift();
        console.log("Removed client:", removedClient.preference);
        
        // Update statistics
        clients_served++;
        updateStatistic(clients_served, cars_sold, profit);
    }
    
    // Remove from visual queue (first image)
    if (clientQueue.children.length > 0) {
        let removedImg = clientQueue.removeChild(clientQueue.children[0]);
        console.log("Removed client image from queue");
    }
    
    // Remove from queue array
    if (queue.length > 0) {
        queue.shift();
    }
}

function addToQueue() {
    if (queue.length >= 10) {
        console.log("Queue Full");
    } else {
        queue.push(1);
        createClient();
        console.log("Current queue length:", queue.length);
    }
}

// Auto-add clients every 3 seconds
setInterval(() => {
    addToQueue();
}, 3000);