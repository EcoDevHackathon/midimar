var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

var weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

var d;

$('#alert').hide()

$(document).ready(function() {



    var title = '';



    /* To trigger both public and private messages*/



    $("#chatprivately").click(function() {

        window.location.href = "/chatprivately";

    });



    $("#emergency").click(function() {

        window.location.href = "/emergency";

    });







    $("#chatpublicly").click(function() {

        window.location.href = "/chatpublicly";

    });



});



function hideAmountInput() {

    $('#showme').show()

}



function init() {

    $('#usernameSpan').html(localStorage.username);

    $('#coordinator').html(localStorage.username);



}

/*load localstorage with emergency hitwords */



function populateEmergencyMessages(emergencyMessages) {

    localStorage.setItem("emergencyMessages", JSON.stringify(emergencyMessages))

}





function populatedata(username) {

    window.localStorage.clear();

    localStorage.username = username;

}




function citizenFriendReport(username) {

    var respo;

    var data = {};

    data.username = username;

    $.ajax({

        type: 'GET',

        data: data,

        contentType: 'application/json',

        url: '/friends',

        success: function(response) {

            localStorage.setItem("friendrepo", JSON.stringify(response));

            // return esponse;



        }

    });



}



function populateuserdata(userList) {

    localStorage.setItem("users", JSON.stringify(userList));

    var listUsers = JSON.parse(localStorage.getItem('users'));

}



function populateEmergencyList(emergencyList) {

    localStorage.setItem("emergencies", JSON.stringify(emergencyList))

}

/*This function loads reloads the chat privately page

and helps load the private messages on the UI

*/





function getChatPrivate(j) {



    var listUsers = JSON.parse(localStorage.getItem('users'));

    for (var i = 0; i < listUsers.length; i++) {

        if (i == j) {

            localStorage.target = listUsers[i].username;

            localStorage.status = listUsers[i].onlineStatus;

            $('#authorPrivate').html(localStorage.username);

            $('#targetPrivate').html(localStorage.target);

            populatemessages();



        }

    }

}







/**

*return latest announcements from API and load them into interface

*/

function loadAnnouncements() {

    $.ajax({

        type: 'GET',

        contentType: 'application/json',

        url: '/announcements',

        success: function(announcementsObjectJSON) {



            var resultsdiv = document.getElementById("loadAnnouncements");

            if (announcementsObjectJSON != null) {

                announcementsObjectJSON['announcementData'].forEach(element => {

                    var theAnnouncement = element['AnnouncementObject']

                    resultsdiv.innerHTML += '<p class="media-bodyannouncement pb-3 mb-0 small lh-125 border-bottom border-gray"> <strong class="d-block text-gray-dark class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray" ><img src="../images/user-holder.png" class="mr-2 rounded"><span id="' + theAnnouncement['author'] + '">Author: ' + theAnnouncement['author'] + " " + theAnnouncement['postedAt'] + '</span></strong><br/><span class="label label-success"> Subject : ' + theAnnouncement['title'] + '</span><br/><span class="label label-primary"> Message :' + theAnnouncement['content'] + ' </span></p>';

                });

            }

        },

        error: function(error) {}

    });

}





/**

*return latest announcements from API and load them into interface

*/

function loadEmergencies() {

    $.ajax({

        type: 'GET',

        contentType: 'application/json',

        url: '/emergencies',

        success: function(emergenciesJson) {

            populateEmergencyList(emergenciesJson)

            var title = '';

            var resultsdiv = document.getElementById("loadEmergemcies");

            if (emergenciesJson != null) {

                for (i = 0; i < emergenciesJson.length; i++) {

                    resultsdiv.innerHTML += '<p class="pb-3 mb-0 small lh-125 border-bottom border-gray"> <p class="d-block text-gray-dark class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray" ><span id="title" >' + emergenciesJson[i].title + '</span> <a style="background-color:#66b2ff;color:#fff" onclick="getEmergencyById(' + i + ')" id="button" name="1" value="' + emergenciesJson[i].title + '">Read More</a> </p>';



                }

            }



        },

        error: function(error) {}

    });

}



//function for donating to an emergency





//get localstorage loop

function donateToEmergency(j) {

    var emergencies = JSON.parse(localStorage.getItem('emergencies'));

    for (var i = 0; i < emergencies.length; i++) {

        if (i == j) {

            data = {},

                data.id = localStorage._id;

            data.money = document.getElementById("amount").value;



            var validBoolean = validateAmount();

            if (validBoolean) {

                $.post('/Donation/', data, function(response) {



                }, 'JSON');



                alert('Thanks for your generosity')

            }

        }

    }

}



function validateAmount() {

    var amount = document.getElementById('amount');

    if ($.trim(amount.value) == '' || amount.value < 0) {

        alert("Invalid donation amount");

        return false;

    }

    return true



}

//get localstorage loop

function getEmergencyById(j) {

    var emergencies = JSON.parse(localStorage.getItem('emergencies'));

    for (var i = 0; i < emergencies.length; i++) {

        if (i == j) {

            localStorage.title = emergencies[i].title;

            localStorage._id = emergencies[i]._id;

            data.id = localStorage._id;

            $.ajax({

                type: 'GET',

                contentType: 'application/json',

                data: data,

                url: '/emergencyDetails/',

                success: function(emergenciesJson) {

                    var resultsdiv = document.getElementById("loadEmergemcies");

                    resultsdiv.innerHTML = '<div> <input type="text" class="form-control" id="amount" placeholder="Donation Amount"/></div>'



                    if (emergenciesJson != null) {

                        for (i = 0; i < emergenciesJson.length; i++) {

                            resultsdiv.innerHTML += '<p class="pb-3 mb-0 small lh-125 border-bottom border-gray"> <p class="d-block text-gray-dark class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray" ><span id="title" >Emergency Title: ' + emergenciesJson[i].title + "</br></span>Emergency Description:" + emergenciesJson[i].description + '</span></strong><br/><span class="label label-success">Names Of Needed Items : ' + emergenciesJson[i].neededItems['name'] + '</span><br/><span class="label label-primary">Maximum Needed Amount Of Moneny (USD) :' + emergenciesJson[i].neededItems['quantity'] + ' </span><br/><button class="btn sm info" onclick="donateToEmergency(' + i + ')" id="button" name="1" value="' + emergenciesJson[i].title + '">Donate</button> <button class="btn sm info" id="cancelDonation" onclick="cancelDonation()">Cancel </button> </p>';

                        }

                    }



                },

                error: function(error) {

                    console.log(error);

                }

            });

        }

    }

}



