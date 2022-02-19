const fs = require('fs')
const path = require('path')

const fridayScheduleFilePath = path.join(__dirname, '../data/friday.json');
const fridaySchedule = JSON.parse(fs.readFileSync(fridayScheduleFilePath, 'utf-8'));

const friday = fridaySchedule.filter(i => i.day === "friday")
var fridayFree = friday.filter(time => time.reserved == 0)
var fridayReserved = friday.filter(time => time.reserved == 1)

const fridayController = {
    friday: (req, res) => {
        res.render('friday', { fridayFree : fridayFree, fridayReserved : fridayReserved })
    },
    addFriday: (req,res) => {
        let reservedTime = req.body.time
        let courtNumber = req.body.court
        let timeToReserve = wednesdayFree.filter(i => i.time == reservedTime && i.court == courtNumber)
        console.log(timeToReserve)
        if (timeToReserve.length == 1){
            timeToReserve[0].reserved = 1
            timeToReserve[0].name = req.body.name
            timeToReserve[0].tel = req.body.tel
            if (req.body.fixed) {
                a[0].fixed = 1
            } 
        }

        /* Esto es para que al redireccionar no siga apareciendo */ 
        fridayFree = friday.filter(time => time.reserved == 0)
        fridayReserved = friday.filter(time => time.reserved == 1)

        let fridayJSON = JSON.stringify(fridaySchedule, null, ' ')
		fs.writeFileSync(fridayScheduleFilePath, fridayJSON)
        res.redirect('/friday')
    },
    resetFriday: (req, res) => {
        let toReset = fridayReserved.filter(i => i.fixed == 0)
        toReset.forEach(i => {
            i.reserved = 0,
            i.name = "",
            i.tel = ""
        })

        fridayFree = friday.filter(time => time.reserved == 0)
        fridayReserved = friday.filter(time => time.reserved == 1)

        let fridayJSON = JSON.stringify(fridaySchedule, null, ' ')
		fs.writeFileSync(fridayScheduleFilePath, fridayJSON)
        res.redirect('/friday')
    },
    deleteFixed: (req, res) => {
        let toDeleteId = req.params.id
        fridayReserved.forEach(i => {
            if(i.id == toDeleteId) {
                i.fixed = 0
                i.reserved = 0,
                i.name = "",
                i.tel = ""
            }
        }) 

        fridayFree = friday.filter(time => time.reserved == 0)
        fridayReserved = friday.filter(time => time.reserved == 1)

        let fridayJSON = JSON.stringify(fridaySchedule, null, ' ')
		fs.writeFileSync(fridayScheduleFilePath, fridayJSON)
        res.redirect('/friday')
    }
}


module.exports = fridayController
