const fs = require('fs');
const moment = require('moment');
const arrayToTxtFile = require('array-to-txt-file')


const main = async () => {
  // đọc file 
  const data = await fs.promises.readFile('data.log', 'utf8')
  // gom các nhóm transaction lại
  var arrGroupTransaction = groupTranaction(data)
  // tạo ra array với time và id
  var timeAndId = []
  arrGroupTransaction.forEach(element => {
    timeAndId.push([getMilisecondsExcuteGroup(element),getIdTransactional(element)])
  });
  // sắp xếp time từ bé tới lớn
  var result = timeAndId.sort((a,b) => a[0] - b[0])
  // ghi arr  ra file txt
  arrayToTxtFile(result, './result.txt', err => {})

  console.log('Fastest transaction id is: ',result[0][1],' with time: ',result[0][0])
  console.log('Average time is: ',averageTime(result))
  
}

main()

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
function groupTranaction(string){
  // regex này chưa tối ưu vì chỉ lọc được ngày 19-3, cần tìm lọc được tất cã các ngày hoặc theo range ngày 
  const regex = /19-3-2020(.*?)(?=end transaction)/gms;
  var arr=[];
  let m;
  while ((m = regex.exec(string)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
          regex.lastIndex++;
      }
      // The result can be accessed through the `m`-variable.
      m.forEach((match, groupIndex) => {
          // console.log(`${match}`);
          arr.push(match);
      });
  }
  return arr
}