//registeremergency



function registerEmergency() {

    var validBoolean = validateEmergency();

    var emergencyTitle = document.getElementById('emergencyTitle');

    var itemName = document.getElementById('itemName');

    var quantity = document.getElementById('quantity');

    var Emergencydescription = document.getElementById('description');

    if (validBoolean) {

        var data = {};

        data.title = emergencyTitle.value;

        data.description = Emergencydescription.value;

        data.name = itemName.value;

        data.quantity = quantity.value;

        $.post('/emergencies/', data, function(response) {}, 'JSON');

        alert('Thanks You Donations registered Successfully')

    }

}



function cancelDonation() {

    alert("Canceling donation");

    var resultsdiv = document.getElementById("loadEmergemcies");

    resultsdiv.innerHTML = " "

    loadEmergencies();

}

/**

*return latest messages for 

*/



function getChatPrivate(j) {

    var listUsers = JSON.parse(localStorage.getItem('users'));

    for (var i = 0; i < listUsers.length; i++) {

        if (i == j) {

            localStorage.target = listUsers[i].username;

            localStorage.status = listUsers[i].onlineStatus;

            $('#authorPrivate').html(localStorage.username);

            $('#targetPrivate').html(localStorage.target);

            populatemessages();

        }

    }

}



function getFriendId(j) {





    var listUsers = JSON.parse(localStorage.getItem('users'));

    for (var i = 0; i < listUsers.length; i++) {

        if (i == j) {

            localStorage.friend = listUsers[i].username;

            alert("Friend:" + localStorage.friend)



            notifyFriend();

        }

    }

}



/**

*return latest announcements from API and load them into interface

*/

function loadAnnouncements() {

    $.ajax({

        type: 'GET',

        contentType: 'application/json',

        url: '/announcements',

        success: function(announcementsObjectJSON) {

            var resultsdiv = document.getElementById("loadAnnouncements");

            if (announcementsObjectJSON != null) {

                announcementsObjectJSON['announcementData'].forEach(element => {



                    var theAnnouncement = element['AnnouncementObject']

                    d = new Date(theAnnouncement['postedAt']);

                    resultsdiv.innerHTML += '<p class="media-bodyannouncement pb-3 mb-0 small lh-125 border-bottom border-gray"> <strong class="d-block text-gray-dark class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray" ><img src="../images/user-holder.png" class="mr-2 rounded"><span id="' + theAnnouncement['author'] + '">Author: ' + theAnnouncement['author'] + " " + weekdays[d.getDay()] + " " + months[d.getMonth()] + " " + d.getDate() + " " + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + '</span></strong><br/><span class="label label-success"> Subject : ' + theAnnouncement['title'] + '</span><br/><span class="label label-primary"> Message :' + theAnnouncement['content'] + ' </span></p>';

                });

            }

        },

        error: function(error) {}

    });

}



/**

*return latest messages for 

*/



function getChatPrivate(j) {



    var listUsers = JSON.parse(localStorage.getItem('users'));

    for (var i = 0; i < listUsers.length; i++) {

        if (i == j) {

            localStorage.target = listUsers[i].username;

            localStorage.status = listUsers[i].onlineStatus;

            $('#authorPrivate').html(localStorage.username);

            $('#targetPrivate').html(localStorage.target);

            populatemessages();

            // window.location.href="chatprivately";

        }

    }

}







/**

*return latest announcements from API and load them into interface

*/

function loadAnnouncements() {

    $.ajax({

        type: 'GET',

        contentType: 'application/json',

        url: '/announcements',

        success: function(announcementsObjectJSON) {

            //console.log(JSON.stringify(data));

            //var listAnnouncements = JSON.stringify(data);

            var resultsdiv = document.getElementById("loadAnnouncements");

            if (announcementsObjectJSON != null) {

                announcementsObjectJSON['announcementData'].forEach(element => {

                    var theAnnouncement = element['AnnouncementObject']

                    resultsdiv.innerHTML += '<p class="media-bodyannouncement pb-3 mb-0 small lh-125 border-bottom border-gray"> <strong class="d-block text-gray-dark class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray" ><img src="../images/user-holder.png" class="mr-2 rounded"><span id="' + theAnnouncement['author'] + '">Author: ' + theAnnouncement['author'] + " " + theAnnouncement['postedAt'] + '</span></strong><br/><span class="label label-success"> Subject : ' + theAnnouncement['title'] + '</span><br/><span class="label label-primary"> Message :' + theAnnouncement['content'] + ' </span></p>';

                });

            }

        },

        error: function(error) {}

    });

}





/**

*return latest announcements from API and load them into interface

*/

