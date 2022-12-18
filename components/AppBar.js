import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Appbar } from 'react-native-paper';

const Header = () => {
    return (
        <SafeAreaProvider>  <Appbar.Header style={{marginTop:40, backgroundColor:'blue'}}>
            <Appbar.Content title="Home Screen" />
        </Appbar.Header></SafeAreaProvider>
        );
};

export default Header;