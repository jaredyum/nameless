import React from 'react';

// MUI Components
import Typography from '@material-ui/core/Typography';

// Components
import ContentSection from 'components/Layout/ContentSection';

const NotFound = () => (
  <ContentSection>
    <Typography variant="display3" gutterBottom align="center">
      Page Not Found
    </Typography>
    <Typography variant="body1" gutterBottom align="center">
      The content you were looking for could not be found. Please check the URL
      and try again.
    </Typography>
  </ContentSection>
);

export default NotFound;