function loadEmergencies() {

    $.ajax({

        type: 'GET',

        contentType: 'application/json',

        url: '/emergencies',

        success: function(emergenciesJson) {

            populateEmergencyList(emergenciesJson)

            var title = '';

            var resultsdiv = document.getElementById("loadEmergemcies");



            if (emergenciesJson != null) {

                for (i = 0; i < emergenciesJson.length; i++) {

                    resultsdiv.innerHTML += '<p class="pb-3 mb-0 small lh-125 border-bottom border-gray"> <strong class="d-block text-gray-dark class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray" ><span id="title" >Emergency Title: ' + emergenciesJson[i].title + '</br></span><button onclick="getEmergencyById(' + i + ')" id="button" name="1" value="' + emergenciesJson[i].title + '">Click to read more .....</button> </p>';





                }

            }



        },

        error: function(error) {}

    });

}



//function for donating to an emergency





//get localstorage loop

function donateToEmergency(j) {

    var emergencies = JSON.parse(localStorage.getItem('emergencies'));

    for (var i = 0; i < emergencies.length; i++) {

        if (i == j) {

            data = {},

                data.id = localStorage._id;

            data.money = document.getElementById("amount").value;



            var validBoolean = validateAmount();

            if (validBoolean) {

                $.post('/Donation/', data, function(response) {



                }, 'JSON');

                window.location.href = "thanks";

            }

        }

    }

}



function validateAmount() {

    var amount = document.getElementById('amount');

    if ($.trim(amount.value) == '' || amount.value < 0) {

        alert(" INVALID AMOUNT OF MONEY TO DONATE");

        return false;

    }

    return true



}

//get localstorage loop

function getEmergencyById(j) {

    var emergencies = JSON.parse(localStorage.getItem('emergencies'));

    for (var i = 0; i < emergencies.length; i++) {

        if (i == j) {

            localStorage.title = emergencies[i].title;

            localStorage._id = emergencies[i]._id;

            data.id = localStorage._id;

            $.ajax({

                type: 'GET',

                contentType: 'application/json',

                data: data,

                url: '/emergencyDetails/',

                success: function(emergenciesJson) {

                    console.log("emergency data:" + JSON.stringify(emergenciesJson));

                    var resultsdiv = document.getElementById("loadEmergemcies");

                    resultsdiv.innerHTML = '<div> <input type="text" class="form-control" id="amount" placeholder=" ENTER AMOUNT TO DONATE HERE"/></div>'

                    if (emergenciesJson != null) {

                        for (i = 0; i < emergenciesJson.length; i++) {

                            resultsdiv.innerHTML += '<p class="pb-3 mb-0 small lh-125 border-bottom border-gray"> <strong class="d-block text-gray-dark class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray" ><span id="title" >Emergency Title: ' + emergenciesJson[i].title + "</br></span>Emergency Description:" + emergenciesJson[i].description + '</span></strong><br/><span class="label label-success">Names Of Needed Items : ' + emergenciesJson[i].neededItems['name'] + '</span><br/><span class="label label-primary">Maximum Needed Amount Of Moneny (USD) :' + emergenciesJson[i].neededItems['quantity'] + ' </span><button onclick="donateToEmergency(' + i + ')" id="button" name="1" value="' + emergenciesJson[i].title + '">Click To Donate</button><button id="cancelDonation" onclick="cancelDonation()">Cancel </button> </p>';

                        }

                    }



                },

                error: function(error) {

                    console.log(error);

                }

            });

        }

    }

}





function cancelDonation() {

    alert("Canceling donation");

    var resultsdiv = document.getElementById("loadEmergemcies");

    resultsdiv.innerHTML = " "

    loadEmergencies();

}

/**

*return latest messages for 

*/



function getChatPrivate(j) {

    var listUsers = JSON.parse(localStorage.getItem('users'));

    for (var i = 0; i < listUsers.length; i++) {

        if (i == j) {

            localStorage.target = listUsers[i].username;

            localStorage.status = listUsers[i].onlineStatus;

            $('#authorPrivate').html(localStorage.username);

            $('#targetPrivate').html(localStorage.target);



            populatemessages();

            // window.location.href="chatprivately";

        }

    }

}



function getFriendId(j) {





    var listUsers = JSON.parse(localStorage.getItem('users'));

    for (var i = 0; i < listUsers.length; i++) {

        if (i == j) {

            localStorage.friend = listUsers[i].username;

            alert("Friend:" + localStorage.friend)



            notifyFriend();

            //window.location.href="chatprivately";

        }

    }

}





function editprofile(j) {



    var listUsers = JSON.parse(localStorage.getItem('users'));

    for (var i = 0; i < listUsers.length; i++) {



        if (i == j) {



            localStorage.editusername = listUsers[i].username;

            localStorage.editpassword = listUsers[i].password;

            localStorage.editstatus = listUsers[i].status;

            localStorage.editprivilege = listUsers[i].privilege;

            alert("Profile info=> Username:" + localStorage.editusername + " status:" + localStorage.editstatus + " privilege:" + localStorage.editprivilege)

            window.location.href = "/edituserprofile";



            // notifyFriend();

            //window.location.href="chatprivately";

        }

    }

}

/**

*return latest announcements from API and load them into interface

*/

function loadAnnouncements() {

    $.ajax({

        type: 'GET',

        contentType: 'application/json',

        url: '/announcements',

        success: function(announcementsObjectJSON) {

            //console.log(JSON.stringify(data));

            //var listAnnouncements = JSON.stringify(data);

            var resultsdiv = document.getElementById("loadAnnouncements");

            if (announcementsObjectJSON != null) {

                announcementsObjectJSON['announcementData'].forEach(element => {



                    var theAnnouncement = element['AnnouncementObject']

                    d = new Date(theAnnouncement['postedAt']);

                    resultsdiv.innerHTML += '<p class="media-bodyannouncement pb-3 mb-0 small lh-125 border-bottom border-gray"> <strong class="d-block text-gray-dark class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray" ><img src="../images/user-holder.png" class="mr-2 rounded"><span id="' + theAnnouncement['author'] + '">Author: ' + theAnnouncement['author'] + " " + weekdays[d.getDay()] + " " + months[d.getMonth()] + " " + d.getDate() + " " + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + '</span></strong><br/><span class="label label-success"> Subject : ' + theAnnouncement['title'] + '</span><br/><span class="label label-primary"> Message :' + theAnnouncement['content'] + ' </span></p>';

                });

            }

        },

        error: function(error) {}

    });

}



