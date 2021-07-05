const db = require("../Models");
const User = db.user;
const Todo = db.todo;




exports.getalltodo = async (req, res) => {
    const todo = await Todo.findAll();

    res.status(200).json({ todo });

}

exports.gettodoById = async (req, res) => {
    let id = req.params.id;

    const {page=1, limit=10} = req.query;  ///////////Pagination 
    
    const todo = await Todo.findAndCountAll({where:{ userId: id },
                                            limit: limit,    
                                            offset: page
                                        })
    console.log("after op",limit)
    console.log("rows",todo.rows.length)
    const record_count = todo.rows.length
    res.status(200).json({ total:record_count,todo,pageNo:page});

}

exports.addtodo = async (req, res) => {
    // req.headers.authorization = `Bearer ` + req.body.token
//    const jwtToken = req.body.token;
//    console.log(jwtToken)
//  headers['Authorization'] = 'Bearer ' + jwtToken

    const { userid, title, category } = req.body;
    console.log(userid)
    console.log(title, category);

    const user = await User.findOne({where:{ id: userid }})
        console.log(user)
        if (user) {
            const todo = new Todo({
                userId:userid,
                title,
                category,

            });
            
            todo.save().then((todo, error) => {
                console.log("todo", todo);
                if (todo) {
                    return res.status(201).json({
                        message: "Successfully addded a Todo"
                    });
                }
                if (error) {
                    console.log("err",error)
                    return res.status(400).json({
                        message: "Something went wrong",
                    });

                }

                

            });

        }
}

exports.updatetodo = async (req, res) => {
    let id = req.params.id;
    const { title, category, status } = req.body;

    Todo.update({
            title: title,
            category: category,
            status: status },
        { where: { id: id } }
      )
        .then(result =>
          res.status(200).json({ message: result })
        )
        .catch(err =>
            res.status(400).json({ error: err })
        )
    // const result = await Todo.findAll({where:{id:id}}).on('success', function (todo) {
    //     // Check if record exists in db
    //     if (todo) {
    //       todo.update({
    //             title: title,
    //             category: category,
    //             status: status
    //       })
    //       .success(function () {})
    //     }
    //   })

    //   if(result){
    //     console.log(result);
    //             res.status(200).json({ message: result });
    //   }else{
    //     res.status(400).json({ error: e });
    //   }
};


exports.deletetodo = async (req, res) => {
    let id = req.params.id;

    const todo = await Todo.findOneAndDelete({where:{ id: id }});

    if (todo) {
        res.status(201).json({ message: "Todo removed" });
    } else {
        res.status(400).json({ message: "Something went wrong" });
    }


}
