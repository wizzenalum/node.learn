const express = require('express'); // this is same express instance all over this project
const { home } = require('../../../5_project_template/controlers/home_controler');

const router = express.Router(); // inbuild class used to cerate modular mountable routes.


let homeControler =  require('../controllers/homeController'); // importing home controller which store index action.

console.log("route index is called");  // check point


router.get('', homeControler.index); // route to index action
router.post('/create',homeControler.create);
router.get('/delete',homeControler.delete);
router.get('/delete-multi',homeControler.deleteMulti);

module.exports = router;  