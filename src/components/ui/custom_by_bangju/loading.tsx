import CircularProgress from '@mui/material/CircularProgress';


interface ComponentProps {
    spin: boolean,
    rounded?: number
}

//CUSTOM BY BANGJU

const Spinloading: React.FC<ComponentProps> = ({ spin = false, rounded = 0 }) => {
    return (
        <div className={`absolute w-full h-full flex justify-center items-center bg-[rgba(255,255,255)] bg-opacity-50 transition duration-300 ease-in-out ${rounded != 0 && `rounded-[${rounded}px]`}`}>
            <CircularProgress/>
        </div>
    )
}

export default Spinloading;