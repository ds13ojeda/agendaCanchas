const fs = require('fs')
const path = require('path')

const tuesdayScheduleFilePath = path.join(__dirname, '../data/tuesday.json');
const tuesdaySchedule = JSON.parse(fs.readFileSync(tuesdayScheduleFilePath, 'utf-8'));

const tuesday = tuesdaySchedule.filter(i => i.day === "tuesday")
var tuesdayFree = tuesday.filter(time => time.reserved == 0)
var tuesdayReserved = tuesday.filter(time => time.reserved == 1)

const tuesdayController = {
    tuesday: (req, res) => {
        res.render('tuesday', { tuesdayFree : tuesdayFree, tuesdayReserved : tuesdayReserved })
    },
    addTuesday: (req,res) => {
        let reservedTime = req.body.time
        let courtNumber = req.body.court
        let timeToReserve = tuesdayFree.filter(i => i.time == reservedTime && i.court == courtNumber)
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
        tuesdayFree = tuesday.filter(time => time.reserved == 0)
        tuesdayReserved = tuesday.filter(time => time.reserved == 1)

        let tuesdayScheduleJSON = JSON.stringify(tuesdaySchedule, null, ' ')
		fs.writeFileSync(tuesdayScheduleFilePath, tuesdayScheduleJSON)
        res.redirect('/tuesday')
    },
    resetTuesday: (req, res) => {
        let toReset = tuesdayReserved.filter(i => i.fixed == 0)
        toReset.forEach(i => {
            i.reserved = 0,
            i.name = "",
            i.tel = ""
        })

        tuesdayFree = tuesday.filter(time => time.reserved == 0)
        tuesdayReserved = tuesday.filter(time => time.reserved == 1)

        let tuesdayScheduleJSON = JSON.stringify(tuesdaySchedule, null, ' ')
		fs.writeFileSync(tuesdayScheduleFilePath, tuesdayScheduleJSON)
        res.redirect('/tuesday')
    },
    deleteFixed: (req, res) => {
        let toDeleteId = req.params.id
        tuesdayReserved.forEach(i => {
            if(i.id == toDeleteId) {
                i.fixed = 0
                i.reserved = 0,
                i.name = "",
                i.tel = ""
            }
        }) 

        tuesdayFree = tuesday.filter(time => time.reserved == 0)
        tuesdayReserved = tuesday.filter(time => time.reserved == 1)

        let tuesdayScheduleJSON = JSON.stringify(tuesdaySchedule, null, ' ')
		fs.writeFileSync(tuesdayScheduleFilePath, tuesdayScheduleJSON)
        res.redirect('/tuesday')
    }
}


module.exports = tuesdayController
