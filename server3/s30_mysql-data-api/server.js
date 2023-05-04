var mysql       =  require( 'mysql2' );
var express     =  require( 'express' );
var cors        =  require( 'cors' )

var app         =  express();

//  app.use( bodyParser.urlencoded( { extended: true } ) );  // use to receive key-value pairs of any type, via POST
//  app.use( bodyParser.json( ) );                           // use to receive JSON data, req.body, via POST

    app.use( cors( { origin: '*' } ) );
// -------------------------------------------------------------------------

var pDB = mysql.createConnection( {
        host     : '45.32.219.12',
        user     : 'nimdas',
        password : 'FormR!1234',
        database : 'iodd'
    } );

var aAPI = `${process.argv[1]}`.match( /^C:/ ) ? '' : '/api2'                           // .(30214.03.1 RAM Set if running in Windows)
//     console.log( `aAPI: ${aAPI}, argv0: '${process.argv[1]}'`);

// -------------------------------------------------------------------------

    app.get( aAPI + '/', function( req, res ) {                                         // .(30214.03.2 RAM Add aAPI )
        res.send(`
        Welcome to IODD MySQL Express Server API.<br>
        Use any of the following APIs:<br>
        <div style="margin-left:20px">
          <a href="/home"                         >/home</a><br>                        <!-- .(20308.01.1 JRS Added) -->
          <a href="/login"                        >/login</a><br>
          <a href="/meetings"                     >/meetings</a><br>
          <a href="/members"                      >/members</a><br>
          <a href="/members-projects"             >/members-projects</a><br>
          <a href="/projects"                     >/projects</a><br>
          <a href="/projects?letters=a"           >/projects?letters=a</a><br>          <!-- .(20307.02.1 RAM Added) -->
          <a href="/project-colaborators"         >/project-colaborators</a><br>        <!-- .(20307.02.2) -->
          <a href="/project-colaborators-letters" >/project-colaborators-letters</a><br><!-- .(20307.02.3) -->
        </div>
        `);
    } ) ;
// -------------------------------------------------------------------------

    app.get( aAPI + '/projects', function( req, res ) {                                 // .(30214.03.3)

    var nRecs    = req.query.recs || 999
    var aLetters = req.query.letters || ''
    var aName    = req.query.name

    if (aName == null) {
    var aSQL = `SELECT *
                FROM members_projects_colaboration_view
                WHERE Id <= ${nRecs} `
    }
//      if (aLetters == '') {
//  var aSQL = `SELECT *
//                FROM projects, members_projects
//                  WHERE projects.Id = members_projects.ProjectId
//                 AND projects.Id <= ${nRecs}
//            ORDER BY Name, ProjectStyle `
//  } else {
//    var  aSQL  = `SELECT  *
//                    FROM  members, members_projects, projects
//                   WHERE  members.Id  = members_projects.MemberId
//                     AND  projects.Id = members_projects.ProjectId
//                     AND  LastName like '${aLetters}%'
//                ORDER BY  Name, Lastname`
//  }
        //pDB.query( `SELECT * FROM projects WHERE Id <= ${nRecs}`, onQuery )
        pDB.query(aSQL, onQuery)
    function onQuery( error, results, fields ) {
        if ( error ) {
            console.log( `** Error: ${error.message}` );
//          res.send( `Error: ${error.message}` );
            res.send( JSON.stringify( { projects: { Error: error.message } } ) );       // .(30208.06.1 RAM Add top table object to conform to db.json structure)
            res.end();
            return
            }
        if (results.length > 0) {
            res.setHeader( 'Content-Type', 'application/json' );
            res.send( JSON.stringify( { projects: results } ) );                        // .(30208.06.2 RAM Add top table object)
        } else {
            console.log( `** Error: "No Projects Found"` );
            res.send( `{ projects: { Error: "No projects found" } }` );
        }
        res.end();
        };
    } );
