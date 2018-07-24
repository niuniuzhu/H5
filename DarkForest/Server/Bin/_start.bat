ping -n 1 127.0>nul
echo "start cs"
start /min cs.bat

ping -n 1 127.0>nul
echo "start gs"
start /min gs.bat

ping -n 1 127.0>nul
echo "start ls"
start /min ls.bat