// Hopscotch tour
// Define the tour!
var tour = {
    'List': {
        id: 'walkthrough',
        showSkip: true,
        steps: [
            {
                title: 'Welcome',
                content: 'Welcome to the Harris Timecard System. This tour will show you what\'s new in our redesigned timecard interface. <a href="https://share.harris.com/sites/ServiceDeskFront/Content%20Library/Timecard%20User%20Guide.pdf" target="_blank">Click to find detailed instructions.</a>',
                target: 'page-title',
                placement: 'bottom'
            },
            {
                title: 'Employee Information',
                content: 'Click on the dropdown to see your employee information including employee ID, department, etc.',
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
                content:'The timecard view allows you to view and edit a timecard. <a href="https://share.harris.com/sites/ServiceDeskFront/Content%20Library/Timecard%20User%20Guide.pdf" target="_blank">Click to find detailed instructions.</a>',
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
                title:'Timecard Status',
                content:'The status of the timecard (Open, Pending, Approved) shows here.',
                target:'timecard-status',
                placement:'bottom',
            },
            {
                title: 'Add/Select',
                content: 'Click Add to add a new charge code to your timecard or click Select to choose from a list of your recently used charge codes.',
                target: 'row-actions',
                placement: 'top',
                showPrevButton:'true',
            },
            {
                title: 'Enter time',
                content: 'Enter time for each day here.',
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
                content: 'To submit your timecard, click the sign timecard button and click Save. Click Timecard Search in menu to continue the tour.',
                target: 'signature',
                placement: 'top',
                showPrevButton:'true',
                arrowOffset: '250px',
                xOffset: '-225px',
                showNextButton: false,
            },
            {
                title: 'Labor Correction',
                content: 'Click on Labor Correction.  You will be prompted to enter a Note Title and Text. Follow all prompts, make necessary changes, click to Sign and Save.',
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
                content: 'Timecard Search is where you can search for your timecards between a specific date range.  You can also create a Labor Correction from this page. <a href="https://share.harris.com/sites/ServiceDeskFront/Content%20Library/Timecard%20User%20Guide.pdf" target="_blank">Click to find detailed instructions.</a>',
                target: 'page-title',
                placement: 'bottom',
                showPrevButton:'true',
            },
            {
                title: 'Search by Date',
                content: 'Enter the date range that includes the timecard pay period you are trying to find. Click Submit to display list and continue tour.',
                target: 'search-submit-btn',
                placement: 'right',
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
                content: 'The Approvals page is where you can find your teams\'s timecards to review and approve. <a href="https://share.harris.com/sites/ServiceDeskFront/Content%20Library/Timecard%20User%20Guide.pdf" target="_blank">Click to find detailed instructions.</a>',
                target: 'page-title',
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
                content: 'This feature allows timecard approvers to search any open, pending or approved timecards in their organization.  <a href="https://share.harris.com/sites/ServiceDeskFront/Content%20Library/Timecard%20User%20Guide.pdf" target="_blank">Click to find detailed instructions.</a>',
                target: 'page-title',
                placement: 'bottom',
            },
            {
                title: 'Search by Date',
                content: 'Enter the date range that includes the timecard pay period you are trying to find. Click Submit to display list and continue tour.',
                target: 'search-submit-btn',
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
                content: 'Click on a timecard to view from the returned search results.',
                target: 'timecard-list-container',
                placement: 'top',
                showPrevButton:'true',
            },        
        ]
    }
}
