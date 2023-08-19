import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BsSearch } from 'react-icons/bs';
export default function Filter({ data }) {

    const [filterData, setFilterData] = useState({ city: "", state: "", price: "", propertyType: "", bedRooms: "", bathrooms: "" })

    const states = [...new Set(data?.data.map(val => val.state))];
    const cities = [...new Set(data?.data.map(val => val.city))];
    const propertyType = [...new Set(data?.data.map(val => val.property_type))];
    return (
        <from
            className='flex h-24 bg-slate-400 shadow-md w-full justify-center gap-4 p-2  items-center '>
            <div className='text-3xl p-2 border bg-white rounded-r-full ' ><BsSearch /></div>
            <span>States:</span>
            <select className='h-10 shadow-md'>
                {states.map((val, ind) => <option key={ind} >{val}</option>)}
            </select>
            <span>Cities:</span>
            <select className='h-10 shadow-md'>
                {cities.map((val, ind) => <option key={ind} >{val}</option>)}
            </select>
            <span>Price:</span>
            <select className='h-10 shadow-md' >
                <option>1k-3k</option>
                <option>3k-5k</option>
                <option>5k-7k</option>
                <option>7k-10k</option>
                <option>Above 10K</option>
            </select>
            <span>Property Type:</span>
            <select className='capitalize h-10 shadow-md'>
                {propertyType.map((val, ind) => <option key={ind} >{val}</option>)}
            </select>
            <span>Rooms:</span>
            <select className='h-10 shadow-md'>
                <option>1-2</option>
                <option>2-3</option>
                <option>3-5</option>
                <option>Above-5</option>
            </select>
            <button className='p-2 bg-lime-500 border shadow-md  rounded-md' >SEARCH</button>
            <button className='p-2 bg-lime-500 border shadow-md  rounded-md' >CLEAR SEARCH</button>
        </from>
    )
}
