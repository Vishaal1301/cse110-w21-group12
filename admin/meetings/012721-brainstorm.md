## CSE 110 Team 12 Mighty Morphin Powell Rangers (MMPR) - Team Meeting
###### Type: Team Cadance <br/> Location: Zoom <br/> Date: 01/27/21 <br/> Start Time: 7:15 p.m. <br/> End Time: 9:30 p.m.

### Attendance:
- [x] Alan Li
- [x] Annie Van
- [x] Jessica Lam
- [x] Kevin Luo
- [x] Muhammad Fajar
- [ ] Nigel Lipps
- [x] Tristin Xie
- [x] Vishaal Ramaswamy Kasi Vasu
- [x] Zhaoge Ouyang

### Agenda

_Unresolved Business from Previous Meeting:_
- Future meeting times

_New Business to be Discussed:_
- Clarify definitions and requirements
- Think about users and their expectations
- Decide on your app's theme or mood
- Scheduling meetings
- Survey Competition
- Team member roles
- Repo structure

_Undiscussed Business from Today's Agenda:_
- UI/Design
- Documentation

### Decisions/Points Discussed

_Agreed on the principles of the Pomodoro technique:_
- Step 1: choose task(s)
- Step 2: run Pomodoro timer for 25 mins
- Step 3: 5-minute break between sessions
- Step 4: every 4 sessions, 20-minute break

_Build a Minimum Viable Product first:_
- The MVP will only include features essential for an operating Pomodoro timer
  - these include: 
    - An accurate timer
    - User-inputted task list or total num of work-hours
    - Start and Stop button (no pause)
    - An operating short-break, long-break mechanism
    - Audio (preset ringtone)/visual notification after every session
    - One-click start - include ability to get into web-page and quickly start a session
    - Preset light/dark theme
    - Two pages: 1 for showing timer during Pomodoro session, 1 for managing tasks
- Other ideas such as autoplay, keyboard shortcuts will be implemented later on.
- Debate: should we include autoplay feature based on user-inputted tasks in MVP?
  - Not essential for MVP b/c looping based on several tasks would sacrifice quick adoption
  - User would have input several tasks manually or we would have to include option to import tasks 
  - Importing tasks from Google Calendar or some other place would not be an MVP feature

_Would our product be an app/web-page/chrome-extension? Web-page:_
- Start with web-page b/c
  - Team have more knowledge with webdev 
  - So team will be able to meet timelines quicker

_Mood/Theme:_
- Designed for college students
- Work quickly without setup 
- Maximize efficiency
- light-hearted wording

_Ideas from Competitors:_
- Choosing serene desktop background (we are going w/ default light theme in MVP)
- Avoid clutter
- Minimize features for user convenience

_Team Organization:_
- Member roles
  - Alan, Fajar - testing, full stack
  - Kevin, Tristin - javascript, HTML/CSS
  - Jessica, Gary - design, prototyping
  - Vishaal, Annie - managers (assign tasks, meeting notes)
- Repo structure:
  - Master branch
  - Testing Branch (sub-branch of master)
  - Subranches of Testing
    - Javascript
    - CSS/HTML
  - Subranches of Javascript and CSS/HTML contian team-member-created branches for features
  - Alan and Fajar manage Testing and Master branches (pull requests, conflicts)
  - Vishaal and Annie will create issues for tasks discussed in meetings
  - Sub-team members will manage pulls and conflicts to Javascript and CSS/HTML branches
  - Roles assigned to take leadership, not fixed
