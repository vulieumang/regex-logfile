const fs = require('fs');

fs.readFile('data.log', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  


  console.log(data);
});
