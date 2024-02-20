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
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const dx = x - (treasurePosition.x + 30); // Assuming the treasure is 60x60px
    const dy = y - (treasurePosition.y + 30);
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (!treasureFound && distance < 40) { // Adjust the radius as needed
        alert("Treasure found!"); // Immediate feedback
        revealTreasure();
    }
}

function setTreasurePosition() {
    treasurePosition = {
        x: Math.random() * (canvas.width - 60),
        y: Math.random() * (canvas.height - 60)
    };
    console.log(`New treasure position: (${treasurePosition.x}, ${treasurePosition.y})`);
    treasure.style.left = `${treasurePosition.x}px`;
    treasure.style.top = `${treasurePosition.y}px`;
}

   function revealTreasure() {
    console.log("revealTreasure called");
    treasureFound = true;
    showFoundPopup();
}

function showFoundPopup() {
    console.log("showFoundPopup called");
    // Popup creation logic...
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
