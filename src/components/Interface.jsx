import { ValidationError, useForm } from "@formspree/react";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { currentProjectAtom, projects } from "./Projects";
import { Typewriter } from 'react-simple-typewriter'
import {FaCloudDownloadAlt} from "react-icons/fa";
import {FaLinkedin,FaGithub,FaReddit} from "react-icons/fa";
import {SiLeetcode} from "react-icons/si";
import {AiOutlineMail  } from "react-icons/ai"

const Section = (props) => {
  const { children, mobileTop } = props;
  return (
    <motion.section
       className={`
  h-screen w-screen p-4 max-w-screen-1xl mx-1
  flex flex-col items-start
  ${mobileTop ? "justify-start md:justify-center" : "justify-center"}
  `}
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 1,
          delay: 0.6,
        },
      }}
    >
      {children}
    </motion.section>
  );
};

export const Interface = (props) => {
  const { setSection } = props;
  return (
    <div className="flex flex-col items-center w-screen">
      <AboutSection setSection={setSection} />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
     
   
    </div>
   
  );
};

const AboutSection = (props) => {
  const { setSection } = props;
  const pdfURL ="https://portfolio-pied-mu-47.vercel.app/resume.pdf";

  const downloadResume=(url)=>{
    
    const filename = url.split('/').pop();
    console.log(filename);
    const aTag = document.createElement('a');
    console.log(aTag);
    aTag.href = url;
    console.log(aTag.href)
    aTag.setAttribute("download",filename);
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
   }

  return (
    <Section mobileTop>
      <h1 className="text-3xl md:text-6xl font-extrabold leading-snug mt-2 md:mt-0">
        Hey, I'm
        <br />
        <span className="  italic text-black-600">Saurabh Singh</span>
      </h1>
      <motion.p
        className="text-lg text-gray-600 mt-6"
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          delay: 1.5,
        }}
      >
        <h1 className="text-base md:text-2xl font-extrabold leading-snug ">
         I'm a{' '}
          <span className="text-base md:text-2xl font-extrabold text-red-600 mt-2 md:mt-0">
         
          <Typewriter
            words={['Coder' ,'Frontend Developer', 'Backend Developer', 'MERN Stack Developer']}
            loop={Infinity}
            cursor
            cursorStyle='|'
            cursorColor="green"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </span>
       </h1> 
       
        <br />
      
      </motion.p>
      <motion.button
        className={`bg-indigo-600 text-white py-4 px-14 
      rounded-lg font-bold text-lg mt-7 md:mt-12`}
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          delay: 1,
        }}
      >
        <div className="flex justify-center gap-4" >
        <FaCloudDownloadAlt className="m-auto"/>
       <button  onClick={()=>{downloadResume(pdfURL)}}>
          Resume  
        </button>
        </div>
      </motion.button>
    </Section>
  );
};

const skills = [
  {
    title: "Threejs / React Three Fiber",
    level: 40,
  },
  {
    title: "React",
    level: 60,
  },
  {
    title: "Nodejs",
    level: 90,
  },
  {
    title: "Expressjs",
    level: 60,
  },
  {
    title: "React-Redux",
    level: 40,
  },
  {
    title :"C/C++",
    level:100,
  },
  {
    title:"javascript",
    level :60,
  },
  {
    title:"HTML CSS",
    level :80,
  },
];


const SkillsSection = () => {
  return (
    <Section>
    <motion.div whileInView={"visible"}>
      <h2 className="text-5xl font-bold text-white">Skills</h2>
      <div className=" mt-8 space-y-4">
        {skills.map((skill, index) => (
          <div className="w-64" key={index}>
            <motion.h3
              className="text-xl font-bold text-gray-100"
              initial={{
                opacity: 0,
              }}
              variants={{
                visible: {
                  opacity: 1,
                  transition: {
                    duration: 1,
                    delay: 1 + index * 0.2,
                  },
                },
              }}
            >
              {skill.title}
            </motion.h3>
            <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
              <motion.div
                className="h-full bg-indigo-500 rounded-full "
                style={{ width: `${skill.level}%` }}
                initial={{
                  scaleX: 0,
                  originX: 0,
                }}
                variants={{
                  visible: {
                    scaleX: 1,
                    transition: {
                      duration: 1,
                      delay: 1 + index * 0.2,
                    },
                  },
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  </Section>
  );
};

const ProjectsSection = () => {
  const [currentProject, setCurrentProject] = useAtom(currentProjectAtom);

  const nextProject = () => {
    setCurrentProject((currentProject + 1) % projects.length);
  };

  const previousProject = () => {
    setCurrentProject((currentProject - 1 + projects.length) % projects.length);
  };

  return (

    <Section>
       <div className="flex w-full h-full mt-auto gap-8 items-center justify-center ">
        <button
          className="hover:text-indigo-600 transition-colors mt-72"
          onClick={previousProject}
        >
          ← Previous
        </button>
        <h2 className="text-3xl md:text-6xl mt-48 font-bold mt-72">Projects</h2>
        <button
          className="hover:text-indigo-600 mt-48 transition-colors mt-72"
          onClick={nextProject}
        >
          Next →
        </button>
      </div> 
    </Section>
  );
};


const ContactSection = () => {
  const [state, handleSubmit] = useForm("mbjvqqjz");
  return (
    <Section>
    <h2 className="text-5xl font-bold">Contact me</h2>
    <div className="mt-24 p-8 rounded-md bg-white w-96 max-w-full"> 
    {  (state.succeeded)? (
     <p className="text-gray-900 text-center">Thanks for joining!</p>):(    <form onSubmit={handleSubmit}  > 
      <label htmlFor="name" className="font-medium text-gray-900 block mb-1">
        Name
      </label>
      <input
        type="text"
        name="name"
        id="name"
        className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3"
      />
      <label
       htmlFor ="email"
        className="font-medium text-gray-900 block mb-1 mt-8"
      >
        Email
      </label>
      <input
        type="email"
        name="email"
        id="email"
        className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3"
      />
      <label
        for="email"
        className="font-medium text-gray-900 block mb-1 mt-8"
      >
        Message
      </label>
      <textarea
        name="message"
        id="message"
        className="h-32 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3"
      />
      <button className="  bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold text-lg mt-6  " disabled={state.submitting}>
        Submit
      </button>
    </form>)}
    
    </div> 
  </Section>
  
  );
};






