document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('beach');
    const ctx = canvas.getContext('2d');
    const treasure = document.getElementById('treasure');
    let treasureFound = false;
    let treasurePosition = { x: 0, y: 0 };

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drawSand();
        setTreasurePosition();
    }

    function drawSand() {
        const sandImage = new Image();
        sandImage.onload = function() {
            ctx.drawImage(sandImage, 0, 0, canvas.width, canvas.height);
        };
        sandImage.src = 'https://images.unsplash.com/photo-1611908171087-21962c50e48c?q=80&w=2535&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    }

    function dig(event) {
        const x = event.clientX;
        const y = event.clientY;
        const radius = 20;
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2, true);
        ctx.fill();

        if (!treasureFound && x >= treasurePosition.x && x <= treasurePosition.x + 60 && y >= treasurePosition.y && y <= treasurePosition.y + 60) {
            revealTreasure();
        }
    }

    function setTreasurePosition() {
        treasurePosition = {
            x: Math.random() * (canvas.width - 60),
            y: Math.random() * (canvas.height - 60)
        };
        treasure.style.left = `${treasurePosition.x}px`;
        treasure.style.top = `${treasurePosition.y}px`;
    }

    function revealTreasure() {
        treasure.style.display = 'block';
        treasureFound = true;
        showFoundPopup();
    }

  function showFoundPopup() {
    let popup = document.getElementById('foundPopup'); // Try to get existing popup
    if (!popup) { // If it doesn't exist, create it
        popup = document.createElement('div');
        popup.id = 'foundPopup';
        popup.className = 'modal-content';
        popup.innerHTML = `
            <h2>Congratulations!</h2>
            <p>You've found the treasure!</p>
            <button onclick="closeFoundPopup()">Close</button>
        `;
        document.body.appendChild(popup);
    }
    popup.style.display = 'block'; // Make sure to display the popup
}

    function closeFoundPopup() {
        const popup = document.getElementById('foundPopup');
        if (popup) {
            popup.style.display = 'none';
        }
    }

    canvas.addEventListener('mousedown', dig);
    window.addEventListener('resize', resizeCanvas);

    const modal = document.getElementById("introModal");
    const span = document.getElementsByClassName("close")[0];

    window.onload = function() {
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    resizeCanvas();
});
