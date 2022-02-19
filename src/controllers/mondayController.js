const fs = require('fs')
const path = require('path')

const mondayScheduleFilePath = path.join(__dirname, '../data/monday.json');
const mondaySchedule = JSON.parse(fs.readFileSync(mondayScheduleFilePath, 'utf-8'));

const monday = mondaySchedule.filter(i => i.day === "monday")
var mondayFree = monday.filter(time => time.reserved == 0)
var mondayReserved = monday.filter(time => time.reserved == 1)

const mondayController = {
    view: (req, res) => {
        console.log(profits)
        res.render('index', { profits : profits })
    },
    monday: (req, res) => {
        res.render('monday', { mondayFree : mondayFree, mondayReserved : mondayReserved })
    },
    addMonday: (req,res) => {
        let reservedTime = req.body.time
        let courtNumber = req.body.court
        let timeToReserve = mondayFree.filter(i => i.time == reservedTime && i.court == courtNumber)
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
        mondayFree = monday.filter(time => time.reserved == 0)
        mondayReserved = monday.filter(time => time.reserved == 1)

        let mondayJSON = JSON.stringify(mondaySchedule, null, ' ')
		fs.writeFileSync(mondayScheduleFilePath, mondayJSON)
        res.redirect('/monday')
    },
    resetMonday: (req, res) => {
        let toReset = mondayReserved.filter(i => i.fixed == 0)
        toReset.forEach(i => {
            i.reserved = 0,
            i.name = "",
            i.tel = ""
        })

        mondayFree = monday.filter(time => time.reserved == 0)
        mondayReserved = monday.filter(time => time.reserved == 1)

        let mondayJSON = JSON.stringify(mondaySchedule, null, ' ')
		fs.writeFileSync(mondayScheduleFilePath, mondayJSON)
        res.redirect('/monday')
    },
    deleteFixed: (req, res) => {
        let toDeleteId = req.params.id
        mondayReserved.forEach(i => {
            if(i.id == toDeleteId) {
                i.fixed = 0
                i.reserved = 0,
                i.name = "",
                i.tel = ""
            }
        }) 

        mondayFree = monday.filter(time => time.reserved == 0)
        mondayReserved = monday.filter(time => time.reserved == 1)

        let mondayJSON = JSON.stringify(mondaySchedule, null, ' ')
		fs.writeFileSync(mondayScheduleFilePath, mondayJSON)
        res.redirect('/monday')
    }
}

module.exports = mondayController