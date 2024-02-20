body, html {
    margin: 0;
    padding: 0;
    overflow: hidden; /* Prevents scrolling */
    width: 100%;
    height: 100%;
    background-color: #f0e68c; /* A fallback background color similar to sand */
}

#game-canvas {
    display: block; /* Removes default margin */
    background: #f0e68c; /* Fallback background color in case the image takes time to load or fails */
    width: 100vw; /* Full width of the viewport */
    height: 100vh; /* Full height of the viewport */
    object-fit: cover; /* Ensures the canvas covers the full area without stretching */
}

/* Style for the inventory items */
.inventory-item {
    width: 50px; /* Adjust size as needed for inventory view */
    margin: 5px;
    cursor: pointer; /* Indicates items are clickable */
    transition: transform 0.3s ease; /* Smooth transition for enlarging effect */
}

.inventory-item.enlarged {
    position: fixed; /* Makes the image float above everything else */
    z-index: 10; /* Ensures the image is on top */
    width: 200px; /* Enlarged size */
    height: auto; /* Maintain aspect ratio */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(4); /* Center and enlarge the image */
    border: 3px solid #555; /* Optional: adds a border around the enlarged image */
    background-color: #fff; /* Optional: adds a background color */
    padding: 10px; /* Optional: adds some padding */
    box-shadow: 0 0 10px rgba(0,0,0,0.5); /* Optional: adds a shadow for better visibility */
}

/* Style for the collapsible buttons */
.collapse {
    background-color: #f9f9f9;
    color: #444;
    cursor: pointer;
    padding: 18px;
    width: 100%;
    border: none;
    text-align: left;
    outline: none;
    font-size: 15px;
    border-top: 1px solid #ddd; /* Add a subtle border */
    position: fixed; /* Ensure buttons are always visible */
    bottom: 0; /* Align at the bottom */
}

/* Style for the active state of the collapsible buttons */
.active, .collapse:hover {
    background-color: #ccc;
}

/* Style for the collapsible content */
.content {
    padding: 0 18px;
    display: none; /* Hidden by default */
    overflow: hidden;
    background-color: #f1f1f1;
    border-bottom: 1px solid #ddd; /* Add a subtle border */
    position: fixed; /* Ensure content is always visible */
    bottom: 50px; /* Position above the collapsible buttons */
    width: 100%;
}

/* Additional styles for the congratulations message, initially hidden */
#congrats-message {
    display: none; /* Initially hidden */
    padding: 20px;
    background-color: #f8d7da;
    color: #721c24;
    border-color: #f5c6cb;
    text-align: center;
    position: fixed; /* Ensure the message is always visible */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); /* Center the message */
    width: auto;
    max-width: 80%;
    box-shadow: 0 0 15px rgba(0,0,0,0.4); /* Optional: adds a shadow for better visibility */
    z-index: 20; /* Ensures the message is on top */
}
