import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
interface RightBarProps {
  isOpen: boolean;
  onClose: () => void;
  // contactInfo?: {
  //   name: string;
  //   email: string;
  //   status: string;
  // };
  contactInfo?: any
}

export default function RightBar({ isOpen, onClose, contactInfo }: RightBarProps) {

  console.log('contactInfo', contactInfo)
  return (
    <div
      className={`fixed right-0 top-0 h-full w-80 bg-white border-l transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
    >
      {/* Header */}
      <div className="border-b p-4 flex justify-between items-center">
        <h2 className="font-semibold text-lg">รายละเอียด</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Contact Info */}
      <div className="p-4 border-b">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
          <div>
            <div className="font-medium">{contactInfo?.name || ''}</div>
            <div className="text-sm text-gray-500"><EmailOutlinedIcon sx={{ fontSize: '18px', color: '#6d6d6d' }}/> {contactInfo?.email || ''}</div>
            <div className="text-sm text-gray-500"><LocalPhoneOutlinedIcon sx={{ fontSize: '18px', color: '#6d6d6d' }}/> {contactInfo?.telephone_number || ''}</div>
            <div className="text-sm text-green-500">{contactInfo?.status || ''}</div>
          </div>
        </div>
      </div>

      {/* Action Sections */}
      <div className="p-4 space-y-2">
        <div className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
          <div className="font-medium">Conversation Actions</div>
        </div>

        <div className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
          <div className="font-medium">Macros</div>
        </div>

        <div className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
          <div className="font-medium">Conversation Information</div>
          <div className="text-sm text-gray-500 mt-1">
            Started: {new Date().toLocaleDateString()}
          </div>
        </div>

        <div className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
          <div className="font-medium">Contact Attributes</div>
        </div>

        <div className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
          <div className="font-medium">Previous Conversations</div>
          <div className="text-sm text-gray-500 mt-1">
            Total: 5 conversations
          </div>
        </div>

        <div className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
          <div className="font-medium">Conversation participants</div>
          <div className="text-sm text-gray-500 mt-1">
            2 participants
          </div>
        </div>
      </div>
    </div>
  );
} 