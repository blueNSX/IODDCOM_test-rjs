/*\
##=========+====================+================================================+
##RD       formr_server-fns.mjs | Server script
##RFILE    +====================+=======+===============+======+=================+
##FD       server-fns_u1.00.mjs |  12796|  3/20/23 12:47|    65| u1.00-30320.1247
##FD       server-fns_u1.01.mjs |  15088|  3/23/23 14:54|    65| u1.01-30323.1454
##FD       server-fns_u1.01.mjs |  18470|  3/28/23 21:18|    65| u1.01-30328.2118
##FD       server-fns_u1.02.mjs |  15714|  3/30/23 15:07|    65| u1.02-30330.1507
##FD       server-fns_u1.03.mjs |  21473|  3/31/23 22:45|   341| u1-03-30331.2245
##FD       server-fns_u1.04.mjs |  37077|  4/02/23 17:24|   566| u1-04.30402.1724
##FD formr_server-fns_u1.04.mjs |  40123|  4/10/23 13:09|   602| u1-04.30410.1300
##FD formr_server-fns_u1.06.mjs |  45486|  4/12/23 16:32|   652| u1-06.30412.1630
##FD formr_server-fns_v1.06.mjs |  45567|  4/13/23 15:31|   653| v1-06.30412.1630
##FD formr_server-fns_v1.06.mjs |  45567|  4/13/23 16:31|   653| v1-06.30412.1630
##FD formr_server-fns_u1.06.mjs |  46749|  4/13/23 17:00|   665| u1-06.30413.1700
##DESC     .--------------------+-------+---------------+------+-----------------+
#           This Javascript file
##LIC      .--------------------+----------------------------------------------+
#           Copyright (c) 2023 8020Data-formR * Released under
#           MIT License: http://www.opensource.org/licenses/mit-license.php
##FNCS     .--------------------+----------------------------------------------+
#           putData                                                                 // .(30403.05.0)
#           getData
#           getHTML                                                                 // .(30401.02.0)
#           getStyle                                                                // .(30402.01.0)
#           getJSON                                                                 // .(30402.01.0)
#           saySQL
#           setRoute
#           chkSQL              | return aSQL from aStr or fmtSQL with WHERE id = pArgs.id if present
#           sndRecs
#           sndFile                                                                 // .(30403.04.0)
#           fmtJSON
#           sndJSON
#           chkArgs
#           chkArg
#           chkSQL                                                                  // .(30403.06.0)
#           fmtArgs
#           sndHTML
#           setErr
#           sndErr
#           sayErr
#           sayMsg
#           indexObj                                                                 // .(30402.03.0)
#           init
#           setVar2
#           setVar1
#           start
#                               |
##CHGS     .--------------------+----------------------------------------------+
# .(30213.01  2/13/23 RAM  1:45p|  Created
# .(30213.02  2/13/23 RAM  2:12p|  Change port from 3000 to 3002
# .(30214.03  2/14/23 RAM  8:00p|  Display root dir
# .(30312.02  3/12/23 RAM  9:10a|  Set nPort for FRApps/server3/s36_mysql-data-api )
# .(30318.01  3/18/23 RAM  8:22a|  Should `return pReq.query` be `{}`??
# .(30319.01  3/19/23 RAM  3:32p|  Do nothing if .env not found
# .(30322.03  3/22/23 RAM  1:28p|  Play with aRemoteHost, bQuiet & aNeeds to be global to the IODD object
# .(30322.05  3/22/23 RAM  2:20p|  Put '/' back into replace( 'file:///', '/' ) if aOS = 'linux'
# .(30322.06  3/22/23 RAM  3:02p|  Add null and undefined
# .(30323.05  3/23/23 RAM  2:54p|  pDB_Config, set in code, takes precedence)
# .(30328.02  3/28/23 RAM  9:20p|  Write chkSQLargs
# .(30328.03  3/28/23 RAM  9:18p|  Move setRoute to server-fns.mjs
# .(30328.04  3/28/23 RAM 10:00p|  Write saySQL
# .(30328.05  3/28/23 RAM 10:34p|  Write chkSQLargs
# .(30322.03  3/31/23 RAM  3:24p|  aRemote_Host and aAPI_Host is needed by setRoute
# .(30328.05  3/31/23 RAM  3:34p|  Add Node's inspect
# .(30328.05  3/31/23 RAM  7:53p|  Return object in chkSQLargs
# .(30331.01  3/31/23 RAM  8:00p|  Display onRoute name
# .(30401.02  4/01/23 RAM  4:00p|  Add getHTML
# .(30402.01  4/02/23 RAM  2:53p|  Add fetchFile
# .(30402.02  4/02/23 RAM  2:53p|  Add getStyle, getJSON and modify getHTML
# .(30402.03  4/02/23 RAM  3:18p|  Add indexObj
# .(30402.05  4/02/23 RAM  5:24p|  Reuse sayMsg. Plus lots of changes for 'n Records found'
# .(30403.04  4/03/23 RAM  1:09p|  Write sndFile
# .(30403.05  4/03/23 RAM  3:40p|  Write putData
# .(30403.06  4/03/23 RAM  7:07p|  Add chkSQL and default pValidArgs: { id : /[0-9]+/ }
# .(30403.07  4/03/23 RAM  7:45p|  Trim mArg in chkArgs
# .(30406.01  4/06/23 RAM  9:10a|  Return InsertId
# .(30407.03  4/07/23 RAM  9:15a|  Change getData and putData to sndErr if needed
# .(30408.01  4/08/23 RAM 10:15a|  In chkSQL, Check if WHERE exists)
# .(30410.02  4/10/23 RAM  8:15a|  Breakout formr_utility-fns_u1.06.mjs
# .(30410.03  4/12/23 RAM  1:30p|  Use setAPI_URL and move aRemote
# .(30412.01  4/12/23 RAM  2:30p|  Use getEnv_sync
# .(30412.02  4/12/23 RAM  3:20p|  Move aAPI override to init()
# .(30413.01  4/13/23 RAM  5:00p|  Parse SQL with SQLn:
# .(30415.02  4/15/23 RAM  9:00p|  Use typeof instead of if (MT) {}
# .(30415.03  4/15/23 RAM  8:00p|  Add ${aAPI_Host} to sayMsg
# .(30415.04  4/15/23 RAM 10:00p|  Check if cssjson is present
# .(30416.01  4/16/23 RAM 10:30a|  Preserve \n in sayMsg 
# .(30416.02  4/16/23 RAM 11:20a|  Use tracrR
# .(30416.03  4/16/23 RAM  1:55p|  Use __appDir
# .(30417.03  4/17/23 RAM  1:15p|  Move sayErr to formr_utility-fns.mjs
# .(30511.02  5/11/23 RAM  3:45p|  Prevent crash if SELECT nothing if no args

##SRCE     +====================+===============================================+
#*/
//  --------------------------  =   -------------------------------- ------------------ ------------------+ --------------------------

   import   mysql            from  'mysql2/promise';
   import { inspect }        from  'util'                                                                   // .(30328.05.3 RAM Add)
   import   express          from  'express';  
