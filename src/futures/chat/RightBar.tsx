import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import SupervisedUserCircleOutlinedIcon from '@mui/icons-material/SupervisedUserCircleOutlined';
import AssuredWorkloadOutlinedIcon from '@mui/icons-material/AssuredWorkloadOutlined';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CallSplitOutlinedIcon from '@mui/icons-material/CallSplitOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

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

  // console.log('contactInfo', contactInfo)
  return (
    <div
      className={`fixed right-0 top-0 h-full w-80 bg-white border-l transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <div className='absolute top-[5px] right-[5px]'>
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
        <div 
          className="w-10 h-10 rounded-full relative bg-cover"
          style={{backgroundImage: `url(${contactInfo?.meta?.sender?.thumbnail ? contactInfo?.meta?.sender?.thumbnail : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzGYOukhtzQwJiFMmFihZEqZBr1wNMkTjgQg&s'})`}}
        >
          <div className={`${contactInfo?.meta?.sender?.availability_status == 'online' ? 'bg-green-400' : 'bg-transparent'} absolute w-2 h-2 rounded-xl right-0`}></div>
        </div>
        <div id='user-info' className='mt-2'>
          <div className='flex gap-2 items-center text-gray-400'>
            <div className="font-medium capitalize text-black">{contactInfo?.meta?.sender?.name || ''}</div>
            <InfoOutlinedIcon sx={{fontSize: '12px'}}/>
            <div className='cursor-pointer' onClick={() => window.location.href = '/contacts'}>
              <LaunchOutlinedIcon sx={{fontSize: '12px'}}/>
            </div>
          </div>
          <div id='user-details' className='mt-2 opacity-80  text-[14px]'>
            <div className='flex gap-2 items-center'>
              <EmailOutlinedIcon sx={{ fontSize: '12px', color: '#6d6d6d' }}/>
              {contactInfo?.meta?.sender?.email || ''}
              <div className='p-1 bg-transparent w-[18px] h-[18px] flex text-gray-400 justify-center items-center rounded-sm cursor-pointer hover:text-white hover:bg-gray-400 duration-200 ease-in-out'><ContentPasteOutlinedIcon sx={{fontSize: 10}}/></div>
            </div>
            <div className='flex gap-2 items-center'>
              <LocalPhoneIcon sx={{ fontSize: '12px', color: '#6d6d6d' }}/>
              {contactInfo?.meta?.sender?.phone_number || '-'}
              <div className='p-1 bg-transparent w-[18px] h-[18px] flex text-gray-400 justify-center items-center rounded-sm cursor-pointer hover:text-white hover:bg-gray-400 duration-200 ease-in-out'><ContentPasteOutlinedIcon sx={{fontSize: 10}}/></div>
            </div>
            <div className='flex gap-2 items-center'>
              <SupervisedUserCircleOutlinedIcon sx={{ fontSize: '12px', color: '#6d6d6d' }}/>
              {contactInfo?.meta?.sender?.identifier || ''}
            </div>
            <div className='flex gap-2 items-center'>
              <AssuredWorkloadOutlinedIcon sx={{ fontSize: '12px', color: '#6d6d6d' }}/>
              {contactInfo?.meta?.sender?.email || ''}
            </div>
          </div>
          <div id='user-actions' className='flex gap-2 justify-start items-center mt-2'>
            <div className='w-[25px] h-[25px] bg-gray-300 hover:bg-gray-400 flex justify-center items-center text-white rounded-md duration-200 ease-in-out'><ChatOutlinedIcon sx={{fontSize: 12}}/></div>
            <div className='w-[25px] h-[25px] bg-gray-300 hover:bg-gray-400 flex justify-center items-center text-white rounded-md duration-200 ease-in-out'><EditOutlinedIcon sx={{fontSize: 12}}/></div>
            <div className='w-[25px] h-[25px] bg-gray-300 hover:bg-gray-400 flex justify-center items-center text-white rounded-md duration-200 ease-in-out'><CallSplitOutlinedIcon sx={{fontSize: 12}}/></div>
            <div className='w-[25px] h-[25px] bg-red-300 hover:bg-red-400 flex justify-center items-center text-red-100 rounded-md duration-200 ease-in-out'><DeleteOutlineOutlinedIcon sx={{fontSize: 12}}/></div>
          </div>
        </div>
        {/* <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
          <div>
            <div className="font-medium">{contactInfo?.meta?.sender?.name || ''}</div>
            <div className="text-sm text-gray-500"><EmailOutlinedIcon sx={{ fontSize: '18px', color: '#6d6d6d' }}/> {contactInfo?.email || ''}</div>
            <div className="text-sm text-gray-500"><LocalPhoneOutlinedIcon sx={{ fontSize: '18px', color: '#6d6d6d' }}/> {contactInfo?.telephone_number || ''}</div>
            <div className="text-sm text-green-500">{contactInfo?.status || ''}</div>
          </div>
        </div> */}
      </div>

      {/* Action Sections */}
      <div className="p-4 space-y-2">
        <div className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors flex justify-between items-center">
          <div className="font-medium">Conversation Actions</div>
          <AddOutlinedIcon sx={{fontSize: 12}}/>
        </div>

        <div className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors flex justify-between items-center">
          <div className="font-medium">Macros</div>
          <AddOutlinedIcon sx={{fontSize: 12}}/>
        </div>

        <div className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors flex justify-between items-center">
          <div>
            <div className="font-medium">Conversation Information</div>
            <div className="text-sm text-gray-500 mt-1">
              Started: {new Date().toLocaleDateString()}
            </div>
          </div>
          <AddOutlinedIcon sx={{fontSize: 12}}/>
        </div>

        <div className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors flex justify-between items-center">
          <div className="font-medium">Contact Attributes</div>
          <AddOutlinedIcon sx={{fontSize: 12}}/>
        </div>

        <div className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors flex justify-between items-center">
          <div>
            <div className="font-medium">Previous Conversations</div>
            <div className="text-sm text-gray-500 mt-1">
              Total: 5 conversations
            </div>
          </div>
          <AddOutlinedIcon sx={{fontSize: 12}}/>
        </div>

        <div className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors flex justify-between items-center">
          <div>
            <div className="font-medium">Conversation participants</div>
            <div className="text-sm text-gray-500 mt-1">
              2 participants
            </div>
          </div>
          <AddOutlinedIcon sx={{fontSize: 12}}/>
        </div>
      </div>
    </div>
  );
} 