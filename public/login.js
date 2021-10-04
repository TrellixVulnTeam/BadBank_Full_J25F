
import firebase, { auth, Google, signInWithPopup, db, firestore } from "./firebase.js";
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCzLdWJEq0vOWSjfVA3C5OQxX--HO3kJmI",
    authDomain: "badbank-bb18b.firebaseapp.com",
    projectId: "badbank-bb18b",
    storageBucket: "badbank-bb18b.appspot.com",
    messagingSenderId: "745789819925",
    appId: "1:745789819925:web:8ae5823019b3ac9692d21c",
};

const ref = db.ref('badbank-bb18b/users/bbUsers');
  
function Login(){
  console.log('login fired');
  return (
    <>
      <h1 id='loggedInStatus'>You are not yet logged in</h1>
      <input id='email' type='email' placeholder='Email' />
      <br />
      <input id='password' type='password' placeholder='Password' />
      <br />
      <br />
      <button id="createAccount" onClick={() => {
            const loggedInStatus = document.getElementById("loggedInStatus");
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(function(result) {
                  const usersRef = ref.child('users');
                  usersRef.child('users').push({
                    email: email,
                    password: password
                  });
                })
                .catch(function(error) {
                  var errorCode = error.code;
                  var errorMessage = error.message;
                  if (errorCode == 'auth/weak-password') {
                    alert('The password is too weak.');
                  } else {
                    alert(errorMessage);
                  }
                  console.log(error);
                });
                
                } }>Create Account</button>
      <button id='logout' style={{ display: "none" }} onClick={()=> {
            firebase.auth().signOut();
            const loggedInStatus = document.getElementById("loggedInStatus");
            loggedInStatus.innerText = `You have logged out.`;
            const createAccount = document.getElementById("createAccount");
            createAccount.style.display = "inline";
            login.style.display = "inline";
            logout.style.display = "none";
            }}>Logout</button>
      <button id="login" onClick={() => {
            firebase.auth();
            const loggedInStatus = document.getElementById("loggedInStatus");
            const createAccount = document.getElementById("createAccount");
            const googlelogin = document.getElementById("googlelogin");

            const email = document.getElementById("email").value;;
            const password = document.getElementById("password").value;;

            const promise = firebase.auth().signInWithEmailAndPassword(email, password);
            promise.catch((e) => console.log(e.message));
            loggedInStatus.innerText = `You are logged in.`;
            logout.style.display = "inline";
            createAccount.style.display = "none";
            login.style.display = "none";
            googlelogin.style.display = "none";
      }}>Login</button>
      <button id="googlelogin" onClick={()=>{
           console.log("google clicked");
           const provider = new firebase.auth.GoogleAuthProvider();
           firebase.auth();
           firebase.auth().signInWithPopup(provider).then(function () {
             
              const loggedInStatus = document.getElementById("loggedInStatus");
              const login = document.getElementById("login");
              const logout = document.getElementById("logout");
              const email = document.getElementById("email");
              const password = document.getElementById("password");
              const googlelogin = document.getElementById("googlelogin");
              const createAccount = document.getElementById("createAccount");
               loggedInStatus.innerText = `You are logged in.`;
               login.style.display = "none";
               createAccount.style.display = "none";
               logout.style.display = "inline";
               signup.style.display = "none";
               email.style.display = "none";
               password.style.display = "none";
               googlelogin.style.display = "none";
               logout.style.display = "none";
             })
             .catch(function (error) {
               console.log(error.code);
               console.log(error.message);
             })
             
      }}>Google Login</button>
    </>
  );
}

export default Login;