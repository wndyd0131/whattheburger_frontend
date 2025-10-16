import React, { useState, useRef, useEffect, useMemo } from 'react'
import mapboxgl from 'mapbox-gl';
import { AddressAutofill, useGeocodingCore } from '@mapbox/search-js-react';
import api from '../utils/api';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Cookie from 'js-cookie';
import { STORE_ID_EXPIRATION_TIME } from '../utils/cookieExpirationTime';

const StoreSelection = () => {
  const MAPBOX_API_KEY = import.meta.env.VITE_MAPBOX_API_KEY;
  const RADIUS_METER = 20000;

  const nav = useNavigate();

  const [selectedStoreId, setSelectedStoreId] = useState(null);
  const [stores, setStores] = useState([]);
  const [orderType, setOrderType] = useState("PICKUP");

  const [storeMarkers, setStoreMarkers] = useState([]);
  const [query, setQuery] = useState("");
  const [coordinates, setCoordinates] = useState([]);
  const geocodingCore = useGeocodingCore({ accessToken: MAPBOX_API_KEY});
  const [marker, setMarker] = useState(null);

  const selectedStore = useMemo(() => 
    stores.find(store => store.storeId === selectedStoreId) ?? null
  , [stores, selectedStoreId]);


  const fetchNearBy = (lon, lat, radiusMeter) => {
    return api.get(`/store/nearby?lon=${lon}&lat=${lat}&radiusMeter=${radiusMeter}`);
  }

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  }

  const mapRef = useRef(); // for controlling map
  const mapContainerRef = useRef(); // for pointing where to create the map
  const storeMarkersRef = useRef([]);
  const [, setMapLoaded] = useState(false);

  const handleClickStoreCard = (storeId) => {
    const store = stores.find(store => store.storeId === storeId) ?? null;
    setSelectedStoreId(storeId);
    mapRef.current.flyTo({ center: [store.coordinate.longitude, store.coordinate.latitude], zoom: 15 })
  }

  const handleClickButton = (storeId) => {
    Cookie.set("storeId", storeId, { expires: STORE_ID_EXPIRATION_TIME });
    nav(`/menu/${storeId}`);
  }

  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_API_KEY;
    mapRef.current = new mapboxgl.Map({
      container: "map",
      style: 'mapbox://styles/mapbox/standard',
      center: [-96.6963, 38.2853],
      zoom: 3.35,
      projection: 'mercator'
    });

    mapRef.current.on("load", () => {
      setMapLoaded(true);
    });

    console.log(mapRef.current);
   
    return () => {
      mapRef.current.remove();
    }
  }, [])

  return (
    <>
    <div className="flex font-[sans-serif] flex-col h-screen m-auto max-w-[1500px] w-full max-md:m-0">
      <div className="flex h-4/5">
        <div className="flex flex-col border min-w-[350px] max-w-[600px] w-full border-gray-200 shadow-md">
          <div className='p-5'>
            <h3 className='font-[sans-serif] py-5'>Select Location</h3>
            <div className='flex flex-col gap-5 font-[sans-serif]'>
              <div className='flex bg-orange-300 text-white rounded-4xl font-[sans-serif] font-bold'>
                <span
                  disabled={orderType === "PICKUP"}
                  className={`flex justify-center w-full p-2 text-sm rounded-4xl cursor-pointer ${orderType === "PICKUP" ? "bg-[#FE7800]" : ""}`}
                  onClick={() => setOrderType("PICKUP")}
                >
                  Pickup
                </span>
                <span
                  disabled={orderType === "DELIVERY"}
                  className={`flex justify-center w-full p-2 text-sm rounded-4xl cursor-pointer ${orderType === "DELIVERY" ? "bg-[#FE7800]" : ""}`}
                  onClick={() => setOrderType("DELIVERY")}
                >  
                  Delivery
                </span>
              </div>
              <form>
                <AddressAutofill
                  accessToken={MAPBOX_API_KEY}
                  onRetrieve={retrieveRes => {
                    console.log(retrieveRes);
                    const longitude = retrieveRes.features[0].geometry.coordinates[0];
                    const latitude = retrieveRes.features[0].geometry.coordinates[1];
                    geocodingCore.forward(query)
                      .then(forwardRes => {
                        if (forwardRes.features.length !== 0) {
                          const fullAddress = forwardRes.features[0].properties.full_address;
                          setQuery(fullAddress);
                        }
                      })
                      .catch(err => console.error(err));
                    if (marker && marker instanceof mapboxgl.Marker)
                      marker.remove();
                    storeMarkersRef.current.forEach(marker => marker.remove());
                    storeMarkersRef.current = [];
                    setMarker(new mapboxgl.Marker()
                      .setLngLat([longitude, latitude])
                      .addTo(mapRef.current));
                    mapRef.current.flyTo({center: [longitude, latitude], zoom: 12});
                    console.log("Fetching nearby stores...");
                    fetchNearBy(longitude, latitude, RADIUS_METER)
                        .then(res => {
                          console.log(res);
                          storeMarkersRef.current = res.data.map(store => {
                            console.log("Adding marker");
                            return new mapboxgl.Marker({ color: '#FE7800' })
                              .setLngLat([store.coordinate.longitude, store.coordinate.latitude])
                              .addTo(mapRef.current)
                          });
                          setStores(res.data);
                          console.log("LENGTH", storeMarkersRef.current.length);
                        })
                        .catch(err => console.error(err));
                    console.log("Finished fetching");
                    console.log(storeMarkersRef.current);
                  }}
                >
                <div className="flex p-2 border-1 border-gray-200 rounded-4xl h-[60px]">
                  <input
                    className="flex font-[sans-serif] font-bold p-3 w-full focus:outline-none"
                    placeholder="Search for a zip, city, or state"
                    autoComplete="address"
                    value={query}
                    onChange={(e) => handleQueryChange(e)}
                  />
                </div>
                </AddressAutofill>
              </form>
              <button className="flex justify-center">Use my location</button>
            </div>
          </div>
          <div className='grid grid-cols-1 gap-4 overflow-y-auto border-1 border-gray-200 rounded-lg p-5'>
            {stores.map(store => {
              console.log("STORE", store);
              const fullAddress = `${store.address.street}, ${store.address.city}, ${store.address.state} ${store.address.zipcode}`
              const distanceMiles = (store.distance / 1609.34).toFixed(2);
              const selected = store.storeId === selectedStore?.storeId;
              return (
                <div
                  className={`flex flex-col p-3 border rounded-2xl shadow-md w-full cursor-pointer hover:bg-gray-100 hover:transition duration-200 ${selected ? "border-[#FE7800]" : "border-gray-300"}`}
                  onClick={() => handleClickStoreCard(store.storeId)}
                >
                  <header>
                    <h3 className="font-[sans-serif] font-semibold">Store <span className="font-['Whatthefont'] text-[#FE7800]">#{store.houseNumber}</span></h3>
                  </header>
                  <address className='font-semibold'>{store.branch}</address>
                  <dl className="grid grid-rows-2 grid-cols-4 gap-y-2 py-2 text-sm">
                    <dt className="text-gray-500">
                      Address
                    </dt>
                    <dd>
                      <span>{fullAddress}</span>
                    </dd>
                    <dt className="text-gray-500">
                      Open Time
                    </dt>
                    <dd>
                      24/7
                    </dd>
                    <dt className="text-gray-500">
                      Contact
                    </dt>
                    <dd>
                      <span>{store.phoneNum}</span>
                    </dd>
                    <dt className="text-gray-500">
                      Operator
                    </dt>
                    <dd>
                      <span>Benjamin Franklin</span>
                    </dd>
                  </dl>
                  <div className="flex justify-end text-gray-500">
                    {distanceMiles} mi
                  </div>
                </div>
              )
          })}
          </div>
        </div>
        <div id="map" className="flex min-w-[400px] h-full w-full bg-gray-200" ref={mapContainerRef}>

        </div>
      </div>
      <div className="flex py-5 justify-center items-center">
        <motion.button
          disabled={selectedStoreId === null}
          className={`flex justify-center items-center px-5 py-5 text-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl font-['Whatthefont'] cursor-pointer`}
          onClick={() => handleClickButton(selectedStoreId)}
          whileHover={{scale: 1.1}}
          transition={{ type: "spring", ease: [0.25, 0.1, 0.25, 1], duration: 0.8}}
        >
            See Menu
        </motion.button>
      </div>
    </div>
    </>
  )
}

export default StoreSelection;