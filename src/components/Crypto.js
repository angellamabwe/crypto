import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Crypto = () => {
  const [data, setData] = useState([]);
  const initial = { name: 'Bitcoin', rank: '1', symbol: 'BTC', priceUsd: '17830.0606567979589325' }
  const [cryptoCur, setCryptoCur] = useState(initial);

  const handleChange = () => {
    const id = document.querySelector('#cryp').value;
    axios
      .get(`https://api.coincap.io/v2/assets/${id}`)
      .then((res) => {
        setCryptoCur(res.data.data);
        console.log(res.data.data);
        console.log(`Currency fetched successfully`);
      }).catch((err) => {
        console.log("Error fetching currency: " + err);
      });
  }

  useEffect(
    () => {
      axios
        .get(`https://api.coincap.io/v2/assets`)
        .then((res) => {
          setData(res.data.data);
          console.log(`Data fetched successfully`);
        }).catch((err) => {
          console.log("Error fetching data: " + err);
        });

    }, []
  )

  return (
    <>
      <select
        id="cryp"
        onChange={handleChange}
        className='custo'
      >
        {data
          .sort((a, b) => {
            return a.rank - b.rank;
          })
          .map(({ id, name, }) => (

            <option key={id} value={id} title={name}>
              {name}
            </option>

          ))}
      </select>
      <hr />
      <h3>Selected cryptocurrency details</h3>
      <p>Name: {cryptoCur?.name}</p>
      <p>Rank: {cryptoCur?.rank}</p>
      <p>Symbol: {cryptoCur?.symbol}</p>
      <p>Price in USD: {cryptoCur.priceUsd}</p>
    </>
  )
}

export default Crypto;