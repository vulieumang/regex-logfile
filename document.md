
từ file raw
chạy lệnh
`awk '/transaction(.*[^\s]+\s*)begin/,/end transaction/' logfile.log > data.log`
để lọc ra các group 
`19-3-2020 02:19:26.762	INFO	18	188	transaction 17036 begin
19-3-2020 02:19:26.926	INFO	16	191	creating socket for querying route
19-3-2020 02:19:26.926	INFO	14	187	end transaction 17036
...
19-3-2020 02:19:27.924	INFO	18	184	transaction 17039 begin
19-3-2020 02:19:28.027	INFO	11	189	calculating thresholds...
19-3-2020 02:19:28.027	INFO	19	185	end transaction 17039`

Nếu xử lý luôn được bằng JS thì tốt hơn => đang update

Dùng node đọc file data.log
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
