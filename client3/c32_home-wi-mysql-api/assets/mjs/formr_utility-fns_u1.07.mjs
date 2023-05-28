/*\
##=========+====================+================================================+
##RD      formr_utility-fns.mjs | Utility fns script
##RFILE    +====================+=======+===============+======+=================+
##FD formr_utility-fns_u1.04.mjs|   9077|  4/10/23  8:24|   121| u1-04`30410.0815
##FD formr_utility-fns_u1.06.mjs|  10088|  4/12/23 16:35|   145| u1-06`30412.1630
##FD formr_utility-fns_u1.07.mjs|  23008|  4/29/23 10:50|   317| u1-07`30429.1050
##FD formr_utility-fns_u1.07.mjs|  23908|  4/29/23 16:07|   328| u1-07`30429.1607
##FD formr_utility-fns_u1.07.mjs|  24150|  5/02/23 18:08|   330| u1-07`30502.1808
##FD formr_utility-fns_u1.07.mjs|  24210|  5/03/23 09:45|   332| u1-07`30503.0945
##FD formr_utility-fns_u1.07.mjs|  24408|  5/05/23 15:33|   335| u1-07`30505.1533
##FD formr_utility-fns_u1.07.mjs|  27716|  5/08/23 11:52|   356| u1-07`30515.1152
##FD formr_utility-fns_u1.07.mjs|  29323|  5/27/23 16:45|   380| u1-07`30527.1645
##DESC     .--------------------+-------+---------------+------+-----------------+
#           This Javascript file
##LIC      .--------------------+----------------------------------------------+
#           Copyright (c) 2023 8020Data-formR * Released under
#           MIT License: http://www.opensource.org/licenses/mit-license.php
##FNCS     .--------------------+----------------------------------------------+
#           setAPI_URL          |
#           getEnv              |                                                       // .(30222.01.0)
#           fmtEnv              |
#           sayEnvErr           |
#           setHTML             |
#           handleFormSubmit    |  Execute for onSubmit action                          // .(30429.01.1 RAM Move to this script)
#           postFormDataAsJson  |  Post form data using await fetch                     // .(30429.01.2)
#                               |
##CHGS     .--------------------+----------------------------------------------+
# .(30320.04  3/20/23 RAM 12:47p|  Don't reurn existing values
# .(30320.05  3/20/23 RAM  1:15p|  No Quotes or spaces in getEnv
# .(30222.01  3/22/23 RAM 12:55p|  Write getEnv
# .(30328.01  3/28/23 RAM  8:30p|  Write seperate function for sayEnvErr
# .(30410.02  4/10/23 RAM  8:15a|  Breakout formr_utility-fns_u1.06.mjs
# .(30410.03  4/12/23 RAM  1:30p|  Write setAPI_URL
# .(30412.01  4/12/23 RAM  2:30p|  Create getEnv_sync
# .(30412.03  4/12/23 RAM  4:17p|  Remove trailing #s from .Env
# .(30416.02  4/16/23 RAM 11:00a|  Write tractR
# .(30416.03  4/16/23 RAM  1:45p|  Create __appDir
# .(30417.02  4/17/23 RAM 10:20a|  Add bLog_HTML and bLog_Styles
# .(30417.03  4/17/23 RAM  1:15p|  Move sayErr to formr_utility-fns.mjs
# .(30417.04  4/17/23 RAM  1:55p|  Add _env on server warning
# .(30417.05  4/17/23 RAM  2:10p|  Check pEnv.Host_Location
# .(30425.01  4/25/23 RAM  6:10p|  Created ES6_form_v1.07.mjs
# .(30428.04  4/28/23 RAM  6:30p|  Added sayMsg, fmtMsg, fmtErr
# .(30429.01  4/29/23 RAM  9:30a|  Move handleFormSubmit in this utility script
# .(30429.02  4/29/23 RAM 10:00a|  Add bQuiet
# .(30429.03  4/29/23 RAM 10:15a|  Handle messages differently
# .(30429.04  4/29/23 RAM 10:45a|  Handle pGlobal differently
# .(30429.10  4/29/23 RAM  4:05p|  Display .env.location
# .(30502.03  5/02.23 RAM  5:30p|  Turn off client/s32 alerts
# .(30503.01  5/03/23 RAM  9:45a|  Only bQuiet for alerts in sayMsg
# .(30505.01  5/05/23 RAM  3:33p|  Clean _env Local host trailing stuff
# .(30507.03  5/07/23 RAM  8:00a|  Create and display __appName
# .(30508.01  5/08/23 RAM  5:15p|  Set aVIR_DIR from Remote_Host in _env
# .(30515.01  5/15/23 RAM 11:52a|  Remove conflict & align comments
# .(30527.04  5/27/23 RAM  4:45p|  Send IP, User and/or page to server
                                |
##SRCE     +====================+===============================================+
#*/
//  --------------------------  =   -------------------------------- ------------------ ------------------+ --------------------------

