const { Client, LocalAuth } = require('whatsapp-web.js');
const client = new Client({ authStrategy: new LocalAuth() });

client.on('message_reaction', async (reaction) => {
    // كشف إيموجي الإصبع الأوسط
    if (reaction.reaction === '🖕') {
        const chat = await client.getChatById(reaction.id.remote);
        chat.sendMessage('⚠️ Warning: Rude reactions are not allowed here!');
    }
});

client.initialize();
