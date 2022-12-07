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
	const [profileCompleted, setProfileCompleted] = useState(false)

	const logOut = (url) => {
		signOut(auth)
			.then(() => {
				setUser()
				setUserData()
				router.push(url || "/login")
			})
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
			if (currentuser) {
				console.log(currentuser)
				const unsub = onSnapshot(doc(db, "users", currentuser.uid), (doc) => {
					if (doc.data()) {
						setUser(currentuser)
						setUserData(doc.data())
						if (doc.data().primaryEdu != undefined && doc.data().firstname && doc.data().lastname && doc.data().mobileno && doc.data().branch && doc.data().gender) {
							setProfileCompleted(true)
						} else {
							// setMessage("Please Complete your profile")
							setProfileCompleted(false)
						}
					} else {
						setMessage("No data available!");
					}
				});
			} else {
				router.push(`/login`)
			}
		});
		return () => {
			unsubscribe()
		};
	}, []);

	const GENDER_OPTIONS = [
		{
			label: "Male",
			value: "male"
		},
		{
			label: "Female",
			value: "female"
		},
		{
			label: "Transgender",
			value: "transgender"
		}
	]
	const BRANCH_OPTIONS = [
		{
			label: "COMPUTER",
			value: "computer"
		},
		{
			label: "AI-ML",
			value: "ai-ml"
		},
		{
			label: "IOT",
			value: "iot"
		},
		{
			label: "MECHANICAL",
			value: "mechanical"
		},
		{
			label: "ELECTRICAL",
			value: "electrical"
		}
	]
	const YEAR_OPTIONS = [
		{
			label: "First Year",
			value: "First Year"
		},
		{
			label: "Second Year",
			value: "Second Year"
		},
		{
			label: "Third Year",
			value: "Third Year"
		},
		{
			label: "Fourth Year",
			value: "Fourth Year"
		}
	]


	return (
		<userAuthContext.Provider value={{ user, setUser, userData, setUserData, logOut, YEAR_OPTIONS, BRANCH_OPTIONS, GENDER_OPTIONS }}>
			{children}
		</userAuthContext.Provider>
	)
}

export function useUserAuth() {
	return useContext(userAuthContext);
}
