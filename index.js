const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', (qr) => {
    console.log('--- KODE QR RAW STRING (Copas ke generator jika berantakan) ---');
    console.log(qr);
    console.log('----------------------------------------------------------');
    
    // Tampilkan link gambar QR langsung yang bisa diklik / dibuka
    const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qr)}`;
    console.log('>>> BUKA LINK INI DI TAB BARU UNTUK SCAN QR CODE: <<<');
    console.log(qrImageUrl);
    console.log('----------------------------------------------------------');
    
    // Tetao cetak versi terminal kecil
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('✅ Bot WhatsApp berhasil terhubung dan SIAP digunakan!');
});

client.on('message', async (msg) => {
    const pesan = msg.body.toLowerCase();
    if (pesan.includes('jadwal')) {
        msg.reply('Terima kasih telah menghubungi.\nBerikut jadwal terbaru kami...');
    }
});

client.initialize();
