import formFields from '@/data/formFields';
import Form from '@/components/form/Form';
import styled from 'styled-components';
import CenterFlexContainer from '@/components/generic/CenterFlexContainer';
import NavBar from '@/components/nav/NavBar';
import Footer from '@/components/footer/Footer';
import ChangingBackgroundText from '@/components/content/ChangingBackgroundText';

const AddAndEditOrgs = () => {
	return (
		<>
			<NavBar />
			<CenterFlexContainer backgroundColor={ '#F8FAFA' } paddingTop={ true }>
			<ChangingBackgroundText 
				fontSize={'48px'}
				 initialColor={'#1F2041'}
				 secondaryColor={'#1F2041'}
				 text={'Join Us!'}
				 fontColorInitial={'#1F2041'}
				 fontColorSecondary={'#F8FAFA'}
				 onlyRunOneTransition={true}
			/>
			<Form formData={ formFields } objKey={ 'addProgram' } />
			</CenterFlexContainer>
			<Footer />
		</>
	)
}

export default AddAndEditOrgs;

const Container = styled.div`

`