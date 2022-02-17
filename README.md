# bootcamp_project
This is repo is regarding the boocamp project

# Publically available API
https://kanhaiyaproj.herokuapp.com/api/paths/pathtofollow/{start_locations}/{End_locations}

https://kanhaiyaproj.herokuapp.com/api/admin/{admin_id}

Example:

Start Location = Delhi
End Location.  =Mumbai

You can hit API to get the checkpoints as:-

https://kanhaiyaproj.herokuapp.com/api/paths/pathtofollow/Delhi/Mumbai

# Response 👇

# Data will look like below:-

{
    "start": "Delhi",
    "end": "Mumbai",
    "paths": {
              "_id": "620d229800dfbc6f0173b3bb",
              "route": [
                          {
                              "_id": "620d225f00dfbc6f0173b3b7",
                              "lattitude": "-7.09718",
                              "longitude": "-100.77319",
                              "title": "Taj Hotel",
                              "about": "This is famous Taj hotel of Varansi,",
                              "rating": 10,
                              "meta": [],
                              "image": "https://www.youtube.com/watch?v=az2_o1pkLgo",
                              "isassigned": false,
                              "isdeleted": false,
                              "date": "2022-02-16T16:12:15.789Z",
                              "addedby": "620d21cc00dfbc6f0173b3b3",
                              "__v": 0
                          }
              ],
              "isassigned": false,
              "isdeleted": false,
              "__v": 0
    }
}

Now you are gettign addedby as ID

# So you can acess,who created this checkpoint by hitting the API :-

Just copy the added by _id from above data and paste it in place of {admin_id}

https://kanhaiyaproj.herokuapp.com/api/admin/{admin_id}

# Example:-

https://kanhaiyaproj.herokuapp.com/api/admin/620d21cc00dfbc6f0173b3b3

# Response 👇

# Data formate is shwon Below:-

{
  "isdeleted": false,
  "_id": "620d21cc00dfbc6f0173b3b3",
  "name": "kanhaiya",
  "email": "kanhaiya@iiitmanipur.ac.in",
  "password": "U2FsdGVkX187aFyY5jhd7ZalIABkezgQCkZy6/56Qzo=",
  "issuperAdmin": true,
  "__v": 0
}

## Note:-

1. These are the only two API end point which is publically available.
2. All checkpoints are added by admin and path has been created by admin by selecting some checkpoints.
3. There are other API end-point as well and has not been exposed for user purpose/front-end purpose as internal logic is being used and pass through pathtofollow   API and all routes need super-Admin access.
4. Even Admin has to authenticate himself and for authorization purpose json-web-token has been used.
5. Backend code has been deployed to Herkou in development environments. 
6. You need not to install it locally to access the API.

### Note:-

1. You can also pass lattitude and longitude of the start and end locations ,instead of just passing place name.
2. Isdeleted filed has been added to schema as in real scenerio I am deleting data just updating the status as true.
   purpose to not deleting data is as administrator may need this data in fututre or someone may hit delete route by mistake.
   



