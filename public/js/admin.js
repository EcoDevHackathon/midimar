var data = {}

$('#exampleModal').on('show.bs.modal', function(event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        var recipient = button.data('whatever') // Extract info from data-* attributes

        //var recipient1 = document.getElementById('recipient-name');
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        var modal = $(this)
        modal.find('.modal-title').text('Action:' + recipient)
            //modal.find('#recipient-name').val(recipient)
    }) //
$('#exampleModal1').on('hidden.bs.modal', function(e) {
    alert("end of action");

})
$('#exampleModal2').on('hidden.bs.modal', function(e) {
    alert("End of action");
})
$('#exampleModal3').on('hidden.bs.modal', function(e) {
    alert("end of action");
})
$('#exampleModal4').on('hidden.bs.modal', function(e) {
    alert("end of action");
})

$("#editUsername").click(function() {
    //var username = $(this).find('#username').html();
    alert("traced 1");
    updateUsername($("#exampleModal1 #username").val().trim())
    $('#exampleModal1').modal('hide')
});
$("#editPassword").click(function() {
    alert("Traced 2");
    updatePassword($("#exampleModal2 #password").val().trim())
    $('#exampleModal2').modal('hide')


});

$("#editPrivilege").click(function() {

    alert("Traced 3");
    updatePrivilege($("#exampleModal3 #privilege").val())

    $('#exampleModal3').modal('hide')
});
$("#editStatus").click(function() {
    alert("Traced 4");
    updateStatus($("#exampleModal4 #status").val())
    $('#exampleModal4').modal('hide')

});

function updateUsername(username) {
    alert("username:" + username)
    data.username = localStorage.editusername;
    data.editusername = username;
    data.editpassword = localStorage.editpassword;
    data.choice = "editusername";
    data.editstatus = localStorage.editstatus;
    data.editprivilege = localStorage.editprivilege;
    $.post('/users/', data, function(response) {

    }, 'JSON');

}

function updatePassword(password) {

    data.username = localStorage.editusername;
    data.editusername = localStorage.editusername
    data.editpassword = password;
    data.choice = "editpassword";
    data.editstatus = localStorage.editstatus;
    data.editprivilege = localStorage.editprivilege;
    $.post('/users/', data, function(response) {}, 'JSON');

}

function updatePrivilege(privilege) {
    alert("Update privilege:" + privilege)
        //localStorage.editprivilege
    data.username = localStorage.editusername;
    data.editusername = localStorage.editusername
    data.editpassword = localStorage.editpassword;
    data.choice = "editprivilege";
    data.editstatus = localStorage.editstatus;
    data.editprivilege = privilege;

    $.post('/users/', data, function(response) {

    }, 'JSON');
}

function updateStatus(status) {
    data.username = localStorage.editusername;
    data.editusername = localStorage.editusername
    data.editpassword = localStorage.editpassword;
    data.choice = "editstatus";
    data.editstatus = status;
    data.editprivilege = localStorage.editprivilege;

    $.post('/users/', data, function(response) {

    }, 'JSON');
}