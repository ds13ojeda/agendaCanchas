const express = require('express');
const router = express.Router();

//Controllers
const controller = require('../controllers/mainController');
const mondayController = require('../controllers/mondayController')
const tuesdayController = require('../controllers/tuesdayController')
const wednesdayController = require('../controllers/wednesdayController')
const thursdayController = require('../controllers/thursdayController')
const fridayController = require('../controllers/fridayController')
const saturdayController = require('../controllers/saturdayController')
const sundayController = require('../controllers/sundayController')

/* GET home page. */
router.get('/', controller.view)

/* Lunes */ 
router.get('/monday', mondayController.monday)
router.put('/monday', mondayController.addMonday)
router.put('/monday/reset', mondayController.resetMonday)
router.put('/monday/delete/:id', mondayController.deleteFixed)

/* Martes */ 
router.get('/tuesday', tuesdayController.tuesday)
router.put('/tuesday', tuesdayController.addTuesday)
router.put('/tuesday/reset', tuesdayController.resetTuesday)
router.put('/tuesday/delete/:id', tuesdayController.deleteFixed)

/* Miércoles */ 
router.get('/wednesday', wednesdayController.wednesday)
router.put('/wednesday', wednesdayController.addWednesday)
router.put('/wednesday/reset', wednesdayController.resetWednesday)
router.put('/wednesday/delete/:id', wednesdayController.deleteFixed)

/* Jueves */ 
router.get('/thursday', thursdayController.thursday)
router.put('/thursday', thursdayController.addThursday)
router.put('/thursday/reset', thursdayController.resetThursday)
router.put('/thursday/delete/:id', thursdayController.deleteFixed)

/* Viernes */ 
router.get('/friday', fridayController.friday)
router.put('/friday', fridayController.addFriday)
router.put('/friday/reset', fridayController.resetFriday)
router.put('/friday/delete/:id', fridayController.deleteFixed)

/* Sábado */ 
router.get('/saturday', saturdayController.saturday)
router.put('/saturday', saturdayController.addSaturday)
router.put('/saturday/reset', saturdayController.resetSaturday)
router.put('/saturday/delete/:id', saturdayController.deleteFixed)

/* Domingo */ 
router.get('/sunday', sundayController.sunday)
router.put('/sunday', sundayController.addSunday)
router.put('/sunday/reset', sundayController.resetSunday)
router.put('/sunday/delete/:id', sundayController.deleteFixed)


module.exports = router;
