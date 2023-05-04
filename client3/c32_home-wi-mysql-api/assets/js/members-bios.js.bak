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
       
      fetch( 'http://localhost:3001/members-bios?recs=5' )
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

         var  mMembers_bios =  pJSON["members_bios"]       // .(30209.01.4 RAM As is  now defined in /projects api) 
         var  aHTML    =  mMembers_bios.map( fmtMemberProjectLaptop ).join( "\n" )
    return  aHTML
            
//     ---  -------  =  -----------------------------------

  function  fmtMemberProjectLaptop( pMember, i ) {

//     var  abgColor = i % 2 == 1 ? "#DCDCDC" : "whitesmoke"
       var  aClass = i % 2 == 1 ? "row-even" : "row-odd"
//     var  aClass = "class=row-" + ( i % 2 ? "even" : "odd" )
//     var  aClass   =   (  `class="row-even"` )

       var  aMI        =     pMember.Middlename;  aMI = ( aMI  > "" ) ?   ` ${ aMI.substr(0,1) }. ` : ""
       var  aNameBR    = `${ pMember.FirstName }${aMI} <br> ${ pMember.LastName }`
       var  aName      = `${ pMember.FirstName }${aMI} ${ pMember.LastName }`
       var  aLastName  =     pMember.LastName
       var  aFullName  =     pMember.FullName
       var  aBio       =     pMember.Bio
       var  aBookmark  =     aLastName.substring(0,1)
       var  aRow       = `

    <tr class="${ aClass }" id="R${ `${ i + 1 }`.padStart( 3, "0" ) }"> 
        <div class="members-bio">
            <table class="main-table">
            <tbody>
                <tr>
                    <td id="${ aBookmark }" class="members-name" colspan="2" width="98%">${ aFullName }</td>
                </tr>
                <tr>
                    <td width="5%"></td>
                    <td class="members-bio" width="93%">${ aBio }</td>
                </tr>
                <tr>
                    <td colspan="2" class="member-line"><hr style="border-top: blue dotted 2px"></td>
                </tr>
            </tbody>
            </table>
        </div>
    </tr>`

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
//---------------------------------------------------------------------------------------------------

