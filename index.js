const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth()
});

// إظهار الكيو أر كود في شاشة Replit
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('Scan the QR code above with your WhatsApp');
});

client.on('ready', () => {
    console.log('The Bot is Online!');
});

// الحالة الأولى: إذا تم إرسال الإيموجي في "رسالة" نصية
client.on('message', async (msg) => {
    if (msg.body.includes('🖕')) {
        await msg.reply('⚠️ Warning: This emoji is not allowed here!');
    }
});

// الحالة الثانية: إذا تم استخدام الإيموجي في "رياكت" (التفاعل)
client.on('message_reaction', async (reaction) => {
    if (reaction.reaction === '🖕') {
        const chat = await client.getChatById(reaction.id.remote);
        await chat.sendMessage('⚠️ Warning: Offensive reactions are strictly prohibited!');
    }
});

client.initialize();
