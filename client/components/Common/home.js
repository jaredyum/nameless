import React from 'react';

// MUI Components
import Typography from 'material-ui/Typography';

// Components
import ContentSection from 'components/Layout/contentSection';

const Home = () => (
  <ContentSection>
    <Typography variant="display3" gutterBottom align="center">
      Welcome to the Home Page!
    </Typography>
    <Typography variant="body1" gutterBottom align="center">
      Hold tight, we&apos;ve got some good stuff on the way ;-)
    </Typography>
  </ContentSection>
);

export default Home;
