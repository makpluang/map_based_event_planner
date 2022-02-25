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
formate of adding check points via postman
{
    "lattitude":"la901",
    "longitude":"lo901",
    "title":"this is house",
    "about":"this is my house",
    "rating":"10",
    "image":"https://www.youtube.com/watch?v=az2_o1pkLgo"
}


*/

//http://localhost:3000/api/paths/pathtofollow/{start}/{end}
/*
Below you can see ,how tha data is being send from backend

{
"start": "Delhi",
"end": "Mumbai",
"paths": {
"_id": "620d252f00dfbc6f0173b3d6",
"route": [
{
"_id": "620d225f00dfbc6f0173b3b7",
"lattitude": "-7.09718",
"longitude": "-100.77319",
"title": "Taj Hotel",
"about": "This is famous Taj hotel of Varansi,",
"rating": 10,
"meta": [],
"image": "https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI",
"isassigned": false,
"isdeleted": false,
"date": "2022-02-16T16:12:15.789Z",
"addedby": "620d21cc00dfbc6f0173b3b3",
"__v": 0
},
{
"_id": "620d237d00dfbc6f0173b3c6",
"lattitude": "-50.36920",
"longitude": "80.04996",
"title": "Diamond Palace",
"about": "Diamon palace of this state, this always attracts tourists",
"rating": 9,
"meta": [],
"image": "https://www.youtube.com/watch?v=az2_o1pkLgo",
"isassigned": false,
"isdeleted": false,
"date": "2022-02-16T16:17:01.476Z",
"addedby": "620d21cc00dfbc6f0173b3b3",
"__v": 0
},
{
"_id": "620d243c00dfbc6f0173b3c9",
"lattitude": "-47.78666",
"longitude": "-49.89267",
"title": "HB1 boys hostel",
"about": "This is famous boys hostel of BHU ",
"rating": 9,
"meta": [],
"image": "https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI",
"isassigned": false,
"isdeleted": false,
"date": "2022-02-16T16:20:12.477Z",
"addedby": "620d21cc00dfbc6f0173b3b3",
"__v": 0
},
{
"_id": "620d247c00dfbc6f0173b3cc",
"lattitude": "-11.21692",
"longitude": "53.75368",
"title": "Sea graden",
"about": "This is famous garden of this country ",
"rating": 9,
"meta": [],
"image": "https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI",
"isassigned": false,
"isdeleted": false,
"date": "2022-02-16T16:21:16.343Z",
"addedby": "620d21cc00dfbc6f0173b3b3",
"__v": 0
},
{
"_id": "620d24e600dfbc6f0173b3cf",
"lattitude": "-14.86310",
"longitude": "-64.94591",
"title": "IIITM Building",
"about": "This building belong to IIITM and this is the most beautiful hostel building among all the IIITs",
"rating": 10,
"meta": [],
"image": "https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI",
"isassigned": false,
"isdeleted": false,
"date": "2022-02-16T16:23:02.285Z",
"addedby": "620d21cc00dfbc6f0173b3b3",
"__v": 0
}
],
"isassigned": false,
"isdeleted": false,
"__v": 0
}
}


*/
//http://localhost:3000/api/admin/{_id}
/*
As in above case you are getting ,added by as object id so you can acess this route to get Added by info
you can see ,how data is coming from backend

{
"_id": "620d21cc00dfbc6f0173b3b3",
"name": "kanhaiya",
"email": "kanhaiya@iiitmanipur.ac.in",
"password": "U2FsdGVkX187aFyY5jhd7ZalIABkezgQCkZy6/56Qzo=",
"issuperAdmin": true,
"__v": 0
}

*/

/*
Post Routes
http://localhost:3000/api/admins/register
http://localhost:3000/api/admins/login
http://localhost:3000/api/checkpoints/add
http://localhost:3000/api/path/create/:params
http://localhost:3000/api/admins/register
http://localhost:3000/api/paths/add/:params




*/
/*

new end point 
http://localhost:3000/api/distance/multi/start/Delhi/Mumbai/end/Maharastra/UttarPradesh
http://localhost:3000/api/distance/Delhi/Noida
http://localhost:3000/api/paths/pathtofollow/Delhi/Mumbai
http://localhost:3000/api/admin/621757e26c0c90a7e1a713f7
*/


/*
1. main end points needed for frontend Use
First create path for user 
input->(start,end)
http://localhost:3000/api/paths/pathtofollow/Dudhi/Patna

Now I have path with checkpoints

2. Now I need info of person who added the checkpoints
Input->{user_id}
http://localhost:3000/api/admin/621757e26c0c90a7e1a713f7

3.Now I need travelling time and distance between two points
Input->{start,end}
http://localhost:3000/api/distance/Dudhi/Patna

4. But I am making API call often ,can we get array of distance?

Input->{startarraylocations,endarraylocations}
http://localhost:3000/api/distance/multi/start/Dudhi/end/Gurugram/Delhi/Patna


*/