// -------------------------------------------------------------------------

    app.get( aAPI + '/members', function( req, res ) {                                  // .(30214.03.4)

    var nRecs = req.query.recs || 999
    var aName = req.query.name
    if (aName == null) {
    var aSQL = `SELECT *
                FROM members_view
                WHERE Id <= ${nRecs}
                ORDER BY LastName, FirstName `
    }
//      pDB.query( `SELECT * FROM members WHERE Id <= ${nRecs}`, onQuery )
        pDB.query(aSQL, onQuery)
    function onQuery( error, results, fields ) {
        if ( error ) {
            console.log( `** Error: ${error.message}` );
            res.send( `Error: ${error.message}` );
            res.end();
            return
            }
        if (results.length > 0) {
            res.setHeader( 'Content-Type', 'application/json' );
            res.send( JSON.stringify( { members: results } ) );                         // .(30208.06.3)
        } else {
            res.send( `{ error: "No members found" }` );
        }
        res.end();
        };
    } );

// -------------------------------------------------------------------------

app.get( aAPI + '/members-bios', function( req, res ) {                                  // .(30214.03.4)

    var nRecs = req.query.recs || 999
    var aName = req.query.name
    if (aName == null) {
    var aSQL = `SELECT *
                FROM members_bio_view
                WHERE Id <= ${nRecs}
                ORDER BY LastName, FirstName `
    }
//      pDB.query( `SELECT * FROM members WHERE Id <= ${nRecs}`, onQuery )
        pDB.query(aSQL, onQuery)
    function onQuery( error, results, fields ) {
        if ( error ) {
            console.log( `** Error: ${error.message}` );
            res.send( `Error: ${error.message}` );
            res.end();
            return
            }
        if (results.length > 0) {
            res.setHeader( 'Content-Type', 'application/json' );
            res.send( JSON.stringify( { "members-bios": results } ) );                         // .(30208.06.3)
        } else {
            res.send( `{ error: "No members found" }` );
        }
        res.end();
        };
    } );
// -------------------------------------------------------------------------

    app.get( aAPI + '/members-projects', function( req, res ) {                         // .(30214.03.5)

    var nRecs = req.query.recs || 999
    var aName = req.query.name
    if (aName == null) {
    var aSQL = `SELECT *
                FROM members_projects_view
                WHERE Id <= ${nRecs} `
    }
        pDB.query(aSQL, onQuery)
    function onQuery( error, results, fields ) {
        if ( error ) {
            console.log( `** Error: ${error.message}` );
            res.send( `Error: ${error.message}` );
            res.end();
            return
            }
        if (results.length > 0) {
            res.setHeader( 'Content-Type', 'application/json' );
            res.send( JSON.stringify( { "members_projects": results } ) );              // .(30208.06.4).(30203.06.12 RAM Added s to member-projects).30203.06.12 RAM - s.b. _)
        } else {
            res.send( `{ error: "No members-projects found" }` );
        }
        res.end();
        };
    } );
// -------------------------------------------------------------------------

    app.get( 'aAPI + /project-colaborators', function( req, res ) {                     // .(30214.03.6)

    var iId  =  req.query.id || 0
    var aSQL = `SELECT  Distinct *
                  FROM  members_projects_view ${ iId ?
                `WHERE  ProjectId = ${iId}` : `` }`

        pDB.query( aSQL, onQuery )

    function onQuery( error, results, fields ) {
        if ( error ) {
            console.log( `** Error: ${error.message}` );
            res.send( `Error: ${error.message}` );
            res.end();
            return
            }
        if (results.length > 0) {
            res.setHeader( 'Content-Type', 'application/json' );
            res.send( JSON.stringify( { colaborators: results } ) );                    // .(30208.06.5)
        } else {
            res.send( `{ error: "No projects found" }` );
        }
        res.end();
        };
    } );  // app.get( '/project-colaborators', ... )
