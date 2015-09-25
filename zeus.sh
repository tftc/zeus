if [ ! -n "$1" ]; then
    mycommd='dev'
else
	mycommd=$1
fi
gulp $mycommd &
supervisor --harmony ./app/bootSrtap.js 2>>log/node.error.log | tee log/node.log