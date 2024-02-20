document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const inventory = document.getElementById('inventory');
    const inventoryToggle = document.getElementById('inventoryToggle');
    const congratulationsMessage = document.getElementById('congratulationsMessage');
    const coinSound = document.getElementById('coinSound');
    const enlargedCoinView = document.getElementById('enlargedCoinView');
    let foundCoinsCount = 0;

    // Resize canvas to full screen
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        placeCoinsRandomly(); // Place coins after resizing to ensure proper positioning
    }
    window.addEventListener('resize', resizeCanvas);

    const backgroundImage = new Image();
    backgroundImage.src = 'https://i.imgur.com/ynSwqpn.jpg'; // Sandy background image
    backgroundImage.onload = () => {
        resizeCanvas(); // Initial setup to draw the background and place coins
    };

    const coinImages = [
        // URLs of the coins you provided
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
    let coins = [];

    function placeCoinsRandomly() {
        coinImages.forEach(url => {
            const coin = {
                x: Math.random() * (canvas.width - 60) + 30, // Avoid placing coins too close to the edge
                y: Math.random() * (canvas.height - 60) + 30,
                url: url,
                found: false
            };
            coins.push(coin);
        });
    }

    canvas.addEventListener('click', (event) => {
        const rect = canvas.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const clickY = event.clientY - rect.top;

        // Create a digging effect
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(clickX, clickY, 15, 0, Math.PI * 2, true); // Digging radius
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over'; // Reset composite operation

        coins.forEach((coin, index) => {
            if (!coin.found && Math.hypot(coin.x - clickX, coin.y - clickY) < 15) { // Check proximity to the click
                coin.found = true;
                foundCoinsCount++;
                coinSound.play();
                // Coin is not redrawn, simulating it being picked up
                updateInventory(coin);
                if (foundCoinsCount === coins.length) {
                    congratulationsMessage.classList.remove('collapse');
                }
            }
        });
    });

    function updateInventory(coin) {
        const inventoryItem = document.createElement('div');
        inventoryItem.classList.add('coin');
        inventoryItem.style.backgroundImage = `url('${coin.url}')`;
        inventory.appendChild(inventoryItem);

        inventoryItem.addEventListener('click', () => {
            enlargedCoinView.style.backgroundImage = `url('${coin.url}')`;
            enlargedCoinView.classList.remove('collapse');
        });
    }

    inventoryToggle.addEventListener('click', () => {
        inventory.classList.toggle('expanded');
    });

    enlargedCoinView.addEventListener('click', () => {
        enlargedCoinView.classList.add('collapse');
    });
});
