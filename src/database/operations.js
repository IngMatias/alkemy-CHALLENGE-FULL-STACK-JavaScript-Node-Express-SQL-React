const mysql = require('mysql')

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

db.query(`
    CREATE TABLE IF NOT EXISTS Users (
        UserId int NOT NULL AUTO_INCREMENT,
        Email varchar(255) NOT NULL,
        Password varchar(255) NOT NULL,
        PRIMARY KEY (UserId)
    )
`)

db.query(`
    CREATE TABLE IF NOT EXISTS Categories (
        CategoryId int NOT NULL AUTO_INCREMENT,
        UserId int NOT NULL,
        Category varchar(255) NOT NULL,
        PRIMARY KEY (CategoryId),
        FOREIGN KEY (UserId) REFERENCES Users(UserId)
    )
`)

db.query(`
    CREATE TABLE IF NOT EXISTS Movements (
        MovementId int NOT NULL AUTO_INCREMENT,
        UserId int NOT NULL,
        Value int NOT NULL,
        Type varchar(255) NOT NULL,
        CategoryId int NOT NULL,
        Description varchar(255) NOT NULL,
        Date DATETIME NOT NULL,
        PRIMARY KEY (MovementId),
        FOREIGN KEY (UserId) REFERENCES Users(UserId),
        FOREIGN KEY (CategoryId) REFERENCES Categories(CategoryId)
    )
`) 

const getQuery = (query, callback) => {
    db.query(query, (err, result) => {
        if (err) throw err
        callback(JSON.parse(JSON.stringify(result)))
    })
}

const setQuery = (query, callback) => {
    db.query(query, (err) => {
        if (err) throw err
        callback()
    })
}

module.exports = {
    addUser: (data, callback) => {

        const templateQuery =   `INSERT INTO Users (Email, Password)
                                VALUES (?, ?)`
        const query = mysql.format(templateQuery, [data.email, data.password])

        setQuery(query, callback)
    },
    deleteUser: (data, callback) => {

        const templateQuery =   `DELETE FROM Users WHERE UserId=?`
        const query = mysql.format(templateQuery, [data.userId])

        setQuery(query, callback)
    },
    getUsersByEmail: (data, callback) => {

        const templateQuery =   `SELECT * FROM Users WHERE Email=?`
        const query = mysql.format(templateQuery, [data.email])

        getQuery(query, callback)
    },
    getUsersById: (data, callback) => {

        const templateQuery =   `SELECT * FROM Users WHERE UserId=?`
        const query = mysql.format(templateQuery, [data.userId])

        getQuery(query, callback)
    },
    addMovement: (data, callback) => {

        const templateQuery =   `INSERT INTO Movements (UserId, Value, Type, CategoryId, Description, Date)
                                VALUES (?, ?, ?, ?, ?, ?)`
        const query = mysql.format(templateQuery, [data.userId, data.value, data.type, data.categoryId, data.description, data.date])
    
        setQuery(query, callback)
    },
    deleteMovement: (data, callback) => {

        const templateQuery =   `DELETE FROM Movements WHERE MovementId=?`
        const query = mysql.format(templateQuery, [data.movementId])

        setQuery(query, callback)
    },
    getMovements: (data, callback) => {

        const templateQuery =   `SELECT MovementId, Value, Type, Category, Description, Date, categories.CategoryId
                                FROM movements
                                INNER JOIN categories
                                ON movements.CategoryId = categories.CategoryId
                                WHERE movements.UserId=?
                                ORDER BY MovementId DESC`
        const query = mysql.format(templateQuery, [data.userId])

        getQuery(query, callback)
    },
    addCategory: (data, callback) => {

        const templateQuery =   `INSERT INTO Categories (UserId, Category)
                                VALUES (?, ?)`
        const query = mysql.format(templateQuery, [data.userId, data.category])

        setQuery(query, callback)
    },
    deleteCategory: (data, callback) => {

        const templateQuery =   `DELETE FROM Categories WHERE CategoryId=?`
        const query = mysql.format(templateQuery, [data.categoryId])

        setQuery(query, callback)
    },
    getCategories: (data, callback) => {

        const templateQuery =   `SELECT * FROM Categories WHERE UserId=?`
        const query = mysql.format(templateQuery, [data.userId])

        getQuery(query, callback)
    }
}