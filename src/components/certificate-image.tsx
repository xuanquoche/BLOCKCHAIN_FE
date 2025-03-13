import React from "react";

interface CertificateImageProps {
  issueDate?: string;
  recipientName?: string;
  description?: string;
}

const CertificateImage: React.FC<CertificateImageProps> = ({
  issueDate,
  recipientName,
  description = "Congratulations, for your great performance shown during this month. We really appreciate your contributions.",
}) => {
  return (
    <div className="relative w-full aspect-[1.4] bg-white rounded-lg shadow-lg overflow-hidden flex">
      {/* Sidebar Gradient */}
      <div className="absolute left-0 top-0 bottom-0 w-16">
        <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-b from-[#800000] to-[#4a0404]"></div>
        <div className="absolute left-10 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#DAA520] to-[#FFD700]"></div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-20 py-6 flex flex-col justify-center">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-black">CERTIFICATE</h1>
            <p className="text-lg text-gray-600 mt-1">OF ACHIEVEMENT</p>
          </div>
          <img src="https://www.pngall.com/wp-content/uploads/2017/03/Gold-Medal-PNG-Clipart.png" alt="Medal" className="w-30 h-40 object-contain" />
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mt-3">{description}</p>

        {/* Recipient Name */}
        <h2 className="text-2xl font-serif font-medium text-black mt-4">{recipientName}</h2>

        {/* Signature Section */}
        <div className="flex flex-col items-center mt-6">
          <div className="w-48 h-[2px] bg-black"></div>
          <p className="text-md font-bold text-black mt-1">VKU</p>
        </div>

        {/* Issue Date */}
        <p className="text-xs text-gray-500 text-center mt-4">{issueDate}</p>
      </div>
    </div>
  );
};

export default CertificateImage;
