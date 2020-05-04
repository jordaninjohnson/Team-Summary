const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
inquirer.registerPrompt('recursive', require('inquirer-recursive'));

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,

inquirer.prompt([
    {
        name: 'start',
        message: 'Lets Build an Engineering Team!',
        default: '',
    },
    {
        name: 'managerName',
        message: "Employee Name: ",
        default: 'bob',
    },
    {
        name: 'role',
        message: "Role: ",
        default: 'Manager',
    },
    {
        name: 'id',
        message: 'Team member ID#: ',
        default: '1',
    },
    {
        name: 'email',
        message: 'Email: ',
        default: 'hi@bye.com',
    },
    {
        name: 'officeNumber',
        message: 'Office #: ',
        default: '123-456-7890',
    },
    {
        type: 'recursive',
        message: 'Add a new Engineer?',
        name: 'engineer',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'What is engineer\'s name?',
                default: "Jack",
                validate: function (value) {
                    if ((/.+/).test(value)) { return true; }
                    return 'name is required';
                }
            }, {
                name: 'role',
                message: "Role: ",
                default: 'Engineer',
            }, {
                type: 'input',
                name: 'id',
                message: 'ID#: ',
                default: "2",
                validate: function (value) {
                    var digitsOnly = /\d+/;
                    if (digitsOnly.test(value)) { return true; }
                    return 'Invalid ID! Must be a number genius!';
                }
            }, {
                name: 'email',
                message: 'Email: ',
                default: 'hi@bye.com',
            }, {
                name: 'github',
                message: 'GitHub: ',
                default: 'Username',
            },
        ]
    },
    {
        type: 'recursive',
        message: 'Add a new Intern?',
        name: 'intern',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'What is intern\'s name?',
                default: "Jill",
                validate: function (value) {
                    if ((/.+/).test(value)) { return true; }
                    return 'name is required';
                }
            }, {
                type: 'input',
                name: 'id',
                message: 'ID#: ',
                default: "3",
                validate: function (value) {
                    var digitsOnly = /\d+/;
                    if (digitsOnly.test(value)) { return true; }
                    return 'Invalid ID! Must be a number genius!';
                }
            }, {
                name: 'role',
                message: "Role: ",
                default: 'Intern',
            }, {
                name: 'email',
                message: 'Email: ',
                default: 'hi@bye.com',
            }, {
                name: 'school',
                message: 'Name of School: ',
                default: 'University of Utah',
            },
        ]
    },
]).then(function (answers) {
    //console.info('Answers:', answers);
    //console.log(answers.engineer);
    //console.log(answers.intern);

    // and to create objects for each team member (using the correct classes as blueprints!)

    const employees = [];

    const manager = new Manager(answers.managerName,answers.id,answers.email,answers.officeNumber);

    employees.push(manager);

    for (i = 0; i < answers.engineer.length; i++) {
        const engineer = new Engineer(answers.engineer[i].name,answers.engineer[i].id,answers.engineer[i].email,answers.engineer[i].github);
        employees.push(engineer);
    }
    for (i = 0; i < answers.intern.length; i++) {
        const intern = new Intern(answers.intern[i].name,answers.intern[i].id,answers.intern[i].email,answers.intern[i].school);
        employees.push(intern);
    }



    console.log('Employees: ', employees);

    // After the user has input all employees desired, call the `render` function (required
    // above) and pass in an array containing all employee objects; the `render` function will
    // generate and return a block of HTML including templated divs for each employee!
    const html = render(employees);

});



// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
