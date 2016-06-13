var PassengerHelper = {
    hasPassenger : function(seat) {
        var toReturn = false;
        if(seat.currentPassenger
            && seat.currentPassenger.personnalInfos 
            && seat.currentPassenger.personnalInfos.title) {
            
            toReturn = true;
        }
        return toReturn;
    },
    samePassenger : function(passenger, toCompare) {
        var toReturn = false;
        if(passenger.personnalInfos && passenger.personnalInfos.firstname == toCompare.personnalInfos.firstname
            && passenger.personnalInfos.lastname == toCompare.personnalInfos.lastname) {
                toReturn = true;
        }
        return toReturn;
    }
    
};

module.exports = PassengerHelper;
