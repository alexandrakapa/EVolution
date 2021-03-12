import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { AiFillThunderbolt } from "react-icons/ai";

export default function Map() {
  var places =[];
  const [dat,setData] = useState([]);
  const tok = localStorage.getItem('token');
  const[isfetched,setfetched] = useState(false);
  var maptok = "pk.eyJ1Ijoibmlrb3NnaW9yZyIsImEiOiJja20yZnJtNzEwMWdpMndxZHBvejhpOTIzIn0.19RRfYCa9MZ0Tq-98vYjHw";
  useEffect(() => {
    fetch(`https://localhost:8765/evcharge/api/StationAddresses`,{headers:{'Content-type':'application/json','x-access-token':tok}})
    .then(response => {
        if (response.ok){
           return response.json();
        }
        else {
          console.log("fail");
        }
      }
      ) .then(fetchedData => {
        console.log(fetchedData);
        setfetched(true);
        setData(fetchedData);
    });
  },[]);


  const [viewport, setViewport] = useState({
    latitude: 45.4211,
    longitude: -75.6903,
    width: "100vw",
    height: "100vh",
    zoom: 10
  });

  const [selectedPark, setSelectedPark] = useState(null);

  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedPark(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);
  console.log(dat);
  // console.log("Length:"+dat.length);
  console.log("here:"+isfetched);
  return (
    <div>
      {isfetched?<ReactMapGL
        {...viewport}
        mapboxApiAccessToken={maptok}
        // mapStyle="mapbox://styles/nikosgiorg/ckm38ejmcbwil17ptpud8tnw3"
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      >
        {dat.map(park => (
          <Marker
            key={park.StationID}

            latitude={park.Lat}
            longitude={park.Longi}
          >
            <button
              className="marker-btn"
              onClick={e => {
                e.preventDefault();
                setSelectedPark(park);
              }}
            >
              {park.Is_Active ? (
              <AiFillThunderbolt size ="1em"/>
        ) :                <AiOutlineThunderbolt size ="1em"/>}
            </button>
          </Marker>
        ))}

        {selectedPark ? (
          <Popup
            latitude={selectedPark.Lat}
            longitude={selectedPark.Longi}
            onClose={() => {
              setSelectedPark(null);
            }}
          >
            <div>
              <h2>{selectedPark.Address}</h2>
              <p><img src="/profile.png"/>{selectedPark.Operator}</p>
              {/* <p><b>You can pay in: </b>{selectedPark.Payment_Types}</p> */}
              <p><b>You can pay in: </b>
              {(selectedPark.Payment_Types.search("Cash")!=-1)?(
                <img src="/bank.png"/>

              ) :  null}
              {(selectedPark.Payment_Types.search("Pos")!=-1)?(
                <img src="/card.png"/>

              ) :  null}
              {(selectedPark.Payment_Types.search("Pay_later_in_app")!=-1)?(
                <img src="/smart.png"/>

              ) :  null}
              </p>
              <p><b>Cost(in euros per Kwh) </b>{selectedPark.epk} ‎€/kWh</p>

               {(selectedPark.Payment_Types.search("Credit_note")!=-1)?(
                <h4>Supports Credit Notes</h4>

          ) :  <h4>Does not support Credit Notes</h4>}
          <button>Route</button>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL> : null}
    </div>
  );
}
