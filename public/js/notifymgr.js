


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
            alert("Deny Friend  to join your group:" + localStorage.friend + " who is the owner friend? " + friendownerstatus)
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
        success: function (response) {
            if (response == "200") {
                alert("You Denied:" + jsondata.friend + " for friendship");
                citizenFriendReport(localStorage.username)
                window.location.href = "/invitingfriendpage";
            } else {
                alert("The invitation has not been done successfully try again:" + response);
            }
        },
        error: function (error) {
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
        success: function (response) {
            if (response == "200") {
                alert("You Approved :" + jsondata.friend + " for friendship");
                citizenFriendReport(localStorage.username)
                window.location.href = "/invitingfriendpage";
            } else {
                alert("The invitation has not been done successfully try again:" + response);
                window.location.href = "/invitingfriendpage";
            }
        },
        error: function (error) {
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
        success: function (response) {
            if (response == "200") {
                alert("You Approved :" + jsondata.friend + " for friendship");
                citizenFriendReport(localStorage.username)
                window.location.href = "/invitingfriendpage";
            } else {
                alert("The invitation has not been done successfully try again:" + response);
                window.location.href = "/invitingfriendpage";
            }
        },
        error: function (error) {
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
        success: function (response) {

            if (response == "200") {
                alert("You Denied User to be part of your group:" + jsondata.friend + " for friendship");
                citizenFriendReport(localStorage.username)
                window.location.href = "/invitingfriendpage";
            } else {
                alert("The invitation has not been done successfully try again:" + response);
                window.location.href = "/invitingfriendpage";
            }
        },
        error: function (error) {
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
        success: function (response) {

            if (response == "200") {
                alert("You requested for joing your group :" + jsondata.friend + " for friendship");
                citizenFriendReport(localStorage.username)
                window.location.href = "/invitingfriendpage";
            } else {
                alert("The invitation has not been done successfully try again:" + response);
                window.location.href = "/invitingfriendpage";
            }
        },
        error: function (error) {
            alert("Alert:" + error);
        }
    });
};

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
        success: function (response) {
            if (response == "200") {
                alert("You have invited:" + jsondata.friend + " for friendship");
                citizenFriendReport(localStorage.username)
                window.location.href = "/invitingfriendpage";
            } else {
                alert("The invitation has not been done successfully try again:" + response);
            }
        },
        error: function (error) {
            alert("Alert:" + error);
        }
    });
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
        success: function (response) {
            localStorage.setItem("friendrepo", JSON.stringify(response));
        }
    });
}