// import   bodyParser       from  'body-parser';                                                           // .(30424.09.x RAM Use express.json)
   import   cssjson          from  'cssjson';                                                               // .(30402.02.5)
   import   cors             from  'cors';
// import   fs               from  'fs'

   import { getEnv_sync, __dirname, __appDir, traceR, aOS }  from  './formr_utility-fns_u1.06.mjs'          // .(30410.02.1).(30410.03.1 Add setAPI_URL).(30412.02.10).(30416.02.3).(30416.03.3)
   import { sayErr }                                         from  './formr_utility-fns_u1.06.mjs'          // .(30417.03.3) 

   var  bQuiet    =  false    // it's global in this module
       var  aEnv      = '../../.env'
       var  aRemote_Host                                                                                    // .(30322.03.7 RAM Needs to be global to the IODD object)
       var  aAPI_Host                                                                                       // .(30322.03.8 RAM aAPI_Host is needed by setRoute)
//     var  pApp                                                                                            //#.(30328.03.4 RAM pAPP is needed by setRoute)
       var  nSay      =  0,  nSay2 = 1
       var  nCount    =  0

//  ------  ------------------  =   -------------------------------- ------------------ ------------------+

 async function  putData( pDB, aSQL, aDatasetName, pRes ) {                                                                                         // .(30407.03.1 Beg RAM Write function)
       var  mRecs         =  await putData_( pDB, aSQL, aDatasetName );
        if (pRes) { sndErr(  pRes, mRecs[1] );
            process.exit()
         } else {
    return  mRecs
            }
         }; // eof putData                                                                                                                          // .(30407.03.1 End)
//  ------  ------------------  =   -------------------------------- ------------------ ------------------+

 async function  putData_( pDB, aSQL, aDatasetName ) {                                                                                              // .(30403.05.1 Beg RAM Write function).(30407.03.2)
       var  aRecords      = `${ aDatasetName ? aDatasetName.replace( /^\//, "" ) : '' } record`
       var  aAction       =  aSQL.match( /INSERT/i ) ? 'inserted' : (aSQL.match( /DELETE/i ) ? 'deleted' : 'updated' )                              // .(30403.05.5 RAM Added deleted)
       try {
       var  mRecs         =  await pDB.execute( saySQL( aSQL, 'parse' ) );                                                                          // .(30413.01.1 RAM Parse SQL)
//     var  mColDefs      =  mCols.map( pRec => { return { Name: pRec.name, Type: pRec.type, Len: pRec.columnLength, Decs: pRec.decimals } } )
       var  nID           =  aSQL.match( /INSERT/i ) ? mRecs[0].insertId : 0, aRecords                                                              // .(30406.01.1 RAM Return InsertedId)

        if (aDatasetName) {  aRecords = `${aRecords}${ (mRecs[0].affectedRows == 1) ? '' : 's' } ${ nID ? `, ${nID}` : '' }` }                      // .(30406.01.2)
                 sayMsg( `${ saySQL( aSQL ) }\n     *  ${ `${mRecs[0].affectedRows}` } ${ aRecords  }, ${aAction}`.replace( /\n/g, '\n           ') );
    return  [ "success", `${ mRecs[0].affectedRows } ${ aRecords }, ${aAction}`, { affectedRows: mRecs[0].affectedRows , affectedId: nID } ]        // .(30406.01.3)
        } catch( pError ) {
                 sayErr(    `*** Error:  ${pError.message}.\n${   saySQL( aSQL, 31 ) }\n` );
    return  [ "error",          `Error:  ${pError.message}.  <br>
                                          &nbsp; &nbsp; &nbsp; ${ saySQL( aSQL     ) }` ]
            }
         }; // eof putData_                                                                                                                         // .(30403.05.1 End)
//  ------  ------------------  =   -------------------------------- ------------------ ------------------+

 async function  getData( pDB, aSQL, aDatasetName, pRes ) {                                                                                         // .(30407.03.3 Beg RAM Write function)
       var  mRecs         =  await getData_( pDB, aSQL, aDatasetName );
        if (mRecs[0] == 'error') {
        if (pRes) { sndErr( pRes, mRecs[1] );
//          process.exit()                                                                                                                          //#.(30511.02.1 RAM Don't abort).30407.03.x RAM I'd rather continue, but we've already sent an error)       
            return null                                                                                                                             // .(30511.02.2 RAM Return !mRecs)                                                               
            }                                                                                                                                       //#.(30410.03.2 RAM ?? )
         } else {
    return (mRecs[0] == 'nodata') ? [] : mRecs                                                                                                      // .(30407.03.4 RAM Return [] if no data)
            }
         }; // eof getData                                                                                                                          // .(30407.03.3 End)
//  ------  ------------------  =   -------------------------------- ------------------ ------------------+

 async function  getData_( pDB, aSQL, aDatasetName ) {                                                                                              // .(30402.05.17).(30407.03.5)
       var  aRecords   = `${ aDatasetName ? aDatasetName.replace( /^\//, "" ) : '' } record`                                                        // .(30402.05.20)
       try {
       var [mRecs, mCols] =  await pDB.execute( saySQL( aSQL, 'parse' ) );                                                                          // .(30413.01.2 RAM Parse SQL)
       var  mColDefs      =  mCols.map( pRec => { return { Name: pRec.name, Type: pRec.type, Len: pRec.columnLength, Decs: pRec.decimals } } )
        if (mRecs.length == 0) {
                 sayErr(    `*** NoData: No ${ aRecords }s returned.\n${ saySQL( aSQL, 31 ) }` );                                                   // .(30402.05.21).(30407.03.5)
    return  [ "nodata",         `NoData: No ${ aRecords }s returned.<br>                                                                            // .(30407.03.6)
                                                 &nbsp; &nbsp; &nbsp; ${ saySQL( aSQL     ) }` ] // .replace( /"/g, '\\"' ) ];                      // .(30328.04.2).(30402.05.11 RAM To be sent as HTML)
     } else { if (aDatasetName) {  var aRecords = `${aRecords}${ (mRecs.length == 1) ? '' : 's' }`                                                  // .(30402.05.18)
//                sayMsg( `${ saySQL( aSQL ) }\n       * ${ `${mRecs.length}`.padStart(3) } ${aRecords} found`.replace( /\n/g, '\n           ') ); } //#.(30402.05.19)
                  sayMsg( `${ saySQL( aSQL ) }\n     *  ${  `${mRecs.length}` } ${ aRecords       }, returned`.replace( /\n/g, '\n           ') ); } // .(30402.05.23)
    return  mRecs
            }
        } catch( pError ) {
                 sayErr(    `*** Error:  ${pError.message}.\n${   saySQL( aSQL, 31 ) }\n` );
    return  [ "error",          `Error:  ${pError.message}.  <br>
                                          &nbsp; &nbsp; &nbsp; ${ saySQL( aSQL     ) }` ] // .replace( /"/g, '\\"' ) ];                             // .(30328.04.2).(30402.05.12 RAM To be sent as HTML)
            }
         }; // eof getData
