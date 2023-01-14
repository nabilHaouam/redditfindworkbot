require('dotenv').config()
const Reddit = require('reddit')
const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, {polling: true});

const reddit = new Reddit({
  username: 'duke_dev',
  password: process.env.PASSWORD,
  appId: process.env.APP_ID,
  appSecret: process.env.API_KEY
})
const date = new Date()
const timeMilliseconds = date.getTime()
const timeSeconds = timeMilliseconds /1000
reddit.get('/r/slavelabour/')
    .then((res)=>{
        const children = res.data.children;
        
        for(const child of children){
            if (timeSeconds - child.data.created_utc <= 60 && child.data.link_flair_text == "Task"){
                const telegramMsg = `<b>Title: ${child.data.title}</b> \n Description : ${child.data.selftext} \n Link : ${child.data.url}`
                bot.sendMessage(-1001580329503,telegramMsg, {parse_mode: "HTML"}).catch(err=> console.log(err)).then(()=>process.exit());   
                console.log(telegramMsg) //this log is to be removed once I write the code to send the message with telegram 
            }   
        }
        
    }) 
    .catch((err)=> console.log(err))

