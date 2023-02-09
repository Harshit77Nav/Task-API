const router = require("express").Router();
const Tmodel = require("../model/taskmodel")


router.post("/v1/tasks", async(req,res)=>{
    try {
        const prevId = await Tmodel.find()
        if(prevId.length == 0){
            const id = 1;
            const result = await Tmodel.create({
                id:id,
                task:req.body.task,
                is_completed:false
            })
            res.status(201).json({
                id:id
            })
        } else {
            let temp = prevId[prevId.length-1];
            let id = parseInt(temp.id +1);
            const result = await Tmodel.create({
                id:id,
                task:req.body.task,
                is_completed:false
            })
            res.status(201).json({
                id:id,
            })
        }
    } catch (error) {
        res.json({
            status:error.message,
        })
    }
})

router.get("/v1/tasks", async (req,res)=>{
    try {
        const  result = await Tmodel.find()
        res.status(200).json({
            result
        })
    } catch (error) {
        res.json({
            status:error.message
        })
    }
})

router.get("/v1/tasks/:id", async(req,res)=>{
    try {
        const task = await Tmodel.findOne({id:req.params.id})
        if(task){
            res.status(200).json({
                task
            })
        } else{
            res.status(404).json({
                error: "There is no task at that id",
            })
        }

    } catch (error) {
        res.json({
            status:error.message
        })
    }
})

router.delete("/v1/tasks/:id", async(req,res)=>{
    try {
        const task = await Tmodel.deleteOne({id:req.params.id})
        if(task){
            res.sendStatus(204)
        } else {
            res.sendStatus(204)
        }
    } catch (error) {
        res.json({
            status:error.message
        })
    }
})

router.put("/v1/tasks/:id", async (req,res)=>{
    try {
        const task = await Tmodel.updateOne({id:req.params.id},{
            id:req.params.id,
            task:req.body.task,
            is_completed:req.body.is_completed
        })
        if(task){
            res.sendStatus(204)
        } else{
            res.status(404).json({
                error: "There is no task at that id"
            })
        }
    } catch (error) {
        res.json({
            status:error.message
        })
    }
})

router.post("/v1/tasks/bulk", async(req,res)=>{
    try {
        const prevId = await Tmodel.find()
        let temp = prevId[prevId.length-1];
        const id = parseInt(temp.id+1);
        let task = [];
        let result = req.body
        const data = result.task.map(async (item,index)=>{
            const result = await Tmodel.create({
                id:parseInt(id+index),
                task:item.task,
                is_completed:item.is_completed
            })
            task.push({id:id+index})
        })
        res.status(201).json({
            task
        })
    }catch (error) {
        res.json({
            status:error.message
        })
    }
})

router.delete("/v1/tasks/", async(req,res)=>{
    try {
        let result = req.body
        const data = result.tasks.map(async (item)=>{
            const delTask = await Tmodel.deleteOne({id:item.id})
        })
        res.sendStatus(204)
    } catch (error) {
        res.json({
            status:error.message
        })
    }
})


module.exports = router;