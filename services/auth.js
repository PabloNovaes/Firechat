const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()


firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        window.location.href = 'chat.html'
        console.log(user);
    }
})

let googleSignInBtn = document.getElementById('googleSignInBtn');

googleSignInBtn.addEventListener('click', function () {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
        .then(function (result) {
            let user = result.user;
            if (user) {
                window.location.href = "chat.html"
            }
        })
        .catch(function (error) {
            console.error("Erro de autenticação:", error);
        });
});










