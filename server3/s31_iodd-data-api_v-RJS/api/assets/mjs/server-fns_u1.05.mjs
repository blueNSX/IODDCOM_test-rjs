/*\
##=========+====================+================================================+
##RD        server-fns.mjs      | Server script
##RFILE    +====================+=======+===============+======+=================+
##FD       server-fns_u1.00.mjs |  12796|  3/20/23 12:47|    65| u1.00-30320.1247
##FD       server-fns_u1.01.mjs |  15088|  3/23/23 14:54|    65| u1.01-30323.1454
##FD       server-fns_u1.01.mjs |  18470|  3/28/23 21:18|    65| u1.01-30328.2118
##FD       server-fns_u1.02.mjs |  15714|  3/30/23 15:07|    65| u1.02-30330.1507
##FD       server-fns_u1.03.mjs |  21473|  3/31/23 22:45|   341| u1-03-30331.2245
##FD       server-fns_u1.04.mjs |  37077|  4/02/23 17:24|   566| u1-04.30402.1724
##DESC     .--------------------+-------+---------------+------+-----------------+
#           This Javascript file modifies the Login Button
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
#           chkSQL
#           sndRecs
#           sndFile                                                                 // .(30403.04.0)
#           fmtJSON
#           sndJSON
#           chkArgs
#           chkArg
#           chkSQL                                                                  // .(30403.06.0)
#           fmtArgs
#           sndHTML
#           setError
#           sndError
#           sayErr
#           sayMsg
#           indexObj                                                                 // .(30402.03.0)
#           init
#           setVar2
#           setVar1
#           start
#           getEnv                                                                   // .(30222.01.3 RAM Beg Write getEnv)).(30320.04.2 RAM Don't reurn existing values)
#           sayEnvEr                                                                 // .(30328.01.1 Beg Write seperate function)
#                               |
##CHGS     .--------------------+----------------------------------------------+
# .(30213.01  2/13/23 RAM  1:45p| Created
# .(30213.02  2/13/23 RAM  2:12p| Change port from 3000 to 3002
# .(30214.03  2/14/23 RAM  8:00p| Display root dir
# .(30312.02  3/12/23 RAM  9:10a| Set nPort for FRApps/server3/s36_mysql-data-api )
# .(30318.01  3/18/23 RAM  8:22a| Should `return pReq.query` be `{}`??
# .(30319.01  3/19/23 RAM  3:32p| Do nothing if .env not found
# .(30320.04  3/20/23 RAM 12:47p| Don't reurn existing values
# .(30320.05  3/20/23 RAM  1:15p| No Quotes or spaces in getEnv
# .(30222.01  3/22/23 RAM 12:55p| Write getEnv
# .(30322.03  3/22/23 RAM  1:28p| Play with aRemoteHost, bQuiet & aNeeds to be global to the IODD object
# .(30322.05  3/22/23 RAM  2:20p| Put '/' back into replace( 'file:///', '/' ) if aOS = 'linux'
# .(30322.06  3/22/23 RAM  3:02p| Add null and undefined
# .(30323.05  3/23/23 RAM  2:54p| pDB_Config, set in code, takes precedence)
# .(30328.01  3/28/23 RAM  8:30p| Write seperate function for sayEnvErr
# .(30328.02  3/28/23 RAM  9:20p| Write chkSQLargs
# .(30328.03  3/28/23 RAM  9:18p| Move setRoute to server-fns.mjs
# .(30328.04  3/28/23 RAM 10:00p| Write saySQL
# .(30328.05  3/28/23 RAM 10:34p| Write chkSQLargs
# .(30322.03  3/31/23 RAM  3:24p| aRemote_Host and aAPI_Host is needed by setRoute
# .(30328.05  3/31/23 RAM  3:34p| Add Node's inspect
# .(30328.05  3/31/23 RAM  7:53p| Return object in chkSQLargs
# .(30331.01  3/31/23 RAM  8:00p| Display onRoute name
# .(30401.02  4/01/23 RAM  4:00p| Add getHTML
# .(30402.01  4/02/23 RAM  2:53p| Add fetchFile
# .(30402.02  4/02/23 RAM  2:53p| Add getStyle, getJSON and modify getHTML
# .(30402.03  4/02/23 RAM  3:18p| Add indexObj
# .(30402.05  4/02/23 RAM  5:24p| Reuse sayMsg. Plus lots of changes for 'n Records found'
# .(30403.04  4/03/23 RAM  1:09p| Write sndFile
# .(30403.05  4/03/23 RAM  3:40p| Write putData
# .(30403.06  4/03/23 RAM  7:07p| Add chkSQL and default pValidArgs: { id : /[0-9]+/ }
# .(30403.07  4/03/23 RAM  7:45p| Trim mArg in chkArgs
# .(30406.01  4/06/23 RAM  9:10a| Return InsertId

##PRGM     +====================+===============================================+
##ID                            |
##SRCE     +====================+===============================================+
#*/
//  --------------------------  =   -------------------------------- ------------------ ------------------+ --------------------------

   import   mysql            from  'mysql2/promise';
   import { inspect }        from  'util'                                                                   // .(30328.05.3 RAM Add)
   import   express          from  'express';                                                               // .(30403.02.1)
   import   cssjson          from  'cssjson';                                                               // .(30402.02.5)
   import   cors             from  'cors';
   import   fs               from  'fs'

       var  bQuiet    =  false    // it's global in this module
       var  aEnv      = '../../.env'
       var  aRemote_Host                                                                                    // .(30322.03.7 RAM Needs to be global to the IODD object)
       var  aAPI_Host                                                                                       // .(30322.03.8 RAM aAPI_Host is needed by setRoute)
