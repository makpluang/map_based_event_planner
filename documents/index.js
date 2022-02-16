//API end point of the map
/*
https://apis.mapmyindia.com/advancedmaps/v1/<licence_key>/ route?
start=<startLatitude>,<startLongitude> &destination=<endLatitude>,<endLongitude>&

    viapoints={viaFirstLatitude},{viaFirstLongitude}|{viaSecondLatitude},{viaSecondLongitude} | {viaThirdLatitude},{viaThirdLongitude}
    | {viaThirdLatitude},{viaThirdLongitude}

*/


/*
Needed backend routes 

route 1-> add checkpoints
route 2-> take check points id which is not assigned to any path(isassigned==false) and assign to the particular path id and create a path
route 3-> take path id and assign to the paths array for user access


*/


/*
How administartor has to create path ?

1.his work is to add the checkpoints only and by defauld ,isassigned filed of checkpoint will be false
2.Now administrator wants to add checkpoints to a path ,suppose he want to add 5 checkpoint to a path
    a. Now data can be queried from checkpoints model,and we can select 5 checkpoints.
    b.These selected chceckpoint can be added to the path.

3. Now administrator has created a new path
    If he wants to use this path for user access,then he can add this path to the 
    paths array now isassigned feild of the will be true because
    this path is added to the paths for now which will be used by users.


*/


/*
this field will be deal only with paths array,where multiple path has been added

assigning paths to the start and end points 

Now when user will enter the start and end positions then we have two scenerio

a. we have empty paths,mean system administartor has yet not created any path in the database
    in this case we will just map users path from start to end.

b. administartor has created multiple path in the paths database

    in this case we will randomly select one path and assign it to the, map API end point
    and user will travel throguh the path
    
    Note->

    now we can use here caching if same start and end point is getting visited again and again
    we will use redish as caching

    a. our key will be a string concatinated as -> "start+end"
    b. our value will be a path which a array of objects containing a check points

    now if again same start and end point will be requested ,we will return from our cache rather than making a network
    call to the database.




*/

/*

{
    "lattitude":"la901",
    "longitude":"lo901",
    "title":"this is house",
    "about":"this is my house",
    "rating":"10",
    "image":"https://www.youtube.com/watch?v=az2_o1pkLgo"
}
*/

