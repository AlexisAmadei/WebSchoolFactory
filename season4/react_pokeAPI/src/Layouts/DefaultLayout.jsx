import { Box, Theme } from '@radix-ui/themes'
import { Outlet } from 'react-router'
import "@radix-ui/themes/styles.css";
import Navbar from '../components/Navbar';

export default function DefaultLayout() {
    return (
        <Theme>
            <Box className="default-layout" px="4" py="2">
                <Navbar />
                <Outlet />
            </Box>
        </Theme>
    );
}
