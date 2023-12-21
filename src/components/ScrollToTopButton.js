import React,{useState, useEffect} from 'react';
import {FaChevronCircleUp} from "react-icons/fa"


function ScrollToTopButton() {
    const [showBtn, setShowBtn] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", function () {
            if (window.scrollY > 800) {
                setShowBtn(true);
            } else {
                setShowBtn(false);
            }
        })

    }, [])
    const ScrollToTop = () => {
        window.scroll({ top: 0, behavior: "smooth" })
    }
    return (
        <div className='w-full'>
            <button onClick={ScrollToTop} className={showBtn ? ' fixed bottom-2 right-2 z-50  ' : ' hidden'}>
                <FaChevronCircleUp size={30} style={{color:"#014b85", }}/>
            </button>
        </div>
    );
}

export default ScrollToTopButton;