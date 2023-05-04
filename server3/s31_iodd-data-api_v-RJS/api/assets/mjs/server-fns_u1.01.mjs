    import  mysql       from  'mysql2/promise';
//  import  express     from  'express';
    import  cors        from  'cors';
    import  fs          from  'fs'

       var  bQuiet   =  false    // it's global in this module
       var  aEnv     = '../../.env'
       var  aRemote_Host                                            // .(30322.03.1 RAM Needs to be global to the IODD object)

//     -------------------------------------------------------------

  async function  getData( pDB, aSQL ) {
       try {
       var [mRecs, mCols] =  await pDB.execute( aSQL );
       var  mColDefs      =  mCols.map( pRec => { return { Name: pRec.name, Type: pRec.type, Len: pRec.columnLength, Decs: pRec.decimals } } )
    return  mRecs
        } catch( pError ) {
//          aSQL          =  aSQL.replace( /\n           /g, '\n     ').replace( /^[\n]+/, '' ).replace( /[ \n]+$/, '' ) //#.(30328.04.2)
            console.log(    `  *** Error: ${pError.message}\n${ saySQL( aSQL ) }\n` );
//  return  { "error":        '*** Error: ${pError.message}\n${ aSQL}' };
    return  [ "error",        `*** Error: ${pError.message}\n${ saySQL( aSQL ) }` ] // .replace( /"/g, '\\"' ) ]; // .(30328.04.2)
//  return `{ "error":        '*** Error: ${pError.message}\n${aSQL}' }`;
            }
       }
//     -------------------------------------------------------------

  function  saySQL( aSQL ) {                                                                                        // .(30328.04.3 Beg RAM Add)
    return (aSQL || '').replace( /\n           /g, '\n     ').replace( /^[\n]+/, '' ).replace( /[ \n]+$/, '' )
        }                                                                                                         // .(30328.04.3 End)

