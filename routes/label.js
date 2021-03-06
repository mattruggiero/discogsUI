const express = require('express');
const router = express.Router();
const API = require('../config/keys').API_KEY;
const API_KEY = process.env.API_KEY || API;


const Discogs = require( 'disconnect' ).Client;
let dis = new Discogs({userToken: API_KEY});
dis.setConfig({outputFormat: 'plaintext'});
let discogsDB = dis.database();



router.route('*').all((req, res, next)=>{
    console.log('Label Works: '+req.originalUrl);
    next();
})
.post((req,res) =>{
    const labelId = req.body.id;
    discogsDB.getLabel(labelId, (err,data) =>{
        if(err) {console.log(err)}
        else{
            res.send(data);
        }
    })
})

module.exports = router;