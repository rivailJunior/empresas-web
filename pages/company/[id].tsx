import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';
import Header from "../../components/header";
import { Container } from "@material-ui/core/";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {Card, CardHeader, CardContent, Avatar, IconButton, Typography} from '@material-ui/core/';
import { red } from '@material-ui/core/colors';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import { getCompaniesServer } from '../../requestUtils/request';
import { transformReqCookieReadble } from '../../store/saveStore';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: '100%',
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }),
);


export default function CompanyDetails({company}) {
  const classes = useStyles();
  return (
    <div>
      <Header />
      <Container>
        <h1>{company.enterprise_name}</h1>
        <Card className={classes.root}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                {company.enterprise_name[0]}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={company.enterprise_type.enterprise_type_name}
            subheader={new Date().toLocaleString()}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {company.description}
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}


export const getServerSideProps: GetServerSideProps = async ({params, req}) => {
  if(!req.headers) {
    return {
      notFound: true
    } 
  } 
  const id = params.id;
  const cookie = transformReqCookieReadble(req.headers);
  const enterprises = await getCompaniesServer({cookie, id: `${id}`});
  
  return {
    props: {
      company: enterprises.data.enterprise
    }
  }
}

