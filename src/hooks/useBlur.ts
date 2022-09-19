import React, { useEffect } from "react";


const useBlur = (
    blur:boolean,
    setBlur:Function,
    blurRef:React.RefObject<HTMLDivElement>
    ) =>{
    useEffect(() => {

        const checkIfClickedOutside : any = (e : React.MouseEvent<HTMLElement>) => {
            if (blur && blurRef.current && !blurRef.current.contains(e.target as Element)) {
                setBlur(false);
            }
        }

        document.addEventListener("mousedown", checkIfClickedOutside);

        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside);
        }
    }, [blur]);
}

export default useBlur;