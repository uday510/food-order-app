import { useEffect, useState } from "react";
import RestaurentCard from "./RestaurentCard";
import { useState } from "react";
import Shimmer from "./Shimmer";

const Body = () => {

  const [listOfRestaurents, setListOfRestaurents] = useState([]);

  const [filteredRestaurents, setFilteredRestaurents] = useState([]);

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch('https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.4485835&lng=78.39080349999999');

    const jsonData = await data.json();

    setListOfRestaurents(jsonData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    setFilteredRestaurents(jsonData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
  }

  return (
    !listOfRestaurents ? <Shimmer /> :
      <div className="body">
        <div className="filter">
          <div className="search-box">
            <input type="text" value={searchText} onChange={(event) => {
              setSearchText(event.target.value);
            }} />
            <button className="search-btn" onClick={() => {
              const filteredRestaurents = listOfRestaurents.filter((restaurant) => restaurant.info.name.toLowerCase().includes(searchText.toLowerCase()));
              setFilteredRestaurents(filteredRestaurents);

            }}>Search</button>
          </div>
          <button className="filter-btn" onClick={() => {
            const filteredRestaurents = listOfRestaurents.filter((restaurant) => restaurant.info.avgRating > 4)
            setFilteredRestaurents(filteredRestaurents);
          }}
          >Top Rated Restaurents</button>
        </div>
        <div className="res-container">
          {filteredRestaurents.map((restaurant) => {
            return <RestaurentCard key={restaurant.info.id} data={restaurant} />
          })}
        </div>
      </div>
  )
}

export default Body;