import { useEffect } from "react";


const useMenu = (menu,setMenu,menuRef) =>{
    useEffect(() => {

        const checkIfClickedOutside = e => {
            if (menu && menuRef.current && !menuRef.current.contains(e.target)) {
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