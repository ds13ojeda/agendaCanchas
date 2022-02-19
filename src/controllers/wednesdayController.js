const fs = require('fs')
const path = require('path')

const wednesdayScheduleFilePath = path.join(__dirname, '../data/wednesday.json');
const wednesdaySchedule = JSON.parse(fs.readFileSync(wednesdayScheduleFilePath, 'utf-8'));

const wednesday = wednesdaySchedule.filter(i => i.day === "wednesday")
var wednesdayFree = wednesday.filter(time => time.reserved == 0)
var wednesdayReserved = wednesday.filter(time => time.reserved == 1)

const wednesdayController = {
    wednesday: (req, res) => {
        res.render('wednesday', { wednesdayFree : wednesdayFree, wednesdayReserved : wednesdayReserved })
    },
    addWednesday: (req,res) => {
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
        wednesdayFree = wednesday.filter(time => time.reserved == 0)
        wednesdayReserved = wednesday.filter(time => time.reserved == 1)

        let wednesdayScheduleJSON = JSON.stringify(wednesdaySchedule, null, ' ')
		fs.writeFileSync(wednesdayScheduleFilePath, wednesdayScheduleJSON)
        res.redirect('/wednesday')
    },
    resetWednesday: (req, res) => {
        let toReset = wednesdayReserved.filter(i => i.fixed == 0)
        toReset.forEach(i => {
            i.reserved = 0,
            i.name = "",
            i.tel = ""
        })

        wednesdayFree = wednesday.filter(time => time.reserved == 0)
        wednesdayReserved = wednesday.filter(time => time.reserved == 1)

        let wednesdayScheduleJSON = JSON.stringify(wednesdaySchedule, null, ' ')
		fs.writeFileSync(wednesdayScheduleFilePath, wednesdayScheduleJSON)
        res.redirect('/wednesday')
    },
    deleteFixed: (req, res) => {
        let toDeleteId = req.params.id
        wednesdayReserved.forEach(i => {
            if(i.id == toDeleteId) {
                i.fixed = 0
                i.reserved = 0,
                i.name = "",
                i.tel = ""
            }
        }) 

        wednesdayFree = wednesday.filter(time => time.reserved == 0)
        wednesdayReserved = wednesday.filter(time => time.reserved == 1)

        let wednesdayJSON = JSON.stringify(wednesdaySchedule, null, ' ')
		fs.writeFileSync(wednesdayScheduleFilePath, wednesdayJSON)
        res.redirect('/wednesday')
    }
}


module.exports = wednesdayController
