const fs = require('fs')
const path = require('path')

const saturdayScheduleFilePath = path.join(__dirname, '../data/saturday.json');
const saturdaySchedule = JSON.parse(fs.readFileSync(saturdayScheduleFilePath, 'utf-8'));

const saturday = saturdaySchedule.filter(i => i.day === "saturday")
var saturdayFree = saturday.filter(time => time.reserved == 0)
var saturdayReserved = saturday.filter(time => time.reserved == 1)

const saturdayController = {
    saturday: (req, res) => {
        res.render('saturday', { saturdayFree : saturdayFree, saturdayReserved : saturdayReserved })
    },
    addSaturday: (req,res) => {
        let reservedTime = req.body.time
        let courtNumber = req.body.court
        let timeToReserve = saturdayFree.filter(i => i.time == reservedTime && i.court == courtNumber)
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
        saturdayFree = saturday.filter(time => time.reserved == 0)
        saturdayReserved = saturday.filter(time => time.reserved == 1)

        let saturdayScheduleJSON = JSON.stringify(saturdaySchedule, null, ' ')
		fs.writeFileSync(saturdayScheduleFilePath, saturdayScheduleJSON)
        res.redirect('/saturday')
    },
    resetSaturday: (req, res) => {
        let toReset = saturdayReserved.filter(i => i.fixed == 0)
        toReset.forEach(i => {
            i.reserved = 0,
            i.name = "",
            i.tel = ""
        })

        saturdayFree = saturday.filter(time => time.reserved == 0)
        saturdayReserved = saturday.filter(time => time.reserved == 1)

        let saturdayScheduleJSON = JSON.stringify(saturdaySchedule, null, ' ')
		fs.writeFileSync(saturdayScheduleFilePath, saturdayScheduleJSON)
        res.redirect('/saturday')
    },
    deleteFixed: (req, res) => {
        let toDeleteId = req.params.id
        saturdayReserved.forEach(i => {
            if(i.id == toDeleteId) {
                i.fixed = 0
                i.reserved = 0,
                i.name = "",
                i.tel = ""
            }
        }) 

        saturdayFree = saturday.filter(time => time.reserved == 0)
        saturdayReserved = saturday.filter(time => time.reserved == 1)

        let saturdayScheduleJSON = JSON.stringify(saturdaySchedule, null, ' ')
		fs.writeFileSync(saturdayScheduleFilePath, saturdayScheduleJSON)
        res.redirect('/saturday')
    }
}


module.exports = saturdayController
