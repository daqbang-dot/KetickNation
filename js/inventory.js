/* js/inventory.js */

// Simulasi jumlah kredit (RPG style)
let userCredits = 99999;
const creditsDisplay = document.querySelector('.stats-bar span');

// Fungsi untuk kemaskini paparan kredit
function updateCreditsDisplay() {
    creditsDisplay.textContent = `CREDITS: ${userCredits.toLocaleString()}`;
}

// Ambil semua butang 'EQUIP ITEM'
const equipButtons = document.querySelectorAll('.btn-buy');

equipButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        // Kenal pasti kad produk mana yang ditekan
        const card = e.target.closest('.item-card');
        
        // Ekstrak harga dari elemen teks (contoh: "RM 249.00" jadi 249.00)
        const priceText = card.querySelector('.item-price').textContent;
        const price = parseFloat(priceText.replace('RM ', '').replace(',', ''));

        // Semak jika kredit mencukupi
        if (userCredits >= price) {
            // Tolak kredit & kemaskini paparan
            userCredits -= price;
            updateCreditsDisplay();

            // Ubah butang untuk tunjuk barang dah diambil
            button.textContent = '// SYSTEM EQUIPPED //';
            button.style.backgroundColor = 'var(--mid-blue)'; 
            button.style.color = 'var(--mecha-white)';
            button.disabled = true;
            button.style.cursor = 'not-allowed';

            // Beri efek visual pada kad (Glow effect)
            card.style.borderColor = 'var(--mid-blue)';
            card.style.boxShadow = '0 0 20px rgba(40, 92, 204, 0.4)';

            // Kemaskini Bar 'Stock Durability' (Simulasi kehabisan stok)
            const durabilityBarContainer = card.querySelector('div[style*="background: #ddd"]');
            const durabilityBar = durabilityBarContainer.querySelector('div');
            const durabilityText = card.querySelector('small');
            
            durabilityBar.style.width = '0%';
            durabilityText.textContent = 'STOCK DURABILITY: DEPLETED';
            durabilityText.style.color = 'var(--maroon)';
            durabilityText.style.fontWeight = 'bold';

            // Boleh tambah fail audio pendek di sini nanti untuk bunyi mekanikal
            console.log("Log: Item equipped successfully.");
        } else {
            alert("SYSTEM WARNING: INSUFFICIENT CREDITS!");
        }
    });
});

// Jalankan fungsi ini masa mula-mula load
updateCreditsDisplay();
