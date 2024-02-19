document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('beach');
    const ctx = canvas.getContext('2d');
    const treasure = document.getElementById('treasure');
    let treasureFound = false;

    // Resize the canvas to fill the screen
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drawSand();
    }

    window.addEventListener('resize', resizeCanvas, false);
    resizeCanvas();

    // Load and draw the sand background
    function drawSand() {
        const sandImage = new Image();
        sandImage.onload = function() {
            ctx.drawImage(sandImage, 0, 0, canvas.width, canvas.height);
        };
        sandImage.src = 'https://images.unsplash.com/photo-1611908171087-21962c50e48c?q=80&w=2535&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    }

    // Function to simulate digging
    function dig(event) {
        const x = event.clientX;
        const y = event.clientY;

        // Radius of digging effect
        const radius = 20;
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath(); // Begin a new path to fix the digging effect
        ctx.arc(x, y, radius, 0, Math.PI * 2, true);
        ctx.fill();

        // Check if the treasure is found
        if (!treasureFound && x >= treasurePosition.x && x <= treasurePosition.x + 50 && y >= treasurePosition.y && y <= treasurePosition.y + 50) {
            revealTreasure();
        }
    }

    // Set the treasure position (could be randomized for more challenge)
    const treasurePosition = { x: Math.random() * (canvas.width - 50), y: Math.random() * (canvas.height - 50) };
    treasure.style.left = `${treasurePosition.x}px`;
    treasure.style.top = `${treasurePosition.y}px`;

    // Function to reveal the treasure
    function revealTreasure() {
        treasure.style.display = 'block';
        treasureFound = true;
        // Additional effects (e.g., sound, animation) could be added here
    }

    // Add event listener for the 'digging' action
    canvas.addEventListener('mousedown', dig);

    // Initial setup
    drawSand();
});