//  ------  ------------------  =   -------------------------------- ------------------ ------------------+

 async function  getHTML( aFile, aDivID ) {                                             // .(30401.02.1 Beg RAM Add function)

       var  pJSON     =  await fetchFile( aFile, false )                                // .(30402.02.1 RAM Use fetchFile)
        if (aDivID) {
       var  pDiv      =  $( `#${aDivID}` )
            pDiv.html(   pJSON.text )
//          traceR(     `setHTML[2]     Included HTML file, '${aFile}'`,  nSay2)        //#.(30402.05.1)
            sayMsg(     `HTML file, '${aFile}', included` )                             // .(30402.05.1)
        } else {
//          traceR(     `setHTML[3]     Retreived HTML file, '${aFile}'`, nSay2)        //#.(30402.05.2)
            sayMsg(     `HTML file, '${aFile}', retreived` )                            // .(30402.05.2)
    return  pJSON.text
            }
         }; // eof getHTML                                                              // .(30401.02.1 End)
//  ------  ------------------  =   -------------------------------- ------------------ ------------------+

 async function  getStyles( aFile, mStyles, aDivID ) {                                  // .(30402.02.2 Beg RAM Add function)
//     var {toCSS, toJSON} = await import( 'cssjson' );
//     var  toJSON     =  await import( 'cssjson' ).toJSON;
//     var  toJSON     =  await import( 'cssjson' ).toJSON;
//     var  cssjson    =  await import( 'cssjson' );
        if (typeof(cssjson) == 'undefined') { sayErr( "\n** Module, 'cssjson', not loaded\n" ); return "" }   // .(30415.04.1 RAM)

       var  toJSON     =  cssjson.toJSON;
       var  toCSS      =  cssjson.toCSS;
       var  nSay3      =  process.env.Log_Styles == true                                // .(30417.02.3)
     
       if (!Array.isArray(mStyles)) { aDivID = mStyles }
        if (aDivID) {
       var  pSheet     =  $( `#${aDivID}` )
            pSheet.setAttribute( 'href', `${aFile}` )
            traceR(      "getStyles[1]", "Included CSS file",          nSay3, aFile  )  //#.(30402.05.3)
            sayMsg(     ` CSS file,  '${aFile}', included` )                            // .(30402.05.3)
        } else {
            traceR(      "getStyles[2]", "Fetching StyleSheet",        nSay3, aFile  )  //#.(30402.05.4)
       var  aSheet     = (await fetchFile( aFile, false )).text
            traceR(      "getStyles[3]", "Fetched: aSheet",            nSay3, aSheet )  //#.(30402.05.4)
       if (mStyles.length == 0) { return  aSheet }                                      // .(30420.04.1 RAM Opps.)  
       var  pJSON      =  toJSON( aSheet ), pStyles = {}, aCSS = ''                     // .(30415.04.2)
            traceR(      "getStyles[4]", "Convered aSheet into pJSON", nSay3, pJSON  )  //#.(30402.05.4)
//          pJSON.children['*'].attributes
//          pJSON.children['login'].attributes
//          pJSON.children['login form'].attributes
//          pJSON.children['.login form input[type="password"], .login form input[type="text"]'].attributes

//     var  aStyles   =  indexObj( pStyles.children, mStyles )
//          mStyles.forEach( aStyle => { pStyles[ aStyle ] =  pJSON.children[aStyle].attributes } )
//          pStyles   =   pJSON 

            mStyles.forEach( aStyle => { 
                if (pJSON.children[aStyle]) {                                           // .(30420.02.1 RAM Check if style exists)
                    pStyles[ aStyle ] = pJSON.children[aStyle]                          //   .children and .attributes
                } else {                                                                // .(30420.02.2 Beg) 
                    traceR(      "getStyles[5]", `** Style, '${aStyle}', not found`, 1 )   
                    }                                                                   // .(30420.02.2 End)
                } )
            pStyles   = { children: pStyles, attributes: { } }
        var aFound    =`${Object.keys( pStyles.children ).length} of ${mStyles.length}` // .(30420.02.3)
            traceR(      "getStyles[5]", `Selected ${aFound} mStyles from pJSON into pStyles`, nSay3, pStyles )  //#.(30402.05.4)
    try {                                                                               // .(30415.04.3)
            traceR(      "getStyles[6]", "Converting pStyles to aCSS", nSay3 )          //#.(30402.05.4)
       var  aCSS      =   toCSS( pStyles )
            traceR(      "getStyles[7]", "Converted: aCSS", nSay3, aCSS )
            sayMsg(      `CSS file,  '${aFile}', retreived` )                           // .(30402.05.4)
        } catch(pErr) {  sayErr( `\n** CSS file,  '${aFile}', failed to load.${ `\n${pErr.message}`.replace( /\n/g, `${ "\n".padEnd(20) }** ` ) }` )  // .(30415.04.4)
            traceR(      "getStyles[8]", "** Failed to convert pStyles", nSay3 ) }
    return  aCSS
            } // eif fetch CSS file
         }; // eof getStyles                                                            // .(30402.02.2 End)
//  ------  ------------------  =   -------------------------------- ------------------ ------------------+

 async  function  getJSON( aFile ) {                                                    // .(30402.02.3 Beg RAM Add function)
       var  pJSON     =  await fetchFile( aFile, false )
//          traceR(     `getJSON[1]     Retreived JSON '${aFile}'`, nSay2)              //#.(30402.05.5)
            sayMsg(     `JSON file, '${aFile}', retreived` )                            // .(30402.05.5)
    return  pJSON
         }; // eof getJSON                                                              // .(30402.02.3 End)
//  ------  ------------------  =   -------------------------------- ------------------ ------------------+

  function  saySQL( aSQL, nFill ) {                                                                         // .(30328.04.3 Beg RAM Add)
       var  nSQL = 'SQL';  aSQL = aSQL.replace( /[\/-]{2}.*/g, '' )                                         // .(30413.01.3 RAM Remove comments: // or -- )
        if (aSQL.match( /^ *SQL[0-9]+/)) {
       var  nSQL = aSQL.match( /^ *(SQL[0-9]+)/ )[1]
            aSQL = aSQL.replace( new RegExp( `${nSQL}[ :\n]+` ), '' )
            }
        if (nFill == 'parse') { return aSQL }                                                               // .(30413.01.4 End)
       var  aFill = `\n`.padEnd( nFill ? nFill + 6 : 6 ); aSQL = aSQL.replace( /^ +/, "" )                  // .(30402.05.22 RAM Remove leading spaces)
//     var  aStr  = (aSQL || '').replace( /\n           /g, aFill ).replace( /^[\n]+/, '' ).replace( /[ \n]+$/, '' )
       var  aStr  = (aSQL || '').replace( /\n         /g,   aFill ).replace( /^[\n]+/, '' ).replace( /[ \n]+$/, '' )
//  return `${aFill.substring(6)}${aStr}`                                                                   //#.(30413.01.5)
    return `${nSQL}: ${aFill.substring(6)}${aStr}`                                                          // .(30413.01.5)
         }; // eof saySQL                                                                                   // .(30328.04.3 End)
