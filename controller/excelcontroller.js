const db = require("../Models");
const User = db.user;
const Todo = db.todo;


const excel = require("exceljs");
 ////////////to download the excel file of all the users along with their todos////////////////////////
const download = (req, res) => {
  User.findAll({
    include: [
      {
        model: Todo
      },
    ],
  }).then((objs) => {
    // console.log("objs", objs[0])

    const resObj = objs.map(obj => {
      return Object.assign(
        {},
        {
          id: obj.id,
          email: obj.email,
          date: obj.date,
          todos: obj.todos.map(todo => {
            return Object.assign(
              {},
              {
                todo_id:todo.id,
                title:todo.title,
                status: todo.status,
                category: todo.category
              })
          })
        })
    })
    // res.json(resObj)
    // const result = JSON.stringify(resObj)
    var result = Object.keys(resObj).map((key) => [resObj[key]]);

    
    let users = [];
    result.forEach((obj) => {
      users.push({
        id: obj[0].id,
        email: obj[0].email,
        date: obj[0].date,
        title: obj[0].todos[0].title,
        status: obj[0].todos[0].status,
        category: obj[0].todos[0].category
      });
    // console.log(users)
    })
    console.log(users)
    let workbook = new excel.Workbook();
    let worksheet = workbook.addWorksheet("User");

    worksheet.columns = [
      { header: "Id", key: "id", width: 5 },
      { header: "Email", key: "email", width: 25 },
      { header: "Date", key: "date", width: 25 },
      { header: "Title", key: "title", width: 25 },
      { header: "Status", key: "status", width: 25 },
      { header: "Category", key: "category", width: 25 }
    ];

    // Add Array Rows
    worksheet.addRows(users);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=" + "users.xlsx"
    );

    return workbook.xlsx.write(res).then(function () {
      res.status(200).end();
    });
  })
}

module.exports = {
  download,
};