import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { useUserAuth } from '../../context/auth';
import { useRouter } from 'next/router';
import { useUserData } from '../../context/data';
import Link from 'next/link';
import Input from '../../components/Input';


const Drive = ({ getDate }) => {
	const { fetchData } = useUserAuth()
	const router = useRouter()
	const { driveArr } = useUserData()
	const [campustypeToggle, setCampusTypeToggle] = useState(false)
	const [search, setSearch] = useState("")
	const [result, setResult] = useState(driveArr || [])

	useEffect(() => {
		if (search?.length > 0) {
			let driveFilter = driveArr.filter((data) => {
				return data.drivename?.toLowerCase().includes(search.toLowerCase()) || data.joblocation?.toLowerCase().includes(search.toLowerCase()) || data.jobPost?.toLowerCase().includes(search.toLowerCase())
			})
			if (campustypeToggle) {
				setResult(driveFilter?.filter((data) => {
					return data.campustype === true
				}))
			} else {
				setResult(driveFilter)
			}
		} else {
			if (campustypeToggle) {
				setResult(driveArr?.filter((data) => {
					return data.campustype === true
				}))
			} else {
				setResult(driveArr)
			}
		}
	}, [search, driveArr, campustypeToggle]);
	return (
		<Layout title="Drives" navbar={true} className="overflow-hidden">
			<div className='pt-8 px-16'>
				<h1 className='text-3xl font-bold mb-10'>Drives</h1>
				<div className='flex justify-between items-end px-4'>
					<div>
						<label onClick={() => { setCampusTypeToggle(!campustypeToggle) }} className='text-sm select-none font-semibold cursor-pointer flex items-center gap-x-2'>On Campus: <span className={!campustypeToggle ? 'h-3 w-3 bg-gray-400 rounded-full' : 'h-3 w-3 bg-blue-500 rounded-full'}></span></label>
					</div>
					<input type="text" onChange={(e) => { setSearch(e.target.value) }} value={search} autoFocus className='py-2 px-5 rounded-lg w-3/12' placeholder='Search...' />
				</div>
				<div className='text-center mt-3 px-4 py-3'>
					<div className='rounded-lg font-bold grid grid-cols-4 py-4 bg-white mb-3'>
						<span>Name</span>
						<span>Date</span>
						<span>Campus Type</span>
						<span>Job Post</span>
					</div>
					<div className='driveheight overflow-scroll flex flex-col gap-y-2'>
						{
							result?.length === 0 ? <h1 className='text-center mt-3 font-bold text-gray-600'>No results found!</h1> : result && result.map((drive) => {
								return <Link href={`drive/${drive.id}`} className='shadow-md h-max cursor-pointer grid grid-cols-4 py-4 bg-white rounded-lg duration-200 hover:shadow-lg'>
									<span>{drive.drivename}</span>
									<span>{getDate("drive", drive.dateofdrive)}</span>
									<span>{drive.campustype ? "On Campus" : "Off Campus"}</span>
									<span>{drive.jobPost}</span>
								</Link>
							})
						}
					</div>
				</div>
			</div>
		</Layout >
	)
}

export default Drive