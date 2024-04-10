const TelegramBot = require('node-telegram-bot-api');

const token = '7028544188:AAFpRqbr-DLDe_-uJLYQUenY7JCLbI5dc28';

const bot = new TelegramBot(token, { polling: true });


bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Привет! Я бот. Отправь мне команду /info.');
});

bot.onText(/\/info/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Это информация о боте.');
    // Дополнительные действия, связанные с командой /info
});

bot.startPolling()

