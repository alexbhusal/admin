import Link from 'next/link';
const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-48 p-4 border-r-4 border-black m-10">
        <ul className="space-y-2 mt-10">
          <li>
            <Link href="/dashboard" className='flex text-2xl font-semibold' >
              <span className="block p-2 hover:text-red-500 rounded cursor-pointer " >Home</span>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/users" className='flex text-2xl font-semibold'>
              <span className="block p-2 hover:text-red-500 rounded cursor-pointer " >Users</span>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/attendance" className='flex text-2xl font-semibold '>
              <span className="block p-2 hover:text-red-500 rounded cursor-pointer " > Record</span>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/logout" className='flex text-2xl font-semibold'>
              <span className="block p-2 hover:text-red-500 rounded cursor-pointer " >Logout</span>
            </Link>
          </li>
          
        </ul>
      </aside>
      <section className="flex-1 p-8">{children}</section>
    </div>
  );
};

export default DashboardLayout;