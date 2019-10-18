const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/scool', { useNewUrlParser: true });
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const userModel = require('./models/users.js')
const courseModel = require('./models/courses.js')

//REGISTRO
app.post('/auth/register-form', async(req, res) => {
    const nombre = req.body.nombre;
    const apellido = req.body.apellido
    const user = req.body.user;
    const email = req.body.email;
    const password = req.body.password;
    const surveyResult = req.body.surveyResult;
    const courses = req.body.courses;
    const hash = await bcrypt.hash(password, 2);

    userModel.create({
        nombre: nombre,
        apellido: apellido,
        user: user,
        email: email,
        password: hash,
        surveyResult: surveyResult,
        courses: courses

    }).then(result => {
        res.send(result)
    }).catch(err => {
        res.status(201).send(err)
    });
});


//LOGIN
app.post('/auth/login-form', async(req, res) => {

    const email = req.body.email;
    const password = req.body.password;
    const hash = await bcrypt.hash(password, 2)
    userModel.findOne({
            'email': email,
        })
        .then(result => {
            bcrypt.compare(password, hash, function(err, compareRes) {

                if (!compareRes) {
                    const err = new Error('');
                    res.status(401).send({ message: err.message, ok: false })
                } else {
                    res.send({ ok: true, message: result })
                    router.navigate(['/main/courses']);
                }
            })
        }).catch(err => {
            res.status(500).send(err)
        });

});

//ENCONTRAR PERFIL DE USUARIO
app.get('/main/settings/:userid', (req, res) => {
    const userId = req.params.userid

    userModel.findById(userId)
        .then(result => {
            if (result === null) {
                return res.status(404).send({
                    message: "User not found"
                });
            } else {
                res.send(result)
            }
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + userId
                });
            }
            return res.status(500).send({
                message: "Something wrong getting user by id" + userId
            });
        });
});

//MODIFICAR CONTRASEÑA
app.put('/main/settings/:userid', (req, res) => {

    const userId = req.params.userid

    const password = req.body.password;

    userModel.findByIdAndUpdate(userId, {
        password: password,
    }).then(result => {
        if (result === null) {
            res.status(404).send({
                message: "User not found with id " + userId
            });
        } else {
            res.send(result);
        }
    }).catch(err => {
        console.log('error', err);
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + userId
            });
        }
        return res.status(500).send({
            message: "Something wrong updating user with id " + userId
        });
    });
});

//ELIMINAR USUARIO
app.delete('/main/settings/:userid', (req, res) => {
    const userId = req.params.userid

    userModel.findByIdAndDelete(userId)
        .then(result => {
            if (!result) {
                return res.status(404).send({
                    message: "Product not found with id " + userId
                });
            } else {
                res.send({ message: "Product deleted successfully!" });
            }
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Product not found with id " + userId
                });
            }
            return res.status(500).send({
                message: "Could not delete product with id " + userId
            });
        });
});

//CURSO RECOMENDADO
app.get('/main/courses/:userId', async(req, res) => {
    const userID = req.params.userId;

    userModel.findById(userID).then((userData) => {
        courseModel.findById(userData['surveyResult'])
            .then(result => {
                if (result === null) {
                    return res.status(404).send({
                        message: "Course not found"
                    });
                } else {
                    res.send(result)
                }
            })
            .catch(err => {
                if (err.king === 'ObjectId') {
                    return res.status(404).send({
                        message: "Course not found with id " + courseId
                    });
                }
                return res.status(500).send({
                    message: "Something wrong getting course by id" + courseId
                });
            });
    })
});

// COGER TODOS LOS CURSOS
app.get('/main/courses', async(req, res) => {

    courseModel.find()
        .then(result => {
            if (result === null) {
                return res.status(404).send({
                    message: "Page not found"
                });
            } else {
                res.send(result)
            }
        })
        .catch(err => {
            return res.status(500).send({
                message: "Something went wrong"
            });
        });
});

//CURSOS ASOCIADOS A UN USUARIO
app.get('/main/settings/:userid/courses', async(req, res) => {

});

//CAMBIAR ESTADO DE CURSO (EN PROCESO, FINALIZADO, ETC...)
app.post('/main/settings/:userid', (req, res) => {
    const userId = req.params.userid

    const status = req.body.status;
    userModel.findByIdAndUpdate(userId, {
        status: status,
    }).then(result => {
        if (result === null) {
            res.status(404).send({
                message: "User not found with id " + userId
            });
        } else {
            res.send(result);
        }
    }).catch(err => {
        console.log('error', err);
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + userId
            });
        }
        return res.status(500).send({
            message: "Something wrong updating user with id " + userId
        });
    });
});


//ENCUESTA
app.put('/survey/:id', cors(), async(req, res) => {
    const userId = req.params.id
    userModel.findByIdAndUpdate(userId, {
            surveyResult: req.body.surveyResult
        })
        .then(result => {
            courseModel.findById('5d8b3c036bd9d042fb23d179').then(ress => {
                res.status(200).send(ress)
            })
        })
        .catch(err => {
            res.status(500).send(err)

        });
});


app.listen(3000);
console.log("I'm connected")
