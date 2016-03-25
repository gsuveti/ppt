# ppt

## vm

http://172.18.20.20

## firewall

firewall-cmd --zone=public --add-port=3333/tcp

firewall-cmd --zone=public --add-port=27017/tcp

firewall-cmd --zone=public --list-all

## backup

mongoexport --db ppt --collection users --out users.json

mongoexport --db ppt --collection companies --out companies.json

mongoexport --db ppt --collection summer-practice-programs --out summer-practice-programs.json

