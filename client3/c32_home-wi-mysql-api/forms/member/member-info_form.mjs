 async function onMemberForm_Submit( pEvent ) {

            pEvent.preventDefault();

       var  aDataSet = 'member'
       var  pForm    =  pEvent.currentTarget
            window.bQuiet = true 

//    ----  ------------------------------------------------

        if (typeof(aAPI_URL) == 'undefined') {
            sayMsg( 1, `onSubmit[1]  ** aAPI_URL is undefined` )
            sayMsg( 2, `onSubmit[1]  ** aAPI_URL is undefined` )
    return  false

        } else {
       var  aAction =  `${aAPI_URL}/${aDataSet}`
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

  function  onSuccess( pJSON, pForm ) {   // for DataSet: Member

        if (pJSON.error) {
            sayMsg( 1, `onSuccess[1] ** Error Response: '<b>${pJSON.error}</b>'`)
            sayMsg( 2, `onSuccess[1] ** Error Response: '${pJSON.error}'` )
            fmtErrMsg(             ` ** Error Response: '${pJSON.error}'` )
            return
            }

        if (pJSON.member && pJSON.member.length == 0) {
            sayMsg( 1, `onSuccess[2]   * Member No not found: ${pForm.email}`)
            sayMsg( 2, `onSuccess[2]   * Member No not found: ${pForm.email}`)
            fmtErrMsg(                `* MemberNo, ${pForm.memberno}, is not in the IODD database` )
                            
            return
            }

            sayMsg( 1, `onSuccess[3]    Member updated:`)
            sayMsg( 2, `onSuccess[3]    Member updated for ${pJSON.member[0].Email}`)
//          sayMsg( 2,      pJSON )
            fmtErrMsg(                 `Member No. ${pJSON.member[0].MemberNo} updated.` )

       var  pForm    =  document.getElementById( "MembersInfoForm" );         // .(30515.15.2 RAM setMemberForm thinks pForm is a promise, so lets redefine it)                 

//          setCookie(      pLogin.MemberNo )
            setMemberForm(  pJSON.member[0], pForm ) 

            sayMsg( 2, `onSuccess[4]    Form populated`)

            } // eof onSuccess
//    ----  ------------------------------------------------
         }; // eof onLoginForm_Submit
//--------  ---------------------------------------------------------

  function  fmtErrMsg( aMsg ) {                                     // Needs work          
            $('#WelcomeMemberInfo' ).css( 'display', 'none'  );
            $('#member-form-error' ).css( 'display', 'block' );
            $('#member-form-error' ).html( aMsg )
        if (aMsg.match( /\*/)) { return }            
            $('#member-form-error' ).css( 'color',   'green' )
            }
//--------  ---------------------------------------------------------

  function  setMemberForm( pMember, pForm ) {

            pForm.memberno.value           	=  pMember.MemberNo +'' // .(30515.03.21 RAM Add hidden field)  
            pForm['first-name'].value   	=  pMember.FirstName    // .(30515.03.13 RAM Was firstname) 
            pForm['middle-inits'].value 	=  pMember.MiddleName	// .(30515.03.14 RAM Was middleinits)
            pForm['last-name'].value    	=  pMember.LastName		// .(30515.03.15 RAM Was lastname) 
            pForm.suffix.value          	=  pMember.PostName
            pForm.email.value           	=  pMember.Email        
            pForm.password.value        	=  pMember.PIN
            pForm['company'].value   		=  pMember.Company      // .(30515.03.17 RAM Was 'co-name') 
            pForm['company-url'].value    	=  pMember.WebSite      // .(30515.03.20 RAM Was  website ) 
            pForm['company-address1'].value	=  pMember.Address1	    // .(30515.03.18 RAM Was 'co-addr1')
            pForm['company-address2'].value =  pMember.Address2	    // .(30515.03.19 RAM Was 'co-addr2')
            pForm.city.value         		=  pMember.City
            pForm.state.value        		=  pMember.State
            pForm.zip.value          		=  pMember.Zip
            pForm.country.value      		=  pMember.Country
            pForm.phone1.value       		=  pMember.Phone1
            pForm.phone2.value       		=  pMember.Phone2
            pForm.bio.value          		=  pMember.Bio

         }; // eof setMemberForm
//--------  ---------------------------------------------------------

  function  sayMsg( nBoth, aMsg ) {
        if (nBoth == 2 || nBoth == 3) { console.log( aMsg ); }
        if (window.bQuiet && bQuiet ) { return }
        if (nBoth == 1 || nBoth == 3) { alert( aMsg ); }
            }
//--------  ---------------------------------------------------------

export { onMemberForm_Submit, setMemberForm }                       // .(30515.07.4 RAM Add setMemberForm)
