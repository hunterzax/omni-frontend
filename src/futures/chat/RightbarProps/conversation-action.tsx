import { Button } from "@components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@components/ui/dropdown-menu";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@components/ui/select";
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

interface ComponentProps {
    contactInfo: any
    dataLabels?: any
}

//CUSTOM BY BANGJU

const RBP_ConversationAction: React.FC<ComponentProps> = ({contactInfo ,dataLabels}) => {

    const [selectedAgent, setselectedAgent] = useState<any>();
    const [selectedPriority, setselectedPriority] = useState<any>();
    const [listLabels, setlistLabels] = useState([]);
    const [tk, settk] = useState<boolean>(false);

    let mockAgent: any = [
        {
            id: 1,
            name: "TZ.J",
            email: 'tzjeung@gmail.com',
            thumbnail: "https://cw.i24.dev/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--6aac4ff39be9289136810426818a2690447a63b0/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lKYW5CbFp3WTZCa1ZVT2hOeVpYTnBlbVZmZEc5ZlptbHNiRnNIYVFINk1BPT0iLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--5f3375fec9a9cd47682f6a1c0ccf7a892184cef2/56616e3afddc12dfe5a4112b03961fae.jpeg"
        }
    ]

    let mockPriority: any = [
        {
            id: 0,
            title: 'Urgent',
        },
        {
            id: 1,
            title: 'High',
        },
        {
            id: 2,
            title: 'Medium',
        },
        {
            id: 3,
            title: 'Low',
        },
    ]

    const onselectLabels = (item: any, mode: 'add' | 'del') => {
        let newdata: any = listLabels;
        if(mode == 'add'){
            let checkItem: any = newdata?.find((itemf: any) => itemf?.id == item?.id);
            if(!checkItem){
                let newItem: any = {
                    id: item?.id,
                    color: item?.color,
                    title: item?.title
                }
    
                newdata.push(newItem);
                setlistLabels(newdata);
            }else{
                onselectLabels(item, 'del')
            }
        }else{
            let deldata = newdata?.filter((itemf: any) => itemf?.id != item?.id);
            setlistLabels(deldata);
        }
        settk(!tk);
    }

    useEffect(() => {
        if(contactInfo){
            if(contactInfo?.meta?.assignee){
                setselectedAgent(contactInfo?.meta?.assignee)
            }else{
                setselectedAgent(null)
            }

            if(contactInfo?.priority){
                setselectedPriority(contactInfo?.priority);
            }else{
                setselectedPriority(null)
            }

            if(contactInfo?.labels?.length > 0){
                let newData: any = [];
                for (let index = 0; index < contactInfo?.labels?.length; index++) {
                    let findItem: any = dataLabels?.find((itemf: any) => itemf?.title == contactInfo?.labels[index]);
                    if(findItem){
                        let newItem: any = {
                            id: findItem?.id,
                            color: findItem?.color,
                            title: findItem?.title
                        }
    
                        newData.push(newItem);
                    }
                }
    
                setlistLabels(newData);
            }else{
                setlistLabels([]);
            }
        }

        settk(!tk);
    }, [contactInfo]);

    return(
        <div className=" space-y-2">
            <div>
                <div className="text-sm font-[500]">{'Assigned Agent'}</div>
                <div className="mt-2">
                    <Select value={String(selectedAgent?.id) || ''} onValueChange={(e: any) => console.log(e)}>
                        <SelectTrigger className="w-full flex">
                            <SelectValue className="text-black">
                                {selectedAgent ?
                                    <div className="flex items-center gap-2">
                                        <div 
                                            className="w-5 h-5 rounded-full relative bg-cover"
                                            style={{backgroundImage: `url(${selectedAgent?.thumbnail ? selectedAgent?.thumbnail : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzGYOukhtzQwJiFMmFihZEqZBr1wNMkTjgQg&s'})`}}
                                        />
                                        <div className="font-[500]">{selectedAgent?.name}</div>
                                    </div>
                                    :null
                                }
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent className="px-2 pb-1">
                            <div className="text-[12px] mt-2 mb-2">{'Select Agent'}</div>
                            <div className="flex items-center border-gray-300 border p-2 rounded-md gap-2 mb-2"><SearchIcon sx={{fontSize: 14, color: '#60646c'}}/><input placeholder="Search agents" className="!shadow-none !border-none !outline-none text-[14px]"/></div>
                            <SelectGroup>
                                {mockAgent?.length > 0 && mockAgent?.map((item: any) => {return(
                                    <SelectItem  key={item?.id} value={String(item?.id)}>
                                        <div className="flex items-center gap-2">
                                            <div 
                                                className="w-5 h-5 rounded-full relative bg-cover"
                                                style={{backgroundImage: `url(${item?.thumbnail ? item?.thumbnail : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzGYOukhtzQwJiFMmFihZEqZBr1wNMkTjgQg&s'})`}}
                                            />
                                            <div className="font-[500]">{item?.name}</div>
                                        </div>
                                    </SelectItem>
                                )})}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div>
                <div className="text-sm font-[500]">{'Assigned Team'}</div>
                <div className="mt-2">
                    <Select>
                        <SelectTrigger className="w-full flex">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="px-2 pb-1">
                            <div className="text-[12px] mt-2 mb-2">{'Select Team'}</div>
                            <div className="flex items-center border-gray-300 border p-2 rounded-md gap-2 mb-2"><SearchIcon sx={{fontSize: 14, color: '#60646c'}}/><input placeholder="Search teams" className="!shadow-none !border-none !outline-none text-[14px]"/></div>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div>
                <div className="text-sm font-[500]">{'Priority'}</div>
                <div className="mt-2">
                    <Select value={String(selectedPriority).toLowerCase() || ''} onValueChange={(e: any) => setselectedPriority(e)}>
                        <SelectTrigger className="w-full flex">
                            <SelectValue className="text-black">
                                {selectedPriority ?
                                    <div className="flex items-center gap-2">
                                        <div className="font-[500] capitalize">{selectedPriority}</div>
                                    </div>
                                    :null
                                }
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent className="px-2 pb-1">
                            <div className="text-[12px] mt-2 mb-2">{'Priority'}</div>
                            <div className="flex items-center border-gray-300 border p-2 rounded-md gap-2 mb-2"><SearchIcon sx={{fontSize: 14, color: '#60646c'}}/><input placeholder="Search priority" className="!shadow-none !border-none !outline-none text-[14px]"/></div>
                            {mockPriority?.length > 0 && mockPriority?.map((item: any) => {return(
                                <SelectItem key={item?.id} value={String(item?.title).toLowerCase()}>
                                    <div className="flex items-center gap-2">
                                        <div className="font-[500]">{item?.title}</div>
                                    </div>
                                </SelectItem>
                            )})}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div>
                <div className="text-sm font-[500]">{'Conversation Labels'}</div>
                <div className="mt-3 flex flex-wrap gap-3">
                    {listLabels?.length > 0 && listLabels?.map((item: any) => {return(
                        <div key={item?.id} className="h-[20px] bg-gray-100 font-light flex gap-2 justify-start items-center rounded-sm px-2">
                            <div className="w-2 h-2 rounded-[2px]" style={{backgroundColor: item?.color}}/>
                            <div className="text-black">{item?.title}</div>
                            <div className="cursor-pointer" onClick={() => onselectLabels(item, 'del')}><CloseIcon sx={{fontSize: 12}}/></div>
                        </div>
                    )})}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="outline-dashed outline-gray-400 h-[20px] w-[110px] !bg-transparent text-black outline-1 shadow-none font-thin"><AddIcon sx={{fontSize: 16}}/> {'Add Labels'}</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            {dataLabels?.length > 0 && dataLabels?.map((item: any) => {return(
                                <DropdownMenuLabel key={item?.id} className="bg-transparent hover:bg-gray-200" style={{backgroundColor: listLabels?.find((itemf: any) => itemf?.id == item?.id) ? '#e5e7eb' : 'transparent'}} onClick={() => onselectLabels(item, 'add')}>
                                    <div className="flex gap-2 justify-start items-center font-light"><div className="w-2 h-2 rounded-[2px]" style={{backgroundColor: item?.color}}/>{item?.title}</div>
                                </DropdownMenuLabel> 
                            )})}
                            {/* <DropdownMenuSeparator /> */}
                            
                        </DropdownMenuContent>
                    </DropdownMenu>
                    {/* <Button className="outline-dashed outline-gray-400 h-[20px] w-[60px] !bg-transparent text-black outline-1 shadow-none font-thin"><AddIcon sx={{fontSize: 16}}/> {'tag'}</Button> */}
                </div>
            </div>
        </div>
    )
}

export default RBP_ConversationAction;