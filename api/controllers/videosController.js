'use strict';

const axios = require ('axios'); 

const CLOUDBINARY_API_ENDPOINT = 'https://211811477677314:-Ef3mMlkcGE3tE40t-FOX4LVqbw@api.cloudinary.com/v1_1/dtvoiy5lg/resources/video/'
exports.list_all_videos = function(req, res) {
    axios.get(CLOUDBINARY_API_ENDPOINT + '?max_results=500')
    .then(response => {
        res.json(response.data)
    }).catch(function (error) {
        console.error(error);
        res.send(error)
    })
  };

  exports.get_videos_by_username = function(req, res) {
    const username = req.params.username;
    const CLOUDBINARY_API_ENDPOINT_BY_USERNAME = CLOUDBINARY_API_ENDPOINT + 'context/?max_results=500&key=username&value=' + username;
    axios.get(CLOUDBINARY_API_ENDPOINT_BY_USERNAME)
    .then(response => {
        res.json(response.data)
    }).catch(function (error) {
        console.error(error);
        res.send(error)
    })
  };