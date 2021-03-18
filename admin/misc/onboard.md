## CSE 110 Team 12 Mighty Morphin Powell Rangers (MMPR) - Onboarding
## Website and Docs
www.coffeetivity.tech

www.coffeetivity.tech/docs

## Guide to Source Code Organization
- All the source code lives under the `source` directory
- `__tests__`: the Jest Unit test lives under this directory
- `assets`: contains all the images and audios that we use for our app
- `components`: contains any custom component
	- `Setting-content.js`: the body of the “Settings”
- `scripts`: has the main logics of our app
	- `clock.js`: handles start/stop the clock counter and the logic of the clock counting down
	- `handle-icon.js`: handles displaying different components base on the different states the user is in
	- `setting-script.js`: handles the logic of “Settings” component
	- `task-list-local-storage.js`: manages the storing/removing/focusing tasks in the local storage
	- `task-list.js`: the actual body of the task list
- `styles`: contains the CSS we used for our app
- `index.html`: is the actual body (skeleton) of our app
- `app.js`: links all the separate components together
- `task-list.html`: the skeleton of the task-list component
- `cypress`: contains all the Cypress unit test
- `admin`: Meeting notes, videos live under this directory
- `coverages`: has all Coverage reports
- `testing`: testing related videos can be found here (includes manual testing)

## Workflow 
<b>Creating a new issue:</b>
  1. Navigate to the issues tab on Github
  2. Click on new issue and choose the appropriate template’(Task or Bug)
  3. Follow the naming convention for the title: Word1_Wordx (where each word starts with an uppercase letter and concisely describes the task)
  4. Then describe your task in at least 1 sentence, fill in the criteria (i.e. being held up by another task with a certain issue number), fill in any additional comments, and enter the due date as discussed in the meeting
  5. After filling out the template, choose sprint backlog if the task is part of the current sprint and product backlog if the task is part of the next sprint (right column)
  6. Assign yourself and any team members
  7. Choose the corresponding label
  8. Click on “Milestone” and select the sprint that the task is being assigned to
  9. Finally, select the size of your task on a scale of 1 to 3 based on the number decided from the sprint planning poker meeting

<b>Creating and Working with branches:</b>
- Branch naming convention: issueid#_Word1_Wordx (where Word1 and Wordx are the same as for the corresponding issue)
- Once you write your code and make sure it works on your side, commit it to your branch

<b>Creating and Managing Pull Requests:</b>
- After you commit to your branch, make a pull request to merge to the features branch
- Pull Request naming convention: issueid#_Word1_Wordx_PR# (where Word1 and Wordx are the same as for the corresponding issue)
- Wait to see if all tests pass
- Bots will comment on the status of your code
- If all tests passed, then get one of the testers to review for code style and standards, then merge
- Testers and Developers will write tests together and the tests will be integrated into Jest and Cypress, which will run automatically
- Once your PR is merged, tester will move it to the DOne section of Zenhub and you close the issue 

<b>Working with Zenhub:</b>
- Product Backlog - contains issues for the sprint after the current one
- Sprint Backlog - issues for the current sprint that haven’t been worked on yet
- In-Progress - issues currently being worked on
- QA/Review - an issue that has to reviewed by the testers and other reviewers after the task is Complete. Testers and developers will interact closely when an issue is at this Stage.
- Done - tester moves the issue to this section after the testing is complete and the task creator will close the issue

## Using the Website
<ul>
    <li>Click on the help button on the bottom left side to see a basic guide on how to use the website</li>
   <li>Click out of the onboarding by clicking on X on the bottom left</li>
    <li>Change settings by clicking on the settings icon on the bottom right of the right side container, return to the task list after by clicking on the task list icon on the bottom right of the right side container</li>
    <li>Add tasks on the right side</li>
    <ul>
        <li>Type in the textarea and press enter to create a new task</li>
        <li>User can’t add a task during a focus pomodoro session</li>
        <li>User cannot have more than 12 tasks at a single time so as to prevent clutter and distractions</li>
    </ul>
    <li>Click on the three dots next to a task on hover to delete it or to set it as a main/focus task</li>
    <li>Can ‘unfocus’ a task by focusing a different task or clicking ‘focus’ again for the same task</li>
    Check off finished tasks by clicking the checkbox
    <ul>
        <li>The description of the task will crossout and turn gray</li>
        <li>Checking off a focused task will unfocus it</li>
    </ul>
    <li>Click on checkbox again to uncheck tasks</li>
        <ul>
            <li>Focused tasks that were unfocused by checkoff will not be focused when unchecking, user will have to focus the task again if desired</li>
        </ul>
    <li>Edit tasks by clicking the desired portion of text description that the user wish to edit</li>
    <li>Click the coffee cup in the middle to start the timer (the background music will also start)</li>
    <ul>
        <li>Recall that users can only view their focus task and cannot edit their task list or settings in this state</li>
        <li>Options in a focus session:</li>
        <ul>
            <li>User can sit through the entire focus session </li>
            <li>User can click the coffee cup again to prompt “Are you sure?”</li>
            <li>Click no to resume the focus session or yes to end the focus session and restart to the beginning state</li>
        </ul>
    </ul>
    <li>Once the focus session ends an alarm will sound, the background music will stop, and the break session will begin (will be a short or long break based on the pomodoro technique)</li>
    <ul>
        <li>Options in a break session:</li>
        <ul>
            <li>User can sit through the entire break session</li>
            <li>User can click the coffee cup to prompt “Are you sure?”</li>
            <li>Click no to resume the break session or yes to skip the break to go straight into the next focus session</li>
            <li>User can edit, check off, and focus/unfocus tasks (as described above)</li>
            <li>User can change the settings by clicking the cog icon and adjusting values in the settings panel</li>
        </ul>
    </ul>
    <li>The second focus session starts and the pomodoro cycle continues</li>
    <li>The second (short) break</li>
    <li>The third focus session</li>
    <li>The third (short) break</li>
    <li>The fourth focus session</li>
    <li>The fourth (long) break</li>
    <li>Pomodoro cycle continues (loops), long break after every four focus sessions</li>
    <li>If the user closes the website, they will lose their current progress (i.e. if they were on their 3rd focus session they will have to start over again at their 1st focus session if they return) but their settings and inputted tasks (as well as check off and focus status) will remain saved</li>
</ul>
