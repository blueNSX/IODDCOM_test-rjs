//---------------------------------------------------------------------------------------------------
 
aTests='live in Browser'
//     aTests='test1 in NodeJS'

  if ( aTests.match( /test1/ ) ) { 

       var  pJSON    =  parseJSON( '../json/db_v2.json.js' )
       var  aHTML    =  fmtProjectsMembers(  pJSON )

            console.log( aHTML )
            }

//---------------------------------------------------------------------------------------------------

function  fmtProjectsMembers( pJSON ) {     

//     var  mMembers_projects =  pJSON.members_projects    // .(30209.01.3 RAM As is      defined in db.json)
       var  mMembers_projects =  pJSON.members_projects    // .(30209.01.3 RAM As is  now defined in /projects api)
//     var  mMembers_projects =  pJSON                     // .(30209.01.3 RAM As     was defined in /projects api)

//       var  aHTML    =  mMembers_projects.map( fmtMember ).join( "\n" )
//       var  aHTML    =  mMembers_projects.sort(sortitem).map( fmtMemberProject ).join( "\n" )
         var  aHTML    =  mMembers_projects.map( fmtProjectsMembers ).join( "\n" )
//       var  mHTMLs=[];  mMembers_projects.forEach( ( pMember, i ) => { fmtMember( pMember, i ) } ); aHTML = mHTMLs.join( "\n" ) 
    return  aHTML
            
//     ---  -------  =  -----------------------------------

  function  fmtProjectsMembers( pMember, i ) {

       var  aClass = i % 2 == 1 ? "row-even" : "row-odd"
//     var  aClass = "class=row-" + ( i % 2 ? "even" : "odd" )
//     var  aClass   =   (  `class="row-even"` )

       var  aMI      =     pMember.Middlename;  aMI = ( aMI  > "" ) ?   ` ${ aMI.substr(0,1) }. ` : ""
       var  aNameBR    = `${ pMember.FirstName }${aMI} <br> ${ pMember.LastName }`
       var  aName    =   `${ pMember.FirstName }${aMI} ${ pMember.LastName }`
//     var  aPhone   =     pMember.Phone1 + ( pMember.Phone2 > ""   ? `, ${ pMember.Phone2  }` : "" )
//          aPhone   =     aPhone != "null" ? aPhone : ""
       var  aPhone1  =     pMember.Phone1
            aPhone1  =     aPhone1 != null ? aPhone1 : ""
       var  aPhone2  =     pMember.Phone2
            aPhone2  =     aPhone2 != null ? aPhone2 : ""
       var  aEmail   =     pMember.Email
       var  aAddress =     pMember.Address1
       var  aCity    =     pMember.City
       var  aState   =     pMember.State
       var  aZip     =     pMember.Zip
       var  aProjName =    pMember.ProjectName
       var  aClient  =     pMember.Client
       var  aClientWeb =   pMember.ClientWeb
       var  aLocation =    pMember.Location
       var  aProjType =    pMember.ProjectType
       var  aStyle    =    pMember.Style
       var  aRole    =     pMember.Role
       var  aDates   =     pMember.Dates
       var  aDuration =    pMember.Duration
       var  aBio     =     pMember.Bio
       var  aDescription = pMember.Description
       var  aSort    =     pMember.Sort
       var  aRow     =     `
    <tr height=0px Class="${ aClass }" id="R${ `${ i + 1 }`.padStart( 3, "0" ) }">
       <td class="name">${ aName }</td>
       <td class="client">${ aClient }</td>
     </tr>
     <tr Class="${ aClass }" id="R${ `${ i + 1 }`.padStart( 3, "0" ) }">
       <td class="type" colspan=2><b><u>Type</u>:</b> ${ aType }</td>
     </tr>
     <tr Class="${ aClass }" id="R${ `${ i + 1 }`.padStart( 3, "0" ) }">
       <td class="desc" colspan=2><b><u>Desc</u>:</b> ${ aDesc }</td>
     </tr>
     <tr Class="${ aClass }" id="R${ `${ i + 1 }`.padStart( 3, "0" ) }">
       <td class="desc" colspan=2><b><u>Member(s)</u>:</b> ${ aName }</td>
     </tr>`               

//          mHTMLs.push( aRow )                  
     //aData = aHeadRow + aRow
     aData = aRow
     return aData
            }   // eof  fmtMember
//     ---  -------  =  ----------------------------------
            }   // eof  fmtMembers
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

function sortitem(a,b) {
     var aSort = String(51 - a.Sort).padStart(2,"0")
	return (aProjectName + a.LastName + a.FirstName) > (bProjectName + b.LastName + b.FirstName) ? 1 : -1
	}
//---------------------------------------------------------------------------------------------------

