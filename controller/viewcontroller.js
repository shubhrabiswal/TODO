const db = require("../Models");
const User = db.user;
const Comment = db.comment;
const Todo = db.todo;
const View = db.view;


exports.addviews = async (req, res) => {
    const { viewed_by, todo_id } = req.body;
    // console.log(viewed_by,todo_id)
    const todo_view = await View.findOne({where:{ todo_id: todo_id }});
    // console.log(todo_view.)
    // console.log("view",todo_view.dataValues)
    if (!todo_view) {
            // viewed_by = []   
            const view = new View({
               viewed_by, 
               todo_id
            });
            view.save().then((todo, error) => {
                if (todo) {
                    return res.status(201).json({
                        message: "viewed_by added successfully"
                    });
                }
                if (error) {
                    return res.status(400).json({
                        message: "Something went wrong",
                    });
                }
            });
        }else{
            const view = await View.findOne({where:{viewed_by:viewed_by,todo_id:todo_id}})
            
            // console.log("view",view)
            if(!view){
                const view = new View({
                    viewed_by, 
                    todo_id
                 });
                 view.save().then((todo, error) => {
                     if (todo) {
                         return res.status(201).json({
                             message: "viewed_by added successfully"
                         });
                     }
                     if (error) {
                         return res.status(400).json({
                             message: "Something went wrong",
                         });
                     }
                 });
            }else{
                return res.status(201).json({
                    message: "already viewed by the user"
                })
            }


        }
        
}



exports.getviewsByTodoId = async (req, res) => {
    let todo_id = req.params.id;
    const view = await View.findAndCountAll({where:{ todo_id: todo_id }})
        if(view) {
            const val = view.count
            res.status(200).json({ "view count":val });
        }
}

exports.todoIdSortedByView = async (req, res) => {
    const total_view = await View.findAndCountAll()
    let rows = total_view.rows
    let viewSet = []
    for(let view of rows ){
        let obj ={};
        obj["todo_id"] = view.dataValues.todo_id;
        let count = await View.findAndCountAll({where:{ todo_id: view.dataValues.todo_id }})
        obj["count"] = count.count
        viewSet.push(obj)
    }
    let sortedSet = viewSet.sort(function(x,y){
        return y.count-x.count
    })
    let val1 = sortedSet[0]
    let todo = await Todo.findOne({where:{id:sortedSet[0].todo_id}})
    // console.log("sorted",sortedSet)
    return res.status(201).json({todo:todo,count:val1})
       
}