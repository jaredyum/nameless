import React from 'react';

// MUI Components
import Typography from '@material-ui/core/Typography';

// React Router
import { Link } from 'react-router-dom';

// Components
import ContentSection from 'components/Layout/ContentSection';

// Constants
import { ROUTEPATH_LOGIN } from 'copy/Global/routes';

const Forbidden = () => (
  <ContentSection>
    <Typography variant="display3" gutterBottom>
      Forbidden
    </Typography>
    <Typography variant="body1" gutterBottom>
      This page is restricted.
    </Typography>
    <Typography variant="body1" gutterBottom>
      Click <Link to={ROUTEPATH_LOGIN}>here</Link> to login.
    </Typography>
  </ContentSection>
);

export default Forbidden;
