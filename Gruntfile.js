module.exports = function(grunt) {
	// Project configuration.
	var configFileInput = grunt.option('config');
	var configFile = configFileInput || 'config/default.json';

	if (configFileInput) {
		grunt.log.ok("Using config from [dist/" + configFileInput + ']' );
	} else {
		grunt.log.warn("Using default config file - specify --config=config/myConfig.json to load config/myConfig.json");
	}

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		projectConfig: grunt.file.readJSON(configFile),
		clean: [
			"dist/**/*"
		],
		webfont: {
			icons: {
				src: 'src/icons/svgs/*.svg',
				dest: 'dist/fonts',
				destCss: 'dist/css',
				syntax: 'bootstrap',
				options: {
					relativeFontPath: '<%= projectConfig.relativeFontPath %>',
					font: 'font-icons',
					fontHeight: 300,
					autoHint: true,
					templateOptions: {
						baseClass: 'icon',
						classPrefix: 'icon-',
						mixinPrefix: 'icon-'
					},
					template: 'src/templates/css/template.css',
					htmlDemoTemplate: 'src/templates/html/demo-templates.html'
				},
			}
		},
		watch: {
			src: {
				files: [
					'Gruntfile.js',
					'src/icons/svgs/**/*.svg',
					'src/templates/**/*',
				],
				tasks: ['default'],
			}			
		}
	});

grunt.loadNpmTasks('grunt-webfont');
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-watch');

grunt.registerTask('printdone', function() {
  grunt.log.ok('CSS & Preview HTML is generated into [dist/css]');
  grunt.log.ok('Font files are generated into [dist/fonts]');
});

grunt.registerTask('default', ['clean', 'webfont', 'printdone']);
grunt.registerTask('doWatch', ['default', 'watch']);
};