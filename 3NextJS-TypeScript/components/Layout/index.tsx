import TopBar from '../TopBar';
import * as React from 'react';

function Layout({ children }: {children: any}) {

    return (
        <React.Fragment>
            <TopBar />
            {children}
        </React.Fragment>
    );
}

export default Layout;
