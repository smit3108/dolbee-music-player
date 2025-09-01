import React from 'react';

const DeleteConfirmationBox = ({ message, onCancel, onConfirm }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6">
                <p>{message}</p>
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={onCancel}
                        className="px-3 py-1 rounded bg-gray-500 text-white font-semibold hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="ml-3 px-3 py-1 rounded bg-red-500 text-white font-semibold hover:bg-red-600"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationBox;
