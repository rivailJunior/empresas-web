import Header from '../../components/header';
import { getCompaniesServer } from "../../requestUtils/request";
import { ListView, CompanyList } from "../../components/companyListView";
import { Container} from "@material-ui/core/";
import {GetServerSideProps } from 'next'
import { transformReqCookieReadble } from '../../store/saveStore';


export default function Companies({enterprises}) {    
  return (
    <div>
        <Header />
        <Container>
          <h1>Empresas</h1>
          <ListView values={enterprises}/>
        </Container>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  try {
    if(!req.headers) {
      return {
        notFound: true
      } 
    } 
    const cookie = transformReqCookieReadble(req.headers);
    const response = await getCompaniesServer({cookie});
    const companies = response.data.enterprises;
    if(companies.length > 0) {
      const totalCompanies = companies.length;
      const aleatoryNumber = Math.floor(Math.random() * 10) + totalCompanies;
      return {
        props: {
          enterprises: companies.slice(aleatoryNumber - 10, aleatoryNumber)
        }
      }
    } else {
      return {
        notFound: true
      }
    }
   
  } catch(err) {
    return {
      notFound: true,
      redirect: "/login"
    }
  }
  
}


