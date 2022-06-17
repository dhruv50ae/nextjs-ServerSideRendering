import { useEffect, useState } from "react";
import useSWR from "swr";

const LastSalesPage = () => {
  const [sales, setSales] = useState();
  //   const [loading, setLoading] = useState(false);

  const { data, error } = useSWR(
    "https://nextjs-prac-default-rtdb.firebaseio.com/sales.json"
  );
  useEffect(() => {
    if (data) {
      let transformedSales = [];
      for (let key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      setSales(transformedSales);
    }
  }, [data]);
  //   useEffect(() => {
  //     setLoading(true);
  //     fetch("https://nextjs-prac-default-rtdb.firebaseio.com/sales.json")
  //       .then((res) => res.json())
  //       .then((data) => {
  //         const transformedSales = [];
  //         for (let key in data) {
  //           transformedSales.push({
  //             id: key,
  //             username: data[key].username,
  //             volume: data[key].volume,
  //           });
  //         }
  //         setSales(transformedSales);
  //         setLoading(false);
  //       });
  //   }, []);

  if (error) {
    return <p>Failed to load data</p>;
  }
  if (!data || !sales) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {sales.map((sale) => {
        return (
          <li key={sale.id}>
            {sale.usename} - {sale.volume}
          </li>
        )
      })}
    </ul>
  );
};

export default LastSalesPage;
