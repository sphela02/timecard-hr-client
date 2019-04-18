// Author: Joshua Culver, jculve01@harris.com
// Fixes material select issue in modals
// Issue: Clicking os sctroll bar in dropdown would trigger dropdown to close.
// DBG-upgrade hds to see if mdb fixed issue.


 // function to hide mdb select dropdown manually.
 $.fn.fixMDBSelectDropdown = function () {
    // find all initialized material_select dropdowns and add fixed class.
    $(this).each(function() {
        if ($(this).hasClass('apply-select-fix')) {

            if (!$(this).find('.dropdown-content.select-dropdown').hasClass('mdb-select-fixed')) {
                $(this).addClass('mdb-select-fixed');

                // Fix IE issue of not selecting disabled option as default.
                // Disable first child.
                $(this).mdbDisableFirstOption();
            }

            // reset and prevent default on fixed select-dropdowns
            $(this).off('mousedown').on('mousedown', function(e) {
                e.preventDefault();
            });

            // listen for click on dropdown items.
            $(this).find('.dropdown-content.select-dropdown li').on('click', function() {
                // Close the select-dropdown.
                $(this).parent().removeClass('active');
                $(this).parent().siblings('.select-dropdown.active').removeClass('active');
                $(this).parent().hide();
                $(this).parent().siblings('.select-dropdown').blur();
            })
        }
    
        // reset and prevent default on fixed select-dropdowns
        $('.mdb-select-fixed').off('mousedown').on('mousedown', function(e) {
            e.preventDefault();
        });
    });    
}

$.fn.mdbDisableFirstOption = function() {
    // Fix IE issue of not selecting disabled option as default.
    // Disable first child.
    $(this).siblings('.dropdown-content.select-dropdown').find('li:first-of-type').addClass('disabled');
}