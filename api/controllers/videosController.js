'use strict';

const axios = require ('axios'); 
const CLOUDBINARY_API_ENDPOINT = 'https://211811477677314:-Ef3mMlkcGE3tE40t-FOX4LVqbw@api.cloudinary.com/v1_1/dtvoiy5lg/resources/video'

exports.list_all_videos = function(req, res) {
    axios.get(CLOUDBINARY_API_ENDPOINT)
    .then(response => {
        res.json(response.data)
    }).catch(function (error) {
        console.error(error);
        res.send(error)
    })
  };