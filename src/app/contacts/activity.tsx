import { Button } from "@components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs"
import { Textarea } from "@components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@components/ui/select";
import { Input } from "@components/ui/input";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import NorthIcon from '@mui/icons-material/North';
import { colors } from "@mui/material";

const ActivityBar: React.FC<any> = ({dataContacts, dataLabels}: any) => {

    const [currentItemMerge, setcurrentItemMerge] = useState<any>();
    const [selectItemMerge, setselectItemMerge] = useState<any>();

    const onSelectHistory = (item: any) => {
        localStorage?.setItem('msgID', item?.id);
        window.location.href = '/dashboard';
    }
    // <SelectItem value="est" style={{color:"blue"}}>nucha jar (Facebook)</SelectItem>
    // <SelectItem value="cst" style={{color:"red"}}>Phakawat (Tiktok)</SelectItem>
    // <SelectItem value="mst" style={{color:"#ed6600"}}>RedBull99 (Shopee)</SelectItem>
    // <SelectItem value="pst" style={{color:"blue"}}>viton s.(Facebook)</SelectItem>
    // <SelectItem value="akst" style={{color:"#fca800"}}>Alaska maranu (Lazada)</SelectItem>
    // <SelectItem value="hst" style={{color:"red"}}>สมศรี ฆ่าหมีด้วยมือเปล่า (Tiktok)</SelectItem>

    let mockUserlist: any = [
        {
            id: 1,
            name: 'nucha jar',
            labels: {
                title: 'facebook',
                color: '#3b82f6'
            }
        },
        {
            id: 2,
            name: 'Phakawat',
            labels: {
                title: 'Tiktok',
                color: '#6b7280'
            }
        },
        {
            id: 3,
            name: 'RedBull99',
            labels: {
                title: 'Shopee',
                color: '#ef4444'
            }
        },
        {
            id: 4,
            name: 'viton s.',
            labels: {
                title: 'facebook',
                color: '#3b82f6'
            }
        },
        {
            id: 5,
            name: 'Alaska maranu',
            labels: {
                title: 'Lazada',
                color: '#e9a812'
            }
        },
        {
            id: 6,
            name: 'สมศรี ฆ่าหมีด้วยมือเปล่า',
            labels: {
                title: 'Tiktok',
                color: '#6b7280'
            }
        },
    ]

    return (
        <div className="bg-white w-full h-full p-4 border-l-[1px] border-gray-200">
            <Tabs defaultValue="attributes" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="attributes" className="w-auto">Attributes</TabsTrigger>
                    <TabsTrigger value="history" className="w-auto">History</TabsTrigger>
                    <TabsTrigger value="notes" className="w-auto">Notes</TabsTrigger>
                    <TabsTrigger value="merge" className="w-auto">Merge</TabsTrigger>
                </TabsList>
            <TabsContent value="attributes">
                <div className="text-[#60646c] text-[14px] mt-5">There are no contact custom attributes available in this account. You can create a custom attribute in settings.</div>
            </TabsContent>
            <TabsContent value="history">
                <div className="mt-5 text-[#60646c] text-[14px] hover:bg-gray-200 duration-200 ease-in-out cursor-pointer flex justify-between gap-3 p-2 rounded-md" onClick={() => onSelectHistory(dataContacts)}>
                    <div className="flex gap-3 w-full">
                        <div 
                            className="w-5 h-5 bg-gray-200 rounded-full relative bg-cover"
                            style={{backgroundImage: `url(${dataContacts?.meta?.sender?.thumbnail ? dataContacts?.meta?.sender?.thumbnail : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzGYOukhtzQwJiFMmFihZEqZBr1wNMkTjgQg&s'})`}}
                        />
                        <div className="w-full">
                            <div className="text-black">{dataContacts?.meta?.sender?.name}</div>
                            <div className="text-black text-[13px] text-ellipsis w-[95%] overflow-hidden text-nowrap">{dataContacts?.last_non_activity_message?.content}</div>
                            <div className="text-[#60646c] mt-2">{dataContacts?.labels?.length > 0 ? <div className="flex justify-start items-center gap-1"><div className="w-[5px] h-[5px] rounded-lg mt-1" style={{backgroundColor: dataLabels?.find((item: any) => item?.title == dataContacts?.labels[0])?.color}}/>{dataContacts?.labels[0]}</div> : ''}</div>
                        </div>
                    </div>
                    <div className="flex justify-end w-full]">
                        <div className="flex justify-between flex-col text-[#60646c]">
                            <div>2d</div>
                            <div>
                                <div 
                                    className="w-5 h-5 bg-gray-200 rounded-full relative bg-cover"
                                    style={{backgroundImage: `url(${dataContacts?.last_non_activity_message?.sender?.thumbnail ? dataContacts?.last_non_activity_message?.sender?.thumbnail : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzGYOukhtzQwJiFMmFihZEqZBr1wNMkTjgQg&s'})`}}
                                />
                            </div> 
                        </div>
                    </div>
                </div>
            </TabsContent>
            <TabsContent value="notes">
                <div className="bg-gray-100 p-2 rounded-md mt-5">
                    <Textarea placeholder="Type your message here." className="!border-none !shadow-none !outline-none text-black"/>
                    <div className="flex justify-end"><Button className="h-[30px] !bg-transparent shadow-none text-blue-400">{'Save note'}</Button></div>
                </div>
                <div className="text-[14px] text-[#60646c] mt-3">{'There are no notes associated to this contact. You can add a note by typing in the box above.'}</div>
            </TabsContent>
            <TabsContent value="merge">
                <div className="text-[#60646c] text-[14px] mt-5 w-full">
                    <div className="font-bold text-black">{'Merge contact'}</div>
                    <div className="mt-2">{'Combine two profiles into one, including all attributes and conversations. In case of conflict, the primary contact’s attributes will take precedence.'}</div>
                    <div className="flex justify-between mt-3">
                        <div className="text-black">{'Primary contact'}</div>
                        <div className="bg-gray-200 text-green-600 px-2 rounded-sm w-[110px] text-center">{'To be saved'}</div>
                    </div>
                    <div className="mt-2 w-full relative">
                        <Select value={selectItemMerge || null} onValueChange={(e: any) => setselectItemMerge(e)}>
                            <SelectTrigger className="w-full flex h-[45px]">
                                {/* <SelectValue /> */}
                                <SelectValue className="text-black">
                                    {selectItemMerge ?
                                        <div className="flex items-center gap-2">
                                            <div 
                                                className="w-5 h-5 rounded-full relative bg-cover"
                                                style={{backgroundImage: `url(${'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzGYOukhtzQwJiFMmFihZEqZBr1wNMkTjgQg&s'})`}}
                                            />
                                            <div className="font-[500]">{mockUserlist?.find((itemf: any) => itemf?.id == selectItemMerge)?.name}</div>
                                        </div>
                                        :<span className=" opacity-70">{'Search for primary contact'}</span>
                                    }
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <div className="flex items-center border-gray-300 border p-2 rounded-md gap-2"><SearchIcon sx={{fontSize: 14, color: '#60646c'}}/><input placeholder="Search for a contact" className="!shadow-none !border-none !outline-none text-[14px]"/></div>
                                <SelectGroup>
                                    <SelectLabel>User Account</SelectLabel>
                                    {mockUserlist?.filter((itemf: any) => currentItemMerge ? itemf?.id !== currentItemMerge : itemf?.id !== null)?.map((item: any) => {return(
                                        <SelectItem className=" cursor-pointer capitalize" style={{backgroundColor: selectItemMerge == item?.id ? 'rgba(59, 130, 246, 0.1)': 'none'}} value={item?.id}>
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-[2px]" style={{backgroundColor: item?.labels?.color}}></div>
                                                <div>{item?.name + ` (${item?.labels?.title})`}</div>
                                            </div>
                                        </SelectItem>
                                    )})}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex relative justify-center">
                        <div className="absolute mt-2 text-sm opacity-30">
                            <NorthIcon sx={{fontSize: 30}}/>
                            <NorthIcon sx={{fontSize: 30}}/>
                            <NorthIcon sx={{fontSize: 30}}/>
                        </div>
                    </div>
                    <div className="flex justify-between mt-5">
                        <div className="text-black">{'To be merged'}</div>
                        <div className="bg-gray-200 text-red-600 px-2 rounded-sm w-[110px] text-center">{'To be deleted'}</div>
                    </div>
                    <div className="mt-2 w-full h-[45px] border border-gray-200 rounded-md">
                        {currentItemMerge &&
                            <div className="flex items-center gap-2 h-full px-2">
                                <div 
                                    className="w-5 h-5 rounded-full relative bg-cover"
                                    style={{backgroundImage: `url(${'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzGYOukhtzQwJiFMmFihZEqZBr1wNMkTjgQg&s'})`}}
                                />
                                <div className="font-[500]">{mockUserlist?.find((itemf: any) => itemf?.id == currentItemMerge)?.name + ` (${mockUserlist?.find((itemf: any) => itemf?.id == currentItemMerge)?.labels?.title})`}</div>
                            </div>
                        }
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                        <Button 
                            className="h-[40px] bg-gray-200 hover:bg-gray-300 text-blue-500"
                            onClick={() => {setselectItemMerge(undefined), setcurrentItemMerge(undefined)}}
                        >
                            Cancle
                        </Button>
                        <Button 
                            className="h-[40px] bg-blue-500 hover:bg-blue-600 text-white"
                            onClick={() => {if(selectItemMerge){setcurrentItemMerge(selectItemMerge), setselectItemMerge(undefined)}}}
                        >
                            Merge contact
                        </Button>
                    </div>
                </div>
            </TabsContent>
            </Tabs>
        </div>
    )
}

export default ActivityBar