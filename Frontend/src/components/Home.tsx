import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen max-w-screen-lg" style={{ marginTop: "-7rem" }}>
        <br className="md:invisible" />
        <br className="md:invisible" />
        {/* <h1 className="font-semibold text-2xl md:text-5xl text-center mb-8 bg-green-500 p-2 animate-fade-up animate-delay-100">Empower Your IT Hiring</h1> */}
        <h1 className="bg-green-500 md:bg-inherit relative font-semibold text-2xl md:text-5xl text-center mb-8  animate-fade-up animate-delay-100">
          <span className="absolute inset-0 bg-green-500 z-0" style={{ clipPath: "polygon(0 65%, 100% 65%, 100% 100%, 0 100%)" }}></span>
          <span className="relative z-10">Empower Your IT Hiring</span>
        </h1>
        <h1 className="font-semibold text-xl md:text-4xl text-center mb-8 lg:text-5xl animate-fade-up animate-delay-300"> Transparent Reference Management for Better Talent Acquisition</h1>

        <div className="flex flex-col items-start animate-fade-up animate-delay-300">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faCheck} size='xl' className="text-green-600 mr-2" />
            <p className="list-disc">Transparent Reference Management</p>
          </div>
          <div className="flex items-center">
            <FontAwesomeIcon icon={faCheck} size='xl' className="text-green-600 mr-2" />
            <p className="list-disc">AI-Powered Question Generation</p>
          </div>
          <div className="flex items-center">
            <FontAwesomeIcon icon={faCheck} size='xl' className="text-green-600 mr-2" />
            <p className="list-disc">Data Visualization Tools</p>
          </div>
          <div className="flex items-center">
            <FontAwesomeIcon icon={faCheck} size='xl' className="text-green-600 mr-2" />
            <p className="list-disc">Confidentiality Assurance</p>
          </div>
        </div>


        <div className="space-y-4 m-5">
          <button className="btn mr-3 w-24 md:btn-lg md:w-32 md:mr-6 animate-flip-up animate-delay-500" >Log in</button>
          <button className="btn btn-neutral w-24 md:btn-lg md:w-32 animate-flip-up animate-delay-500" >Sign up</button>
        </div>
      </div>
    </>
  )
}
