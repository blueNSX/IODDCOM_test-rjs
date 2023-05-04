/*
##=========+====================+================================================+
##RD       login.mjs            |  Robin's refectored script for login form
##RFILE    +====================+=======+===============+======+=================+
##FD   login_v1.07a.mjs         |  19117|  4-28-23 17:37|   281| u1.07`30428.1737
##FD   login_v1.07b.mjs         |  20457|  4-28-23 18:02|   294| u1.07`30428.1802
##FD   login_v1.07c.mjs         |  24938|  4-29-23 13:34|   383| u1.07`30429.1334
##FD   login_v1.07c.mjs         |  27370|  4/29/23 14:30|   389| u1.07`30429.1430
##FD   login_v1.07c.mjs         |  28404|  4/30/23 10:08|   407| u1.07`30430.1008
##DESC     .--------------------+-------+---------------+------+-----------------+
#           This JavaScrpt file ...
##LIC      .--------------------+----------------------------------------------+
#           Copyright (c) 2023 8020Data-formR * Released under
#           MIT License: http://www.opensource.org/licenses/mit-license.php
##FNCS     .--------------------+----------------------------------------------+
#           clearListCookies    |
#             deleteCookie      |
#           setCookie           |
#           getID               |
#           setLoginForm        |
#             fetchLoginData    |
#               await fetch( aURL )
#               onFetchLoginData|
#           onLoginForm_Submit  |
#               await fetch( aAction, pFetchCfg )
#               onLoginFailure  |
#               onLoginSuccess  |
#           fmtErrMsg           |
##CHGS     .--------------------+----------------------------------------------+
# .(30214.05  2/14/23 RAM  8:10p|  Try using GET
# .(30329.04  3/29/12 RAM  9:00a|  Write function fetchLoginData
# .(30329.06  3/29/23 RAM 11:10a|  Write function setUserForm
# .(30329.09  3/29/23 RAM  8:00a|  Get nID from URL
# .(30414.01  4/14/23 RAM 10:32a|  Wait for document.forms to be rendered

# .(30415.01  4/15/23 RAM  8:30a|  Refactor into login.mjs
# .(30415.03  4/15/23 RAM  9:15a|  Write onSubmit, getID, setCookie
# .(30416.04  4/16/23 RAM  8:30a|  Live Server: page reloads on error
# .(30417.05  4/17/23 RAM  4:00p|  Submit fetch with options
# .(30420.06  4/20/23 RAM  8:15a|  Use Server aAPI_URL
# .(30421.01  4/21/23 RAM 10:22a|  Add onLoginSuccess and onLoginFailure
# .(30421.03  4/21/23 RAM  7:50a|  Added onUserForm_Submit
# .(30421.04  4/21/23 RAM  8:30a|  Rewrite function fetchLoginData
# .(30423.03  4/23/23 RAM  8:45a|  Add Console msgs. Add FName[LNo]
# .(30423.05  4/23/23 RAM  9:15a|  Send back error message?
# .(30423.07  4/23/23 RAM 10:35a|  Improved error message
# .(30428.02  4/28/23 RAM 10:00a|  Web 1.0 form submit
# .(30428.03  4/28/23 RAM 11:00a|  Cors not needed locally if set at server 
# .(30429.05  4/29/23 RAM 11:10a|  Use old form submit, not API
# .(30429.06  4/29/23 RAM 12:00p|  Use pUser object for fetch API
# .(30429.07  4/29/23 RAM  1:34p|  Prevents form action="url" 
# .(30429.09  4/29/23 RAM  2:30p|  Add try { ... } catch(e) { ... }
# .(30428.03  4/30/23 RAM 10:05a|  Cors is needed even if set at server 

##SRCE     +====================+===============================================+
*/
// import {  handleFormSubmit, sayMsg, fmtMsg, fmtErr } from '../assets/mjs/formr_utility-fns_u1.07.mjs' //#.(30428.04.2 Import 'em)
// import {  handleFormSubmit                         } from '../assets/mjs/formr_utility-fns_u1.07.mjs' // .(30428.04.2 Import 'it)

var id = 90
//debugger
             console.log( "login.mjs[1]   Begin loading Login module script" )          // .(30423.03.5)

