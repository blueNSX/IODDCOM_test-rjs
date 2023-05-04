//---------------------------------------------------------------------------------------------------

aTests='live in Browser'
//     aTests='test1 fetch iodd.com/client3/c33_home-wi-mysql-api'
//     aTests='test1 fetch formr.net/home'
//       aTests='test2 fetch /members'

  var  aHeadRow = `<tr class="head-row"><td>Date</td><td>Email</td><td>Phone / Mobile</td></tr>`

  if ( aTests.match( /test/ ) ) {   
  var  fetch = require( 'node-fetch' )   // not required in Node v17.5+
       }
 //---------------------------------------------------------------------------------------------------
      
  if ( aTests.match( /test1/ ) ) { 

//     var  pJSON    =  parseJSON( '../json/db.json.js' )   // replaced by fetch api 
//     var  aHTML    =  fmtMeetings(  pJSON )

    fetch( 'http://formr.net/home' )
           .then( res => res.text( ) )
           .then( text => console.log( text ) )     
            } // eof test1
//---------------------------------------------------------------------------------------------------

if ( aTests.match( /test2/ ) ) { 
     
    fetch( 'http://localhost:3001/meetings?recs=5' )
           .then( ( res  ) => res.json( ) )
           .then( ( json ) => onFetch( json ) )
           .catch(( err  ) => console.log( `** ${err.message}` ) );
                
  function  onFetch( pJSON ) {
       var  aHTML    =  fmtMeetings( pJSON )
            console.log( aHTML )   
            } // eof onFetch 
     
        } // eof test2
//---------------------------------------------------------------------------------------------------

function  fmtMeetings( pJSON ) {  

//     var  mMeetings =  pJSON.meetings   // .(30209.01.6 RAM As is      defined in db.json)
       var  mMeetings =  pJSON.meetings   // .(30209.01.6 RAM As is  now defined in /projects api)
//     var  mMeetings =  pJSON            // .(30209.01.6 RAM As     was defined in /projects api)

       var  aHTML  =  mMeetings.map( fmtMeeting ).join( "\n" )
//     var  aHTML  =  mMembers.sort(sortitem).map( fmtMember ).join( "\n" )
//     var  mHTMLs=[];  mMembers.forEach( ( pMember, i ) => { fmtMember( pMember, i ) } ); aHTML = mHTMLs.join( "\n" ) 
    return  aHTML            
//     ---  -------  =  -----------------------------------

  function  fmtMeeting( pMeeting, i ) {

       var  aClass = i % 2 == 1 ? "row-even" : "row-odd"
//     var  aClass = "class=row-" + ( i % 2 ? "even" : "odd" )
//     var  aClass = ( `class="row-even"` )

       var aMeetingDate =    pMeeting.strMeetingDate
       var aMeetingTime =    pMeeting.strMeetingTime
       var aHost        =    pMeeting.Host
       var aHostPhone   =    pMeeting.HostPhone
       var aHostEmail   =    pMeeting.HostEmail
       var aLocation    =    pMeeting.Location
       var aAgenda      =    pMeeting.Agenda
       var aDescription =    pMeeting.Description
       var  aRow     = `  
       		<tr>
                 <td class="head-date">Date/Time:</td><td class="meeting-date">${ aMeetingDate } / ${ aMeetingTime }</td>
               </tr>
               <tr>
                 <td class="head-location">Location:</td><td class="location">${ aLocation }</td>
               </tr>
               <tr>
                    <td class="head-host">Host:</td><td class="host">${ aHost }</td>
               </tr>
                    <td class="head-phone">Phone:</td><td class="phone">${ aHostPhone }</td>
               <tr>
                    <td class="head-email">Email:</td><td class="email"><a href="mailto:${ aHostEmail }">${ aHostEmail }</a></td>
               </tr>
               <tr>
                    <td class="head-agenda">Agenda</td><td class="agenda">${ aAgenda }</td>
               </tr>               
               </table></div>
               <div class="desc-div"><table class="desc-table">
                    <tr><td class="desc" colspan="2">${ aDescription }</td></tr>
               </table></div>               
               `

//          mHTMLs.push( aRow )                  
     //aData = aHeadRow + aRow
     aData = aRow
     return aData
            }   // eof  fmtMeeting
//     ---  -------  =  ----------------------------------
            }   // eof  fmtMeetings
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

