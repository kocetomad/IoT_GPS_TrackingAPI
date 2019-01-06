#!/bin/bash
re='^[0-9]+$'
check=0
add=""
usage() { echo "Usage: $0 [-p <Port for web client socket>] [-s <Port for Android client socket>] [-d <directory>] [-u <Toggles USB support>] [-n (set name)<string>]" 1>&2; exit 1; }

while getopts ":p:s:d:n:u" o; do
    case "${o}" in
        p)
            p=${OPTARG}
	    if ! [[ $p =~ $re ]] ; then
   		 echo "Invalid Port Number" >&2; exit 1
            fi
            ;;
	s)
	    s=${OPTARG}
	    if ! [[ $s =~ $re ]] ; then
                 echo "Invalid Port Number" >&2; exit 1
            fi
            ;;

        d)
            d=${OPTARG}
	    if [ ! -d "$d" ]; then
		  echo "$d is not a valid directory."
  	          exit 1
	    fi
            ;;
	u)
	    u="-t -i --privileged -v /dev/bus/usb:/dev/bus/usb"
	    check=1
	    ;;
	n)
	    add=${OPTARG}
	    n=${OPTARG}
	    n="--name $n"
	   
	    ;;
        *)
            usage
            ;;
    esac
done
shift $((OPTIND-1))

if [ -z "${p}" ] || [ -z "${s}"] || [ -z "${d}" ] || [ -z "${n}" ]; then
    usage
fi

echo "port : ${p}"
echo "dir : ${d}"
if [ $check == 1 ];
then
     echo "USB support enabled"
else 
     echo "USB support not enabled"
fi;


docker run -d --expose=3000 --expose=4000 -p $p:3000 -p $s:4000 -v $d:/Node $u $n noxid/diplomna:v1

sleep 1
docker exec -d -it $add bash ./Test.sh
sleep 5
sysctl net.ipv4.conf.all.forwarding=1
sudo iptables -P FORWARD ACCEPT


