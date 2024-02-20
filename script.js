document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('beach');
    const ctx = canvas.getContext('2d');
    let treasureFound = false;

    // Set canvas size to fill the viewport
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Function to draw the sand background
    function drawSand() {
        ctx.fillStyle = 'sandybrown'; // Using a solid color for simplicity
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Simplified treasure detection function
    function simplifiedTreasureDetection(event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left; // Adjust for canvas position
        const y = event.clientY - rect.top;

        // Check if the click is within a predefined area (e.g., upper-left quadrant)
        if (x < canvas.width / 2 && y < canvas.height / 2) {
            if (!treasureFound) {
                alert("Treasure found in simplified test!"); // Immediate feedback
                treasureFound = true; // To prevent multiple alerts
                // Optionally, call a function here to handle the treasure being found, like showing a detailed popup
            }
        }
    }

    // Event listener for canvas clicks, invoking the treasure detection function
    canvas.addEventListener('click', simplifiedTreasureDetection);

    // Initial draw of the sand background
    drawSand();

    // Optionally, implement a function to show a detailed popup when the treasure is found
    // This function can be called inside simplifiedTreasureDetection when the treasure is found
    function showTreasureFoundPopup() {
        // Create and style the popup, then append it to the document body
        // For simplicity, you can start with an alert() to confirm the function is called
        alert("Congratulations! You've found the treasure!");
    }
});
