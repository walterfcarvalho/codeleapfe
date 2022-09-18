import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, query, where, getDocs, Timestamp, doc, updateDoc, addDoc, deleteDoc, orderBy
} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBmpIPBEXzPS_P9HQslbBD9pAZzalfDUac",
  authDomain: "leapcodeposts.firebaseapp.com",
  projectId: "leapcodeposts",
  storageBucket: "leapcodeposts.appspot.com",
  messagingSenderId: "728060994747",
  appId: "1:728060994747:web:9d87339ec72358365c359e"
};


const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

export const addPost = async (post) => await addDoc(collection(db, 'posts'), post)

export const getTimeStamp = () => Timestamp.fromDate(new Date())

export const delPost = async (id) => await deleteDoc( doc(db, 'posts', id) )

export const updPost = async(id, newPost) => await updateDoc( doc(db, 'posts', id), newPost)

export const getPosts = async () => {
  const data = []

  const q = query(collection(db, "posts")
    , orderBy("created_datetime", "desc")
  )

  const querySnapshot = await getDocs(q)

  querySnapshot.forEach(doc => {
    data.push({ ...doc.data(), id: doc.id  })
  })

  return data
}
