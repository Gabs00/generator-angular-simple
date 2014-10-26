'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var AngularSimpleGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'KI-ASS: Keep it Angular Simple Stupid'
    ));

    //This stuff doesn't need to be here
    //But I like to keep them around for reference.
    var prompts = [{
      type: 'confirm',
      name: 'someOption',
      message: 'Want some pie?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.someOption = props.someOption;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      //Client side folders
      this.dest.mkdir('client');
      this.dest.mkdir('client/libs'); //bowerrc points to here
      this.dest.mkdir('client/app');
      this.dest.mkdir('client/app/partials');
      this.dest.mkdir('client/app/directives');
      this.dest.mkdir('client/app/controllers');
      this.dest.mkdir('client/app/factory');

      //server side folders
      this.dest.mkdir('server');
      this.dest.mkdir('server/config'); //Those pesky db / socket.io handlers go here


      this.src.copy('index.html', './client/index.html');
      this.src.copy('index.js', 'index.js');
      this.src.copy('server.js', './server/app.js');
      this.src.copy('config.js','./server/config/config.js');
      this.src.copy('app.js', './client/app.js');
      this.src.copy('_package.json', 'package.json');
      this.src.copy('_bower.json', 'bower.json');

    },

    projectfiles: function () {
      this.src.copy('.gitattributes', '.gitattributes');
      this.src.copy('.gitignore', '.gitignore');
      this.src.copy('_.bowerrc', '.bowerrc');
      this.src.copy('editorconfig', '.editorconfig');
      this.src.copy('jshintrc', '.jshintrc');
    }
  },

  end: function () {
    this.installDependencies();
  }
});

module.exports = AngularSimpleGenerator;
