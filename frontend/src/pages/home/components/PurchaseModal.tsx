import React from 'react';
import { Link } from 'react-router-dom';


interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  songTitle: string;
  onPurchase: () => void;
}

const PurchaseModal: React.FC<PurchaseModalProps> = ({ isOpen, onClose, songTitle, onPurchase }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h2 className="text-lg font-bold mb-4 text-black">Purchase {songTitle}</h2>
      <p className="text-lg mb-4 text-black">Are you sure you want to purchase this song?</p>
      <div className="flex justify-center mt-4"> {/* Center the buttons */}
        <Link to="/pay" className="bg-orange-500 text-white px-4 py-2 rounded mr-2">
        <button
          onClick={onPurchase}
          className="bg-orange-500 text-white px-4 py-2 rounded mr-2"
        >
          Yes, Purchase
        </button>
        </Link>
        <button
          onClick={onClose}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
  );
};

export default PurchaseModal;