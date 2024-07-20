# Stucado
Stucado is a data-driven productivity tool tailored to the needs of students. With features such as customized to-do lists, timetable integration, adaptive pomodoro timers and insightful statistics visualizations, we aim to empower university students in their academic journey.
## About
### Motivation
In today's fast-paced digital world, students face an array of challenges when it comes to managing their academic workload efficiently. With an ever-increasing list of tasks and responsibilities, the limited amount of time available often leads to stress and anxiety. The prevalence of social media and digital distractions only exacerbates these issues, making it easy for students to lose track of their priorities and fall into a cycle of procrastination. Furthermore, the pressure to excel academically adds to the burden, leaving many students feeling overwhelmed and unsure of where to begin.

Adding to the urgency of addressing these challenges is the concerning state of mental health among NUS students, as highlighted by recent news articles. The demands of academic life, coupled with the stressors of modern living, underscore the need for proactive solutions to support students in their academic journey while keeping them motivated.

While study apps are not uncommon, there remains a gap in the market for tools that provide personalized solutions to these issues. Despite the availability of many high-quality study apps, few effectively address the nuanced challenges faced by students in today's digital age.

This is where Stucado shines. As a data-driven productivity tool tailored to the needs of individual students, Stucado offers a unique solution to the challenges of time management and productivity.
### Vision
By collecting and analyzing user data, Stucado provides personalized messages and recommendations to help students optimize their study habits and maximize their productivity.

With features such as customized to-do lists, timetable integration, and adaptive pomodoro timers, Stucado empowers students to take control of their academic journey with confidence. By leveraging technology to offer actionable insights and support, Stucado not only helps students excel academically but also promotes overall well-being.
### Aim
Stucado aims to provide students a data-driven platform to optimize their daily productivity by constantly collecting data and tweaking its algorithm. Our goal is to transform the way students approach their studies by offering an intelligent, adaptive tool that not only helps them manage their time effectively but also enhances their overall learning experience.

We aim to alleviate the stress and anxiety associated with academic workload by providing a structured and supportive environment. By supercharging ordinary features such as timetables, to-do lists and pomodoro timers with the power of data, we aim to provide actionable insights and recommendations. This would help students make informed decisions about when and how to study, ensuring that they get the most out of their day. 

Stucado is designed to be a reliable companion for students throughout their academic journey. By keeping all user data stored locally and ensuring offline functionality, the app respects users’ privacy and provides uninterrupted support, regardless of internet connectivity. Our ultimate aim is to empower students to take control of their academic success with confidence, efficiency, and a sense of enjoyment.
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
1. Download [Stucado-MS2-Unpacked.zip](https://github.com/AustinKong/stucado/releases/download/v0.2.0/Stucado-MS2-Unpacked.zip)
2. Extract into folder
3. Open `stucado.exe`
4. Everything is self-contained in this folder, just delete the folder after done

Download instructions for users (installer):
1. Dowload [Stucado-MS2-Installer.exe](https://github.com/AustinKong/stucado/releases/download/v0.2.0/Stucado-MS2-Installer.exe)
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
Austin Kong [@AustinKong](https://github.com/AustinKong)

Ea Jing Le [@JL Ea](https://github.com/JingLeEa)
## License
This project is licensed under MIT license. View license in [license.txt](license.txt)
