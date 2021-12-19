import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import LanguageButtons from './LanguageButtons';
import LinkUnderlineEffect from '../generic/LinkUnderlineEffect';
import en from '@/language/locales/en/navbar.json';
import es from '@/language/locales/es/navbar.json';
import useLocale from '@/hooks/useLocale';
import { useSession, signOut } from 'next-auth/client';

const SlidePanel = ({ navOpen, setNavOpen }) => {

	const wrapperRef = useRef(null);
	const [ session ] = useSession(); 

	const handleClickOutside = (event) => {
		if (!navOpen) return;
		if (wrapperRef && !wrapperRef.current.contains(event.target)) {
			setNavOpen(false);
		}
	}

	const t = useLocale() === 'en' ? en : es;
		
	useEffect(() => {
		document.addEventListener('click', handleClickOutside);

		if (navOpen === true) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'visible';
		}
		
		return () => document.removeEventListener('click', handleClickOutside);
	}, [ navOpen ]);

	return (
		<Container 
			className='slide-panel' 
			navOpen={navOpen} 
			ref={wrapperRef} 
			onClick={(event) => handleClickOutside(event)}
		>
			<LanguageButtons />

			<SectionHeader> { t.resources } </SectionHeader>
			{/* <LinkUnderlineEffect hrefFormatted="/Sign-in" text={ t.signIn } color='cyan'/> */}
			<LinkUnderlineEffect hrefFormatted="/resources/program" text={ t.programs } color='cyan'/>
			<LinkUnderlineEffect hrefFormatted="/resources/scholarships" text={ t.scholarships } color='cyan'/>
			<LinkUnderlineEffect hrefFormatted="/resources/internships" text={ t.internships } color='cyan'/>
			<LinkUnderlineEffect hrefFormatted="/resources/summer" text={ t.summer } color='cyan'/>

			<SectionHeader> { t.portal } </SectionHeader>
			<LinkUnderlineEffect hrefFormatted='/' text={ t.home }  color='cyan'/>
			<LinkUnderlineEffect hrefFormatted="/add-edit-orgs" text={ t.addOrg } color='cyan'/>
			<LinkUnderlineEffect target="_blank" rel="noopener noreferrer" hrefFormatted="https://www.leadlatinoamerica.org/copy-of-our-team" text={ t.ourTeam } color='cyan'/>

			{session && (
				<>
					<LinkUnderlineEffect hrefFormatted='/profile' text='My Profile'  color='cyan'/>
					<LogoutButton onClick={signOut}>
						<LinkUnderlineEffect hrefFormatted='/' color='cyan' text='Log Out' />
					</LogoutButton>
				</>
			)}

			{!session && (
				<LinkUnderlineEffect hrefFormatted='/sign-in' text='Sign In'  color='cyan'/>
			)}

		</Container>
	)
}

export default SlidePanel;

const Container = styled.nav`
	z-index: 10000; 
	background-color: white; 
	width: 400px; 
	height: 100vh;
	position: absolute; 
	top: 70px;
	left: ${ props => props.navOpen === false ? '-400px' : '0'}; 
	padding: 10px;
	transition: .4s ease-in-out;
	padding: 50px 20px;
	box-shadow: ${ props => props.navOpen ? '3px 15px 25px -4px rgba(156,156,156,1)' : 'none' } ; 
`

const BottomSection = styled.div`
	margin-top: 40px; 
`

const SectionHeader = styled.p`
	font-size: 34px;
	margin-bottom: 10px; 
	font-weight: 300;
	margin-top: 20px;
`

const LogoutButton = styled.div`

`