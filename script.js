const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const bgImage = new Image();
const coins = []; // Array to store coin positions and found status
const inventory = document.getElementById('inventory');

bgImage.onload = function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
    placeCoins(); // Place coins after the background is loaded
};
bgImage.src = 'https://static.vecteezy.com/system/resources/thumbnails/006/352/785/small/sand-on-the-beach-photo.jpg';

function placeCoins() {
    for (let i = 0; i < 5; i++) { // Example: placing 5 coins at random positions
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        coins.push({x, y, found: false});
    }
}

canvas.addEventListener('mousedown', function(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    digHole(x, y);
    checkForCoin(x, y);
});

function digHole(x, y) {
    const radius = 20;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,0,0,0)';
    ctx.fill();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
}

function checkForCoin(x, y) {
    coins.forEach((coin, index) => {
        const dx = coin.x - x;
        const dy = coin.y - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 20 && !coin.found) { // Assuming the coin radius is less than 20
            coin.found = true;
            addToInventory(index);
        }
    });
    showCongratulationsIfNeeded();
}

function addToInventory(coinIndex) {
    const coin = document.createElement('img');
    coin.src = 'path/to/coin/image.png'; // Replace with actual coin image path
    coin.className = 'inventory-item';
    coin.addEventListener('click', function() {
        this.classList.toggle('enlarged');
    });
    inventory.appendChild(coin);
}

function showCongratulationsIfNeeded() {
    const allFound = coins.every(coin => coin.found);
    if (allFound) {
        document.getElementById('congrats-message').style.display = 'block';
    }
}

// Collapsible inventory and congratulations message
document.querySelectorAll('.collapse').forEach(button => {
    button.addEventListener('click', function() {
        this.classList.toggle('active');
        const content = this.nextElementSibling;
        if (content.style.display === 'block') {
            content.style.display = 'none';
        } else {
            content.style.display = 'block';
        }
    });
});
