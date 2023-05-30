
        // function setCookie(cname, cvalue, exdays) {
        //     var d = new Date();
        //     d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        //     var expires = "expires="+d.toUTCString();
        //     document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        // }

        // setCookie("MemberID", 1, 30);

        //document.cookie = "MemberID = 90";

        //let c = 1;
        // let c = document.cookie.substr(14,2);

        //document.cookie = "aLoginCount=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

        //debugger
        var c = document.cookie;
        var n = c.indexOf("=")
        if (n > 0) {
            var id = parseInt(c.substring(n+1))   
        }
        else {
            var id = 0
        }
        //alert ("c = " + c)
        //alert ("[1]id = " + id)

        //let id = (n>0) ? c.substring(n+1) : 0;
        console.log('header[1]      UserId = "' + id + '"')

        //var nLoginCount = c
        //var nLoginCount = 0
        var iLogin = "RS"
        switch (id) {
          case 6:
        //alert ("[2]id = " + id)
            iLogin = "KF";
            break;
            case 9:
        //alert ("[2]id = " + id)
            iLogin = "RM";
            break;
          case 15:
            iLogin = "BT";
            break;
          case 90:
            iLogin = "RS";
            break;
          case 500:
            iLogin = "&nbsp;Login";
            break;          
          default:
            iLogin = "??";
        }
        //alert ("[3]id = " + id)
        //alert ("iLogIn = " + iLogin)


        if (id > 0)  
        {  
           // alert("id = " + id )
            var aLogIn = iLogin;
            //let aLogIn = "<a href='#' title='Welcome' style='text-decoration:none;'>RS</a>";
            var pSpan = $("#log") 
            //document.getElementById("log").innerHTML = aLogIn;
            pSpan.html(aLogIn)
            $("#ContactAll").css("display", "block");
            $("#ContactLink").css("display", "block");
            $("#contact-dropdown").css("display", "block");
            $("#login-inits").css("width", "35px")
            // $("#pencil-image-members").css("display", "inline-block")
            // $("#pencil-image-projects").css("display", "inline-block")
            $("#pencil-image-inits").css("display", "inline-block")
            pSpan.css("text-decoration", "none");
            pSpan.css("color", "white");
            pSpan.css("padding", "4px");
            pSpan.css("background-color", "blue");
            pSpan.css("font-size", "18px");
            pSpan.css("font-weight", "500");
            pSpan.css("font-family", "monospace");
            pSpan.css("border-radius", "50%");
            pSpan.css("border", "solid #5A5A5A 3px");
            pSpan.css("text-align", "center");            // .(30414.01.2 RAM Was pSpan.a.css which did not exist)
         // pSpan.css("display", "block");
        } 
        else if (id == 0)  
        {
            let aLogIn = "Log In";
            //let aLogIn = "<a class="login" href='../login/login.html'>Log In</a>";            
            var pSpan = $("#log") 
            pSpan.css("text-decoration", "none");
            //document.getElementById("log").innerHTML = aLogIn;
            pSpan.html(aLogIn)
            $("#ContactAll").css("display", "none");
            $("#ContactLink").css("display", "none");
            $("#contact-dropdown").css("display", "none");
            $("#pencil-image-members").css("display", "none")
            $("#pencil-image-projects").css("display", "none")
            $("#pencil-image-inits").css("display", "none")
            pSpan.css("color", "white");
            pSpan.css("padding", "5px");
            pSpan.css("width", "60px");
            pSpan.css("background-color", "blue");
            pSpan.css("font-size", "15px");
            pSpan.css("font-weight", "600");
            pSpan.css("font-family", "arial");
            pSpan.css("border-radius", "8px");
            pSpan.css("border", "solid #5A5A5A 0px");
         // pSpan.css("display", "flex");
         // pSpan.a.css("text-align", "center");
        } 
        else if (id == 500)  
        {
            let aLogIn = "Log In";
            //let aLogIn = "<a class="login" href='../login/login.html'>Log In</a>";            
            var pSpan = $("#log") 
            pSpan.css("text-decoration", "none");
            pSpan.html(aLogIn)
            $("#ContactAll").css("display", "none");
            $("#ContactLink").css("display", "none");
            $("#contact-dropdown").css("display", "none");
            pSpan.css("color", "white");
            pSpan.css("padding", "5px");
            pSpan.css("width", "60px");
            pSpan.css("background-color", "blue");
            pSpan.css("font-size", "15px");
            pSpan.css("font-weight", "600");
            pSpan.css("font-family", "arial");
            pSpan.css("border-radius", "8px");
            pSpan.css("border", "solid #5A5A5A 0px");
        }
        else
        {
            $("#log").css("display", "none");
        }
    
        
        function myFunction(x) 
        {
            if (x.matches) {        // If media query matches
                $("#log").css("display", "none");
                // document.body.style.backgroundColor = "yellow";
            }
            else 
            {
                $("#log").css("display", "flex");
                // document.body.style.backgroundColor = "pink";
            }
        }

        var x = window.matchMedia("(max-width: 500px)")
            myFunction(x)               // Call listener function at run time
            x.addListener(myFunction)   // Attach listener function on state changes

        //  ------------------------------------------------------------


//RJS trial
    //-----Fetch meetings data -----------------------------------------/
    import { setAPI_URL } from '../mjs/formr_utility-fns_u1.07.mjs' // .(30415.02.1 RAM Avoid CORS error).(30430.03.1).(30505.01.1 RJS Import here)(30507.01.5 RAM No Import).(30507.02.5 RAM Use Import)        
                            //debugger 
                            console.log( "members.html[1]       Loading 1st module script" )    
        
                            await setAPI_URL( )                                                 // .(30507.01.7 RAM Remove getAPI_URL for data fetches in members.html).(30507.02.7) 
                        var pMeetings = document.getElementById( "Meetings" )
//                  pMeetings.innerHTML = fmtMeetings( pJSON )

                    fetch( `${aAPI_URL}/meetings` )                                     // .(30214.05.7)
           .then( ( res  ) => res.json( ) )
           .then( ( json ) => {  
                                pMeetings.innerHTML = fmtMeetingsDate( json ) } ) 
           .catch(( err  ) =>   pMeetings.innerHTML `** ${err.message}` );                     


        function  fmtMeetingsDate( pJSON ) {  
            var  mMeetings =  pJSON.meetings   // .(30209.01.6 RAM As is  now defined in /projects api)
            var  aHTML  =  mMeetings.map( fmtMeetingDate ).join( "\n" )
         return  aHTML            
     //     ---  -------  =  -----------------------------------
     
       function  fmtMeetingDate( pMeeting, i ) {
          $( "#MeetingDateBanner" ).html(pMeeting.strMeetingDate)
          aData = aRow
          return aData
                 }   // eof  fmtMeeting
     //     ---  -------  =  ----------------------------------
                 }   // eof  fmtMeetings
     //--------  -------  =  -------------------------------------------------------
     