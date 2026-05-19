import React from 'react';
import { LogOut, Menu, X } from 'lucide-react';
import { FaBoxOpen, FaChartBar, FaChartLine, FaUserTie, FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router';

const navItems = [
  { key: 'dashboard', label: 'Tổng quan', Icon: FaChartBar },
  { key: 'customers', label: 'Khách hàng', Icon: FaUsers },
  { key: 'employees', label: 'Nhân viên', Icon: FaUserTie },
  { key: 'products', label: 'Sản phẩm', Icon: FaBoxOpen },
  { key: 'productDashboard', label: 'Tổng quan sản phẩm', Icon: FaChartLine },
];
export default function Sidebar({ sidebarOpen, setSidebarOpen, activeTab, setActiveTab }) {
  const navigate = useNavigate();
  return (
    <div className={`${sidebarOpen ? 'w-64' : 'w-20'} admin-sidebar transition-all duration-300 flex flex-col`}>
      <div className="p-4 flex items-center justify-between">
        {sidebarOpen && <h2 className="admin-sidebar-title">DTCLL Admin</h2>}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-full hover:bg-slate-100"
          title={sidebarOpen ? "Thu gọn menu" : "Mở rộng menu"}
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.key}
            onClick={() => setActiveTab(item.key)}
            className={`admin-sidebar-link w-full flex items-center gap-3 px-4 py-3 transition ${
              activeTab === item.key ? 'is-active' : ''
            }`}
          >
            {React.createElement(item.Icon, { size: 18 })}
            {sidebarOpen && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-200 space-y-3">
        <div className={`admin-sidebar-profile ${sidebarOpen ? '' : 'justify-center'}`}>
          <div className="admin-sidebar-avatar">AD</div>
          {sidebarOpen && (
            <div className="admin-sidebar-user">
              <strong>Admin</strong>
              <span>Quản trị hệ thống</span>
            </div>
          )}
        </div>
        <button className={`admin-sidebar-logout w-full flex items-center py-3 transition ${sidebarOpen ? 'gap-3 px-4' : 'justify-center px-0'}`}
          onClick={()=>{
            localStorage.removeItem("accessToken")
            navigate("/login")}}
          title="Đăng xuất"
        >
          <LogOut size={20} />
          {sidebarOpen && <span>Đăng xuất</span>}
        </button>
      </div>
    </div>
  );
}
