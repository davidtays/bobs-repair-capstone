var jwt = require('express-jwt');
var auth = jwt({
    userProperty:'payload'
});
//applies middleware
router.get('/profile', auth, ctrlProfile.profileRead);

//handles errors and unauthorized
app.use(function(err,req,tes,next){
    if (err.name==='UnauthorizedError'){
        res.status(401);
        res.json({"message" :err.name + ": " + err.message});
    }
});