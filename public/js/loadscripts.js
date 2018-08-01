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
            success: function (MessageObject) {
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
                                resultsdiv.innerHTML += '<p class="media-bodyannouncement pb-3 mb-0 small lh-125 border-bottom border-gray"> <strong class="d-block text-gray-dark class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray" ><img src="../images/user-holder.png" class="mr-2 rounded"><span id="' + ['author'] + '">Author:   ' + element.MessageObject.author + " " + element.AuthorStatusCode[index].statusCode + '</span></strong><br/><span class="label label-success"> Messages :  ' + element.MessageObject.content + '</span><br/></p>';
                            });
                        } else if (localStorage.searchContext == 'announcement') {
                            resultsdiv.innerHTML == "";
                            MessageObject['announcementData'].forEach(element => {
                                resultsdiv.innerHTML += '<p class="media-bodyannouncement pb-3 mb-0 small lh-125 border-bottom border-gray"> <strong class="d-block text-gray-dark class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray" ><img src="../images/user-holder.png" class="mr-2 rounded"><span id="' + ['author'] + '">Author:   ' + element.AnnouncementObject.author + "<br/> Title:" + element.AnnouncementObject.title + '</span></strong><br/><span class="label label-success"> Messages :  ' + element.AnnouncementObject.content + ' ' + element.AnnouncementObject.postedAt + '</span><br/></p>';
                            });
                        } else {

                            resultsdiv.innerHTML == "";
                            for (var i = 0; i < MessageObject.length; i++) {
                                resultsdiv.innerHTML += '<p class="media-bodyannouncement pb-3 mb-0 small lh-125 border-bottom border-gray"> <strong class="d-block text-gray-dark class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray" ><img src="../images/user-holder.png" class="mr-2 rounded"><span id="' + ['author'] + '">Author:   ' + MessageObject[i].username + " " + MessageObject[i].lastStatusCode + '</span></strong><br/><span class="label label-success"> Messages :  ' + MessageObject[i].onlineStatus + '</span><br/></p>';
                            }
                        }
                    }
                }
            },
            error: function (error) {
                alert("error:" + error)
            }
        });
    } else {
        alert("Please select what section you want to search")
    }
}

function populatescrumbstatus() {

    $.ajax({
        type: 'GET',
        contentType: 'application/json',
        url: '/statuscrumb',
        success: function (response) {

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
                                    results.innerHTML += '<div class = "my-3 p-3 bg-white rounded box-shadow"style = "height: 150px; border-width: 2px" > <div class = "container"style = "height: 50px;" ><p ><b > @:' + response[g].username + "     | " + response[g].statusCode + " :" + response[g].statusChangeReason + '</p ><span class = "time-right" >' + " Posted at :" + new Date(response[g].createdAt) + ' <br/><a href="groupfriendemergencymessagepage" ><u>Messages</u> </a>&nbsp;&nbsp;&nbsp;&nbsp <a href="userlocationpage"><u>Map</u> </a> </div> </div>'
                                }
                            }
                        }
                    }
                }
            }
        },
        error: function (error) {
            alert("Alert:" + error);
        }
    });
}