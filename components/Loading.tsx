import { InfinitySpin } from "react-loader-spinner"

function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center p-2">
      <h4 className="text-xl sm:text-2xl text-center animate-pulse uppercase tracking-widest">
        Integrate your integral
      </h4>
      <div className="w-max scale-[2] mt-6">
        <InfinitySpin
          width='200'
          color="#009fc2"
        />
      </div>
      <h4 className="text-xl text-center animate-pulse uppercase mt-2 -ml-2 tracking-widest">
        Loading...
      </h4>
    </div>
  )
}

export default Loading