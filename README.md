# MAP BASED EVENT PLANNER


# Publically available API
https://bootcamppluangproject.herokuapp.com/api/paths/pathtofollow/{Start_Locatio}/{End_Location}
https://bootcamppluangproject.herokuapp.com/api/admin/{Admin_Id}
https://bootcamppluangproject.herokuapp.com/api/distance/{Current_Checkpoint}/{Upcoming_Checkpoint}
http://localhost:3000/api/distance/multi/start/{start_loc1}/{start_loc2}/{start_loc3}/end/{end_loc1}/{end_loc2}/{end_loc3}


Example:

1. Start Location = Delhi
2. End Location.  =Mumbai


You can hit API to get the checkpoints as:-

https://bootcamppluangproject.herokuapp.com/api/paths/pathtofollow/Delhi/Mumbai

# Response 👇

# Data will look like below:-

<img width="1098" alt="full_name" src="https://user-images.githubusercontent.com/98042683/154496979-172fa6f0-55a6-4f18-bccf-fa5f70eb029f.png">






Now you can see above ,you are getting only _id of the person ,who added the checkpoint.
You can hit below API for getting the complete info of the person who added the checkpoints

# Explanations:

Above API returning objects having 👇

1. start locations added by you/user.
2. end locations added by you/user.
3. There are two checkpoints/waypoints created by admin.

Now you need who added this checkpoint but you already know his user _id right?

# So you can acess,who created this checkpoint by hitting the API :-

Just copy the added by _id from above data and paste it in place of {admin_id}

https://kanhaiyaproj.herokuapp.com/api/admin/{admin_id}

# Example:-

admin_id=620d21cc00dfbc6f0173b3b3

https://bootcamppluangproject.herokuapp.com/api/admin/620d21cc00dfbc6f0173b3b3

# Response 👇

# Data formate is shown Below:-

<img width="647" alt="data" src="https://user-images.githubusercontent.com/98042683/154679014-6db0d660-4fcb-4ed4-a0ce-f09fc13bd820.png">



# Calculating travel time and Travel Distance between two check-points

From above API we have starting and ending locations and now we want to calculate :-

1. what is the estimated distance between current checkpoint and upcoming checkpoints
2. What is the estimated travel time between current checkpoint and upcoming checkpoints 

We can calculate above using the below API :- 

https://kanhaiyaproj.herokuapp.com/api/distance/{current_checkpoint}/{upcoming_checkpoint}

## Example

suppose my current location/checkpoint is = Delhi

My upcoming checkpoint is = Gurgaon

so we will hit API as :- 

https://bootcamppluangproject.herokuapp.com/api/distance/Delhi/Gurgaon


## Response will look like 👇



<img width="526" alt="Screenshot 2022-02-18 at 4 21 10 PM" src="https://user-images.githubusercontent.com/98042683/154670115-fd9ac732-340a-4b63-bc7a-570cb9e7ee59.png">




## Now in case you want distances between all the checkpoints(array of locations):-

You can hit the API:-

http://localhost:3000/api/distance/multi/start/{start1}/{start2}/end/{end1}/{end2}

Example:-
1. startlocation1=Delhi
2. startlocation2=Mumbai

1. endlocation1=Maharastra
2. endlocation2=UttarPradesh


You will Call the API as:-

http://localhost:3000/api/distance/multi/start/Delhi/Mumbai/end/Maharastra/UttarPradesh

### Once you hit the API,you response will look like below:-

<img width="291" alt="Screenshot 2022-02-22 at 4 43 53 PM" src="https://user-images.githubusercontent.com/98042683/155125998-88b0a8e1-595d-4ffd-ad7f-9ab3af0fa87a.png">




## Note:-

1. These are the only two API end point which is publically available.
2. All checkpoints are added by admin and path has been created by admin by selecting some checkpoints.
3. There are other API end-point as well and has not been exposed for user purpose/front-end purpose as internal logic is being used and pass through pathtofollow   API and all routes need super-Admin access.
4. Even Admin has to authenticate himself and for authorization purpose json-web-token has been used.
5. Backend code has been deployed to Herkou in development environments. 
6. You need not to install it locally to access the API.

### Note:-

1. You can also pass lattitude and longitude of the start and end locations ,instead of just passing place name.
2. isdeleted field has been added to schema because as in real scenerio I am not deleting data just updating the status as true.
   purpose to not deleting data is as administrator may need this data in fututre or someone may hit delete route by mistake.
3. There are multiple path are available but API will randomly select one path for the requested user.
4. Authenticated admin will be able to create path,see path,add checkpoints,update,delete and so other operations.
   


## In case you want to use it locally 

1. Clone repo and before installing anything run following command 
2. npm -v(8.3.1)
3. node -v(v17.4.0)
4. Finally if all version satisfied,just run
5. npm install
6. now, npm start.


