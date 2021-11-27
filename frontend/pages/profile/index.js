import React from 'react';
import PropTypes from 'prop-types';
import { useSession } from 'next-auth/client';
import NavBar from '@/components/nav/NavBar';
import Footer from '@/components/footer/Footer';
import styled from 'styled-components';
import Image from 'next/image'; 
import Box from '@/components/generic/Box';
import getFullName from '@/utils/getFullName';
import SelectInput from '@/components/form/select/SelectInput';


const ProfilePage = props => {

  const [ session, loading ] = useSession(); 

  const userName = getFullName(session)

  return (
    <>
      <NavBar/>
        <PhotoContainer>
          <Image src='/images/profile-images/david-marcu-unsplash-nature.jpg'
            layout='fill'
            objectFit='cover'
          />
        </PhotoContainer>
        <Box width='al-fu' center style={{position: 'relative'}}>
          <NameCircle>
            { userName.initials }
          </NameCircle>
        </Box>
        <Box mw='100vw'>
          <Box width='al-fu' center mt={100}>
            Interestd In
            <SelectInput options={['Freshman', 'Sophomore', 'Junior', 'Senior']}/>
          </Box>
        </Box>
      <Footer />
    </>
  )
}

ProfilePage.propTypes = {

}

export default ProfilePage; 

const PhotoContainer = styled.div`
  min-height: 400px; 
  min-width: 100vw; 
  position: relative; 
`

const NameCircle = styled.div`
  position: absolute; 
  width: 150px; 
  height: 150px; 
  border-radius: 50%; 
  border: 1px solid #888; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  top: -75px; 
  background-color: #1F2041; 
  color: white;
  font-size: 36px;
`