/**

*return latest messages for 

*/



function populatemessages() {

    var context = localStorage.context;

    // var data = localStorage.context+","+ localStorage.username+","+localStorage.target;

    var data = {};

    data.author = localStorage.username;

    data.context = localStorage.context;

    data.target = localStorage.target;

    $.ajax({

        type: 'GET',

        contentType: 'application/json',

        data: data,

        url: '/messages/',

        success: function(results) {

            console.log("Feedback for private chat:" + JSON.stringify(results));

            var resultsdiv = document.getElementById("latestPrivateMessages");



            if (results != null) {

                results['messageAndStatusCode'].forEach(element => {

                    var message = element['MessageObject'];

                    alert("date:" + message.postedAt)

                    latestPrivateMessages.innerHTML += '<div class="media-body text-muted pt-3"> <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray"> <strong class="d-block text-gray-dark class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray" ><img src="../images/user-holder.png" class="mr-2 rounded"><span id="' + message.author + '"> <strong>' + message.author + '</strong> <br/></span> <span class="label label-success" style="color:#blue">' + message.content + ' </span> <span class="label label-success" style="color:#blue" style="text-align: right">' + message.postedAt + ' </span></strong></strong> </p></div>';



                });

            }

        },

        error: function(error) {

            console.log(error);

        }

    });

}



/**

*return latest messages for 

*/



function populatePublicMessages() {

    var context = localStorage.context;

    // var data = localStorage.context+","+ localStorage.username+","+localStorage.target;

    var data = {};

    data.author = 'any';

    data.context = 'public';

    data.target = 'public';



    $.ajax({

        type: 'GET',

        contentType: 'application/json',

        data: data,

        url: '/messages/',

        success: function(results) {

            var index = 0;

            console.log("Feedback:" + results);

            var resultsdiv = document.getElementById("NewPublicMessages");



            if (results != null) {



                results['messageAndStatusCode'].forEach(element => {

                    var message = element['MessageObject'];

                    d = new Date(message.postedAt);

                    console.log(d)

                    resultsdiv.innerHTML += ' <div><div class="media-body text-muted pt-3"> <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray"> <strong class="d-block text-gray-dark class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray" ><img src="../images/user-holder.png" class="mr-2 rounded"><span id="' + message.author + '"> <strong>@' + message.author + " | " + element.AuthorStatusCode[index].statusCode + " | " + message.messageType + " |" + weekdays[d.getDay()] + " " + months[d.getMonth()] + " " + d.getDate() + " " + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + '<br/>' + message.content + '</strong> <br/></span> <span> </span> <span style="text-align: right"></span></strong></strong> </p></div></div>';

                    console.log("message", message.author, message.content, message.postedAt);



                    //console.log(messageObject)

                });

                /*results.forEach(function(message) {

                resultsdiv.innerHTML += ' <div class="media-body text-muted pt-3"> <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray"> <strong class="d-block text-gray-dark class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray" ><img src="../images/user-holder.png" class="mr-2 rounded"><span id="' + message.author + '"> <strong>' + message.author + '</strong> <br/></span> <span class="label label-success" style="color:#blue">' + message.content + ' </span> <span class="label label-success" style="color:#blue" style="text-align: right">' + message.postedAt + ' </span></strong></strong> </p></div>';

                console.log("message", message.author, message.content, message.postedAt);

                })*/

            }

        },

        error: function(error) {

            console.log(error);

        }

    });

}



/*Display search information

/*returns search paramenters

/* based on passed keyword*/



