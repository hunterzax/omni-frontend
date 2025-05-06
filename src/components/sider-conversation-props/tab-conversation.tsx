import ChatIcon from '@mui/icons-material/Chat';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import SendIcon from '@mui/icons-material/Send';
import FolderIcon from '@mui/icons-material/Folder';
import AddIcon from '@mui/icons-material/Add';
import DehazeIcon from '@mui/icons-material/Dehaze';
import Spinloading from '@components/ui/custom_by_bangju/loading';

interface ComponentProps {
    isLoading: boolean,
    tabCVS: any,
    selectCVS: (tab: any, id?: any) => void,
    dataInboxes: any,
    dataLabels: any,
}

const TabConversations: React.FC<ComponentProps> = ({isLoading, tabCVS, selectCVS, dataInboxes, dataLabels}) => {
    return(
        <div className='relative w-full h-full'>
        {!isLoading ?
            <div className='w-[160px] h-full overflow-hidden relative'>
                <Spinloading spin={isLoading}/>
            </div>
            :
            <div>
              <div className="py-2">
                <div className="1-bars">
                  <a
                    // href="#"
                    key={'1-mnu-list'}
                    className={`flex items-center justify-start gap-2 whitespace-nowrap text-sm px-2 py-1`}
                  >
                    <div className={`w-full px-2 py-1 rounded-sm hover:bg-gray-200 duration-200 ease-in-out ${tabCVS == 'all_cvs' ? '!bg-blue-500 text-white' : 'bg-transparent'}`} onClick={() => selectCVS('all_cvs')}
                    >
                      <ChatIcon sx={{ fontSize: 13, marginRight: '5px' }} /> All Conversations
                    </div>
                  </a>
                  <a
                    // href="#"
                    key={'2-mnu-list'}
                    className="flex items-center justify-start gap-2 whitespace-nowrap text-sm px-2 py-1 cus"
                  >
                    <div className={`w-full px-2 py-1 rounded-sm hover:bg-gray-200 duration-200 ease-in-out ${tabCVS == 'mentions_cvs' ? '!bg-blue-500 text-white' : 'bg-transparent'}`} onClick={() => selectCVS('mentions_cvs')}>
                      <AlternateEmailIcon sx={{ fontSize: 13, marginRight: '5px' }} /> Mentions
                    </div>
                  </a>
                  <a
                    // href="#"
                    key={'3-mnu-list'}
                    className="flex items-center justify-start gap-2 whitespace-nowrap text-sm px-2 py-1"
                  >
                    <div className={`w-full px-2 py-1 rounded-sm hover:bg-gray-200 duration-200 ease-in-out ${tabCVS == 'unattended_cvs' ? '!bg-blue-500 text-white' : 'bg-transparent'}`} onClick={() => selectCVS('unattended_cvs')}>
                      <MarkEmailUnreadIcon sx={{ fontSize: 13, marginRight: '5px' }} /> Unattended
                    </div>
                  </a>
                </div>
              </div>
              <div className="py-1 px-2">
                <div className="px-2 text-sm font-[400] mb-2">{'Inboxeds'}</div>
                {dataInboxes?.length > 0 &&  [...dataInboxes].sort((a, b) => a.name.localeCompare(b.name)).map((item: any) => {
                  return (
                    <div 
                      key={item?.id}
                      onClick={() => selectCVS(item?.name, item?.id)}
                      className={`bg-transparent w-full px-2 py-1 rounded-sm hover:bg-gray-200 duration-200 ease-in-out text-[14px] cursor-pointer ${tabCVS == item?.name ? '!bg-blue-500 text-white' : 'bg-transparent'}`}
                    >
                      <FolderIcon sx={{ fontSize: 12, marginRight: '5px' }} />{item?.name}
                      {/* test */}
                    </div>
                  )
                })}
                <div className="bg-transparent w-full px-2 py-1 rounded-sm hover:bg-gray-200 duration-200 ease-in-out text-[14px] cursor-pointer">
                  <AddIcon sx={{ fontSize: 12, marginRight: '5px' }} /> {'New Inbox'}
                </div>
              </div>
              <div className="py-1 px-2">
                <div className="px-2 text-sm font-[400] mb-2">{'Tagged with'}</div>
                {dataLabels?.length > 0 && dataLabels?.map((item: any) => {
                  return (
                    <div
                      key={item?.id}
                      onClick={() => selectCVS('#'+item?.title)}
                      className={`bg-transparent w-full px-2 py-1 rounded-sm hover:bg-gray-200 duration-200 ease-in-out text-[14px] cursor-pointer flex items-center justify-start ${tabCVS == String('#'+item?.title) ? '!bg-blue-500 text-white' : 'bg-transparent'}`}
                    >
                      <div className="w-2 h-2 rounded-[2px] mr-2" style={{backgroundColor: item?.color}}/> {item?.title}
                    </div>
                  )
                })}
                <div className="bg-transparent w-full px-2 py-1 rounded-sm hover:bg-gray-200 duration-200 ease-in-out text-[14px] cursor-pointer">
                  <AddIcon sx={{ fontSize: 12, marginRight: '5px' }} /> {'New label'}
                </div>
              </div>
            </div>
          }
        </div>
    )
}

export default TabConversations;