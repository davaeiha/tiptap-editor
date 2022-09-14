import React, { useEffect } from "react";


const useMenu = (
    menu:boolean,
    setMenu:Function,
    menuRef:React.RefObject<HTMLDivElement>
    ) =>{
    useEffect(() => {

        const checkIfClickedOutside : any = (e : React.MouseEvent<HTMLElement>) => {
            if (menu && menuRef.current && !menuRef.current.contains(e.target as Element)) {
                setMenu(false);
            }
        }

        document.addEventListener("mousedown", checkIfClickedOutside);

        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside);
        }
    }, [menu]);
}

export default useMenu;