// Author: Joshua Culver, jculve01@harris.com
// Fixes material select issue in modals
// Issue: Clicking os sctroll bar in dropdown would trigger dropdown to close.
// DBG-upgrade hds to see if mdb fixed issue.


 // function to hide mdb select dropdown manually.
 $.fn.fixMDBSelectDropdown = function () {
     

    // find all initialized material_select dropdowns and add fixed class.
    $(this).each(function() {
        if (!$(this).find('.dropdown-content.select-dropdown').hasClass('mdb-select-fixed')) {
            $(this).addClass('mdb-select-fixed');
        }
    });

    // reset and prevent default on fixed select-dropdowns
    $('.mdb-select-fixed').off('mousedown').on('mousedown', function(e) {
        e.preventDefault();
    });

    // listen for click on dropdown items.
    $('.mdb-select-fixed li').on('click', function() {
        $(this).parent().removeClass('active');
        $(this).parent().siblings('.select-dropdown.active').removeClass('active');
        $(this).parent().hide();
        $(this).parent().siblings('.select-dropdown').blur();
    })
    
}