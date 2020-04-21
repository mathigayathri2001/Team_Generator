const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


//Team array
const Team = []

//Manager specific questions
const managerQs = [
    {
        type: "input",
        message: "What is your manager's name?",
        name: "manager",
         default: "Mathi"
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
         default: "Mathi@gmail.com"
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
     default: "Raj"
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
     default: "raj"
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

//Prompt manager questions and then a addteamQs
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

//addteamQs question prompts specific array when a certain choice is picked
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
            switch (teamMember) {
                case "Engineer":
                    addEngineerQs()
                    break;
                case "Intern":
                    addInternQs()
                    break;
                default:
                    const renderedOutput = render(Team)
                    fs.writeFile(outputPath, renderedOutput, function (err) {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log('Team was generated')
                        }
                    })
                    break;
            }
        })
}

//Prompts manager question to start app
managerQuestions()