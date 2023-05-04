#!/bin/bash

   aPort="3013";     aFrom="npm-start.sh default"  # if not in $1 or .env
   aStg="server3"
   aApp="s31_iodd-data-api"
   aRepo="IODD_/prod-master_v30428-et217p,wiForms"
#  aMode="dev"      # or start for prod, or build
 
#  aRepo="C:/WEBs/8020/VMs/et217p_formR0/webs/${aRepo}"
#  aPath="${aRepo}/${aStg}/${aApp}"

   aPath="$(realpath "$0")"; aPath="${aPath/\/npm-start.sh/}"; # echo "  ${aPath}"

if [ "${aStg:0:6}" == "server" ]; then aEnv="${aPath}/api/.env"; else aEnv="${aPath}/_env"; fi 
if [ "${aStg:0:6}" == "server" ]; then aStg1="[Ss]erver_"; aStg2="[Cc]lient_"; aStg3="Server";
                                  else aStg1="[Cc]lient_"; aStg2="[Ss]erver_"; aStg3="Client"; fi 
if [ -e "${aEnv}" ]; then aRegX="^ *(${aStg1})*(PORT|Port|port) *= *"
    aPgm='/^#|('${aStg2}')/{next}; /'${aRegX}'[0-9]{4,5}/ { sub( /'${aRegX}'/, "" )' 
    nPort=$( cat "${aEnv}" | awk "${aPgm}; print; exit }" );    
if [ "${nPort}" != "" ]; then aPort=${nPort}; aFrom="${aEnv: -4} ${aStg3}_Port"; fi; fi
if [ "$1"       != "" ]; then aPort="$1"    ; aFrom="npm-start.sh arg"; fi

   cd    "${aPath}"
 echo -e "\n ${aPath}"
 echo      "[nodemon] ${aStg:0:6}.mjs ${aPort} (${aFrom})"; # exit 
 echo      "------------------------------------------------------------------------------------"
#echo ""
#exit 

  chrome  http://localhost:${aPort} 

 nodemon  ${aStg:0:6}.mjs  ${aPort}


