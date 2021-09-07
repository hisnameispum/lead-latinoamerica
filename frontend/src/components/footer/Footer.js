import styled, { ThemeContext } from 'styled-components';
import { useContext } from 'react';
import Link from 'next/link';
import DynamicQuote from '../content/quote/DynamicQuote';
import PropTypes from 'prop-types';
import LinkUnderlineEffect from '@/components/generic/LinkUnderlineEffect';
import en from '@/language/locales/en/footer.json';
import es from '@/language/locales/es/footer.json';
import useLocale from '@/hooks/useLocale';

const Footer = ({ showQuote }) => {

    const theme = useContext(ThemeContext);
    const t = useLocale() === 'en' ? en : es

    return (
        <>
            { showQuote && <DynamicQuote /> }
            <Container data-testid='footer' theme={ theme }>
                <Column>
                    <p>Explore</p>
                    <LinkUnderlineEffect hrefFormatted="/resources/programs" text={ t.programs } color={'white'}/>
                    <LinkUnderlineEffect hrefFormatted="/resources/internships" text={ t.internships } color={'white'}/>
                    <LinkUnderlineEffect hrefFormatted="/our-team" text={ t.ourTeam } color={'white'}/>
                    <LinkUnderlineEffect hrefFormatted="/add-edit-orgs" text={ t.addYourOrg } color={'white'}/>
                </Column>
            </Container>
        </>
    )
}

export default Footer;

Footer.propTypes = {
    showQuote: PropTypes.bool
}

Footer.defaultProps = {
    showQuote: true
}

const Container = styled.div`
    min-height: 300px; 
    background-color: ${ props => props.theme.colors.cyan };
    width: 100vw; 
    display: flex; 
    padding-left: 20px; 
    color: white;
`

const Column = styled.div`
    display: flex; 
    flex-direction: column; 
    padding: 20px;
    font-size: 26px;
    
    & > p:first-child {
        font-weight: bold;
        margin-bottom: 20px;
    }
`