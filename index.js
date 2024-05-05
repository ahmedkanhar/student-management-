#! /usr/bin/env node
import inquirer from "inquirer";
//Intro
console.log('  *************************');
console.log("  STUDENT MANGEMENT SYSTEM");
console.log('  ************************\n');
// ID
const randomNumber = Math.floor(10000 + Math.random() * 6000);
console.log(`Your Student ID is: ${randomNumber}`);
// blanace
let myBalance = Math.floor(10000 + Math.random() * 10000);
// Enrollment
let answer = await inquirer.prompt([
    {
        name: "student",
        type: "input",
        message: "Enter Student Name:",
        validate: function (value) {
            if (value.trim() !== "") {
                return true;
            }
            return "Please Enter a valid name";
        },
    },
    {
        name: "courses",
        message: "Select your intrested Course:",
        type: "list",
        choices: [
            "Web Development", "App Development", "Generative AI", "Python Programming", "ChatGPT"
        ],
    },
    {
        name: "mode",
        message: "Select Mode of Learning:",
        type: "list",
        choices: ["Onsite", "Online"]
    }
]);
// fees structure
const courseFees = {
    "Web Development": { onsite: 5000, online: 4000 },
    "App Development": { onsite: 5500, online: 4500 },
    "Generative AI": { onsite: 6000, online: 5000 },
    "Python Programming": { onsite: 4500, online: 3500 },
    "ChatGPT": { onsite: 4000, online: 3000 }
};
// Calculate course fee based on mode of learning
// Calculate course fee based on mode of learning
const selectedCourseFee = courseFees[answer.courses][answer.mode === "Onsite" ? "onsite" : "online"];
console.log(` Course Fee for ${answer.mode} ${answer.courses}: ${selectedCourseFee}`);
// check  Balance
console.log(` Your Current Balance is: ${myBalance}`);
// Payment Method for Course Fee:
let paymentMethod = await inquirer.prompt([
    {
        name: "payment",
        type: "list",
        message: "Select a Payment Method For Course Fees:",
        choices: ["Bank Transfer", "Jazz Cash", "Easy Paisa"],
    },
]);
// Additional questions based on payment method
if (paymentMethod.payment === "Bank Transfer") {
    let bankName = await inquirer.prompt([
        {
            name: "bank",
            type: "list",
            message: "Select Bank:",
            choices: ["HBL", "Allied Bank", "Sindh Bank", "Mezan Bank"],
        },
    ]);
    paymentMethod.bankName = bankName.bank;
}
let amount = await inquirer.prompt([
    {
        name: "amount",
        type: "number",
        message: "Enter Your Amount",
    },
]);
if (amount.amount == selectedCourseFee) {
    console.log(' *****************************************************************************************');
    console.log(`      Congratulations you are successfully enrolled in ${answer.courses} , mode: ${answer.mode}`);
    console.log(' *****************************************************************************************');
}
else {
    console.log("Enter Correct Amount");
}
const status = {
    "Student ID": randomNumber,
    "Student Name": answer.student,
    "course": answer.courses,
    "Course Fee Paid": amount.amount,
    "Mode of Learning": answer.mode,
    "Remaining Balance": myBalance -= amount.amount
};
// View Status
let answer1 = await inquirer.prompt([
    {
        name: "options",
        message: "What you want to do next",
        type: "list",
        choices: ["View Status", "Exit"],
    },
]);
if (answer1.options === "View Status") {
    console.log('********');
    console.log("Status");
    console.log('********');
    console.log(status);
}
else {
    console.log("Exiting");
}