function Onsearch() {

    var data = {};

    $('#results').show();

    $('.container').hide();

    $('.jumbotron').hide();



    var status = document.getElementById('status');

    var username = document.getElementById('username')

    var searchTerm = $('#searchTerm').val();

    var public_messages = document.getElementById('public_messages');

    var private_messages = document.getElementById('private_messages');

    var announcements = document.getElementById('announcements');

    var resultsdiv = document.getElementById('results');





    if (username.checked == true || status.checked == true || private_messages.checked == true || public_messages.checked == true || announcements.checked == true) {

        data.keyWordType = $("input[type='radio'][name='check']:checked").val();

        data.target = localStorage.username;

        data.username = localStorage.username;

        data.keyWord = searchTerm;



        if (data.keyWordType == 'public') {

            data.context = 'messages';



        } else if (data.keyWordType == 'private') {

            data.context = 'messages';

            data.target = localStorage.username;

        } else if (data.keyWordType == 'announcements') {

            data.context = 'announcement';

        } else {

            if (data.keyWordType == 'status') { data.keyWord = searchTerm.toUpperCase(); }

            data.context = 'citizens';



        }



        localStorage.searchContext = data.context;

        $.ajax({

            type: 'GET',

            contentType: 'application/json',

            data: data,

            url: '/information/',

            success: function(MessageObject) {

                var index = 0;

                var resultsdiv = document.getElementById("results");



                if (MessageObject == '') {



                    alert("There is result matching your search for " + data.context + " about " + data.keyWord)

                    resultsdiv.innerHTML += '<p class="media-bodyannouncement pb-3 mb-0 small lh-125 border-bottom border-gray"> <strong class="d-block text-gray-dark class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray" ><img src="../images/user-holder.png" class="mr-2 rounded"><span>No result found</span><br/></p>';



                } else {



                    if (MessageObject['messageAndStatusCode'] == '') {

                        alert("There is result matching your search for " + data.context + " about " + data.keyWord)



                    } else {



                        if (localStorage.searchContext == 'messages') {

                            resultsdiv.innerHTML == "";

                            MessageObject['messageAndStatusCode'].forEach(element => {

                                console.log(element.AuthorStatusCode[index].statusCode)

                                console.log(element.MessageObject.content)

                                resultsdiv.innerHTML += '<p class="media-bodyannouncement pb-3 mb-0 small lh-125 border-bottom border-gray"> <strong class="d-block text-gray-dark class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray" ><img src="../images/user-holder.png" class="mr-2 rounded"><span id="' + ['author'] + '">Author: ' + element.MessageObject.author + " " + element.AuthorStatusCode[index].statusCode + '</span></strong><br/><span class="label label-success"> Messages : ' + element.MessageObject.content + '</span><br/></p>';

                            });

                        } else if (localStorage.searchContext == 'announcement') {

                            resultsdiv.innerHTML == "";

                            MessageObject['announcementData'].forEach(element => {

                                resultsdiv.innerHTML += '<p class="media-bodyannouncement pb-3 mb-0 small lh-125 border-bottom border-gray"> <strong class="d-block text-gray-dark class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray" ><img src="../images/user-holder.png" class="mr-2 rounded"><span id="' + ['author'] + '">Author: ' + element.AnnouncementObject.author + "<br/> Title:" + element.AnnouncementObject.title + '</span></strong><br/><span class="label label-success"> Messages : ' + element.AnnouncementObject.content + ' ' + element.AnnouncementObject.postedAt + '</span><br/></p>';

                            });



                        } else {



                            resultsdiv.innerHTML == "";

                            for (var i = 0; i < MessageObject.length; i++) {



                                resultsdiv.innerHTML += '<p class="media-bodyannouncement pb-3 mb-0 small lh-125 border-bottom border-gray"> <strong class="d-block text-gray-dark class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray" ><img src="../images/user-holder.png" class="mr-2 rounded"><span id="' + ['author'] + '">Author: ' + MessageObject[i].username + " " + MessageObject[i].lastStatusCode + '</span></strong><br/><span class="label label-success"> Messages : ' + MessageObject[i].onlineStatus + '</span><br/></p>';

                            }

                        }

                    }



                }

            },

            error: function(error) {

                alert("error:" + error)

            }

        });

    } else {

        alert("Please select what section you want to search")

    }

}





/*This function is to be called on page load

Handling more than one funct

*/



function populatePublicMessages() {

    var context = localStorage.context;

    var data = {};

    data.author = 'any';

    data.context = 'public';

    data.target = 'public';



    $.ajax({

        type: 'GET',

        contentType: 'application/json',

        data: data,

        url: '/messages/',

        success: function(results) {

            var index = 0;



            var resultsdiv = document.getElementById("NewPublicMessages");



            if (results != null) {



                results['messageAndStatusCode'].forEach(element => {

                    var message = element.MessageObject;

                    d = new Date(message.postedAt);

                    resultsdiv.innerHTML += ' <div class="media-body text-muted pt-3"> <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray"> <p class="d-block text-gray-dark class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray" ><img src="../images/user-holder.png" class="mr-2 rounded"><span id="' + message.author + '">@' + message.author + " | " + results.messageAndStatusCode[4].AuthorStatusCode[0].statusCode + " | " + message.messageType + " |" + weekdays[d.getDay()] + " " + months[d.getMonth()] + " " + d.getDate() + " " + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + '<br/>' + message.content + ' <br/></span> <span class="label label-success" style="color:#blue"> </span> <span class="label label-success" style="color:#blue" style="text-align: right"></span></strong></strong> </p></div>';

                    index++;



                });

            }

        },

        error: function(error) {

            console.log(error);

        }

    });

}



/*Display search information

/*returns search paramenters

/* based on passed keyword*/



