export default function Background({isDark}:{isDark:boolean}) {
    return(
        <div className={`
        flex justify-center items-center z-[3] min-h-[240px] overflow-hidden relative ${isDark == false ? 'bg-my-white' : 'bg-my-black'}`}>
            <div className={`
                left-[-7%] top-[-80px] w-[60vw] h-[60vw] rounded-[50%] bg-my-secondary z-[3] absolute
                max-w-[250px] max-h-[250px]
                `}
            ></div>
            <div className={`
                left-[28%] top-[-120px] w-[80vw] h-[80vw] rounded-[50%] bg-my-primary z-[2] absolute
                max-w-[350px] max-h-[350px]
                `}
            ></div>
        </div>
    )
}