//  ------  ------------------  =   -------------------------------- ------------------ ------------------+

//function  setRoute(  pApp, aMethod,  aRoute_, onRoute,  pValidArgs_, fmtSQL_ ) {                          //#.(30328.03.1 RAM Move to this script).(30328.03.5 RAM Need onRoute too).(30401.02.1)
  function  setRoute(  pApp, aMethod,  aRoute_, onRoute_, pValidArgs_, fmtSQL_ ) {                          // .(30401.02.1 RAM Rework it a bit)

       var  aRoute     = `${aAPI_Host}${aRoute_}`
      var { pValidArgs, fmtSQL } = chkSQLargs( pValidArgs_, fmtSQL_ )                                       // .(30328.05.1 RAM Use chkArgs4SQL)

                           async function onRoute( pReq, pRes )    { onRoute_( aMethod, pReq, pRes, aRoute_, pValidArgs, fmtSQL ) } // .(40405.02.1 Use Original route)
//                                        async  ( pReq, pRes ) => { onRoute_( aMethod, pReq, pRes, aRoute,  pValidArgs, fmtSQL ) } //#.(40405.02.1)
    switch (aMethod) {
//    case 'get'   : pApp.get(    aRoute, async  ( pReq, pRes ) => { onRoute ( aMethod, pReq, pRes, aRoute, pValidArgs, fmtSQL ) } ); break
      case 'get'   : pApp.get(    aRoute, onRoute ); break
      case 'post'  : pApp.post(   aRoute, onRoute ); break
      case 'put'   : pApp.put(    aRoute, onRoute ); break
      case 'delete': pApp.delete( aRoute, onRoute ); break
//    case 'patch' : pApp.patch(  aRoute, xController ); break
        default    : null
            }
            sayMsg( aMethod, `${aAPI_Host}${aRoute_}` )                                                     // .(30414.02.1 RAM Add ${aAPI_Host})
            } // eof setRoute
//  ------  ------------------  =   -------------------------------- ------------------ ------------------+

  function chkSQLargs( pValidArgs, fmtSQL_) {                                                               // .(30328.05.2 Beg RAM Write chkSQLargs)
      var  fmtSQL      = (typeof(fmtSQL_) != 'undefined') ? fmtSQL_ : '' // pValidArgs || ''
           pValidArgs  =  pValidArgs ? pValidArgs : { }
       if (typeof(fmtSQL) == 'object' || typeof(pValidArgs) == 'function') {                                // .(30328.02.3 Beg RAM Switch if object)
           fmtSQL      =  typeof(pValidArgs) != 'object' ? pValidArgs : ''
           pValidArgs  =  fmtSQL_ || { id : /[0-9]+/ }                                                      // .(30328.02.3 End)
           }
       if (typeof(pValidArgs) == 'string') { fmtSQL = pValidArgs; pValidArgs = { } }
//         console.log( `pValidArgs: ${ inspect( pValidArgs, { depth: 99 } ) }, fmtSQL: '${ inspect(fmtSQL, {depth:99})}'` )
           pValidArgs = (Object.keys( pValidArgs ).length > 0) ? pValidArgs : { id: /[0-9]+/ }              // .(30403.06.1 RAM Add default ?? )
  return { pValidArgs: pValidArgs, fmtSQL : fmtSQL }                                                        // .(30328.05.4 RAM Opps)

         }; // eof chkSQLArgs                                                                               // .(30328.05.2 End)
//  ------  ------------------  =   -------------------------------- ------------------ ------------------+

  function chkSQL( fmtSQL, pArgs ) {                                                                        // .(30403.06.4 RAM Beg Write chkSQL )
     try {                                                                                                  // .(30511.02.3 RAM If fmtSQL bombs)
       var aSQL      =  typeof( fmtSQL ) == 'string'  ? fmtSQL : fmtSQL( pArgs )
     } catch( pErr ) {  sayMsg( "*** fmtSQL: Error"); return '' }                                            // .(30511.02.4 RAM Return ""?)
       if (pArgs.id) {                                                                                      // .(30511.02.5 RAM Add to id = pArgs.id, if ...)
           aSQL      =  aSQL.match( /id *=/i ) ? aSQL                                                       // .(30403.06.2 RAM Kludge: Don't add if present)
                     : `${aSQL} ${ aSQL.match( /WHERE/i ) ? 'AND' : 'WHERE' } id = ${pArgs.id}` }           // .(30408.01.1 RAM Check if WHERE exists)
    return aSQL
           }                                                                                                // .(30403.06.4 End)
//  ------  ------------------  =   -------------------------------- ------------------ ------------------+

