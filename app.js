const fs = require('fs');
const moment = require('moment');
const arrayToTxtFile = require('array-to-txt-file')


fs.readFile('data.log', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const regex = /19-3-2020(.*?)(?=end transaction)/gms;
  var arr=[];

  let m;

  while ((m = regex.exec(data)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
          regex.lastIndex++;
      }
      
      // The result can be accessed through the `m`-variable.
      m.forEach((match, groupIndex) => {
          // console.log(`Found match, group ${groupIndex}: ${match}`);
          arr.push(match);
      });
  }
  // arr = array with each element is group start - end transaction
  
 
  var IdAndTime = []
  arr.forEach(element => {
    IdAndTime.push([getMilisecondsExcuteGroup(element),getIdTransactional(element)])
  });
  
  var result = IdAndTime.sort((a,b) => a[0] - b[0])
  

  arrayToTxtFile(result, './result.txt', err => {})
  console.log('Fastest transaction is: ',result[0])
  console.log('Average time is: ',averageTime(result))

});

function getMilisecondsExcuteGroup(group) {
  
  var arrLines = group.split("\n")
  var arrTimes = [];
  arrLines.forEach(element => {
    arrTimes.push(element.split("\t")[0].split(" ")[1])
    // console.log(element.split("\t")[0].split(" ")[1])
  });
  var fLine = moment(arrTimes[0], 'HH:mm:ss.SSS').valueOf();
  var lLine = moment(arrTimes.slice(-1).pop()  , 'HH:mm:ss.SSS').valueOf();
  return lLine-fLine
  
}

function getIdTransactional(group){
  var info = group.split("\n")[0].split("\t").slice(-1).pop()
  const regex = /transaction (.*?) begin/g;

  var match = regex.exec(info);
  
 return match[1]
}

function averageTime(arr){
  var sumTime = 0;
  arr.forEach(element => {
    sumTime+=parseInt(element[0])
  });
  return sumTime/arr.length;
}