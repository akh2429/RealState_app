import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BsCurrencyRupee } from 'react-icons/bs';

export default function LandingPage() {

    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("http://localhost:8080/data");
                setData(response)
            }
            catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, []);

    console.log(data)


    return (
        <div
            className='flex justify-center flex-wrap '>
            {data && data.data.map((val) =>
                <div
                    className='p-2 m-2 border flex h-max w-max bg-slate-900 rounded-md shadow-xl '
                    key={val.id} >
                    <div>
                        <div>
                            <img
                                className='top-0 left-0 h-56 w-64 object-cover z-0'
                                src={val.image_url} />
                        </div>
                        <div
                            className=' ml-8 w-max flex p-2 bg-orange-500 rounded-e-3xl m-1 justify-center items-center shadow-xl'>
                            {Math.ceil(val.rent_price)}<BsCurrencyRupee />
                            <p
                                className='font-thin text-xs shadow-xl text-white'>
                                /Month
                            </p>
                        </div>
                        <div
                            className=' ml-8 capitalize bg-slate-200 m-1 rounded-e-3xl p-1 flex shadow-xl' >
                            <p
                                className=' text-red-700'>
                                Category:
                            </p>
                            {val.property_type}
                        </div>
                        <div
                            className=' ml-8 flex bg-slate-200 m-1 rounded-e-3xl p-1 shadow-xl'>
                            <p
                                className='text-red-700'>
                                City:
                            </p>
                            {val.city}
                        </div>
                        <div
                            className=' ml-8  flex bg-slate-200 m-1 rounded-e-3xl p-1 shadow-xl' >
                            <p
                                className='text-red-700' >
                                State:
                            </p>
                            {val.state}
                        </div>
                        <div
                            className='flex justify-center items-center m-1 bg-orange-500 shadow-xl  rounded-b-full p-1'>
                            {val.address}
                        </div>
                    </div>
                </div>
            )
            }
        </div >
    )
};
