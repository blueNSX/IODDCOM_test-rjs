import { setAPI_URL } from '../assets/mjs/formr_utility-fns_u1.07.mjs'
await setAPI_URL ()


//--Welcome function---------------------------------------/  
var pWelcome = document.getElementById( "WelcomeProjectInfo" )
              fetch( `${aAPI_URL}/members?id=${ id }` )
              //fetch( `http://localhost:3012/members?id=${ id }` )
      .then( ( res  ) => res.json( ) )
      .then( ( json ) => {  
      var aHTML = fmtWelcome (json)
      pWelcome.innerHTML = aHTML 
      } ) 
      //.catch(( err  ) =>   alert ( `*** ${err.message}` ));                     
      function fmtWelcome ( pJSON ) {
          var aHTML = "For: " + pJSON.members[0].FullName
          return aHTML

      }
//--Projects List Fetch---------------------------------------/  

    fetch( `${aAPI_URL}/members_projects?id=${ id }` )
      .then( ( pResult  ) => {return pResult.json( ) })
      .then( ( pJSON ) => {  
      var mProjects = pJSON.members_projects
      fmtProjectListPrimary ( 'projects-list-primary', mProjects )
      fmtProjectListSecondary ( 'projects-list-secondary', mProjects )  
    } ) 
//--fetch project list functions ---------------------------------------/  
//     ---  -------  =  -----------------------------------

//--------  -------  =  -------------------------------------------------------
//  ------------------------------------------------------------

function fmtProjectListPrimary (aListId, mProjects) {
    var mProjects2 = mProjects.filter( pProject => pProject.ProjectStyle == "Primary")
//    var mProjects2 = mProjects.filter( function(pProject) {return pProject.ProjectStyle == "Primary"})
    mProjects2 = mProjects2.sort( SortIt )
    //mProjects2 = mProjects2.sort( function ( c, d ) { return c.ProjectName > d.ProjectName ? 1 : -1 } )
    function SortIt (a, b) {
        var aVal1 = String(a.Sort).padStart(3, "0") + a.ProjectName
        var aVal2 = String(b.Sort).padStart(3, "0") + b.ProjectName
        return aVal1 > aVal2 ? 1 : -1 
    }
    var aList = mProjects2.map(fmtProject).join("")
    var pList = document.getElementById(aListId)
    pList.innerHTML = aList
    function fmtProject (pProject, i) {  
//        var  aClass = i % 2 == 1 ? "row-even" : "row-odd"
        var  aBGColor = i % 2 == 1 ? "#f5f5f5" : "#e5e5e5"
         var aHTML = 
        `
        <tr>
            <td bgColor=${ aBGColor } width="5%" height="30px">
                <a href="project-info.html?pId=${ pProject.ProjectId}">
                <img src="../assets/images/pencilDots.gif" title="Edit ${ pProject.ProjectName }"></a>
            </td>
            <td bgColor=${ aBGColor } class="project-name-primary">
                ${ pProject.ProjectName }
            </td>
        </tr>
        `
    return aHTML
}
}

function fmtProjectListSecondary (aListId, mProjects) {
    var mProjects2 = mProjects.filter(pProject => {return pProject.ProjectStyle == "Secondary"})
    mProjects2 = mProjects2.sort( function ( a, b ) { return a.ProjectName > b.ProjectName ? 1 : -1 } )
    var aList = mProjects2.map(fmtProject).join("")
    var pList = document.getElementById(aListId)
    pList.innerHTML = aList
    function fmtProject (pProject, i) {  
    //var  aClass = i % 2 == 1 ? "row-even" : "row-odd"
    var  aBGColor = i % 2 == 1 ? "#f5f5f5" : "#e5e5e5"
    var aHTML = `
        <tr>
            <td bgColor=${ aBGColor } width="5%" height="30px">
                <img src="../assets/images/check_red.gif">
            </td>
            <td bgColor=${ aBGColor } class="project-name-secondary">
                ${ pProject.ProjectName }
            </td>
        </tr>
    `
return aHTML
}
}


//--------  -------  =  -------------------------------------------------------
async  function  setHTML( aDivID, aFile ) {                         // .(30401.02.1 Beg RAM Add function)
    var aPath     =  window.location.href.replace( /[^/]+$/, '')
//                   console.log( `${aPath}/includes/inc-header-home.html` ) 
    var response  =  await fetch( `${aPath}${aFile}` );
    var aHTML     =  await response.text()
    var pDiv      =  $( `#${aDivID}` ) 
        pDiv.html(   aHTML )
//      sayMsg(     `setHTML[2]     Included '${aFile}’`, nSay2)
    }                                                           // .(30401.02.1 End)


export { setHTML }
//--------  -------  =  -------------------------------------------------------
