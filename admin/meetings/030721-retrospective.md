## CSE 110 Team 12 Mighty Morphin Powell Rangers (MMPR) - Team Meeting
###### Type: Team Cadance <br/> Location: Zoom <br/> Date: 03/07/21 <br/> Start Time: 8:30 p.m. <br/> End Time: 9:00 p.m.

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
  - Github organization
  - Software Status
  - Team Health
  - Next sprint
  
_Undiscussed Business from Today's Agenda:_
- Refactoring
- Video

### Decisions/Points Discussed

_Documentation and Code Style:_
  - Removed extra comments from index.html and added more clarifying comments to js code (clock.js, app.js)
  - Cleaned up some redundant CSS
  - Renamed functions in clock.js and app.js to be consistent, grouped similar functions (i.e. hiding and showing different components that appear together in rightSideContainer) together
  - More descriptive comments that also is compatible with JSDoc

_Github Organization:_
  - All branches and PRs have consistent naming conventions id_Word1_Word2
  - PRs are reviewed carefully by testers before merges occur
  - Pushing directly to features branch resulted in some bugs and got messy (during integration)

_Software Status:_
  - Have all the working parts connected
  - Held 2 meetings to go over any bugs we had in the application and fixed them
  - Still need to get audio mp3 files that are free to use on our website


_Team Health:_
  - More consistent daily standups and have been more productive in terms of working on the website
  - Able to get tasks done in a timely manner before team meetings
  - Smaller groups meet outside of normal meeting times, which helps to get more work done at once
  - Overall, we don’t seem to have any personal conflicts with each other


_Challenges:_
  - Lots of assets (pngs + audio) loading at the beginning causes slightly slower site load times
  - Babel acting up
  - Cypress code coverage is far from simple, unlike with jest
  - Jest and Cypress merged code coverage
  - Github actions being unpredictable as usual
  - Testing timers with Jest can be finicky
  - Testing the clock in cypress without waiting the full duration
  - Also testing with Jest on the DOM frequently have issues with stuff being null, needed to figure out how to mock things
  - Alignment of “Add new tasks” input with the items in the task list to be consistent across different screen sizes


_Next Sprint:_
  - Continue testing, maximize code coverage, evaluate metrics (branch and line coverage)
  - Making website page responsive across all devices
  - Deployment (important)
  - Add audio files to use for alarms + ambient noise
  - Progress bar or some indicator of session in relation to next long break
  - Refactor code more - make sure comments are good, check the code quality (CodeFactor - current C, goal is to get to an A)
  - Rename our app (rn is called Pomo in the tab)
  - Add favicon (rn is default gray globe)
  - Manual testing, cross browser testing




