import Link from 'next/link';
const DashboardLayout = ({ children }) => {
  return (
    <div className="flex flex-col w-full md:flex-row min-h-screen">
      <aside className="w-full md:w-48 p-4 border-b-4 md:border-r-4 border-black m-0 md:m-10">
        <ul className="flex flex-row md:flex-col space-y-0 md:space-y-2 mt-5 md:mt-10 ">
          <li>
            <Link href="/dashboard" className=' text-2xl font-semibold' >
              <span className="block p-2 hover:text-red-500 rounded cursor-pointer " >Home</span>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/users" className=' text-2xl font-semibold'>
              <span className="block p-2 hover:text-red-500 rounded cursor-pointer " >Users</span>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/attendance" className=' text-2xl font-semibold '>
              <span className="block p-2 hover:text-red-500 rounded cursor-pointer " > Record</span>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/logout" className=' text-2xl font-semibold'>
              <span className="block p-2 hover:text-red-500 rounded cursor-pointer " >Logout</span>
            </Link>
          </li>
          
        </ul>
      </aside>
      <section className="flex-1 p-4 md:p-8 over">{children}</section>
    </div>
  );
};

export default DashboardLayout;