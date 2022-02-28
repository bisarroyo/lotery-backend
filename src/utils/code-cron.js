const cron = require('node-cron');

cron.schedule('* * * * * *', () => {
  console.log('running a task every minute');
  fetch('http://localhost:3000/api/v1/match', {
    method: 'POST',
    body: JSON.stringify({
      date: '02/02/2022',
      game_id: 'One',
    })
  })
});

module.exports = cron;