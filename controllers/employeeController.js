const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var {Employee} = require('../models/employee');

//localhost:3000/employees/
router.get('/',(req,res)=>{
    Employee.find((err, docs)=>{
        if(!err){
            res.send(docs);
        }
        else{
            console.log('Error receiving employees' + JSON.stringfy(err,undefined,2));
        }
    });
});

router.get('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id: ${req.params.id}`);

    Employee.findById(req.params.id,(err,doc)=>{
        if(!err)
        {
            res.send(doc);

        }else
        {
            console.log('error in retrieving Employee:'+JSON.stringify(err,undefined,2));
        }

    })
});


function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

router.get("/getname/:name", function(req, res) {
    if (req.params.name) {
       const regex = new RegExp(escapeRegex(req.params.name), 'gi');
       Employee.find({ "name": regex }, function(err, doc) {
           if(err) {
               console.log(err);
           } else {
             // res.render("jobs/index", { jobs: foundjobs });
             res.send(doc);
           }
       }); 
    }
});








router.post('/',(req,res)=>{
    var emp = new Employee({
        name:req.body.name,
        position:req.body.position,
        office:req.body.office,
        salary:req.body.salary,
    });
    emp.save((err,doc)=>{
        if(!err){
            res.send(doc);
        }else{
            console.log('Error in Employee save:'+ JSON.stringify(err,undefined,2));
        }
    });
});

router.put('/:id',(req,res) => {

    if(!ObjectId.isValid(req.params.id))
    {
        return res.status(400).send(`No record with given id: ${req.params.id}`);
    }

    var emp ={
        name:req.body.name,
        position:req.body.position,
        office:req.body.office,
        salary:req.body.salary,
    };

    Employee.findByIdAndUpdate(req.params.id,{$set:emp},{new:true},(err,doc)=>{
      if(!err){
          res.send(doc);
      }
      else{
          console.log('Error in Employee Update:'+JSON.stringify(err, undefined,2));
      }


    });
});

router.delete('/:id',(req,res)=>{
if(!ObjectId.isValid(req.params.id))
 return res.status(400).send(`No record with given id:${req.params.id}`);

Employee.findByIdAndRemove(req.params.id,(err,doc)=>{
if(!err)
{
    res.send(doc);
}else{
    console.log('error in Employee Delete:'+JSON.stringify(err,undefined,2));
}
});

});


module.exports=router;