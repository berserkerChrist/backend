const app = require('express');
const routes = app.Router()

routes.get('/get-users', (request, response) => {
    request.getConnection((err, conn) => {
        if (err) return response.send(err)

        conn.query('SELECT * FROM users', (err, rows) => {
            if (err) return response.send(err)

            response.json(rows);
        })
    })
})

routes.post('/new-user', (request, response) => {
    request.getConnection((err, conn) => {
        if (err) return response.send(err)

        conn.query('INSERT INTO users set ?', [request.body], (err, rows) => {
            if (err) return response.send(err)

            response.send({message: 'usuario añadido'})
        })
    })
})

routes.delete('/delete-user/:id', (request, response) => {
    request.getConnection((err, conn) => {
        if (err) return response.send(err)

        conn.query('DELETE FROM users WHERE id = ?', [request.params.id], (err, rows) => {
            if (err) return response.send(err)

            response.send({message: 'usuario eliminado'})
        })
    })
})

routes.put('/update-user/id=:id', (request, response) => {
    request.getConnection((err, conn) => {
        if (err) return response.send(err)

        conn.query('UPDATE users set ? WHERE id = ?', [request.body, request.params.id], (err, rows) => {
            if (err) return response.send(err)

            response.send({message: 'usuario actualizado'})
        })
    })
})

/* routes.get('/itworksagain', (request, response) => {
    response.send('it works again')
}) */

module.exports = routes;