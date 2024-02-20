document.addEventListener('DOMContentLoaded', () => {
    const gameArea = document.getElementById('gameArea');
    const inventory = document.getElementById('inventory');
    const congratulationsMessage = document.getElementById('congratulationsMessage');
    let foundCoinsCount = 0;

    // Array of coin objects with positions and URLs
    const coins = [
        { x: 100, y: 200, url: 'https://touchcoins.moneymuseum.com/coins_media/...', found: false },
        { x: 150, y: 300, url: 'https://p7.hiclipart.com/preview/908/763/612/...', found: false },
        // Add all coins here with their positions and URLs
    ];

    gameArea.addEventListener('click', (event) => {
        const rect = gameArea.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const clickY = event.clientY - rect.top;

        // Check each coin to see if it's at the click position
        coins.forEach((coin, index) => {
            if (!coin.found && isCoinAtClickPosition(coin, clickX, clickY)) {
                coin.found = true;
                foundCoinsCount++;
                revealCoin(coin, index);
                updateInventory(coin);
                if (foundCoinsCount === coins.length) {
                    showCongratulationsMessage();
                }
            }
        });
    });

    function isCoinAtClickPosition(coin, clickX, clickY) {
        // Simple example, real implementation might need more sophisticated hit testing
        const tolerance = 20; // Pixel tolerance for clicking near a coin
        return Math.abs(coin.x - clickX) < tolerance && Math.abs(coin.y - clickY) < tolerance;
    }

    function revealCoin(coin, index) {
        const coinElement = document.createElement('div');
        coinElement.classList.add('coin');
        coinElement.style.backgroundImage = `url('${coin.url}')`;
        coinElement.style.left = `${coin.x}px`;
        coinElement.style.top = `${coin.y}px`;
        coinElement.id = `coin-${index}`;
        gameArea.appendChild(coinElement);
        setTimeout(() => { coinElement.style.display = 'block'; }, 100); // Slight delay to simulate digging
    }

    function updateInventory(coin) {
        const inventoryItem = document.createElement('div');
        inventoryItem.classList.add('coin');
        inventoryItem.style.backgroundImage = `url('${coin.url}')`;
        inventory.appendChild(inventoryItem);
        if (inventory.classList.contains('collapse')) {
            inventory.classList.remove('collapse');
        }
    }

    function showCongratulationsMessage() {
        congratulationsMessage.classList.remove('collapse');
    }
});