//--------  ---------------------------------------------------------

  function  clearListCookies() {                                                        // .(30415.01.1 RAM Beg Write function)
       var  cookies =  document.cookie.split(";");
       for (var i = 0; i < cookies.length; i++) {
        var spcook  =  cookies[i].split("=");
            deleteCookie(spcook[0]);
            }; // eol cookies
//      -----  ----------------------------

  function  deleteCookie( cookiename ) {
        var d = new Date();
            d.setDate(d.getDate() - 1);
        var expires = ";expires="+d;
        var name=cookiename;         //alert(name);
        var value="";
            document.cookie = name + "=" + value + expires + "; path=/";
            } // eof deleteCookie
     //     window.location = ""; // TO REFRESH THE PAGE
//      -----  ----------------------------
            } // eof clearListCookies                                                   // .(30415.01.1 End)
//--------  ---------------------------------------------------------

//          clearListCookies()                                                          // .(30415.03.1)

//alert("DocumentCookieBefore: '" + document.cookie + "'")
//document.cookie = "UserID = ; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/;"
//document.cookie = "UserID = ' ${id} `; path=/"

//document.cookie = "UserID = 15; path=/"
//alert("DocumentCookieAfter: '" + document.cookie + "'")

//alert(`UserID Set to nn\n ${document.cookie}`)

  function  getID() {                                                                   // .(30415.03.2 RAM Beg Put into function)
       var  nID  = window.location.search.match( /id=([0-9]+)/)                         // .(30329.09.1 RAM Get nID from URL)
            nID  = (nID && nID[1]) ? nID[1] : 0                                         // .(30329.09.2)
     // if (nID > 0) {
     //     clearListCookies()
     //     window.location = ""; // TO REFRESH THE PAGE
     //     }
    return  nID                                                                         // .(30415.03.3)
            }                                                                           // .(30415.03.2 End)
//--------  ---------------------------------------------------------

  function  setCookie( nID ) {                                                          // .(30415.03.4 RAM Beg Put into function)
            document.cookie = "UserID = ; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/;"
            document.cookie = `UserID = ${nID}; path=/`
            console.log( `setCookie[1]   Setting cookie ID = ${nID}` )                  // .(30423.03.1 RAM Add FName[LNo])
            }                                                                           // .(30415.03.4 End)
//--------  ---------------------------------------------------------

//          clearListCookies( )                                                         //#.(30415.03.5 RAM Not here)
//     var  nID = getID()                                                               //#.(30415.03.5)
//          setCookie( nID )                                                            //#.(30415.03.5)

//       $( document ).ready( ( ) =>                                                    // .(30414.01.1 RAM Wait for document.forms to be rendered)
//          setLoginForm( nID )                                                         //#.(30329.06.1 RAM Use it)
//          )                                                                           // .(30414.01.2).(30425.08.1)
//--------  ---------------------------------------------------------

  async function setLoginForm( nID ) {                                                  // .(30329.06.1 Beg RAM Write function setUserForm).(30425.08.2 RAM Renamed from setUserForm)

       var  pUser  =  nID                                                               // .(30429.06.1 RAM Use pUser object for fetch API)
       if (typeof( nID ) != 'object') {                                                 // .(30429.06.2)
       var  pUser  =  await fetchLoginData( nID ) }                                     // .(30329.06.2 RAM Get data for Login form)

       var  pForm  = document.forms[0]
        if (pUser.name.match( /^[ *]+/ )) {
       var  pUser  = { id   : nID,       code: "Login", pin: ""
                     , name :pUser.name, email:"" }
            fmtErrMsg( pUser.name )                                                     // .(30423.05.1 RAM Add Message)
            console.log(  `setLog~Form[1] Setting Login form error message` )           // .(30423.03.11).(30425.08.23)
            }
            pForm.username.value = pUser.email
            pForm.password.value = pUser.pin

            console.log(  `setLog~Form[2] Setting form.username to: '${pForm.username.value}'` )  // .(30423.03.11).(30425.08.3)
//                alert( `setLoginForm[1] Setting form.username to: '${pForm.username.value}'` )  // .(30423.03.11).(30425.08.4)
            }                                                                           // .(30329.06.1 End)
