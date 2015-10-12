#!/bin/bash

#set -x
exec 0</dev/null

help_info()
{
        cat <<-EOFSTR
    Usage: $(basename ${0}) [-S] [-P] [-F] [-B] [-T] [-D] [-X] [-V|h]
    -S      Set the save days, default 7, but savedays >= 1
    -P      Set the logfile path, this is necessary, eg: -P ./log/
    -F      Set the logfile name, this is necessary, eg: cut by ',', -F test.log,test.log.wf
    -B  Set the backup path, default './'
    -D      Set the time of delete oldfile, default '00'
    -X  Set whether delete old logfile, default '1', delete old logfile, if '-X 0' never delete old logfile
    -T      Set the type of backup logfile, default 'D'; 'D|d'=day; 'H|h'=hour;
    #-M      Set the mail adress, defalut empty, never send warning mail;
    -V | h  show help and version, i.e. this page
EOFSTR
    return 0
}

## start 

if [ ${#} -eq "0" ]
then 
    help_info   
    exit 1 
fi

while getopts "VhS:s:P:p:F:f:T:t:D:d:B:b:X:x:A:a" Option
do
        case ${Option} in
    h | V ) help_info; exit 0;;
    S | s ) save_days=${OPTARG};;
    P | p ) logs_path=${OPTARG};;
    F | f ) logs_file=${OPTARG};;
    D | d ) del_time=${OPTARG};;
    T | t ) bak_type=${OPTARG};;
    M | m ) mail_address=${OPTARG};;
    B | b ) bak_path=${OPTARG};;
    X | x ) is_del=${OPTARG};;
    A | a ) is_apache=${OPTARG};;
    * ) continue;;
    esac
done
shift $((OPTIND - 1))

mail_address=${mail_address:=''}
logs_path=${logs_path}
logs_file=${logs_file}
bak_path=${bak_path:='.'}
bak_type=${bak_type:='H'}
save_days=${save_days:=7}
del_time=${del_time:=00}
is_del=${is_del:=1}
is_apache=${is_apache:=0}
cur_stmp=$(date +%H) 
cur_time_stmp=$(date -d "0 hours ago" +%Y%m%d%H)
cur_day_stmp=$(date -d "0 hours ago" +%Y%m%d) 
hour_time_stmp=$(date -d "1 hours ago" +%Y%m%d%H)
day_time_stmp=$(date -d "1 days ago" +%Y%m%d) 
del_stmp=$(date -d "$(( ${save_days} + 1 )) days ago" +%Y%m%d)
day_1=$(date -d "1 days ago" +%Y%m%d)
day_2=$(date -d "2 days ago" +%Y%m%d)

{ [ -z ${logs_path} ] || [ -z ${logs_file} ] || [ ${save_days} -lt 1 ];} && { \
echo "Warning:-P='' or -F='' or -S<1"; echo "please check '-P | -F | -S' \! "; exit 1; }

cd ${logs_path}/ || { echo "log path not exist \! plase check '-P ${logs_path}' \! "; exit 1; }
[ ! -d ${bak_path} ] && { mkdir -p ${bak_path} || { echo "bak path can't created \! plase check '-B ${bak_path}"; exit 1; }; }

old_ifs=${IFS}
IFS=','

for file in ${logs_file}
do
    touch ${file}

    case ${bak_type} in

        D | d ) # bak_type='D'
        if [ ${is_apache} == 0 ]  
        then
            if [ ! -s ${file}.${day_1} ] 
            then
                mv -f ${file} ${file}.${day_1}
            fi
        else
            rm -f ${file}
            ln -s  ${file}.${cur_day_stmp} ${file}
        fi


        find ./ -maxdepth 1 -mmin +$(( 24 * 60 - 30 )) -a -type f -a -name "${file}.[0-9]*" | xargs -i mv {} ${bak_path}/

        if [ ${is_del} == 1 ]
        then
            find ${bak_path}/ -maxdepth 1 -mmin +$(( ${save_days} * 24 * 60 - 30 )) -a -type f -a -name "${file}.[0-9]*" | xargs -i rm -rf {}
        fi

    ;;
        
    * ) # bak_type='H'
        if [ ${is_apache} == 0 ] 
        then
            if [ ! -s ${file}.${hour_time_stmp} ]
            then
                mv -f ${file} ${file}.${hour_time_stmp}
            fi
        else
            rm -f ${file}
            ln -s  ${file}.${cur_time_stmp} ${file}
        fi

        if [ ${cur_stmp} == ${del_time} ]
        then
            touch ${file}.${day_1}{00,01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23} 
            find ./ -maxdepth 1 -mmin +$(( 24 * 60 - 30 )) -a -type f -a -name "${file}.[0-9]*" | xargs -i mv {} ${bak_path}/

            if [ ${is_del} == 1 ] 
            then

                find ${bak_path}/ -maxdepth 1 -mmin +$(( ${save_days} * 24 * 60 - 30 )) -a -type f -a -name "${file}.[0-9]*" | xargs -i rm -rf {}
            fi
        fi
    ;;

    esac

IFS=${old_ifs}

done

exit 0

## end