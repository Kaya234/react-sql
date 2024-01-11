const Express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

let sql
let app = Express();
app.use(cors())

const db = new sqlite3.Database('D:/Desktop/repo/COURSES/courses-react-sql/server/courses.db', sqlite3.OPEN_READONLY, (err)=>{
 if (err) return console.error(err.message);
 else return console.log('connected to sqlite')
});

app.listen(5038);

app.get('/courses', async (req, res) => {
    sql = "SELECT * FROM courses"
    try {
        db.all(sql, [], (err, rows) => {
            if (err) return  res.send("Not found").status(404)
            if (rows.length < 1) return res.send("empty db").status(404)
            return res.send(rows).status(200); 
        }); 
    } catch (error) {
        return res.send(error.message).status(400)
    }
})

app.get('/courses/:id', async (req, res) => {
    let id = req.params.id;
    sql = `SELECT * FROM courses WHERE id = ?`
    try {
        db.get(sql, id, (err, row) => {
            if (err) return  res.send("Not found").status(404)
            if (row.length < 1) return res.send("empty db").status(404)
            return res.send(row).status(200); 
        }); 
    } catch (error) {
        return res.send(error.message).status(400)
    }
})
