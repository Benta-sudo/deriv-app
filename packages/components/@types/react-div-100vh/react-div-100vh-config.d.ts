declare module 'react-div-100vh' {
    import * as React from 'react';

    interface Div100vhProps extends React.HTMLAttributes<HTMLDivElement> {
        children?: React.ReactNode;
    }

    const Div100vh: React.FC<Div100vhProps>;
    export default Div100vh;
}
