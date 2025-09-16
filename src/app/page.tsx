"use client"

import { Member } from '@/lib/types'
import { InfoCard } from '@/components/info-card'
import { useState, useEffect } from 'react'

export default function Home() {
	const [info, setInfo] = useState<{ name: string, email: string }[]>([])
	const [members, setMembers] = useState<Member[]>([])

	useEffect(() => {
		const fetchMembers = async () => {
			const response = await fetch('api/members', {
				'method': 'GET',
				'headers': {
					'Content-Type': 'application/json'
				}
			})

			const data: Member[] = await response.json()
			setMembers(data)
			const extracted = data.map(m => ({ name: m.name, email: m.email }))
			setInfo(extracted)
		}
		fetchMembers()
	}, [])

	const handleGetInfo = () => {
		console.log(info)
		if (info.length === 0) return;

		const rows = [
			['name', 'email'],
			...info.map(entry => [entry.name, entry.email])
		]

		const csvString = rows.map(row => row.join(',')).join('\n')

		const blob = new Blob([csvString], { type: 'text/csv' })

		const url = URL.createObjectURL(blob)
		const a = document.createElement('a')
		a.href = url
		a.download = 'participants.csv'

		document.body.appendChild(a)
		a.click()
		document.body.removeChild(a)
		URL.revokeObjectURL(url)
	}

    return (
      <main className="w-screen h-screen flex flex-col items-center justify-between my-auto overflow-x-hidden py-10 font-google-sans">
		<div className="flex flex-col lg:flex-row w-[90%] lg:w-3/5 gap-3 justify-between items-center px-4 my-auto">
			<div className='hidden lg:block w-4'></div>
			<h1 className='font-bold text-3xl text-center'>Onboarding Session Profiles</h1>
			<button onClick={ handleGetInfo } className='bg-blue-500 rounded-md py-2 px-4 hover:cursor-pointer hover:bg-blue-600'>Get Info</button>
		</div>
		<div className={`scroll-container flex flex-wrap sm:w-9/10 lg:w-3/5 h-4/5 mx-auto gap-5 items-center ${ members.length > 1 ? 'justify-between' : 'justify-center' } items-start content-start p-4 overflow-y-auto`}>
			{ members.map((member, index) => (
					<InfoCard key={ index } { ...member } />
				))
			}
		</div>
      </main>
    );
}
