import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BsCurrencyRupee } from 'react-icons/bs';
import Filter from '../../Components/Filter/Filter';

export default function LandingPage() {

    const [data, setData] = useState(null);
    const [filteredData, setFilteredData] = useState(null);
    const [isloading, setIsloading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("https://realstatebackend.onrender.com/data");
                setIsloading(true)
                setData(response)
                if (filteredData === null) {
                    setFilteredData(response.data)
                }
            }
            catch (error) {
                console.log(error);
            }
            finally {
                setIsloading(false)
            }
        }
        fetchData();
    }, []);

    function filterSearch(value) {
        const price = value.price.split("-");
        const bedRooms = value.bedRooms.split("-");
        const filteredResults = data && data.data.filter((item) => {
            const stateMatch = value.state === "" || item.state === value.state;
            const propertyMatch = value.propertyType === "" || item.property_type === value.propertyType;
            const priceMatch = value.price === "" || item.rent_price >= Number(price[0]) && item.rent_price <= Number(price[1]);
            const roomMatch = value.bedRooms === "" || item.bedrooms >= Number(bedRooms[0]) && item.bedrooms <= Number(bedRooms[1]);
            return stateMatch && propertyMatch && priceMatch && roomMatch
        });
        setFilteredData(filteredResults);
    };

    function clearSearch() {
        setFilteredData(data.data)
    }
    return (
        <div
            className='flex justify-center flex-wrap '>
            <Filter data={data} filterSearch={filterSearch} clearSearchfunctionality={clearSearch} />
            {isloading === true ? <div>LOADING DATA</div> : null}
            {filteredData && filteredData.length === 0 ? <div>No Results Found</div> : null}
            {filteredData && filteredData.map((val) =>
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
                            className=' ml-8 w-max flex p-2 bg-orange-500 rounded-e-3xl m-1 justify-center items-center shadow-xl border border-white'>
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
                            className='flex p-1 m-1 bg-slate-200 rounded-full justify-around '>
                            <div
                                className='flex shadow-md'>
                                {val.bedrooms}-
                                <p
                                    className='text-xs round bg-yellow-400 rounded-e-3xl p-1 border border-black shadow-md '>
                                    {val.bedrooms > 1 ? "bedrooms" : "bedroom"}
                                </p>
                            </div>
                            <div
                                className='flex shadow-md'>
                                {val.bathrooms}-
                                <p
                                    className='text-xs round bg-yellow-400 rounded-e-3xl p-1 border border-black shadow-md'>
                                    {val.bathrooms > 1 ? "bathrooms" : "bathroom"}
                                </p>
                            </div>
                        </div>
                        <div
                            className='flex justify-center items-center m-1 bg-orange-500 shadow-xl  rounded-b-full p-1 border border-white'>
                            {val.address}
                        </div>
                    </div>
                </div>
            )
            }
        </div >
    )
};
