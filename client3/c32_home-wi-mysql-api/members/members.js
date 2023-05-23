//---------------------------------------------------------------------------------------------------

aTests='live in Browser'
//     aTests='test1 fetch iodd.com/client3/c33_home-wi-mysql-api'
//     aTests='test1 fetch formr.net/home'
//       aTests='test2 fetch /members'

  var  aHeadRow = `<tr class="head-row"><td>Name</td><td>Email</td><td>Phone / Mobile</td></tr>`

  if ( aTests.match( /test/ ) ) {   
  var  fetch = require( 'node-fetch' )   // not required in Node v17.5+
       }
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
     
    fetch( 'http://localhost:3013/members?recs=5' )
           .then( ( res  ) => res.json( ) )
           .then( ( json ) => onFetch( json ) )
           .catch(( err  ) => console.log( `** ${err.message}` ) );      
                
  function  onFetch( pJSON ) {
       var  aHTML    =  s( pJSON )
            console.log( aHTML )   
            } // eof onFetch 
     
        } // eof test2
//---------------------------------------------------------------------------------------------------

function  fmtMembers( pJSON ) {  

//     var  mMembers =  pJSON.members    // .(30209.01.2 RAM As is      defined in db.json)
       var  mMembers =  pJSON.members    // .(30209.01.2 RAM As is  now defined in /projects api)
//     var  mMembers =  pJSON            // .(30209.01.2 RAM As     was defined in /projects api)

       var  aHTML  =  mMembers.map( fmtMember ).join( "\n" )
//     var  aHTML  =  mMembers.sort(sortitem).map( fmtMember ).join( "\n" )
//     var  mHTMLs=[];  mMembers.forEach( ( pMember, i ) => { fmtMember( pMember, i ) } ); aHTML = mHTMLs.join( "\n" ) 
    return  aHTML            
//     ---  -------  =  -----------------------------------

  function  fmtMember( pMember, i ) {

       var  aClass = i % 2 == 1 ? "row-even" : "row-odd"
//     var  aClass = "class=row-" + ( i % 2 ? "even" : "odd" )
//     var  aClass   =   (  `class="row-even"` )

       var  aMI      =     pMember.Middlename;  aMI = ( aMI  > "" ) ?   ` ${ aMI.substr(0,1) }. ` : ""
       var  aName    = `${ pMember.FirstName }${aMI} ${ pMember.LastName }`
       var  aFullName =    pMember.FullName
       var  aLastName =    pMember.LastName
       var  aBookmark =    aLastName.substring(0,1)
//     var  aPhone   =     pMember.Phone1 + ( pMember.Phone2 > ""   ? `, ${ pMember.Phone2  }` : "" )
//          aPhone   =     aPhone != "null" ? aPhone : ""
       var  aPhone1  =     pMember.Phone1
            aPhone1  =     aPhone1 != null ? aPhone1 : ""
       var  aPhone2  =     pMember.Phone2
            aPhone2  =     aPhone2 != null ? aPhone2 : ""
       var  aEmail   =     pMember.Email

       var  aRow     = `  
       		<tr Class="${ aClass }" id="R${ `${ i + 1 }`.padStart( 3, "0" ) }">
                 <td class="name" id="${ aBookmark }">${ aFullName }</td>
                 <td class="email"><a href="mailto:${ aEmail }"><img class="email-image" src="../assets/images/Email.gif"></a></td>
                 <td class="phone1">${ aPhone1 }</td>
                 <td class="phone2">${ aPhone2}</td>
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

// function sortitem(a,b) {
// 	return (a.LastName + a.FirstName) > (b.LastName + b.FirstName) ? 1 : -1
// 	}
//---------------------------------------------------------------------------------------------------

