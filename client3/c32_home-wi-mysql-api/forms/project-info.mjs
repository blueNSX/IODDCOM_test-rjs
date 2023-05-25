//SELECT STATEMENT FOR Collaborators for a Project
//SELECT FullName FROM iodd.members_projects_view where projectstyle='secondary' and projectid=44;


//-------- Project Name ----------------------------------//
$('#projectname').bind('blur', projectname_blur_Handler)
function projectname_blur_Handler (e) {
    putField('projectname', e.currentTarget.value)
}

//-------- Project URL ----------------------------------//
$('#projecturl').bind('blur', projecturl_blur_Handler)
function projecturl_blur_Handler (e) {
    var pDiv = $( "#ProjectURLBanner" )
    var ahref = `<a href="${e.currentTarget.value}">${e.currentTarget.value}</a>`
    // if (pDiv) {ahref}
    pDiv.html(ahref)
    //alert ("You have left the project url field")
    putField('projecturl', e.currentTarget.value) 

}

//-------- Clients Name ----------------------------------//
$('#clientname').bind('blur', clientname_blur_Handler)
function clientname_blur_Handler (e) {
    putField('clientname', e.currentTarget.value)
}

//-------- Client URL ----------------------------------//
$('#clienturl').bind('blur', clienturl_blur_Handler)
function clienturl_blur_Handler (e) {
    var pDiv = $( "#ClientURLBanner" )
    var ahref = `<a href="${e.currentTarget.value}">${e.currentTarget.value}</a>`
    // if (pDiv) {ahref}
    pDiv.html(ahref)
    //alert ("You have left the project url field")
    putField('clienturl', e.currentTarget.value)
}

//-------- Industry ----------------------------------//
$('#industry').bind('blur', industry_blur_Handler)
function industry_blur_Handler (e) {
    putField('industry', e.currentTarget.value)
}

//-------- Location ----------------------------------//
$('#location').bind('blur', location_blur_Handler)
function location_blur_Handler (e) {
    putField('location', e.currentTarget.value)
}

//-------- Role --------------------------------------//
$('#role').bind('blur', role_blur_Handler)
function role_blur_Handler (e) {
    putField('role', e.currentTarget.value)
}

//-------- Duration ----------------------------------//
$('#duration').bind('blur', duration_blur_Handler)
function duration_blur_Handler (e) {
    putField('duration', e.currentTarget.value)
}

//-------- Dates -------------------------------------//
$('#dates').bind('blur', dates_blur_Handler)
function dates_blur_Handler (e) {
    putField('dates', e.currentTarget.value)
}

//-------- Description -------------------------------------//
$('#description').bind('blur', description_blur_Handler)
function description_blur_Handler (e) {
    putField('description', e.currentTarget.value)
}





function putField (aName, aValue) {
    console.log (`Save ${ "'" + aValue + "'" } to "${ aName }"`)
}

