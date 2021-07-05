const db = require("../Models");
const User = db.user;
const Comment = db.comment;
const Todo = db.todo;
const Tag = db.tag;


exports.addtag = async (req, res) => {

    const { tag_title, posted_by } = req.body;
    const user = await User.findOne({where:{ id: posted_by }});

        if (user) {
            const tag = new Tag({
               tag_title,
               posted_by
            });

            tag.save().then((todotag, error) => {
                if (todotag) {
                    return res.status(201).json({
                        message: "Tag added successfully"
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

exports.getallTags = async (req, res) => {
    const tag = await Tag.findAll()
        if(tag) {
            console.log(tag[0].tag_title)
            res.status(200).json({ tag });
        }
}


exports.getTagbyId = async (req, res) => {
    let id = req.params.id;
    const tag = await Tag.findAll({where:{ posted_by: id }})
        if(tag) {
            res.status(200).json({ tag });
        }
}