//--------  ---------------------------------------------------------

  async  function fetchLoginData( nID ) {                                               // .(30421.04.1 Beg RAM Rewrite function fetchLoginData)

       var  pLoginData = { id   : "", code: "", pin:  ""
                         , name : "", email:""  }
        if (nID == 0) {                                                                 // .(30421.04.7 RAM Beg Return blanks if nID = 0)
//          fmtErrMsg()                                                                 //#.(30421.04.6 RAM Use setLog)
    return  pLoginData
            } // eif nID == 0, else fetch it                                            // .(30421.04.8 End)                                                                           // .(30421.04.8 End)
//    ----  ------------------------------------------

        if (typeof(aAPI_URL) == 'undefined') {                                          // .(30416.04.1 RAM Beg Avoid error)
            alert(       'fetchLoginData[1] ** aAPI_URL is undefined')                  // .(30423.03.3)
            console.log(    "fetchL~Data[1] ** aAPI_URL is undefined")                  // .(30423.03.3)
            pLoginData.id   =  500                                                      // .(30423.05.1 RAM Send back error message?)
            pLoginData.name = "** Can't connect to server (no API_URL)"                 // .(30423.05.2)

        return  pLoginData                                                                  // .(30423.05.3)
            }                                                                           // .(30416.04.1 End)

       var  aURL = `${aAPI_URL}/login?id=${nID}`                                        // .(30423.07.1)
    await fetch( aURL )                                                                 // .(30423.07.2)

//  .then( (pRes) =>               pRes.json( )   )                                     //#.(30421.04.9)
    .then( (pRes) => {
                               return pRes.json( ) } )                                  // .(30421.04.9 RAM return required if using braces)
    .then( (pJSON) => {
            pLoginData      =  onFetchLoginData( pJSON ) } )                            // .(30421.04.3 RAM Use it)

//  .catch((pErr) => { alert( `fetchLoginData[2]  fetch error:\n ${pErr}` )} )          //#.(30421.01.2 RAM Added)(30423.07.2
    .catch((pErr) => {
            pLoginData.id   =  500                                                      // .(30423.05.1 RAM Send back error message?)
            pLoginData.name = `** Can't connect to server (${aAPI_URL})`                // .(30423.05.2)
//rjs       alert(       `fetchLoginData[2] ** Server error: '${aURL}'\n ${pErr}` )     // .(30421.01.2 RAM Added).(30423.07.2 RAM Improved error msg)
            $("#login-cancel a").css("display", "inline-block");
            console.log(    `fetchL~Data[2] ** Server error: '${aURL}'\n ${pErr}` )     // .(30421.01.2 RAM Added).(30423.07.2 RAM Improved error msg)
//          fmtErrMsg( pLoginData.name )                                                //#.(30421.04.6 RAM Don't Use fmtErrMsg here)
            } )
    return  pLoginData
//    ----  ------------------------------------------

  function  onFetchLoginData( pJSON ) {                                                 // .(30421.04.4 RAM Beg Write function)

        if (pJSON.warning) {
       var  pLoginData = { id   : 500,                     code: "Login", pin: ""
                         , name :pJSON.warning,            email:"" }
//          fmtErrMsg( pLoginData.name )                                                //#.(30421.04.6 RAM Don't Use fmtErrMsg here)
    return  pLoginData

            } // eif pJSON.warning
//    ----  ------------------------------------------

       var  mUsers     =   pJSON.login

        if (mUsers.length > 0) {
       var  pUser      =   mUsers[0]
            pLoginData = { id   : pUser.MemberNo,          code:  pUser.Initials, pin: pUser.PIN
                         , name : pUser.FullName,          email: pUser.Email        }
        } else {
//      if (nID == 500)  { ... }
            pLoginData = { id   :  500,                    code: "Login",     pin:  ""
                         , name : "** Username not found", email:"" }
                         $("#login-cancel a").css("display", "inline-block");

            //          fmtErrMsg( "** Username not found" )                                        // .(30423.05.2)

            } // eif not found
//    ----  ------------------------------------------
            return  pLoginData

            }; // eof onFetchLoginData                                                  // .(30421.04.4 End)
//--------  ---------------------------------------------------------
         }; // eof fetchLoginData                                                       // .(30421.04.1 End)
