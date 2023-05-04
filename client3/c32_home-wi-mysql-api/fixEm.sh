#!/bin/bash

  function fixIt() {

  aAWKpgm='
BEGIN { }
      /apl2|3001/ { gsub( /3001/, "3013"  )
                    gsub( /api2/, "api13" )
#                   print FILENAME ": " $0
                    print $0
                    next
                    }
                  { print }

END   { }'
      cp -p "$1" "$1.bak"
      awk "$aAWKpgm" "$1.bak" >"$1"
  }

    fixIt 'assets/js/meetings.js'
    fixIt 'meetings/meetings.html'

    fixIt 'assets/js/members.js'
    fixIt 'members/members.html'

    fixIt 'assets/js\members-bios.js'
    fixIt 'members-bios/members-bios.html'

    fixIt 'assets/js/members-projects-laptop.js'
    fixIt 'assets/js/members-projects-mobile.js'
    fixIt 'members-projects/members-projects.html'

    fixIt 'assets/js/projects.js'
    fixIt 'projects/projects.html'
