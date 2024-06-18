// components/ToastManager.js
import React, { useState } from 'react';
import Toast from './Toast';

const ToastManager = ({ toasts, removeToast }) => {
    return (
        <div className="fixed top-5 right-5 flex flex-col space-y-4">
            {toasts.map(toast => (
                <Toast
                    key={toast.id}
                    message={toast.message}
                    type={toast.type}
                    onClose={() => removeToast(toast.id)}
                />
            ))}
        </div>
    );
};

export default ToastManager;
