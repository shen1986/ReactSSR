const router = require('express').Router()
const axios = require('axios');

const baseUrl = 'http://cnodejs.org/api/v1';

router.post('/login', function (req, res) {
    axios.post(`${baseUrl}/accesstoken`)
        .then(resq => {
            if (resq.body.status === '200') {

            }
        });
});
