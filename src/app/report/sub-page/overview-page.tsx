'use client';

import { Button } from '@components/ui/button';
import CircleIcon from '@mui/icons-material/Circle';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@components/ui/table';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@components/ui/pagination';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

interface ComponentProps {

}

const ReportsubOverview: React.FC<ComponentProps> = () => {

    const chartConfig = {
        desktop: {
            label: "Desktop",
            color: "#2563eb",
        },
        mobile: {
            label: "Mobile",
            color: "#60a5fa",
        },
    } satisfies ChartConfig

    const chartData = [
        { month: "January", desktop: 186, mobile: 80 },
        { month: "February", desktop: 305, mobile: 200 },
        { month: "March", desktop: 237, mobile: 120 },
        { month: "April", desktop: 73, mobile: 190 },
        { month: "May", desktop: 209, mobile: 130 },
        { month: "June", desktop: 214, mobile: 140 },
        { month: "July", desktop: 284, mobile: 220 },
        { month: "August", desktop: 124, mobile: 80 },
        { month: "September", desktop: 15, mobile: 48 },
        { month: "October", desktop: 450, mobile: 210 },
        { month: "November", desktop: 318, mobile: 450 },
        { month: "December", desktop: 120, mobile: 90 },
    ];

    let mockAgent: any = [
        {
            id: 1,
            name: "TZ.J",
            email: 'tzjeung@gmail.com',
            open_amount: 3,
            unattended: null,
            thumbnail: "https://cw.i24.dev/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--6aac4ff39be9289136810426818a2690447a63b0/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lKYW5CbFp3WTZCa1ZVT2hOeVpYTnBlbVZmZEc5ZlptbHNiRnNIYVFINk1BPT0iLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--5f3375fec9a9cd47682f6a1c0ccf7a892184cef2/56616e3afddc12dfe5a4112b03961fae.jpeg"
        },
        {
            id: 2,
            name: "Bank Ja",
            email: 'teerapong.songsan@gmail.com',
            open_amount: 0,
            unattended: null,
            thumbnail: null
        }
    ]

    return (
        <div className="w-full h-full flex justify-center overflow-y-auto">
            <div className="max-w-[900px] w-full h-ful p-7 max-h-[100dvh] space-y-3">
                <div className="text-[20px] text-[#60646c] font-[500]">{'Overview'}</div>
                <div className="flex h-auto gap-3 md:flex-wrap lg:flex-nowrap mt-5 text-[#60646c]">
                    <div className="shadow-sm w-full lg:w-[60%] h-full rounded-lg border border-gray-200 p-3">
                        <div className="flex items-center gap-2">
                            <div>{'Open Conversations'}</div>
                            <div className='text-[12px] flex items-center gap-1 bg-green-400 px-1 rounded-sm text-green-100'><CircleIcon sx={{fontSize: 6}}/>{'Live'}</div>
                        </div>
                        <div className='grid grid-cols-4 mt-5'>
                            <div>
                                <div className='text-[12px] text-gray-400'>{'Open'}</div>
                                <div className='text-[30px] font-[500]'>{4}</div>
                            </div>
                            <div>
                                <div className='text-[12px] text-gray-400'>{'Unattended'}</div>
                                <div className='text-[30px] font-[500]'>{0}</div>
                            </div>
                            <div>
                                <div className='text-[12px] text-gray-400'>{'Unassigned'}</div>
                                <div className='text-[30px] font-[500]'>{1}</div>
                            </div>
                            <div>
                                <div className='text-[12px] text-gray-400'>{'Pending'}</div>
                                <div className='text-[30px] font-[500]'>{0}</div>
                            </div>
                        </div>
                    </div>
                    <div className="shadow-sm w-full lg:w-[40%] h-full rounded-lg border border-gray-200 p-3">
                        <div className="flex items-center gap-2">
                            <div>{'Agent status'}</div>
                            <div className='text-[12px] flex items-center gap-1 bg-green-400 px-1 rounded-sm text-green-100'><CircleIcon sx={{fontSize: 6}}/>{'Live'}</div>
                        </div>
                        <div className='grid grid-cols-3 mt-5'>
                            <div>
                                <div className='text-[12px] text-gray-400'>{'Online'}</div>
                                <div className='text-[30px] font-[500]'>{1}</div>
                            </div>
                            <div>
                                <div className='text-[12px] text-gray-400'>{'Busy'}</div>
                                <div className='text-[30px] font-[500]'>{0}</div>
                            </div>
                            <div>
                                <div className='text-[12px] text-gray-400'>{'Offline'}</div>
                                <div className='text-[30px] font-[500]'>{1}</div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="shadow-lg w-[30%] h-full">test</div> */}
                </div>
                <div className="shadow-sm w-full h-auto rounded-lg border border-gray-200 p-3 text-[#60646c]">
                    <div className='flex justify-between'>
                        <div className="flex items-center gap-2">
                            <div>{'Conversation Traffic'}</div>
                            <div className='text-[12px] flex items-center gap-1 bg-green-400 px-1 rounded-sm text-green-100'><CircleIcon sx={{fontSize: 6}}/>{'Live'}</div>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <Button className='bg-gray-100 border border-gray-200 shadow-none text-gray-400 hover:bg-gray-200 cursor-not-allowed h-[30px]'>{'Last 7 Days'}</Button>
                            <Button className='bg-gray-100 border border-gray-200 shadow-none text-gray-400 hover:bg-gray-200 cursor-not-allowed h-[30px]'>{'Download report'}</Button>
                        </div>
                    </div>
                    <div className='mt-5'>
                        <ChartContainer config={chartConfig} className="h-[200px] w-full">
                            <BarChart accessibilityLayer data={chartData}>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                    tickFormatter={(value) => value.slice(0, 3)}
                                />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                                <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                            </BarChart>
                        </ChartContainer>
                    </div>
                </div>
                <div className="shadow-sm w-full h-auto rounded-lg border border-gray-200 p-3 text-[#60646c]">
                    <div className="flex items-center gap-2">
                        <div>{'Conversations by agents'}</div>
                        <div className='text-[12px] flex items-center gap-1 bg-green-400 px-1 rounded-sm text-green-100'><CircleIcon sx={{fontSize: 6}}/>{'Live'}</div>
                    </div>
                    <div className='mt-5'>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                <TableHead className="w-[500px] bg-gray-100 rounded-l-sm">Agent</TableHead>
                                <TableHead className='bg-gray-100'>Open</TableHead>
                                <TableHead className='bg-gray-100 rounded-r-sm'>Unattended</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mockAgent?.map((item: any) => (
                                <TableRow key={item?.id}>
                                    <TableCell>
                                        <div className='flex w-full gap-3'>
                                            <div className='flex justify-center items-center'>
                                                <div 
                                                    className="w-9 h-9 rounded-full relative bg-cover"
                                                    style={{backgroundImage: `url(${item?.thumbnail ? item?.thumbnail : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzGYOukhtzQwJiFMmFihZEqZBr1wNMkTjgQg&s'})`}}
                                                />
                                            </div>
                                            <div>
                                                <div className="font-[500] text-[14px]">{item?.name}</div>
                                                <div className='text-[12px] opacity-70'>{item?.email}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{item?.open_amount > 0 ? item?.open_amount : '---'}</TableCell>
                                    <TableCell>{item?.unattended || '---'}</TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <div>
                            <Pagination className='!justify-start items-center gap-3'>
                                <div className='w-[300px] text-[14px]'>{'Showing 1 to 2 of 2 results'}</div>
                                <PaginationContent className='w-full flex justify-end gap-4'>
                                    <PaginationItem>
                                        <div className='border border-gray-300 px-4 rounded-md text-[11px] h-[25px] flex justify-center items-center cursor-not-allowed'>10/ page</div>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <KeyboardDoubleArrowLeftIcon sx={{fontSize: 16}}/>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <KeyboardArrowLeftIcon sx={{fontSize: 16}}/>
                                    </PaginationItem>
                                    <PaginationItem>
                                    <PaginationLink isActive size={'sm'}>1</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <KeyboardArrowRightIcon sx={{fontSize: 16}}/>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <KeyboardDoubleArrowRightIcon sx={{fontSize: 16}}/>
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    </div>
                </div>
                <div className="shadow-sm w-full h-auto rounded-lg border border-gray-200 p-3 text-[#60646c]">
                    <div className="flex items-center gap-2">
                        <div>{'Conversations by teams'}</div>
                        <div className='text-[12px] flex items-center gap-1 bg-green-400 px-1 rounded-sm text-green-100'><CircleIcon sx={{fontSize: 6}}/>{'Live'}</div>
                    </div>
                    <div className='mt-5'>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                <TableHead className="w-[500px] bg-gray-100 rounded-l-sm">Team</TableHead>
                                <TableHead className='bg-gray-100'>Open</TableHead>
                                <TableHead className='bg-gray-100 rounded-r-sm'>Unattended</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                            </TableBody>
                        </Table>
                                <div className='w-full h-[200px] flex justify-center items-center'>{'There is no data available'}</div>
                        <div>
                            <Pagination className='!justify-start items-center gap-3'>
                                <div className='w-[300px] text-[14px]'>{'Showing 1 to 2 of 0 results'}</div>
                                <PaginationContent className='w-full flex justify-end gap-4'>
                                    <PaginationItem>
                                        <div className='border border-gray-300 px-4 rounded-md text-[11px] h-[25px] flex justify-center items-center cursor-not-allowed'>10/ page</div>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <KeyboardDoubleArrowLeftIcon sx={{fontSize: 16}}/>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <KeyboardArrowLeftIcon sx={{fontSize: 16}}/>
                                    </PaginationItem>
                                    <PaginationItem>
                                    <PaginationLink isActive size={'sm'}>1</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <KeyboardArrowRightIcon sx={{fontSize: 16}}/>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <KeyboardDoubleArrowRightIcon sx={{fontSize: 16}}/>
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReportsubOverview;