const coins = [
    'https://touchcoins.moneymuseum.com/coins_media/Republic-of-Afghanistan-1-Afghani-2005/2126/obverse.png',
    'https://p7.hiclipart.com/preview/908/763/612/the-treasury-department-government-of-thailand-chakri-dynasty-thailand-ministry-of-finance-ten-baht-coin-coin.jpg',
    'https://banner2.cleanpng.com/20180714/quj/kisspng-coin-crown-danish-krone-currency-bureau-de-change-drawing-coin-5b4a65e4907dd1.8534690915316024045919.jpg',
    'https://p7.hiclipart.com/preview/551/466/481/coin-venezuelan-bolivar-gold-medal-coin.jpg',
    'https://banner2.cleanpng.com/20180330/dje/kisspng-egyptian-pound-bi-metallic-coin-one-pound-pharaoh-5abdbc24838aa7.1637577015223839085388.jpg',
    'https://www.florinus.lv/resized/cbf54fd5c313ada8c568a6f737187fec-300x300-transparent.png',
    'https://banner2.cleanpng.com/20180721/qk/kisspng-coin-ugandan-shilling-banknote-currency-australian-fiftycent-coin-5b533c7d248ed5.5018525215321816291498.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/3/3f/Coins_of_Romania_1_Ban_2005_transparent.png',
    'https://w7.pngwing.com/pngs/198/403/png-transparent-ecuadorian-centavo-coins-ecuadorian-centavo-coins-currency-penny-lakshmi-gold-coin-gold-metal-united-states-dollar.png'
];
const foundCoins = [];

function placeCoins() {
    coins.forEach((coinSrc, index) => {
        const coin = document.createElement('img');
        coin.src = coinSrc;
        coin.id = 'coin-' + index;
        coin.className = 'hidden-coin';
        coin.style.position = 'absolute';
        coin.style.top = Math.random() * 90 + '%'; // Random top position
        coin.style.left = Math.random() * 90 + '%'; // Random left position
        coin.onclick = function() { unearthCoin(index); };
        document.getElementById('game-area').appendChild(coin);
    });
}

function unearthCoin(coinId) {
    const coin = document.getElementById('coin-' + coinId);
    coin.style.opacity = '1'; // Make the coin fully visible to simulate unearthing
    addToInventory(coin.src);
    foundCoins.push(coinId); // Keep track of found coins
    checkWinCondition(); // Check if all coins have been found
}

function addToInventory(coinSrc) {
    const inventoryItem = document.createElement('img');
    inventoryItem.src = coinSrc;
    inventoryItem.className = 'inventory-item';
    document.getElementById('inventory').appendChild(inventoryItem);
}

function checkWinCondition() {
    if (foundCoins.length === coins.length) {
        // Show congratulations message
        document.getElementById('congrats-message').style.display = 'block';
    }
}

// Collapsible sections for inventory and congratulations message
function setupCollapsible() {
    var coll = document.getElementsByClassName("collapse");
    var i;

    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    }
}

// Initialize the game
window.onload = function() {
    placeCoins();
    setupCollapsible();
};
