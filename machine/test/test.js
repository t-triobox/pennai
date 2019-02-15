process.env.MACHINE_CONFIG = './test/test_machine_config.json'
const getProjects = require('../getprojects.js');
const assert = require('assert');

var algorithms = ["DecisionTreeClassifier","GradientBoostingClassifier","KNeighborsClassifier"]
var project_list = getProjects(algorithms)

describe('Mocha Test for getProjects function', function () {
  it('Test the total number of algorithms is the same with config.', function () {
        assert.equal(project_list.length, algorithms.length);
    });

  it('Test the name and order of algorithms is the same with config.', () => {
        for (var i in project_list) {
            var algo = project_list[i].name;
            var algo_conf = algorithms[i];
            assert.equal(algo_conf, algo);
        }
    });

  });