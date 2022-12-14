import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../../context/firebase_config';

const Drive = () => {
	const router = useRouter()
	const { drive } = router.query
	const [data, setData] = useState();

	useEffect(() => {
		if (drive) {
			const unsub = onSnapshot(doc(db, "drives", drive), (doc) => {
				setData(doc.data());
			});
			return () => {
				unsub()
			};
		}
	}, [drive]);
	return (
		<>
			<Layout navbar={true} title={data && data.drivename}>

			</Layout>
		</>
	)
}

export default Drive