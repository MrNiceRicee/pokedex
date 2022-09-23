import Error from '../components/Error';
import Layout from '../components/layout';

const FourOhFour = () => {
  return (
    <Layout>
      <Error statusCode={404} />
    </Layout>
  );
};

export default FourOhFour;
