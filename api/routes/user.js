let express = require('express');
let router = express.Router();


router.get('/',(req,res)=>{
    res.status(405).json({err:'not implemeted yet'})
})
router.post('/',(req,res)=>{
    res.status(405).json({err:'not implemeted yet'})
})
router.put('/',(req,res)=>{
    res.status(405).json({err:'not implemeted yet'})
})
router.delete('/',(req,res)=>{
    res.status(405).json({err:'not implemeted yet'})
})



module.exports = router;