function Onsearch() {

    var data = {};

    $('#results').show();

    $('.container').hide();

    $('.jumbotron').hide();







    var status = document.getElementById('status');

    var username = document.getElementById('username')

    var searchTerm = $('#searchTerm').val();

    var public_messages = document.getElementById('public_messages');

    var private_messages = document.getElementById('private_messages');

    var announcements = document.getElementById('announcements');

    var resultsdiv = document.getElementById('results');

    var routeUrl = '';

    resultsdiv.innerHTML = '';





    if (username.checked == true || status.checked == true || private_messages.checked == true || public_messages.checked == true || announcements.checked == true) {

        data.keyWordType = $("input[type='radio'][name='check']:checked").val();

        data.target = localStorage.username;

        data.username = localStorage.username;

        data.keyWord = searchTerm;



        if (data.keyWordType == 'public') {

            data.context = 'messages';

            routeUrl = '/search/publicMessages';



        } else if (data.keyWordType == 'private') {

            data.context = 'messages';

            data.target = localStorage.username;

            routeUrl = '/search/privateMessages';





        } else if (data.keyWordType == 'announcements') {

            data.context = 'announcement';

            routeUrl = '/search/announcements';

        } else {

            if (data.keyWordType == 'status') { data.keyWord = searchTerm.toUpperCase(); }

            data.context = 'citizens';

            routeUrl = '/search/citizens';



        }



        localStorage.searchContext = data.context;

        $.ajax({

            type: 'GET',

            contentType: 'application/json',

            data: data,

            url: routeUrl,

            success: function(MessageObject) {

                var index = 0;





                if (MessageObject == '') {



                    alert("There is result matching your search for " + data.context + " about " + data.keyWord)

                    resultsdiv.innerHTML += '<p class="media-bodyannouncement pb-3 mb-0 small lh-125 border-bottom border-gray"> <strong class="d-block text-gray-dark class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray" ><img src="../images/user-holder.png" class="mr-2 rounded"><span>No result found</span><br/></p>';



                } else {



                    if (MessageObject['messageAndStatusCode'] == '') {

                        alert("There is result matching your search for " + data.context + " about " + data.keyWord)



                    } else {



                        if (localStorage.searchContext == 'messages') {

                            resultsdiv.innerHTML == "";

                            MessageObject['messageAndStatusCode'].forEach(element => {

                                console.log(element.AuthorStatusCode[index].statusCode)

                                console.log(element.MessageObject.content)

                                resultsdiv.innerHTML += '<p class="media-bodyannouncement pb-3 mb-0 small lh-125 border-bottom border-gray"> <strong class="d-block text-gray-dark class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray" ><img src="../images/user-holder.png" class="mr-2 rounded"><span id="' + ['author'] + '">Author: ' + element.MessageObject.author + " " + element.AuthorStatusCode[index].statusCode + '</span></strong><br/><span class="label label-success"> Messages : ' + element.MessageObject.content + '</span><br/></p>';

                            });

                        } else if (localStorage.searchContext == 'announcement') {

                            resultsdiv.innerHTML == "";

                            MessageObject['announcementData'].forEach(element => {

                                resultsdiv.innerHTML += '<p class="media-bodyannouncement pb-3 mb-0 small lh-125 border-bottom border-gray"> <strong class="d-block text-gray-dark class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray" ><img src="../images/user-holder.png" class="mr-2 rounded"><span id="' + ['author'] + '">Author: ' + element.AnnouncementObject.author + "<br/> Title:" + element.AnnouncementObject.title + '</span></strong><br/><span class="label label-success"> Messages : ' + element.AnnouncementObject.content + ' ' + element.AnnouncementObject.postedAt + '</span><br/></p>';

                            });



                        } else {



                            resultsdiv.innerHTML == "";

                            for (var i = 0; i < MessageObject.length; i++) {



                                resultsdiv.innerHTML += '<p class="media-bodyannouncement pb-3 mb-0 small lh-125 border-bottom border-gray"> <strong class="d-block text-gray-dark class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray" ><img src="../images/user-holder.png" class="mr-2 rounded"><span id="' + ['author'] + '">Author: ' + MessageObject[i].username + " " + MessageObject[i].lastStatusCode + '</span></strong><br/><span class="label label-success"> Messages : ' + MessageObject[i].onlineStatus + '</span><br/></p>';

                            }

                        }

                    }



                }

            },

            error: function(error) {

                alert("error:" + error)

            }

        });

    } else {

        alert("Please select what section you want to search")

    }

}





/*This function is to be called on page load

Handling more than one funct

*/



function notifyFriend() {

    jsondata.username = localStorage.username;

    jsondata.friend = localStorage.friend;

    jsondata.status = "pending friend";

    jsondata.friendstatus = "pending";

    jsondata.groupstatus = "disabled";

    jsondata.group = "Group_" + localStorage.username;



    $.ajax({

        type: 'POST',

        data: JSON.stringify(jsondata),

        contentType: 'application/json',

        url: '/friends',

        success: function(response) {



            if (response == "200") {

                alert("You have invited:" + jsondata.friend + " for friendship");

                citizenFriendReport(localStorage.username)

                window.location.href = "/invitingfriendpage";

            } else {

                alert("The invitation has not been done successfully try again:" + response);

            }





        },

        error: function(error) {

            alert("Alert:" + error);

        }

    });









}











function DenyFriend(j, friendownerstatus) {





    var listUsers = JSON.parse(localStorage.getItem('users'));

    for (var i = 0; i < listUsers.length; i++) {

        if (i == j) {

            localStorage.friend = listUsers[i].username;

            if (friendownerstatus) {

                localStorage.owner = listUsers[i].username;

                localStorage.joiner = localStorage.username;

            } else {

                localStorage.owner = localStorage.username;

                localStorage.joiner = listUsers[i].username;



            }





            alert("Deny Friend:" + localStorage.friend + " who is the owner friend? " + friendownerstatus)

            notififyDenyFriend();

        }

    }



    alert("Deny Friend " + status);

}



function ApproveFriend(j, friendownerstatus) {



    var listUsers = JSON.parse(localStorage.getItem('users'));

    for (var i = 0; i < listUsers.length; i++) {

        if (i == j) {

            localStorage.friend = listUsers[i].username;

            if (friendownerstatus) {

                localStorage.owner = listUsers[i].username;

                localStorage.joiner = localStorage.username;

            } else {

                localStorage.owner = localStorage.username;

                localStorage.joiner = listUsers[i].username;



            }



            alert("Approve Friend:" + localStorage.friend + " who is the owner friend? " + friendownerstatus)

            notififyApproveFriend();

        }

        alert("Approve Friend " + status);

    }

}



function showApprovalCOnfirmation() {



}



function ApproveGroup(j, friendownerstatus) {



    var listUsers = JSON.parse(localStorage.getItem('users'));

    for (var i = 0; i < listUsers.length; i++) {

        if (i == j) {

            localStorage.friend = listUsers[i].username;

            if (friendownerstatus) {

                localStorage.owner = listUsers[i].username;

                localStorage.joiner = localStorage.username;

            } else {

                localStorage.owner = localStorage.username;

                localStorage.joiner = listUsers[i].username;



            }



            alert("Approve Friend to join your group:" + localStorage.friend + " who is the owner friend? " + friendownerstatus)

            notififyApproveFriendInGroup();

        }



    }

}



