//---------------------------------------------------------------------------------------------------
 
aTests='live in Browser'
//     aTests='test1 in NodeJS'

  if ( aTests.match( /test1/ ) ) { 

       var  pJSON    =  parseJSON( '../json/db_v2.json.js' )
       var  aHTML    =  fmtMembersProjectsLaptop(  pJSON )

            console.log( aHTML )
            }

//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
      
if ( aTests.match( /test1/ ) ) { 

  //     var  pJSON    =  parseJSON( '../json/db.json.js' )   // replaced by fetch api 
  //     var  aHTML    =  fmtMembers(  pJSON )
  
      fetch( 'http://formr.net/home' )
             .then( res => res.text( ) )
             .then( text => console.log( text ) )     
              } // eof test1
  //---------------------------------------------------------------------------------------------------
  
if ( aTests.match( /test2/ ) ) { 
       
      fetch( 'http://localhost:3013/members-projects?recs=5' )
             .then( ( res  ) => res.json( ) )
             .then( ( json ) => onFetch( json ) )
             .catch(( err  ) => console.log( `** ${err.message}` ) );      
                  
    function  onFetch( pJSON ) {
         var  aHTML    =  fmtMembersProjectsLaptop( pJSON )
              console.log( aHTML )   
              } // eof onFetch 
       
          } // eof test2
  //---------------------------------------------------------------------------------------------------
  
function  fmtMembersProjectsLaptop( pJSON ) {     

//       var  mMembers_projects =  pJSON.members_projects    // .(30209.01.4 RAM As is      defined in db.json) 
         var  mMembers_projects =  pJSON.members_projects    // .(30209.01.4 RAM As is  now defined in /projects api) 
//       var  mMembers_projects =  pJSON                     // .(30209.01.4 RAM As     was defined in /projects api)

//       var  aHTML    =  mMembers_projects.map( fmtMember ).join( "\n" )
//       var  aHTML    =  mMembers_projects.sort(sortitem).map( fmtMemberProjectLaptop ).join( "\n" )
         var  aHTML    =  mMembers_projects.map( fmtMemberProjectLaptop ).join( "\n" )
//       var  mHTMLs=[];  mMembers_projects.forEach( ( pMember, i ) => { fmtMember( pMember, i ) } ); aHTML = mHTMLs.join( "\n" ) 
    return  aHTML
            
//     ---  -------  =  -----------------------------------

  function  fmtMemberProjectLaptop( pMember, i ) {

       var  aClass = i % 2 == 1 ? "row-even" : "row-odd"
//     var  aClass = "class=row-" + ( i % 2 ? "even" : "odd" )
//     var  aClass   =   (  `class="row-even"` )

       var  aMI        =     pMember.Middlename;  aMI = ( aMI  > "" ) ?   ` ${ aMI.substr(0,1) }. ` : ""
       var  aNameBR    = `${ pMember.FirstName }${aMI} <br> ${ pMember.LastName }`
       var  aName      = `${ pMember.FirstName }${aMI} ${ pMember.LastName }`
       var  aLastName  =     pMember.LastName
       var  aFullNameBR =    pMember.FullNameBR
       var  aBookmark  =     aLastName.substring(0,1)
//     var  aPhone     =     pMember.Phone1 + ( pMember.Phone2 > ""   ? `, ${ pMember.Phone2  }` : "" )
//          aPhone     =     aPhone != "null" ? aPhone : ""
       var  aPhone1    =     pMember.Phone1
            aPhone1    =     aPhone1 != null ? aPhone1 : ""
       var  aPhone2    =     pMember.Phone2
            aPhone2    =     aPhone2 != null ? aPhone2 : ""
       var  aEmail     =     pMember.Email
       var  aAddress   =     pMember.Address1
       var  aCity      =     pMember.City
       var  aState     =     pMember.State
       var  aZip       =     pMember.Zip
       var  aProjName  =     pMember.ProjectName
       var  aClient    =     pMember.Client
       var  aClientWeb =     pMember.ClientWeb
       var  aLocation  =     pMember.Location
       var  aProjType  =     pMember.ProjectType
       var  aStyle     =     pMember.Style
       var  aRole      =     pMember.Role
       var  aDates     =     pMember.Dates
       var  aDuration  =     pMember.Duration
       var  aBio       =     pMember.Bio
       var  aDescription =   pMember.Description
       var  aSort      =     pMember.Sort
       var  aRow       = `

       <tr Class="${ aClass }" id="R${ `${ i + 1 }`.padStart( 3, "0" ) }">
       
       <div class="members-projects">
       <table class="main-table">
       <tbody>
          <tr>
          <td id="${ aBookmark }" colspan="3" valign="top" align="center">
           <table class="${ aStyle}" cellspacing="0" cellpadding="10" align="left">
             <tbody>
            <tr><td colspan="4" class="member-line"><hr></td></tr>
             <tr>
               <td class="members-name">${ aFullNameBR }</td>
               <td class="members-bio" rowspan="2" valign="top">
                <table class="members-bio-table"><tr><td>
                    <span class="member-bio-title">Bio:</span><br><br>${ aBio }
                </td></tr></table>
               </td>
             </tr>
             <tr>
               <td>
                 <table class="members-address" width="100%" cellspacing="0" cellpadding="0" align="center">
                   <tbody>
                   <tr><td>${ aAddress }</td></tr>
                   <tr><td>${ aCity }, ${ aState } ${ aZip }</td></tr>
                   <tr><td>${ aPhone1}</td></tr>
                   <tr><td><a href="mailto:${ aEmail }" title="Email ${ aName}">Email</a> <a href="mailto:${ aEmail }"><img class="email-image" src="../assets/images/Email.gif"></a></td></tr>
                 </tbody></table>
               </td>
             </tr>
             <tr><td class="project-title" colspan="4">Project(s):&nbsp;<hr></td></tr>
           </tbody>
           </table>
         <tr>
            <td> &nbsp; </td>
         </tr>          
       <tr>
       <td width="45%" valign="top">
         <table class="project-summary">
           <tbody>
                <tr><td valign="top">Project: <span class="ProjName">${ aProjName }</span></td></tr>
             <tr><td valign="top">Owner: ${ aClient }</td></tr>                     
             <tr><td valign="top">Owner Web: <a href="${ aClientWeb }">${ aClientWeb }</a></td></tr>
             <tr><td valign="top">Dates: ${ aDates }</td></tr>        
             <tr><td valign="top">Location: ${ aLocation }</td></tr>
             <tr><td valign="top">Role: ${ aRole }</td></tr>
             <tr><td valign="top">Duration: ${ aDuration }</td></tr>
             <tr><td valign="top">Type: ${ aProjType }</td></tr>
           </tbody>
         </table>
       </td>         
       <td class="project-details" >${ aDescription }</td>
       </tr>
             <tr><td colspan='4' class="project-line"><hr></td></tr>
       </tbody>
       </div>`

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

// function sortitem(a,b) {
//      var aSort = String(51 - a.Sort).padStart(2,"0")
// 	return (a.LastName + a.FirstName + aSort) > (b.LastName + b.FirstName + aSort) ? 1 : -1
// 	}
//---------------------------------------------------------------------------------------------------

