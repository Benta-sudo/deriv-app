declare module 'react-drag-drawer' {
    import * as React from 'react';

    interface DrawerProps {
        open: boolean;
        onRequestClose: () => void;
        children?: React.ReactNode;
        direction?: 'left' | 'right' | 'top' | 'bottom';
        width?: number | string;
        height?: number | string;
        zIndex?: number;
        className?: string;
        containerClassName?: string;
        overlayClassName?: string;
        modalElementClass?: string;
        dragHandleClass?: string;
        allowClose?: boolean;
        noTouchOpen?: boolean;
        noTouchClose?: boolean;
    }

    const Drawer: React.FC<DrawerProps>;
    export default Drawer;
}
