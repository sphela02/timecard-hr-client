# GIT BRANCHES 

## PERMANENT BRANCHES:

* **Master** ... holds an exact copy of what's in production
* **Develop** ... holds the code, ready for Final Integration Test before production

## SEMI-PERMANENT BRANCHES:

* **VRS-Enhancements** ... holds any finished VRS enhancement feature work, ready for customer UAT
* **TC-Enhancements** ... holds any finished Timecard enhancement feature work, ready for customer UAT

## FEATURE BRANCHES:

* **vrs-###**, **tc-###** ... feature development branches, 1-to-1 matched with JIRA tickets or specific trackable bugs/issues.

## SERVER LOCATIONS

* **PRODUCTION** ... mi.harris.com/timecard, deployed from **master**
* **FINAL TEST** ... mi-dev.harris.com/Test/Timecard, deployed from **develop**
* **VRS UAT TEST** ... mi-dev.harris.com/Dev/Vacation-UAT, deployed from **VRS-Enhancements**
* **TC UAT TEST** ... mi-dev.harris.com/Dev/Timecard-UAT, deployed from **TC-Enhancements**
* **INTERNAL DEV** ... mi-dev.harris.com/Dev/Timecard, deployed from **develop** or hotfix branch, for internal dev team use and testing (when localhost isn't appropriate).

## PROCESS SCENARIOS:

### SET UP ENHANCEMENT SPRINT FOR VRS (or for Timecard)
* Create/update the **VRS-Enhancements** branch, branching straight off the tip of **develop**
* Create a pull request for merging **VRS-Enhancements** back into **develop** ... we merge this later

### DEVELOP ONE ENHANCEMENT/TICKET AGAINST VRS (or for Timecard)
* Start with **VRS-Enhancements** branch, checkout -b vrs-###-feature-ticket
* Develop as normal and test locally
* When ready for PR, create the PR against **VRS-Enhancements** (NOT against **develop**)
* After local review testing, merge the PR into **VRS-Enhancements**.

### DEVELOP SECOND ENHANCEMENT/TICKET AGAINST VRS (or for Timecard)
* Follow exact process as for the first VRS enhancement ticket

### PUBLISH FINISHED VRS ENHANCEMENT TICKETS FOR VRS UAT
* Deploy **VRS-Enhancements** branch to **VRS UAT TEST** server location

### CREATE A HOTFIX FOR AN IMMEDIATE BUG
* Start with **develop** branch, `checkout -b hotfix-###-bug-ticket`
* Develop as normal and test locally
* When ready for PR, create the PR directly against **develop**
* ALSO ... create the same PR against **VRS-Enhancements** and **TC-Enhancements**
* After local review testing, merge the PR into **develop**.
* Also, merge the PR's into the enhancement branches
* This hotfix is ready in **develop** for immediate final testing before going to production

### VRS UAT PASSES, READY TO PUBLISH
* When VRS UAT passes, go back to the PR we created with the **VRS-Enhancements** branch (against **develop**), and merge it to **develop**
* Repeat the steps for Setting up the enhancement sprint in the first place, to get a new change batch ready.
* **develop** is now ready for final testing before going to production

### EXECUTE FINAL TEST BEFORE PRODUCTION PUSH
* **develop** has any merged hotfixes, and any feature enhancements that have passed their UAT.
* Publish **develop** to the **FINAL TEST** server for some final integration testing. At this point, we're only looking to make sure everything works the way it shold.
* When testing completes, create a PR for merging **develop** into **master**, and merge into **master**.

### PUSH TO PRODUCTION
* **master** has the production code at any point.
* Publish **master** to the Production server to release the changes.
