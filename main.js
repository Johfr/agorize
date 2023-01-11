// Available windows
let startDate = new Date(2016,6,1,10,30) // July 1st, 10:30
let endDate = new Date(2016,6,1,14,00) // July 1st, 14:00
let reccuringDate = new Event(true, true, startDate, endDate) // weekly recurring opening in calendar

// Rdv resident 1
startDate = new Date(2016,6,8,11,30) // July 8th 11:30
endDate = new Date(2016,6,8,12,30) // July 8th 12:30
new Event(false, false, startDate, endDate) // intervention scheduled

// Rdv resident 2
// startDate = new Date(2016,6,8,12,30) // July 8th 11:30
// endDate = new Date(2016,6,8,13,00) // July 8th 12:30
// new Event(false, false, startDate, endDate) // intervention scheduled

// Rdv resident 3
// startDate = new Date(2016,6,8,10,30) // July 8th 11:30
// endDate = new Date(2016,6,8,11,00) // July 8th 12:30
// new Event(false, false, startDate, endDate) // intervention scheduled

// recherche du 04 au 10 juillet par le résident 2
let fromDate = new Date(2016,6,4,10,00) // 4 juillet à 10h
let toDate = new Date(2016,6,10,10,00) // 10 juillet à 10h

CheckAvailabilities.prototype.availabilities(fromDate, toDate)

/*
* Answer should be :
* I'm available from July 8th, at 10:30, 11:00, 12:30, 13:00, and 13:30
* I'm not available any other time !
*/

const PlomberieFaure = new CheckAvailabilities(startDate, endDate)
const PlomberieFaureAvailabilities = PlomberieFaure.availabilities(fromDate, toDate)
console.log(PlomberieFaureAvailabilities)
