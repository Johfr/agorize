// get the friday into the week searched
const getFriday = function (fromDate, toDate) {
    const concatedDayName = ['Sun', 'Mon', 'Thu', 'Wed', 'Thi', 'Fri', 'Sat']
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    
    Date.prototype.addDays = function(days) {
        let date = new Date(this.valueOf())
        date.setDate(date.getDate() + days)
        return date
    }
 
    function getDates(startDate, stopDate) { // push each day between 2 dates
        const dateArray = new Array()
        let currentDate = startDate

        while (currentDate <= stopDate) {
            dateArray.push(currentDate)
            currentDate = currentDate.addDays(1)
        }

        return dateArray
    }
 
    const dateArray = getDates(fromDate, toDate) // array of 7 days (from monday to sunday)

    const isFriday = dateArray.find(date => date.getDay() === 5) // extraction of friday's date

    const formatedDate = { // return day, date and month of the friday
        date: isFriday.getDate(),
        day: concatedDayName[isFriday.getDay()],
        month: months[isFriday.getMonth()],
    }
    
    return {
        isFriday,
        formatedDate,
    }
}

let eventList = []
const openingWindows = ['10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30']; // list of eekly recurring opening in calendar
const availableWindows = structuredClone(openingWindows); // available windows to display
let resultMessage = null

class Event {
    constructor(opening, recurring, startDate, endDate) {
        this.opening = opening;
        this.recurring = recurring;
        this.startDate = startDate;
        this.endDate = endDate;
        eventList.push(this);
    }
}

class CheckAvailabilities {
    availabilities(fromDate, toDate) {
        eventList.forEach(event => {
            if (!event.opening && !event.recurring) {
                let availableFridays = getFriday(fromDate, toDate).formatedDate; // extract the friday date (july 8th)
                
                // get busy Hours
                const busyStart = event.startDate.getHours() + ':' + (event.startDate.getMinutes() <10 ? '0': '') + event.startDate.getMinutes() // return a 2 digit number for minutes
                const busyEnd = event.endDate.getHours() + ':' + (event.endDate.getMinutes() <10 ? '0': '') + event.endDate.getMinutes()
                const busyDate = event.startDate.getDate()

                // check if the date is the same from the week searched and the scheduled intervention
                // verify if the busyEnd hour exist in the weekly recurring opening
                if (availableFridays.date === busyDate && availableWindows.includes(busyEnd)) {
                    // remove intermediate hours between start and end of sheduled intervention
                    if (availableWindows.includes(busyStart)) {
                        // get the index of busyHours in availableWindows
                        let startIndex = availableWindows.indexOf(busyStart)
                        let endIndex = availableWindows.indexOf(busyEnd)
                        
                        availableWindows.splice(startIndex, endIndex - startIndex) // remove X elements from startIndex to endIndex (busyEnd hour)
                    }
                    
                    // save into availableFridays (friday, july 8th) all available windows
                    availableFridays.availableWindows = availableWindows
                } else { // we return an empty array if the busyEnd hour is greater than the weekly recurring opening end hour 
                    availableFridays.availableWindows = []
                }

                // check if we still have available hours
                if (availableFridays.availableWindows.length > 0) {
                    resultMessage = 
                        `
                            I'm available from ${availableFridays.month} ${availableFridays.date}th, at ${availableFridays.availableWindows}.
                            I'm not available any other time !
                        `
                } else {
                    resultMessage = "Sorry, I'm not available at all !"
                }
                
            }
        })
        return resultMessage
    }
}