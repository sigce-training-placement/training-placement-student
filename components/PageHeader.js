import React, { useState } from 'react'
import { useUserAuth } from '../context/auth'
import Button from './Button'

const PageHeader = ({ searchBar, data, result, getDate, buttoncomponent }) => {
	const { userData } = useUserAuth()
	const [search, setSearch] = useState("")
	return (
		<>
			<header className='flex items-center justify-between h-28'>
				<h1 className='text-3xl font-bold'>Hello, {userData && userData.firstname}</h1>
				{
					searchBar && <div className='flex items-center'>
						<input type="text" className='px-4 py-3 rounded-lg w-72 shadow-lg' placeholder='Search...' value={search} onChange={(e) => { setSearch(e.target.value) }} />
					</div>
				}
				<img src={"/assets/sigce.png"} className='shadow-md h-10 w-10 rounded-full border-2 border-green-500' alt="" />
			</header>
			<div className='flex justify-between items-center'>
				<div className='mt-2 text-sm font-bold text-gray-500'>{getDate()}</div>
				{buttoncomponent}
			</div>
		</>
	)
}

export default PageHeader