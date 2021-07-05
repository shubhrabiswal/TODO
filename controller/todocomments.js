const db = require("../Models");
const User = db.user;
const Comment = db.comment;
const Todo = db.todo;


exports.addcomment = async (req, res) => {


    const { comments, posted_by, todo_id } = req.body;
    

    const user = await User.findOne({where:{ id: posted_by }});

        if (user) {
            const comment = new Comment({
               comments,
               posted_by, 
               todo_id
            });

            comment.save().then((todo, error) => {
                if (todo) {
                    return res.status(201).json({
                        message: "Comment added successfully"
                    });
                }
                if (error) {
                    return res.status(400).json({
                        message: "Something went wrong",
                    });

                }
            
            });

        }
}


exports.getcommentById = async (req, res) => {
    let id = req.params.id;
    const comment = await Comment.findAll({where:{ posted_by: id }})
        if(comment) {
            res.status(200).json({ comment });
        }
}


exports.getcommentByTodoId = async (req, res) => {
    let id = req.params.id;
    const comment = await Comment.findAll({where:{ todo_id: id }})
        if(comment) {
            res.status(200).json({ comment });
        }
}