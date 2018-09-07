// Hopscotch tour
// Define the tour!
var tour = {
    'List': {
        id: 'walkthrough',
        showSkip: true,
        steps: [
            {
                title: 'Welcome',
                content: 'Welcome to the Harris Timecard System. This tour will show you what\'s new in our redesigned timecard interface. <a href="https://share.harris.com/sites/ITSM_KB/KB_Articles/Timecard%20User%20Guide.pdf" target="_blank">Click to find detailed instructions.</a>',
                target: 'page-title',
                placement: 'bottom'
            },
            {
                title: 'Employee Information',
                content: 'Click on the dropdown to change your primary and secondary approvers and to see your employee information including employee ID, department, etc.',
                target: 'user-account',
                placement: 'right',
                showPrevButton:'true',
                
            },
            {
                title: 'Side Navigation Pane',
                content: 'The left navigation pane includes links to submit a timecard, search for prior timecards (used for Labor Correction) and Approvals.  For timecard approvers, a number will indicate how many timecards are ready for approval.',
                target: 'timecard-menu',
                placement: 'right',
                showPrevButton:'true',
            },
            {
                title: 'Filter',
                content: 'Filter list by selecting a timecard status.',
                target: 'filter-wrapper',
                placement: 'bottom',
                showPrevButton:'true',
            },
            {
                title: 'View a timecard',
                content: 'Click on a timecard to edit or review.',
                target: 'timecard-list',
                placement: 'top',
                showPrevButton:'true',
                showNextButton: false,
            },
        ]
    },
    'tcDisplay': {
        id: 'walkthrough',
        showSkip: true,
        steps: [
            {
                title:'Timecard Overview',
                content:'The timecard view allows you to view and edit a timecard. <a href="https://share.harris.com/sites/ITSM_KB/KB_Articles/Timecard%20User%20Guide.pdf" target="_blank">Click to find detailed instructions.</a>',
                target:'page-title',
                placement:'bottom',
            },
            {
                title:'Timecard Dashboard',
                content:'This area shows hours submitted, current holiday balance and a link to the holiday calendar.',
                target:'mini-dashboard',
                placement:'bottom',
            },
            {
                title: 'Add/Select',
                content: 'Click Add to add a new charge code to your timecard or click Select to choose from a list of your recently used charge codes.',
                target: 'addRow',
                placement: 'top',
                showPrevButton:'true',
            },
            {
                title: 'Enter time',
                content: 'If the timecard is open, enter time for each day here.',
                target: 'col-header-0',
                placement: 'top',
                showPrevButton:'true',
            },
            {
                title: 'Notes',
                content: 'Click Add, Edit or Review notes as desired.',
                target: 'notes-link',
                placement: 'top',
                showPrevButton:'true',
                arrowOffset: '250px',
                xOffset: '-225px',
            },
            {
                title:'Timecard Status',
                content:'The status of the timecard (Open, Pending, Approved) shows here.',
                target:'timecard-status',
                placement:'top',
                showPrevButton:'true',
                arrowOffset: '275px',
                xOffset: '-275px',
            },
            {
                title: 'Approver',
                content: 'Verify or change your approver for this timecard.',
                target: 'timecardApprover',
                placement: 'top',
                showPrevButton:'true',
            },
            {
                title: 'Save',
                content: 'Click to Save your timecard.',
                target: 'save-timecard',
                placement: 'top',
                showPrevButton:'true',
                arrowOffset: '250px',
                xOffset: '-225px',
            },
            {
                title: 'Approve and sign',
                content: 'To submit your timecard, click the Sign Timecard checkbox and click Submit. Click Timecard Search in menu to continue the tour.',
                target: 'signature',
                placement: 'top',
                showPrevButton:'true',
                arrowOffset: '250px',
                xOffset: '-225px',
                showNextButton: false,
            },
            {
                title: 'Labor Correction',
                content: 'Click on Labor Correction.  You will be prompted to enter a Note Title and Text. Follow all prompts, make necessary changes, click to Sign and Submit.  To delete a user generated labor correction, press the red button with the trashcan',
                target: 'create-labor-correction-btn',
                placement: 'top',
                showPrevButton:'true',
                arrowOffset: '250px',
                xOffset: '-225px',
            },
            {
                title: 'Approve Timecard',
                content: 'Review time and click Approve.',
                target: 'approve-timecard-btn',
                placement: 'top',
                showPrevButton:'true',
                arrowOffset: '250px',
                xOffset: '-225px',
            }
        ]
    },
    'Search': {
        id: 'walkthrough',
        showSkip: true,
        steps: [
            {
                title: 'Timecard Search',
                content: 'Timecard Search is where you can search for your timecards between a specific date range.  You can also create a Labor Correction from this page. <a href="https://share.harris.com/sites/ITSM_KB/KB_Articles/Timecard%20User%20Guide.pdf" target="_blank">Click to find detailed instructions.</a>',
                target: 'page-title',
                placement: 'bottom',
                showPrevButton:'true',
            },
            {
                title: 'Search by Date',
                content: 'Enter the date range that includes the timecard pay period you are trying to find. Click Submit to display list and continue tour.',
                target: 'utility-bar',
                placement: 'bottom',
                showPrevButton:'true',
            },
            {
                title: 'Approver Mode',
                content: 'Approvers can also use the Timecard Search to search for timecards by employee.  To search by employee, click the button to the Approver Mode.',
                target: 'manager-mode-wrapper',
                placement: 'bottom',
                showPrevButton:'true',
            },
              
            {
                title: 'Filter Results',
                content: 'Filter results by selecting a timecard status.',
                target: 'filter-wrapper',
                placement: 'bottom',
                showPrevButton:'true',
            },
            {
                title: 'Refresh List',
                content: 'Click here to refresh the list.',
                target: 'refresh-list-btn',
                placement: 'left',
                showPrevButton:'true',
                yOffset: '-25px',
            },
            {
                title: 'Select a timecard',
                content: '<p>Click on a timecard to view from the returned search results.</p><p>To start a Labor Correction, select an approved timecard and click Labor Correction.  You will be prompted to enter a Note Title and Text. Follow all prompts, make necessary changes, click to Sign and Save.</p>',
                target: 'timecard-list-container',
                placement: 'top',
                showPrevButton:'true',
                yOffset: '60px',
            },
        ]
    },    
    'ApproverList': {
        id: 'walkthrough',
        showSkip: true,
        steps: [
            {
                title: 'Approvals Page',
                content: 'The Approvals page is where you can find your teams\'s timecards to review and approve. <a href="https://share.harris.com/sites/ITSM_KB/KB_Articles/Timecard%20User%20Guide.pdf" target="_blank">Click to find detailed instructions.</a>',
                target: 'page-title',
                placement: 'bottom',
                showPrevButton:'true',
            },
            {
                title: 'Reminder Emails',
                content: 'As an approver, you have the option to send an email to remind employees to submit their timecard. Follow the intructions and click send.',
                target: 'send-reminder-emails',
                placement: 'bottom',
                showPrevButton:'true',
                arrowOffset: '275px',
                xOffset: '-285px',
            },
            {
                title: 'Filter Results',
                content: 'Filter results by timecard status or by employee.',
                target: 'filter-wrapper',
                placement: 'bottom',
                showPrevButton:'true',
            },
            {
                title: 'Show Future Timecards',
                content: 'You also have the option to view future timecards by using the Show Future filter.',
                target: 'show-future-wrapper',
                placement: 'bottom',
                showPrevButton:'true',
            },
            {
                title: 'Refresh List',
                content: 'Click here to refresh the list.',
                target: 'refresh-list-btn',
                placement: 'left',
                showPrevButton:'true',
                yOffset: '-25px',
            },
            {
                title: 'Approve a timecard',
                content: 'Click on a timecard to view. Review time and click Approve.',
                target: 'timecard-list-container',
                placement: 'top',
                showPrevButton:'true',
                showNextButton: false,
                yOffset: '50px',
            },
        ]
    },
    'ApproverSearch': {
        id: 'walkthrough',
        showSkip: true,
        steps: [
            {
                title: 'Approvals Search',
                content: 'This feature allows timecard approvers to search any open, pending or approved timecards in their organization.  <a href="https://share.harris.com/sites/ITSM_KB/KB_Articles/Timecard%20User%20Guide.pdf" target="_blank">Click to find detailed instructions.</a>',
                target: 'page-title',
                placement: 'bottom',
            },
            {
                title: 'Search by Date and Employee',
                content: 'Select an employee or show all. Then enter the date range that includes the timecard pay period you are trying to find. Click Submit to display list and continue tour.',
                target: 'utility-bar',
                placement: 'bottom',
                showPrevButton:'true',
            },
            {
                title: 'Filter Results',
                content: 'Filter results by timecard status or if multiple employees are displayed, filter by employee.',
                target: 'filter-wrapper',
                placement: 'bottom',
                showPrevButton:'true',
            },
            {
                title: 'Refresh List',
                content: 'Click here to refresh the list.',
                target: 'refresh-list-btn',
                placement: 'left',
                showPrevButton:'true',
                yOffset: '-25px',
            },
            {
                title: 'Select a timecard',
                content: 'Click on a timecard to view from the returned search results.',
                target: 'timecard-list-container',
                placement: 'top',
                showPrevButton:'true',
            },        
        ]
    },
    'vrsList': {
        id: 'walkthrough',
        showSkip: true,
        steps: [
            {
                title: 'Welcome to the VRS',
                content: 'This tour will show you what’s new in our redesigned VRS system. <a href="https://share.harris.com/sites/ITSM_KB/KB_Articles/Vacation%20Request%20User%20Guide.pdf" target="_blank">Click to find detailed instructions.</a>',
                target: 'page-title',
                placement: 'bottom'
            },
            {
                title: 'Employee Information',
                content: 'Click on the dropdown and select View Profile to change your primary and secondary approvers and to see your employee information including employee ID, department, etc.',
                target: 'user-account',
                placement: 'right',
                showPrevButton:'true',
                
            },
            {
                title: 'Side Navigation Pane',
                content: 'The left navigation pane includes links to scheduled vacation, request vacation and search for upcoming vacation.  For approvers, access to review and approve vacation requests and search for their team member vacation requests.',
                target: 'timecard-menu',
                placement: 'right',
                showPrevButton:'true',
            },
            {
                title: 'Request Views',
                content: 'Switch between Request List or Calendar View.',
                target: 'approvals-tabs',
                placement: 'bottom',
                showPrevButton:'true',
            },
            {
                title: 'VRS Dashboard',
                content: 'This area shows vacation pending, approved and taken for current and next year.',
                target: 'mini-dashboard',
                placement: 'bottom',
                showPrevButton:'true',
            },
            {
                title: 'Filter',
                content: 'Status allows filtering by request status (canceled, denied, submitted, in-process and approved).',
                target: 'status-col',
                placement: 'left',
                showPrevButton:'true',
            },
            {
                title: 'View or Edit a Request',
                content: 'A request can be viewed or edited by selecting a request from the list.',
                target: 'dates-col',
                placement: 'top',
                showPrevButton:'true',
            },
            {
                title: 'Create a New Request',
                content: 'Click Request Vacation to start a new request.',
                target: 'request-vaction-btn',
                placement: 'top',
                showPrevButton:'true',
                showNextButton: false,
            },
        ]
    },
    'DisplaySingleRequest': {
        id: 'walkthrough',
        showSkip: true,
        steps: [
            {
                title: 'Request Vacation',
                content: 'Request Vacation is where you can start a new request or edit an existing request.  <a href="https://share.harris.com/sites/ITSM_KB/KB_Articles/Vacation%20Request%20User%20Guide.pdf" target="_blank">Click to find detailed instructions.</a>',
                target: 'page-title',
                placement: 'bottom'
            },
            {
                title: 'Select Dates',
                content: 'Choose requested dates on the calendar.  Dates with requests are color coded by status.',
                target: 'select-calendar',
                placement: 'top',
                showPrevButton:'true',
                
            },
            {
                title: 'Specify Hours',
                content: 'Specify hours for each date. Will default to scheduled hours if schedule is available.',
                target: 'hours-col',
                placement: 'top',
                showPrevButton:'true',
                arrowOffset: '230px',
                xOffset: '-225px',
            },
            {
                title: 'HR Business Rep',
                content: 'Choose the appropriate HR Business Rep (will default after submitting your first request)',
                target: 'HRBusinessRep',
                placement: 'top',
                showPrevButton:'true',
            },
            {
                title: 'Email Recipients',
                content: '(Optional) Add additional email recipients if desired.',
                target: 'add-email-recipients',
                placement: 'left',
                showPrevButton:'true',
                yOffset: '-20px',
            },
            {
                title: 'Submit Request',
                content: 'Click to Submit your request. You will be prompted to enter an optional message with your request if desired. Then Click Save',
                target: 'submit-request',
                placement: 'top',
                showPrevButton:'true',
                showNextButton: false,
                arrowOffset: '250px',
                xOffset: '-225px',
            }
        ]
    },
    'vrsSearch': {
        id: 'walkthrough',
        showSkip: true,
        steps: [
            {
                title: 'Vacation Search',
                content: 'Vacation Search is where you can search for your requests between a specific date range. <a href="https://share.harris.com/sites/ITSM_KB/KB_Articles/Vacation%20Request%20User%20Guide.pdf" target="_blank">Click to find detailed instructions.</a>',
                target: 'page-title',
                placement: 'bottom'
            },
            {
                title: 'Search by Date',
                content: 'Enter the date range that includes the request you are trying to find. Click the magnifying glass to display list and continue tour.',
                target: 'utility-bar',
                placement: 'bottom',
                showPrevButton:'true',
                
            },
            {
                title: 'Filter',
                content: 'Status allows filtering by request status (canceled, denied, submitted, in-process and approved).',
                target: 'status-col',
                placement: 'left',
                showPrevButton:'true',
                yOffset: '-20px',
            },
            {
                title: 'View a Request',
                content: 'Select a request to edit or review from the returned search results.',
                target: 'dates-col',
                placement: 'top',
                showPrevButton:'true',
                showNextButton: false,
            },
        ]
    },
    'ShowApproverRequests': {
        id: 'walkthrough',
        showSkip: true,
        steps: [
            {
                title: 'Approval List',
                content: 'The approvals page is where you can find your team’s timecards to review and approve. <a href="https://share.harris.com/sites/ITSM_KB/KB_Articles/Vacation%20Request%20User%20Guide.pdf" target="_blank">Click to find detailed instructions.</a>',
                target: 'page-title',
                placement: 'bottom'
            },
            {
                title: 'Approval View Options',
                content: 'Switch between List or Calendar View. Note that Calendar view will display all approver’s direct reports in both calendar and list views, color coded by status.',
                target: 'approval-views-select',
                placement: 'bottom',
                showPrevButton:'true',
            },
            {
                title: 'Filter',
                content: 'Status allows filtering by request status (canceled, denied, submitted, in-process and approved).',
                target: 'status-col',
                placement: 'left',
                showPrevButton:'true',
                yOffset: '-20px',
            },
            {
                title: 'View a Request',
                content: 'Select a request to review and deny or approve.',
                target: 'dates-col',
                placement: 'top',
                showPrevButton:'true',
                showNextButton: false,
                xOffset: '250px',
            },
        ]
    },
    'DisplayApproverCalendar': {
        id: 'walkthrough',
        showSkip: true,
        steps: [
            {
                title: 'Approval Calendar',
                content: 'The approval calendar is where you can find your team’s timecards to review and approve by date. <a href="https://share.harris.com/sites/ITSM_KB/KB_Articles/Vacation%20Request%20User%20Guide.pdf" target="_blank">Click to find detailed instructions.</a>',
                target: 'page-title',
                placement: 'bottom'
            },           
            {
                title: 'View a Request',
                content: 'Select a date to show available requests.  Click a request in the display to review and deny or approve.',
                target: 'calendar-month-grid',
                placement: 'top',
                showPrevButton:'true',
                showNextButton: false,
                xOffset: '250px',
            },
        ]
    },
    'DisplayRequestApproval': {
        id: 'walkthrough',
        showSkip: true,
        steps: [
            {
                title: 'Dashboard',
                content: 'Dashboard shows the requester’s hours taken, approved and pending for current and next year.',
                target: 'mini-dashboard',
                placement: 'bottom',
                showPrevButton:'true',
            },
            {
                title: 'Messages',
                content: 'Requester messages can be viewed here.',
                target: 'vrs-messages',
                placement: 'top',
                showPrevButton:'true',
            },
            {
                title: 'Requested Dates',
                content: 'View requested dates on the calendar.  Dates with requests are color coded by status.',
                target: 'select-calendar',
                placement: 'top',
                showPrevButton:'true',
            },
            {
                title: 'Requested Hours',
                content: 'View dates and number of hours being requested.',
                target: 'hours-col',
                placement: 'top',
                showPrevButton:'true',
                arrowOffset: '250px',
                xOffset: '-250px',
            },
            {
                title: 'Overlap',
                content: 'Overlap will indicate any vacation overlaps for direct reports. Click to review.',
                target: 'overlap-col',
                placement: 'top',
                showPrevButton:'true',
                arrowOffset: '250px',
                xOffset: '-250px',
            },
            {
                title: 'Approve or Deny',
                content: 'Click Approve or Deny to complete. If denied, you will be promted to enter a message.',
                target: 'approve-deny-action',
                placement: 'top',
                showPrevButton:'true',
                showNextButton: false,
                arrowOffset: '250px',
                xOffset: '-225px',
                yOffset: '-20px',
            },
        ]
    },
}
