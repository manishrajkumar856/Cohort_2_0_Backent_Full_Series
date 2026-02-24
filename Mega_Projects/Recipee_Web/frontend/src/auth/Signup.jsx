import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom';


const Signup = () => {
    const  {register, handleSubmit, reset} = useForm();

    const SubmitHandler = (formData)=>{
        console.log(formData);
    }

  return (
    <div className='fixed top-0 left-0 w-screen h-screen flex flex-col items-center justify-center gap-3 bg-[#1f1f1f62] backdrop-blur-2xl'>
        <form
        className="min-w-120 flex flex-col justify-center items-center gap-3 bg-[#1e2c45a6] px-5 py-10 border border-[#182c71] rounded-2xl"
        onSubmit={handleSubmit(SubmitHandler)}
      >
        <h1 className=' text-3xl font-medium mt-10'>Signup</h1>
        <input
          className="block mt-2 w-full border border-[#87878795] px-5 py-2 rounded bg-[#3231312d]"
          {...register("name")}
          type="text"
          placeholder="Enter full name"
        />
        {/* <small className="w-full text-sm text-red-400">
          This is how the error will be shown
        </small> */}

        <input
          className="block mt-2 w-full border border-[#87878795] px-5 py-2 rounded bg-[#3231312d]"
          {...register("email")}
          type="email"
          placeholder="Enter your email"
        />
        {/* <small className="w-full text-sm text-red-400">
          This is how the error will be shown
        </small> */}

        <input
          className="block mt-2 w-full border border-[#87878795] px-5 py-2 rounded bg-[#3231312d]"
          {...register("password")}
          type="password"
          placeholder="Enter password"
        />
        {/* <small className="w-full text-sm text-red-400">
          This is how the error will be shown
        </small> */}

        <select
          className="block mt-2 w-full border border-[#87878795] px-5 py-2 rounded bg-[#3231312d]"
          {...register("gender")}
          placeholder="//write instructions seperated by comma"
        >
          <option value="Lunch">Male</option>
          <option value="Break Fast">Female</option>
          <option value="Snacks">Others</option>
        </select>

        <button className="block mt-5 bg-[#32b672] rounded px-8 py-2">
          Save Recipe
        </button>

        <p className='text-[1em] font-normal'>Already have an account. <Link to={'/login'} className={"text-[#9d051c] font-semibold"}>Login</Link></p>
      </form>
    </div>
  )
}

export default Signup