# regex-logfile

từ file logfile.log
chạy lệnh

awk '/transaction(.*[^\s]+\s*)begin/,/end transaction/' logfile.log > tran.log

để log kết quả ra file tran.log

rồi xử lý tiếp bằng nodejs trong app.js