//--------  ---------------------------------------------------------

 async function onLoginForm_Submit( pEvt ) {                                            // .(30415.03.6 Beg RAM Write onSubmit).(30425.02.3).(30429.07.1 RAM Add pEvt)

            pEvt.preventDefault();                                                      // .(30429.07.2 RAM Prevents form action="url" )

//     var  pForm   =   document.forms[0]                                               //#.(30417.05.4).(30429.07.3)
       var  pForm    =  pEvt.currentTarget;                                             // .(30429.07.3)

//     var  aAction =   window.location.href
//     var  aAction =   pForm.action;                                                   //#.(30429.07.4 RAM It's not set in HTML)
//     var  aAction =  'login_v1.07c.html'                                              //#.(30416.04.2 RAM Set it below)
//     var  aAction =  '#'                                                              //#.(30416.04.3)
//     var  aAction =  '/''                                                             //#.(30416.04.4)

        if (typeof(aAPI_URL) == 'undefined') {                                          // .(30416.04.5 RAM Beg Avoid error)
//rjs       alert(       'onSubmit[1] ** aAPI_URL is undefined');                       // .(30423.03.3)
            console.log( "onSubmit[1] ** aAPI_URL is undefined" )                       // .(30423.03.3)
    return  false

        } else {                                                                        // .(30416.04.5 End)
//     var  aAction =   pForm.aAction                                                   // .(30420.06.3 RAM Return this client side form)
//     var  aAction =  `${aAPI_URL}/login_form`                                         // .(30420.06.1 RAM Return server side form)
       var  aAction =  `${aAPI_URL}/login`                                              // .(30416.04.6 RAM Live Server: page reloads on error).(30420.06.2 RAM Return server side data)
            }                                                                           // .(30416.04.7)                                                                         //
//    ----  ------------------------------------------------

       var  bAPI    = (aAction.match(/.html$/) == null) || aAction.match(/api\//)       // .(30420.06.4 RAM Use Server aAPI_URL).(30429.05.1 RAM)
       var  bSubmit = !bAPI                                                             // .(30429.05.2 RAM Use old form submit, not API)

        if (bSubmit) {
//rjs       alert(       `onSubmit[2]    Form being submited to: '${aAction}'` )        // .(30423.03.4 Beg)
            console.log( `onSubmit[2]    Form being submited to: '${aAction}'` )
        } else {
//rjs       alert(       `onSubmit[3]    Form not being submitted, i.e. no reload or redirect` )
            console.log( `onSubmit[3]    Form not being submitted, i.e. no reload or redirect` ) // .(30423.03.5 End)
            }
//    ----  ------------------------------------------------

//      if (aAction.match(/.html$/) == null) {                                          //#.(30420.06.4 RAM Use Server aAPI_URL).(30429.05.3)
        if (bAPI) {                                                                     // .(30429.05.3)

//rjs       alert(       `onSubmit[4]    Form data being posted to: '${aAction}'` )     // .(30423.03.6)
            console.log( `onSubmit[4]    Form data being posted to: '${aAction}'` )     // .(30423.03.7)

        var pEntries  =   new FormData( pForm );                                        // .(30417.05.5 RAM Get form data vars)
        var pData     =   Object.fromEntries( pEntries.entries() );                     // .(30417.05.6)

        var pFetchCfg =                                                                 // .(30417.05.7 RAM Beg Make fetch options)
             { method : 'POST'                                                          //   GET, POST, PUT, DELETE, etc.
             , mode   : "cors"       // or: n-cors, *cors, same-origin                  // .(30428.03.1 RAM not needed if ok at server).(30428.03.10 RAM It is needed at server) 
             , headers:
//              { "Content-Type": 'application/x-www-form-urlencoded' }                 //#.(30428.02.1 RAM for Web 1.0 form submit)
                { "Content-Type": "application/json"   // send JSON request             // .(30428.02.1 RAM for Web 3.0 ES6 form fetch)
                , "Accept"      : "application/json"   // expect JSON response back     // .(30428.02.2)
                   }
             , body: JSON.stringify( pData )                                            //   body data type must match "Content-Type" header
               };                                                                       // .(30417.05.7 End)

//rjs       alert(       `onSubmit[5]    Form data is:\n${pFetchCfg.body}`)             // .(30428.02.3 RAM Add msgs)
            console.log( `onSubmit[5]    Form data sent to '${aAction}'` )              // .(30428.02.4)
            console.log( `onSubmit[5]`, pData )                                         // .(30428.02.5)

//   await  fetch( aAction )                                                            // .(30214.05.3).(30420.06.5 RAM not aAPI)
//   await  fetch( aAction, pFetchCfg )                                                 // .(30214.05.3).(30417.05.8 RAM Submit fetch with options)
//          fetch(`${aAPI_URL}/login?id=90`)                                            //#.(30214.05.3).(30417.05.8).(30423.05.1 RAM Let's try a GET)
//          fetch(`http://localhost:3001/members?id=90`)                                //#.(30214.05.3).(30417.05.8)
//          fetch( aAction, pFetchCfg )                                                 //#.(30214.05.3).(30417.05.8 RAM Submit fetch without options)
/*                                                                                      //#.(30428.03.2 Beg RAM Not this way)
              .then( ( pRes  )  => {
                                     pRes.json( ) } )
//            .then( ( pJSON )  => { onLoginSuccess          } )                        // .(30421.01.1 RAM Changed name)
              .then( ( pJSON )  => { onLoginSuccess( pJSON ) } )                        // .(30421.01.1 RAM Changed name)
//            .catch(( pErr  )  => { onLoginFailure          } )                        // .(30421.01.2 RAM Added)
              .catch(( pErr  )  => { onLoginFailure( pErr  ) } )                        // .(30421.01.2 RAM Added)
*/                                                                                      //#.(30428.03.2 End)
        try {                                                                           // .(30429.09.1)
       var  pRes                =  await fetch( aAction, pFetchCfg );                   // .(30428.03.3 RAM This way)

        } catch( pErr ) {                                                               // .(30429.09.2 RAM Beg Catch Server not running)
            alert(       `fetchLoginData[2] ** Server error: '${aURL}'\n ${pErr}` )     // .(30421.01.2 RAM Added).(30423.07.2 RAM Improved error msg)
            console.log(    `fetchL~Data[2] ** Server error: '${aURL}'\n ${pErr}` )     // .(30421.01.2 RAM Added).(30423.07.2 RAM Improved error msg)
            fmtErrMsg( `** Server error: '${aURL}`)                                     // .(30421.04.6 RAM Use fmtErrMsg here)
     return
            }                                                                           // .(30429.09.2 End)
//     if (!pRes   ) {                                                                  //#.(30429.05.4
       if (!pRes.ok) {                                                                  // .(30429.05.4
       var  aErr                =  await pRes.text();  // Why is this MT??
//          throw new Error( aErrorMessage );
                                   onLoginFailure( aErr, aAction )
        } else {
       var  pJSON               =  await pRes.json();
                                   onLoginSuccess( pJSON, pData  )
            }                                                                           // .(30428.03.3 End)
//    ----  ------------------------------------------------
         }; // eif Use Server aAPI_URL, ie. aAction.match(/.html$/)                     // .(30420.06.5 RAM)

       if (bSubmit) {                                                                   // .(30429.05.5 Beg RAM Submit HTML form action)
//          alert(       `onSubmit[2]    Form being submited to: '${aAction}'` )
//          console.log( `onSubmit[2]    Form being submited to: '${aAction}'` )
         }                                                                              // .(30429.05.5 End)
//       }; // eif Use HTML 1.0 form submit)                                            // .(30420.06.5 RAM)
//    ----  ------------------------------------------------

    return  bSubmit

//    ----  ------------------------------------------------

  function  onLoginFailure( aErr, aURL ) {                                              // .(30421.01.4 Beg)

            console.log( `onLog~Fail[1]  ** Server error: '${aURL}'\n ${aErr}` )          // .(30423.03.10)
            alert(   `onLoginFailure[1]  ** Server error: '<b>${aURL}</b>'\n ${aErr}`   ) // .(30428.03.5
//          setLoginForm( { name :      `** Server error: '<b>${aURL}</b>'\n ${aErr}` } ) // .(30429.06.2 RAM Use function againp for fetch API)
            fmtErrMsg( `*** Server error` )

         }; // eof onLoginFailure                                                       // .(30415.03.6 End)
//    ----  ------------------------------------------------

  function  onLoginSuccess( pJSON, pData ) {                                            // .(30421.01.3)

        if (pJSON.error) {
            console.log( `onLog~Succ[1]  ** Error Response: '<b>${pJSON.error}</b>'` )  // .(30423.03.10)
//rjs       alert(   `onLoginSuccess[1]  ** Error Response: '${pJSON.error}'` )         // .(30428.03.4)
//          setLoginForm( { name :      `** Error Response: <b>${pJSON.error}</b>` } )
            fmtErrMsg( `${pJSON.error}` )
            return
            }

        if (pJSON.login && pJSON.login.length == 0) {
            console.log( `onLog~Succ[2]  * Username and Password not found: ${pData.username}`)   // .(30423.03.8)
//rjs       alert(   `onLoginSuccess[2]  * Username and Password not found: ${pData.username}`)   // .(30428.03.4)
//          setLoginForm( { name :      `* Username and Password not found` } )
            fmtErrMsg( `${pData.username} is not in the IODD's database` )
            return
            }

       var  pLogin =  pJSON.login[0]                                                              // .(30428.03.4)
            console.log( `onLog~Succ[3]  Username and Password found:`)                           // .(30423.03.8)
//rjs       alert(   `onLoginSuccess[3]  Username and Password found for ${pLogin.FullName}`)     // .(30428.03.5)
            console.log( pJSON.login )                                                            // .(30423.03.9)
            setCookie( pJSON.login[0].Id )
//          setLoginForm( pJSON )                                                       // .(30429.06.2 RAM Use function againp for fetch API)

       location.href = "/"
//rjs       location.href = "../index.html?id=90"
//            location.href = ""

            } // eof onLoginSuccess
//    ----  ------------------------------------------------
         }; // eof onLoginForm_Submit
//--------  ---------------------------------------------------------

  async  function fetchLoginData_v1( nID ) {                                            // .(30329.04.2 Beg RAM Write function fetchLoginData)

    var  pLoginData = { id: 0, code: "", name : "", email: "" }

     if (nID ==  90 ) { pLoginData = { id: nID, code: "RS",    name : "Richard Schinner", email: "evantage@comcast.net"     , pin: "blueNSX"       } }
     if (nID ==  15 ) { pLoginData = { id: nID, code: "BT",    name : "Bruce Troutman",   email: "bruce.troutman@gmail.com" , pin: "fishfortrout"  } }
     if (nID ==   9 ) { pLoginData = { id: nID, code: "RM",    name : "Robin Mattern",    email: "robin.mattern@gmail.com"  , pin: "scroogemcduck" } }
     if (nID ==   6 ) { pLoginData = { id: nID, code: "KF",    name : "Kennett Fussell",  email: "kffussellathome@gmail.com", pin: "doctorprof"    } }
     if (nID ==   0 ) { pLoginData = { id: nID, code: "",      name : "",                 email: ""                         , pin: ""              } }

     if (nID == 500 ) { pLoginData = { id: nID, code: "Login", name : "Donald Duck",      email: "sMcduck@gmail.com"        , pin: "lovedaisy"     } }

         setLog()                                                                       // .(30421.04.4 RAM Use it)
 return  pLoginData
         }; // eof fetchLoginData_v1                                                    // .(30329.04.2 End).(30421.04.1)
//--------  ---------------------------------------------------------

  function  fmtErrMsg( aMsg ) {                                                         // .(30421.04.5 RAM Beg Write function).(30429.08.2)
            $("#login-error"      ).css( "display", "block" );
            $("#login-button"     ).css( "display", "none"  );
            $("#show-pin"         ).css( "display", "none"  );
            $("#errMsg"           ).html( aMsg )                                        // .(30429.08.3)

       var  pSpan = $("#log")
            pSpan.css( "text-decoration", "none");
//          pSpan.html( aMsg )                                                          //#.(30415.04.1 RAM Was: aLogin, but not defined).(30429.08.3)
            $("#ContactAll"       ).css( "display", "none"  );
            $("#ContactLink"      ).css( "display", "none"  );
            $("#contact-dropdown" ).css( "display", "none"  );
            pSpan.css("color",           "white");
            pSpan.css("padding",         "5px"  );
            pSpan.css("width",           "60px" );
            pSpan.css("background-color","blue" );
            pSpan.css("font-size",       "15px" );
            pSpan.css("font-weight",     "600"  );
            pSpan.css("font-family",     "arial");
            pSpan.css("border-radius",   "8px"  );
            pSpan.css("border",          "solid #5A5A5A 0px");
            } // eof setLog                                                             // .(30421.04.5 End)
//   -----  ---------------------------------------------------------

export { getID, setCookie, clearListCookies }                                           // .(30421.03.4 RAM export for module import)
export { setLoginForm, onLoginForm_Submit   }                                           // .(30421.03.5).(30425.08.4)

console.log( "login.mjs[2]   End of Login module script" )                              // .(30423.03.6)
