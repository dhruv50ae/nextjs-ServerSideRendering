import { useEffect, useState } from "react";

const LastSalesPage = () => {
  const [sales, setSales] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch("https://nextjs-prac-default-rtdb.firebaseio.com/sales.json")
      .then((res) => res.json())
      .then((data) => {
        const transformedSales = [];
        for (let key in data) {
          transformedSales.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume,
          });
        }
        setSales(transformedSales);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (!sales) {
    return <p>No data yet</p>;
  }
  return (
    <ul>
      {sales.map((sale) => {
        return (
          <li key={sale.id}>
            {sale.usename} - {sale.volume}
          </li>
        );
      })}
    </ul>
  );
};

export default LastSalesPage;
