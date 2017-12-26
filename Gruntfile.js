module.exports = function (grunt) {
	require('load-grunt-tasks')(grunt)
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		//watch
		watch: {
			scss: {
				files: ['style/scss/*.scss'],
				tasks: ['sass']
			},
			cssmin: {
				files: ['style/css/*.css'],
				tasks: ['cssmin']
			},
			jscompresor: {
				files: ['js/*.js'],
				tasks: ['uglify']
			},
			jshint: {
				files: ['js/*.js', '!js/min/*'],
				tasks: ['jshint']
			}

		},

		//sass
		sass: {
			dist: {
				options: {
					style: 'expanded'
				},
				files: {
					'style/css/style.css': 'style/scss/style.scss'
				}
			}
		},
		//cssmin
		cssmin: {
			target: {
				files: {
					'style/css/style.min.css': ['style/css/style.css']
				}
			}
		},
		uglify: {
			target: {
				files: {
					'js/min/scripts.min.js': ['js/scripts.js']
				}
			}
		},
		jshint: {
			options: {
				"curly": true,
				"camelcase": true,
				"newcap": true,
				"sub": true,
				"eqnull": true,
				"eqeqeq": true,
				"undef": true,
				"jquery": true
			},
			target: {
				src: ['js/*.js', '!js/min/*']
			}
		}
	});


	grunt.registerTask('default', ['watch', 'sass', 'cssmin', 'uglify', 'jshint']);
};
