import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import MinimizeIcon from '@mui/icons-material/Minimize';
import { useEffect, useState } from 'react';

interface ComponentProps {
    title: string,
    toggle?: boolean,
    children: any
}

//CUSTOM BY BANGJU

const Collapes: React.FC<ComponentProps> = ({title, toggle, children }) => {
    
    const [toggleBar, settoggle] = useState<any>(toggle || false);
    
    return (
        <div 
            className="bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors border border-gray-200 duration-200 ease-in-out"
        >
            <div 
                className='flex justify-between items-center border-b border-gray-200 p-3'
                style={{borderBottom: toggleBar ? '1px solid #e5e7eb' : 0}}
                onClick={() => settoggle(!toggleBar)}
            >
                <div className="font-medium">{title}</div>
                {toggleBar ?
                    <MinimizeIcon sx={{fontSize: 12, color: '#3b82f6'}}/>
                    :
                    <AddOutlinedIcon sx={{fontSize: 12, color: '#3b82f6'}}/>
                }
            </div>
            <div id='children_collapes_body' className='p-3 !bg-white rounded-lg duration-200 ease-in-out'
                style={{display: toggleBar ? 'block' : 'none'}}
            >
                {children}
            </div>
        </div>
    )
}

export default Collapes;