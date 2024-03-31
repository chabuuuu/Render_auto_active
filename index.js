require('dotenv').config()
var cron = require('node-cron');
const axios = require('axios');
const qs = require('qs');
const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, {polling: true});
let chatId
bot.onText(/\/get_id/, (msg, match) => {
    chatId = msg.chat.id;
    bot.sendMessage(chatId, chatId.toString());
  });
function sendMessage(msg, chatId){
    if (!chatId){
        console.log('chatId is not defined');
        return;
    }
    bot.sendMessage(chatId, msg);
}
function triggerServer (){
    let data = qs.stringify({
        'email': 'haphuthinh332004@gmail.com',
        'password': '@1ThinhHa' 
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://airlane-management-backend.onrender.com/api/v1/customer/login',
        headers: { },
        data : data
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
        sendMessage(`Server is down, Reason: ${error.message}`, chatId);
      });
}

cron.schedule('*/7 * * * *', () => {
  triggerServer();
});