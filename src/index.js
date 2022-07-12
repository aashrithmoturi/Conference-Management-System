// import firebase from 'firebase/app'  -> older versions
import { initializeApp, registerVersion } from 'firebase/app'

import {
    getFirestore, collection, onSnapshot,  //getDocs this is used for the commented code in the below
    addDoc, deleteDoc, doc,
    query, where, 
    orderBy, serverTimestamp,
    getDoc, updateDoc, DocumentReference, getDocs
} from 'firebase/firestore'

import{
  getAuth,
  createUserWithEmailAndPassword,
  signOut, signInWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyDmKztFVmh_NAQx_50sewAPWFq12ywnDiI",
    authDomain: "fir-9-dojo-1cfb8.firebaseapp.com",
    projectId: "fir-9-dojo-1cfb8",
    storageBucket: "fir-9-dojo-1cfb8.appspot.com",
    messagingSenderId: "996528958987",
    appId: "1:996528958987:web:3466a1914499fd6080610e"
  };

  var userName;
//   init firebase app
  initializeApp(firebaseConfig)


//   init services
  const db = getFirestore(); //database connection
  const auth = getAuth();


//   collection ref
  const colRef1 = collection(db, 'events')
  const colRef2 = collection(db, 'user')


//    queries
  // const q = query(colRef, where("author", "==", "ash"), orderBy('title', 'asc'))
  const q = query(colRef1, orderBy('createdAt'))

//   get collection data
  // getDocs(colRef)
  //   .then((snapshot) => {
  //       // console.log(snapshot.docs)
  //       let books = []
  //       snapshot.docs.forEach((doc) => {
  //           books.push({ ...doc.data(), id:doc.id})
  //       })
  //       console.log(books)
  //   })
  //   .catch(err => {
  //       console.log(err.message)
  //   })


    //here we donot have a "then" as previous
    // also we use queries as arguments for the sake of queries
    //we use colRef if we want the whole collection.
    onSnapshot(q, (snapshot) => {
      let books = []
      snapshot.docs.forEach((doc) => {
          books.push({ ...doc.data(), id:doc.id})
      })
      console.log(books)
    })
      

    //adding documents
    var val = 42;
// const createboo = document.querySelector('.createboo')
const createEvent = document.querySelector('.createEvent');
if(createEvent){
  createEvent.addEventListener('submit', (e) => {
        val++
        e.preventDefault();
        //when we submit a form it by default refreshes the page but we dont want that
        //so, we used preventDefault()
        // console.log("1");

        addDoc(colRef1, {
          host: createEvent.host.value,
          starttime: createEvent.starttime.value,
          endtime: createEvent.endtime.value,
          date: createEvent.date.value,
          meetlink: createEvent.meetlink.value,
          eventtype: createEvent.eventtype.value,
          eid: val,
          createdAt:  serverTimestamp()
        })
        
        .then(() => {
          createEvent.reset();
        })
  })
}     

    //deleting documents
    const deleteboo = document.querySelector('.deleteboo')
    if(deleteboo){
      deleteboo.addEventListener('click', handledelete)
    }

    

    function handledelete(e){
      e.preventDefault();

      const deleteBook = document.querySelector('.delete')
      //when we submit a form it by default refreshes the page but we dont want that
      //so, we used preventDefault()

      const docRef = doc(db, 'books', deleteBook.id.value)

      deleteDoc(docRef)
        .then(() => {
          deleteBook.reset();
        })
    }



    // get a single document
    const docRef = doc(db, 'books', 'WuXv5lUS9cUEdx1kzl5d')
    
    // getDoc(docRef)
    //   .then((doc) => {
    //     console.log(doc.data(), doc.id)
    //   })

    onSnapshot(docRef, (doc)=>{
      console.log(doc.data(), doc.id)
    })




    //update the element
