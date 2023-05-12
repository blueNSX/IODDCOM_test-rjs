/*\
##=========+====================+================================================+
##RD        IODD_Server.mjs     | IODD Server script
##RFILE    +====================+=======+===============+======+=================+
##FD      IODD_Server_u1.02.mjs |   2925|  3/12/23 12:08|    65| u2.05`30312.1200
##FD      IODD-Server_u1.03.mjs |  16788|  3/31/23 22:46|   378| u1-03`30331.2246
##FD      IODD-Server_u1.05.mjs |  24655|  4/03/23 21:00|   510| u1-05`30403.2100
##FD      IODD-Server_u1.06.mjs |  34475|  4/12/23 16:31|   598| u1-06`30412.1630
##FD      IODD-Server_u1.06.mjs |  35577|  4/25/23 17:04|   598| u1-06`30425.1704
##FD      IODD-Server_u1.06.mjs |  35736|  4/28/23 16:21|   598| u1-06`30412.1621
##FD      IODD-Server_u1.06.mjs |  36039|  4/28/23 23:20|   618| u1-06`30428.2320
##DESC     .--------------------+-------+---------------+------+-----------------+
#           This Javascript file modifies the Login Button
##LIC      .--------------------+----------------------------------------------+
#           Copyright (c) 2023 8020Data-formR * Released under
#           MIT License: http://www.opensource.org/licenses/mit-license.php
##FNCS     .--------------------+----------------------------------------------+
#           IODD                | Main Class of Express routes
#             getTable          |
#             Root_getRoute     |
#             Login_getRoute    |
#             Login_getRoute    |
#             Meetings_getRoute |
#             Members_getRoute  |
#             Member_postRoute  |                                                       // .(30510.03.1 RAM Add Member_postRoute)
#             MembersBios_getRoute     |
#             MembersProjects_getRoute |
#             Projects_getRoute |
#             ProjectCollaborators_getRoute |
#             User_postRoute    |                                                       // .(30510.02.1 RAM Finish User_postRoute)
#             Users_getRoute    |
#             User_getRoute     |
#             init              |
#             start             |
#          onRoute              |
#    //    onGetRoute           |                                                       //#.(30327.01.1 RAM)
##CHGS     .--------------------+----------------------------------------------+
# .(30221.01  2/21/23 RAM  3:44p| Created
# .(30310.01  3/10/23 RAM  1:00p|
# .(30320.01  3/20/23 RAM 11:56a|
# .(30320.01  3/20/23 RAM 12:33p|
# .(30322.01  3/22/23 RAM 10:56a|
# .(30323.01  3/23/23 RAM 10:21a|
# .(30327.01  3/27/23 RAM 11:00a|
# .(30328.03  3/28/23 RAM  9:18p|  Move setRoute to server-fns.mjs
# .(30331.01  3/31/23 RAM  8:09p|  Display onRoute name
# .(30402.04  4/02/23 RAM  4:37p|  Add getStyles to this.getLogin
# .(30403.01  4/03/23 RAM  7:30a|  Use shared function fmtHTML
# .(30403.02  4/03/23 RAM  8:52a|  Add Login_postRoute
# .(30403.04  4/03/23 RAM  3:10p|  Add sndFile
# .(30403.05  4/03/23 RAM  7:36p|  Add putData
# .(30403.06  4/03/23 RAM  8:46p|  Add chkSQL
# .(30404.01  4/04/23 RAM  1:20p|  Fix aDatasetName / aRecords being plural
# .(30404.02  4/04/23 RAM  3:24p|  Add Login_getRoute and Login_GetForm
# .(30404.03  4/04/23 RAM  2:00p|  Return JSON for /login routes
# .(30405.03  4/05/23 RAM  8:30a|  Add ${aAPI_Host} to URLs)
# .(30405.04  4/05/23 RAM  2:10p|  Change login_view2 query
# .(30406.01  4/06/23 RAM  9:15a|  Insert into login_log

# .(30406.02  4/06/23 RAM  6:20p|  Add setRoutes into this script
# .(30406.03  4/06/23 RAM  9:10p|  Add IPAddress4
# .(30412.02  4/12/23 RAM  4:10p|  Move aAPI override to init()
# .(30413.01  4/13/23 RAM  4:40p|  Parse SQL with SQLn:
# .(30417.02  4/17/23 RAM 10:20a|  Add bLog_HTML and bLog_Styles
# .(30428.03  4/28/23 RAM 11:20p|  Missing pReq.ip
# .(30510.02  5/10/23 RAM  9:00p|  Finish User_postRoute
# .(30510.03  5/10/23 RAM  9:15p|  Members_postRoute

##PRGM     +====================+===============================================+
##ID                            |
##SRCE     +====================+===============================================+
#*/
//  --------------------------  =   -------------------------------- ------------------ ------------------+ --------------------------

    import  express from  'express';

    import { chkArgs, sndHTML, getData, sndRecs, sndFile     } from './assets/mjs/formr_server-fns_u1.06.mjs';   // .(30403.04.3 RAM Add sndFile)
    import { init, start, setRoute, sayMsg, sndErr           } from './assets/mjs/formr_server-fns_u1.06.mjs';   // .(30327.01.1 RAM)
    import { getHTML, getStyles, getJSON,  indexObj          } from './assets/mjs/formr_server-fns_u1.06.mjs';   // .(30402.02.4 RAM).(30402.04.5)
    import { putData, chkSQL,    sndJSON,  traceR, __appDir  } from './assets/mjs/formr_server-fns_u1.06.mjs';   // .(30403.05.3 RAM Add putData).(30403.06.5 RAM Add chkSQL).(30404.03.1)# .(30412.02.4)

