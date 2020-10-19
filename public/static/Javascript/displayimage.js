    document.getElementById("pull").onclick = function() {
        templateName1 = document.getElementById('namebox1').value;
        firebase.database().ref('Template/' + templateName1).on('value', function(snapshot) {
            document.getElementById('display').src = snapshot.val().Link;
        });
    }

