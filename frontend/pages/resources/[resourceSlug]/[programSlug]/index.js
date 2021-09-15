import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getProgramBySlug } from '@/fetch/requests';
import fakeData from '@/data/fakeData';
import NavBar from '@/components/nav/NavBar';
import Footer from '@/components/footer/Footer';
import SkewedTitleAndPhoto from '@/components/content/program/SkewedTitleAndPhoto';
import ProgramOverviewAndInfo from '@/components/content/program/ProgramOverviewAndInfo';

const ProgramPage = () => {
  const router = useRouter(); 
  const [ program, setProgram ] = useState(null);

  const getProgram = async () => {
    const data = await getProgramBySlug(`program/${router.query.programSlug}`);
    setProgram(data.program);
  }

  useEffect(() => {
    getProgram(); 
  }, [router.query])

  console.log('PROGRAM: ', program);

  if ( !program ) return <>Loading</>
  return (
    <>
      <NavBar />
      <SkewedTitleAndPhoto program={ program } router={ router }/>
      <ProgramOverviewAndInfo program={ program } marginTop={ true }/>
      <Footer marginTop={ true }/>
    </>
  )
}

export default ProgramPage;