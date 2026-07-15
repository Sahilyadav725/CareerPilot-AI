import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

function ScrollToTop() {

    const [show,setShow]=useState(false);

    useEffect(()=>{

        const handleScroll=()=>{

            if(window.scrollY>500){

                setShow(true);

            }else{

                setShow(false);

            }

        };

        window.addEventListener("scroll",handleScroll);

        return ()=>window.removeEventListener("scroll",handleScroll);

    },[]);

    const scrollTop=()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    };

    return(

        show && (

            <button

            onClick={scrollTop}

            className="
            fixed
            bottom-8
            right-8
            w-12
            h-12
            rounded-full
            bg-blue-600
            hover:bg-blue-700
            text-white
            shadow-lg
            flex
            items-center
            justify-center
            transition-all
            duration-300
            z-50
            "

            >

                  <FaArrowUp/>

            </button>

        )

    );

}

export default ScrollToTop;