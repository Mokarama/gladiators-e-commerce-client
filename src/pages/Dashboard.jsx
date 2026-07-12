import React, { useState, useContext, useEffect } from 'react';
import { 
  LayoutDashboard, ShoppingBag, Users, Settings, 
  Tag, BarChart3, CreditCard, Activity 
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import styles from './Dashboard.module.css';

// Register ChartJS
ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler
);

export const Dashboard = () => {
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);
  const userRole = user?.role || 'User';
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen w-full">Loading...</div>;
  }

  const adminNav = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'users', label: 'Manage Users', icon: Users },
    { id: 'items', label: 'Manage Items', icon: ShoppingBag },
    { id: 'categories', label: 'Categories', icon: Tag },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const userNav = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'my-items', label: 'My Orders', icon: ShoppingBag },
    { id: 'profile', label: 'Profile', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const navItems = userRole === 'Admin' ? adminNav : userNav;

  // Chart Data
  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue ($)',
        data: [12000, 19000, 15000, 22000, 28000, 32000],
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const barChartData = {
    labels: ['Electronics', 'Fashion', 'Home', 'Sports'],
    datasets: [
      {
        label: 'Sales by Category',
        data: [350, 220, 150, 90],
        backgroundColor: ['#2563eb', '#10b981', '#f59e0b', '#8b5cf6']
      }
    ]
  };

  const pieChartData = {
    labels: ['Completed', 'Pending', 'Cancelled'],
    datasets: [
      {
        data: [75, 15, 10],
        backgroundColor: ['#10b981', '#f59e0b', '#ef4444']
      }
    ]
  };

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarTitle}>Menu</div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <div 
              key={item.id} 
              className={`${styles.navItem} ${activeTab === item.id ? styles.navItemActive : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <Icon size={20} />
              {item.label}
            </div>
          )
        })}
      </aside>

      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className="text-3xl font-bold">Welcome back, {userRole}</h1>
          <p className="text-secondary">Here is what is happening with your store today.</p>
        </div>

        {activeTab === 'overview' && (
          <>
            {/* Stats Overview */}
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={styles.statIcon} style={{backgroundColor: 'rgba(37,99,235,0.1)', color: '#2563eb'}}>
                  <ShoppingBag size={24} />
                </div>
                <div className={styles.statInfo}>
                  <div className={styles.statValue}>1,245</div>
                  <div className={styles.statLabel}>Total Orders</div>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon} style={{backgroundColor: 'rgba(16,185,129,0.1)', color: '#10b981'}}>
                  <CreditCard size={24} />
                </div>
                <div className={styles.statInfo}>
                  <div className={styles.statValue}>$45,231</div>
                  <div className={styles.statLabel}>Total Revenue</div>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon} style={{backgroundColor: 'rgba(245,158,11,0.1)', color: '#f59e0b'}}>
                  <Users size={24} />
                </div>
                <div className={styles.statInfo}>
                  <div className={styles.statValue}>8,320</div>
                  <div className={styles.statLabel}>Total Users</div>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon} style={{backgroundColor: 'rgba(239,68,68,0.1)', color: '#ef4444'}}>
                  <Activity size={24} />
                </div>
                <div className={styles.statInfo}>
                  <div className={styles.statValue}>124</div>
                  <div className={styles.statLabel}>Active Sessions</div>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className={styles.chartsGrid}>
              <div className={styles.chartCard}>
                <h3 className="font-bold mb-4">Revenue Overview</h3>
                <div style={{ position: 'relative', height: '300px', width: '100%' }}>
                  <Line data={lineChartData} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
              </div>
              <div className={styles.chartCard}>
                <h3 className="font-bold mb-4">Sales by Category</h3>
                <div style={{ position: 'relative', height: '300px', width: '100%' }}>
                  <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
              </div>
              <div className={styles.chartCard}>
                <h3 className="font-bold mb-4">Order Status</h3>
                <div className="flex justify-center" style={{ position: 'relative', height: '300px', width: '100%' }}>
                  <Pie data={pieChartData} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
              </div>
            </div>

            {/* Tables Area */}
            <h3 className="font-bold text-xl mb-4">Recent Orders</h3>
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4].map((row) => (
                    <tr key={row}>
                      <td>#ORD-735{row}</td>
                      <td>Alex Johnson</td>
                      <td>Oct 24, 2026</td>
                      <td>${(120 * row).toFixed(2)}</td>
                      <td>
                        <span className={`${styles.badge} ${row === 1 ? styles.badgeWarning : styles.badgeSuccess}`}>
                          {row === 1 ? 'Pending' : 'Completed'}
                        </span>
                      </td>
                      <td>
                        <Button variant="secondary" size="sm">View</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {activeTab !== 'overview' && (
          <div className="flex flex-col items-center justify-center py-20" style={{ backgroundColor: 'var(--surface-color)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2 text-primary">{navItems.find(n => n.id === activeTab)?.label}</h2>
              <p className="text-secondary mb-6">This section is currently under construction for {userRole}.</p>
              <Button onClick={() => setActiveTab('overview')}>Back to Overview</Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
