const db = require("../Models");
const User = db.user;
const Comment = db.comment;
const Todo = db.todo;
const Rating = db.rating;
const Like = db.like;


exports.addRating = async (req, res) => {
    const { rating, rated_by, todo_id } = req.body;
    // console.log(viewed_by,todo_id)
    const todo_rate = await Rating.findOne({where:{ todo_id: todo_id }});
    // console.log(todo_view.)
    // console.log("view",todo_view.dataValues)
    if (!todo_rate) {
            // viewed_by = []   
            const rate = new Rating({
                rating,
                rated_by, 
               todo_id
            });
            rate.save().then((todo, error) => {
                if (todo) {
                    return res.status(201).json({
                        message: "rating added successfully"
                    });
                }
                if (error) {
                    return res.status(400).json({
                        message: "Something went wrong",
                    });
                }
            });
        }else{
            const rate = await Rating.findOne({where:{rated_by:rated_by,todo_id:todo_id}})
            
            // console.log("view",view)
            if(!rate){
                const rate = new Rating({
                    rating,
                    rated_by, 
                    todo_id
                 });
                 rate.save().then((todo, error) => {
                     if (todo) {
                         return res.status(201).json({
                             message: "rating added successfully"
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
                    message: "Rating already given by the user"
                })
            }


        }
        
}


