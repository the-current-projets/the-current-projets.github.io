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
    
    /* Show uploaded picture */
    $('#m_upicture, #m_fpicture').on('change', function () {
        //alert(this.files[0]);
        var noPicture = '../images/no-photo.png';
        var fileTypes = ['image/png', 'image/jpeg', 'image/jpg'];
        var pic = '';
        var typeFind = false;

        //get img element
        var divPicture = jQuery('#' + this.id + '_img');

        if (this.files.length == 1) {
            pic = this.files[0];

            //Validate if the file selected is a png or jpeg type
            fileTypes.forEach( function(val) {
                if (val === pic.type) {
                    divPicture.slideDown('slow', function () {
                        divPicture[0].children[0].src = window.URL.createObjectURL(pic);
                        divPicture[0].children[0].style.display = 'block';
                        typeFind = true;
                    });                
                }
            });
        }

        if (!typeFind) {
            divPicture[0].children[0].src = noPicture;
            divPicture[0].children[0].style.display = 'block'
        }
    });

    /* Show farm, or farmer specific field */
    $('#m_utype').on('change', function () {
        var userType = ['1', '2'];  //['Buyer', 'Farmer']

        switch (this.value) {
            case userType[0]:   //farmer, show block
                jQuery('.form-farm-fields').slideToggle( function() {
                    this.style.display = 'none';
                    //change specific fields to not required

                });
                break;
            case userType[1]:    //buyer, Hide block
                jQuery('.form-farm-fields').slideToggle( function() {
                    this.style.display = 'block';
                    //change specific fields to required

                });
                break;
        }
    });

    /* Manage the display of address fields if required by the user.
       Used for CreateUser form and Shipping cart form
    */
    $('#farm_as_farmer, #another_address').on('change', function () {
        if (this.id == 'farm_as_farmer') {
            switch(this.checked) {
                case true:  //farmer and farm address are the same
                    jQuery('.farm-address').slideToggle( function() {
                        this.style.display = 'none';
                    });
                    break;
                case false: //both are different
                    jQuery('.farm-address').slideToggle( function() {
                        this.style.display = 'block';
                    });
                    break;
            }
        }
        else if (this.id == 'another_address') {
            switch(this.checked) {
                case true:  //another shipping address
                    jQuery('.a-address-fields').slideToggle( function() {
                        this.style.display = 'block';
                    });
                    jQuery('.default-address > div').slideToggle( function() {
                        this.style.display = 'none';
                    });
                    break;
                case false: //not another shipping address, use default user address
                    jQuery('.a-address-fields').slideToggle( function() {
                        this.style.display = 'none';
                    });
                    jQuery('.default-address > div').slideToggle( function() {
                        this.style.display = 'block';
                    });
                    break;
            }
        }
    });

});

/****************************************** *****************************************/
// This code displays an address form, using the autocomplete feature
// of the Google Places API to help users fill in the information.
// It requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
/****************************************** *****************************************/
var placeSearch, autocomplete;
var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
};

function initAutocomplete() {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
        {types: ['geocode']});

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();

    for (var component in componentForm) {
        document.getElementById(component).value = '';
        document.getElementById(component).disabled = false;
    }

    // Get each component of the address from the place details
    // and fill the corresponding field on the form.
    for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];
        if (componentForm[addressType]) {
        var val = place.address_components[i][componentForm[addressType]];
        document.getElementById(addressType).value = val;
        }
    }
}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
        var geolocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        var circle = new google.maps.Circle({
            center: geolocation,
            radius: position.coords.accuracy
        });
        autocomplete.setBounds(circle.getBounds());
        });
    }
}
/********************************END Google API *****************************************/

/**** Julia's work: *****/
