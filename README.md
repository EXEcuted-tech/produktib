# Produktib: An Online Task Management System

## Add,update, and manage your takss!

Welcome to the Produktib README! This document offers an overview of our online task management system's features and setup instructions. This guide will help you get started whether you're a developer looking to incorporate this platform into your website or a user interested in making reservations. This project will entail the details of the following functionalities:

* Create an online task management system

## Important Links 
1. [UI Style Guide](https://www.figma.com/file/s4nPFMaeo5i0L4icc8rdEL/Produktib?type=design&node-id=1-2&mode=design)

### Setting Up the Project
1. Clone the project in any local directory you like
Example using the git CLI
```
git clone https://github.com/EXEcuted-tech/produktib.git
```
2. CD into the root folder
```
cd produktib
```
3. Install dependencies
```
npm install
```
4. Run the project
```
npm start
```

## Commands To Run During Develompemnt
1. Start your local front-end serve
```
npm start

```
2. Make sure to that your XAMPP with the imported database and mySQL server is running as well

## File Structure
1. `src\assets` - This is where you place images (.png, .svg, etc...)
2. `src\components` - Common components to be used throughout the application, you usually don't wanna touch this folder
5. `src\common` -  Where common utils, style, and colors are compiled and accessed

## Review
1. When you clone the repository, make sure you are in the `main` branch. You can check by running this command:
```
git status
```
Expected output would be:
```
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
```
2.Pull the latest changes
```
git pull
```
3. When you have finished adding your changes, create a branch using the `Card Number` on your assigned task in [Trello]()
```
Example for #3:
//1. Create Branch using the command bellow
$ git branch ticket-12

//2. Check if the branch was created
$ git branch
ticket-12
* master

//3. Switch to the newly created branch
$ git checkout ticket-12

//4. Repeat Step 2
$ git branch
* ticket-12
master

//5. Commit your files and either push or pull the changes
$ git add .

$ git commit -m "Testing Push and Pull Request"

$ git push

```
4. Send the pull review link of the new changes you added to the project. The format should look like the link bellow:
`https://github.com/EXEcuted-tech/produktib/pull/12`