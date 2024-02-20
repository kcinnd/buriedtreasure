document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const inventory = document.getElementById('inventory');
    const congratulationsMessage = document.getElementById('congratulationsMessage');
    const coinSound = document.getElementById('coinSound');
    const enlargedCoinView = document.getElementById('enlargedCoinView');
    let foundCoinsCount = 0;
    const radius = 30; // Detection radius for clicks

    const backgroundImage = new Image();
    backgroundImage.src = 'https://i.imgur.com/ynSwqpn.jpg'; // Sandy background image
    backgroundImage.onload = () => {
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        placeCoinsRandomly(); // Place coins after the background has loaded
    };

    const coinImages = [
        "https://touchcoins.moneymuseum.com/coins_media/Republic-of-Afghanistan-1-Afghani-2005/2126/obverse.png",
        "https://p7.hiclipart.com/preview/908/763/612/the-treasury-department-government-of-thailand-chakri-dynasty-thailand-ministry-of-finance-ten-baht-coin-coin.jpg",
        "https://banner2.cleanpng.com/20180714/quj/kisspng-coin-crown-danish-krone-currency-bureau-de-change-drawing-coin-5b4a65e4907dd1.8534690915316024045919.jpg",
        "https://p7.hiclipart.com/preview/551/466/481/coin-venezuelan-bolivar-gold-medal-coin.jpg",
        "https://banner2.cleanpng.com/20180330/dje/kisspng-egyptian-pound-bi-metallic-coin-one-pound-pharaoh-5abdbc24838aa7.1637577015223839085388.jpg",
        "https://www.florinus.lv/resized/cbf54fd5c313ada8c568a6f737187fec-300x300-transparent.png",
        "https://banner2.cleanpng.com/20180721/qk/kisspng-coin-ugandan-shilling-banknote-currency-australian-fiftycent-coin-5b533c7d248ed5.5018525215321816291498.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/3/3f/Coins_of_Romania_1_Ban_2005_transparent.png",
        "https://w7.pngwing.com/pngs/198/403/png-transparent-ecuadorian-centavo-coins-ecuadorian-centavo-coins-currency-penny-lakshmi-gold-coin-gold-metal-united-states-dollar.png"
    ];
    let coins = []; // Array to store coins with random positions

    function placeCoinsRandomly() {
        coinImages.forEach((url, index) => {
            const coin = {
                x: Math.random() * (canvas.width - 40) + 20, // Random x, 20px padding to avoid edges
                y: Math.random() * (canvas.height - 40) + 20, // Random y, 20px padding to avoid edges
                url: url, // Coin image URL
                found: false
            };
            coins.push(coin);
        });
    }

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
        inventory.style.display = 'block';
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
