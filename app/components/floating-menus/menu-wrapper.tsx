'use client';

import { ReactNode } from 'react';

interface MenuWrapperProps {
    children: ReactNode;
    position?: 'fixed' | 'absolute';
    anchor?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'bottom-center' | 'center-right' | 'center-left';
    className?: string;
}

const anchorClassNames = {
    'top-left': 'top-6 left-6',
    'top-right': 'top-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'bottom-right': 'bottom-6 right-6',
    'bottom-center': 'bottom-6 left-1/2 -translate-x-1/2',
    'center-right': 'right-6 top-1/2 -translate-y-1/2',
    'center-left': 'left-6 top-1/2 -translate-y-1/2',
};

export function MenuWrapper({
    children,
    position = 'fixed',
    anchor = 'bottom-right',
    className = ''
}: MenuWrapperProps) {
    return (
        <div className={`${position} ${anchorClassNames[anchor]} ${className}`}>
            {children}
        </div>
    );
} 