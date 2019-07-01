## ASSUMPTION:
These instructions assume you want to deploy updates for all 3 app areas – ESS, TC, VRS.  If you’re excluding one, you can exclude it from these steps as well.

## PRE-DEPLOY STEPS:
- Map T:\ to `\\mlbmblwebd1.cs.myharris.net\e$\netroot\mi-dev\wwwroot`
- Make Sure everything you want published is merged into **tc-dev**, **vrs-dev**, and **ess-dev** 
- Create pull requests against develop for **tc-dev**, **vrs-dev** and **ess-dev**, titled  
**"Merge *`<branch-name>`* into develop for *mm/dd/yy* push to production"**  
(makes the history easier to read later)
- Checkout **upstream/develop** to your own repo, and run ...  
**git checkout -b archive-*yyyymmdd*-upstream/develop**  
**git push origin**  
... for a backup

## DEPLOY STEPS:
- Once all 3 PR's finish Travis and are clear, merge the 3 PR's
- In your local repo, do a **git remote update** and **git pull** ... use **git status** to make sure you're in sync with upstream/develop
- Once your local develop is fully updated, run "**npm run deploy-dev**" to deploy against https://mi-dev.harris.com/Dev/Timecard  (once deployed, click around there to make sure it looks ok)
- After you're happy with dev, run "**npm run deploy-prod**" to create the deployment package

## POST-DEPLOY STEPS:
- Create a pull request from **upstream/develop** -> **upstream/master**, titled ... 
**"mm/dd/yy Deployment"**  
... and put the list of published changes into the comments box (you can use the DAS verbiage for this)
- Look at https://github.com/harris-corp-it/timecard/branches ... you should see master lag behind develop by the # of commits added by the three app branches, AND ahead of develop by the number of previous prod-deploy merge commits (ie, 21 of them)
- Once Travis completes, merge the PR into **master**.  Master should now be 0 commits behind develop, and one more commit ahead of develop than it was before (ie, 22 of them)

## POST-DEPLOY CLEANUP:
- Look at the various app/feature branches for upstream/timecard on github ... https://github.com/harris-corp-it/timecard/branches
- You'll see each app/feature branch behind develop by a number of commits ... none should be ahead of develop at this point (assuming everything deployed)
- For each branch, run these steps locally:
1. git checkout -t upstream/branch-name
1. git reset --hard upstream/develop
1. git status

_Make sure the local branch is now ahead of the remote branch by the same number of commits the remote is behind develop.  EX: If the branch on github was behind develop by 10 commits, your local branch should now be 10 commits ahead of the remote branch it's tracking._

- Finally, when you're ready to catch up the remote branch, run:
git push
- Refresh the branch page on github, that branch should now be 0/0 with develop.
