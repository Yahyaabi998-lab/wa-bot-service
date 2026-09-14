const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { GoogleAuth } = require('google-auth-library');

// Inisialisasi WhatsApp Client (Headless Mode)
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', (qr) => {
    console.log('SCAN QR CODE DI BAWAH INI VIA WHATSAPP:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Bot WhatsApp siap dan sudah terhubung!');
});

client.on('message', async (msg) => {
    const pesan = msg.body.toLowerCase();
    
    if (pesan.includes('jadwal')) {
        // Contoh balasan teks (kamu bisa hubungkan ke Google Sheets API di sini)
        msg.reply('Terima kasih telah menghubungi.\nBerikut jadwal terbaru kami...');
    }
});

client.initiate = () => client.initialize();
client.initiate();