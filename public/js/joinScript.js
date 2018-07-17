/*Filename:homeScript purpose: processing home page events*/
/* When a document loads*/
var data1 = {};
data1.username = "";
data1.password = "";
data1.confirmation = "";
data1.choice = "";

$(document).ready(function () {

    /* Method to handle join community even*/
    $('#join_submit').click(function (e) {
        var validBoolean = validateInputs();

        if (validBoolean) {
            var $password = $('#password');
            var $username = $('#userName');
            var converPass = $password.val();
            encryUsingBecrypt(converPass, function(result) {
                converPass = result;
            });
            data1.username = $username.val();
            data1.password = converPass;
            data1.confirmation = -1;
            data1.choice = "join";
            $.ajax({
                type: 'POST',
                contentType: 'application/json',
                datatype: 'json',
                data: JSON.stringify(data1),
                url: '/users',
                success: function (data) {
                    if (data.code == 200) {
                        populatedata(data.username)
                        window.location.href = "/home";

                    } else if (data.code == 400) {
                        alert("The username or password is not correct");
                        window.location.href = "/join";
                    } else {
                        window.location.href = "/confirmation";
                        populateUsernameConfirmationPage(data1.username);
                    }
                },
                error: function (error) {
                }
            });

        };

    });

    /*Method to handle confirmation event  */
    $('#confirm').click(function (e) {
        var $userid = $('#username1');
        var $userchoice = $('#userchoice1');
        data1.username = $userid.val();
        data1.confirmation = 1;
        data1.choice = $userchoice.val();
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data1),
            contentType: 'application/json',
            url: '/users',
            success: function (response) {
                if (response.code == 401) {
                    alert(response.message);
                    window.location.href = "/join";

                }
                if (response.code == 201) {
                    populatedata(response.username)
                    loginUserData(response.username)
                    window.location.href = "/home";
                }
            },
            error: function(error) {
                console.log(error);
            }
        });

    });

    /*Method to handle cancellation  event  */

    $('#cancel').click(function (e) {
        var $userid2 = $('#username2');
        var $userchoice2 = $('#userchoice2');
        data1.username = $userid2.val();
        data1.confirmation = 1;
        data1.choice = $userchoice2.val();

        $.ajax({
            type: 'POST',
            data: JSON.stringify(data1),
            contentType: 'application/json',
            url: '/users',
            success: function(response) {
                alert(response.message);
                window.location.href = "/join";
            },
            error: function(error) {
                console.log(error);
            }
        });

    });

});