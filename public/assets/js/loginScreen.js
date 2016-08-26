$('#signInBtn').on('click', function(e) {
    e.preventDefault();
    var myData = {}
    myData.username = $("#emailLogin").val()
    myData.password = $("#passwordLogin").val()
    console.log(myData);
    $.post('/signin', myData)
})