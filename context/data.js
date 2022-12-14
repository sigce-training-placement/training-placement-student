import React, { createContext, useContext, useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore"
import { db } from "./firebase_config";
import { useUserAuth } from "./auth";

const UserDataContext = createContext();

export function UserDataContextProvider({ children, setMessage }) {
	const { user } = useUserAuth()
	const [clubs, setClubs] = useState([])
	const [internships, setInternships] = useState([])
	const [achievements, setAchievements] = useState([])
	const [trainings, setTrainings] = useState([])
	const [driveArr, setDriveArr] = useState([])

	useEffect(() => {
		if (user) {
			const QueryClub = query(collection(db, "student-club"), where("uid", "==", user.uid));
			const unsubscribeClub = onSnapshot(QueryClub, (querySnapshot) => {
				const clubArr = [];
				querySnapshot.forEach((doc) => {
					let obj = doc.data()
					obj.id = doc.id
					clubArr.push(obj);
				});
				setClubs(clubArr);
			});
			const QueryInternship = query(collection(db, "student-internship"), where("uid", "==", user.uid));
			const unsubscribeInternship = onSnapshot(QueryInternship, (querySnapshot) => {
				const internshipArr = [];
				querySnapshot.forEach((doc) => {
					let obj = doc.data()
					obj.id = doc.id
					internshipArr.push(obj);
				});
				setInternships(internshipArr);
			});
			const QueryAchievement = query(collection(db, "student-achievement"), where("uid", "==", user.uid));
			const unsubscribeAchievement = onSnapshot(QueryAchievement, (querySnapshot) => {
				const achievementArr = [];
				querySnapshot.forEach((doc) => {
					let obj = doc.data()
					obj.id = doc.id
					achievementArr.push(obj);
				});
				setAchievements(achievementArr);
			});
			const QueryTraining = query(collection(db, "student-training"), where("uid", "==", user.uid));
			const unsubscribeTraining = onSnapshot(QueryTraining, (querySnapshot) => {
				const trainingArr = [];
				querySnapshot.forEach((doc) => {
					let obj = doc.data()
					obj.id = doc.id
					trainingArr.push(obj);
				});
				setTrainings(trainingArr);
			});


			const driveQuery = query(collection(db, "drives"), where("active", "==", true), orderBy("drivename", "desc"));
			const driveUnsubscribe = onSnapshot(driveQuery, (querySnapshot) => {
				const adminDriveArray = [];
				querySnapshot.forEach((doc) => {
					let obj = doc.data()
					obj.id = doc.id
					adminDriveArray.push(obj);
				});
				setDriveArr(adminDriveArray.reverse());
			});
			return () => {
				unsubscribeClub()
				unsubscribeInternship()
				unsubscribeAchievement()
				unsubscribeTraining()
				driveUnsubscribe()
			};
		}
	}, [user]);

	return (
		<UserDataContext.Provider value={{ clubs, internships, achievements, trainings, driveArr }}>
			{children}
		</UserDataContext.Provider>
	)
}

export function useUserData() {
	return useContext(UserDataContext);
}
