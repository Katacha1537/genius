// components/Toast.js
import React, { useEffect } from 'react';

const Toast = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const getTypeStyles = (type) => {
        switch (type) {
            case 'success':
                return 'border-green-500';
            case 'error':
                return 'border-red-500';
            case 'info':
                return 'border-blue-500';
            default:
                return '';
        }
    };

    return (
        <div className={`p-4 mb-4 last:mb-0 rounded-md shadow-md border-b-4 ${getTypeStyles(type)} bg-slate-950 text-white`}>
            <div className="flex items-center justify-between text-left">
                <span className="text-sm">{message}</span>
                <button className="ml-4 text-lg" onClick={onClose}>&times;</button>
            </div>
        </div>
    );
};

export default Toast;
