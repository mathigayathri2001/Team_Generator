const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

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


//Employee array
const Team = []

//Manager specific questions
const managerQs = [
    {
        type: "input",
        message: "What is your manager's name?",
        name: "manager",
         default: "Ram"
    },
    {
        type: "input",
        message: "What is your manager's ID?",
        name: "managerId",
         default: 1
    },
    {
        type: "input",
        message: "What is your manager's email?",
        name: "managerEmail",
         default: "Ram@gmail.com"
    },
    {
        type: "input",
        message: "What is your manager's office Number",
        name: "managerOfficeNumber",
        default: 6132227744
    },

]

//Engineer specific questions 
const engineerQs = [{
    type: "input",
    message: "What is your engineer's name?",
    name: "engineer",
     default: "Tim"
},
{
    type: "input",
    message: "What is your engineer's ID?",
    name: "engineerId",
     default: 2
},
{
    type: "input",
    message: "What is your engineer's email?",
    name: "engineerEmail",
     default: "engineer@m.com"
},
{
    type: "input",
    message: "What is the engineer's github username?",
    name: "engineerGithub",
     default: "tim"
}
]

//Intern specific questions
const interQs = [
    {
        type: "input",
        message: "What is your intern's name?",
        name: "intern",
        default: "Adhi"
    },
    {
        type: "input",
        message: "What is your intern's ID?",
        name: "internId",
        default: 10
    },
    {
        type: "input",
        message: "What is your intern's email?",
        name: "internEmail",
        default: "intern@m.com"
    },
    {
        type: "input",
        message: "What is the intern's school?",
        name: "internSchool",
        default: "carleton"
    },
]

//Prompt manager questions and then a list question
function managerQuestions() {
    inquirer
        .prompt(managerQs)
        .then(function (mngrAnswrs) {
            const addManager = new Manager(mngrAnswrs.manager, mngrAnswrs.managerId, mngrAnswrs.managerEmail, mngrAnswrs.managerOfficeNumber)
            Team.push(addManager)
            addteamQs()
        })
}

//Prompts engineer specific questions, creates a new engineer and pushes to Team array, also prompts addteamQs
function addEngineerQs() {
    inquirer
        .prompt(engineerQs)
        .then(function (engineerAnswrs) {
            const addEngineer = new Engineer(engineerAnswrs.engineer, engineerAnswrs.engineerId, engineerAnswrs.engineerEmail, engineerAnswrs.engineerGithub)
            Team.push(addEngineer)
            addteamQs()
        })
}

//Prompts intern specific questions, creates a new intern and pushes to Team array, also prompts addteamQs
function addInternQs() {
    inquirer
        .prompt(interQs)
        .then(function (internAnswrs) {
            const addIntern = new Intern(internAnswrs.intern, internAnswrs.internId, internAnswrs.internEmail, internAnswrs.internSchool)
            Team.push(addIntern)
            addteamQs()
        })
}

//List question prompts specific array when a certain choice is picked
function addteamQs() {
    inquirer
        .prompt([{
            type: "list",
            message: "What type of team member would you like to add ?",
            name: "teamMember",
            choices: ["Engineer", "Intern", "Done"]
        }])
        .then(function (answers) {
            const teamMember = answers.teamMember

            // Calls engineer questions array when engineer is selected
            if (teamMember === "Engineer") {
                addEngineerQs()

                //Calls intern array when intern is selected
            } else if (teamMember === "Intern") {
                addInternQs()

                //Writes the file when done is selected
            } else {
                const renderedOutput = render(Team)
                fs.writeFile(outputPath, (renderedOutput), function (err) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log('Team was generated')
                    }
                })
            }
        })
}


//Prompts manager question to start app
managerQuestions()