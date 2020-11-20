function() {
    var serverLink = this;
    var roomData = serverLink.data.roomData;
    var rowRel = serverLink.data.rowRel;
    var rackRel = serverLink.data.rackRel;
    var cityData = serverLink.data.cityData;
    var roomSysidName = serverLink.data.roomSysidName;
    var roomSysid;
    var rackCount;
    var roomName;
    var roomNameList = [];
    var preLink;
    var cityNames = [];
    preLink = document.getElementById("report");
    cityNames = Object.keys(cityData);
    cityNames.sort();
    cityNames.forEach(function(cityName){
        //preLink.innerText += cityName + "\n"
        roomNameList = [];
        cityData[cityName].forEach(function(roomSysid){
            roomName = roomSysidName[roomSysid];
            roomNameList.push(roomName);
        })
        roomNameList.sort();
        roomNameList.forEach(function(roomName){
            rackCount = 0;
            roomSysid = roomData[roomName];
            if (rowRel.hasOwnProperty(roomSysid)){
                rowRel[roomSysid].forEach(function(rowSysid){
                    if (rackRel.hasOwnProperty(rowSysid)){
                        rackRel[rowSysid].forEach(function(rackSysid){
                            rackCount += 1;
                        });
                    }
                });
            }
            preLink.innerText += cityName +", " + roomName + ", " + rackCount + "\n"
        });
    });
    // console data
    console.clear();
    console.log(cityNames);
    console.log("roomData");
    console.log(roomData);
    console.log("rowRel");
    console.log(rowRel);
    console.log("rackRel");
    console.log(rackRel);
}