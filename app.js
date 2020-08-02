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

const employees = [];

const getCount = (result) => {
    return inquirer.prompt([{
        type: "input",
        message: "How many employees would you like to add?",
        name: "count"
    }]);
};

const getRole = (result) => {
    return inquirer.prompt([{
        type: "list",
        message: "Please select your role:",
        name: "role",
        choices: ["Intern", "Engineer", "Manager"]
    }]);
};

const getEmployeeInfo = (result) => {
    return inquirer.prompt([{
            type: "input",
            message: "Please enter your name:",
            name: "name"},
        {
            type: "input",
            message: "Please enter your ID:",
            name: "id"
        },
        {
            type: "input",
            message: "Please enter your email:",
            name: "email"
        }
    ]);
};

const getSchool = (result) => {
    return inquirer.prompt([{
        type: "input",
        message: "Please enter your school:",
        name: "school"
    }]);
};

const getGithub = (result) => {
    return inquirer.prompt([{
        type: "input",
        message: "Please enter your github username:",
        name: "github"
    }]);
};

const getOfficeNumber = (result) => {
    return inquirer.prompt([{
        type: "input",
        message: "Plese enter your office number:",
        name: "officeNumber"
    }]);
};

const main = async () => {
    const {count} = await getCount();
    
    for(let empCount = 0; empCount < count; empCount++) {
        const {role} = await getRole();
        const {name, id, email} = await getEmployeeInfo();
        switch(role) {
            case "Intern":
                const {school} = await getSchool();
                const intern = new Intern(name, id, email, school);
                employees.push(intern);
                break;
            case "Engineer":
                const {github} = await getGithub();
                const engineer = new Engineer(name, id, email, github);
                employees.push(engineer);
                break;
            case "Manager":
                const {officeNumber} = await getOfficeNumber();
                const manager = new Manager(name, id, email, officeNumber);
                employees.push(manager);
                break;
        }
    }

    const html = render(employees);

    if(!fs.existsSync("./output"))
        fs.mkdirSync("./output");

    fs.writeFileSync("./output/team.html", html, (err) => {
        if(err)
            console.log(err);
    });
}

main();