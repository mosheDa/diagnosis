'use strict';

module.exports = function(app) {
	var diagnosisList = require('../controllers/diagnosisController');
	var videos = require('../controllers/videosController');	

	// diagnosis Routes
	app.route('/diagnosis')
		.get(diagnosisList.list_all_diagnosis)
		.post(diagnosisList.create_a_diagnosis);

	app.route('/users')
		.get(diagnosisList.list_all_users)

	app.route('/diagnosis/:diagnosisId')
		.get(diagnosisList.read_a_diagnosis)
		.put(diagnosisList.update_a_diagnosis)
		.delete(diagnosisList.delete_a_diagnosis);

	// videos Routes
	app.route('/videos')
		.get(videos.list_all_videos)
		
	app.route('/videos/:username')
		.get(videos.get_videos_by_username)
		
};
