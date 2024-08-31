import React from 'react';
import { BsExclamationCircle } from 'react-icons/bs';

const Modal = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-96">
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
          <div className="text-center mt-8">
            <BsExclamationCircle className="h-14 w-14 text-gray-500 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-600">
                Are you sure you want to remove this bookmark?
            </h3>
            <div className="flex justify-center gap-4 mb-4">
              <button
                onClick={onConfirm}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Yes, I am sure
              </button>
              <button
                onClick={onClose}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
              >
                No, Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
