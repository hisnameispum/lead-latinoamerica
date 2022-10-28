import FullScreenBack from '@/components/background/FullScreenBack'
import PhotoWithTextBox from '@/components/content/PhotoWithTextBox'
import Footer from '@/components/footer/Footer'
import NavBar from '@/components/nav/NavBar'
import fakeData from '@/data/fakeData'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useQuery } from "react-query"
import ProgramRequests from '@/fetch/program/ProgramRequests'
import LoadingSpinner from '@/components/generic/LoadingSpinner'
import Box from '@/components/generic/Box';


const ResourcePage = () => {
	// ex: /resource/program

	const router = useRouter() 
	const { resourceSlug } = router.query


	const singularSlug = resourceSlug[resourceSlug.length - 1] === 's' 
		? resourceSlug.slice(0, resourceSlug.length - 1) 
		: resourceSlug

	const programsQuery = useQuery({
		queryKey: ['resourcePrograms', { programType: singularSlug }], 
		queryFn: ProgramRequests.getPrograms
	})

	const { isLoading } = programsQuery

	const programs = programsQuery.data || []

	const hasPrograms = programs.length > 0
	
	return (
		<>
			<NavBar />
			<FullScreenBack 
				src={fakeData[resourceSlug].coverImage}
				height="50vh"
				titleInfo={{ 
					show: true, 
					text: `${resourceSlug}`, 
					backgroundColor: '#0077B6', 
					color: 'white' 
				}}
			/>
				{isLoading ? (
					<LoadingSpinner />
				) : (
					<>
							{hasPrograms ? (
								<Grid>
									{programs.map(( program ) => (
										<PhotoWithTextBox 
											key={program.href} 
											coverImage={program.coverImage} 
											program={program} 
										/>
									))}
								</Grid>
							) : (
								<Box ml="20px" mb="40px" style={{ height: 100}}>
									<p>
										There are no opporunities in this cateogry at this time. Please check back at a later date.
									</p>
								</Box>
							)
								
							}


					</>
				)}

		<Footer/>

		</>
	)
}

export default ResourcePage 

const Grid = styled.div`
	display: grid; 
	grid-template-columns: repeat(3, 1fr);
	width: 1400px; 
	max-width: 90%; 
	margin: 40px auto 0 auto; 
	align-items: center; 

	@media screen and (max-width: 1300px) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media screen and (max-width: 820px) {
		grid-template-columns: repeat(1, 1fr);
	}
`