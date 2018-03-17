/*
    Custom js file to personalize this bootstrap template
*/

$(document).ready( function(e) {

    //Show or hide the search option in the menu header
    $('#searchOption').click( function(e) {
        //alert(e);
        var divSearch = jQuery('#menuSearch');

        divSearch.slideToggle( function() {
            jQuery('#menuSearch input').val('');
            jQuery('#menuSearch input').focus();
        });

    });
    
});