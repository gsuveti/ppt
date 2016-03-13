/// <reference path="../../../typings/main.d.ts" />

import TodoDAO from '../dao/todo-dao';
var nodemailer = require('nodemailer');

export class TodoController {
    static getAll(req:Object, res:Object):void {
        TodoDAO
            .getAll()
            .then(todos => res.status(200).json(todos))
            .catch(error => res.status(400).json(error));
    }

    static createTodo(req:Object, res:Object):void {
        let _todo = req.body;
        console.log(_todo);


        // create reusable transporter object using the default SMTP transport
        var transporter = nodemailer.createTransport('smtps://george.suveti@irian.ro:pass@smtp.gmail.com');

        // setup e-mail data with unicode symbols
        var mailOptions = {
            from: 'george.suveti@irian.ro', // sender address
            to: 'suvetig@gmail.com', // list of receivers
            subject: 'Hello', // Subject line
            html: '<b>Hello! ' + _todo.todoMessage + '</b>' // html body
        };

// send mail with defined transport object
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });

        TodoDAO
            .createTodo(_todo)
            .then(todo => res.status(201).json(todo))
            .catch(error => res.status(400).json(error));
    }

    static deleteTodo(req:Object, res:Object):void {
        let _id = req.params.id;

        TodoDAO
            .deleteTodo(_id)
            .then(() => res.status(200).end())
            .catch(error => res.status(400).json(error));
    }
}