const updateboo = document.querySelector('.updateboo')
if(updateboo){
  updateboo.addEventListener('click', handleupdate)
}

    
    function handleupdate(e){
      e.preventDefault()
      const updateForm = document.querySelector('.update')
      const docref = doc(db, 'books', updateForm.id.value)
      updateDoc(docRef, {
        title: 'updated title'
      })
      .then(()=>{
        updateForm.reset()
      })      
    }

    //signup for the users
    const signupboo = document.querySelector('.signupboo')
    // const arri = []
    if(signupboo){
      signupboo.addEventListener('click', handlesignup)
    }
    
    function handlesignup(e){
      e.preventDefault()
      // console.log("in");
      const signup = document.querySelector('.signup')
      const Email = signup.email.value;
      const Password = signup.password.value;
      const Name = signup.name.value;
      const Username = signup.username.value;

      createUserWithEmailAndPassword(auth, Email, Password)
        .then((cred) =>{
          // console.log("hello");
            // console.log('User Created', cred.user);

            
              addDoc(colRef2, {
                //   host: createEvent.host.value,
                // starttime: createEvent.starttime.value,
                // endtime: createEvent.endtime.value,
                // date: createEvent.date.value,
                // meetlink: createEvent.meetlink.value,
                // eventtype: createEvent.eventtype.value,
                // eid: val,
      
                  
                  emailId: Email,
                  password: Password,
                  // registered: arri
                  username: Username,
                  name : Name
                  
              })

              // window.location.replace("../dist/index.html");
              alert("account created successfully.");
              signup.reset();
            
        })
        .catch((err) => {
          alert(err.message);
        })
    }


    //login for already registered users
    const loginboo = document.querySelector('.loginboo')
    if(loginboo){
      loginboo.addEventListener('click', handlelogin)
    }

    
    function handlelogin(e){
      e.preventDefault()
      const login = document.querySelector('.login')

      const email = login.email.value
      userName = email;
      const password = login.password.value
      signInWithEmailAndPassword(auth, email, password)  
      .then((cred)=>{
        window.location.replace("../dist/index.html");
        })
        .catch((err)=>{
          alert(err.message);
        })
    }


    //logout 
    const logout = document.querySelector('.logout')
    if(logout){
      logout.addEventListener('click', ()=>{
        signOut(auth)
          .then(()=>{
            // console.log('user signed out');
            window.location.replace("../dist/homepage.html");
          })
          .catch((err)=>{
            console.log(err.message);
          })
      })
    }
    


    //Subscribing to auth Changes
    onAuthStateChanged(auth, (user) => {
      console.log('user status changed', user);
    })








    // I am trying from here the immediate code doesn't work
     
    // const fill = document.querySelector('.index1');
    // if(fill){
    //   fill.addEventListener('click', ()=>{
    //     handletemp()
    //   })
    // }
    
    // function handlefill(e){
    //   const append1 = document.querySelector('.append1')
    //   append1.innerHTML = "Hi"
    //   let divi = `<div>`
    //   getDocs(colRef)
    //     .then((snapshot) => {
    //         // console.log(snapshot.docs)
    //         let books = []
    //         snapshot.docs.forEach((doc) => {
    //             books.push({ ...doc.data(), id:doc.id})
    //         })
    //         console.log('1')
    //     })
    //     .catch(err => {
    //         console.log(err.message)
    //     })
    //     append1.innerHTML = divi;
    // }
    // fill.addEventListener('click', () => {
    //     // e.preventDefault()
        
        
  
        
    // })

    const tempbtn = document.querySelector('.tempbtn')
    if(tempbtn){
      tempbtn.addEventListener('click', ()=>{
        handletemp()
      })
    }
 
  function handletemp(e){
    const append1 = document.querySelector('.append1')
      // append1.innerHTML = "Hiiiiii"
      let divi = `<div>`
      getDocs(colRef1)
        .then((snapshot) => {
            // console.log(snapshot.docs)
            let books = []
            snapshot.docs.forEach((doc) => {
                books.push({ ...doc.data(), id:doc.id})
                  divi = divi + `<div>${doc.data().eventtype}</div>`
                
                
            })
            divi = divi + `</div>`
            append1.innerHTML = divi;
            // console.log(books)
        })
        .catch(err => {
            console.log(err.message)
        })
        

  }


  const tempbtn2 = document.querySelector('.tempbtn2')
    if(tempbtn2){
      tempbtn2.addEventListener('click', ()=>{
        handletemp2()
      })
    }
 
  function handletemp2(e){
    const append2 = document.querySelector('.append2')
      // append1.innerHTML = "Hiiiiii"
      let divi = `<div>`
      getDocs(colRef2)
        .then((snapshot) => {
            // console.log(snapshot.docs)
            let books = []
            snapshot.docs.forEach((doc) => {
                books.push({ ...doc.data(), id:doc.id})
                // if(doc.data().email === userName){
                  divi = divi + `<div>${doc.data().name}</div>`
                // }
                
            })
            divi = divi + `</div>`
            append2.innerHTML = divi;
            // console.log(books)
        })
        .catch(err => {
            console.log(err.message)
        })
        

  }

  

  const keynote = document.querySelector('.keynote')
  if(keynote){
    keynote.addEventListener('click', (e)=>{
      const appendindash = document.querySelector('.appendindash')
      // append1.innerHTML = "Hiiiiii"
      let divi = `<div class="row">`
      getDocs(colRef1)
        .then((snapshot) => {
            // console.log(snapshot.docs)
            let books = []
            snapshot.docs.forEach((doc) => {
                books.push({ ...doc.data(), id:doc.id})
                if(doc.data().eventtype === "keynote"){
                  divi = divi + `<div class="col-3 keynote">
            <div class="card border border-dark rounded keynote">
                <img class="card-img-top" src="images/conf.jpg" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">Speaker:${doc.data().host}</h5>
                    <p class="card-text">StartDate:${doc.data().date}</p>
                    <p class="card-text">StartTime:${doc.data().starttime}</p>
                    <p class="card-text">EndTime:${doc.data().endtime}</p>
                    <a href="${doc.data().meetlink}"><button class="btn regbtn">Join Meet</button></a>
                </div>
                
            </div>  
        </div>`
                }
            })
            divi = divi + `</div>`
            appendindash.innerHTML = divi;
            // console.log(books)
        })
        .catch(err => {
            console.log(err.message)
        })
    })
  }


    
  const paperPresentation = document.querySelector('.paper-presentation')
  if(paperPresentation){
    paperPresentation.addEventListener('click', (e)=>{
      const appendindash = document.querySelector('.appendindash')
      // append1.innerHTML = "Hiiiiii"
      let divi = `<div class="row">`
      getDocs(colRef1)
        .then((snapshot) => {
            // console.log(snapshot.docs)
            let books = []
            snapshot.docs.forEach((doc) => {
                books.push({ ...doc.data(), id:doc.id})
                if(doc.data().eventtype === "paper presentation"){
                  divi = divi + `<div class="col-3 paper-presentation">
            <div class="card border border-dark rounded paper-presentation">
                <img class="card-img-top" src="images/conf.jpg" alt="Card image cap">
                <div class="card-body">
                  <h5 class="card-title">Speaker:${doc.data().host}</h5>
                  <p class="card-text">StartDate:${doc.data().date}</p>
                  <p class="card-text">StartTime:${doc.data().starttime}</p>
                  <p class="card-text">EndTime:${doc.data().endtime}</p>
                  <a href="${doc.data().meetlink}"><button class="btn regbtn">Join Meet</button></a>
                  
                </div>
                
            </div>  
        </div>`
                }
                
            })
            divi = divi + `</div>`
            appendindash.innerHTML = divi;
            // console.log(books)
        })
        .catch(err => {
            console.log(err.message)
        })
    })
  }

  const posterPresentation = document.querySelector('.poster-presentation')
  if(posterPresentation){
    posterPresentation.addEventListener('click', (e)=>{
      const appendindash = document.querySelector('.appendindash')
      // append1.innerHTML = "Hiiiiii"
      let divi = `<div class="row">`
      getDocs(colRef1)
        .then((snapshot) => {
            // console.log(snapshot.docs)
            let books = [];
            // let x = 0;
            snapshot.docs.forEach((doc) => {
              // x++;
              // divName = "div"
                books.push({ ...doc.data(), id:doc.id})
                if(doc.data().eventtype === "poster presentation"){
                  divi = divi + `<div class="col-3 poster-presentation">
            <div class="card border border-dark rounded poster-presentation">
                <img class="card-img-top" src="images/conf.jpg" alt="Card image cap">
                <div class="card-body">
                  <h5 class="card-title">Speaker:${doc.data().host}</h5>
                  <p class="card-text">StartDate:${doc.data().date}</p>
                  <p class="card-text">StartTime:${doc.data().starttime}</p>
                  <p class="card-text">EndTime:${doc.data().endtime}</p>
                  <a href="${doc.data().meetlink}"><button class="btn regbtn">Join Meet</button></a>
                  
                </div>
            </div>  
        </div>`
                }
                
            })
            divi = divi + `</div>`
            appendindash.innerHTML = divi;
            // console.log(books)
        })
        .catch(err => {
            console.log(err.message)
        })
    })
  }


