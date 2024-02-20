document.addEventListener('DOMContentLoaded', () => {
    const gameArea = document.getElementById('gameArea');
    const inventory = document.getElementById('inventory');
    const congratulationsMessage = document.getElementById('congratulationsMessage');
    const coinSound = document.getElementById('coinSound');
    const enlargedCoinView = document.getElementById('enlargedCoinView');
    let foundCoinsCount = 0;

    const coins = [
        { x: 100, y: 200, url: 'https://example.com/coin1.png', found: false },
        { x: 300, y: 400, url: 'https://example.com/coin2.png', found: false },
        // Add more coins with their positions and URLs
    ];

    gameArea.addEventListener('click', (event) => {
        const rect = gameArea.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const clickY = event.clientY - rect.top;
        createDigEffect(event.pageX, event.pageY);

        coins.forEach((coin, index) => {
            if (!coin.found && isCoinAtClickPosition(coin, clickX, clickY)) {
                coin.found = true;
                foundCoinsCount++;
                revealCoin(coin, index);
                playCoinFoundSound();
                updateInventory(coin);
                if (foundCoinsCount === coins.length) {
                    showCongratulationsMessage();
                }
            }
        });
    });

    function isCoinAtClickPosition(coin, clickX, clickY) {
        const coinSize = 20; // Assuming each coin is 20x20 pixels
        const halfSize = coinSize / 2;
        return clickX >= (coin.x - halfSize) && clickX <= (coin.x + halfSize) &&
               clickY >= (coin.y - halfSize) && clickY <= (coin.y + halfSize);
    }

    function revealCoin(coin, index) {
        const coinElement = document.createElement('div');
        coinElement.classList.add('coin', 'sparkle');
        coinElement.style.backgroundImage = `url('${coin.url}')`;
        coinElement.style.left = `${coin.x}px`;
        coinElement.style.top = `${coin.y}px`;
        gameArea.appendChild(coinElement);
        setTimeout(() => { coinElement.style.display = 'block'; }, 100); // Slight delay to simulate digging
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

    function createDigEffect(x, y) {
        const digEffect = document.createElement('div');
        digEffect.classList.add('digEffect');
        digEffect.style.left = `${x - 25}px`; // Center the effect on the cursor
        digEffect.style.top = `${y - 25}px`;
        document.body.appendChild(digEffect);
        setTimeout(() => document.body.removeChild(digEffect), 1000); // Remove effect after animation
    }

    enlargedCoinView.addEventListener('click', () => {
        enlargedCoinView.style.display = 'none'; // Hide enlarged view on click
    });
});
