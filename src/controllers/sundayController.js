const fs = require('fs')
const path = require('path')

const sundayScheduleFilePath = path.join(__dirname, '../data/sunday.json');
const sundaySchedule = JSON.parse(fs.readFileSync(sundayScheduleFilePath, 'utf-8'));

const sunday = sundaySchedule.filter(i => i.day === "sunday")
var sundayFree = sunday.filter(time => time.reserved == 0)
var sundayReserved = sunday.filter(time => time.reserved == 1)

const sundayController = {
    sunday: (req, res) => {
        res.render('sunday', { sundayFree : sundayFree, sundayReserved : sundayReserved })
    },
    addSunday: (req,res) => {
        let reservedTime = req.body.time
        let courtNumber = req.body.court
        let timeToReserve = sundayFree.filter(i => i.time == reservedTime && i.court == courtNumber)
        console.log(timeToReserve)
        if (timeToReserve.length == 1){
            timeToReserve[0].reserved = 1
            timeToReserve[0].name = req.body.name
            timeToReserve[0].tel = req.body.tel
            if (req.body.fixed) {
                timeToReserve[0].fixed = 1
            } 
        }

        /* Esto es para que al redireccionar no siga apareciendo */ 
        sundayFree = sunday.filter(time => time.reserved == 0)
        sundayReserved = sunday.filter(time => time.reserved == 1)

        let sundayScheduleJSON = JSON.stringify(sundaySchedule, null, ' ')
		fs.writeFileSync(sundayScheduleFilePath, sundayScheduleJSON)
        res.redirect('/sunday')
    },
    resetSunday: (req, res) => {
        let toReset = sundayReserved.filter(i => i.fixed == 0)
        toReset.forEach(i => {
            i.reserved = 0,
            i.name = "",
            i.tel = ""
        })

        sundayFree = sunday.filter(time => time.reserved == 0)
        sundayReserved = sunday.filter(time => time.reserved == 1)

        let sundayScheduleJSON = JSON.stringify(sundaySchedule, null, ' ')
		fs.writeFileSync(sundayScheduleFilePath, sundayScheduleJSON)
        res.redirect('/sunday')
    },
    deleteFixed: (req, res) => {
        let toDeleteId = req.params.id
        sundayReserved.forEach(i => {
            if(i.id == toDeleteId) {
                i.fixed = 0
                i.reserved = 0,
                i.name = "",
                i.tel = ""
            }
        }) 

        sundayFree = sunday.filter(time => time.reserved == 0)
        sundayReserved = sunday.filter(time => time.reserved == 1)

        let sundayScheduleJSON = JSON.stringify(sundaySchedule, null, ' ')
		fs.writeFileSync(sundayScheduleFilePath, sundayScheduleJSON)
        res.redirect('/sunday')
    }
}


module.exports = sundayController
