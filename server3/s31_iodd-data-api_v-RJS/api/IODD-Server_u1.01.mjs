//  --------------------------------------------------------------------------

import  express from  'express';

import { chkArgs, sndHTML, getData, sndRecs } from './assets/mjs/server-fns_u1.01.mjs';
import { init, start, sayMsg                } from './assets/mjs/server-fns_u1.01.mjs';

//--------  -----------------------------------------------------------------------------

if (process.argv[1].replace( /.*[\\/]/, '' ).match( /IODD.*\.mjs/ )) {

   var  pApp      =  express()
   var  bQuiet // =  true        // Override .env Quiet = {true|false}
   var  nPort     =  54131       // Override .env Server_Port

   var  pIODD     =  new IODD
        pIODD.init(  pApp, bQuiet )

        pIODD.getRoot( "/" )
        pIODD.getLogin( )
        pIODD.addLogin( )
        pIODD.getMembers( )
        pIODD.getMembersBios( )
        pIODD.getProjects( )
//      pIODD.getProjectCollaborators( )
        pIODD.getMembersProjects( )
//      pIODD.getProjectCollaboratorsLetters( '/letters' )
        pIODD.getMeetings( )
        pIODD.getUsers( )
        pIODD.getUser( )

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
            <a href="/login?id=90"                  >/login?id=90</a><br>
            <a href="/meetings"                     >/meetings</a><br>
            <a href="/members"                      >/members</a><br>
            <a href="/members_bios"                 >/members_bios</a><br>
            <a href="/members_projects"             >/members_projects</a><br>
            <a href="/projects"                     >/projects</a><br>
            <a href="/users"                        >/users</a><br>         <!-- .(30328.03.1 Add Users) -->
            <a href="/user?id=7"                    >/user?id=7</a><br>
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

      setRoute( 'get', '/login', { id : /[0-9]+/ }, fmtSQL )

  function  fmtSQL( pArgs ) {
    return  ` SELECT * FROM login_check_view WHERE Id = ${ pArgs.id } `
            }; // eof fmtSQL
//     ---  ---------------------------------------------------
         }; // eof getLogin
//---- -------------------------------------------------------------------

//-(addLogin)-------------------------------------------------------------

  this.addLogin  =  function( ) {                                      // .(30328.06.1 Add addLogin)

       var  pValidRoutes = { id : /[0-9]+/ }

            setRoute( 'post', '/login', pValidRoutes, fmtSQL )

  function  fmtSQL( pArgs ) {
    return  ` INSERT INTO Logins
               ( Id = '${ pArgs.id }'
            `
            }; // eof fmtSQL
//     ---  ---------------------------------------------------
         }; // eof addLogin
//---- -------------------------------------------------------------------

//========================================================================


//=meetings================================================================
//-(Meeting Notification)--------------------------------------------------

  this.getMeetings = function( ) {

            setRoute( 'get', '/meetings', `SELECT * FROM meetings_view` )

         }; // eof getmeetings
//---- -------------------------------------------------------------------
//========================================================================


//=members=================================================================
//-(Members Listing)-------------------------------------------------------

  this.getMembers = function( ) {

            setRoute( 'get', '/members', `SELECT * FROM members_view` )

         }; // eof getMembers
//---- -------------------------------------------------------------------
//========================================================================


//=members_bios============================================================
//-(Bios)------------------------------------------------------------------

this.getMembersBios = function( ) {

            setRoute( 'get', '/members_bios', `SELECT * FROM members_bios_view` )

         }; // eof getMembersBios
//---- -------------------------------------------------------------------
//========================================================================


//=members_projects========================================================
//-(Project Listing)-------------------------------------------------------

this.getMembersProjects = function( ) {

            setRoute( 'get', '/members_projects', `SELECT * FROM members_projects_view` )

         }; // eof getMembersProjects
//---- -------------------------------------------------------------------


//=projects================================================================
//-(Project Details)-------------------------------------------------------

this.getProjects = function( ) {

//          setRoute( 'get', '/projects', `SELECT * FROM members_projects_collaboration_view` )  //#.(30329.05.01 RAM Corrent spelling)
            setRoute( 'get', '/projects', `SELECT * FROM members_projects_colaboration_view`  )  // .(30329.05.01 RAM Only one l)
//          setRoute( 'get', '/projects', `SELECT * FROM members_projects_view` )                //#.(30329.05.01 RAM Can we use this?)

         }; // eof getProjects
//---- -------------------------------------------------------------------
//========================================================================


//=    User   ============================================================
//-(getUser)--------------------------------------------------------------

 this.getUser = function( ) {

            setRoute( 'get', '/user', { id : /[0-9]+/ }, ( pArgs ) => { 

    return `SELECT * FROM users WHERE Id = ${ pArgs.id } `
            } );
         }; // eof getUser
//---- -------------------------------------------------------------------

//-(getUsers)-------------------------------------------------------------

  this.getUsers = function( ) {                                       // .(30328.04.1 Beg RAM Add getUsers)

            setRoute( 'get', '/users', `SELECT * FROM users ` )

          } // eof getUsers                                            // .(30328.04.1 End)

//-(addUser)-----------------------------------------------------------------

this.addUser  =  function( ) {                                      // .(30328.05.1 Beg RAM Add addUser)

       var  aRoute = `/user`
       var  pValidRoutes =
              { id       : /[0-9]+/
              , name     : /[a-zA-Z]+/
                }

            setRoute( 'post', aRoute, fmtSQL, pValidRoutes )

  function  fmtSQL( pArgs ) {
    return  ` INSERT INTO  members_view
                        (  Name = '${ pArgs.name }'
            `
            }; // eof fmtSQL
//     ---  ---------------------------------------------------
         } // eof addUser                                           // .(30328.05.1 End)
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




//function  setRoute( aMethod, aRoute_, fmtSQL, pValidArgs ) {                //#.(30328.02.1 RAM Switch Args)
  function  setRoute( aMethod, aRoute_, pValidArgs, fmtSQL_ ) {               // .(30328.02.1 RAM Don't switch Args)

   var  aRoute     = `${aAPI_Host}${aRoute_}`
   var  fmtSQL     = (typeof(fmtSQL_) != 'undefined') ? fmtSQL_ : pValidArgs
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

async function  onGetRoute( pReq, pRes, aRoute, pValidArgs, fmtSQL ) {
       onRoute( 'get', pReq, pRes, aRoute, pValidArgs, fmtSQL )
       } // eof onGetRoute
//---- -------------------------------------------------------------------

async function  onPostRoute( pReq, pRes, aRoute, pValidArgs, fmtSQL ) {
      onRoute( 'post', pReq, pRes, aRoute, pValidArgs, fmtSQL )
       } // eof onGetRoute
//---- -------------------------------------------------------------------

async function  onRoute( aMethod, pReq, pRes, aRoute, pValidArgs, fmtSQL ) {

                     sayMsg(  pReq, aMethod, aRoute )
   var  pArgs     =  chkArgs( pReq, pRes, pValidArgs ); if (!pArgs) { return }
   var  aSQL      =  typeof( fmtSQL ) == 'string' ? fmtSQL : fmtSQL(  pArgs )
   var  mRecs     =  await getData( pDB,   aSQL  );
                     sndRecs( pRes, mRecs, aSQL, aRoute )

        } // eof onGetRoute
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
