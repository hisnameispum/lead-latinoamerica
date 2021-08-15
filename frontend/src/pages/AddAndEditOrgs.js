import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import formFields from '@/data/formFields';
import Form from '@/components/form/Form';
import styled from 'styled-components';
import CenterFlexContainer from '@/components/generic/CenterFlexContainer';
import NavBar from '@/components/nav/NavBar';
import Footer from '@/components/footer/Footer';
import ChangingBackgroundText from '@/components/content/ChangingBackgroundText';

const AddAndEditOrgs = () => {

	const [ formSubmitted, setFormSubmitted ] = useState(false);
	const router = useRouter(); 

	useEffect(() => {
		if (!!formSubmitted) {
			
		}
	}, [ formSubmitted ])

	return (
		<>
			<NavBar />
			<CenterFlexContainer backgroundColor={ '#F8FAFA' } paddingTop={ true }>
			<ChangingBackgroundText 
				fontSize={ '48px' }
				initialColor={ '#1F2041' }
				secondaryColor={ '#1F2041' }
				text={ 'Lead With Us!' }
				fontColorInitial={ '#1F2041' }
				fontColorSecondary={ '#F8FAFA' }
				onlyRunOneTransition={ true }
			/>
			<Form 
				formData={ formFields } 
				objKey={ 'addProgram' } 
				endpoint={ 'programs/add' } 
				method={ 'POST' }
				cb={ setFormSubmitted }
				local={ router.query.local }
			/>
			</CenterFlexContainer>
			<Footer />
		</>
	)
}

export default AddAndEditOrgs;

const Container = styled.div`

`