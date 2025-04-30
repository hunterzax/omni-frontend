import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@components/ui/breadcrumb"
import { Button } from "@components/ui/button"
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import { Input } from "@components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@components/ui/select";
import CircleIcon from '@mui/icons-material/Circle';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import dayjs from "dayjs";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import GitHubIcon from '@mui/icons-material/GitHub';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@components/ui/dropdown-menu";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';


const FormContacts: React.FC<any> = ({dataContacts, dataLabels}: any) => {

    const getDaysAgo = (create_day: number, last_activity_day: number): any => {
        const created = dayjs.unix(create_day);
        const lastActivity = dayjs.unix(last_activity_day);
        const now = dayjs();
        const diffDays = now.diff(created, 'day');
        return(<div className="flex items-center gap-2">
            <div>{`Created ${diffDays} day${diffDays !== 1 ? 's' : ''} ago`}</div>
            <CircleIcon sx={{fontSize: 4}}/>
            <div>{`Last active ${now.diff(lastActivity, 'day')} day${now.diff(lastActivity, 'day') !== 1 ? 's' : ''}`}</div>
        </div>)
        // return `Created ${diffDays} day${diffDays !== 1 ? 's' : ''} ago ${<CircleIcon sx={{fontSize: 8}}/>} Last active ${now.diff(lastActivity, 'day')} day${now.diff(lastActivity, 'day') !== 1 ? 's' : ''}`;
    };

    const [listLabels, setlistLabels] = useState([]);
    const [tk, settk] = useState<boolean>(false);

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
    
    return(
        <div id='contacts-body-form' className="py-4 px-6 w-full lg:w-[800px]">
            <div id='headers' className="grid grid-cols lg:grid-cols-2">
                <div className="flex items-center">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                            <BreadcrumbLink href="/">Contacts</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                            <BreadcrumbPage>{dataContacts?.meta?.sender?.name}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                <div className="flex gap-2 justify-start pt-3 lg:justify-end lg:pt-0 duration-200 ease-in-out">
                    <Button className="h-[30px] bg-white hover:bg-gray-200 font-light text-black shadow-none border border-gray-300">Block contact</Button>
                    <Button className="bg-blue-500 hover:bg-blue-400 h-[30px]">Send message</Button>
                </div>
            </div>
            <div id='body' className="mt-5">
                <div>
                    {/* <img className="rounded-md w-[100px]" src={dataContacts?.meta?.sender?.thumbnail}/> */}
                    <div 
                        className="w-[100px] h-[100px] bg-gray-200 rounded-md relative bg-cover"
                        style={{backgroundImage: `url(${dataContacts?.meta?.sender?.thumbnail ? dataContacts?.meta?.sender?.thumbnail : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzGYOukhtzQwJiFMmFihZEqZBr1wNMkTjgQg&s'})`}}
                    />
                </div>
                <div className="flex justify-start items-center text-black mt-3 font-bold capitalize">{dataContacts?.meta?.sender?.name}</div>
                <div id="details" className="text-[14px]">
                    <div className="text-[#60646c]">
                        <div className="flex justify-start items-center gap-3"><PersonIcon sx={{fontSize: 14}}/>{dataContacts?.meta?.sender?.identifier}</div>
                        <div className="flex justify-start items-center gap-3"><ShowChartIcon sx={{fontSize: 14}}/>{getDaysAgo(dataContacts?.meta?.sender?.created_at, dataContacts?.meta?.sender?.last_activity_at)}</div>
                        <div className="mt-3 flex flex-wrap gap-3">
                            {listLabels?.length > 0 && listLabels?.map((item: any) => {return(
                                <div className="h-[20px] bg-gray-100 font-light flex gap-2 justify-start items-center rounded-sm px-2">
                                    <div className="w-2 h-2 rounded-[2px]" style={{backgroundColor: item?.color}}/>
                                    <div className="text-black">{item?.title}</div>
                                    <div className="cursor-pointer" onClick={() => onselectLabels(item, 'del')}><CloseIcon sx={{fontSize: 12}}/></div>
                                </div>
                            )})}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className="outline-dashed outline-gray-400 h-[20px] w-[60px] !bg-transparent text-black outline-1 shadow-none font-thin"><AddIcon sx={{fontSize: 16}}/> {'tag'}</Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    {dataLabels?.length > 0 && dataLabels?.map((item: any) => {return(
                                        <DropdownMenuLabel className="bg-transparent hover:bg-gray-200" style={{backgroundColor: listLabels?.find((itemf: any) => itemf?.id == item?.id) ? '#e5e7eb' : 'transparent'}} onClick={() => onselectLabels(item, 'add')}>
                                            <div className="flex gap-2 justify-start items-center font-light"><div className="w-2 h-2 rounded-[2px]" style={{backgroundColor: item?.color}}/>{item?.title}</div>
                                        </DropdownMenuLabel> 
                                    )})}
                                    {/* <DropdownMenuSeparator /> */}
                                    
                                </DropdownMenuContent>
                            </DropdownMenu>
                            {/* <Button className="outline-dashed outline-gray-400 h-[20px] w-[60px] !bg-transparent text-black outline-1 shadow-none font-thin"><AddIcon sx={{fontSize: 16}}/> {'tag'}</Button> */}
                        </div>
                    </div>

                    <div className="mt-10">
                        <div className="font-[500] text-black text-[16px]">{'Edit contact details'}</div>
                        <div className="grid grid-cols-2 gap-4 mt-4 text-[#60646c]">
                            <div><Input defaultValue={dataContacts?.meta?.sender?.name.split(" ")?.[0]}/></div>
                            <div><Input defaultValue={dataContacts?.meta?.sender?.name.split(" ")?.[1]}/></div>
                            <div><Input defaultValue={dataContacts?.meta?.sender?.email}/></div>
                            <div><Input defaultValue={dataContacts?.meta?.sender?.phone_number}/></div>
                            <div><Input placeholder="Enter the city name"/></div>
                            <div>
                                <Select>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select country" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                        <SelectLabel>North America</SelectLabel>
                                        <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                                        <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
                                        <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
                                        <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                                        <SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>
                                        <SelectItem value="hst">Hawaii Standard Time (HST)</SelectItem>
                                        </SelectGroup>
                                        <SelectGroup>
                                        <SelectLabel>Europe & Africa</SelectLabel>
                                        <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
                                        <SelectItem value="cet">Central European Time (CET)</SelectItem>
                                        <SelectItem value="eet">Eastern European Time (EET)</SelectItem>
                                        <SelectItem value="west">
                                            Western European Summer Time (WEST)
                                        </SelectItem>
                                        <SelectItem value="cat">Central Africa Time (CAT)</SelectItem>
                                        <SelectItem value="eat">East Africa Time (EAT)</SelectItem>
                                        </SelectGroup>
                                        <SelectGroup>
                                        <SelectLabel>Asia</SelectLabel>
                                        <SelectItem value="msk">Moscow Time (MSK)</SelectItem>
                                        <SelectItem value="ist">India Standard Time (IST)</SelectItem>
                                        <SelectItem value="cst_china">China Standard Time (CST)</SelectItem>
                                        <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
                                        <SelectItem value="kst">Korea Standard Time (KST)</SelectItem>
                                        <SelectItem value="ist_indonesia">
                                            Indonesia Central Standard Time (WITA)
                                        </SelectItem>
                                        </SelectGroup>
                                        <SelectGroup>
                                        <SelectLabel>Australia & Pacific</SelectLabel>
                                        <SelectItem value="awst">
                                            Australian Western Standard Time (AWST)
                                        </SelectItem>
                                        <SelectItem value="acst">
                                            Australian Central Standard Time (ACST)
                                        </SelectItem>
                                        <SelectItem value="aest">
                                            Australian Eastern Standard Time (AEST)
                                        </SelectItem>
                                        <SelectItem value="nzst">New Zealand Standard Time (NZST)</SelectItem>
                                        <SelectItem value="fjt">Fiji Time (FJT)</SelectItem>
                                        </SelectGroup>
                                        <SelectGroup>
                                        <SelectLabel>South America</SelectLabel>
                                        <SelectItem value="art">Argentina Time (ART)</SelectItem>
                                        <SelectItem value="bot">Bolivia Time (BOT)</SelectItem>
                                        <SelectItem value="brt">Brasilia Time (BRT)</SelectItem>
                                        <SelectItem value="clt">Chile Standard Time (CLT)</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div><Input placeholder="Enter the bio"/></div>
                            <div><Input placeholder="Enter the company name"/></div>
                        </div>
                        <div className="font-[500] text-black text-[16px] mt-6">{'Edit social links'}</div>
                        <div className="flex flex-wrap gap-2 mt-4">
                            <div className="bg-gray-100 h-[30px] flex justify-start items-center p-2 rounded-md gap-1">
                                <LinkedInIcon sx={{color: "#5a5a5a", fontSize: 16}}/>
                                <input placeholder="Add Linkedln" className="border-none outline-none text-black bg-gray-100 w-[120px] text-[12px]"/>
                            </div>
                            <div className="bg-gray-100 h-[30px] flex justify-start items-center p-2 rounded-md gap-1">
                                <FacebookRoundedIcon sx={{color: "#5a5a5a", fontSize: 16}}/>
                                <input placeholder="Add Facebook" className="border-none outline-none text-black bg-gray-100 w-[120px] text-[12px]"/>
                            </div>
                            <div className="bg-gray-100 h-[30px] flex justify-start items-center p-2 rounded-md gap-1">
                                <InstagramIcon sx={{color: "#5a5a5a", fontSize: 16}}/>
                                <input placeholder="Add Instagram" className="border-none outline-none text-black bg-gray-100 w-[120px] text-[12px]"/>
                            </div>
                            <div className="bg-gray-100 h-[30px] flex justify-start items-center p-2 rounded-md gap-1">
                                <XIcon sx={{color: "#5a5a5a", fontSize: 16}}/>
                                <input placeholder="Add Twitter" className="border-none outline-none text-black bg-gray-100 w-[120px] text-[12px]"/>
                            </div>
                            <div className="bg-gray-100 h-[30px] flex justify-start items-center p-2 rounded-md gap-1">
                                <GitHubIcon sx={{color: "#5a5a5a", fontSize: 16}}/>
                                <input placeholder="Add Github" className="border-none outline-none text-black bg-gray-100 w-[120px] text-[12px]"/>
                            </div>
                        </div>
                        <div className="mt-5"><Button className="bg-blue-500 hover:bg-blue-400 h-[30px]">{'Update contact'}</Button></div>
                        <div className="py-5">
                            <div className="h-[1px] bg-gray-200"/>
                        </div>
                        <div>
                            <div className="font-[500] text-black text-[16px]">{'Delete contact'}</div>
                            <div className="text-[14px] text-[#60646c]">{'Permanently delete this contact. This action is irreversible'}</div>
                            <div className="mt-5"><Button className="bg-red-500 hover:bg-red-600 h-[30px]">{'Delete contact'}</Button></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormContacts