//  --------------------------------------------------------------------------

    import  express from  'express';

    import { chkArgs, sndHTML, getData, sndRecs } from './assets/mjs/server-fns_u1.00.mjs';
    import { init, start, sayMsg                } from './assets/mjs/server-fns_u1.00.mjs';

//--------  -----------------------------------------------------------------------------

  if (process.argv[1].replace( /.*[\\/]/, '' ).match( /IODD.*\.mjs/ )) {

       var  pApp      =  express()
       var  bQuiet // =  true        // Override .env Quiet = {true|false}
       var  nPort     =  54031       // Override .env Server_Port  
 
       var  pIODD     =  new IODD
            pIODD.init(  pApp, bQuiet )

            pIODD.getRoot( "/" )
            pIODD.getLogin( )
            pIODD.getMembers( )
            pIODD.getMembersBios( )
            pIODD.getProjects( )
//          pIODD.getProjectCollaborators( )
            pIODD.getMembersProjects( )
//          pIODD.getProjectCollaboratorsLetters( '/letters' )
            pIODD.getMeetings( )

            pIODD.start( nPort ) // 
       }
//--------  -----------------------------------------------------------------------------

  function  IODD ( ) {

       var  pApp, pDB, aAPI_Host          // Doesn't work for bQuiet, because it is not used in this module

       var  pDB_Config= { }

//------------------------------------------------------------------------------

  this.getTable = function( aGetRoute, pValidArgs ) {

        var aMethod   = 'get'
        var aRoute    = '/table'

            aGetRoute =  aGetRoute  ? aGetRoute  : aRoute
            pValidArgs=  pValidArgs ? pValidArgs :
                       { recs:    /[0-9]/
                       , letters: /([a-z],)*[a-z]/
                         }
//          ---------------------------------------------------

            setRoute(    aMethod, aGetRoute, pValidArgs, fmtSQL )

//          ---------------------------------------------------

  function fmtSQL( pArgs ) {
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
            };
//     ---  ---------------------------------------------------
       }
//---- -------------------------------------------------------------------



//------------------------------------------------------------------------------

  this.getRoot  = function( aGetRoute, pValidArgs ) {

       var  aMethod   = 'get'
       var  aRoute    = '/'

            aGetRoute =  aGetRoute  ? aGetRoute  : aRoute
            pValidArgs=  pValidArgs ? pValidArgs : { }
//          ---------------------------------------------------

       pApp.get( `${aAPI_Host}${aGetRoute}`, function( pReq, pRes ) {

                         sayMsg(  pReq, aMethod, aGetRoute )
       var  pArgs     =  chkArgs( pReq, pRes, pValidArgs ); if (!pArgs) { return }
       var  aHTML     =  fmtRoot( pArgs.name || '' )
                         sndHTML( pRes, aHTML, `${aGetRoute}${pReq.args}` )

            } )   // eof pApp.get( / )
                         sayMsg(  aMethod, aGetRoute )
//          ---------------------------------------------------

  function  fmtRoot( aName ) {
       var  aHTML = `
                Welcome ${aName} to IODD MySQL Express Server API.<br>
                Use any of the following APIs:<br><br>
                <div style="margin-left:40px; font-size:18px; line-height: 25px;">
                <a href="/login?id=90"                  >/login</a><br>
                <a href="/meetings"                     >/meetings</a><br>
                <a href="/members"                      >/members</a><br>
                <a href="/members_bios"                 >/members_bios</a><br>
                <a href="/members_projects"             >/members_projects</a><br>
                <a href="/projects"                     >/projects</a><br>
                <a href="/user?id=90"                   >/user</a><br>
<!--                
                <a href="/members?recs=10"              >/members?recs=10</a><br>
                <a href="/projects?letters=a,r"         >/projects?letters=a,r</a><br>
                <a href="/project_colaborators"         >/project_colaborators</a><br>
                <a href="/project_colaborators_letters" >/project_colaborators_letters</a><br>
-->
                </div> `;
    return  aHTML
            }; // eof fmtRoot
//     ---  ---------------------------------------------------
       } // eof getRoot
//---- -------------------------------------------------------------------


// BEGINNING OF FETCHES (= MENU NAME)

//=login===================================================================
//-(Login)-----------------------------------------------------------------

this.getLogin = function( ) {

  var  aRoute = '/login'

  pApp.get( `${aAPI_Host}${aRoute}`, async ( pReq, pRes ) => onGetRoute( pReq, pRes, aRoute, { id: /[0-9]+/ }, fmtSQL ) )
       sayMsg( 'get', aRoute )

//          ---------------------------------------------------

function  fmtSQL( pArgs ) {
  return  ` SELECT * FROM login_check_view WHERE Id = ${ pArgs.id } `


    }; // eof fmtSQL
//     ---  ---------------------------------------------------
  } // eof getLogin
//---- -------------------------------------------------------------------
//========================================================================



//=meetings================================================================
//-(Meeting Notification)--------------------------------------------------

this.getMeetings = function( ) {

  var  aRoute = '/meetings'

  pApp.get( `${aAPI_Host}${aRoute}`, async ( pReq, pRes ) => onGetRoute( pReq, pRes, aRoute, { id: /[0-9]+/ }, fmtSQL ) )
       sayMsg( 'get', aRoute )

//          ---------------------------------------------------

function  fmtSQL( pArgs ) {
return  ` SELECT * FROM meetings_view `

    }; // eof fmtSQL
//     ---  ---------------------------------------------------
  } // eof getmeetings
//---- -------------------------------------------------------------------
//========================================================================



//=members=================================================================
//-(Members Listing)-------------------------------------------------------

this.getMembers = function( ) {

  var  aRoute = '/members'

  pApp.get( `${aAPI_Host}${aRoute}`, async ( pReq, pRes ) => onGetRoute( pReq, pRes, aRoute, { id: /[0-9]+/ }, fmtSQL ) )
       sayMsg( 'get', aRoute )

//          ---------------------------------------------------

function  fmtSQL( pArgs ) {
return  ` SELECT * FROM members_view `

    }; // eof fmtSQL
//     ---  ---------------------------------------------------
  } // eof getMembers
//---- -------------------------------------------------------------------
//========================================================================



//=members_bios============================================================
//-(Bios)------------------------------------------------------------------

this.getMembersBios = function( ) {

  var  aRoute = '/members_bios'

  pApp.get( `${aAPI_Host}${aRoute}`, async ( pReq, pRes ) => onGetRoute( pReq, pRes, aRoute, { id: /[0-9]+/ }, fmtSQL ) )
       sayMsg( 'get', aRoute )

//          ---------------------------------------------------

function  fmtSQL( pArgs ) {
return  ` SELECT * FROM members_bios_view `

    }; // eof fmtSQL
//     ---  ---------------------------------------------------
  } // eof getMembersBios
//---- -------------------------------------------------------------------
//========================================================================



//=members_projects========================================================
//-(Project Listing)-------------------------------------------------------

this.getMembersProjects = function( ) {

  var  aRoute = '/members_projects'

  pApp.get( `${aAPI_Host}${aRoute}`, async ( pReq, pRes ) => onGetRoute( pReq, pRes, aRoute, { id: /[0-9]+/ }, fmtSQL ) )
       sayMsg( 'get', aRoute )

//          ---------------------------------------------------

function  fmtSQL( pArgs ) {
return  ` SELECT * FROM members_projects_view `

    }; // eof fmtSQL
//     ---  ---------------------------------------------------
  } // eof getMembersProjects
//---- -------------------------------------------------------------------



//=projects================================================================
//-(Project Details)-------------------------------------------------------

this.getProjects = function( ) {

  var  aRoute = '/projects'

  pApp.get( `${aAPI_Host}${aRoute}`, async ( pReq, pRes ) => onGetRoute( pReq, pRes, aRoute, { id: /[0-9]+/ }, fmtSQL ) )
       sayMsg( 'get', aRoute )

//          ---------------------------------------------------

function  fmtSQL( pArgs ) {
return  ` SELECT * FROM members_projects_colaboration_view `

    }; // eof fmtSQL
//     ---  ---------------------------------------------------
  } // eof getProjects
//---- -------------------------------------------------------------------
//========================================================================


//=user===================================================================
//-(user)-----------------------------------------------------------------

this.getUser = function( ) {

  var  aRoute = `/user`

  pApp.get( `${aAPI_Host}${aRoute}`, async ( pReq, pRes ) => onGetRoute( pReq, pRes, '/user', { id: /[0-9]+/ }, fmtSQL ) )
       sayMsg( 'get', aRoute )

//          ---------------------------------------------------

function  fmtSQL( pArgs ) {
  return  ` SELECT * FROM members_view WHERE Id = ${ pArgs.id } `

    }; // eof fmtSQL
//     ---  ---------------------------------------------------
  } // eof getUser
//---- -------------------------------------------------------------------
//========================================================================

//END OF FETCHES





// NOT NEEDED  ??????

//------------------------------------------------------------------------------

  this.getProjectCollaborators = function( ) {

       var  aRoute    = '/project_colaborators'
       var  pValidArgs=  { id: /[0-9]+/ }
//          ---------------------------------------------------

       pApp.get( `${aAPI_Host}${aRoute}`, async function( pReq, pRes ) {

                         sayMsg(  pReq, 'get', aRoute )
       var  pArgs     =  chkArgs( pReq, pRes,  pValidArgs  ); if (!pArgs) { return }
       var  aSQL      =  fmtSQL(  pArgs )
       var  mRecs     =  await getData( pDB,   aSQL  );
                         sndRecs( pRes, mRecs, aSQL, aRoute )

            } )   // eof pApp.get( /project_colaborators )
                         sayMsg( 'get', aRoute )
//          ---------------------------------------------------

  function  fmtSQL( pArgs ) {
        var nId       =  pArgs.id || 0
        var aSQL      = `
              SELECT  Distinct *
                FROM  members_projects_view
     ${ nId ? `WHERE  ProjectId = ${ nId }` : `` } `
     return aSQL
            }; // eof fmtSQL
//     ---  ---------------------------------------------------
       } // eof getProjectCollaborators
//---- -------------------------------------------------------------------

//------------------------------------------------------------------------------


//------------------------------------------------------------------------------

  this.getProjectCollaboratorsLetters = function( aGetRoute ) {

       var  aRoute    = '/project_collaborators_letters'

            setRoute(   'get', aRoute, fmtSQL )

//          ---------------------------------------------------

  function  fmtSQL( pArgs ) {

    return  ` SELECT  Distinct substr(LastName,1,1) as Letter
                FROM  members_projects_view
            ORDER BY  1 `

         }; // eof fmtSQL
//     ---  ---------------------------------------------------
       } // eof getProjectCollaboratorsLetters
//---- -------------------------------------------------------------------

// END OF NOT NEEDED




  function  setRoute( aMethod, aRoute_, pValidArgs, fmtSQL ) {

       var  aRoute   = `${aAPI_Host}${aRoute_}`
            fmtSQL   =  fmtSQL ? fmtSQL : pValidArgs

    switch (aMethod) {
      case 'get'   : pApp.get(    aRoute, async function( pReq, pRes )    { onGetRoute(    pReq, pRes, aRoute, pValidArgs, fmtSQL ) } ); break
      case 'post'  : pApp.post(   aRoute, async function( pReq, pRes )    { onPostRoute(   pReq, pRes, aRoute, pValidArgs, fmtSQL ) } ); break
      case 'put'   : pApp.put(    aRoute, async         ( pReq, pRes ) => { onPutRoute(    pReq, pRes, aRoute, pValidArgs, fmtSQL ) } ); break
      case 'delete': pApp.delete( aRoute, async         ( pReq, pRes ) => { onDeleteRoute( pReq, pRes, aRoute, pValidArgs, fmtSQL ) } ); break
//    case 'patch' : pApp.patch(  aRoute, xController ); break
        default    : null
            }
            sayMsg( 'get', aRoute_ )
     }
//---- -------------------------------------------------------------------

  async function  onGetRoute( pReq, pRes, aRoute, pValidArgs, fmtSQL ) {

                         sayMsg(  pReq, 'get', aRoute )
       var  pArgs     =  chkArgs( pReq, pRes,  pValidArgs  ); if (!pArgs) { return }
       var  aSQL      =  fmtSQL(  pArgs )
       var  mRecs     =  await getData( pDB,   aSQL  );
                         sndRecs( pRes, mRecs, aSQL, aRoute )

            } // eof pApp.get( /{aGetRoute}, onGetRoute )
//---- -------------------------------------------------------------------

  this.init  = function( pApp_, bQuiet_ ) {
            pApp  =  pApp_  // express()
      var { pDB_,    aAPI_Host_, bQuiet_ } = init( pApp, pDB_Config, bQuiet_ );  // no workie without var, and must returned vars must be underlined
//          pDB   =  pDB_; aAPI_Host = aAPI_Host_, bQuiet = bQuiet_              // but only works for objects, not "singleton"s. Probably not true, just a theory
            pDB   =  pDB_; aAPI_Host = aAPI_Host_                                // and must use underlined vars to reset globals
       }
//     -------------------------------------------------------------

  this.start = function( nPort ) { start( pApp, nPort, aAPI_Host ) }

//     -------------------------------------------------------------
    }
//  --------------------------------------------------------------------------

    export { IODD }
