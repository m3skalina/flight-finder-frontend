import React, { useState, useEffect } from 'react';

function App() {
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [response, setResponse] = useState(null);
  const [airports, setAirports] = useState([]);
  const [error, setError] = useState(null);

  const fetchAirports = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/airports');
      const data = await response.json();
      setAirports(data);
    } catch (error) {
      console.error('An error occurred while fetching airports:', error);
    }
  };

  useEffect(() => {
    fetchAirports();
  }, []);

  const handleSearch = async () => {
    const data = { code_departure: departure, code_arrival: arrival };

    try {
      const response = await fetch('http://localhost:8000/api/v1/flights/search', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        const responseData = await response.json();
        setError(null);
        setResponse(responseData);
      } else if (response.status === 422) {
        const errorData = await response.json();
        setError(errorData.message);
      } else {
        console.error('Request failed with status:', response.status);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="min-h-screen2">
     <div className="bg-blue-200 min-h-screen flex items-center">
        <div className="w-full">
          <h2 className="text-center text-blue-600 font-bold text-2xl uppercase mb-10 mt-10">Flight Finder App</h2>

          {error && 
            <div className="bg-white p-5 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2 flex flex-row items-center mb-10">
              <svg fill="#ff0000" height="20px" width="20px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 27.963 27.963" xmlSpace="preserve" stroke="#ff0000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g id="c129_exclamation"> <path d="M13.983,0C6.261,0,0.001,6.259,0.001,13.979c0,7.724,6.26,13.984,13.982,13.984s13.98-6.261,13.98-13.984 C27.963,6.259,21.705,0,13.983,0z M13.983,26.531c-6.933,0-12.55-5.62-12.55-12.553c0-6.93,5.617-12.548,12.55-12.548 c6.931,0,12.549,5.618,12.549,12.548C26.531,20.911,20.913,26.531,13.983,26.531z"></path> <polygon points="15.579,17.158 16.191,4.579 11.804,4.579 12.414,17.158 "></polygon> <path d="M13.998,18.546c-1.471,0-2.5,1.029-2.5,2.526c0,1.443,0.999,2.528,2.444,2.528h0.056c1.499,0,2.469-1.085,2.469-2.528 C16.441,19.575,15.468,18.546,13.998,18.546z"></path> </g> <g id="Capa_1_207_"> </g> </g> </g></svg>
              <p className="text-red-500 ml-2 mt-2">{error}</p>
            </div>
          }

          <div className="bg-white p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2">
              <div className="mb-5">
                <label className="block mb-2 font-bold text-gray-600">Departure Airport</label>
                <select 
                  className="border border-red-300 shadow p-3 w-full rounded mb-"
                  value={departure}
                  onChange={(e) => setDeparture(e.target.value)}
                >
                  <option value="">Select Airport</option>
                  {airports.map((airport) => (
                    <option key={airport.code} value={airport.code}>
                      {airport.name}
                    </option>
                  ))}
                </select>            
              </div>

              <div className="mb-5">
                <label className="block mb-2 font-bold text-gray-600">Arrival Airport</label>
                <select 
                  className="border border-red-300 shadow p-3 w-full rounded mb-"
                  value={arrival}
                  onChange={(e) => setArrival(e.target.value)}
                >
                  <option value="">Select Airport</option>
                  {airports.map((airport) => (
                    <option key={airport.code} value={airport.code}>
                      {airport.name}
                    </option>
                  ))}
                </select>            
              </div>

              <button 
                className="block w-full bg-blue-500 text-white font-bold p-4 rounded-lg"
                onClick={handleSearch}
              >Search</button>
        </div>
        <div>

          {(response && response.price == null) && 
            <div className="bg-white p-5 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2 flex flex-row items-center mt-10">
              <svg fill="#ff0000" height="20px" width="20px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 27.963 27.963" xmlSpace="preserve" stroke="#ff0000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g id="c129_exclamation"> <path d="M13.983,0C6.261,0,0.001,6.259,0.001,13.979c0,7.724,6.26,13.984,13.982,13.984s13.98-6.261,13.98-13.984 C27.963,6.259,21.705,0,13.983,0z M13.983,26.531c-6.933,0-12.55-5.62-12.55-12.553c0-6.93,5.617-12.548,12.55-12.548 c6.931,0,12.549,5.618,12.549,12.548C26.531,20.911,20.913,26.531,13.983,26.531z"></path> <polygon points="15.579,17.158 16.191,4.579 11.804,4.579 12.414,17.158 "></polygon> <path d="M13.998,18.546c-1.471,0-2.5,1.029-2.5,2.526c0,1.443,0.999,2.528,2.444,2.528h0.056c1.499,0,2.469-1.085,2.469-2.528 C16.441,19.575,15.468,18.546,13.998,18.546z"></path> </g> <g id="Capa_1_207_"> </g> </g> </g></svg>
              <p className="text-red-500 ml-2 mt-2">Sorry, no flight found!</p>
            </div>
          }
          
          {(response && response.price > 0) && (
            <div className="p-10">
              <div className="max-w-full  bg-white flex flex-col rounded overflow-hidden shadow-lg">
                <div className="mt-2 flex sm:flex-row mx-6 sm:justify-between flex-wrap ">
                  <div className="flex flex-col place-items-center p-2">
                    <p className="text-xs text-gray-500 font-bold mb-2">ShippyPro Airways</p>
                    <img alt="ShippyPro Airways" className="w-15 h-10" src="data:image/png;base64,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" />
                  </div>

                  <div className="flex flex-col p-2">
                    <p className="text-gray-500"><span className="font-bold">{response.departure.code}</span></p>
                    <p className="text-gray-500">{response.departure.name}</p>
                  </div>

                  <svg className="w-12 h-10 p-2 mx-2 self-center bg-blue-400 rounded-full fill-current text-white" viewBox="0 0 64 64" pointer-events="all" aria-hidden="true" role="presentation"><path d="M43.389 38.269L29.222 61.34a1.152 1.152 0 01-1.064.615H20.99a1.219 1.219 0 01-1.007-.5 1.324 1.324 0 01-.2-1.149L26.2 38.27H11.7l-3.947 6.919a1.209 1.209 0 01-1.092.644H1.285a1.234 1.234 0 01-.895-.392l-.057-.056a1.427 1.427 0 01-.308-1.036L1.789 32 .025 19.656a1.182 1.182 0 01.281-1.009 1.356 1.356 0 01.951-.448l5.4-.027a1.227 1.227 0 01.9.391.85.85 0 01.2.252L11.7 25.73h14.5L19.792 3.7a1.324 1.324 0 01.2-1.149A1.219 1.219 0 0121 2.045h7.168a1.152 1.152 0 011.064.615l14.162 23.071h8.959a17.287 17.287 0 017.839 1.791Q63.777 29.315 64 32q-.224 2.685-3.807 4.478a17.282 17.282 0 01-7.84 1.793h-9.016z"></path></svg>


                  <div className="flex flex-col flex-wrap p-2">
                    <p className="text-gray-500"><span className="font-bold">{response.arrival.code}</span></p>
                    <p className="text-gray-500">{response.arrival.name}</p>
                  </div>

                  <div className="flex flex-row place-items-center p-2">
                    <div className="flex flex-col ml-2">
                      <p className="text-xs text-gray-500 font-bold">Price</p>
                      <p className="font-bold">{Number(response.price).toFixed(2)} €</p>
                    </div>
                  </div>
                </div>

                {(response.stepoversCount > 1) && (
                  response.stepovers.map((flight) => (
             
                    <div className="mt-4 bg-gray-100 flex flex-row flex-wrap md:flex-nowrap justify-between items-baseline">
                      <div className="flex mx-6 py-4 flex-row flex-wrap">
                        <div className="text-sm mx-2 flex flex-row">
                          <div className="flex flex-col p-2">
                            <p className="text-gray-500"><span className="font-bold">{flight.departure.code}</span></p>
                            <p className="text-gray-500">{flight.departure.name}</p>
                          </div>
                          <svg className="w-12 h-10 p-2 mx-2 self-center bg-gray-400 rounded-full fill-current text-white" viewBox="0 0 64 64" pointer-events="all" aria-hidden="true" role="presentation"><path d="M43.389 38.269L29.222 61.34a1.152 1.152 0 01-1.064.615H20.99a1.219 1.219 0 01-1.007-.5 1.324 1.324 0 01-.2-1.149L26.2 38.27H11.7l-3.947 6.919a1.209 1.209 0 01-1.092.644H1.285a1.234 1.234 0 01-.895-.392l-.057-.056a1.427 1.427 0 01-.308-1.036L1.789 32 .025 19.656a1.182 1.182 0 01.281-1.009 1.356 1.356 0 01.951-.448l5.4-.027a1.227 1.227 0 01.9.391.85.85 0 01.2.252L11.7 25.73h14.5L19.792 3.7a1.324 1.324 0 01.2-1.149A1.219 1.219 0 0121 2.045h7.168a1.152 1.152 0 011.064.615l14.162 23.071h8.959a17.287 17.287 0 017.839 1.791Q63.777 29.315 64 32q-.224 2.685-3.807 4.478a17.282 17.282 0 01-7.84 1.793h-9.016z"></path></svg>

                          <div className="flex flex-col flex-wrap p-2">
                            <p className="text-gray-500"><span className="font-bold">{flight.arrival.code}</span></p>
                            <p className="text-gray-500">{flight.arrival.name}</p>
                          </div>
                        </div>
                      </div>
                      <div className="md:border-l-2 mx-6 md:border-dotted flex flex-row py-4 mr-6 flex-wrap">
                        <div className="text-sm mx-6 flex flex-col">
                          <p>Price</p>
                          <p className="font-bold">{Number(flight.price).toFixed(2)} €</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            
          )}
        </div>
      </div>
    </div>
  </div>
  );

}

export default App;