//      import  fs           from  'fs'                                                                     //#.(30412.01.7)

           var  inspect         =  function( pObj ) { return JSON.stringify( pObj ) }                       // .(30416.02.x )

            if (typeof(process)!= 'undefined') {
           var  pFS             =  await import( 'fs' )                                                     // .(30412.01.7 RAM Get pFS here  so getEnv_sync   doesn't have to be a async function)
//         var  pFS             =  await import( 'fs/promises' ) { .. }                                     //#.(30412.01.2 RAM Get pFS above so this function doesn't have to be a async function)
                }                                                                                           // .(30507.03.1 RAM Clearer)

//         var  pUtil           =  await import( 'util' ), inspect = pUtil.inspect                          // .(30416.02.x RAM no workie)
//         var  inspect         = (await import( 'util' )).inspect                                          // .(30416.02.x RAM workie?)

//         var  pMeta           =  import.meta.resolve()
           var  aURI            =  import.meta.url; // console.log( "aURI", aURI ); process.exit()
           var  aOS             = (typeof(process) != 'undefined' ) ? (`${process.argv[1]}`.match( /^[a-z]:/i ) ? 'windows' : 'linux' ) : 'browser'
           var  __filename      =  aURI.replace( /^.+\//, "" )
           var  __dirname       =  aURI.replace( `/${__filename}`, '' ).replace( 'file:///', aOS == 'linux' ? '/' : '')  // .(30322.05.1 RAM Put '/' back in)
           var  __appDir        =  __dirname.replace( /\/assets\/mjs\/*/, "" );  // ${__dirname}/../../.*/               // .(30416.03.1 RAM Create __appDir).(30507.03.1 RAM Add /.*)
           var  __thisDir       =  __dirname.replace( __appDir, "" );                                                    // .(30507.03.2 RAM What follows __appDir)
           var  __appName       =  __appDir.replace( /^.+\//, "" );                                                      // .(30507.03.3)
//              }                                                                                                        //#.(30507.03.4)

           var  bQuiet          =  true                                                                     // .(30502.04.1 RAM)
//              traceR(  __filename,   "Loaded", 1 )                                                        //#.(30429.02.1)
                traceR( `utility-fns[1]        Loaded: '${__thisDir}/${__filename}'`, 1 )                   // .(30429.02.1).(30507.03.4 RAM Show path/name of loaded module).(30507.03.5)
                traceR( `utility-fns[2]        AppName: '${__appName}'`, 1 )                                // .(30429.02.1).(30507.03.4 RAM Show path/name of loaded module).(30507.03.6)

// ------  ---- -----------------------------------------------------------------------------------------

async function  getHeaders( aWhat, nId, aUser ) {                                                           // .(30527.04.6 RAM Beg Write getHeaders)

           var  pHeaders = { };  aWhat = aWhat ? aWhat : 'json'
          if (!`${nId}`.match( /^[0-9]+$/ )) { n = aUser; aUser = nId; nId = n }

            if (aWhat.match( /json/ )) {
                pHeaders[ 'Content-Type' ] = 'application/json'                                             // Send JSON request
                pHeaders[ 'Accept'       ] = 'application/json'                                             // Expect JSON response back
                }
            if (aWhat.match( /ip4/ )) {
                pHeaders[ 'FormR-UserIP' ] =  await (await fetch( 'https://api.ipify.org/' )).text()        // .(30527.04.7)
                }
            if (aWhat.match( /user/ )) {
                pHeaders[ 'FormR-User'   ] = `${ aUser || ' '} (${ nId ? nId : 0})`                         // .(30527.04.8)
                }
            if (aWhat.match( /page/ )) {
                pHeaders[ 'FormR-Page'   ]  =  window.location.href                                         // .(30527.04.9)
                }
        return  pHeaders
                }                                                                                           // .(30527.04.6 End)
// ------  ---- -----------------------------------------------------------------------------------------

async function  setAPI_URL( pEnv,  aNum ) {                                                                 // .(30410.03.1 RAM Beg Write it).(30410.04.9 RAM Add pEnv arg)
//              console.log( `module ${aNum} aAPI_URL: '${ typeof(aAPI_URL) !='undefined' ? aAPI_URL : 'undefined' }'` )
//              console.log( `setAPI_URL[1]  await getEnv()` )

           if (!pEnv) {                                                                                     // .(30412.01.1)
           var  pEnv     =  await  getEnv(); if (!pEnv) { return }  // this await causes Page Reload error
                }                                                                                           // .(30412.01.1)
           var  mLoc     = `${pEnv.Host_Location}`; mLoc = mLoc.match( /local|remote/i );                   // .(30429.10.1)
            if (mLoc[0]) {                                                                                  // .(30417.05.1 RAM Check pEnv.Host_Location).(30429.10.2)
//          if (pEnv.Host_Location) {                                                                       //#.(30417.05.1 RAM Check pEnv.Host_Location).(30429.10.2)
//         var  aAPI_URL = `${pEnv.Local_Host}:${pEnv.Server_Port}`

           var  aHost    =   (pEnv.Local_Host.replace( /https?:\/\//, "" ) || '' ).replace( /[:?].*/,"")    // .(30505.01.1 RAM Remove trailing stuff)
//         var  aAPI_URL = `${pEnv.Host_Location.toLowerCase() == 'remote'
           var  aAPI_URL =    mLoc[0].toLowerCase() == 'remote'
                         ?    pEnv.API_URL
                         :   `http://${aHost}:${pEnv.Server_Port}`                                          // .(30505.01.2)

           var  aHost    =   (pEnv.Remote_Host.replace( /https*:\/\//, "") || '' )                          // .(30508.01.1)
           var  aVIR_DIR =    mLoc[0].toLowerCase() == 'remote'                                             // .(30508.01.2 RAM Set aVIR_DIR)
                         ?    aHost.match( /\// ) ? aHost.replace( /.*?\//, '/' ) : '/'                     // .(30508.01.3)
                         :   ''                                                                             // .(30508.01.4)

           var  aHost    =   (pEnv.Remote_Host.replace( /https*:\/\//, "") || '' )                          // .(30508.01.5)
           var  aVIR_DIR =    mLoc[0].toLowerCase() == 'remote'                                             // .(30508.01.6 RAM Set aVIR_DIR)
                         ?    aHost.match( /\// ) ? aHost.replace( /.*?\//, '/' ) : '/'                     // .(30508.01.7)
                         :   ''                                                                             // .(30508.01.8)
                    // alert ("aVIR_DIR = " + aVIR_DIR)
//          if (typeof(window)  != 'undefined') {                                                           //#.(30429.04.1 Beg)
//              window.aAPI_URL  =  aAPI_URL
//              window.setHTML   =  setHTML
//          } else {                                                                                        //#.(30429.04.1 End)
           var  pGlobal          = (typeof(window) != 'undefined') ? window : global                        // .(30429.04.1)
                pGlobal.aAPI_URL =  aAPI_URL                                                                // .(30429.04.2 RAM Was global.)
                pGlobal.setHTML  =  setHTML                                                                 // .(30429.04.3 RAM Was global.)
                pGlobal.aVIR_DIR =  aVIR_DIR                                                                // .(30508.01.9 RAM Make it global)
//              }                                                                                           //#.(30429.04.1)
                }                                                                                           // .(30417.05.2)
//              console.log( `module ${aNum} aAPI_URL: '${  typeof(aAPI_URL)  !='undefined' ? aAPI_URL : 'undefined' }'` )
                console.log( `setAPI_URL[2]  aLocation: '${ mLoc[0] ? mLoc[0] : 'undefined' }'` )           // .(30429.10.3)
                console.log( `setAPI_URL[3]  aAPI_URL: '${  typeof(aAPI_URL)  !='undefined' ? aAPI_URL : 'undefined' }'` )
                console.log( `setAPI_URL[4]  aVIR_DIR: '${  typeof(aVIR_DIR)  !='undefined' ? aVIR_DIR : 'undefined' }'` )

           }; // eof setAPI_URL                                                                             // .(30410.03.1 RAM End)
//--------  ------  =  -----------------------------------------------------

//       function getEnv( aFile, bNewOnly ) {
  async  function getEnv( aFile, bNewOnly ) {                                                               // .(30222.01.3 RAM Beg Write getEnv).(30320.04.2 RAM Don't reurn existing values)

       var  aPath   = `${__appDir}/` // `${__dirname}/../../`                                               // .(30416.03.5 RAM Will this work?)
        if (typeof(window) != 'undefined') {
//     var  aPath   =  window.location.href.replace( /[^/]+$/, '')  // has trailing /
       var  aFile   = `${ aPath }_env`
// $$$ rjs-051523
       console.log( `getEnv[1]             Fetching remote file, '${aFile}'` )
//     var  aFile   = '../_env'    // ``${ aPath }_env`
       try {
       var  pRes    =  await fetch(  aFile );                                                               // .(30222.01.4 This await causes Page Reload error when error occurs in another fetch)
       if (!pRes.ok) { sayEnvErr(    aFile ) }                                                              // .(30222.01.5 Handle error)
       var  pEnv    =  fmtEnv( await pRes.text() )
       } catch( e ) {  sayEnvErr(    aFile ); return null  }
       } else {
//     var  pFS     =  await import( 'fs' )                                                                 //#.(30412.01.2)
       var  pFS     =  await import( 'fs/promises' )                                                        // .(30412.01.2 RAM Should work, but use getEnv_sync instead)
       var  aFile   = `${ aPath }.env`
//          console.log( `getEnv[2]             Reading local file, '${aFile}'` )
       if (!pFS.existsSync( aFile )) { sayEnvErr( aFile );
    return  process.env }                                                                                   // .(30319.01.1 RAM Do nothing if .env not found).(30322.03.6 RAM Display error)
       var  pEnv    =  fmtEnv(  pFS.readFileSync( aFile, 'ASCII' ) )
            pEnv    =  bNewOnly ? pVars : { ...process.env,  ...pEnv }
            }
    return  pEnv
         };
//     ---  ------- =  ---------------------------------------------

  function  getEnv_sync( aFile, bNewOnly ) {                                                                // .(30412.01.2 RAM Beg Write getEnv_sync)

       var  aPath   = `${__appDir}/` // `${__dirname}/../../`                                               // .(30416.03.6 RAM Will this work?)
        if (typeof(window) != 'undefined') {
                       sayEnvErr( aFile ); return null                                                      // .(30412.01.3)
        } else {
//     var  pFS     =  await import( 'fs' )                                                                 //#.(30412.01.4)
       var  aFile   = `${ aPath }.env`
//     var  pFS     =  await import( 'fs/promises' )                                                        // .(30412.01.2 RAM Get pFS above so this function doesn't have to be a async function)
//          console.log( `getEnv[2]             Reading local file, '${aFile}'` )
       if (!pFS.existsSync( aFile )) { sayEnvErr( aFile );
    return  process.env }                                     // .(30319.01.1 RAM Do nothing if .env not found).(30322.03.6 RAM Display error)
       var  pEnv    =  fmtEnv(  pFS.readFileSync( aFile, 'ASCII' ) )
            pEnv    =  bNewOnly ? pVars : { ...process.env,  ...pEnv }
            }
    return  pEnv
         }; // eof getEnv_sync                                                                              // .(30412.01.2 RAM End)
//     ---  ------- =  ---------------------------------------------

  function  fmtEnv( aEnvText ) {                                                                            // .(30222.01.3 RAM Beg Write getEnv)).(30320.04.2 RAM Don't reurn existing values)

       var  mVars   =  aEnvText.split(/[\r\n]/), pVars = { }
            mVars.forEach( aVar => { if (aVar.replace( /^ +/, "" ) > "" && aVar.match( /^ *#/ ) == null ) {
       var  aKey    =  aVar.replace( /=.*/,  '' ).replace( /[ '"]/g,  '' );                                 // .(30320.05.1 RAM No Quotes or spaces)
       var  aVal    =  aVar.replace( /.+?=/, '' ).replace( /^[ '"]*/, '' ).replace( /[ '"]*$/, '' );        // .(30320.05.1 RAM No leading Quotes or spaces)
            aVal    =  aVal.replace( / *#.*$/, '' ).replace( /'$/, '' )                                     // .(30412.03.1 RAM Remove trailing #s)
       var  bNum    =  aVal.match( /^ *([0-9]+|true|false|null|undefined) *$/i ) != null                    // .(30322.06.3 RAM Add null and undefined)
            pVars[aKey] = bNum ? (aVal.match(  /false|null|undefined/i ) ? false : (aVal.match( /true/i ) ? true : aVal * 1 )) : aVal } } )   // .(30322.06.4)
     return pVars
            } // eof fmtEnv
//     ---  ------  =  ---------------------------------------------

  function  sayEnvErr( aFile ) {                                                                            // .(30328.01.1 Beg Write seperate function)

       var  aEnv =  aFile.match( /_env/ ) ? '_env' : '.env', aFill = `\n`.padEnd(22)
       var  aMsg = `\n*** The ${aEnv} file does NOT EXIST!${aFill} '${aFile}'\n`
        if (aFile.match(/server/) && aEnv == '_env') {                                                      // .(30417.04.3 RAM Add warning)
            aMsg += `${aFill.substring(1)}* Are you running a server file in Live Server??`                 // .(30417.04.4)
            }                                                                                               // .(30417.04.5)
            sayErr( aMsg )
        if (typeof( process ) != 'undefined') {                                                             // .(30411.01.1 RAM )
                    process.exit()
        } else {    // in browser
// $$$ rjs-051523   alert( aMsg.replace( new RegExp(aFill, 'g'), "\n    " ) ) // window.stop( )             // .(30417.04.6)
            }
          } // eof sayEnvErr                                                                                // .(30328.01.1 End)
//     ---  ------  =  ---------------------------------------------
//       }; // eof getEnv                                                                                   //#.(30222.01.3 RAM End).(30412.01.5)
//--------  ------  =  -----------------------------------------------------

 async function  setHTML( aDivID, aFile ) {                                                                 // .(30401.02.1 Beg RAM Add function)
       var  aPath     =  window.location.href.replace( /[^/]+$/, '')
//          traceR(     `setHTML[1]     ${aPath}/includes/inc-header-home.html`, nSay2 )
       var  response  =  await fetch( `${aPath}${aFile}` );
       var  aHTML     =  await response.text()
       var  pDiv      =  $( `#${aDivID}` )
            pDiv.html(   aHTML )
//          sayMsg(     `setHTML[2]     Included '${aFile}'`, nSay2)
            }                                                                           // .(30401.02.1 End)
//  --------------------------  =  --------------------------------- ------------------

async function handleFormSubmit( pEvt, pForm ) {                                        // .(30429.01.3 RAM Add pForm)
            pEvt.preventDefault();  // prevents form action="url"

//     var  pForm     =  pEvt.currentTarget;                                            //#.(30429.01.4)
       var  aURL      =  pForm.action;
//     var  pMessage  =  document.getElementById( "message" )                           //#.(30429.01.5)
//     var  pMsgText  =  document.getElementById( "msgText" )                           //#.(30429.01.6)

            sayMsg( 3,  `handleFormSubmit[1]   Submitting aURL: '${aURL}'` )            //#.(30429.01.9 RAM Move below)
      try {
//          ------------------  =  ---------------------------------
       var  pFormData           =  new FormData( pForm );

//     var  pResponseData       =  await postFormDataAsJson( aURL, pFormData )          // JSON
       var  pJSON               =  await postFormDataAsJson( aURL, pFormData )          // pResponseData

       var  aRecord             =  pJSON.login[0].FullName
       var  pMsgs               ={ Success: `Successful login for ${ aRecord }`         // .(30429.03.x)
                                 , Failure: "User not found" }
       var  aResponse           =  fmtMsg(   pJSON, pMsgs )                             // .(30429.01.12)
            sayMsg( 3,  `handleFormSubmit[2]   ${ aResponse }` );                       // .(30429.01.13)

//          pMessage.innerHTML  = "Response:"                                           //#.(30429.01.5)
//          pMsgText.innerHTML  =  fmtMsg( pResponseData )                              //#.(30429.01.6)
   return { response            :  aResponse }                                          // .(30429.01.7)

        } catch ( pError ) {
//          ------------------  =  ---------------------------------

       var  aError              =  fmtErr(   pError, aURL )

            sayMsg( 3,  `handleFormSubmit[3]   ${ aError }` );                          // .(30429.01.14)

//          pMessage.innerHTML  = "Error:"                                              //#.(30429.01.5)
//          pMsgText.innerHTML  = `<span style="color: red;">${ aError }</span>`        //#.(30429.01.6)
   return { error               : `<span style="color: red;">${ aError }</span>` }      // .(30429.01.8)
            } // eif error
//          ------------------  =  ---------------------------------
      }; // eof handleFormSubmit
//  --------------------------  =  --------------------------------- ------------------

async function postFormDataAsJson( aURL, pFormData ) {

//          sayMsg( 3, `postFormDataAsJson[1] Submitting aURL: '${aURL}'` )             //#.(30429.01.9 RAM Move here)

       var  plainFormData       =  Object.fromEntries( pFormData.entries() );

       var  pFetchOptions =
              { method : "POST"
//            , mode   : "no-cors"    // or:  no-cors, *cors, same-origin
              , headers:
//              { "Content-Type": 'application/x-www-form-urlencoded'
                { "Content-Type": "application/json"   // send JSON request
                , "Accept"      : "application/json"   // expect JSON response back
                   }
              , body: JSON.stringify( plainFormData )
                };
//          ------------------  =  ---------------------------------

            sayMsg( 3,`postFormDataAsJson[2] Fetching pFormData: '${ JSON.stringify( plainFormData ) }'` )

        var pResponse           =  await fetch( aURL, pFetchOptions );

       if (!pResponse.ok) {
       var  aErrorMessage       =  await pResponse.text();  // Why is this MT??
//          throw new Error( aErrorMessage );

            sayMsg( 2,`postFormDataAsJson[3]  Got an Error: '${ aErrorMessage }'` )
        } else {
//          ------------------  =  ---------------------------------

//  return                               pResponse.json();
    return                         await pResponse.json();
            }
      }; // eof postFormDataAsJson
//  --------------------------  =  --------------------------------- ------------------

  function  sayMsg( nBoth, aMsg ) {                                                               // .(30428.04.1 Beg RAM Mov'em into this script)
        if (nBoth == 2 || nBoth == 3) { console.log( aMsg ); }                                    // .(30503.01.1)
        if (bQuiet) { return }                                                                    // .(30429.02.2).(30503.01.2 RAM Only bQuiet for alerts)
        if (nBoth == 1 || nBoth == 3) { alert( aMsg ); }                                          // .(30503.01.3)
            }
//--------  ------  =  -----------------------------------------------------

  function  fmtMsg( pJSON, pMsgs ) {                                                              // .(30429.03.3 RAM Add pMsgs)
       var  bErr     =  pJSON.error || pJSON.nodata || (pJSON.login && pJSON.login.length == 0)
//     var  aMsg     =(!bErr) ? "Success" : ( pJSON.error ? pJSON.error : "User not found" )      //#.(30429.03.4)
//          aMsg    +=(!bErr) ? `ful login for ${ pJSON.login[0].FullName }` : ''                 //#.(30429.03.4)
       var  aMsg     =  bErr  ?  pMsgs.Failure : pMsgs.Success                                    // .(30429.03.4)
//          sayMsg( 3, `handleFormSubmit[2]   ${ aMsg }` );                                       // .(30429.01.13)
       var  aMsg     =  bErr  ? `<span style="color: red;"    >${aMsg}</span>`
                              : `<span style="color: green;"  >${aMsg}</span>`
    return  aMsg
            }
//--------  ------  =  -----------------------------------------------------

  function  fmtErr( pError, aURL ) {                                                              // .(30429.03.5 RAM Add aURK)
//     var  aServer  = document.getElementById( "example-form").action                            //#.(30429.03.6)
       var  aError   = String( pError ).replace( /TypeError: /, "" )
            aError  += aError.match( /Failed to fetch/) ? `. Is server running at ${aURL}?` : ""  // .(30429.03.6)
//          sayMsg( 3,`handleFormSubmit[3]   Error: ${ aError }` );                               // .(30429.01.13)//#.(30429.03.4)
    return  aError
         }; // eof fmtErr                                                                         // .(30428.04.1 End)
//--------  ------  =  -----------------------------------------------------

  function  sayErr( aMsg ) {                                                                      // .(30417.03.1 RAM Move to here)
        var aTS       =  (new Date).toISOString().replace( /[Z:-]/g, '' ).replace( /T/, '.' ).substring(2)
        var aCR        =  aMsg.match( /^[ \n]+/ ) ? "\n" : ""; aMsg = aMsg.replace( /^[\n]+/, "") // .(30416.01.1)
            console.log( `${aCR}${aTS}  ${aMsg}` )
//          console.trace()                                                                       // .(30416.01.2)
         }; // eof sayErr
//--------  ------  =  -----------------------------------------------------

async function  traceR( aFLNo, aMsg, nSay, pObj ) {                                               // .(30416.02.1 RAM Beg Write traceR)
//     var  inspect =  (await import( 'util' )).inspect                                           // .(30416.02.x RAM workie?)
       if ((nSay ? nSay : aMsg) >= 1) {
            aMsg    =   typeof(aMsg) == 'number' ?  "" :  aMsg
            aMsg    =   typeof(aMsg) == 'object' ?        inspect( aMsg, { depth: 99 } ) : String( aMsg )
            aMsg   +=   typeof(pObj) == 'object' ? `:\n${ inspect( pObj, { depth: 99 } ) }` : ''
            aMsg   +=   typeof(pObj) == 'string' ? `:\n'${ pObj }'` : ( typeof(pObj) != 'object' ? ( pObj ? pObj : '' ) : '' )
        var aSay    =  `${aFLNo.padEnd( 19 )}${aMsg.replace( /\n/g, "\n".padEnd( 20 ) ) }`
            console.log( aSay )
            }
         }; // eof traceR                                                                         // .(30416.02.1 RAM End)
//--------  ------  =  -----------------------------------------------------

//----------------------------  =  --------------------------------- ------------------

   export { setAPI_URL, getEnv, getEnv_sync, setHTML, __dirname, __appDir }                       // .(30412.01.6).(30416.02.2).(30416.03.2)
   export { sayErr, aOS, sayMsg, traceR  }                                                        // .(30417.03.2).(30428.04.2 RAM Export sayMsg)
   export { handleFormSubmit, getHeaders }                                                        // .(30429.01.1 RAM Export 'it).(30527.04.10)
// export { sayMsg, fmtMsg, fmtErr }                                                              //#.(30428.04.3 RAM Export 'em)