// -------------------------------------------------------------------------

    app.get( aAPI + '/project-colaborators-letters', function( req, res ) {             // .(30214.03.7)

   var  iId  =  req.query.id || 0
   var  aSQL = `SELECT  Distinct substr(LastName,1,1) as Letter
                  FROM  members_projects_view
               ORDER BY 1`

   var  aTable = "letters"                                                              // .(30208.06.6)

        pDB.query( aSQL, onQuery )

    function onQuery( error, results, fields ) {
        if ( error ) {
            console.log( `** Error: ${error.message}` );
            res.send( `Error: ${error.message}` );
            res.end();
            return
            }
        if (results.length > 0) {
            res.setHeader( 'Content-Type', 'application/json' );
        var pJSON = { }
            pJSON[ aTable ] = results.map( pLetter => pLetter.Letter )
//          pJSON = { aTable : results }   // no workie

            res.send( JSON.stringify( pJSON ) );
//          res.send( JSON.stringify( { aTable      : results } ) );
//          res.send( JSON.stringify( { colaborators: results } ) );
        } else {
            res.send( `{ error: "No ${aTable} found!" }` );
        }
        res.end();
        }
    } );  // app.get( '/project-colaborators-letters', ... )

// -------------------------------------------------------------------------
    app.get( aAPI + '/home', function( req, res ) {                                 // .(30214.03.9)

        var nRecs = req.query.recs || 999
        var aName = req.query.name
        if (aName == null) {
        var aSQL = `SELECT *
                    FROM meetings_view `
        }
            pDB.query(aSQL, onQuery)
        function onQuery( error, results, fields ) {
            if ( error ) {
                console.log( `** Error: ${error.message}` );
                res.send( `Error: ${error.message}` );
                res.end();
                return
                }
            if (results.length > 0) {
                res.setHeader( 'Content-Type', 'application/json' );
                res.send( JSON.stringify( { meetings: results } ) );                        // .(30208.06.7)
            } else {
                res.send( `{ error: "No meetings found" }` );
            }
            res.end();
            };
        } );
    // -------------------------------------------------------------------------

    app.get( aAPI + '/meetings', function( req, res ) {                                 // .(30214.03.9)

    var nRecs = req.query.recs || 999
    var aName = req.query.name
    if (aName == null) {
    var aSQL = `SELECT *
                FROM meetings_view `
    }
        pDB.query(aSQL, onQuery)
    function onQuery( error, results, fields ) {
        if ( error ) {
            console.log( `** Error: ${error.message}` );
            res.send( `Error: ${error.message}` );
            res.end();
            return
            }
        if (results.length > 0) {
            res.setHeader( 'Content-Type', 'application/json' );
            res.send( JSON.stringify( { meetings: results } ) );                        // .(30208.06.7)
        } else {
            res.send( `{ error: "No meetings found" }` );
        }
        res.end();
        };
    } );

// -------------------------------------------------------------------------

app.get( aAPI + '/login', function( req, res ) {                                 // .(30214.03.9)

    var nRecs = req.query.recs || 999
    var aName = req.query.name
    if (aName == null) {
    var aSQL = `SELECT *
                FROM login_check_view `
    }
        pDB.query(aSQL, onQuery)
    function onQuery( error, results, fields ) {
        if ( error ) {
            console.log( `** Error: ${error.message}` );
            res.send( `Error: ${error.message}` );
            res.end();
            return
            }
        if (results.length > 0) {
            res.setHeader( 'Content-Type', 'application/json' );
            res.send( JSON.stringify( { login: results } ) );                        // .(30208.06.7)
        } else {
            res.send( `{ error: "No login-user found" }` );
        }
        res.end();
        };
    } );

// -------------------------------------------------------------------------

    var nPort = 3000                                                                    // .(30213.02.3 RAM Set nPort once)

        app.listen( nPort );                                                            // .(30213.02.2 RAM Change real port from 3000 to 3002).(30213.02.4)
    if (aAPI == '') {                                                                   // .(30214.03.11)
        console.log( `\n   Server is running at: http://localhost:${nPort}` )           // .(30213.02.1 Change port from 3000 to 3002).(30213.02.5)
    } else {                                                                            // .(30214.03.12 Beg)
        console.log( `\n   Server is running at: https://IODD.com${aAPI} -> port:${nPort}` )
        }                                                                               // .(30214.03.12 End)
        console.log(   `   Server is running in: ${ process.argv[1] }\n` )              // .(30214.03.10 RAM Display root dir)

// EOF
// EOF