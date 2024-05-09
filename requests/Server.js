const axios = require('axios');
class Server{
    async getUserData(phoneNumber){
        //https://curious-pinafore-goat.cyclic.app
        try {
            const response = await axios.get(`https://gosserver-production.up.railway.app/user/data/${phoneNumber}`);
            return response;
        } catch (error) {
            console.log('Ошибка при получении данных с сервера:', error.response.data);
            return error.response
        }
    }
    async getUsers(){
        try {
            const response = await axios.get(`https://gosserver-production.up.railway.app/user`);
            return response.data;
        } catch (error) {
            console.error('Ошибка при получении данных с сервера:', error);
        }
    }
    async sendBanUser(phoneNumber){
        try {
            const response = await axios.post(`https://gosserver-production.up.railway.app/user/ban`, {phoneNumber});
            return response.data;
        } catch (error) {
            console.error('Ошибка при получении данных с сервера:', error);
        }
    }
    async getHoteLineNumber(){
        try {
            const response = await axios.get(`https://gosserver-production.up.railway.app/hotline`);
            return response.data[0];
        } catch (error) {
            console.log('Ошибка при получении данных с сервера:', error);
            return error.response
        }
    }
    async updHoteLineNumber(oldNumber, newNumber){
        try {
            const response = await axios.post(`https://gosserver-production.up.railway.app/hotline/edit`, {oldNumber, newNumber});
            return response;
        } catch (error) {
            console.log('Ошибка при получении данных с сервера:', error);
            return error.response
        }
    }
}

const server = new Server();

module.exports = server