function DenyGroup(j, friendownerstatus) {



    var listUsers = JSON.parse(localStorage.getItem('users'));

    for (var i = 0; i < listUsers.length; i++) {

        if (i == j) {

            localStorage.friend = listUsers[i].username;

            if (friendownerstatus) {

                localStorage.owner = listUsers[i].username;

                localStorage.joiner = localStorage.username;

            } else {

                localStorage.owner = localStorage.username;

                localStorage.joiner = listUsers[i].username;



            }



            alert("Deny Friend to join your group:" + localStorage.friend + " who is the owner friend? " + friendownerstatus)

            notififyDenyFriendInGroup();

        }



    }

}



function updatestatusingroup(j, friendownerstatus) {



    var listUsers = JSON.parse(localStorage.getItem('users'));



    for (var i = 0; i < listUsers.length; i++) {

        if (i == j) {

            localStorage.friend = listUsers[i].username;

            if (friendownerstatus) {

                localStorage.owner = listUsers[i].username;

                localStorage.joiner = localStorage.username;

            } else {

                localStorage.owner = localStorage.username;

                localStorage.joiner = listUsers[i].username;

            }

            alert("Request to join your group :" + localStorage.friend + " who is the owner friend? " + friendownerstatus)

            notififyJoinInGroup();



        }



    }

    alert("update other " + status);

}





function notififyDenyFriend() {



    jsondata.username = localStorage.username;

    jsondata.friend = localStorage.friend;

    jsondata.status = "denied friend";

    jsondata.friendstatus = "denied";

    jsondata.groupstatus = "disabled";

    jsondata.group = "Group_" + localStorage.username;

    jsondata.joiner = localStorage.joiner;

    jsondata.owner = localStorage.owner;

    $.ajax({

        type: 'POST',

        data: JSON.stringify(jsondata),

        contentType: 'application/json',

        url: '/friends',

        success: function(response) {



            if (response == "200") {

                alert("You Denied:" + jsondata.friend + " for friendship");

                citizenFriendReport(localStorage.username)

                window.location.href = "/invitingfriendpage";

            } else {

                alert("The invitation has not been done successfully try again:" + response);

            }

        },

        error: function(error) {

            alert("Alert:" + error);

        }

    });





}



function notififyApproveFriend() {



    jsondata.username = localStorage.username;

    jsondata.friend = localStorage.friend;

    jsondata.status = "friend";

    jsondata.friendstatus = "approved";

    jsondata.groupstatus = "enabled";

    jsondata.group = "Group_" + localStorage.username;

    jsondata.joiner = localStorage.joiner;

    jsondata.owner = localStorage.owner;





    $.ajax({

        type: 'POST',

        data: JSON.stringify(jsondata),

        contentType: 'application/json',

        url: '/friends',

        success: function(response) {



            if (response == "200") {

                alert("You Approved :" + jsondata.friend + " for friendship");

                citizenFriendReport(localStorage.username)

                window.location.href = "/invitingfriendpage";

            } else {

                alert("The invitation has not been done successfully try again:" + response);

                window.location.href = "/invitingfriendpage";

            }

        },

        error: function(error) {

            alert("Alert:" + error);

        }

    });

}



function notififyApproveFriendInGroup() {

    jsondata.username = localStorage.username;

    jsondata.friend = localStorage.friend;

    jsondata.status = "grouped";

    jsondata.friendstatus = "approved";

    jsondata.groupstatus = "approved";

    jsondata.group = "Group_" + localStorage.username;

    jsondata.joiner = localStorage.joiner;

    jsondata.owner = localStorage.owner;

    $.ajax({

        type: 'POST',

        data: JSON.stringify(jsondata),

        contentType: 'application/json',

        url: '/friends',

        success: function(response) {



            if (response == "200") {

                alert("You Approved :" + jsondata.friend + " for friendship");

                citizenFriendReport(localStorage.username)

                window.location.href = "/invitingfriendpage";

            } else {

                alert("The invitation has not been done successfully try again:" + response);

                window.location.href = "/invitingfriendpage";

            }

        },

        error: function(error) {

            alert("Alert:" + error);

        }

    });



}





function notififyDenyFriendInGroup() {

    jsondata.username = localStorage.username;

    jsondata.friend = localStorage.friend;

    jsondata.status = "friend";

    jsondata.friendstatus = "approved";

    jsondata.groupstatus = "denied";

    jsondata.group = "Group_" + localStorage.username;

    jsondata.joiner = localStorage.joiner;

    jsondata.owner = localStorage.owner;

    $.ajax({

        type: 'POST',

        data: JSON.stringify(jsondata),

        contentType: 'application/json',

        url: '/friends',

        success: function(response) {



            if (response == "200") {

                alert("You Denied User to be part of your group:" + jsondata.friend + " for friendship");

                citizenFriendReport(localStorage.username)

                window.location.href = "/invitingfriendpage";

            } else {

                alert("The invitation has not been done successfully try again:" + response);

                window.location.href = "/invitingfriendpage";

            }

        },

        error: function(error) {

            alert("Alert:" + error);

        }

    });

}



function notififyJoinInGroup() {



    jsondata.username = localStorage.username;

    jsondata.friend = localStorage.friend;

    jsondata.status = "friend";

    jsondata.friendstatus = "approved";

    jsondata.groupstatus = "pending";

    jsondata.group = "Group_" + localStorage.username;

    jsondata.joiner = localStorage.joiner;

    jsondata.owner = localStorage.owner;

    $.ajax({

        type: 'POST',

        data: JSON.stringify(jsondata),

        contentType: 'application/json',

        url: '/friends',

        success: function(response) {



            if (response == "200") {

                alert("You requested for joing your group :" + jsondata.friend + " for friendship");

                citizenFriendReport(localStorage.username)

                window.location.href = "/invitingfriendpage";

            } else {

                alert("The invitation has not been done successfully try again:" + response);

                window.location.href = "/invitingfriendpage";

            }

        },

        error: function(error) {

            alert("Alert:" + error);

        }

    });

};





