## CSE 110 Team 12 Mighty Morphin Powell Rangers (MMPR) - Team Meeting
###### Type: Team Cadance <br/> Location: Zoom <br/> Date: 02/20/21 <br/> Start Time: 3:30 p.m. <br/> End Time: 5:30 p.m.

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
- None!

_New Business to be Discussed:_
- Retrospective:
  - Documentation and Code Style 
  - Branch Naming, Branch commits and pushes (pipeline clutter, commits)
  - Status of your software
  - Function of your pipeline
  - Team Health
  - Challenges you are facing
  - Next sprint: what should stakeholders look forward to?
  - Video
  
_Undiscussed Business from Today's Agenda:_
- CSS and HTML commenting
- Final design of Task List

### Decisions/Points Discussed

_Documentation and Code Style:_
- Add ADRs for major design decisions (do 1 ADR by Sunday 02/28)
- Follow Kevin's for js code style (function headers, inline comments, clock.js)
  - Function headers only for main functions (not helpers)
- CSS and HTML commenting to be discussed Tuesday

_Branches:_
- Inconsistent naming, so change personal branch names to follow #-issueWord1-issueWord2 where # corresponds to issue id
- Add and commit only essential files pertaining to task (don't include other changes), don't do git add . 

_Pipeline:_
- Branches were updating during sprint (html/css and javascript branches were removed, features branch added)
- Updating pipeline led to commit and issue history clutter (minimize clutter in next sprint)
- Status: Github actions working properly in all branches
  - Decided not to do ES Lint on features - fits its purpose better in testing branch

_Software Status:_
- MVP complete, all components integrated into 1 base HTML
- "Pixelated"-look did not turn out well, so new design required (almost complete)
- Page does not fetch data from local storage upon reload, but everything is stored in local storage properly
  - Does page reload take user back to "not counting down" state?
- Clock does not adjust to show numbers consistent with settings 
- Clock does not play notification sounds and other sounds to fit coffee theme not added either
- Clock moves when it is pressed - bug
- Code is inconsistent between members
  - task list css uses tag names (i.e."p", "li") that conflict with base html, so temporarily patched with id name for task list div tag. Needs fixing.
  - Some code is inside custom component, some are not (that's ok - no need to force)

_Team Health:_
- Daily Standups have consistent turn out
- Team meetings have been interactive and high attendance
- Let me know if you can't make it to discussion (I'll let you guys know too!) - Wednesday at 9 a.m.
- Smaller teams have been collaborating well to get work done and meet timeline goals

_Challenges:_
- Inconsistent code base, lack of comments and function headers, different code styles between members
- Writing unit tests while developing
- Timeline impediments - other class work, dependencies (developing pipeline while working)
- Bug-free final product
- Finalizing design - not satisfied with current, refactoring required to fit to new design
  - How are we going to fit cross-off, delete, select, edit text, and number of pomos options in small screen real estate

_Next Sprint:_
- Testing, refining, adding additional features
- Additional features prioritized: users get to predict num of pomos, statistics display
- Timeline: Sunday (02/28)
- Tasks assigned:
  - Everyone: 
    - make 1 ADR by Sunday
    - COMMENT, ADD FUNCTION HEADERS, REWRITE CODE THAT SEEM "NOT GOOD" (take everyone else's code into consideration when writing your own)
    - let Alan know when you push to features so it can be tested, don't do "git add ." and commit
  - Annie and Jessica 
    - Finish choosing pictures, ui design (settings and final task list), transitions (make sure every possible use case is covered and finalized)
    - Upload new content to assets folder in features branch
    - Discuss new design with Kevin and Gary
    - On base HTML and other css files: 
      - Refactor code to match new design (think about how this refactoring is going to affect other code - i.e. removing navBar will break app.js as it has functions using it, ask team for help if needed) 
      - Adjust and add comments appropriately (the function headers currently in index.html are place holders and need to be adjusted to look "professional")
  - Tristin
    - Clock notification sounds, other sounds during break
    - Change the timer to display the user’s choice of work session/break session time length in settings
    - Refactor code to be consistent with others and comment
  - Kevin and Gary
    - Leave additional features for last 
    - Prioritize: 
    - Kevin:
      - fixing up tasklist code to match new design 
      - Re-render task page every time page reloads, take care of other reload-related issues on entire website
      - task list css uses tag names (i.e."p", "li") that conflict with base html but was patched up for now using the id for task list div tag, instead consider           using shadow dom for task items? 
     - Gary:
      - Fix settings to match new design
      - Same tasks as Kevin
      - Comment code
  - Alan and Fajar
    - make sure there are no loop holes for the user
    - write unit tests (indivdual components and overall)
    - read the code and comments if you’re confused about something then ask the person who wrote the code to write better comments (create issue and let them know on Slack)
    - Bring CONSISTENCY into code (i.e. we're using custom components in some scenarios but not always ...), fix bugs, remove unneccessary files, think about and implement best way to combine code in one place
    - Handle merging new pull requests to features, make sure pipeline working properly in testing branch, don't do "git add ."

