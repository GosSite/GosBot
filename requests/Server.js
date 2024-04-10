const axios = require('axios');
class Server{
    async getUserData(phoneNumber){
        try {
            const response = await axios.get(`https://curious-pinafore-goat.cyclic.app/user/data/${phoneNumber}`);
            return response.data;
        } catch (error) {
            console.error('Ошибка при получении данных с сервера:', error);
            throw error;
        }
    }
    async getUsers(){
        try {
            const response = await axios.get(`https://curious-pinafore-goat.cyclic.app/user`);
            return response.data;
        } catch (error) {
            console.error('Ошибка при получении данных с сервера:', error);
            throw error;
        }
    }
}

const server = new Server();

module.exports = server