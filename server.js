(function() {
    // rooms
    var roomResult = getRooms();
    var roomData = roomResult["roomData"];
    var roomSysidList = roomResult["roomSysidList"];
	  var cityData = roomResult["cityData"];
	  var roomSysidName = roomResult["roomSysidName"];
    // rows
    var rowResult = getRows(roomSysidList);
    var rowRel = rowResult["rowRel"];
    var rowSysidList = rowResult["rowSysidList"];
    // racks
    var rackResult = getRacks(rowSysidList);
    var rackRel = rackResult["rackRel"];
    // send data to client
	  data.cityData = cityData;
    data.roomData = roomData;
	  data.roomSysidName = roomSysidName;
    data.rowRel = rowRel;
    data.rackRel = rackRel;
		//
    function getRooms(){
        var roomData = {};
        var roomSysidList = [];
			  var cityData = {};
			  var city;
			  var roomSysidName = {};
			  var roomName;
			  var roomSysid;
        grRooms = new GlideRecord("cmdb_ci_computer_room");
        grRooms.query();
        while (grRooms.next()) {
					  roomName = grRooms.name.getValue();
					  roomSysid = grRooms.sys_id.getValue();
					  city = grRooms.location.city.getValue();
					  if (!city){
							city = "City Missing";
						}
            roomData[roomName] = roomSysid;
            roomSysidList.push(roomSysid);
					  if (!cityData.hasOwnProperty(city)){
							cityData[city] = [];
						}
						cityData[city].push(grRooms.sys_id.getValue())
					  roomSysidName[roomSysid] = roomName;
        }
        return({
					  "cityData": cityData,
            "roomData": roomData,
            "roomSysidList": roomSysidList,
					  "roomSysidName": roomSysidName
        })
    }
    function getRows(roomSysidList) {
        var rowSysidList = [];
        var rowRel = {};
        var parent;
        var child;
        grRoomZoneRelationships = new GlideRecord("cmdb_rel_ci");
        grRoomZoneRelationships.addQuery("parent", "IN", roomSysidList);
        grRoomZoneRelationships.query();
        while (grRoomZoneRelationships.next()) {
            parent = grRoomZoneRelationships.parent.getValue();
            child = grRoomZoneRelationships.child.getValue();
            rowSysidList.push(child);
            if (!rowRel.hasOwnProperty(parent)){
                rowRel[parent] = [];
            }
            rowRel[parent].push(child);
        }
        return({
            "rowRel": rowRel,
            "rowSysidList": rowSysidList
        })
    }
    function getRacks(rowSysidList){
        var rackRel = {};
        var parent;
        var child;
        var grZoneRackRelationships = new GlideRecord("cmdb_rel_ci");
        grZoneRackRelationships.addQuery("parent", "IN", rowSysidList);
        grZoneRackRelationships.limit(rowSysidList.length);
        grZoneRackRelationships.query();
        while (grZoneRackRelationships.next()) {
            parent = grZoneRackRelationships.parent.getValue();
            child = grZoneRackRelationships.child.getValue();
            if (!rackRel.hasOwnProperty(parent)){
                rackRel[parent] = [];
            }
            rackRel[parent].push(child);
        }
        return({
            "rackRel": rackRel
        })

    }
})();