// console.log("hello")
 async function onProjectForm_Submit( pEvent ) {

            pEvent.preventDefault();

       var  aDataSet = 'project_collaborators'
       var  pForm    =  pEvent.currentTarget
       //var  pForm    =  getElementById('ProjectInfoForm')
            window.bQuiet = true 
//    ----  ------------------------------------------------

        if (typeof(aAPI_URL) == 'undefined') {
            sayMsg( 1, `onSubmit[1]  ** aAPI_URL is undefined` )
            sayMsg( 2, `onSubmit[1]  ** aAPI_URL is undefined` )
    return  false

        } else {
        var pid = window.location.href.replace(/.+pid=/i,'')    
        var  aAction =  `${aAPI_URL}/${aDataSet}/?pid=${ pid }`
            } 
//    ----  ------------------------------------------------

       var  bAPI    = (aAction.match(/.html$/) == null) || aAction.match(/api\//)
       var  bSubmit = !bAPI

        if (bSubmit) {
            sayMsg( 1, `onSubmit[2]     Form being submitted to: '${aAction}'` )
            sayMsg( 2, `onSubmit[2]     Form being submitted to: '${aAction}'` )
        } else {
            sayMsg( 1, `onSubmit[3]     Form not being submitted, i.e. no reload or redirect` )
            sayMsg( 2, `onSubmit[3]     Form not being submitted, i.e. no reload or redirect` )
            }
//    ----  ------------------------------------------------

        if (bAPI) {

            sayMsg( 1, `onSubmit[4]     Form data being posted to: '${aAction}'` )
            sayMsg( 2, `onSubmit[4]     Form data being posted to: '${aAction}'` )

        var pEntries  =   new FormData( pForm );
        var pData     =   Object.fromEntries( pEntries.entries() );

        var pFetchCfg =
             { method : 'POST'
             , mode   : "cors"                                      // Or: n-cors, *cors, same-origin
             , headers:
                { "Content-Type": "application/json"                // Send JSON request
                , "Accept"      : "application/json"                // Expect JSON response back
                   }
             , body: JSON.stringify( pData )
               };

        var aCR  = '\n'.padEnd(16)
            sayMsg( 1, `onSubmit[5]     Form data is: ${ JSON.stringify( pFetchCfg.body ).replace( /\n/g, aCR ) }`)
            sayMsg( 2, `onSubmit[5]     Form data sent to '${aAction}'` )
            sayMsg( 2, `onSubmit[5]     ${ JSON.stringify( pData ).replace( /\n/g, aCR ) }`)

        try {
       var  pRes                =  await fetch( aAction, pFetchCfg );
//       var pCollaborators       =  await fetch( `project_collaborators?pid=44` )

        } catch( pErr ) {
            sayMsg( 1, `onSubmit[6]  ** Server error: '${aAction}'\n ${pErr}` )
            sayMsg( 2, `onSubmit[6]  ** Server error: '${aAction}'\n ${pErr}` )
            fmtErrMsg( `** Server error: '${aAction}`)
     return
            }
       if (!pRes.ok) {
       var  aErr                =  await pRes.text();               // Why is this MT??
                                   onFailure( aErr, aAction )
        } else {
       var  pJSON               =  await pRes.json();
                                   onSuccess( pJSON, pData )        // May have pJSON.error from server   
            }
//    ----  ------------------------------------------------
         }; // eif Use Server aAPI_URL, ie. aAction.match(/.html$/)

        if (bSubmit) {
//          sayMsg( 1, `onSubmit[2]     Form being submitted to: '${aAction}'` )
//          sayMsg( 2, `onSubmit[2]     Form being submitted to: '${aAction}'` )
         }
//       }; // eif Use HTML 1.0 form submit)
//    ----  ------------------------------------------------

    return  bSubmit

//    ----  ------------------------------------------------

  function  onFailure( aErr, aURL ) {

            sayMsg( 1, `onFailure[1] ** Server error: '${aURL}'\n ${aErr}` )
            sayMsg( 2, `onFailure[1] ** Server error: '<b>${aURL}</b>'\n ${aErr}` )
            setErrorMsg(           ` ** Server error: '${aURL}' -- '${aErr}'` )

         }; // eof onLoginFailure
//    ----  ------------------------------------------------

  function  onSuccess( pJSON, pForm ) {   // for DataSet: Project
        var  aDataSet = 'project_collaborators'
        if (pJSON.error) {
            sayMsg( 1, `onSuccess[1] ** Error Response: '<b>${pJSON.error}</b>'`)
            sayMsg( 2, `onSuccess[1] ** Error Response: '${pJSON.error}'` )
            fmtErrMsg(             ` ** Error Response: '${pJSON.error}'` )
            return
            }
        if (pJSON[aDataSet] && pJSON[aDataSet].length == 0) {
            sayMsg( 1, `onSuccess[2]   * Project No not found: ${pForm.email}`)
            sayMsg( 2, `onSuccess[2]   * Project No not found: ${pForm.email}`)
            fmtErrMsg(                `* ProjectID, ${pForm.projectname}, is not in the IODD database` )
                            
            return
            }

            var pProjectData = pJSON[aDataSet][0]
            

            sayMsg( 1, `onSuccess[3]    Project updated:`)
            sayMsg( 2, `onSuccess[3]    Project updated for ${pProjectData.Email}`)
//          sayMsg( 2,      pJSON )
            fmtErrMsg(                 `ProjectID. ${pProjectData.ProjectID} updated.` )

       var  pForm    =  document.getElementById( "ProjectInfoForm" );         // .(30515.15.2 RAM setProjectForm thinks pForm is a promise, so lets redefine it)                 

            setProjectForm(  pProjectData, pForm ) 

            sayMsg( 2, `onSuccess[4]    Form populated`)
            window.location = '#top'

            } // eof onSuccess
//    ----  ------------------------------------------------
         }; // eof onLoginForm_Submit
//--------  ---------------------------------------------------------

  function  fmtErrMsg( aMsg ) {                                     // Needs work          
            $('#WelcomeProjectInfo' ).css( 'display', 'none'  );
            $('#project-form-error' ).css( 'display', 'block' );
            $('#project-form-error' ).html( aMsg )
        if (aMsg.match( /\*/)) { return }            
            $('#project-form-error' ).css( 'color',   'green' )
            }
//--------  ---------------------------------------------------------

  function  setProjectForm( pProject, pForm ) {
            var ProjectBanner = pProject.ProjectName
            $( "#ProjectNameBanner" ).html(ProjectBanner)
 
            var ProjectURLBanner = `<a href=${pProject.ProjectWeb} title='Open Project Web Site' target='_blank'>${pProject.ProjectWeb}</a>`
            if (pProject.ProjectWeb) { $( "#ProjectURLBanner" ).html(ProjectURLBanner) }
 
            var ClientURLBanner = `<a href=${pProject.ClientWeb} title='Open Client Web Site' target='_blank'>${pProject.ClientWeb}</a>`
            if (pProject.ClientWeb) { $( "#ClientURLBanner" ).html(ClientURLBanner) }

            pForm.pid.value                 =  pProject.ProjectId // .(30515.03.21 RAM Add hidden field)  
            pForm.mpid.value                =  pProject.Members_ProjectsId // .(30515.03.21 RAM Add hidden field)  
            pForm.projectname.value         =  pProject.ProjectName // .(30515.03.21 RAM Add hidden field)  
            pForm.projecturl.value       	=  pProject.ProjectWeb    // .(30515.03.13 RAM Was firstname) 
            pForm.clientname.value       	=  pProject.Client    // .(30515.03.13 RAM Was firstname) 
            pForm.clienturl.value       	=  pProject.ClientWeb    // .(30515.03.13 RAM Was firstname) 
            pForm.industry.value          	=  pProject.Industry    // .(30515.03.13 RAM Was firstname) 
            pForm.location.value         	=  pProject.Location    // .(30515.03.13 RAM Was firstname) 
//          pForm.projecturl.value       	=  pProject.ProjectWeb    // .(30515.03.13 RAM Was firstname) 
            pForm.role.value            	=  pProject.Role    // .(30515.03.13 RAM Was firstname) 
            pForm.duration.value       	    =  pProject.Duration    // .(30515.03.13 RAM Was firstname) 
            pForm.dates.value       	    =  pProject.Dates    // .(30515.03.13 RAM Was firstname) 
            pForm.description.value       	=  pProject.Description    // .(30515.03.13 RAM Was firstname) 

        
        }; // eof setProjectForm
//--------  ---------------------------------------------------------
   function setCollaboratorsForm( mProjects, aId ) {
        var pForm = $( '#'+aId )
        var mCollaborators = mProjects.filter(pProject => pProject.ProjectStyle == 'Secondary')
        mCollaborators = mCollaborators.sort( function (a,b) { return a.LastName > b.LastName ? 1 : -1} )
        var aHTML = mCollaborators.map( fmtCollaborator ).join('/n')
        var aNewRow1 = `

            <tr>
                <td></td>
                <td class="collaborators-title">
                    <font color="blue"><b>Collaborator(s)</b></font>
                </td>
                </tr>
        `
        var aNewRow2 = `
            <tr>
                <td></td>
                <td align="right">
                    <select>
                        <option Id="0">Add a Collaborator</option>
                        <option Id="9">Kennett Fussell</option>
                        <option Id="90">Richard Schinner</option>
                        <option Id="0">Mickey Mouse</option>
                        <option Id="0">Donald Duck</option>
                        <option Id="0">Minnie Mouse</option>
                        <option Id="0">Olive Oyl</option>
                        <option Id="0">Pecos Pete</option>
                        <option Id="0">Donald Trump</option>
                        <option Id="0">Ronald Reagan</option>
                        <option Id="0">George Washington</option>
                        <option Id="0">Abe Lincoln</option>
                        <option Id="0">Henry Ford</option>
                        <option Id="0">Enzo Ferrari</option>
                        <option Id="0">Elon Musk</option>
                        <option Id="0">Catturd</option>
                        <option Id="0">Blue NSX</option>
                    </select>
                    <!--<input type="text" name="collaboratoradd" placeholder="Add Collaborator" id="collaboratoradd">-->
                </td>
            </tr>
            <tr>
            <td></td>
            <td><input id="submit-button" type="submit" value="Submit"></td>
            </tr>
            `

        pForm.html(aNewRow1 + aHTML + aNewRow2) 

        function fmtCollaborator( pCollaborator, i ) {    
            var rowId = `R${i}`
            var aNameField = `<div id="${rowId}_Name">${pCollaborator.FullName}</div>`
            var aRowBtn    = `<div id="${rowId}_Btn">${pCollaborator.MemberNo}</div>`
            var aRow  = `
                        <tr id="collaborators">
                            <td align="right"><font color="red"><a href="project-info.html" title="Remove Collaborator"><img src="../assets/images/dash2.gif"></a></font></td>
                            <td class="collaborators"><font color="black">${ aNameField }</font></td>
                        </tr>
                        `
        return aRow
    }
    }

  function  sayMsg( nBoth, aMsg ) {
        if (nBoth == 2 || nBoth == 3) { console.log( aMsg ); }
        if (window.bQuiet && bQuiet ) { return }
        if (nBoth == 1 || nBoth == 3) { alert( aMsg ); }
            }
//--------  ---------------------------------------------------------

export { onProjectForm_Submit, setProjectForm }                       // .(30515.07.4 RAM Add setMemberForm)
export { setCollaboratorsForm }