//function  setRoute( aMethod, aRoute_, fmtSQL, pValidArgs ) {                //#.(30328.02.1 RAM Switch Args)
function  setRoute( aMethod, aRoute_, pValidArgs, fmtSQL_ ) {               // .(30328.02.1 RAM Don't switch Args)

  var  aRoute     = `${aAPI_Host}${aRoute_}`
       fmtSQL     = (typeof(fmtSQL_) != 'undefined') ? fmtSQL_ : pValidArgs
//      pValidArgs =  pValidArgs ? pValidArgs : fmtSQL
   if (typeof(fmtSQL_) == 'object') {                                         // .(30328.02.2 Beg RAM Switch if object) 
       fmtSQL     =  pValidArgs 
       pValidArgs =  fmtSQL_                                                 // .(30328.02.2 End) 
       }
  switch (aMethod) {
     case 'get'   : pApp.get(    aRoute, async ( pReq, pRes ) => { onRoute( aMethod, pReq, pRes, aRoute, pValidArgs, fmtSQL ) } ); break
     case 'post'  : pApp.post(   aRoute, async ( pReq, pRes ) => { onRoute( aMethod, pReq, pRes, aRoute, pValidArgs, fmtSQL ) } ); break
     case 'put'   : pApp.put(    aRoute, async ( pReq, pRes ) => { onRoute( aMethod, pReq, pRes, aRoute, pValidArgs, fmtSQL ) } ); break
     case 'delete': pApp.delete( aRoute, async ( pReq, pRes ) => { onRoute( aMethod, pReq, pRes, aRoute, pValidArgs, fmtSQL ) } ); break
//    case 'patch' : pApp.patch(  aRoute, xController ); break
       default    : null
       }
       sayMsg( aMethod, aRoute_ )
}
//---- -------------------------------------------------------------------


  function chkSQL( pValidArgs, fmtSQL_) {
      var  fmtSQL     = (typeof(fmtSQL_) != 'undefined') ? fmtSQL_ : '' // pValidArgs || ''     
           pValidArgs =  pValidArgs ? pValidArgs : {}
       if (typeof(fmtSQL) == 'object' || typeof(pValidArgs) == 'function') {      // .(30328.02.2 Beg RAM Switch if object) 
           fmtSQL     =  typeof(pValidArgs) != 'object' ? pValidArgs : ''  
           pValidArgs =  fmtSQL_ || {}                                                // .(30328.02.2 End) 
           }
  //   if (typeof(pValidArgs) == 'string') { pValidArgs = {} }    
       if (typeof(pValidArgs) == 'string') { fmtSQL = pValidArgs; pValidArgs = {} }    
           console.log( `pValidArgs: ${ inspect( pValidArgs, { depth: 99 } ) }, fmtSQL: '${ inspect(fmtSQL, {depth:99})}'` ) 
  return [ pValidArgs, fmtSQL ]
           }

  function  sndRecs( pRes, mRecs, aSQL, aDatasetName ) {
//          aSQL      =  aSQL.replace( /\n           /g, '\n     ').replace( /^[\n]+/,  '' ).replace( /[ \n]+$/, '' )  //#.(30328.04.4)  
     var  aRecords  =  aDatasetName ? aDatasetName.replace( /^\//, "" ) : 'records'
        if (String(mRecs[0]).match(/error/ )) {
//          aJSON     =  JSON.stringify( { "error":      mRecs[1].replace( /[ \n]+$/, '' )     } )
            aJSON     =                 `{ "error": \`${ mRecs[1].replace( /[ \n]+$/, '' ) }\` }`
        } else {
        if (mRecs.length > 0) {
                         sayMsg( `${ saySQL( aSQL ) }\n       * ${ `${mRecs.length}`.padStart(3) } ${aRecords} found`.replace( /\n/g, '\n           ') ); // .(30328.04.4)
       var  pRecs     =  mRecs; if (aDatasetName) { pRecs = {}; pRecs[aRecords] = mRecs }
       var  aJSON     =  fmtJSON( pRecs, aSQL )
        } else {
                         sayErr( `${ saySQL( aSQL ) }\n ** No ${aRecords} found` );                                      // .(30328.04.6)
       var  aJSON     =  JSON.stringify( {  "warning":   ` ** No ${aRecords} found` } )
         }  }
                         sndJSON( pRes, aJSON, aRecords )
       }
//     -------------------------------------------------------------

  function  fmtJSON( pJSON, aSQL ) {
       try {
    return  JSON.stringify( pJSON )
        } catch( pError ) {
                         sayErr( `${ aSQL ? aSQL + '\n' : '' }*** Error: ${pError.message}` );
//  return  JSON.stringify( { "error":  `*** Error: ${pError.message}`  }` )
    return                 `{ "error": \`*** Error: ${pError.message}\` }`
            }
       }
//     -------------------------------------------------------------

  function  sndJSON( pRes, aJSON, aRecords ) {
            pRes.setHeader( 'Content-Type', 'application/json' );
            pRes.send( aJSON )
            pRes.end();
        if (aJSON.match( /{ "error": /)) { return }
//      if (aRecords && !bQuiet) { console.log( `   JSON ${aRecords} sent\n` ) }
        if (aRecords) {  sayMsg( `JSON ${aRecords} sent\n` ) }
       }
//     -------------------------------------------------------------

  function  chkArgs( pReq, pRes, pValidArgs ) {
//          pReq.args = fmtArgs( pReq.query )
       if (!pValidArgs) {
   return   pReq.query   // .(30318.01.1 RAM S.It.B {} ??)
       } else {
       var  mArgs     =  Object.keys( pReq.query ).map( aKey => { return [ aKey, pReq.query[ aKey ] ] } ), mErrArgs  = []
        if (mArgs.length > 0) {
            mErrArgs  =  mArgs.filter( chkArg )
        } else {
            mErrArgs  =  pValidArgs.required ? [ [ 'Required', 'yes' ] ] : [ ]
         }  }
        if (mErrArgs.length == 0) {
    return  pReq.query  // all or nothing
            }
            sndError( pRes, `Invalid Arguments`, mErrArgs.map( mArg => mArg.join('=') ) )
    return  null
//          ----------------------------------

  function  chkArg( mArg ) {
       var  rTestVals  =  pValidArgs[ mArg[0] ], bOk = false
        if (rTestVals !=  null) {
       var  bOk        =  rTestVals.test( mArg[1] )
            pReq.query[   mArg[0].toLowerCase() ] =  mArg[1]
            }
    return  bOk ? false : true
            }
//          ----------------------------------
       };
//     -------------------------------------------------------------

  function  fmtArgs( pArgs ) {
       var  mArgs =  Object.keys( pArgs ).map( aKey => { return [ aKey, pArgs[ aKey ] ] } )
       var  aArgs = (mArgs.length == 0) ? '' : '/' + mArgs.map( mArg => mArg.join('=') ).join()
    return  aArgs
       }
//     -------------------------------------------------------------

  function  sndHTML( pRes, aHTML, aURI ) {
            pRes.send( aHTML )
        if (aURI) {       sayMsg( `HTML Page at ${aURI} sent\n` ) }
        }
//     -------------------------------------------------------------

  function  setError( pApp, aMsg, s ) {

       pApp.use( '*', function( pReq, pRes ) {
            sndError(  pRes, `${aMsg}`, [ pReq.baseUrl ] )
            } )
                          sayMsg( `${aMsg}${ s || '' }, set` ) 
       }
//     -------------------------------------------------------------

  function  sndError( pRes, aMsg, mItems ) {

       var  aItems    =   mItems ? ( mItems.length > 0 ? `, '${ mItems.join() }'` : "") : ""

            aMsg      = `*** ${aMsg}${aItems}`
            pRes.send(  `<h3>${aMsg}.</h3>` )
                          sayErr( `${aMsg}\n` ) 
       }
//     -------------------------------------------------------------

  function  sayErr( aErrMsg ) {
        var aTS       = (new Date).toISOString().replace( /[Z:-]/g, '' ).replace( /T/, '.' ).substring(2)      
            console.log( `${aTS}  ${aErrMsg}`)
            } 
//     -------------------------------------------------------------

  function  sayMsg( pReq, aMethod, aRoute ) {
//      if (pDB.Quiet) { return }  // wouldn't work anyway, cuz we're down two levels ??
        if (bQuiet) { return }

       if (!aRoute) { aRoute = aMethod; aMethod = pReq; pReq = null }

       var  aMsg      = `${ aMethod.toUpperCase() } Route, '${aRoute }`
        if (pReq) {
            pReq.args =  fmtArgs( pReq.query )  // save for ending sayMsg
            aMsg      = `${aMsg}${pReq.args}', recieved` 
        } else {
            aMsg      =  aRoute ? `${aMsg}', set` : aMethod
            }
        var aTS       = (new Date).toISOString().replace( /[Z:-]/g, '' ).replace( /T/, '.' ).substring(2)      
//          console.log( `    ${aMsg}` ) 
            console.log( `${aTS}  ${aMsg}` ) 
       }
//     -------------------------------------------------------------

  function init( pApp, pDB_Config, bQuiet_ ) {

//          pApp       =  express();

//          pDB        =        mysql.createConnection( pDB_Config_ ? pDB_Config_ : pDB_Config )

            pApp.use( cors( { origin: '*' } ) );

       var  aAPI_Dir   =  `${__dirname}/../..`                                                      // .(30322.03.1 Beg RAM Set different var)

//                        console.log( "aFile", `${aAPI_Dir}/.env` )
//                        console.log( getEnv(  `${aAPI_Dir}/.env`, true ) )
            process.env = getEnv( `${aAPI_Dir}/.env` )                                              // .(30222.01.2 RAM Get it myself).(30322.03.1 End)

                          setVar1( 'Server_Port',  3000 )                                           // Look in process.env only
                          setVar2( 'DB_Host',     '45.32.219.12', 'host' )                          // Look in pDB_Config too
                          setVar2( 'DB_User',     'nimdas'      , 'user' )
                          setVar2( 'DB_Password', 'FormR!1234'  , 'password' )
                          setVar2( 'DB_Database', 'iodd'        , 'database' )                      // .(30320.06.1 RAM Opps )

            aRemote_Host= setVar1( 'Remote_Host', 'https:/iodd.com'  );          // console.log( `aRemote_Host: '${aRemote_Host}'` ); // process.exit() // .(30322.03.2 RAM I-Yi-Yai?)
       var  aAPI_URL    = setVar1( 'API_URL',     '/api2' )          ;           //  console.log( `aAPI_URL:     '${aAPI_URL}'`     ); // process.exit()

       var  aAPI_Host  = (aOS == 'windows') ? '' : `${aAPI_URL}`;                // console.log( `aAPI_Host:    '${aAPI_Host}'`     ); // .(30322.03.8)
//          console.log( `aAPI: ${aAPI}, argv0: '${process.argv[1]}'`);

//          pDB  =  await mysql.createPool( pDB_Config ? pDB_Config : pDB_Config )
       var  pDB        =  mysql.createPool( pDB_Config ? pDB_Config : pDB_Config )

                                                              // console.log( `bQuiet_:      '${bQuiet_}'` );
            bQuiet     =  setVar1( 'Quiet', bQuiet_, true )   // Override value in .env
            bQuiet     =  bQuiet ?  true :  false;            // console.log( `bQuiet:        ${bQuiet}`   );  process.exit()

//          pDB_.Quiet =  setVar1( 'quiet', bQuiet_ )         // these "singleton"s don't get new values ???
//          pDB_.API_Host = aAPI_Host

                          console.log( "" )
                          sayMsg( `USE Database: '${ pDB_Config.database }'` )                   // .(30323.03.1)

       return { pDB_: pDB, aAPI_Host_: aAPI_Host, bQuiet_: bQuiet }                                 // .(30322.03.2
//     return { pDB_: pDB, aAPI_Host_: aAPI_Host }
//     return { pDB_ }

   function setVar2( aVar2, aVal, aVar1 ) {  //  aVar2 in process.env, aVar1 in pDB_Config
            aVar1 = aVar1 ? aVar1 : aVar2    // .toUpperCase(); // case is important
//          pDB_Config[aVar1] = typeof(process.env[aVar2]) != 'undefined' ? process.env[aVar2] : pDB_Config[aVar1]   //#.(30323.05.1) 
            pDB_Config[aVar1] = typeof(pDB_Config[ aVar1]) != 'undefined' ? pDB_Config[aVar1]  : process.env[aVar2]  // .(30323.05.1 RAM pDB_Config, set in code, takes precedence)
            pDB_Config[aVar1] = typeof(pDB_Config[ aVar1]) != 'undefined' ? pDB_Config[aVar1]  : ( typeof( aVal ) != 'undefined' ? aVal : null )  // .(30322.06.1)
     return pDB_Config[aVar1]
            }
   function setVar1( aVar2, aVal, bSw) {
        if (bSw) { return typeof(aVal) != 'undefined' ? aVal : process.env[aVar2] || '' }
     return typeof(process.env[aVar2]) != 'undefined' ? process.env[aVar2] : ( typeof( aVal ) != 'undefined' ? aVal : null )  // .(30322.06.2)
            }
       }
//     -------------------------------------------------------------

    function start( pApp, nPort, aAPI_Host ) {     // must be last

       var  nPort      =  nPort ? nPort : process.env.Server_Port                                   // .(30312.02.1 RAM Set nPort for FRApps/server3/s36_mysql-data-api )

            pApp.get(    '/favicon.*', function( pReq, pRes ) {
                          pRes.sendFile( `${__dirname}/${pReq.url}` ) } )                           // .(30318.01.1 RAM Or else it's a bad route)

            setError( pApp, 'Bad Route', 's' ) // Other Uses?

            pApp.listen( nPort );                                                                   // .(30213.02.2 RAM Change real port from 3000 to 3002).(30213.02.4)
        if (aAPI_Host == '') {                                                                      // .(30214.03.11)
            console.log( `\n    Server is running at: http://localhost:${nPort}` )                  // .(30213.02.1 Change port from 3000 to 3002).(30213.02.5)
        } else {                                                                                    // .(30214.03.12 Beg)
//          console.log( `\n    Server is running at: https://IODD.com${aAPI_Host} -> port:${nPort}` )
            console.log( `\n    Server is running at: ${ aRemote_Host}${aAPI_Host} -> port:${nPort}` ) // .(30322.03.9)
//          console.log( `\n    Server is running at: ${                aAPI_Host} -> port:${nPort}` ) //#.(30322.03.9)
            }                                                                                       // .(30214.03.12 End)
            console.log(   `    Server is running in: ${ process.argv[1] }\n` )                     // .(30214.03.10 RAM Display root dir)
       }
//     -------------------------------------------------------------

      var   aURI        =  import.meta.url; // console.log( "aURI", aURI ); process.exit()
      var   aOS         = `${process.argv[1]}`.match( /^[a-z]:/i ) ? 'windows' : 'linux'
      var __filename    =  aURI.replace( /^.+\//, "" )
      var __dirname     =  aURI.replace( `/${__filename}`, '' ).replace( 'file:///', aOS == 'linux' ? '/' : '') // .(30322.05.1 RAM Put '/' back in)

//          dotenv.config();                                                                        // .(30222.01.1 RAM No Workie in VSCode debugger)
//          process.env =  getEnv( `${__dirname}/${aEnv}` )                                         // .(30222.01.2 RAM Get it myself)
//          console.log( Object.keys(process.env).filter( aVar => aVar.match( /^DB/ ) ) )

  function  getEnv( aFile, bNewOnly ) {                                                             // .(30222.01.3 RAM Beg Write getEnv)).(30320.04.2 RAM Don't reurn existing values)
       if (!fs.existsSync( aFile )) { sayEnvErr(); return process.env }                             // .(30319.01.1 RAM Do nothing if .env not found).(30322.03.1 RAM Display error)
       var  mVars  =  fs.readFileSync( aFile, 'ASCII' ).split(/[\r\n]/), pVars = { }
            mVars.forEach( aVar => { if (aVar.replace( /^ +/, "" ) > "" && aVar.match( /^ *#/ ) == null ) {
       var  aKey = aVar.replace( /=.*/,  '' ).replace( /[ '"]/g,  '' );                             // .(30320.05.1 RAM No Quotes or spaces)
       var  aVal = aVar.replace( /.+?=/, '' ).replace( /^[ '"]*/, '' ).replace( /[ '"]*$/, '' );    // .(30320.05.1 RAM No leading Quotes or spaces)
       var  bNum = aVal.match( /^ *([0-9]+|true|false|null|undefined) *$/i ) != null                // .(30322.06.3 RAM Add null and undefined)
//          pVars[aKey] = bNum ?  aVal.replace(/true/, '1').replace(/false/, '0') * 1 : aVal } } )
            pVars[aKey] = bNum ? (aVal.match(  /false|null|undefined/i ) ? false : (aVal.match( /true/i ) ? true : aVal * 1 )) : aVal } } )   // .(30322.06.4)
     return bNewOnly ? pVars : { ...process.env,  ...pVars }                                        // .(30319.01.2 RAM Add to existing env vars).(30320.04.2)

  function  sayEnvErr() {                                                                           // .(30328.01.1 Beg Write seperate function)
            console.log( `\n*** The .env file does NOT EXIST!\n     '${aFile}'\n` )
            process.exit()
            }                                                                                       // .(30328.01.1 End)
       }                                                                                       // .(30222.01.3 RAM End)
//     -------------------------------------------------------------

   export { getData, sndRecs,  fmtJSON,  sndJSON, chkArgs, fmtArgs }
   export { sndHTML, sndError, setError, sayMsg,  init,    start   }

