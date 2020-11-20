function() {
    var serverLink = this;
    var roomData = serverLink.data.roomData;
    var rowRel = serverLink.data.rowRel;
    var rackRel = serverLink.data.rackRel;
    var roomSysid;
    var rackCount;
    var preLink = document.getElementById("report");
    var roomNames = Object.keys(roomData);
    roomNames.sort();
    roomNames.forEach(function(roomName){
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
        preLink.innerText += roomName + " = " + rackCount + " racks.\n"
    });
    // console data
    console.log("roomData");
    console.log(roomData);
    console.log("rowRel");
    console.log(rowRel);
    console.log("rackRel");
    console.log(rackRel);
  }