//     var  pApp                                                                                            //#.(30328.03.4 RAM pAPP is needed by setRoute)
       var  nSay      =  0,  nSay2 = 1

//  ------  ------------------  =   -------------------------------- ------------------ ------------------+

 async function  putData( pDB, aSQL, aDatasetName ) {                                                                                                // .(30403.05.1 Beg RAM Write function)
       var  aRecords      = `${ aDatasetName ? aDatasetName.replace( /^\//, "" ) : '' } record`
       var  aAction       =  aSQL.match( /INSERT/i ) ? 'inserted' : (aSQL.match( /DELETE/i ) ? 'deleted' : 'updated' )                               // .(30403.05.5 RAM Added deleted)
       try {
       var  mRecs         =  await pDB.execute( aSQL );
//     var  mColDefs      =  mCols.map( pRec => { return { Name: pRec.name, Type: pRec.type, Len: pRec.columnLength, Decs: pRec.decimals } } )
       var  nID           =  aSQL.match( /INSERT/i ) ? mRecs[0].insertId : 0, aRecords                                                               // .(30406.01.1 RAM Return InsertedId)
        if (aDatasetName) {  aRecords = `${aRecords}${ (mRecs[0].affectedRows == 1) ? '' : 's' } ${ nID ? `, ${nID}` : '' }` }                       // .(30406.01.2)
                 sayMsg( `${ saySQL( aSQL ) }\n     *  ${ `${mRecs[0].affectedRows}` } ${ aRecords  }, ${aAction}`.replace( /\n/g, '\n           ') );
    return  [ "success", `${ mRecs[0].affectedRows } ${ aRecords }, ${aAction}`, { affectedRows: mRecs[0].affectedRows , affectedId: nID } ]         // .(30406.01.3)
        } catch( pError ) {
                 sayErr(    `*** Error:  ${pError.message}.\n${   saySQL( aSQL, 31 ) }\n` );
    return  [ "error",          `Error:  ${pError.message}.  <br>
                                          &nbsp; &nbsp; &nbsp; ${ saySQL( aSQL     ) }` ]
            }
         }; // eof putData                                                                                                                           // .(30403.05.1 End)
