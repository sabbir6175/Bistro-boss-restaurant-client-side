import { createContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged ,createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { app } from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
const googleProvider = new GoogleAuthProvider();
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);
const axiosPublic = useAxiosPublic()
const createUser = (email, password)=>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
}
const signIn =(email, password)=>{
  setLoading(true)
  return signInWithEmailAndPassword(auth, email, password)
}
const googleSignIn = ()=>{
  setLoading(true)
  return signInWithPopup(auth, googleProvider)
}

const updateUserProfile =(name, photo)=>{
  return updateProfile(auth.currentUser, {
    displayName: name, photoURL: photo
  })
}

const LogOut = ()=>{
    setLoading(true)
    return signOut(auth)
}
useEffect(() => {
  const unsubscribe= onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("current user",currentUser);
      if(currentUser){
        const userInfo = {email:currentUser.email}
        axiosPublic.post('/jwt', userInfo)
        .then(res=>{
          if(res.data.token){
            localStorage.setItem('access-token', res.data.token)
            setLoading(false);
          }
        })
      }else{
          localStorage.removeItem('access-token')
          setLoading(false);
      }
      
    });
    return()=>{
        return unsubscribe();
    }
  }, [axiosPublic]);

  const authInfo = {
    user,
    loading,
    createUser,
    signIn ,
    googleSignIn,
    updateUserProfile,
    LogOut 
  };
  return (
    <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
