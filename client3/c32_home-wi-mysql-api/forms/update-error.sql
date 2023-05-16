UPDATE  members
                       SET  FirstName       = 'Richard'
                         ,  MiddleName      = 'J'
                         ,  LastName        = 'Schinner'
                         ,  PostName        = ''
--                       ,  RoleId          = 'undefined'
                         ,  Email           = 'evantage@comcast.net'
                         ,  PIN             = 'iodd'
                         ,  Active          =          'Y'
--                       ,  IsLoggedIn      =          'N'
--                       ,  LogInDateTime   = 'undefined'
--                       ,  IPv4Address     = 'undefined'
                         ,  Company         = 'eVantage LLC'
                         ,  Address1        = '15622 Blackberry Drive'
                         ,  Address2        = ''
                         ,  City            = 'Gaithersburg'
                         ,  State           = 'MD'
                         ,  Zip             = '20878'
                         ,  Country         = 'USA'
                         ,  Phone1          = '301-977-5196'
                         ,  Phone2          = '301-742-1803'
--                       ,  Fax             = 'undefined'
                         ,  WebSite         = 'http://www.evantageone.com'
--                       ,  Skills          = 'undefined'
                         ,  Bio             = 'Richard has more than 22 years experience with computers.  He is a recent Computer Science graduate from the University of Maryland and is the founder and owner of <a href="http://www.evantageone.com">eVantage, LLC</a> since 1996.  He is a software/database developer with more than 30 years of broad operations experience that gives him the ability to understand a project in ways many other developers cannot.  This understanding allows him to create exactly what the customer needs in a very short time.  He has developed several outstanding applications in the manufacturing industry. The most comprehensive is <a href="http://pfep.net">PFEP (Plan For Every Part</a>.  This copyrighted program is available for small to large manufacturers.<br><br>For more information: <a href="http://www.evantageone.com/RJS/">Resume</a>; <a href="mailto:evantage@comcast.net">Email</a>'
--                       ,  CreatedAt       =     STR_TO_DATE( '2023-05-15 21:40:30' , '%Y-%m-%d %H:%i:%s' )
                         ,  UpdatedAt       =     STR_TO_DATE( '2023-05-15 21:40:30' , '%Y-%m-%d %H:%i:%s' )
                         ,  LastUpdated     =     STR_TO_DATE( '2023-05-15 21:40:30' , '%Y-%m-%d %H:%i:%s' )
                     WHERE  MemberNo        =  90




Error Code: 1175. You are using safe update mode and you tried to update a table without a WHERE that uses a KEY column.
To disable safe mode, toggle the option in Preferences



