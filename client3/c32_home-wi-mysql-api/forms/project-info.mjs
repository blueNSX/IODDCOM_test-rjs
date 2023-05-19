//SELECT STATEMENT FOR Collaborators for a Project
//SELECT FullName FROM iodd.members_projects_view where projectstyle='secondary' and projectid=44;

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
            pForm.pid.value                 =  pProject.ProjectId // .(30515.03.21 RAM Add hidden field)  
            pForm.mpid.value                =  pProject.Members_ProjectsId // .(30515.03.21 RAM Add hidden field)  
            pForm.projectname.value         =  pProject.ProjectName // .(30515.03.21 RAM Add hidden field)  
            pForm.projecturl.value       	=  pProject.ProjectWeb    // .(30515.03.13 RAM Was firstname) 
            pForm.clientname.value       	=  pProject.Client    // .(30515.03.13 RAM Was firstname) 
            pForm.clienturl.value       	=  pProject.ClientWeb    // .(30515.03.13 RAM Was firstname) 
            pForm.industry.value          	=  pProject.Industry    // .(30515.03.13 RAM Was firstname) 
            pForm.location.value         	=  pProject.Location    // .(30515.03.13 RAM Was firstname) 
            pForm.projecturl.value       	=  pProject.ProjectWeb    // .(30515.03.13 RAM Was firstname) 
            pForm.role.value            	=  pProject.Role    // .(30515.03.13 RAM Was firstname) 
            pForm.duration.value       	    =  pProject.Duration    // .(30515.03.13 RAM Was firstname) 
            pForm.dates.value       	    =  pProject.Dates    // .(30515.03.13 RAM Was firstname) 
            pForm.description.value       	=  pProject.Description    // .(30515.03.13 RAM Was firstname) 

        
        }; // eof setProjectForm
//--------  ---------------------------------------------------------

  function  sayMsg( nBoth, aMsg ) {
        if (nBoth == 2 || nBoth == 3) { console.log( aMsg ); }
        if (window.bQuiet && bQuiet ) { return }
        if (nBoth == 1 || nBoth == 3) { alert( aMsg ); }
            }
//--------  ---------------------------------------------------------

export { onProjectForm_Submit, setProjectForm }                       // .(30515.07.4 RAM Add setMemberForm)