//  ------  ------------------  =   -------------------------------- ------------------ ------------------+

        if (process.argv[1].replace( /.*[\\/]/, '' ).match( /IODD.*\.mjs/ )) {

       var  bQuiet // =  true        // Override .env Quiet = {true|false}
       var  nPort     =  3015        // Override .env Server_Port
       var  aAPI   // = 'api15'      // Override .env API_URL                           // .(30408.02.3)

       var  pIODD     =  new IODD                                                       // .(30406.02.1 Beg)
            pIODD.init(  bQuiet, aAPI )                                                 // .(30412.02.11 RAM Override aAPI here)
            pIODD.setRoutes( )
//          pIODD.start( nPort,  aAPI )                                                 //#.(30406.02.1 End).(30408.02.4).(30412.02.12)
            pIODD.start( nPort )                                                        // .(30406.02.1 End).(30408.02.4).(30412.02.12)
            }
//--------  ------------------  =   -------------------------------- ------------------ ------------------+

//--------  ------------------  =   -------------------------------- ------------------ ------------------+

  function  IODD ( ) {

       var  pApp, pDB, aAPI_Host          // Doesn't work for bQuiet, because it is not used in this module
       var  pApp  =  express()                                                          // .(30406.02.2 RAM pApp is now local to IODD)

       var  pDB_Config= { }                                                             // .(30412.02.13 RAM Override it here??)

//--------  ------------------  =   -------------------------------- ------------------

this.setRoutes = function( bQuiet ) {                                                   // .(30406.02.3 RAM Beg Write function)

            this.Root_getRoute( '/' )
//          this.Table_getRoute()

            this.Login_getRoute( )
            this.Login_getForm( )       // .(30404.02.1)
            this.Login_postRoute( )     // .(30403.02.1)
//          this.Login_postForm( )      // .(30403.02.1)

            this.Meetings_getRoute( )

            this.Member_postRoute( )    // .(30510.03.2)
            this.Members_getRoute( )

            this.MembersBios_getRoute( )
            this.Projects_getRoute( )
            this.ProjectCollaborators_getRoute( )
            this.MembersProjects_getRoute( )
//          this.ProjectCollaboratorsLetters_getRoute( '/letters' )

            this.User_postRoute( )      // .(30510.02.2)
            this.Users_getRoute( )      // .(30510.02.3)
            this.User_getRoute( )       // .(30510.02.4 RAM Change to this.user_getRoute)

         }; // eof setRoutes                                                            // .(30406.02.3 End)
//--------  ------------------  =   -------------------------------- ------------------

this.Table_getRoute = function( aGetRoute, pValidArgs ) {

       var  aMethod   = 'get'
       var  aRoute    = '/table'

            aGetRoute =  aGetRoute  ? aGetRoute  : aRoute
            pValidArgs=  pValidArgs ? pValidArgs :
                          {  id:      /[0-9]+/
                          ,  letters: /([a-z],)*[a-z]/
                             }
//          ---------------------------------------------------

            setRoute( pApp, aMethod, aGetRoute, JSON_getRoute_Handler, pValidArgs, fmtSQL )

//          ---------------------------------------------------

  function  fmtSQL( pArgs ) {
       var  nRecs     =  pArgs.recs || 999
       var  aLetters  =  pArgs.letters

        if (aLetters) {  // --------------------------------
       var  aSQL      = `
          SELECT  *
            FROM  table
           WHERE  substring( Name, 1, 1) in ( '${ aLetters.replace( /,/, "','" ) }' )
        ORDER BY  Name `
        } else {
       var  aSQL      = `
          SELECT (@nRow:=@nRow + 1) AS RNo, countries_view.*
            FROM  table
               , (SELECT @nRow:=0) AS T
           WHERE  @nRow <= ${nRecs}
        ORDER BY  Id `
        }
    return  aSQL
            };  // eof fmtSQL
//     ---  ---------------------------------------------------
         }; // eof Table_getRoute
//--------  ------------------  =   -------------------------------- ------------------

this.Root_getRoute  = function( aRoute_,  pValidArgs ) {

       var  aMethod             =  'get'
       var  aRoute              =  '/'

            aRoute              =   aRoute_    ? aRoute_ : aRoute
            pValidArgs          =   pValidArgs ? pValidArgs : { }
//          ------------------  =   --------------------------------

       pApp.get( `${aAPI_Host}${aRoute}`, Root_getRoute_Handler )
            sayMsg(  aMethod,  `${aAPI_Host}${ aRoute.substring( aAPI_Host ? 1 : 0 ) }` )                   // .(30414.02.1 RAM Add ${aAPI_Host})
//          ------------------  =   --------------------------------

//          function Root_getRoute_Handler( aMethod, pReq, pRes, aRoute, pValidArgs ) { .. }
     async  function Root_getRoute_Handler( pReq, pRes ) {

       var  aRootRoute=  aRoute.substring( aAPI_Host ? 1 : 0 )                                              // .(30414.02.2)
                         sayMsg(  pReq, aMethod, aRootRoute )
       var  pArgs     =  chkArgs( pReq, pRes, pValidArgs ); if (!pArgs) { return }
       var  aHTML     =  fmtHTML( pArgs.name || '' )
                         sndHTML( pRes, aHTML, `${aRootRoute}${pReq.args}`, "Root_getRoute_Handler" )       // .(30331.01.1).(30414.02.3)

            } // eof Root_getRoute_Handler
//          ------------------  =   --------------------------------

  function  fmtHTML( aName ) {                                                                              // .(30405.03.1 Beg RAM Add ${aAPI_Host} to URLs)
       var  aHTML = `
            Welcome ${aName} to IODD MySQL Express Server API (v1-06.30412.1630).<br>
            Use any of the following APIs:<br><br>
            <div style="margin-left:40px; font-size:18px; line-height: 25px;">

            <a href="${aAPI_Host}/login?id=90"                       >/login?id=90</a><br>
            <a href="${aAPI_Host}/login_form?id=90"                  >/login_form?id=90</a><br>
<!--        <a href="${aAPI_Host}/login_form?form&id=90"             >/login_form?form&id=90</a><br> -->
<!--        <a href="${aAPI_Host}/login_form_post?username=a.b@c&password=" >/login_form_post</a><br> -->
<!--        <a href="${aAPI_Host}/login_form"                        >/login_form?id=90</a><br> -->
            <form ${ fmtForm1( 'robin.mattern@gmail.com', 'user', 40, 'login', 'login_form' ) }</form>    <!-- .(30511.01.1) -->
            <a href="${aAPI_Host}/meetings"                          >/meetings</a><br>
            <a href="${aAPI_Host}/members"                           >/members</a><br>
            <form ${ fmtForm1( '', '',                           120, 'member' ) }</form>                 <!-- .(30511.01.1).(30510.02.4 RAM Beg Add) -->
            <a href="${aAPI_Host}/members_bios"                      >/members_bios</a><br>
            <a href="${aAPI_Host}/members_projects"                  >/members_projects</a><br>
            <a href="${aAPI_Host}/projects"                          >/projects</a><br>
            <a href="${aAPI_Host}/project_collaborators"             >/project_collaborators</a><br>
            <form ${ fmtForm2( 'sam',                             60, 'user' ) }</form>                   <!-- .(30511.01.1).(30510.02.5 RAM Beg Add) -->
            <a href="${aAPI_Host}/users"                             >/users</a><br>                      <!-- .(30328.03.1 Add Users) -->
            <a href="${aAPI_Host}/user?id=7"                         >/user?id=7</a><br>                  <!-- .(30405.03.1 End) -->
            </div> `;

    return  aHTML
            }; // eof fmtRoot
//     ---  ------------------  =   --------------------------------
 
  function  fmtForm1( aValue, aDefault, nWdt, aRoute, aRouteName ) {
            aRouteName = aRouteName ? aRouteName : aRoute  
        var aHTML = ` method="POST" action="${aAPI_Host}/${aRoute}" style="margin-bottom:-5px;">
              /${aRouteName}: <input type="text"   name="" value=" ${aDefault}" style="padding:0px; width:${nWdt}px" />
              <input type="hidden" name="username" value="${aValue}" placeholder=" Email Address" >
              <input type="hidden" name="password" value="iodd">
              <input type="submit" value="Submit" style="padding:0px; width:53px" />
            `   
     return aHTML         
            }; // eof fmtForm1
//     ---  ------------------  =   --------------------------------
 
  function  fmtForm2( aValue, nWdt, aRoute ) {
        var aHTML = ` method="POST" action="${aAPI_Host}/${aRoute}" style="margin-bottom:-5px;">
              /${aRoute}: <input type="text" name="username" value=" ${aValue}" style="padding:0px; width:${nWdt}px" />
              <input type="hidden" name="password" value="iodd">
              <input type="submit" value="Submit" style="padding:0px; width:53px" />
            `   
     return aHTML         
            }; // eof fmtForm2
//     ---  ------------------  =   --------------------------------
         }; // eof Root_getRoute
//--------  ------------------  =   -------------------------------- ------------------

// BEGINNING OF FETCHES (= MENU NAME)

//=login==================================================================
//-(getLogin)----------------------------------------------------------------

this.Login_getRoute  = function( ) {    // Send back JSON                                                   // .(30404.02.2 )

       var  pValidArgs ={ id : /[0-9]+/ }

            setRoute( pApp, 'get', '/login', Login_getRoute_Handler, pValidArgs, `SELECT * FROM login_view`  )

     async  function Login_getRoute_Handler( aMethod, pReq, pRes, aRoute, pValidArgs, fmtSQL ) {

            pRes.bSndNoData = true                                                                          // .(30407.03.1 RAM Don't send Error msg)
            JSON_getRoute_Handler(aMethod, pReq, pRes, aRoute, pValidArgs, fmtSQL )                         // .(30407.03.2 RAM Send Error msg)

            }; // eof Login_getRoute_Handler
//     ---  ------------------  =   --------------------------------
         }; // eof Login_getRoute
//--------  ------------------  =   -------------------------------- ------------------

//-(getLogin_form)--------------------------------------------------------

this.Login_getForm  = function( ) {     // Send back HTML form with route = '/login?form' if present        // .(30404.02.3)

       var  pValidArgs ={ id : /[0-9]+/ }

            setRoute( pApp, 'get', '/login_form', Login_getForm_Handler )

     async  function Login_getForm_Handler( aMethod, pReq, pRes, aRoute ) {

                         sayMsg(  pReq, aMethod, aRoute )
       var  pArgs     =  chkArgs( pReq, pRes,  pValidArgs   ); if (!pArgs) { return }
        if (pArgs.id > 0) {
       var  aSQL      =  await fmtSQL(  pArgs )
       var  mRecs     =  await getData( pDB,   aSQL, aRoute, pRes );                                        // .(30402.05.13 RAM say aRoute found).(30407.03.3)
        } else {
            mRecs     =  [ { Email: "", PIN: "" } ]
            }
//     var  aHTML     =  fmtHTML( mRecs[0], await fmtStyles( ) )                                            // .(30402.04.1)

       var  aHTML     =  await fmtHTML( mRecs[0] )                                                          // .(30403.01.1)
                         sndHTML( pRes, aHTML, `${aRoute}${pReq.args}`, "Login_getForm_Handler" )           // .(30331.01.1).(30404.02.4)

            } // eof Login_getForm_Handler
//     ---  ------------------  =   --------------------------------

     async  function  fmtSQL( pArgs ) {
    return `SELECT * FROM login_check_view WHERE Id = ${ pArgs.id } `
            }; // eof fmtSQL
//     ---  ------------------  =   --------------------------------

     async  function  fmtHTML( pData ) {
    return  await Login_fmtHTML( pData )                                                                    // .(30403.01.2 RAM Use shared function )
            }; // eof fmtHTML
//     ---  ------------------  =   --------------------------------
         }; // eof Login_getForm
//--------  ------------------  =   -------------------------------- ------------------

//-( postLoginRoute )----------------------------------------------------------

this.Login_postRoute = function( ) {    // Send back JSON if found, otherwise send back empty JSON or HTML form with error and route = '/login?form' if present

       var  pValidArgs =  { username : /[a-zA-Z0-9]+/
                          , password : /[a-zA-Z0-9]{4,}/
                            }
            setRoute( pApp, 'post', '/login', Login_postRoute_Handler )

//     ---  ------------------  =   --------------------------------

     async  function Login_postRoute_Handler( aMethod, pReq, pRes, aRoute ) {

       var { fmtSQL1, fmtSQL2, fmtSQL3, fmtSQL4, fmtSQL5 } = Login_fmtSQLfns                                // .(30404.04.1).(30406.01.7).(30407.02.1)

                               sayMsg(  pReq, aMethod, aRoute )
       var  pArgs     =        chkArgs( pReq, pRes, pValidArgs ); if (!pArgs) { return }

       var  mRecs1    =  await getData( pDB,  fmtSQL1( pArgs    ), aRoute, pRes );  // select login_view    // .(30403.01.3 RAM Check if username & password are in DB)
        if (mRecs1.length == 0) {    // sndErr( pRes, mRecs1[1] ); return                                   // .(30404.02.5 RAM If none found)
                               sndJSON( pRes, JSON.stringify( { login: [] } ), 'login' )                    // .(30404.02.6 RAM Return empty JSON)
        } else { // no error
       var  aIPAddr4  =        pReq.ip ? pReq.ip : (pReq.ips && pReq.ips[0]) || '::1'                       // .(30428.03.1 RAM Missing pReq.ip)
            aIPAddr4  =        aIPAddr4.replace( /::1/, '127.0.0.1' ).replace( /^::ffff:/, '')              // .(30406.03.1)
            mRecs1[0] =   { ...mRecs1[0], LastPageVisited: 'login.html', IPv4Address: aIPAddr4 }            // .(30406.03.2).(30405.04.6)

                         await putData( pDB,  fmtSQL2( mRecs1[0] ), aRoute );        // delete login        // .(30403.05.4).(30403.02.3 RAM Delete prior Login records).(30407.03.4)
       var  mRecs3    =  await putData( pDB,  fmtSQL3( mRecs1[0] ), aRoute );        // insert login        // .(30403.05.5).(30403.02.4 RAM Change getData to putData)

       var  mRecs3    =    [ { Id: mRecs3[2].affectedId,  IPAddress4: mRecs1[0].IPAddress4                  // .(30406.01.4)
                             , LastPageVisited: mRecs1[0].LastPageVisited, Count: mRecs3[2].affectedRows }] // .(30406.03.3)

       var  mRecs4    =  await putData( pDB,  fmtSQL4( mRecs3[0] ), aRoute );        // insert login_log    // .(30406.01.5 RAM Insert into login_log)
                         await putData( pDB,  fmtSQL5( mRecs1[0] ), aRoute );        // update members      // .(30406.01.5 RAM Insert into login_log).(30407.03.5 RAM Will never get an error)

                               sndJSON( pRes, JSON.stringify( { login: mRecs1 } ) , 'login' )               // .(30404.02.7)
                         }
            } // eof Login_postRoute_Handler
//     ---  ------------------  =   --------------------------------
         }; // eof Login_postRoute
//--------  ------------------  =   -------------------------------- ------------------

       var  Login_fmtSQLfns = {                                                                             // .(30404.04.2 RAM Combine fmtSQL functions)

            fmtSQL1 : function( pArgs ) {                                                                   // .(30404.04.3 RAM Define function differently)
                                                                                                            // .(30405.04.1 RAM PIN vs Password and 'yes' vs 'Y')
    return `SQL1: SELECT * FROM login_view2                                                                 -- .(30413.01.5 RAM Parse SQL with SQLn:)
                   WHERE Email    = '${ pArgs.username }'
                     AND PIN      = '${ pArgs.password }'
                     AND Active   = 'yes'`
            } // eof fmtSQL1
//     ---  ------------------  =   --------------------------------

         ,  fmtSQL2 : function( pData ) {                                                                   // .(30404.04.4)

//  return `DELETE FROM login  WHERE MemberId = ${pData.Id}`                                                //#.(30407.02.2)
    return `SQL2: DELETE FROM login  WHERE MemberNo = ${pData.MemberNo}`                                    // .(30407.02.3)
            } // eof fmtSQL2
//     ---  ------------------  =   --------------------------------

         ,  fmtSQL3 : function( pData ) {                                                                   // .(30404.04.5)

       var  aNow = (new Date).toISOString().replace( /T/, ' ').substring( 0, 19 )

            pData.LastPageVisited =  pData.LastPageVisited ? pData.LastPageVisited : `login.html`
            pData.LogInDateTime   =  aNow
            pData.LogOutDateTime  =  null
            pData.CreatedAt       =  aNow
            pData.UpdatedAt       =  aNow

//         `INSERT INTO login                                                                               //#.(30407.02.4)
//               ( MemberId, LastName, IPAddress4, LastPageVisited, LogInDateTime, LogOutDateTime, CreatedAt, UpdatedAt )
//            VALUES
//               ( ${pData.Id }, '${pData.LastName}', '${pData.IPAddress4 }', '${ pData.LastPageVisited }'
//                                                                                                          // .(30405.04.2 RAM Change IPAddress4 to IPv4Address)
       var aSQL = `SQL3:                                                                                    -- .(30406.03.4 RAM Add IPAddress4 to SQL).(30407.02.5)
                  INSERT INTO login
                       ( MemberNo, FullName, IPv4Address, LastPageVisited, LogInDateTime, LogOutDateTime, CreatedAt, UpdatedAt )
                  VALUES
                       ( ${pData.MemberNo }, '${pData.FullName}', '${pData.IPAddress4 }', '${ pData.LastPageVisited }'
                       , STR_TO_DATE(  '${pData.LogInDateTime}' , '%Y-%m-%d %H:%i:%s' )
                       ,                ${pData.LogOutDateTime}
                       , STR_TO_DATE(  '${pData.CreatedAt}'     , '%Y-%m-%d %H:%i:%s' )
                       , STR_TO_DATE(  '${pData.UpdatedAt}'     , '%Y-%m-%d %H:%i:%s' )
                   ); `
    return  aSQL
            } // eof fmtSQL3
//     ---  ------------------  =   --------------------------------

         ,  fmtSQL4( pData ) {                                                                              // .(30406.01.6 Beg RAM Write function)

//          SELECT Id, MemberId, LastName, IPAddress4,  LastPageVisited, LogInDateTime, CreatedAt, UpdatedAt//#.(30407.02.6)
//          SELECT Id, MemberNo, LastName, IPv4Address, LastPageVisited, LogInDateTime, CreatedAt, UpdatedAt//#.(30405.04.3)
//            FROM login WHERE id = ${pData.Id};`
                                                                                                            // .(30406.03.5).(30407.02.7).(30405.04.3)
    return `SQL4: INSERT INTO login_log
                  SELECT Id, MemberNo, FullName, IPv4Address, LastPageVisited, LogInDateTime, CreatedAt, UpdatedAt
                    FROM login WHERE id = ${pData.Id};`

            }  // eof fmtSQL4                                                                               // .(30406.01.6 End)
//     ---  ------------------  =   --------------------------------

         ,  fmtSQL5( pData ) {                                                                              // .(30406.01.6 Beg RAM Write function)
                                                                                                            // .(30407.02.8).(30405.04.4)
    return `SQL5: UPDATE members
                     SET IsLoggedIn    = 'Y', IPv4Address = '${pData.IPv4Address}'
                       , LogInDateTime =  STR_TO_DATE( '${pData.LogInDateTime}', '%Y-%m-%d %H:%i:%s' )
                   WHERE MemberNo = ${pData.MemberNo}`

            }  // eof fmtSQL5                                                                               // .(30407.02.9)
//     ---  ------------------  =   --------------------------------
         }; // eoo Login_fmtSQLfns                                                                          // .(30404.04.6)
//--------  ------------------  =   -------------------------------- ------------------

     async function Login_fmtHTML( pData, aErr ) {                                                          // .(30403.01.5 Beg Move to shared async function ).(.30403.05.1)

       var  mStyles   = [ '.Section1Title', '.login', '.login form', '.login h1' , '.login form label'
                        , '.login form input[type="password"], .login form input[type="text"]'
                        , '.login form input[type="submit"]', '.login form input[type="submit"]:hover'
                           ]
       var  aStyleSheet =  `${__appDir}/login/login_u1.03.css`                                              // .(30416.05.1)
       var  aStyles   =  await getStyles( aStyleSheet, mStyles )                                            // .(30416.04.1 RAM was '../../login/login.css')
            aStyles  += `\n#ErrorMsg { display: ${ aErr ? 'block' : 'none' } }`
//          traceR(     'login_fmtHTML[1]', `aStyles:\n'${aStyles}'`, 1 );
            aStyles   =  aStyles.replace( /\n/g, '\n'.padEnd(9) ) + '\n'.padEnd(7)

       var  aHTML =                                                                                         // .(30402.04.4 RAM Add Styles)
`    <style>${ aStyles}</style>
      <div class="Section1Title">institute of database developers</div>
      <div class="login">
          <h1>Login</h1>
          <form action="/login" method="post">
            <label for="username">
              <!-- font awesome icon -->
              <i class="fas fa-user"></i>
            </label>
            <input type="text"     name="username" placeholder="eMail"    id="username" value="${pData.Email}" required>
            <label for="password">
              <i class="fas fa-lock"></i>
            </label>
            <input type="password" name="password" placeholder="Password" id="password" value="${pData.PIN}" required>
          <input type="submit" value="Login">
        </form>
        <div id="ErrorMsg">${aErr}</div>
      </div><!-- eof class login -->
     `
        var bLog_HTML = process.env.Log_HTML == true                                                        // .(30417.02.2)
            traceR(        'login_fmtHTML[2]', `aHTML:\n'${aHTML}'`, bLog_HTML );                           // .(30417.02.3)
    return  aHTML
            } // eof Login_fmtHTMLogin                                                                      // .(30330.06.3 End)
//--------  ------------------  =   -------------------------------- ------------------
//=====================================================================================

//= meeting s==============================================================
//-(Meeting Notification)--------------------------------------------------

this.Meetings_getRoute = function( ) {

            setRoute(  pApp, 'get', '/meetings',        Meetings_getRoute_Handler, { id : /[0-9]+/ }, `SELECT * FROM meetings_view` )

//     ---  ------------------  =   --------------------------------

     async  function Meetings_getRoute_Handler ( aMethod, pReq, pRes, aRoute, pValidArgs, fmtSQL ) {

                                 sayMsg(  pReq, aMethod, aRoute )
       var  pArgs       =        chkArgs( pReq, pRes, pValidArgs ); if (!pArgs) { return }
       var  aSQL        =        chkSQL(  fmtSQL, pArgs )                                                   // .(30403.06.6).(30407.03.6)
//     var  mRecs       =  await getData( pDB,   aSQL ); if (mRecs[0] == 'error') { sndErr( pRes, mRecs[1] ); return }
       var  mRecs       =  await getData( pDB,   aSQL, aRoute, pRes ); if (mRecs[0] == 'error') { sndErr( pRes, mRecs[1] ); return }
                                 sndRecs( mRecs, aSQL, aRoute, pRes, "Meetings_getRoute_Handler" )          // .(30331.02.2).(30407.03.7)

            } // eof Meetings_getRoute_Handler
//     ---  ------------------  =   --------------------------------
         }; // eof Meetings_getRoute
//--------  ------------------  =   -------------------------------- ------------------
//=====================================================================================

//= members ===============================================================
//-(Members Listing)-------------------------------------------------------

this.Members_getRoute = function( ) {

            setRoute( pApp, 'get', '/members',          JSON_getRoute_Handler, `SELECT * FROM members_view` )

         }; // eof Members_getRoute
//--------  ------------------  =   -------------------------------- ------------------
//=====================================================================================

//-(postMembers)-----------------------------------------------------------
//-(Update/Insert Member)--------------------------------------------------

this.Member_postRoute = function( ) {                                                                       // .(30510.03.4 Beg RAM Add Members_getRoute)

       var  aNow = (new Date).toISOString().replace( /T/, ' ').substring( 0, 19 )

       var  pValidArgs = {  id              : [ 'MemberNo',      /[0-9]+/,  "required", "must be a number" ]
                         ,  title           : [ 'TitleName',     /.+/, ]
                         ,  firstname       : [ 'FirstName',     /.+/, ]
                         ,  middleinits     : [ 'MiddleName',    /.+/, ]
                         ,  lastname        : [ 'LastName',      /.+/, ]
                         ,  suffix          : [ 'PostName',      /.+/, ]
                         ,  RoleId          : [ 'RoleId',        /.+/, ]
                         ,  email           : [ 'Email',         /[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+/, "", "must be a valid email address (xx@xx.xx)" ]
                         ,  password        : [ 'PIN',           /[a-zA-Z0-9]{4,}/,                         "", "must be at least 4 characters" ]
                         ,  ipaddr          : [ 'IPv4Address',   /.+/, ]
                         ,  logged_in       : [ 'IsLoggedIn',    /.+/, 'N']
                         ,  logged_in_at    : [ 'LogInDateTime', /.+/,  aNow ]
                         ,  active          : [ 'Active',        /.+/, 'Y' ]
                         , 'co-name'        : [ 'Company',       /.+/, ]
                         , 'co-addr1'       : [ 'Address1',      /.+/, ]
                         , 'co-addr2'       : [ 'Address2',      /.+/, ]
                         ,  city            : [ 'City',          /.+/, ]
                         ,  state           : [ 'State',         /.+/, ]
                         ,  zip             : [ 'Zip',           /.[0-9.]{5,10}/, "", "must be a valid zip code (xxxxx[.xxxx])" ]
                         ,  country         : [ 'Country',       /.+/, ]
                         ,  phone1          : [ 'Phone1',        /.+/, ]
                         ,  phone2          : [ 'Phone2',        /.+/, ]
                         ,  fax             : [ 'Fax',           /.+/, ]
                         ,  webSite         : [ 'WebSite',       /.+/, ]
                         ,  skills          : [ 'Skills',        /.+/, ]
                         ,  bio             : [ 'Bio',           /.+/, ]
                         ,  created_at      : [ 'CreatedAt',     /.+/, ]
                         ,  updated_at      : [ 'UpdatedAt',     /.+/, ]
                         ,  last_updated    : [ 'LastUpdated',   /.+/, ]
                            }

//     var  pArgs = chkArgs( pReq, pValidArgs )

            setRoute( pApp, 'post', '/member', Member_postRoute_Handler, pValidArgs )

     async  function Member_postRoute_Handler( aMethod, pReq, pRes, aRoute ) {

                               sayMsg(  pReq, aMethod, aRoute )
//     var  pArgs     =        chkArgs( pReq, pRes, pValidArgs ); if (!pArgs) { return }
       var  pArgs     =                 pReq.body.map( aFld => pValidArgs[ aFld ][0] )

       var  mRecs1    =  await putData( pDB,  fmtSQL1( pArgs ), aRoute );        

       var  mRecs2    =    [ { Id: mRecs1[2].affectedId, Count: mRecs2[2].affectedRows 
                             , UserName: pArgs.username, Password: pArgs.password } 
                               ]
//     var  mRecs2    =  await putData( pDB,  fmtSQL2( pArgs ), aRoute );        
                               sndJSON( pRes, JSON.stringify( { user: mRecs1 } ), aRoute )
            }
//     ---  ------------------  =   --------------------------------

  function  fmtSQL1( pArgs ) {

       var  aSQL = `UPDATE  members
                       SET  MemberNo        =  ${ pArgs.MemberNo      }
                         ,  FirstName       = '${ pArgs.FirstName     }
                         ,  MiddleName      = '${ pArgs.MiddleName    }
                         ,  LastName        = '${ pArgs.LastName      }
                         ,  PostName        = '${ pArgs.PostName      }
                         ,  Email           = '${ pArgs.Email         }
                         ,  PIN             = '${ pArgs.PassWord      }
                         ,  Active          = '${ pArgs.Active        }
                         ,  Company         = '${ pArgs.Company       }
                         ,  Address1        = '${ pArgs.Address1      }
                         ,  Address2        = '${ pArgs.Address2      }
                         ,  City            = '${ pArgs.City          }
                         ,  State           = '${ pArgs.State         }
                         ,  Zip             = '${ pArgs.Zip           }
                         ,  Country         = '${ pArgs.Country       }
                         ,  Phone1          = '${ pArgs.Phone1        }
                         ,  Phone2          = '${ pArgs.Phone2        }
                         ,  WebSite         = '${ pArgs.WebSite       }
                         ,  Bio             = '${ pArgs.Bio           }
                         ,  CreatedAt       =     STR_TO_DATE( '${ aNow }' , '%Y-%m-%d %H:%i:%s' )
                         ,  UpdatedAt       =     STR_TO_DATE( '${ aNow }' , '%Y-%m-%d %H:%i:%s' )
                         ,  LastUpdated     =     STR_TO_DATE( '${ aNow }' , '%Y-%m-%d %H:%i:%s' )
                     WHERE  Id = ${ id }
                            `
    return  aSQL
            }
//     ---  ------------------  =   --------------------------------
         }; // eof Member_postRoute                                                                         // .(30510.03.4 End)
//--------  ------------------  =   -------------------------------- ------------------
//=====================================================================================

//= members_bios============================================================
//-(Bios)------------------------------------------------------------------

this.MembersBios_getRoute = function( ) {

            setRoute( pApp, 'get', '/members_bios',     JSON_getRoute_Handler, `SELECT * FROM members_bios_view` )

         }; // eof MembersBios_getRoute
//--------  ------------------  =   -------------------------------- ------------------
//=====================================================================================

// =members_projects ======================================================
//-(Project Listing)-------------------------------------------------------

this.MembersProjects_getRoute = function( ) {

            setRoute( pApp, 'get', '/members_projects', JSON_getRoute_Handler, `SELECT * FROM members_projects_view` )

         }; // eof MembersProjects_getRoute
//--------  ------------------  =   -------------------------------- ------------------
//=====================================================================================

//= projects ==============================================================
//-(Project Details)-------------------------------------------------------

this.Projects_getRoute = function( ) {

//          setRoute( pApp, 'get', '/projects',         JSON_getRoute_Handler, `SELECT * FROM members_projects_collaboration_view` )
            setRoute( pApp, 'get', '/projects',         JSON_getRoute_Handler, `SELECT * FROM members_projects_colaboration_view` )

         }; // eof Projects_getRoute
//--------  ------------------  =   -------------------------------- ------------------
//=====================================================================================

//= project_collaborators ===================================================
//-(getProjectCollaborators)-------------------------------------------------

this.ProjectCollaborators_getRoute = function( ) {

       var  aRoute    = '/project_collaborators'
       var  pValidArgs=  { id: /[0-9]+/ }
//     ---  ------------------  =   --------------------------------

       pApp.get( `${aAPI_Host}${aRoute}`, async function( pReq, pRes ) {

                               sayMsg(  pReq, 'get', aRoute )
       var  pArgs     =        chkArgs( pReq, pRes,  pValidArgs  ); if (!pArgs) { return }
       var  aSQL      =        chkSQL(  fmtSQL, pArgs )                                                        // .(30403.06.7)
       var  mRecs     =  await getData( pDB,   aSQL  )                                                         // .(30407.03.8 RAM No Errors??)
                               sndRecs( mRecs, aSQL, aRoute, pRes, "ProjectCollaborators_getRoute_Handler" )   // .(30407.03.9)

            } ) // eof pApp.get( /project_colaborators )

            sayMsg( 'get', aRoute )
//     ---  ------------------  =   --------------------------------

  function  fmtSQL( pArgs ) {
       var  nId       =  pArgs.id || 0
       var aSQL       = `
          SELECT  Distinct *
            FROM  members_projects_view
 ${ nId ? `WHERE  ProjectId = ${ nId }` : `` } `
   return  aSQL
            }; // eof fmtSQL
//     ---  ------------------  =   --------------------------------
         }; // eof ProjectCollaborators_getRoute
//--------  ------------------  =   -------------------------------- ------------------
//=====================================================================================

//= User =================================================================
//-(getUser)--------------------------------------------------------------

this.User_getRoute = function() {                                                       // .(30510.02.6 RAM Was Users_getOneRoute)

            setRoute( pApp, 'get', '/user',             JSON_getRoute_Handler, ( pArgs ) => {
    return `SELECT * FROM users WHERE Id = ${ pArgs.id } `
            } );
         }; // eof Users_getOneRoute
//--------  ------------------  =   -------------------------------- ------------------
//=====================================================================================

//= users ================================================================
//-(getUsers)-------------------------------------------------------------

this.Users_getRoute = function( ) {                                                     // .(30328.04.1 Beg RAM Add getUsers).(30510.02.7 RAM Was: Users_getAllRoute)

            setRoute( pApp, 'get', '/users',            JSON_getRoute_Handler,
                      `SELECT * FROM users` )

         }; // eof Users_getAllRoute                                                    // .(30328.04.1 End)
//--------  ------------------  =   -------------------------------- ------------------
//=====================================================================================

//= adduser =================================================================
//-(addUser)-----------------------------------------------------------------

this.User_postRoute  =  function( ) {                                                   // .(30328.05.1 Beg RAM Add addUser)

       var  aRoute = `/user`
       var  pValidArgs =  { username : /[a-zA-Z0-9]+/
                          , password : /[a-zA-Z0-9]{4,}/
                            }
       //var { fmtSQL1, fmtSQL2 } = Login_fmtSQLfns  

            setRoute( pApp, 'post', '/user', User_postRoute_Handler )

//     ---  ------------------  =   --------------------------------

     async  function User_postRoute_Handler( aMethod, pReq, pRes, aRoute ) {

                               sayMsg(  pReq, aMethod, aRoute )
       var  pArgs     =        chkArgs( pReq, pRes, pValidArgs ); if (!pArgs) { return }

       var  mRecs1    =  await getData( pDB,  fmtSQL1( pArgs ), aRoute, pRes );  
        if (mRecs1.length != 0) {                                                   
       var  mMsg      =  [ `*** The user, ${mRecs1[0].UserName }, currently exists` ]
                               sndJSON( pRes, JSON.stringify( { error: mMsg  } ), 'user' ) 
        } else { // no error
       var  mRecs2    =  await putData( pDB,  fmtSQL2( pArgs ), aRoute );        

       var  mRecs2    =    [ { Id: mRecs2[2].affectedId, Count: mRecs2[2].affectedRows 
                             , UserName: pArgs.username, Password: pArgs.password } 
                               ]
                               sndJSON( pRes, JSON.stringify( { user: mRecs2 } ), 'user' )
            }
//     ---  ------------------  =   --------------------------------

  function  fmtSQL1( pArgs ) {

    return  `SELECT  UserName 
               FROM  users
               WHERE UserName = '${ pArgs.username }'
               `
            }; // eof fmtSQL1
//     ---  ------------------  =   --------------------------------

  function  fmtSQL2( pArgs ) {

       var  aDay = (new Date).toISOString().substring( 0, 10 )

    return  `INSERT INTO  users
                       (  UserName, Email, Password, PasswordDate, Role, Active, MemberNo )
                VALUES ( '${ pArgs.username }'
                       , '${ pArgs.username }@gmail.com'
                       , '${ pArgs.password }'
                       ,     STR_TO_DATE( '${ aDay }' , '%Y-%m-%d' )
                       ,    'Admin'
                       ,    'Y'
                       ,     9
                          ) `

            }; // eof fmtSQL2
//     ---  ------------------  =   --------------------------------
          }; // eof User_postRoute_Handler
//     ---  ------------------  =   --------------------------------
         }; // eof Users_postUser                                                       // .(30328.05.1 End)
//--------  ------------------  =   -------------------------------- ------------------
//=====================================================================================

//= json_getroute ==================================================
//-(JSON_getRoute_Handler)------------------------------------------

     async  function JSON_getRoute_Handler( aMethod, pReq, pRes, aRoute, pValidArgs, fmtSQL ) {

                               sayMsg(  pReq, aMethod, aRoute )
       var  pArgs     =        chkArgs( pReq, pRes, pValidArgs ); if (!pArgs) { return }
       var  aSQL      =        chkSQL(  fmtSQL, pArgs )                                                                            // .(30403.06.8)
//     var  mRecs     =  await getData( pDB,   aSQL               ); if (mRecs[0] == 'error') { sndErr( pRes, mRecs[1] ); return } // .(30407.03.10)
//     var  mRecs     =  await getData( pDB,   aSQL, aRoute, pRes ); if (mRecs[0] == 'error') { sndErr( pRes, mRecs[1] ); return } // .(30407.03.11)
       var  mRecs     =  await getData( pDB,   aSQL, aRoute, pRes );                                                               // .(30407.03.12)
                               sndRecs( mRecs, aSQL, aRoute, pRes, "JSON_getRoute_Handler" )                                       // .(30407.03.13 RAM Moved pRes arg)

         }; // eof JSON_getRoute_Handler
//--------  ------------------  =   -------------------------------- ------------------
//=====================================================================================

//is.init = function( pApp_, bQuiet_ ) { ... }                                          //#.(30406.01.5)
//          pApp   =  pApp_  // express()                                               //#.(30406.01.5)
//is.init = function(       bQuiet_ ) { ... }                                           // .(30406.01.5)
this.init = function( bQuiet_, aAPI ) {                                                 // .(30412.02.14)

//    var { pDB_,     aAPI_Host_, bQuiet_ } = init( pApp, pDB_Config,       bQuiet_ );  // no workie without var, and must returned vars must be underlined
      var { pDB_,     aAPI_Host_, bQuiet_ } = init( pApp, pDB_Config, bQuiet_, aAPI );  // .(30412.02.15 RAM Override aAPI_Host here)
//          pDB    =  pDB_; aAPI_Host = aAPI_Host_, bQuiet = bQuiet_                    //#but only works for objects, not "singleton"s. Probably not true, just a theory
            pDB    =  pDB_; aAPI_Host = aAPI_Host_                                      // and must use underlined vars to reset globals

         }; // eof init
//--------  ------------------  =   -------------------------------- ------------------
//=====================================================================================

//this.start  = function( nPort ) { start( pApp, nPort, aAPI_Host ) }                  // .(30408.02.1)
this.start  = function( nPort, aAPI ) {                                                // .(30408.02.1 RAM Override aAPI_Host).(30412.02.16 RAM Not here)

            aAPI_Host = aAPI ? `/${ aAPI.replace( /^\//, '' ) }` : aAPI_Host           // .(30408.02.2).(30412.02.17)
            start( pApp, nPort, aAPI_Host )                                            // .(30412.02.18)

         }; // eof start
//--------  ------------------  =   -------------------------------- ------------------
//=====================================================================================
    }; // eoc IODD
//  --------------------------------------------------------------------------

export { IODD }
