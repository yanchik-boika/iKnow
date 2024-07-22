// //это рабоает, но не отправляет данные не сервер
// const express = require('express');
// const fs = require('fs');
// const bodyParser = require('body-parser');
//
// const app = express();
// const PORT = process.env.PORT || 3000;
//
// app.use(bodyParser.json());
// app.use(express.static('public'));
//
// app.get('/reviews', (req, res) => {
//     fs.readFile('/reviews', 'utf8', (err, data) => {
//         if (err) {
//             if (err.code === 'ENOENT') {
//                 // Если файл не существует, возвращаем пустой массив
//                 res.json([]);
//             } else {
//                 // В случае другой ошибки отправляем статус 500
//                 res.status(500).send('Internal Server Error');
//             }
//         } else {
//             // Отправляем данные из файла reviews.json
//             res.json(data.split('\n').map(JSON.parse));
//         }
//     });
// });
//
// app.post('/reviews', (req, res) => {
//     const review = req.body;
//
//     fs.readFile('/reviews', 'utf8', (err, data) => {
//         if (err && err.code !== 'ENOENT') {
//             // Если произошла другая ошибка, отправляем статус 500
//             res.status(500).send('Internal Server Error');
//             return;
//         }
//
//         const reviews = JSON.parse(data || '[]');
//         reviews.push(review);
//
//         fs.writeFile('/reviews', reviews.map(r => JSON.stringify(r)).join('\n'), err => {
//             if (err) {
//                 // Если произошла ошибка при записи файла, отправляем статус 500
//                 res.status(500).send('Internal Server Error');
//             } else {
//                 // В случае успеха отправляем статус 200
//                 res.sendStatus(200);
//             }
//         });
//     });
// });
//
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });
//
//


//это пока самое блиское
// const express = require('express');
// const fs = require('fs');
// const bodyParser = require('body-parser');
//
// const app = express();
// const PORT = process.env.PORT || 3000;
//
// app.use(bodyParser.json());
// app.use(express.static('public'));
//
// app.get('/reviews', (req, res) => {
//     fs.readFile(__dirname + '/reviews.json', 'utf8', (err, data) => {
//         if (err) {
//             if (err.code === 'ENOENT') {
//                 // Если файл не существует, возвращаем пустой массив
//                 res.json([]);
//             } else {
//                 // В случае другой ошибки отправляем статус 500
//                 res.status(500).send('Internal Server Error');
//             }
//         } else {
//             // Отправляем данные из файла reviews.json
//             res.json(data ? JSON.parse(data) : []);
//         }
//     });
// });
//
// app.post('/reviews', (req, res) => {
//     const review = req.body;
//
//     fs.readFile(__dirname + '/reviews.json', 'utf8', (err, data) => {
//         if (err && err.code !== 'ENOENT') {
//             // Если произошла другая ошибка, отправляем статус 500
//             res.status(500).send('Internal Server Error');
//             return;
//         }
//
//         const reviews = JSON.parse(data || '[]');
//         reviews.push(review);
//
//         fs.writeFile(__dirname + '/reviews.json', JSON.stringify(reviews, null, 2), err => {
//             if (err) {
//                 // Если произошла ошибка при записи файла, отправляем статус 500
//                 res.status(500).send('Internal Server Error');
//             } else {
//                 // В случае успеха отправляем статус 200
//                 res.sendStatus(200);
//             }
//         });
//     });
// });
//
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });


// //это работает но выдает ошибку в терминаое
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/reviews', (req, res) => {
    fs.readFile(__dirname + '/reviews.json', 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // Если файл не существует, возвращаем пустой массив
                res.json([]);
            } else {
                // В случае другой ошибки отправляем статус 500
                res.status(500).send('Internal Server Error');
            }
        } else {
            // Отправляем данные из файла reviews.json
            res.json(data ? JSON.parse(data) : []);
        }
    });
});

app.post('/reviews', (req, res) => {
    const review = req.body;

    fs.readFile(__dirname + '/reviews.json', 'utf8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            // Если произошла другая ошибка, отправляем статус 500
            res.status(500).send('Internal Server Error');
            return;
        }

        const reviews = JSON.parse(data || '[]');
        reviews.push(review);

        fs.writeFile(__dirname + '/reviews.json', JSON.stringify(reviews, null, 2), err => {
            if (err) {
                // Если произошла ошибка при записи файла, отправляем статус 500
                res.status(500).send('Internal Server Error');
            } else {
                // В случае успеха отправляем статус 200
                res.sendStatus(200);
            }
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
