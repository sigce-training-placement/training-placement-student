import React, { createContext, useContext, useEffect, useState } from "react";
import {
	onAuthStateChanged,
	signOut,
} from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore"
import { auth, db } from "./firebase_config";
import { useRouter } from "next/router";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children, setMessage }) {
	const router = useRouter()
	const [user, setUser] = useState();
	const [userData, setUserData] = useState();

	const logOut = () => {
		signOut(auth)
			.then(() => {
				setUser()
				setUserData()
				router.push("/login")
			})
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
			if (currentuser) {
				const unsub = onSnapshot(doc(db, "users", currentuser.uid), (doc) => {
					if (doc.data()) {
						setUser(currentuser)
						setUserData(doc.data())
					} else {
						setMessage("No data available!");
					}
				});
			}else{
				router.push(`/login`)
			}
		});
		return () => {
			unsubscribe()
		};
	}, []);

	return (
		<userAuthContext.Provider value={{ user, setUser, userData, setUserData, logOut }}>
			{children}
		</userAuthContext.Provider>
	)
}

export function useUserAuth() {
	return useContext(userAuthContext);
}
