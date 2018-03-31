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

    /* function for addingd or subscribing products to/from shopping cart in farmerXX.html */
 
    
                $(".incr-btn").on("click", function (e) {
                    var $button = $(this);
                    var oldValue = $button.parent().find('.quantity').val();
                    $button.parent().find('.incr-btn[data-action="decrease"]').removeClass('inactive');
                    if ($button.data('action') == "increase") {
                        var newVal = parseFloat(oldValue) + 1;
                    } else {
                        // Don't allow decrementing below 1
                        if (oldValue > 1) {
                            var newVal = parseFloat(oldValue) - 1;
                        } else {
                            newVal = 1;
                            $button.addClass('inactive');
                        }
                    }
                    $button.parent().find('.quantity').val(newVal);
                    e.preventDefault();
                });

            /* function for star rating */

                    // Starrr plugin (https://github.com/dobtco/starrr)
                    var __slice = [].slice;

                    (function($, window) {
                    var Starrr;

                    Starrr = (function() {
                    Starrr.prototype.defaults = {
                    rating: void 0,
                    numStars: 5,
                    change: function(e, value) {}
                    };

                    function Starrr($el, options) {
                    var i, _, _ref,
                        _this = this;

                    this.options = $.extend({}, this.defaults, options);
                    this.$el = $el;
                    _ref = this.defaults;
                    for (i in _ref) {
                        _ = _ref[i];
                        if (this.$el.data(i) != null) {
                        this.options[i] = this.$el.data(i);
                        }
                    }
                    this.createStars();
                    this.syncRating();
                    this.$el.on('mouseover.starrr', 'span', function(e) {
                        return _this.syncRating(_this.$el.find('span').index(e.currentTarget) + 1);
                    });
                    this.$el.on('mouseout.starrr', function() {
                        return _this.syncRating();
                    });
                    this.$el.on('click.starrr', 'span', function(e) {
                        return _this.setRating(_this.$el.find('span').index(e.currentTarget) + 1);
                    });
                    this.$el.on('starrr:change', this.options.change);
                    }

                    Starrr.prototype.createStars = function() {
                    var _i, _ref, _results;

                    _results = [];
                    for (_i = 1, _ref = this.options.numStars; 1 <= _ref ? _i <= _ref : _i >= _ref; 1 <= _ref ? _i++ : _i--) {
                        _results.push(this.$el.append("<span class='glyphicon .glyphicon-star-empty'></span>"));
                    }
                    return _results;
                    };

                    Starrr.prototype.setRating = function(rating) {
                    if (this.options.rating === rating) {
                        rating = void 0;
                    }
                    this.options.rating = rating;
                    this.syncRating();
                    return this.$el.trigger('starrr:change', rating);
                    };

                    Starrr.prototype.syncRating = function(rating) {
                    var i, _i, _j, _ref;

                    rating || (rating = this.options.rating);
                    if (rating) {
                        for (i = _i = 0, _ref = rating - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
                        this.$el.find('span').eq(i).removeClass('glyphicon-star-empty').addClass('glyphicon-star');
                        }
                    }
                    if (rating && rating < 5) {
                        for (i = _j = rating; rating <= 4 ? _j <= 4 : _j >= 4; i = rating <= 4 ? ++_j : --_j) {
                        this.$el.find('span').eq(i).removeClass('glyphicon-star').addClass('glyphicon-star-empty');
                        }
                    }
                    if (!rating) {
                        return this.$el.find('span').removeClass('glyphicon-star').addClass('glyphicon-star-empty');
                    }
                    };

                    return Starrr;

                    })();
                    return $.fn.extend({
                    starrr: function() {
                    var args, option;

                    option = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
                    return this.each(function() {
                        var data;

                        data = $(this).data('star-rating');
                        if (!data) {
                        $(this).data('star-rating', (data = new Starrr($(this), option)));
                        }
                        if (typeof option === 'string') {
                        return data[option].apply(data, args);
                        }
                    });
                    }
                    });
                    })(window.jQuery, window);

                    $(function() {
                    return $(".starrr").starrr();
                    });

                    $('#stars').on('starrr:change', function(e, value){
                    $('#count').html(value);
                    });

                    $('#stars-existing').on('starrr:change', function(e, value){
                    $('#count-existing').html(value);
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


   function showManageProduct(){
           var dropdownlist = document.getElementById("manageProduct");
       manageProduct.style.display="inline";
   }
   function showManageProduct2(){
           var dropdownlist = document.getElementById("manageProduct2");
       manageProduct2.style.display="inline";
   }
   function showManageProduct3(){
           var dropdownlist = document.getElementById("manageProduct3");
       manageProduct3.style.display="inline";
   }
   
   function showCreateProduct(){
       
        document.getElementById("overlay").style.display = "block";
   }
      
   /* Julia's work: thumbnails */
   
   function calcside3(x){
               
               var maximages = 4;
           var startpath = "images/testFarmer3Picts/test";
           var extension = ".jpg";
               // Get file nme of image that is showing
               var currentimage= document.getElementById("bigpic3").src;
               
               // Locate file name extension in current image source string
               var dotat = currentimage.indexOf(extension);
               
               // Grab two digits o the left of that file nsme extension
               var stringnum = currentimage.substr(dotat-2,2);
               
               // Convert stringnumber string to number and add x
               var nextnum= parseInt(stringnum) + x;
               
               //If nextnum is less than 1. wrap around to maximages
               if(nextnum<1){
                   nextnum = maximages;
               }
               
               // If nextnum is greater than maximages, wrap aroun to 1
               if(nextnum> maximages){
                   nextnum=1
               }
               
               //Creae two-digit string from number ( loading zero if less than 10 )
               var twodigitum= ("0" +nextnum).slice(-2)
               
               //Crezte new file name from two-digit nmber string.
               var showing = startpath + twodigitum + extension;
               showbig3(showing);
           }
           
           function showbig3(pic){
               //alert(pic); -- to see what is inside the variable 
               document.getElementById("bigpic3").src = pic; // so it takes the picture's sourxe   and put in the div caleed "bigpic"
           }
           // Calcu;ates wich picture to sow next based on x whih is either 1 or -1
           function calcside2(x){
               
               var maximages = 4;
           var startpath = "images/testFarmer2Picts/test";
           var extension = ".jpg";
               // Get file nme of image that is showing
               var currentimage= document.getElementById("bigpic2").src;
               
               // Locate file name extension in current image source string
               var dotat = currentimage.indexOf(extension);
               
               // Grab two digits o the left of that file nsme extension
               var stringnum = currentimage.substr(dotat-2,2);
               
               // Convert stringnumber string to number and add x
               var nextnum= parseInt(stringnum) + x;
               
               //If nextnum is less than 1. wrap around to maximages
               if(nextnum<1){
                   nextnum = maximages;
               }
               
               // If nextnum is greater than maximages, wrap aroun to 1
               if(nextnum> maximages){
                   nextnum=1
               }
               
               //Creae two-digit string from number ( loading zero if less than 10 )
               var twodigitum= ("0" +nextnum).slice(-2)
               
               //Crezte new file name from two-digit nmber string.
               var showing = startpath + twodigitum + extension;
               showbig2(showing);
           }
           
           function showbig2(pic){
               //alert(pic); -- to see what is inside the variable 
               document.getElementById("bigpic2").src = pic; // so it takes the picture's sourxe   and put in the div caleed "bigpic"
           }
           
           
           // Calcu;ates wich picture to sow next based on x whih is either 1 or -1
           function calcside1(x){
               
               var maximages = 4;
           var startpath = "images/testFarmer1Picts/test";
           var extension = ".jpg";
               // Get file nme of image that is showing
               var currentimage= document.getElementById("bigpic").src;
               
               // Locate file name extension in current image source string
               var dotat = currentimage.indexOf(extension);
               
               // Grab two digits o the left of that file nsme extension
               var stringnum = currentimage.substr(dotat-2,2);
               
               // Convert stringnumber string to number and add x
               var nextnum= parseInt(stringnum) + x;
               
               //If nextnum is less than 1. wrap around to maximages
               if(nextnum<1){
                   nextnum = maximages;
               }
               
               // If nextnum is greater than maximages, wrap aroun to 1
               if(nextnum> maximages){
                   nextnum=1
               }
               
               //Creae two-digit string from number ( loading zero if less than 10 )
               var twodigitum= ("0" +nextnum).slice(-2)
               
               //Crezte new file name from two-digit nmber string.
               var showing = startpath + twodigitum + extension;
               showbig1(showing);
           }
           
           function showbig1(pic){
               //alert(pic); -- to see what is inside the variable 
               document.getElementById("bigpic").src = pic; // so it takes the picture's sourxe   and put in the div caleed "bigpic"
           }
   
   
