
# nộp bài thi Renoleap

# regex-logfile
từ file logfile.log
chạy lệnh

`awk '/transaction(.*[^\s]+\s*)begin/,/end transaction/' logfile.log > data.log`

để log group transaction ra file data.log


rồi xử lý tiếp bằng nodejs trong app.js

chạy lệnh 
node app.js
kết quả sẽ hiện trong log

`Fastest transaction id is:  17247  with time:  100
Average time is:  157`