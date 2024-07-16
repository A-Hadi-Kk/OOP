#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

type Ticket = {
    id: number;
    description: string;
    status: 'Open' | 'Closed';
};


let tickets: Ticket[] = [];


function mainMenu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'Choose an action:',
            choices: ['Create Ticket', 'View Tickets', 'Close Ticket', 'Exit']
        }
    ]).then(answer => {
        if (answer.action === 'Create Ticket') {
            createTicket();
        } else if (answer.action === 'View Tickets') {
            viewTickets();
        } else if (answer.action === 'Close Ticket') {
            closeTicket();
        } else if (answer.action === 'Exit') {
            console.log(chalk.italic.bold.redBright('\t\t\t\t\Exiting...'));
            process.exit(0);
        }
    });
}

function createTicket() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'description',
            message: chalk.italic.greenBright('Enter ticketholder name:')
        }
    ]).then(answers => {
        const newTicket: Ticket = {
            id: tickets.length + 1,
            description: answers.description,
            status: 'Open'
        };
        tickets.push(newTicket);
        console.log(chalk.italic.blueBright('Ticket created successfully.'));
        mainMenu();
    });
}

function viewTickets() {
    if (tickets.length === 0) {
        console.log(chalk.italic.redBright('No tickets found.'));
    } else {
        console.log(chalk.italic.yellowBright('All Tickets:'));
        tickets.forEach(ticket => console.log(chalk.italic.magentaBright(`ID: ${ticket.id}, Description: ${ticket.description}, Status: ${ticket.status}`)));
    }
    mainMenu();
}

function closeTicket() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: chalk.italic.green('Enter ticket ID to close:')
        }
    ]).then(answers => {
        const id = parseInt(answers.id);
        const ticketIndex = tickets.findIndex(ticket => ticket.id === id);
        if (ticketIndex !== -1) {
            tickets[ticketIndex].status = 'Closed';
            console.log(chalk.italic.blue(`Ticket ${id} closed successfully.`));
        } else {
            console.log(chalk.italic.red('Ticket not found.'));
        }
        mainMenu();
    });
}

console.log(chalk.italic.bold.magentaBright('\t\t\t\tWelcome to Ticket Management System!'));
mainMenu();