const app = firebase.initializeApp(firebaseConfig);
let logoutBtn = document.getElementById('logoutBtn');
const db = firebase.firestore()
const auth = firebase.auth()
const input = document.getElementById('text')
const main = document.querySelector('main')
const notMessage = document.getElementById('notMessage')
const chatId = 'nnEkC5cCIorNTijbvmUU'



auth.onAuthStateChanged((user) => {
    if (!user) {
        window.location.href = 'index.html'
    }
})

db.collection('chats').doc(chatId).onSnapshot((doc) => {
    if (doc.exists) {
        let data = doc.data().mensagens
        getData(data)
        main.scrollTo(0, main.scrollHeight + 1000);
    }
})

async function getData(data) {
    if (data.length == 0) {
        notMessage.style.display = 'flex'
    }
    if (data.length != 0) {
        main.innerHTML = ''
        const array = data
        const uid = firebase.auth().currentUser.uid
        for (let item of array) {
            const { mensagem, userId, photoURL } = item
            const div = document.createElement('div')
            div.classList.add('message-box')
            let img = userId == uid ? div.classList.add('send-message') : ''
            div.innerHTML = `
        <img src="${photoURL}">
              <div class="text-message">
                <p>${mensagem}</p>
                </div>
                `
            main.appendChild(div)
        }
    }

}

async function addChat() {
    let newChat = await db.collection('chats').add({
        mensagens: []
    });

}

async function sendMessage() {
    if (input.value != '') {
        let date = new Date().toLocaleString()
        let message = input.value
        auth.onAuthStateChanged(user => {

            const { uid, photoURL } = user

            db.collection('chats').doc(chatId).update({
                mensagens: firebase.firestore.FieldValue.arrayUnion({
                    mensagem: message,
                    created: date,
                    userId: uid,
                    photoURL
                })
            })
        });
        input.value = ''
    }
}

logoutBtn.addEventListener('click', function () {
    firebase.auth().signOut()
        .then(function () {
            console.log("Usuário desconectado com sucesso.");
            window.location.href = "index.html"
        })
        .catch(function (error) {
            console.error("Erro ao desconectar o usuário:", error);
        });
});
