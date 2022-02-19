const fs = require('fs')
const path = require('path')

const thursdayScheduleFilePath = path.join(__dirname, '../data/thursday.json');
const thursdaySchedule = JSON.parse(fs.readFileSync(thursdayScheduleFilePath, 'utf-8'));

const thursday = thursdaySchedule.filter(i => i.day === "thursday")
var thursdayFree = thursday.filter(time => time.reserved == 0)
var thursdayReserved = thursday.filter(time => time.reserved == 1)

const thursdayController = {
    thursday: (req, res) => {
        res.render('thursday', { thursdayFree : thursdayFree, thursdayReserved : thursdayReserved })
    },
    addThursday: (req,res) => {
        let reservedTime = req.body.time
        let courtNumber = req.body.court
        let timeToReserve = thursdayFree.filter(i => i.time == reservedTime && i.court == courtNumber)
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
        thursdayFree = thursday.filter(time => time.reserved == 0)
        thursdayReserved = thursday.filter(time => time.reserved == 1)

        let thursdayScheduleJSON = JSON.stringify(thursdaySchedule, null, ' ')
		fs.writeFileSync(thursdayScheduleFilePath, thursdayScheduleJSON)
        res.redirect('/thursday')
    },
    resetThursday: (req, res) => {
        let toReset = thursdayReserved.filter(i => i.fixed == 0)
        toReset.forEach(i => {
            i.reserved = 0,
            i.name = "",
            i.tel = ""
        })

        thursdayFree = thursday.filter(time => time.reserved == 0)
        thursdayReserved = thursday.filter(time => time.reserved == 1)

        let thursdayScheduleJSON = JSON.stringify(thursdaySchedule, null, ' ')
		fs.writeFileSync(thursdayScheduleFilePath, thursdayScheduleJSON)
        res.redirect('/thursday')
    },
    deleteFixed: (req, res) => {
        let toDeleteId = req.params.id
        thursdayReserved.forEach(i => {
            if(i.id == toDeleteId) {
                i.fixed = 0
                i.reserved = 0,
                i.name = "",
                i.tel = ""
            }
        }) 

        thursdayFree = thursday.filter(time => time.reserved == 0)
        thursdayReserved = thursday.filter(time => time.reserved == 1)

        let thursdayScheduleJSON = JSON.stringify(thursdaySchedule, null, ' ')
		fs.writeFileSync(thursdayScheduleFilePath, thursdayScheduleJSON)
        res.redirect('/thursday')
    }
}


module.exports = thursdayController
