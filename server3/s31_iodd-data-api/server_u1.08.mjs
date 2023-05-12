
  import  { IODD  }   from './api/IODD-Server_u1.08.mjs'

       var  bQuiet // =  true        // Override .env Quiet = {true|false}
       var  nPort  // =  54131       // Override .env Server_Port
       var  aAPI   // = 'api12'      // Override .env API_URL                           // .(30408.02.3)

       var  mArgs     =  process.argv.slice(2)                                          // .(30408.02.7)
            nPort     =  chkArgs( mArgs, /[0-9]+/,      nPort )                         // .(30414.01.1 RAM Override any script argument)
            aAPI      =  chkArgs( mArgs, /^api[0-9]+/i, aAPI  )                         // .(30414.01.2) 

       var  pIODD     =  new IODD                                                       // .(30406.02.1 Beg)
            pIODD.init(  bQuiet, aAPI )                                                 // .(30412.02.11 RAM Override aAPI here)
            pIODD.setRoutes( )
            pIODD.start( nPort )                                                        // .(30406.02.1 End).(30408.02.4).(30412.02.12)

// export { pIODD }

// ------   --------  =  --------------------------------------------------

  function  chkArgs( mArgs, rValidVal, aDefaultVal ) {                                  // .(30414.01.3 RAM Write it)
//          console.log( `checking ${rValidVal} in [ '${ mArgs.join("','") }' ]` )
       var  mVals     =  mArgs.filter( aArg => aArg.match( rValidVal ) != null )        // .(30414.01.4)  
    return  mVals[0]  ?  mVals[0] : aDefaultVal          
            }                                                                           // .(30414.01.5)