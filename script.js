/* Basic Reset */
body, html {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden; /* Prevent scrolling */
    font-family: Arial, sans-serif; /* Ensure a consistent font is used */
}

/* Full-Screen Canvas */
#gameCanvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #f0e4d7; /* Fallback color in case the image doesn't load */
}

/* Inventory Toggle Button */
#inventoryToggle {
    position: fixed;
    left: 10px;
    top: 10px;
    z-index: 10; /* Ensure it's above other elements */
    background: rgba(0, 0, 0, 0.8); /* Semi-transparent black */
    color: #ffffff; /* White text for visibility */
    padding: 10px 20px;
    cursor: pointer; /* Indicate it's clickable */
    border-radius: 5px; /* Rounded corners */
}

/* Vertical Collapsible Inventory */
#inventory {
    position: fixed;
    left: 0;
    top: 0;
    width: 200px; /* Adjust width as needed */
    height: 100%;
    background: rgba(255, 255, 255, 0.95); /* High opacity for readability */
    overflow-y: auto; /* Scrollable for many items */
    transform: translateX(-100%); /* Hidden off-screen initially */
    transition: transform 0.3s ease; /* Smooth transition for toggling */
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5); /* Shadow for depth */
    padding: 50px 10px 10px; /* Avoid overlap with the toggle button */
}

#inventory.expanded {
    transform: translateX(0); /* Slide in */
}

/* Inventory Items - Coins */
#inventory .coin {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%; /* Full width of the inventory */
    margin: 10px 0; /* Spacing between coins */
    cursor: pointer; /* Indicate it's clickable */
}

.coin img {
    max-width: 50px; /* Limit coin image size */
    max-height: 50px;
    margin-right: 10px; /* Space between image and text */
}

.coin .info {
    display: none; /* Hide additional info by default */
}

/* Show additional info on hover */
.coin:hover .info {
    display: block;
}

/* Congratulations Message */
#congratulationsMessage {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(255,255,255,0.9);
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    display: none; /* Hidden until all coins are found */
    z-index: 11; /* Above other elements */
}

/* Enlarged Coin View */
#enlargedCoinView {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 300px; /* Adjust based on your preference */
    max-height: 300px;
    background-size: contain;
    background-repeat: no-repeat;
    display: none; /* Hidden until a coin in the inventory is clicked */
    z-index: 12; /* Ensure it's on top */
    border: 3px solid #555; /* Border for clarity */
    border-radius: 10px; /* Rounded corners */
}
