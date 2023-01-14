require('dotenv').config()
const Reddit = require('reddit')

const reddit = new Reddit({
  username: 'duke_dev',
  password: process.env.PASSWORD,
  appId: process.env.APP_ID,
  appSecret: process.env.API_KEY
})
const date = new Date()
const timeMilliseconds = date.getTime()
const timeSeconds = timeMilliseconds /1000
const sub = reddit.get('/r/slavelabour/')
    .then((res)=>{
        const children = res.data.children;
        
        for(const child of children){
            if (timeSeconds - child.data.created_utc <= 120 && child.data.link_flair_text == "Task"){
                const telegramMsg = `title: ${child.data.title} \n description : ${child.data.selftext} \n link : ${child.data.url}`
                console.log(telegramMsg) //this log is to be removed once I write the code to send the message with telegram 
            }   
        }
    })     
    .catch((err)=> console.log(err))

