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


});

/* Julia's work: */
function CloseWindow(){
 document.getElementById("overlay").style.display = "none";
}

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


/* function or drag and drop */

var imageLoader = document.getElementById('filePhoto');
    imageLoader.addEventListener('change', handleImage, false);

function handleImage(e) {
    var reader = new FileReader();
    reader.onload = function (event) {
        $('#uploader img').attr('src',event.target.result);
    }
    reader.readAsDataURL(e.target.files[0]);
    
}

var dropbox;
dropbox = document.getElementById("uploader");
dropbox.addEventListener("dragenter", dragenter, false);
dropbox.addEventListener("dragover", dragover, false);
dropbox.addEventListener("drop", drop, false);

function dragenter(e) {
  e.stopPropagation();
  e.preventDefault();
}

function dragover(e) {
  e.stopPropagation();
  e.preventDefault();
}

function drop(e) {
  e.stopPropagation();
  e.preventDefault();
  //you can check e's properties
  //console.log(e);
  var dt = e.dataTransfer();
  var files = dt.files;
  
  //this code line fires your 'handleImage' function (imageLoader change event)
  imageLoader.files = files;
}