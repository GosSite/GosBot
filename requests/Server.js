const axios = require('axios');
class Server{
    async getUserData(phoneNumber){
        //https://curious-pinafore-goat.cyclic.app
        try {
            const response = await axios.get(`http://localhost:3000/user/data/${phoneNumber}`);
            return response;
        } catch (error) {
            console.log('Ошибка при получении данных с сервера:', error.response.data);
            return error.response
        }
    }
    async getUsers(){
        try {
            const response = await axios.get(`http://localhost:3000/user`);
            return response.data;
        } catch (error) {
            console.error('Ошибка при получении данных с сервера:', error);
        }
    }
    async sendBanUser(phoneNumber){
        try {
            const response = await axios.post(`http://localhost:3000/user/ban`, {phoneNumber});
            return response.data;
        } catch (error) {
            console.error('Ошибка при получении данных с сервера:', error);
        }
    }
}

const server = new Server();

module.exports = server