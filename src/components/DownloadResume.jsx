import React from 'react'
import {FaCloudDownloadAlt} from "react-icons/fa";

// import {resume } from "../assets/resume.pdf";


 const pdf_url ="http://localhost:5173/resume"


const downloadResume=(url)=>{
    // const filename = url.split("/").pop();
    // console.log(filename);
    // const aTag = document.createElement('a');
    // aTag.href = url;
    // aTag.setAttribute("download",filename);
    // document.body.appendChild(aTag);
    // aTag.click();
    // a.tag.remove();
    window.open(pdf_url, '_blank');
   }

const DownloadResume = () => {
  return (
    <button  className="flex justify-center gap-4" onClick={()=>{downloadResume(pdf_url)}}>
          Resume
        <FaCloudDownloadAlt className="m-auto"/>
        </button>
  )
}

export default DownloadResume