// function register(e){
//   console.log(e);
//    const user = getAuth().currentUser;
//    if(user){
//      const uid = user.uid
//      uid.registered.push(e);
//    }
// }










const keynote1 = document.querySelector('.keynote1')
  if(keynote1){
    keynote1.addEventListener('click', (e)=>{
      const appendindash = document.querySelector('.appendindash')
      // append1.innerHTML = "Hiiiiii"
      let divi = `<div class="row">`
      getDocs(colRef1)
        .then((snapshot) => {
            // console.log(snapshot.docs)
            let books = []
            snapshot.docs.forEach((doc) => {
                books.push({ ...doc.data(), id:doc.id})
                if(doc.data().eventtype === "keynote"){
                  const user = getAuth().currentUser;
                  

                  divi = divi + `<div class="col-3 keynote1">
            <div class="card border border-dark rounded keynote1">
                <img class="card-img-top" src="images/conf.jpg" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${doc.data().eventtype}</h5>
                    <p class="card-text">${doc.data().eventtype}</p>
<button class="btn" onclick="register('${doc.id}')">Register</button>
                </div>
                
            </div>  
        </div>`
                }
                
            })
            divi = divi + `</div>`
            appendindash.innerHTML = divi;
            // console.log(books)
        })
        .catch(err => {
            console.log(err.message)
        })
    })
  }

    
  const paperPresentation1 = document.querySelector('.paper-presentation1')
  if(paperPresentation1){
    paperPresentation1.addEventListener('click', (e)=>{
      const appendindash = document.querySelector('.appendindash')
      // append1.innerHTML = "Hiiiiii"
      let divi = `<div class="row">`
      getDocs(colRef1)
        .then((snapshot) => {
            // console.log(snapshot.docs)
            let books = []
            snapshot.docs.forEach((doc) => {
                books.push({ ...doc.data(), id:doc.id})
                if(doc.data().eventtype === "paper presentation"){

                  divi = divi + `<div class="col-3 paper-presentation1">
            <div class="card border border-dark rounded paper-presentation1">
                <img class="card-img-top" src="images/conf.jpg" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${doc.data().eventtype}</h5>
                    <p class="card-text">${doc.data().eventtype}</p>
                    <button class="btn" onclick="register('${doc.id}')">Register</button>
                </div>
                
            </div>  
        </div>`
                }
                
            })
            divi = divi + `</div>`
            appendindash.innerHTML = divi;
            // console.log(books)
        })
        .catch(err => {
            console.log(err.message)
        })
    })
  }

  const posterPresentation1 = document.querySelector('.poster-presentation1')
  if(posterPresentation1){
    posterPresentation1.addEventListener('click', (e)=>{
      const appendindash = document.querySelector('.appendindash')
      // append1.innerHTML = "Hiiiiii"
      let divi = `<div class="row">`
      getDocs(colRef1)
        .then((snapshot) => {
            // console.log(snapshot.docs)
            let books = [];
            // let x = 0;
            snapshot.docs.forEach((doc) => {
              // x++;
              // divName = "div"
                books.push({ ...doc.data(), id:doc.id})
                if(doc.data().eventtype === "poster presentation"){
                  divi = divi + `<div class="col-3 poster-presentation1">
            <div class="card border border-dark rounded poster-presentation1">
                <img class="card-img-top" src="images/conf.jpg" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title"></h5>
                    <p class="card-text">${doc.data().eventtype}</p>
                    <button class="btn" onclick="register('${doc.id}')">Register</button>
                </div>
                
            </div>  
        </div>`
                }
                
            })
            divi = divi + `</div>`
            appendindash.innerHTML = divi;
            // console.log(books)
        })
        .catch(err => {
            console.log(err.message)
        })
    })
  }