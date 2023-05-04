
  import    express   from 'express'
  import  { IODD  }   from './api/IODD-Server_u1.05.mjs'

       var  pApp      =  express()
       var  bQuiet // =  true        // Override .env Quiet = {true|false}
       var  nPort  // =  54131       // Override .env Server_Port  

       var  pIODD     =  new IODD

            pIODD.init(  pApp, bQuiet )

            pIODD.Root_getRoute( "/" )
//          pIODD.Table_getRoute()

            pIODD.Login_getRoute( )
            pIODD.Login_getForm( )      // .(30404.02.1)
            pIODD.Login_postRoute( )    // .(30403.02.1)
//          pIODD.Login_postForm( )     // .(30403.02.1)

            pIODD.Members_getRoute( )
            pIODD.MembersBios_getRoute( )
            pIODD.Projects_getRoute( )
            pIODD.ProjectCollaborators_getRoute( )
            pIODD.MembersProjects_getRoute( )
//          pIODD.ProjectCollaboratorsLetters_getRoute( '/letters' )
            pIODD.Meetings_getRoute( )
            pIODD.Users_getOneRoute( )
            pIODD.Users_getAllRoute( )

            pIODD.start( nPort )