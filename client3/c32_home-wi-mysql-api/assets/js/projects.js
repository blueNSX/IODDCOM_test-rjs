//---------------------------------------------------------------------------------------------------

       aTests   = 'live in Browser'
//     aTests   = 'test1 fetch iodd.com/client3/c33_home-wi-mysql-api'
//     aTests   = 'test1 fetch formr.net/home'
//     aTests   = 'test2 fetch /projects'

  var  aHeadRow = `<tr class="head-row"><td>Name</td><td>Email</td><td>Phone / Mobile</td></tr>`

  if ( aTests.match( /test/ ) ) {   
  var  fetch = require( 'node-fetch' )   // not required in Node v17.5+
       }
 //---------------------------------------------------------------------------------------------------
      
  if ( aTests.match( /test1/ ) ) { 

//     var  pJSON    =  parseJSON( '../json/db.json.js' )   // replaced by fetch api 
//     var  aHTML    =  fmtProjects(  pJSON )

    fetch( 'http://formr.net/home' )
           .then( res => res.text( ) )
           .then( text => console.log( text ) )     
            } // eof test1
//---------------------------------------------------------------------------------------------------

if ( aTests.match( /test2/ ) ) { 
     
    fetch( 'http://localhost:3013/projects?recs=5' )
           .then( ( res  ) => res.json( ) )
           .then( ( json ) => onFetch( json ) )
           .catch(( err  ) => console.log( `** ${err.message}` ) );      
                
  function  onFetch( pJSON ) {
       var  aHTML    =  fmtProjects( pJSON )
            console.log( aHTML )   
            } // eof onFetch 
     
        } // eof test2
//---------------------------------------------------------------------------------------------------

function  fmtProjects( pJSON ) {  

//     var  mProjects =  pJSON.Projects   // .(30209.01.1 RAM As is      defined in db.json)
       var  mProjects =  pJSON.projects   // .(30209.01.1 RAM As is  now defined in /projects api)
//     var  mProjects =  pJSON            // .(30209.01.1 RAM As     was defined in /projects api)

       var  aHTML     =  mProjects.map( fmtProject ).join( "\n" )
//     var  aHTML     =  mProjects.sort(sortitem).map( fmtProject ).join( "\n" )
//     var  mHTMLs = []; mProjects.forEach( ( pProject, i ) => { fmtProject( pProject, i ) } ); aHTML = mHTMLs.join( "\n" ) 
    return  aHTML
            
//     ---  -------  =  -----------------------------------

  function  fmtProject( pProject, i ) {

       var  aClass        =  i % 2 == 1 ? "row-even" : "row-odd"
       var  abgColor      =  pProject.ProjectBGColor
       var  aProjectStyle =  pProject.ProjectStyle
       var  aFirstName    =  pProject.FirstName
       var  aLastName     =  pProject.LastName
       var  aName         =  pProject.ProjectName  // .(30214.01.1 RAM Was: pProject.ProjectName)
       var  aBookmark     =  aName.substring(0,1)
       var  aClient       =  pProject.Client
       var  aType         =  pProject.ProjectType
       var  aDesc         =  pProject.Description
       var  iProjID       =  pProject.ProjectId
       var  aMemberNo     =  pProject.MemberNo

       var  aRow          = `
             <tr height="0px" Class="${ aClass } ${ aProjectStyle }" id="R${ `${ i + 1 }`.padStart( 3, "0" ) }">
                <td bgcolor=${abgColor} class="name" id="${ aBookmark }"><br><b><u>Name</u>:</b> ${ aName }</td>
                <td bgcolor=${abgColor} class="client"><br><b><u>Client</u>:</b> ${ aClient }</td>
              </tr>
              <tr Class="${ aClass } ${ aProjectStyle }" id="R${ `${ i + 1 }`.padStart( 3, "0" ) }">
                <td bgcolor=${abgColor} class="type" colspan=2><br><b><u>Type</u>:</b> ${ aType }</td>
              </tr>
              <tr Class="${ aClass } ${ aProjectStyle }" id="R${ `${ i + 1 }`.padStart( 3, "0" ) }">
                <td bgcolor=${abgColor} class="desc" colspan=2><b><u>Description</u>:</b> ${ aDesc }</td>
              </tr>
              <tr Class="${ aClass } ${ aProjectStyle }" id="R${ `${ i + 1 }`.padStart( 3, "0" ) }">
                <td bgcolor=${abgColor} class="colaboratorTitle" colspan=2><b><u>Colaborator(s)</u>:</b></td>
              </tr>
              <tr Class="${ aClass } " id="R${ `${ i + 1 }`.padStart( 3, "0" ) }">
                <td bgcolor=${abgColor} class="memberPrimary" colspan=2>&nbsp;&nbsp; ${ aFirstName }&nbsp;${ aLastName }</td>
              </tr>
              <tr class="ProjectsLastRow"><td bgcolor=${abgColor} colspan=2></td></tr>               
              `               
//          mHTMLs.push( aRow )                  
//          aData = aHeadRow + aRow
            aData = aRow
    return  aData
            }   // eof  fmtProject
//     ---  -------  =  ----------------------------------
            }   // eof  fmtProjects
//--------  -------  =  -------------------------------------------------------

  function  parseJSON(  aFile ) {
       var  pFS      =  require( 'fs' )
       var  aDir     =  __dirname
       var  aText    =  pFS.readFileSync( `${aDir}/${aFile}`, "ASCII" )
            aText    =  aText.replace( //g, "'" )
            aText    =  aText.replace( //g, "'" )

        if (aFile.match( /\.json$/)) {   
       var  pJSON    =  JSON.parse( aText )
            }
        if (aFile.match( /\.js$/)) {   
            eval( aText )    
            }

    return  pJSON
            }   // eof  parseJSON
//--------  -------  =  -------------------------------------------------------

   function  sortitem(a,b) {
     return (a.ProjectName) > (b.ProjectName) ? 1 : -1
  	}
//---------------------------------------------------------------------------------------------------

