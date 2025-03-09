import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box component="footer" sx={{ mt: 'auto', p: 2, backgroundColor: '#f1f1f1' }}>
            <Typography variant="body2" align="center">
            © {new Date().getFullYear()} SMART on FHIR API. All rights reserved.
            </Typography>
        </Box>
    );
};
export default Footer;