function populatescrumbstatus() {





    $.ajax({

        type: 'GET',

        contentType: 'application/json',

        url: '/statuscrumb',

        success: function(response) {



            if (response == "404") {

                alert("unable to retrieve data for scrum :" + response);



            } else {

                var myfriends = JSON.parse(localStorage.getItem('friendrepo'));

                var results = document.getElementById("notificationwall");



                for (var g = 0; g < response.length; g++) {

                    if (response[g].statusCode == "Emergency") {

                        for (var t = 0; t < myfriends.length; t++) {



                            if (myfriends[t].ownerUser == response[g].username || myfriends[t].joinUser == response[g].username) {

                                if (myfriends[t].status == "grouped") {

                                    results.innerHTML += '<div class = "my-3 p-3 bg-white rounded box-shadow"style = "height: 150px; border-width: 2px" > <div class = "container"style = "height: 50px;" ><p ><b > @:' + response[g].username + " | " + response[g].statusCode + " :" + response[g].statusChangeReason + '</p ><span class = "time-right" >' + " Posted at :" + new Date(response[g].createdAt) + ' <br/><a href="groupfriendemergencymessagepage" ><u>Messages</u> </a>&nbsp;&nbsp;&nbsp;&nbsp <a href="userlocationpage"><u>Map</u> </a> </div> </div>'

                                }





                            }





                        }



                    }



                }

            }

        },

        error: function(error) {

            alert("Alert:" + error);

        }

    });

}



function populateGroupEmergencyMessage() {



    var context = localStorage.context;



    var data = {};

    data.author = 'any';

    data.context = 'public';

    data.target = 'public';



    $.ajax({

        type: 'GET',

        contentType: 'application/json',

        data: data,

        url: '/messages/',

        success: function(results) {

            var index = 0;

            console.log("Feedback:" + results);

            var resultsdiv = document.getElementById("emergencymessagewall");

            var myfriends = JSON.parse(localStorage.getItem('friendrepo'));

            if (results != null) {



                results['messageAndStatusCode'].forEach(element => {

                    var message = element['MessageObject'];

                    d = new Date(message.postedAt);

                    console.log(d)

                    console.log(element.AuthorStatusCode[index].statusCode)

                    if (element.AuthorStatusCode[index].statusCode == "Emergency") {



                        for (var k = 0; k < myfriends.length; k++) {

                            if (myfriends[k].ownerUser == message.author || myfriends[k].joinUser == message.author) {

                                resultsdiv.innerHTML += '<div class = "my-3 p-3 bg-white rounded box-shadow"style = "height: 150px; border-width: 2px" > <div class = "container"style = "height: 50px;" ><p ><span id="' + message.author + '"> <strong>@' + message.author + " | " + element.AuthorStatusCode[index].statusCode + " | " + message.messageType + " |" + weekdays[d.getDay()] + " " + months[d.getMonth()] + " " + d.getDate() + " " + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + '<br/>' + message.content + '</strong> <br/></span></p ><span class = "time-right" ><a href="groupchatpage" ><u>Check chats</u> </a>&nbsp;&nbsp;&nbsp;&nbsp <a href="userlocationpage"><u>Map</u></a> </div> </div>'

                                console.log("message", message.author, message.content, message.postedAt);

                            }



                        }



                    }



                });

            }

        },

        error: function(error) {

            console.log(error);

        }

    });

}



function populateGroupMessages() {

    citizenFriendReport(localStorage.username);



    var resultsdiv = document.getElementById("NewGroupMessages");

    var context = localStorage.context;



    var data = {};

    data.author = 'any';

    data.context = 'public';

    data.target = 'group';



    $.ajax({

        type: 'GET',

        contentType: 'application/json',

        data: data,

        url: '/messages/',

        success: function(results) {

            alert("My group message")

            var index = 0;



            console.log("Feedback:" + results.length);





            var myfriends = JSON.parse(localStorage.getItem('friendrepo'));

            if (results != null) {



                results['messageAndStatusCode'].forEach(element => {

                    var message = element['MessageObject'];

                    d = new Date(message.postedAt);

                    console.log("Date", d)





                    for (var k = 0; k < myfriends.length; k++) {

                        if (myfriends[k].ownerUser == message.author || myfriends[k].joinUser == message.author) {

                            resultsdiv.innerHTML += ' <div class="media-body text-muted pt-3"> <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray"> <strong class="d-block text-gray-dark class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray" ><img src="../images/user-holder.png" class="mr-2 rounded"><span id="' + message.author + '"> <strong>@' + message.author + " | " + element.AuthorStatusCode[index].statusCode + " | " + message.messageType + " |" + weekdays[d.getDay()] + " " + months[d.getMonth()] + " " + d.getDate() + " " + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + '<br/>' + message.content + '</strong> <br/></span> <span class="label label-success" style="color:#blue"> </span> <span class="label label-success" style="color:#blue" style="text-align: right"></span></strong></strong> </p></div>';

                            console.log("message", message.author, message.content, message.postedAt);

                        }



                    }



                });

                for (var u = 0; u < myfriends.lenght; u++) {

                    alert("wow:" + "message", myfriends[u].joinUser, myfriends[u].ownerUser)





                }



            } else {

                alert("No sms")

            }

        },

        error: function(error) {

            alert("Error:" + error);

            console.log(error);

        }

    });

}



/**

*return latest announcements from API and load them into interface

*/

function loademergencyhitwords() {



    $.ajax({

        type: 'GET',

        contentType: 'application/json',

        url: '/hitwordmessages/',

        success: function(message) {

            populateEmergencyMessages(message)



        },

        error: function(error) {

            console.log(error)

        }

    });

}