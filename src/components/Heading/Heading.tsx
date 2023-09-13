interface Props {
  currLocation: string | undefined;
}

const Heading = ({currLocation} : Props) => {
  return (
    <div>
        <h1 className=' text-xl mt-2 md:text-3xl xl:text-4xl justify-center items-center flex text-red-700 mb-5 gap-1'>
            My Location: 
            <span className='text-red-500 font-bold'>{" "}{currLocation}</span>
        </h1>
    </div>
  )
}

export default Heading;