//function  sndRecs( pRes, mRecs, aSQL, aDatasetName, aOnRouteFnc ) {                                       // .(30331.01.3).(30407.03.x)
  function  sndRecs( mRecs, aSQL, aDatasetName, pRes, aOnRouteFnc ) {                                       // .(30407.03.x)
       var  aRecords   = (aDatasetName ? aDatasetName.replace( /^\//, "" ) + " " : "" ) + 'records'
        if (String(mRecs[0]).match(/error/ )) {
            aJSON      =                 `{ "error": \`${ mRecs[1].replace( /[ \n]+$/, '' ) }\` }`
        } else {
        if (mRecs.length > 0 || pRes.bSndNoData) {
            aRecords   = (mRecs.length != 1) ? aRecords : aRecords.replace( /s$/, "" ).replace(  /ies$/, 'y' )                            // .(30402.05.25)
 //                       sayMsg( `${ saySQL( aSQL    ) }\n       * ${ `${mRecs.length}`.padStart(3) } ${aRecords} found`.replace( /\n/g, '\n           ') ); //#.(30328.04.4).(30402.05.24)
     // //  ??            sayMsg( `${ saySQL( aSQL    ) }\n     *  ${  `${mRecs.length}` } ${  aRecords      }, returned`.replace( /\n/g, '\n           ') ); // .(30328.04.4).(30402.05.24)
//     var  pRecs      =  mRecs; if (aDatasetName) { pRecs = {}; pRecs[aRecords]     = mRecs }              //#.(30404.01.2)
       var  pRecs      =  mRecs; if (aDatasetName) { pRecs = {}; pRecs[aDatasetName.replace( /^\//, "" )] = mRecs }  // .(30404.01.2 RAM Use aDatasetName, not Records)
       var  aJSON      =  fmtJSON( pRecs, aSQL )
//                        sayMsg( `Handler,   '${aOnRouteFnc ? aOnRouteFnc : 'routeHandler'}', executed` ); // .(30331.01.4)
        } else {
//                        sayErr( `${ saySQL( aSQL    ) }\n ** No ${aRecords} found` );                     // .(30328.04.6).(30402.05.15 RAM Not the same as GetData).(30407.03.x RAM Now done in getData)
       var  aJSON      =  JSON.stringify( {  "warning":   ` ** No ${aRecords} found` } )                    // .(30402.05.16)
         }  }
//      if (pRes) {       sndJSON( pRes, aJSON, aRecords ) }                                                // .(30407.03.x RAM getData may not pass pRes )
                          sayMsg( `Handler,   '${aOnRouteFnc ? aOnRouteFnc : 'routeHandler'}', executed` ); // .(30331.01.4)
                          sndJSON( pRes, aJSON, aRecords )                                                  // .(30407.03.x RAM getData nice try, need to send []  )
         }; // eof sndRecs
//  ------  ------------------  =   -------------------------------- ------------------ ------------------+

  function  sndFile( pRes, aFile, aDatasetName, aOnRouteFnc ) {                                             // .(30403.04.1 Beg RAM Write function)
       try {
//                        pRes.sendFile( `${__dirname}/../../${aFile.replace( /^\.\//, '' )}` )
//                        pRes.sendFile( `/../../${aFile.replace( /^\.\//, '' )}` )
                          pRes.sendFile(  aFile.replace( /^\.\//, '' ), { root: __appDir } )                // .(30416.02.3).(30416.03.4 RAM Was: `${__dirname}/../../`)
                          sayMsg( `Handler,    '${aOnRouteFnc ? aOnRouteFnc : 'routeHandler'}', executed` );
                          sayMsg( `File,       '${ aFile }', sent` );
        } catch( pErr ) {  aMsg = `File: '${ aFile }'\n  *** Error: ${pError.message}`                      // 'Forbidden' not caught
                          sayErr(  aMsg );
    return           `{ "error": ${aMsg} }` }
         }; // eof fmtJSON                                                                                  // .(30403.04.1 End)
//  ------  ------------------  =   -------------------------------- ------------------ ------------------+

  function  fmtJSON( pJSON, aSQL ) {
       try {
    return  JSON.stringify( pJSON )
        } catch( pError ) {
                         sayErr( `${ aSQL ? aSQL + '\n' : '' }*** Error: ${pError.message}` );
    return                                      `{ "error": \`*** Error: ${pError.message}\` }`
            }
         }; // eof fmtJSON
//  ------  ------------------  =   -------------------------------- ------------------ ------------------+

  function  sndJSON( pRes, aJSON, aDatasetName ) {
            pRes.setHeader( 'Content-Type', 'application/json' );
        if (typeof(aJSON) == 'object') { aJSON = JSON.stringify( aJSON ) }                                  // .(30424.09.x)                                      
            pRes.send(  aJSON )
            pRes.end();
        if (aJSON.match( /{ "error": /)) { return }
        if (aDatasetName) { sayMsg( `JSON ${aDatasetName}, sent\n` ) }

         }; // eof sndJSON
//  ------  ------------------  =   -------------------------------- ------------------ ------------------+

  function  chkArgs( pReq, pRes, pValidArgs ) {
         if (Object.keys( pReq.body).length == 0 && pReq.method != 'GET') {                                 // .(30424.09.x RAM Beg)                      
                          sndErr( pRes, '** Request Body/Query is empty' )
                          sayErr(       '** Request Body/Query is empty\n' )                                // .(30402.05.7)
    return  null       
            }                                                                                               // .(30429.09.x End)                       
       var  pArgs_ = { ...pReq.body, ...pReq.query }, mErrArgs = []                                         // .(30403.02.3 RAM pReq.query overrides pReq.body)
       if (!pValidArgs) {
    return  pArgs // pReq.query                                                                             // .(30318.01.1 RAM S.It.B {} ??).(30403.02.4)
       } else {
//     var  mArgs      =  Object.keys( pReq.query ).map( aKey => { return [ aKey, pReq.query[aKey] ] } )    //#.(30403.02.5)
       var  pArgs = {};   Object.keys( pArgs_ ).map( aKey => { pArgs[ aKey.trim() ] = pArgs_[aKey].trim()}) // .(30403.07.1 RAM Trim pArgs).(30424.09.x pArgs S.b. {}, not [] )

       var  mArgs      =  Object.keys( pArgs  ).map( aKey => { return [ aKey, pArgs[aKey]      ] } )        // .(30403.02.5)
        if (mArgs.length > 0) {
            mErrArgs   =  mArgs.filter( chkArg )
        } else {
            mErrArgs   =  pValidArgs.required ? [ [ 'Required', 'yes' ] ] : [ ]                             // .(30403.02.5 RAM Are any args required? What if not. fmtSQL must handle it) 
         }  }
        if (mErrArgs.length == 0) {
    return  pArgs                   // pReq.query; all? or nothing; could be {} if no args given                     // .(30403.02.6)
            }
                          sndErr( pRes, `** Invalid Arguments`,    mErrArgs.map( mArg => fmtArg( mArg ) ) )          // .(30425.01.1 RAM Add fmtArg)
       var  aMsg       =                `** Invalid Arguments: '${ mErrArgs.map( mArg => fmtArg( mArg ) ).join() }'` // .(30402.05.6).(30425.01.2)
                          sayErr( `${aMsg}\n` )                                                                      // .(30402.05.7)
    return  null
//          ----------------------------------

  function  fmtArg( mArg ) {                                                                                // .(30425.01.3 RAM Beg Write fmtArg)
            mArg[1] = `"${mArg[1]}"`
    return  mArg.join(' = ') 
            }                                                                                               // .(30425.01.3 End)

  function  chkArg( mArg ) {
       var  rTestVals  =  pValidArgs[ mArg[0] ], bOk = false                                                // .(30403.07.1 RAM Add trim)
        if (rTestVals !=  null) {
       var  bOk        =  rTestVals.test( mArg[1] )                                                         // .(30403.07.2)
            pReq.query[   mArg[0].toLowerCase() ] =  mArg[1]                                                // .(30403.07.3).(30328.04.1 RAM Put bak in to pReq.query??)
            }
    return  bOk ? false : true

            } // eof chkArg
//          ----------------------------------
         }; // eof chkArgs
//  ------  ------------------  =   -------------------------------- ------------------ ------------------+

  function  fmtArgs( pArgs ) {
       var  mArgs =  Object.keys( pArgs ).map( aKey => { return [ aKey, pArgs[ aKey ] ] } )
       var  aArgs = (mArgs.length == 0) ? '' : '/' + mArgs.map( mArg => mArg.join('=') ).join()
    return  aArgs

         }; // eof fmtArgs
//  ------  ------------------  =   -------------------------------- ------------------ ------------------+

  function  sndHTML( pRes, aHTML, aURI, aOnRouteFnc ) {                                                     // .(30331.01.4)
                          sayMsg( `Handler,   '${aOnRouteFnc ? aOnRouteFnc : 'onRoute'}', executed` );      // .(30331.01.6)
                          pRes.send( aHTML )
        if (typeof(aURI) != 'undefined') {                                                                  // .(30414.03.1).(30415.02.1)
                          sayMsg( `HTML Page, '${aAPI_Host}${aURI}', sent\n` ) }                            // .(30415.03.1)                

         }; // eof sndHTML
//  ------  ------------------  =   -------------------------------- ------------------ ------------------+

  function  setErr( pApp, aMsg, s ) {

       pApp.use( '*', function( pReq, pRes ) {
                          sndErr(  pRes, `${aMsg}`,  [ pReq.baseUrl ] )
                          sayErr(        `${aMsg}: '${ pReq.baseUrl }'\n` )                                 // .(30402.05.8 RAM Add).(30414.02.1 RAM Added baseUrl)
            } )
                          sayMsg( `${aMsg}${ s || '' }, set` )
         }; // eof setErr
//  ------  ------------------  =   -------------------------------- ------------------ ------------------+

  function  sndErr( pRes, aMsg, mItems ) {
//          pRes.setHeader( 'Content-Type', 'text/html' );                                                  // .(30424.09.x RAM ??? Should it be json?)
//     var  aItems     =  mItems ? ( mItems.length > 0 ? `, '${ mItems.join(    ) }'` : "") : ""
       var  aItems     =  mItems ? ( mItems.length > 0 ? `, ${ mItems.join( ', ') }`  : "") : ""; aMsg = aMsg.replace( /[: ]$/, "" )  // .(30511.02.6 RAM ?? Trailing :)
        if (pRes.req.headers['accept'] == 'application/json') {                                             // .(30424.09.x)      
                          sndJSON( pRes, { error: `${aMsg}: ${aItems.substring(2)}` } )                 // .(30424.09.x)      
       } else {                                                                                             // .(30424.09.x)      
                          pRes.send(     `<h3>${aMsg}: ${ aItems.substring(2).replace( /""/g, '"' ) }</h3>` )
//                        sayErr( `${aMsg}\n` )                                                             //#.(30402.05.9 RAM Remove)
            }                                                                                               // .(30424.09.x)      
         }; // eof sndErr
//  ------  ------------------  =   -------------------------------- ------------------ ------------------+
/*
  function  sayErr( aMsg ) {                                                                                //#.(30417.03.4)

        var aTS       =  (new Date).toISOString().replace( /[Z:-]/g, '' ).replace( /T/, '.' ).substring(2)
        var aCR        =  aMsg.match( /^[ \n]+/ ) ? "\n" : ""; aMsg = aMsg.replace( /^[\n]+/, "" )          // .(30416.01.1)
            console.log( `${aCR}${aTS}  ${aMsg}` )  
//          console.trace()                                                        // .(30416.01.2)

         }; // eof sayErr
//  ------  ------------------  =   -------------------------------- ------------------ ------------------+
*/
  function  sayMsg( pReq, aMethod, aRoute ) {
        if (bQuiet) { return }

       if (typeof(aRoute) == 'undefined') { aRoute = aMethod; aMethod = pReq; pReq = null }                 // .(30414.03.3 RAM It could be '').(30415.02.2)

        if (pReq) {
            pReq.args  =  fmtArgs( pReq.query )  // save for ending sayMsg
       var  aMsg       = `${ aMethod.toUpperCase() } Route, '${aAPI_Host}${aRoute}`                         // .(30415.03.2)
            aMsg       = `${aMsg}${pReq.args}', recieved`
        } else {
       var  aMsg       = `${ aMethod.toUpperCase() } Route, '${aRoute}'`                                    // .(30415.03.3 RAM aRoute, set has ${aAPI_Host}) 
            aMsg       =  typeof(aRoute) != 'undefined' ? `${aMsg}', set` : aMethod                         // .(30414.03.1 RAM aMethod == aMsg if aRoute is not defined
            }
        var aTS        = (new Date).toISOString().replace( /[Z:-]/g, '' ).replace( /T/, '.' ).substring(2)
        var aCR        =  aMsg.match( /^[ \n]+/ ) ? "\n" : ""; aMsg = aMsg.replace( /^[\n]+/, "" )          // .(30416.01.3)
            console.log( `${aCR}${aTS}  ${aMsg}` )                                                          // .(30416.01.4)

         }; // eof sayMsg
//  ------  ------------------  =   -------------------------------- ------------------ ------------------+

  function  indexObj( pObj, mItems ) {                                                                      // .(30402.03.1 Beg RAM Add)
//      var pOut = {}, i, n = Array.isArray( mItems ) ? mItems.length : 0; if (!n) { return pObj }
       if (!Array.isArray( mItems )) { return pObj }; var pOut = {}, n = mItems.length, i
       for (i = 0; i < n; i++) { pOut[ mItems[i] ] = pObj[ mItems[i] ]; }
    return  pOut;

         }; // eof indexObj                                                                                 // .(30402.03.1 End)
//  ------  ------------------  =   -------------------------------- ------------------ ------------------+


   function init( pApp, pDB_Config, bQuiet_, aAPI_ ) {                                                      // .(30410.03.3 RAM async).(30412.02.1)

            pApp.use( cors( { origin: '*' } ) );
            pApp.use( express.urlencoded( { extended: true  } ) )                                            // .(30403.02.2 RAM Needed for form body vars)
//          pApp.use( express.urlencoded( { extended: false } ) )                                            // .(30424.09.1 RAM Set to false)
            pApp.use( express.json() );                                                                      // .(30424.09.2 RAM Instead of bodyParser.json() )
            
//          ---------  =  ----------------------------------------------------------

       var  aEnv_Dir   =  __appDir; // `${__dirname}/../..`                                                 // .(30322.03.1 Beg RAM Set different var).(30416.03.5)

//          process.env=  await getEnv( `${aEnv_Dir}/.env` )                                                // .(30222.01.2 RAM Get it myself).(30322.03.1 End).(30410.03.4 RAM await)
            process.env=  getEnv_sync( `${aEnv_Dir}/.env` ); var pEnv = process.env                         // .(30222.01.2 RAM Get it myself).(30322.03.1 End).(30412.01.9 RAM no await)

            bQuiet     =  setVar1( 'Quiet', bQuiet_, true )   // Override value in .env
            bQuiet     =  bQuiet ?  true :  false;            // console.log( `bQuiet:        ${bQuiet}`   );  process.exit()

                          setVar2( 'DB_Host',     '45.32.219.12', 'host' )                                  // Look in pDB_Config too
                          setVar2( 'DB_User',     'nimdas'      , 'user' )
                          setVar2( 'DB_Password', 'FormR!1234'  , 'password' )
                          setVar2( 'DB_Database', 'iodd'        , 'database' )                              // .(30320.06.1 RAM Opps )

//          pDB  =  await mysql.createPool( pDB_Config ? pDB_Config : pDB_Config )
       var  pDB        =  mysql.createPool( pDB_Config )                                                    //

                          console.log( "" )
                          sayMsg( `USE Database: '${ pDB_Config.database }'` )                              // .(30323.03.1)

//          ---------  =  ----------------------------------------------------------

        pEnv.API_URL   =  aAPI_ ? aAPI_ : pEnv.API_URL;                                                     // .(30412.02.2)
//     var  aAPI_URL   =  setVar1( 'API_URL',     '/api2' );                     // console.log( `aAPI_URL:     '${aAPI_URL}'`     ); // process.exit() // .(30410.03.5)
//     var  aAPI_URL   =  await setAPI_URL( process.env )                                                  // .(30410.04.2 Use it).(30410.04.9 RAM Add pEnv arg)
//     var  aAPI_URL   =        setAPI_URL( process.env )                                                  // .(30410.04.2 Use it).(30410.04.9 RAM Add pEnv arg).(30412.02.3 RAM Can't be a promise)
       var  aAPI_URL   = `${pEnv.Host_Location == 'remote'                                                 // .(30412.02.4)
                       ? `/${pEnv.API_URL.replace( /^\//, '' )}`
                       : `${pEnv.Local_Host}:${pEnv.Server_Port}` }`

//          console.log( `aAPI: ${aAPI}, argv0: '${process.argv[1]}'`);

                          setVar1( 'Server_Port',  3000 )                        // console.log( `Server_Port:  '${process.env.Server_Port}'` ); // Look in process.env only
                          setVar1( 'Remote_Host', 'https:/iodd.com'  );          // console.log( `aRemote_Host: '${aRemote_Host}'` ); //#.(30322.03.2 RAM I-Yi-Yai?).(30410.03.6 RAM Just set it)
//          aAPI_Host  = (aOS != 'windows'              ) ? aAPI_URL : ''        // console.log( `aAPI_Host:    '${aAPI_Host}'`    ); //#.(30322.03.3 RAM Make it global)
            aAPI_Host  = (pEnv.Host_Location == 'remote') ? aAPI_URL : ''                                                             // .(30412.02.5)
//          aAPI_Host  =  aAPI_ ? `/${aAPI_.replace( /^\//, '' )}` : aAPI_URL;   // console.log( `aAPI_Host:    '${aAPI_Host}'`    ); //#.(30410.03.7 RAM ??? ).(30412.02.5)
                          process.env.API_Host = aAPI_Host                                                                            // .(30412.02.6)

//          ---------  =  ----------------------------------------------------------

       return { pDB_: pDB, aAPI_Host_: aAPI_Host, bQuiet_: bQuiet }                                         // .(30322.03.4

   function setVar2( aVar2, aVal,   aVar1 ) { //  aVar2 in process.env, aVar1 in pDB_Config
            aVar1 = aVar1 ? aVar1 : aVar2     // .toUpperCase(); // case is important
            pDB_Config[aVar1] = typeof(pDB_Config[ aVar1 ]) != 'undefined' ? pDB_Config[ aVar1 ]  : process.env[aVar2]  // .(30323.05.1 RAM pDB_Config, set in code, takes precedence)
            pDB_Config[aVar1] = typeof(pDB_Config[ aVar1 ]) != 'undefined' ? pDB_Config[ aVar1 ]  : ( typeof( aVal ) != 'undefined' ? aVal : null )  // .(30322.06.1)
     return pDB_Config[aVar1]
            }

   function setVar1( aVar2, aVal, bSw) {
        if (bSw) { return typeof(aVal) != 'undefined' ? aVal : process.env[aVar2] || '' }
     return typeof(process.env[aVar2]) != 'undefined' ? process.env[aVar2] : ( typeof( aVal ) != 'undefined' ? aVal : null )  // .(30322.06.2)
            }
         }; // eof init
//  ------  ------------------  =   -------------------------------- ------------------ ------------------+

// function start( pApp, nPort, aAPI_Host ) {     // must be last
   function start( pApp, nPort            ) {                                                               // .(30412.02.7 RAM Remove aAPI_Host)

       var  nPort      =  nPort ? nPort : process.env.Server_Port                                           // .(30312.02.1 RAM Set nPort for FRApps/server3/s36_mysql-data-api )
       var  aRemote_Host= process.env.Remote_Host                                                           // .(30322.03.2 RAM I-Yi-Yai?).(30410.03.8)
       var  aAPI_Host  =  process.env.API_Host                                                              // .(30412.02.8 RAM Or aAPI_URL)

            pApp.get(    '/favicon.*', function( pReq, pRes ) {
                          pRes.sendFile( `${__dirname}/${pReq.url}` ) } )                                   // .(30318.01.1 RAM Or else it's a bad route)
                 setErr(  pApp, 'Bad Route', 's' ) // Other Uses?

            pApp.listen( nPort );                                                                           // .(30213.02.2 RAM Change real port from 3000 to 3002).(30213.02.4)
        if (aAPI_Host == '') {                                                                              // .(30214.03.11)
            console.log( `\n    Server is running at: http://localhost:${nPort}` )                          // .(30213.02.1 Change port from 3000 to 3002).(30213.02.5)
        } else {                                                                                            // .(30214.03.12 Beg)
            console.log( `\n    Server is running at: ${ aRemote_Host }${aAPI_Host} -> port:${nPort}` )     // .(30322.03.5)
            }                                                                                               // .(30214.03.12 End)
//     var  __filepath =  process.argv[1]                                                                   //#.(30315.01.1)
       var  __filepath =  new Error().stack.match( /IODD-Server_u.+\.mjs/ )[0]                              // .(30315.01.1 RAM get correct running server file)
//     var  __filepath =  new Error().stack.match( /C:.+api\/IODD-Server_u.+\.mjs/ )[0]                     //#.(30315.01.2)  
            __filepath = `${__dirname.replace( /assets\/mjs/, "" )}/${__filepath }`                         // .(30315.01.2)  
            console.log(   `    Server is running in: ${__filepath}\n` )                                    // .(30214.03.10 RAM Display root dir).(30315.01.3)

       var  bLocal     =  aAPI_Host == '', aLocation = ''                                                   // .(30315.02.1 RAM Beg Check if running locally)
        if (aOS == 'windows' && !bLocal) {  aLocation = 'local'  }
        if (aOS == 'linux'   &&  bLocal) {  aLocation = 'remote' } 
        if (aLocation) {
            console.log( `*** Server is running in ${aOS}. Should the .env.Host_Location be set to: ${aLocation}?\n`)
//          process.exit() 
            }                                                                                               // .(30315.02.1 End)

         }; // eof start
//--------  ------------------  =   -------------------------------- ------------------ ------------------+

//function  getEnv( aFile, bNewOnly ) {                                                                     //#.(30410.02.2 moved to formr_utility-fns_u1.06.mjs)

//  ------  ------------------  =   -------------------------------- ------------------ ------------------+
/*
async  function  readFile( aFile, bJSON ) {
       var  bNode = (typeof(process) != 'undefined')

        if (bNode) {       // in NodeJS
        if (aFile.match( /^(http|local|127)/ )) {
       var  pResponse  =   await node_fetch( `${aFile}` );
    return  await (bJSON ? pResponse.json() : pResponse.text() )
        } else {           // eif remote file
       var  aResponse  =   node_readFile( `${__dirname }${aFile}`, 'ASCII' );
    return (bJSON ? aResponse : JSON.parse( aResponse )
            }              // eif local file

        } else {           // in browser
       var  aPath      =   window.location.href.replace( /[^\/]+$/, '')
       var  pResponse  =   await node_fetch( `${aPath}${aFile}` );
    return  await (bJSON ? pResponse.json() : pResponse.text() )
            }
//  ------  ------------------  =   -------------------------------- ------------------ ------------------+
*/

 // browser:  var  aJSON  =  await (await fetch(         `localhost:3000/${aPath}${aFile}`      )).response.json();
 // browser:  var  aText  =  await (await fetch(         `host.domain.tld:3000${aPath}${aFile}` )).response.text();
 // Node:     var  aText  =  await (await node_fetch(    `localhost:3000/${aPath}${aFile}``     )).response.text();
 // Node:     var  aText  =  await (await node_fetch(    `host.domain.tld:3000${aPath}${aFile}` )).response.text();
 // Node:     var  aText  =               node_readFile( `${aPath}${aFile}` )

//  async function fetchJSON( aURL ) {                                                  //#.(30402.01.1)
    async function fetchFile( aURL, bJSON ) {                                           // .(30402.01.1 RAM Rename and add bJSON)
//           if (typeof(document) != 'object' && aURL.match( /http/i )) {
//          var  fetch3         = (...args) => import( 'node-fetch-v3' ).then( ( { default: fetch } ) => fetch( ...args ) );
//          var  fetch3         =             require( 'node-fetch-v2' );
//               }
//               browser   ./assets        fetch
//               browser    http://        fetch
//               node      ./assets        fs/promises
//               node       http://        node-fetch-v3

//       ------  -------------  =  ----------------------------------------

        if (typeof( document ) == 'object') {   // browser
            try {
            var  pResponse      =  await  fetch( aURL )
             } catch( pErr ) {     return onError( pErrr, pResponse ) }
/*          var  pResponse      =  await fetch( aURL, {
                     mode       : 'no-cors',
                     method     : "get"
                     } ) */
        } else { // ----------  =  ------------------------------

             if (aURL.match( /^(http|localhost|127\.0)/i )) {     // node http://       // .(30402.01.2 RAM Add localhost and 127.0.0.1)
            try {
            var  fetch3         =  typeof( fetch )  != 'undefined' ? fetch
                                : (...args) => import( 'node-fetch-v3' ).then( ( { default: fetch } ) => fetch( ...args ) );
            var  pResponse      =  await  fetch3( aURL )
             } catch( pErr ) {     return onError( pErrr, pResponse ) }
                 }
              }
//         ----  -------------  =  ------------------------------
//       ------  -------------  =  ----------------------------------------

//    if (typeof( document ) == 'object' || aURL.match( /http/i )) {
        if (pResponse) {                          // browser  or  node http://

        if (bJSON) {                                                                    // .(30402.01.3 RAM)
      try {
            var  pJSON          =  await pResponse.json( )
        } catch( pErr ) {          return onError( pErr, pResponse ) }

        } else {
            var  pJSON          =  { }; pJSON.text = await pResponse.text( )
                 } // eif text
//         ----  -------------  =  ------------------------------
         return  pJSON
//       ------  -------------  =  ----------------------------------------

        } else { // ----------  =  ----------   // node local file

            var  pFS            =  await import( 'fs/promises' )
//          var  aJSON          =  await pFS.readFile( aURL, 'ASCII' )
//          var  pJSON          =  JSON.parse( aJSON )
//          var  pJSON          =  JSON.parse( '{}' )
//          var  pJSON          =  JSON.parse( await pFS.readFile( new URL( aURL, import.meta.url) ) )
            var  aFile          =  aURL.match( /^(C:)*[/\\]/) ? aURL : `${__dirname}/${aURL}`
                 aFile          =  aFile.replace(   /\/\.\//, '/' )
//          var  aJSON          =  pFS.readFileSync( `${aFile}`, "ASCII" )
//          var  aJSON          =  pFS.readFileSync( `${aFile}`, "UTF8"  )
            try {
            var  aText          =  await pFS.readFile( aFile, "UTF8" )
             if (pJSON) {
            var  pJSON          =  JSON.parse( aText )
             } else {
//               pJSON     =  {};  pJSON.text = aText
            var  pJSON          =     { text:  aText }
                 }
             } catch( pErr ) {     return onError( pErr, { status: 404, url: aFile } ) }

//         ----  -------------  =  ------------------------------
         return  pJSON
//       ------  -------------  =  ----------------------------------------
                 } // eif Node && local file
//       ------  -------------  =  ----------------------------------------

  function onError( pErr, pResponse ) {
             if (pResponse && pResponse.status == 404) {
                 pErr.message   =  `Bad URL: '${pResponse.url}'`
                 }
                 console.trace();  traceR( 'onError[1]', `*** Invalid JSON file.\n    Error: ${pErr.message}`, 1 )
                                   sayErr(    `*** Invalid JSON file.${ `\nError: ${ pErr.message }`.replace( /\n/g, `${'\n'.padEnd( 20 )}*** ` ) }` )
          return pJSON          = { "error": ` *** Invalid JSON file. Error: ${pErr.message}` }
                 }
//       ------  -------------  =  ----------------------------------------
         }; // eof fetchFile                                                            // .(30402.01.1 End)
//  ------  ------------------  =   -------------------------------- ------------------ ------------------+

   export { putData, getData,   sndRecs,  fmtJSON,  sndJSON,  chkArgs,  fmtArgs }               // .(30403.05.2 RAM Add putData)
   export { sndHTML, sndErr,    setErr,   setRoute, sayMsg,   init,     start,  traceR }        // .(30328.03.2).(30416.02.4 RAM Add traceR)
   export { getHTML, getStyles, getJSON,  sndFile,  indexObj, chkSQL, __dirname , __appDir}     // .(30402.02.4 RAM).(30402.03.2).(30403.04.1).(30403.06.5).(30410.01.x).(30416.03.6)

//  --------------------------  =   -------------------------------- ------------------ ------------------+ --------------------------
