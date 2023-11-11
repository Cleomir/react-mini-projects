import React, { useState } from "react";

import "./App.css";

interface Order {
  id: number;
  customerName: string;
  amount: number;
  status: string;
  date: string;
}

const orders: Order[] = [
  {
    id: 1,
    customerName: "John Doe",
    amount: 100,
    status: "Pending",
    date: "2023-11-07",
  },
  {
    id: 2,
    customerName: "Jane Doe",
    amount: 200,
    status: "Delivered",
    date: "2023-11-06",
  },
  {
    id: 3,
    customerName: "Bob Smith",
    amount: 300,
    status: "Cancelled",
    date: "2023-11-05",
  },
  {
    id: 4,
    customerName: "Alice Johnson",
    amount: 400,
    status: "Pending",
    date: "2023-11-04",
  },
  {
    id: 5,
    customerName: "Charlie Brown",
    amount: 500,
    status: "Delivered",
    date: "2023-11-03",
  },
  {
    id: 6,
    customerName: "Lucy Van Pelt",
    amount: 600,
    status: "Cancelled",
    date: "2023-11-02",
  },
  {
    id: 7,
    customerName: "Linus Van Pelt",
    amount: 700,
    status: "Pending",
    date: "2023-11-01",
  },
  {
    id: 8,
    customerName: "Snoopy",
    amount: 800,
    status: "Delivered",
    date: "2023-10-31",
  },
  {
    id: 9,
    customerName: "Woodstock",
    amount: 900,
    status: "Cancelled",
    date: "2023-10-30",
  },
  {
    id: 10,
    customerName: "Peppermint Patty",
    amount: 1000,
    status: "Pending",
    date: "2023-10-29",
  },
  {
    id: 11,
    customerName: "Marcie",
    amount: 1100,
    status: "Delivered",
    date: "2023-10-28",
  },
  {
    id: 12,
    customerName: "Franklin",
    amount: 1200,
    status: "Cancelled",
    date: "2023-10-27",
  },
];

export const OrdersTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortByColumn, setSortByColumn] = useState("customerName");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setSearchTerm(searchValue);
  };

  const handleSort = (column: string) => {
    if (sortByColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortOrder("asc");
      setSortByColumn(column);
    }
  };

  const handlePageChange = (nextPage: number) => {
    setCurrentPage(nextPage);
  };

  const filteredOrders = orders.filter((order) => {
    const searchTermLowerCase = searchTerm.toLowerCase();

    return (
      order.id.toString().includes(searchTermLowerCase) ||
      order.customerName.toLowerCase().includes(searchTermLowerCase) ||
      order.status.toLowerCase().includes(searchTermLowerCase) ||
      ("" + order.amount).includes(searchTermLowerCase)
    );
  });

  const sortedOrders = filteredOrders.sort((a, b) => {
    if (sortByColumn === "id") {
      return a.id - b.id;
    } else if (sortByColumn === "customerName") {
      return a.customerName.localeCompare(b.customerName);
    } else if (sortByColumn === "amount") {
      return a.amount - b.amount;
    } else if (sortByColumn === "status") {
      return a.status.localeCompare(b.status);
    } else {
      return a.date.localeCompare(b.date);
    }
  });

  const paginatedOrders = sortedOrders.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="orders-table">
      <input
        type="text"
        placeholder="Search orders"
        value={searchTerm}
        onChange={handleSearch}
      />
      <table>
        <thead>
          <tr>
            <th>
              <button
                className={sortByColumn === "id" ? "active" : ""}
                onClick={() => handleSort("id")}
              >
                ID
              </button>
            </th>
            <th>
              <button
                className={sortByColumn === "customerName" ? "active" : ""}
                onClick={() => handleSort("customerName")}
              >
                Customer Name
              </button>
            </th>
            <th>
              <button
                className={sortByColumn === "amount" ? "active" : ""}
                onClick={() => handleSort("amount")}
              >
                Amount
              </button>
            </th>
            <th>
              <button
                className={sortByColumn === "status" ? "active" : ""}
                onClick={() => handleSort("status")}
              >
                Status
              </button>
            </th>
            <th>
              <button
                className={sortByColumn === "date" ? "active" : ""}
                onClick={() => handleSort("date")}
              >
                Date
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customerName}</td>
              <td>{order.amount}</td>
              <td>{order.status}</td>
              <td>{order.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= filteredOrders.length / pageSize}
        >
          Next
        </button>
      </div>
    </div>
  );
};
