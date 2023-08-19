import React, { useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
export default function Filter({ data, filterSearch }) {

    const [filterData, setFilterData] = useState({ city: "", state: "", price: "", propertyType: "", bedRooms: "" })
    const states = [...new Set(data?.data.map(val => val.state))];
    const cities = [...new Set(data?.data.map(val => val.city))];
    const propertyType = [...new Set(data?.data.map(val => val.property_type))];
    const priceOptions = ["1000-3000", "3000-5000", "5000-7000", "7000-10000", "10000-12000"];
    const bedroomOptions = ["1-2", "2-3", "3-5", "5-7", "7-10"];

    const handleFilterChange = (key, value) => {
        setFilterData(prevFilterData => ({
            ...prevFilterData,
            [key]: value
        }));
    };

    function searchFunctionality() {
        filterSearch(filterData)
    }

    return (
        <from
            className='flex h-36 bg-slate-400 shadow-md w-full justify-center gap-4 p-2  items-center flex-col '>
            <div className='flex gap-2 justify-center items-center'>
                {/* <div
                    className='text-3xl p-2 border bg-white rounded-r-full shadow-md ' >
                    <BsSearch />
                </div> */}
                <span>
                    States:
                </span>
                <select
                    className='h-10 shadow-md rounded-md'
                    value={filterData.state}
                    onChange={e => handleFilterChange("state", e.target.value)}>
                    <option>Select state</option>
                    {states.map((val, ind) => <option key={ind} >{val}</option>)}
                </select>
                <span>
                    Cities:
                </span>
                <select
                    className='h-10 shadow-md rounded-md'
                    value={filterData.city}
                    onChange={e => handleFilterChange("city", e.target.value)} >
                    <option>Select city</option>
                    {cities.map((val, ind) => <option key={ind} >{val}</option>)}
                </select>
                <span>
                    Price:
                </span>
                <select
                    className='h-10 shadow-md rounded-md'
                    value={filterData.price}
                    onChange={e => handleFilterChange("price", e.target.value)} >
                    <option>Select price</option>
                    {priceOptions.map((val, ind) => <option key={ind} >{val}</option>)}
                </select>
                <span>
                    Property Type:
                </span>
                <select
                    className='capitalize h-10 shadow-md rounded-md'
                    value={filterData.propertyType}
                    onChange={e => handleFilterChange("propertyType", e.target.value)}>
                    <option>Property type</option>
                    {propertyType.map((val, ind) => <option key={ind} >{val}</option>)}
                </select>
                <span>
                    Rooms:
                </span>
                <select
                    className='h-10 shadow-md rounded-md'
                    value={filterData.bedRooms}
                    onChange={e => handleFilterChange("bedRooms", e.target.value)}>
                    <option>Rooms</option>
                    {bedroomOptions.map((val, ind) => <option key={ind} >{val}</option>)}
                </select>
            </div>
            <div
                className='flex gap-2 justify-center items-center'>
                <button
                    className='p-2 bg-lime-500 border shadow-md  rounded-md'
                    onClick={searchFunctionality} >
                    SEARCH
                </button>
                <button
                    className='p-2 bg-lime-500 border shadow-md  rounded-md' >
                    CLEAR SEARCH
                </button>
            </div>
        </from>
    )
}
