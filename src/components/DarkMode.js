import { Button, CloseButton } from 'react-bootstrap';
import button from 'react';
import '../App.css';
import { useEffect} from 'react'


function DarkMode() {
    async function clickDarkMode() {
        const btn = document.querySelector(".btn-toggle");
        const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

        btn.addEventListener("click", function () {
            if (prefersDarkScheme.matches) {
                document.body.classList.toggle("light-theme");
            } else {
                document.body.classList.toggle("dark-theme");
            }
        });
    }


    useEffect(
        () => {
            clickDarkMode();
        }, []
    )


    return (
      
        <button class="btn-toggle">Toggle Dark-Mode</button>
 

        
    )
    }

export default DarkMode;