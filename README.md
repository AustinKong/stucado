# Stucado
<p align="center">
  <img src="https://github.com/user-attachments/assets/a2803c31-ff12-4ebf-bbb6-e4f41158421f" width="10%">
</p>

Stucado is a data-driven productivity tool tailored to the needs of students. With features such as customized to-do lists, timetable integration, adaptive pomodoro timers and insightful statistics visualizations, we aim to empower university students in their academic journey.
## About
### Description

![image](https://github.com/user-attachments/assets/7b4c9c69-d1af-47e6-bc07-c04d10d531d0)

In today's fast-paced digital world, students at the National University of Singapore (NUS) face significant challenges in managing their academic workload efficiently, often leading to stress and anxiety. The proliferation of digital distractions and the pressure to excel academically only exacerbates these issues. Stucado addresses this by offering a data-driven productivity tool tailored to individual student needs. By collecting and analyzing user data, Stucado provides personalized messages and recommendations, helping students optimize their study habits and maximize productivity. 

Key features include customized to-do lists, timetable integration, and adaptive Pomodoro timers, all designed to transform how students approach their studies. Stucado aims to create a structured, supportive environment that alleviates academic stress, enhances learning experiences, and promotes overall well-being. With a commitment to privacy and offline functionality, Stucado ensures uninterrupted support, empowering students to take control of their academic journey with confidence and efficiency.
### Technology
* React: All frontend components are written in React
* CSS: Pure CSS, with CSS modules are used for styling the app
* Electron JS: Backbone of the stack, allowing Stucado to be provide a native experience on any OS
* SQLite: A simple and lightweight database solution allowing user data to be stored locally
* Jest: Testing library used for unit and integration testing
* Playwright: Another testing library used to perform system tests
## Getting Started
### Deployment
Download instructions for users (zip):
1. Download [Stucado-Unpacked.zip](https://github.com/AustinKong/stucado/releases/download/v1.0.0/Stucado-Unpacked.zip)
2. Extract into folder
3. Open `stucado.exe`
4. Everything is self-contained in this folder, just delete the folder after done

Download instructions for users (installer):
1. Dowload [Stucado-Installer.exe](https://github.com/AustinKong/stucado/releases/download/v1.0.0/Stucado-Installer.exe)
2. Start the intaller and run through the installation process
3. Open `stucado.exe`
4. To uninstall, use the "Add or remove programs" feature from Windows
### Dependencies
* NodeJS
* NPM
### Installation
Installation and setup instructions for developers:
1. Install latest (LTS) version of NodeJS
2. Verify your installation by running `node -v; npm -v command` in your terminal, you should see two version outputs
3. Fork and clone the repository
4. Install project dependencies by running `npm i` from project root
5. Start coding and build something awesome!
### Contributing
This project is under active development. However, suggestions, issues and bug reports will not be actively resolved. Pull requests and forks are always welcome!
## Help
### Commands
Building outputs in the `dist` folder.

```
npm run dev - Starts the project
# Building
npm run build:win - Builds the project for Windows
npm run build:mac - Builds the project for Mac (Requires Mac system to build)
npm run build:linux - Builds the project for Linux
# Testing
npm run test:unit - Runs all unit tests
npm run test:integration - Runs all integration tests
```
## Authors
- Austin Kong [@AustinKong](https://github.com/AustinKong)
- Ea Jing Le [@JL Ea](https://github.com/JingLeEa)
## License
This project is licensed under MIT license. View license in [license.txt](license.txt)
