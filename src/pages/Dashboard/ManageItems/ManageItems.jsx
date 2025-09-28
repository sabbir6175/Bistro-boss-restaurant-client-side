import { FaEdit, FaTrashAlt } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useMenu from "../../../hooks/useMenu";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";

const ManageItems = () => {
  const [menu, , refetch] = useMenu();
  const axiosSecure = useAxiosSecure();

  // 🔹 Pagination & Search States
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [isOpen, setIsOpen] = useState(false);

  // 🔹 Search
  const filteredData = useMemo(() => {
    return menu.filter((item) =>
      Object.values(item).some((value) =>
        value?.toString().toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [menu, search]);

  // 🔹 Sorting
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;
    return [...filteredData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  // 🔹 Pagination Logic
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  };

  // 🔹 Delete Function
  const handleDeleteItems = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/menu/${item._id}`);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${item.name} has been deleted`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };

  return (
    <div>
      <SectionTitle heading={"Manage All Items"} subHeading={"Hurry up"} />

      {/* 🔎 Search */}
      <div className="mb-4 flex items-center justify-between">
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm dark:bg-slate-900 dark:border-slate-700 dark:text-[#abc2d3] dark:placeholder:text-slate-500 py-2.5 px-4 border border-gray-200 rounded-md outline-none focus:border-blue-300"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-md">
        <table className="table w-full">
          <thead className="bg-gray-100 dark:bg-slate-900">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th className="cursor-pointer">
                <div className="flex items-center gap-1">
                  Name
                  <HiOutlineArrowsUpDown
                    onClick={() => handleSort("name")}
                    className="cursor-pointer"
                  />
                </div>
              </th>
              <th className="cursor-pointer">
                <div className="flex items-center gap-1">
                  Price
                  <HiOutlineArrowsUpDown
                    onClick={() => handleSort("price")}
                    className="cursor-pointer"
                  />
                </div>
              </th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((item, index) => (
              <tr key={item._id}>
                <td>{(currentPage - 1) * pageSize + index + 1}</td>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img src={item.image} alt={item.name} />
                    </div>
                  </div>
                </td>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>
                  <Link to={`/dashboard/updatedItems/${item._id}`}>
                    <button className="btn bg-orange-400 btn-sm">
                      <FaEdit className="text-white" />
                    </button>
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteItems(item)}
                    className="btn btn-ghost btn-sm"
                  >
                    <FaTrashAlt className="text-red-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!paginatedData?.length && (
          <p className="text-center py-6 text-gray-500">No data found!</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="mt-4 flex items-center justify-between">
        {/* Showing Count */}
        <div className="text-sm text-gray-500 dark:text-[#abc2d3]">
          Showing {(currentPage - 1) * pageSize + 1} to{" "}
          {Math.min(currentPage * pageSize, sortedData.length)} of{" "}
          {sortedData.length} results
        </div>

        {/* Page Size Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-3 py-1 border rounded-md"
          >
            {pageSize}
            <IoIosArrowDown
              className={`transition-transform ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-1 bg-white border rounded-md shadow-md">
              {[5, 10, 20, 50].map((size) => (
                <div
                  key={size}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    setPageSize(size);
                    setCurrentPage(1);
                    setIsOpen(false);
                  }}
                >
                  {size}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="border px-2 py-1 rounded-md"
          >
            <BsChevronLeft />
          </button>

          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }
            return (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`px-3 py-1 rounded-md border ${
                  pageNum === currentPage
                    ? "bg-black text-white dark:bg-slate-800"
                    : ""
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="border px-2 py-1 rounded-md"
          >
            <BsChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageItems;
