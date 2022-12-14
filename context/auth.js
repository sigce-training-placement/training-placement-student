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
	const [showNotice, setShowNotice] = useState(false)

	const logOut = (url) => {
		signOut(auth)
			.then(() => {
				setUser()
				setUserData()
				router.push(url || "/")
			})
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
			if (currentuser) {
				const unsub = onSnapshot(doc(db, "users", currentuser.uid), (doc) => {
					if (doc.data()) {
						setUser(currentuser)
						setUserData(doc.data())
						if (!doc.data().restrict) {
							if (router.pathname.includes('restrict')) {
								router.push('/')
							} else if (router.pathname.includes('login') || router.pathname.includes('verify')) {
								return
							} else {
								return
							}
						} else {
							router.push("/restrict")
						}
						if (doc.data().primaryEdu != undefined && doc.data().firstname && doc.data().lastname && doc.data().mobileno && doc.data().branch && doc.data().gender) {
							setProfileCompleted(true)
						} else {
							setProfileCompleted(false)
						}
					} else {
						setMessage("No data available!");
					}
				});
			} else {
				if (router.pathname.includes("verify")) {
					return
				} else {
					router.push(`/`)
				}
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
			value: 1
		},
		{
			label: "Second Year",
			value: 2
		},
		{
			label: "Third Year",
			value: 3
		},
		{
			label: "Fourth Year",
			value: 4
		}
	]

	const fetchData = (item) => {
		return { id: item.id, ...item.data() }
	}
	return (
		<userAuthContext.Provider value={{ showNotice, setShowNotice, user, setUser, userData, setUserData, logOut, YEAR_OPTIONS, BRANCH_OPTIONS, GENDER_OPTIONS, fetchData }}>
			{children}
		</userAuthContext.Provider>
	)
}

export function useUserAuth() {
	return useContext(userAuthContext);
}
