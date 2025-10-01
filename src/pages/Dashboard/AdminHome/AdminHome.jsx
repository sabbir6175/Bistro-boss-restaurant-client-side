import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaBox, FaTruck, FaUsers, FaWallet } from "react-icons/fa";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Pie,
  PieChart,
  ResponsiveContainer,
  Legend,
} from "recharts";
const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats = {} } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  const { data: chartData = [] } = useQuery({
    queryKey: ["order-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/order-stats");
      return res.data;
    },
  });

  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
  Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  //pie chart Data
  const pieChartData = chartData.map((data) => {
    return { name: data.category, value: data.revenue };
  });

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
    const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${((percent ?? 1) * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div>
      <h1 className="text-3xl">
        <span>Hi, Welcome </span>
        {user?.displayName ? user.displayName : "Back"}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
        {/* Revenue */}
        <div className="flex gap-4 items-center justify-center bg-gradient-to-r from-[#BB34F5] to-[#FCDBFF] text-white p-3 rounded-xl shadow">
          <div>
            <FaWallet className="text-4xl mb-2" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">{stats?.revenue || 0}</h2>
            <p className="text-lg">Revenue</p>
          </div>
        </div>

        {/* Customers */}
        <div className="flex gap-4 items-center justify-center bg-gradient-to-r from-[#D3A256] to-[#FDE8C0] text-white p-6 rounded-2xl shadow-md">
          <div>
            <FaUsers className="text-4xl mb-2" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">{stats?.users || 0}</h2>
            <p className="text-lg">Users</p>
          </div>
        </div>

        {/* Products */}
        <div className="flex gap-4 items-center justify-center bg-gradient-to-r from-[#FE4880] to-[#FECDE9] text-white p-6 rounded-2xl shadow-md">
          <div>
            <FaBox className="text-4xl mb-2" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">{stats?.menuItems || 0}</h2>
            <p className="text-lg">Products</p>
          </div>
        </div>

        {/* Orders */}
        <div className="flex gap-4 items-center justify-center bg-gradient-to-r from-[#6AAEFF] to-[#B6F7FF] text-white p-6 rounded-2xl shadow-md">
          <div>
            <FaTruck className="text-4xl mb-2" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">{stats?.order || 0}</h2>
            <p className="text-lg">Orders</p>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="w-1/2">
          <BarChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Bar
              dataKey="quantity"
              fill="#8884d8"
              shape={<TriangleBar />}
              label={{ position: "top" }}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 6]} />
              ))}
            </Bar>
          </BarChart>
        </div>
        <div className="w-1/2">
          <PieChart width={400} height={400}>
            <Pie
              data={pieChartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieChartData.map((entry, index) => (
                <Cell
                  key={`cell-${entry.name}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend></Legend>
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