//  ------  ------------------  =   -------------------------------- ------------------ ------------------+

 async function  getData( pDB, aSQL, aDatasetName ) {                                                                                                // .(30402.05.17)
       var  aRecords   = `${ aDatasetName ? aDatasetName.replace( /^\//, "" ) : '' } record`                                                         // .(30402.05.20)
       try {
       var [mRecs, mCols] =  await pDB.execute( aSQL );
       var  mColDefs      =  mCols.map( pRec => { return { Name: pRec.name, Type: pRec.type, Len: pRec.columnLength, Decs: pRec.decimals } } )
        if (mRecs.length == 0) {
                 sayErr(    `*** Error:  No ${ aRecords }s returned.\n${ saySQL( aSQL, 31 ) }\n` );                                                  // .(30402.05.21)
    return  [ "error",          `Error:  No ${ aRecords }s returned.<br>
                                                 &nbsp; &nbsp; &nbsp; ${ saySQL( aSQL     ) }` ] // .replace( /"/g, '\\"' ) ];          // .(30328.04.2).(30402.05.11 RAM To be sent as HTML)
     } else { if (aDatasetName) {  var aRecords = `${aRecords}${ (mRecs.length == 1) ? '' : 's' }`                                                   // .(30402.05.18)
//               sayMsg( `${ saySQL( aSQL ) }\n       * ${ `${mRecs.length}`.padStart(3) } ${aRecords} found`.replace( /\n/g, '\n           ') ); }  //#.(30402.05.19)
                 sayMsg( `${ saySQL( aSQL ) }\n     *  ${ `${mRecs.length}` } ${ aRecords        }, returned`.replace( /\n/g, '\n           ') ); }  // .(30402.05.23)
    return  mRecs
            }
        } catch( pError ) {
                 sayErr(    `*** Error:  ${pError.message}.\n${   saySQL( aSQL, 31 ) }\n` );
    return  [ "error",          `Error:  ${pError.message}.  <br>
                                          &nbsp; &nbsp; &nbsp; ${ saySQL( aSQL     ) }` ] // .replace( /"/g, '\\"' ) ]; // .(30328.04.2).(30402.05.12 RAM To be sent as HTML)
            }
         }; // eof getData
