/*
##=========+====================+================================================+
##RD       login.js             |  Rick's script for login form
##RFILE    +====================+=======+===============+======+=================+
##FD   login_v1.03-onReady.js   |   4879|  4-04/23 10:22|    85| u1.03`30404.1022
##FD   login.js                 |   6263|  4/24/23 18:10|   127| u1.03`30424.1810
##DESC     .--------------------+-------+---------------+------+-----------------+
#           This JavaScrpt file ...
##LIC      .--------------------+----------------------------------------------+
#           Copyright (c) 2023 8020Data-formR * Released under
#           MIT License: http://www.opensource.org/licenses/mit-license.php
##FNCS     .--------------------+----------------------------------------------+
#           setUserForm         |
#           fetchLoginData      |
##CHGS     .--------------------+----------------------------------------------+
# .(30329.09  3/29/23 RAM  8:00a|  Get nID from URL
# .(30329.04  3/29/12 RAM  9:00a|  Write function fetchLoginData
# .(30329.06  3/29/12 RAM  9:00a|  Write function setUserForm
# .(30414.01  4/14/23 RAM 10:32a|  Wait for document.forms to be rendered)
# .(30424.06  4/24/23 RAM  6:10p|  Change Passwords

##SRCE     +====================+===============================================+
*/
var id = 90
//debugger
function clearListCookies()
{
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++)
    {
        var spcook =  cookies[i].split("=");
        deleteCookie(spcook[0]);
    }
    function deleteCookie(cookiename)
    {
        var d = new Date();
        d.setDate(d.getDate() - 1);
        var expires = ";expires="+d;
        var name=cookiename;
        //alert(name);
        var value="";
        document.cookie = name + "=" + value + expires + "; path=/";
    }
    //window.location = ""; // TO REFRESH THE PAGE
}
     clearListCookies()

//alert("DocumentCookieBefore: '" + document.cookie + "'")
//document.cookie = "UserID = ; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/;"
//document.cookie = "UserID = ' ${id} `; path=/"

//document.cookie = "UserID = 15; path=/"
//alert("DocumentCookieAfter: '" + document.cookie + "'")

//alert(`UserID Set to nn\n ${document.cookie}`)
var  nID  = window.location.search.match( /id=([0-9]+)/)                                // .(30329.09.1 RAM Get nID from URL)
            nID  = (nID && nID[1]) ? nID[1] : 0                                         // .(30329.09.2)
            //if (nID > 0) {
             //clearListCookies()
             // window.location = ""; // TO REFRESH THE PAGE
            //}

            document.cookie = "UserID = ; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/;"
            document.cookie = `UserID = ${nID}; path=/`

         $( document ).ready( ( ) =>                                                    // .(30414.01.1 RAM Wait for document.forms to be rendered)
            setUserForm( nID )                                                          // .(30329.06.1 RAM Use it)
            )                                                                           // .(30414.01.2)
//--------  ---------------------------------------------------------

  async function setUserForm( nID ) {                                                   // .(30329.06.1 Beg RAM Write function setUserForm)

       var  pUser = await fetchLoginData( nID )
       var  pForm = document.forms[0]
            pForm.username.value = pUser.email
            pForm.password.value = pUser.pin
            }                                                                           // .(30329.06.1 End)
//--------  ---------------------------------------------------------

async  function fetchLoginData( nID ) {                                                 // .(30329.04.2 Beg RAM Write function fetchLoginData)

    var  pLoginData = { id: 0, code: "", name : "", email: "" }

     if (nID == 90) {
         pLoginData =
           { id   :  nID
           , code : "RS"
           , name : "Richard Schinner"
           , email: "evantage@comcast.net"
           , pin  : "iodd"                                                              // .(30424.06.1 RAM Change Password, was "blueNSX")
             }
         }
     if (nID == 15) { pLoginData = { id: nID, code: "BT", name : "Bruce Troutman",   email: "bruce.troutman@gmail.com",  pin: "iodd" } } // .(30424.06.2 RAM Change Password, was "fishfortrout")
     if (nID ==  9) { pLoginData = { id: nID, code: "RM", name : "Robin Mattern",    email: "robin.mattern@gmail.com",   pin: "iodd" } } // .(30424.06.3 RAM Change Password, was "scroogemcduck")
     if (nID ==  6) { pLoginData = { id: nID, code: "KF", name : "Kennett Fussell",  email: "kffussellathome@gmail.com", pin: "iodd" } } // .(30424.06.4 RAM Change Password, was "doctorprof")
     if (nID == "") { pLoginData = { id: nID, code: "",   name : "",  email: "", pin: "" }
     if (nID == "") {
        $("#login-cancel").css("display", "inline-block");
        } 
        
     if (nID == 500) {
        //alert ("Error Msg")
        pLoginData =
            { id: nID
            , code: "Login"
            , name : "Donald Duck"
            , email: "sMcduck@gmail.com"
            , pin: "lovedaisy"
            }
            $("#login-error").css("display", "block");
            $("#login-button").css("display", "none");
            $("#login-cancel").css("display", "inline-block");
            $("#show-pin").css("display", "none");
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
 return  pLoginData
      }                                                                                 // .(30329.04.2 End)
//   -----  ---------------------------------------------------------
