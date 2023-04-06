const cron = require('node-cron');

let cleaner_notify = cron.schedule('* * * * *', () => { 
  try {
    //Do something here
  } catch (error) {
    throw error;        
  }
});   

cleaner_notify.start();
