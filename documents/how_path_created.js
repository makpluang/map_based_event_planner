paths=[
    [
        [
            {
                "id":"checkpoint_id",
                "lattitude":"la1",
                "longitude":"lo1",
                "desc":"this is a H1B building",
                "image":"Image url",
                "isassigned":false
            },
            {ch2},
            {ch3},
            {ch4}
            
        ],
        {
            isassigned:true
        }
    ],
    [
        [
            {ch1},
            {ch2},
            {ch3},
            {ch4}
        ],
        {
            isassigned:true
        }
    ],
    [
        [
            {ch1},
            {ch2},
            {ch3},
            {ch4}
        ],
        {
            isassigned:true
        }
    ]];

path1=paths[0]// this is first path 
path2=paths[1]//this is second path
path3=paths[2]//this is third path

//you can see the path[0],path[1],path[2] all are inserted into paths array so filed is true
//now suppose we got random path from paths which is, path[0]

random_path=[
                [
                    {
                        "id":"checkpoint_id",
                        "lattitude":"la1",
                        "longitude":"lo1",
                        "desc":"this is a H1B building",
                        "image":"Image url",
                        "isassigned":false
                    },
                    {ch2},
                    {ch3},
                    {ch4}
                    
                ],
                {
                    isassigned:true
                }
]
checkpoints_array=random_path[0];
//now this checkpoints array ha 4 check points
ch1=checkpoints_array[0];
ch2=checkpoints_array[1];
ch3=checkpoints_array[2];
ch4=checkpoints_array[3]
//now we start and end point which we got by user
//and we also have path with checkpoints
/*
startlatiitude=laa
startlongitude=loo

endlattitude=lae
endlongitude=loe


*/

//how map API end point will look like?

/*
https://apis.mapmyindia.com/advancedmaps/v1/<licence_key>/ 
route?start=laa,loo & destination=lae,loe& viapoints={ch1la},{ch1lo}|{ch2la},{ch2lo} | {ch3la},{ch3lo} | {ch4la},{ch4lo}

*/

/*
{
    "_id": "620a7cbbc710458b9809dcb1",
    "route": [
    {
    "_id": "620a7a99aade24147cec2fcd",
    "lattitude": "la4",
    "longitude": "lo4",
    "about": "this is my gilrs hostel",
    "image": "https://github.com/mak-ux/Alumini_Tracking_System",
    "isassigned": false,
    "__v": 0
    },
    {
    "_id": "620a7ab7aade24147cec2fd0",
    "lattitude": "la1",
    "longitude": "lo1",
    "about": "this is boys hostel",
    "image": "https://github.com/mak-ux/Alumini_Tracking_System",
    "isassigned": false,
    "__v": 0
    }
    ],
    "isassigned": false,
    "__v": 0

    }

*/