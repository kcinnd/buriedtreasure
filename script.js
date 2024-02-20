document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const inventory = document.getElementById('inventory');
    const congratulationsMessage = document.getElementById('congratulationsMessage');
    const coinSound = document.getElementById('coinSound');
    const enlargedCoinView = document.getElementById('enlargedCoinView');
    let foundCoinsCount = 0;
    const radius = 20; // Radius of the digging circle

    const backgroundImage = new Image();
    backgroundImage.src = 'https://i.imgur.com/ynSwqpn.jpg'; // Your sandy background image
    backgroundImage.onload = () => {
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    };

    const coins = [
        { x: 100, y: 200, url: 'https://example.com/coin1.png', found: false },
        { x: 300, y: 400, url: 'https://example.com/coin2.png', found: false },
        // Add more coins with their positions and URLs
    ];

    canvas.addEventListener('click', (event) => {
        const rect = canvas.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const clickY = event.clientY - rect.top;

        // Digging effect
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(clickX, clickY, radius, 0, Math.PI * 2, true);
        ctx.fill();

        coins.forEach((coin, index) => {
            if (!coin.found && isCoinAtClickPosition(coin, clickX, clickY)) {
                coin.found = true;
                foundCoinsCount++;
                playCoinFoundSound();
                revealCoin(coin, index);
                updateInventory(coin);
                if (foundCoinsCount === coins.length) {
                    showCongratulationsMessage();
                }
            }
        });
    });

    function isCoinAtClickPosition(coin, clickX, clickY) {
        return Math.hypot(coin.x - clickX, coin.y - clickY) < radius;
    }

    function revealCoin(coin, index) {
        const coinImage = new Image();
        coinImage.src = coin.url;
        coinImage.onload = () => {
            ctx.globalCompositeOperation = 'source-over';
            ctx.drawImage(coinImage, coin.x - coinImage.width / 2, coin.y - coinImage.height / 2);
        };
    }

    function playCoinFoundSound() {
        coinSound.play();
    }

    function updateInventory(coin) {
        const inventoryItem = document.createElement('div');
        inventoryItem.classList.add('coin');
        inventoryItem.style.backgroundImage = `url('${coin.url}')`;
        inventory.appendChild(inventoryItem);
        inventoryItem.addEventListener('click', () => {
            enlargedCoinView.style.backgroundImage = `url('${coin.url}')`;
            enlargedCoinView.style.display = 'block';
        });
    }

    function showCongratulationsMessage() {
        congratulationsMessage.classList.remove('collapse');
    }

    enlargedCoinView.addEventListener('click', () => {
        enlargedCoinView.style.display = 'none';
    });
});
