import React from 'react'
import Layout from '../components/Layout'
import { useUserData } from '../context/data'
import { HiOutlineClipboardCheck, HiOutlineInbox } from 'react-icons/hi'
import Link from 'next/link'
import { MdOutlineKeyboardArrowRight } from "react-icons/md"
import { BiBell } from 'react-icons/bi'

const Dashboard = ({ getDate }) => {
	const training = <HiOutlineClipboardCheck className="text-lg" />
	const { driveArr } = useUserData()
	return (
		<Layout title="Dashboard" navbar={true}>
			<div className='py-12 px-10'>
				<div className='flex items-center justify-between mb-8'>
					<h1 className='text-3xl font-bold'>Dashboard</h1>
					<span className='text-indigo-500 h-10 w-10 flex items-center justify-center bg-indigo-500 bg-opacity-10 hover:bg-opacity-20 duration-150 cursor-pointer rounded-md'><BiBell /></span>
				</div>
				<div className='flex flex-col'>
					<div className='flex gap-x-10'>
						<div className='w-8/12 py-3'>
							<div className='flex justify-between items-center mb-3'>
								<h3 className='text-sm font-extrabold text-gray-600 '>Upcoming Drives</h3>
								<Link href={"/drive"} className='text-xs font-bold text-blue-600'>Show All</Link>
							</div>
							<div>
								{
									driveArr && driveArr.slice(0, 3).map((drive) => {
										return <Link href={`/drive/${drive.id}`} className='shadow-md cursor-pointer my-2 hover:shadow-lg duration-200 px-4 py-3 rounded-lg bg-white flex items-center justify-between gap-x-3'>
											<div className='flex justify-center items-center gap-x-3'>
												<span className='h-12 w-12 flex justify-center bg-opacity-50 rounded-md items-center bg-green-200'>
													{training}
												</span>
												<div>
													<h1 className='font-bold text-gray-800'>{drive?.drivename}</h1>
													<p className='text-[10px] font-bold text-gray-400'>{getDate("drive", drive?.dateofdrive)}</p>
												</div>
											</div>
											<MdOutlineKeyboardArrowRight />
										</Link>
									})
								}
							</div>
						</div>
						<div className='w-4/12 h-[35vh] bg-indigo-500 bg-opacity-10 rounded-xl py-3 px-5'>
							<h3 className='text-sm font-extrabold text-gray-600 '>Trainings</h3>
							<div>

							</div>
						</div>
					</div>
					<div className='flex gap-x-10 h-dashboard-bottom'>
						<div className='w-8/12 h-10 py-3'>
							<h3 className='text-sm font-extrabold text-gray-600 mb-4'>Profile</h3>
							<div className='grid grid-cols-3 gap-x-4 grid-rows-1'>

								<div className='p-4 rounded-lg bg-white shadow-md hover:shadow-xl duration-200 cursor-pointer'>
									<div>
										<p className='-mb-1 text-lg font-bold'>Education</p>
										<p className='text-xs font-semibold text-gray-600'>profile/education</p>
									</div>
									<div className='mt-5 py-6 flex justify-center'>
										<img src="/assets/education.svg" alt="" />
									</div>
								</div>
								<div className='p-4 rounded-lg bg-white shadow-md hover:shadow-xl duration-200 cursor-pointer'>
									<div>
										<p className='-mb-1 text-lg font-bold'>Documents</p>
										<p className='text-xs font-semibold text-gray-600'>profile/documents</p>
									</div>
									<div className='mt-5 py-6 flex justify-center'>
										<img src="/assets/education.svg" alt="" />
									</div>
								</div>
								<div className='p-4 rounded-lg bg-white shadow-md hover:shadow-xl duration-200 cursor-pointer'>
									<div>
										<p className='-mb-1 text-lg font-bold'>Internships</p>
										<p className='text-xs font-semibold text-gray-600'>profile/internship</p>
									</div>
									<div className='mt-5 py-6 flex justify-center'>
										<img src="/assets/education.svg" alt="" />
									</div>
								</div>

							</div>
						</div>
						<div className='w-4/12 h-full bg-indigo-500 bg-opacity-10 rounded-xl py-3 px-5'>
							<h3 className='text-sm font-extrabold text-gray-600 mb-4'>Inbox</h3>
							<div className='grid grid-cols-1 gap-3'>

								<div className='shadow-md hover:shadow-lg duration-200 cursor-pointer flex gap-x-3 bg-white w-full rounded-lg p-3'>
									<span className='h-12 w-12 min-w-fit flex justify-center bg-opacity-50 rounded-md items-center bg-green-200'>
										<HiOutlineInbox />
									</span>
									<div className='flex flex-col justify-center'>
										<div className='flex justify-between items-center w-full'>
											<h4 className='font-bold text-sm mb-1'>Admin</h4>
											<span className='text-[10px] font-semibold'>32 min ago</span>
										</div>
										<span className='w-64 text-xs text-gray-500 font-semibold text-ellipsis whitespace-nowrap overflow-hidden'>aslkdhiuaushdkjahjkdhakjsdhkjahjkdasbdhabshdbashdjghasd</span>
									</div>
								</div>

							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default Dashboard