//  ------  ------------------  =   -------------------------------- ------------------ ------------------+

 async function  getHTML( aFile, aDivID ) {                                             // .(30401.02.1 Beg RAM Add function)

       var  pJSON     =  await fetchFile( aFile, false )                                // .(30402.02.1 RAM Use fetchFile)
        if (aDivID) {
       var  pDiv      =  $( `#${aDivID}` )
            pDiv.html(   pJSON.text )
//          sayMsg(     `setHTML[2]     Included HTML file, '${aFile}'`,  nSay2)        //#.(30402.05.1)
            sayMsg(     `HTML file, '${aFile}', included` )                             // .(30402.05.1)
        } else {
//          sayMsg(     `setHTML[3]     Retreived HTML file, '${aFile}'`, nSay2)        //#.(30402.05.2)
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
       var  toJSON     =  cssjson.toJSON
       var  toCSS      =  cssjson.toCSS

       if (!Array.isArray(mStyles)) { aDivID = mStyles }
        if (aDivID) {
       var  pSheet     =  $( `#${aDivID}` )
            pSheet.setAttribute( 'href', `${aFile}` )
//          sayMsg(     `getStyles[2]   Included CSS file, '${aFile}'`, nSay2)          //#.(30402.05.3)
            sayMsg(     `CSS file,  '${aFile}', included` )                             // .(30402.05.3)
        } else {
       var  aSheet     = (await fetchFile( aFile, false )).text
       if (!mStyles)   {  return  aSheet }

       var  pJSON      =  toJSON( aSheet ), pStyles = {}
//          pJSON.children['*'].attributes
//          pJSON.children['login'].attributes
//          pJSON.children['login form'].attributes
//          pJSON.children['.login form input[type="password"], .login form input[type="text"]'].attributes

//     var  aStyles   =  indexObj( pStyles.children, mStyles )
//          mStyles.forEach( aStyle => { pStyles[ aStyle ]  =  pJSON.children[aStyle].attributes } )
            mStyles.forEach( aStyle => { pStyles[ aStyle ]  =  pJSON.children[aStyle] }) // .children and .attributes

//          sayMsg(     `getStyles[3]   Retreived CSS file,'${aFile}'`, nSay2)          //#.(30402.05.4)
            sayMsg(     `CSS file,  '${aFile}', retreived` )                            // .(30402.05.4)
    return  toCSS( { children: pStyles, attributes: {} } )
            }
         }; // eof getStyles                                                            // .(30402.02.2 End)
//  ------  ------------------  =   -------------------------------- ------------------ ------------------+

 async  function  getJSON( aFile ) {                                                    // .(30402.02.3 Beg RAM Add function)
       var  pJSON     =  await fetchFile( aFile, false )
//          sayMsg(     `getJSON[1]     Retreived JSON '${aFile}'`, nSay2)              //#.(30402.05.5)
            sayMsg(     `JSON file, '${aFile}', retreived` )                            // .(30402.05.5)
    return  pJSON
         }; // eof getJSON                                                              // .(30402.02.3 End)
//  ------  ------------------  =   -------------------------------- ------------------ ------------------+

  function  saySQL( aSQL, nFill ) {                                                                         // .(30328.04.3 Beg RAM Add)
       var  aFill = `\n`.padEnd( nFill ? nFill + 6 : 6 ); aSQL = aSQL.replace( /^ +/, "" )                  // .(30402.05.22 RAM Remove leading spaces)
       var  aStr  = (aSQL || '').replace( /\n           /g, aFill ).replace( /^[\n]+/, '' ).replace( /[ \n]+$/, '' )
    return `${aFill.substring(6)}${aStr}`
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
            sayMsg( aMethod, aRoute_ )
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
       var aSQL      =  typeof( fmtSQL ) == 'string' ? fmtSQL : fmtSQL( pArgs )
       if (pArgs.id) {  aSQL = aSQL.match( /id *=/i ) ? aSQL : `${aSQL} WHERE id = ${pArgs.id}` }           // .(30403.06.2 RAM Kludge)
    return aSQL
           }                                                                                                // .(30403.06.4 End)
//  ------  ------------------  =   -------------------------------- ------------------ ------------------+

  function  sndRecs( pRes, mRecs, aSQL, aDatasetName, aOnRouteFnc ) {                                       // .(30331.01.3)
       var  aRecords   =  aDatasetName ? aDatasetName.replace( /^\//, "" ) : 'records'
        if (String(mRecs[0]).match(/error/ )) {
            aJSON      =                 `{ "error": \`${ mRecs[1].replace( /[ \n]+$/, '' ) }\` }`
        } else {
        if (mRecs.length > 0) { aRecords = ( mRecs.length != 1 ) ? aRecords : aRecords.replace( /s$/, "" ).replace(  /ies$/, 'y' )                            // .(30402.05.25)
 //                       sayMsg( `${ saySQL( aSQL    ) }\n       * ${ `${mRecs.length}`.padStart(3) } ${aRecords} found`.replace( /\n/g, '\n           ') ); //#.(30328.04.4).(30402.05.24)
                          sayMsg( `${ saySQL( aSQL    ) }\n     *  ${  `${mRecs.length}` } ${  aRecords      }, returned`.replace( /\n/g, '\n           ') ); // .(30328.04.4).(30402.05.24)
//     var  pRecs      =  mRecs; if (aDatasetName) { pRecs = {}; pRecs[aRecords]     = mRecs }              //#.(30404.01.2)
       var  pRecs      =  mRecs; if (aDatasetName) { pRecs = {}; pRecs[aDatasetName.replace( /^\//, "" )] = mRecs }  // .(30404.01.2 RAM Use aDatasetName, not Records)
       var  aJSON      =  fmtJSON( pRecs, aSQL )
                          sayMsg( `Handler,    '${aOnRouteFnc ? aOnRouteFnc : 'routeHandler'}', executed` ); // .(30331.01.4)
        } else {
                          sayErr( `${ saySQL( aSQL    ) }\n ** No ${aRecords} found` );                     // .(30328.04.6).(30402.05.15 RAM Not the same as GetData)
       var  aJSON      =  JSON.stringify( {  "warning":   ` ** No ${aRecords} found` } )                    // .(30402.05.16)
         }  }
                          sndJSON( pRes, aJSON, aRecords )
         }; // eof sndRecs
//  ------  ------------------  =   -------------------------------- ------------------ ------------------+

  function  sndFile( pRes, aFile, aDatasetName, aOnRouteFnc ) {                                             // .(30403.04.1 Beg RAM Write function)
       try {
//                        pRes.sendFile( `${__dirname}/../../${aFile.replace( /^\.\//, '' )}` )
//                        pRes.sendFile( `/../../${aFile.replace( /^\.\//, '' )}` )
                          pRes.sendFile(  aFile.replace( /^\.\//, '' ), { root: `${__dirname}/../../` } )
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

  function  sndJSON( pRes, aJSON, aRecords ) {
            pRes.setHeader( 'Content-Type', 'application/json' );
            pRes.send( aJSON )
            pRes.end();
        if (aJSON.match( /{ "error": /)) { return }
        if (aRecords) {  sayMsg( `JSON ${aRecords}, sent\n` ) }

         }; // eof sndJSON
//  ------  ------------------  =   -------------------------------- ------------------ ------------------+

  function  chkArgs( pReq, pRes, pValidArgs ) {
       var  pArgs_ = { ...pReq.body, ...pReq.query }, mErrArgs = []                                         // .(30403.02.3 RAM pReq.query overrides pReq.body)
       if (!pValidArgs) {
   return   pArgs // pReq.query                                                                             // .(30318.01.1 RAM S.It.B {} ??).(30403.02.4)
       } else {
//     var  mArgs      =  Object.keys( pReq.query ).map( aKey => { return [ aKey, pReq.query[aKey] ] } )    //#.(30403.02.5)
       var  pArgs = [];   Object.keys( pArgs_ ).map( aKey => { pArgs[ aKey.trim() ] = pArgs_[aKey].trim()}) // .(30403.07.1 RAM Trim pArgs)
       var  mArgs      =  Object.keys( pArgs  ).map( aKey => { return [ aKey, pArgs[aKey]      ] } )        // .(30403.02.5)
        if (mArgs.length > 0) {
            mErrArgs   =  mArgs.filter( chkArg )
        } else {
            mErrArgs   =  pValidArgs.required ? [ [ 'Required', 'yes' ] ] : [ ]
         }  }
        if (mErrArgs.length == 0) {
    return  pArgs // pReq.query  // all or nothing                                                                    // .(30403.02.6)
            }
                          sndError( pRes, `Invalid Arguments:`,   mErrArgs.map( mArg => mArg.join(' = ') ) )
       var  aMsg       =                  `Invalid Arguments: '${ mErrArgs.map( mArg => mArg.join(' = ') ).join() }'` // .(30402.05.6)
                          sayErr( `${aMsg}\n` )                                                                       // .(30402.05.7)
    return  null
//          ----------------------------------

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
                          sayMsg( `Handler,    '${aOnRouteFnc ? aOnRouteFnc : 'onRoute'}', executed` );     // .(30331.01.6)
            pRes.send( aHTML )
        if (aURI) {       sayMsg( `HTML Page,  '${aURI}', sent\n` ) }

         }; // eof sndHTML
//  ------  ------------------  =   -------------------------------- ------------------ ------------------+

  function  setError( pApp, aMsg, s ) {

       pApp.use( '*', function( pReq, pRes ) {
                          sndError(  pRes, `${aMsg}`, [ pReq.baseUrl ] )
                          sayErr( `${aMsg}\n` )                                                            // .(30402.05.8 RAM Add)
            } )
                          sayMsg( `${aMsg}${ s || '' }, set` )
         }; // eof setError
//  ------  ------------------  =   -------------------------------- ------------------ ------------------+

  function  sndError( pRes, aMsg, mItems ) {

       var  aItems     =  mItems ? ( mItems.length > 0 ? `, '${ mItems.join() }'` : "") : ""

            aMsg       = `*** ${aMsg}${aItems}`
            pRes.send(   `<h3>${aMsg}.</h3>` )
//                       sayErr( `${aMsg}\n` )                                                              //#.(30402.05.9 RAM Remove)
         }; // eof sndError
//  ------  ------------------  =   -------------------------------- ------------------ ------------------+

  function  sayErr( aErrMsg ) {
        var aTS       =  (new Date).toISOString().replace( /[Z:-]/g, '' ).replace( /T/, '.' ).substring(2)
            console.log( `${aTS}  ${aErrMsg}`)

         }; // eof sayErr
//  ------  ------------------  =   -------------------------------- ------------------ ------------------+

  function  sayMsg( pReq, aMethod, aRoute ) {
        if (bQuiet) { return }

       if (!aRoute) { aRoute = aMethod; aMethod = pReq; pReq = null }

       var  aMsg       = `${ aMethod.toUpperCase() } Route, '${aRoute }`
        if (pReq) {
            pReq.args  =  fmtArgs( pReq.query )  // save for ending sayMsg
            aMsg       = `${aMsg}${pReq.args}', recieved`
        } else {
            aMsg       =  aRoute ? `${aMsg}', set` : aMethod
            }
        var aTS        = (new Date).toISOString().replace( /[Z:-]/g, '' ).replace( /T/, '.' ).substring(2)
            console.log( `${aTS}  ${aMsg}` )

         }; // eof sayMsg
//  ------  ------------------  =   -------------------------------- ------------------ ------------------+

  function  indexObj( pObj, mItems ) {                                                                      // .(30402.03.1 Beg RAM Add)
//      var pOut = {}, i, n = Array.isArray( mItems ) ? mItems.length : 0; if (!n) { return pObj }
       if (!Array.isArray( mItems )) { return pObj }; var pOut = {}, n = mItems.length, i
       for (i = 0; i < n; i++) { pOut[ mItems[i] ] = pObj[ mItems[i] ]; }
    return  pOut;

         }; // eof indexObj                                                                                 // .(30402.03.1 End)
//  ------  ------------------  =   -------------------------------- ------------------ ------------------+


  function init( pApp, pDB_Config, bQuiet_ ) {

            pApp.use( cors( { origin: '*' } ) );
            pApp.use( express.urlencoded({ extended: true } ) )                                             // .(30403.02.2 RAM Needed for form body vars)

       var  aAPI_Dir   =  `${__dirname}/../..`                                                              // .(30322.03.1 Beg RAM Set different var)

            process.env = getEnv( `${aAPI_Dir}/.env` )                                                      // .(30222.01.2 RAM Get it myself).(30322.03.1 End)

                          setVar1( 'Server_Port',  3000 )                                                   // Look in process.env only
                          setVar2( 'DB_Host',     '45.32.219.12', 'host' )                                  // Look in pDB_Config too
                          setVar2( 'DB_User',     'nimdas'      , 'user' )
                          setVar2( 'DB_Password', 'FormR!1234'  , 'password' )
                          setVar2( 'DB_Database', 'iodd'        , 'database' )                              // .(30320.06.1 RAM Opps )

            aRemote_Host= setVar1( 'Remote_Host', 'https:/iodd.com'  );          // console.log( `aRemote_Host: '${aRemote_Host}'` ); // process.exit() // .(30322.03.2 RAM I-Yi-Yai?)
       var  aAPI_URL    = setVar1( 'API_URL',     '/api2' )          ;           // console.log( `aAPI_URL:     '${aAPI_URL}'`     ); // process.exit()

            aAPI_Host  = (aOS == 'windows') ? '' : `${aAPI_URL}`;                // console.log( `aAPI_Host:    '${aAPI_Host}'`    ); // .(30322.03.3 RAM Make it global)
//          console.log( `aAPI: ${aAPI}, argv0: '${process.argv[1]}'`);

//          pDB  =  await mysql.createPool( pDB_Config ? pDB_Config : pDB_Config )
       var  pDB        =  mysql.createPool( pDB_Config ? pDB_Config : pDB_Config )

                                                              // console.log( `bQuiet_:      '${bQuiet_}'` );
            bQuiet     =  setVar1( 'Quiet', bQuiet_, true )   // Override value in .env
            bQuiet     =  bQuiet ?  true :  false;            // console.log( `bQuiet:        ${bQuiet}`   );  process.exit()

                          console.log( "" )
                          sayMsg( `USE Database: '${ pDB_Config.database }'` )                              // .(30323.03.1)

       return { pDB_: pDB, aAPI_Host_: aAPI_Host, bQuiet_: bQuiet }                                         // .(30322.03.4

   function setVar2( aVar2, aVal, aVar1 ) {  //  aVar2 in process.env, aVar1 in pDB_Config
            aVar1 = aVar1 ? aVar1 : aVar2    // .toUpperCase(); // case is important
            pDB_Config[aVar1] = typeof(pDB_Config[ aVar1]) != 'undefined' ? pDB_Config[aVar1]  : process.env[aVar2]  // .(30323.05.1 RAM pDB_Config, set in code, takes precedence)
            pDB_Config[aVar1] = typeof(pDB_Config[ aVar1]) != 'undefined' ? pDB_Config[aVar1]  : ( typeof( aVal ) != 'undefined' ? aVal : null )  // .(30322.06.1)
     return pDB_Config[aVar1]
            }

   function setVar1( aVar2, aVal, bSw) {
        if (bSw) { return typeof(aVal) != 'undefined' ? aVal : process.env[aVar2] || '' }
     return typeof(process.env[aVar2]) != 'undefined' ? process.env[aVar2] : ( typeof( aVal ) != 'undefined' ? aVal : null )  // .(30322.06.2)
            }
         }; // eof init
//  ------  ------------------  =   -------------------------------- ------------------ ------------------+

    function start( pApp, nPort, aAPI_Host ) {     // must be last

       var  nPort      =  nPort ? nPort : process.env.Server_Port                                           // .(30312.02.1 RAM Set nPort for FRApps/server3/s36_mysql-data-api )

            pApp.get(    '/favicon.*', function( pReq, pRes ) {
                          pRes.sendFile( `${__dirname}/${pReq.url}` ) } )                                   // .(30318.01.1 RAM Or else it's a bad route)

            setError( pApp, 'Bad Route', 's' ) // Other Uses?

            pApp.listen( nPort );                                                                           // .(30213.02.2 RAM Change real port from 3000 to 3002).(30213.02.4)
        if (aAPI_Host == '') {                                                                              // .(30214.03.11)
            console.log( `\n    Server is running at: http://localhost:${nPort}` )                          // .(30213.02.1 Change port from 3000 to 3002).(30213.02.5)

        } else {                                                                                            // .(30214.03.12 Beg)

            console.log( `\n    Server is running at: ${ aRemote_Host}${aAPI_Host} -> port:${nPort}` )      // .(30322.03.5)
            }                                                                                               // .(30214.03.12 End)
            console.log(   `    Server is running in: ${ process.argv[1] }\n` )                             // .(30214.03.10 RAM Display root dir)

         }; // eof start
//  ------  ------------------  =   -------------------------------- ------------------ ------------------+

      var   aURI        =  import.meta.url; // console.log( "aURI", aURI ); process.exit()
      var   aOS         = `${process.argv[1]}`.match( /^[a-z]:/i ) ? 'windows' : 'linux'
      var __filename    =  aURI.replace( /^.+\//, "" )
      var __dirname     =  aURI.replace( `/${__filename}`, '' ).replace( 'file:///', aOS == 'linux' ? '/' : '') // .(30322.05.1 RAM Put '/' back in)

  function  getEnv( aFile, bNewOnly ) {                                                                     // .(30222.01.3 RAM Beg Write getEnv)).(30320.04.2 RAM Don't reurn existing values)
       if (!fs.existsSync( aFile )) { sayEnvErr(); return process.env }                                     // .(30319.01.1 RAM Do nothing if .env not found).(30322.03.6 RAM Display error)
       var  mVars  =  fs.readFileSync( aFile, 'ASCII' ).split(/[\r\n]/), pVars = { }
            mVars.forEach( aVar => { if (aVar.replace( /^ +/, "" ) > "" && aVar.match( /^ *#/ ) == null ) {
       var  aKey   =  aVar.replace( /=.*/,  '' ).replace( /[ '"]/g,  '' );                                  // .(30320.05.1 RAM No Quotes or spaces)
       var  aVal   =  aVar.replace( /.+?=/, '' ).replace( /^[ '"]*/, '' ).replace( /[ '"]*$/, '' );         // .(30320.05.1 RAM No leading Quotes or spaces)
       var  bNum   =  aVal.match( /^ *([0-9]+|true|false|null|undefined) *$/i ) != null                     // .(30322.06.3 RAM Add null and undefined)
            pVars[aKey] = bNum ? (aVal.match(  /false|null|undefined/i ) ? false : (aVal.match( /true/i ) ? true : aVal * 1 )) : aVal } } )   // .(30322.06.4)
     return bNewOnly ? pVars : { ...process.env,  ...pVars }                                                // .(30319.01.2 RAM Add to existing env vars).(30320.04.2)

  function  sayEnvErr() {                                                                                   // .(30328.01.1 Beg Write seperate function)
            console.log( `\n*** The .env file does NOT EXIST!\n     '${aFile}'\n` )
            process.exit()
            }                                                                                               // .(30328.01.1 End)
         }; // eof getEnv                                                                                   // .(30222.01.3 RAM End)

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
                 pJSON          =  {}; pJSON.text = aText
                 }
             } catch( pErr ) {     return onError( pErr, { status: 404, url: aFile } ) }

//         ----  -------------  =  ------------------------------
         return  pJSON
//       ------  -------------  =  ----------------------------------------
                 } // eif Node && local file
//       ------  -------------  =  ----------------------------------------

  function onError( pErr, pResponse ) {
             if (pResponse && pResponse.status == 404) {
                 pErr.message   =  `Invalid URL: '${pResponse.url}'`
                 }
                 console.log( ` *** Invalid JSON file.\n     Error: ${pErr.message}` )
          return pJSON          = { "error":   ` *** Invalid JSON file. Error: ${pErr.message}` }
                 }
//       ------  -------------  =  ----------------------------------------
         }; // eof getJSON                                                              // .(30402.01.1 End)
//  ------  ------------------  =   -------------------------------- ------------------ ------------------+

   export { putData, getData,   sndRecs,  fmtJSON,  sndJSON,  chkArgs, fmtArgs }        // .(30403.05.2 RAM Add putData)
   export { sndHTML, sndError,  setError, setRoute, sayMsg,   init, start }             // .(30328.03.2 RAM)
   export { getHTML, getStyles, getJSON,  sndFile,  indexObj, chkSQL }                  // .(30402.02.4 RAM).(30402.03.2).(30403.04.1).(30403.06.5)

//  --------------------------  =   -------------------------------- ------------------ ------------------+ --------------------------
