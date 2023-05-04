//---------------------------------------------------------------------------------------------------
 
aTests='live in Browser'
//     aTests='test1 in NodeJS'

  if ( aTests.match( /test1/ ) ) { 

       var  pJSON    =  parseJSON( '../json/db_v2.json.js' )
       var  aHTML    =  fmtMembersProjectsMobile(  pJSON )

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
       
      fetch( 'http://localhost:3001/members-projects?recs=5' )
             .then( ( res  ) => res.json( ) )
             .then( ( json ) => onFetch( json ) )
             .catch(( err  ) => console.log( `** ${err.message}` ) );      
                  
    function  onFetch( pJSON ) {
         var  aHTML    =  fmtMembersProjectsMobile( pJSON )
              console.log( aHTML )   
              } // eof onFetch 
       
          } // eof test2
  //---------------------------------------------------------------------------------------------------
  
function  fmtMembersProjectsMobile( pJSON ) {     

//     var  mMembers_projects =  pJSON.members_projects    // .(30209.01.5 RAM As is      defined in db.json) 
       var  mMembers_projects =  pJSON.members_projects    // .(30209.01.5 RAM As is  now defined in /projects api) 
//     var  mMembers_projects =  pJSON                     // .(30209.01.5 RAM As     was defined in /projects api)

//       var  aHTML    =  mMembers_projects.map( fmtMember ).join( "\n" )
//       var  aHTML    =  mMembers_projects.sort(sortitem).map( fmtMemberProject ).join( "\n" )
         var  aHTML    =  mMembers_projects.map( fmtMemberProjectMobile ).join( "\n" )
//       var  mHTMLs=[];  mMembers_projects.forEach( ( pMember, i ) => { fmtMember( pMember, i ) } ); aHTML = mHTMLs.join( "\n" ) 
    return  aHTML
            
//     ---  -------  =  -----------------------------------

  function  fmtMemberProjectMobile( pMember, i ) {

       var  aClass = i % 2 == 1 ? "row-even" : "row-odd"
//     var  aClass = "class=row-" + ( i % 2 ? "even" : "odd" )
//     var  aClass   =   (  `class="row-even"` )

       var  aMI        =     pMember.Middlename;  aMI = ( aMI  > "" ) ?   ` ${ aMI.substr(0,1) }. ` : ""
       var  aNameBR    = `${ pMember.FirstName }${aMI} <br> ${ pMember.LastName }`
       var  aName      = `${ pMember.FirstName }${aMI} ${ pMember.LastName }`
       var  aLastName  =     pMember.LastName
//     var  aFullNameBR =    pMember.FullNameBR
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
       var  aRow       =  `

       <!--<tr Class="${ aClass }" id="R${ `${ i + 1 }`.padStart( 3, "0" ) }">-->

       <div class="members-projects-mobile">
       <table class="main-table-mobile">
           <tr>
             <td id="${ aBookmark }" colspan="3" valign="top" align="center">
               <table class="${ aStyle }" cellspacing="0" cellpadding="0" align="center" width="110%">
                   <tr>
                       <!--NAME-->
                       <td class="members-name-mobile">${ aNameBR }</td>
                       <!--ADDRESS, PHONE, EMAIL-->
                       <td>
                           <table class="members-address-mobile" align="center">
                             <tr><td>${ aAddress }</td></tr>
                             <tr><td>${ aCity }, ${ aState } ${ aZip }</td></tr>
                             <tr><td>${ aPhone1 }</td></tr>
                             <tr><td><a href="http://${ aEmail }">Email</a>&nbsp;<a href="http://${ aEmail }"><img src="../assets/images/Email.gif"></a></td></tr>
                           </table>
                       </td>
                       <td class="members-mobile-col3">&nbsp;</td>
                   </tr>
                   <tr>
                       <!--BIO-->
                       <td colspan="3" valign="top">
                        <table class="members-bio-table-mobile" ><tr><td>
                        <span class="members-bio-title-mobile">Bio:<br></span>
                        <span class="members-bio-mobile">${ aBio }</span>
                        </td></tr></table>
                       </td>

                       </tr>
                   <tr><td>&nbsp;</td></tr>          
                   <tr>
                       <td class="project-title-mobile" colspan="3">Project(s):</td>
                   </tr>
                   <tr>
                       <td colspan="3"><span class="project-title-line-mobile"><hr></span></td>
                   </tr>
               </table>
               <!--END TABLE STARTING ON LINE 67-->
             </td>
           </tr>
            <table class="project-table-mobile">
              <tr>
                <td>
                <table class="project-table">
                  <tr>
                    <td align="right" valign="top">Project:&nbsp;&nbsp;</td><td valign="bottom"><span class="project-name-mobile">${ aProjName }</span></td>
                  </tr>
                  <tr>
                    <td align="right" valign="top">Owner:&nbsp;&nbsp;</td><td valign="bottom">${ aClient }</td>
                  </tr>
                  <tr>
                    <td align="right" valign="top">Owner's Web:&nbsp;&nbsp;</td><td valign="bottom"><a href="${ aClientWeb }" target="_blank">${ aClientWeb }</a></td>
                  </tr>
                  <tr>
                    <td align="right" valign="top">Dates:&nbsp;&nbsp;</td><td valign="bottom">${ aDates }</td>
                  </tr>
                  <tr>
                    <td align="right" valign="top">Location:&nbsp;&nbsp;</td><td valign="bottom">${ aLocation }</td>
                  </tr>
                  <tr>
                    <td align="right" valign="top">Role:&nbsp;&nbsp;</td><td valign="bottom">${ aRole }</td>
                  </tr>
                  <tr>
                    <td align="right" valign="top">Duration:&nbsp;&nbsp;</td><td valign="bottom">${ aDuration }</td>
                  </tr>
                  <tr>
                    <td align="right" valign="top">Type:&nbsp;&nbsp;</td><td valign="bottom">${ aProjType }</td>
                  </tr>
                <table>
                  <span class="project-title-line-mobile"><hr></span>
                </td>
              </tr>
            </table>
           <tr class="project-details-row-mobile">        
             <td class="project-details-td-mobile" colspan="3"><span class="project-details-mobile">${ aDescription }</span></td>
           </tr>
           <tr><td colspan="4"><hr></td></tr>
       </table>
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

