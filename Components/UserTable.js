const UserTable = ({ users }) => {
    return (
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="text-2xl">
            <th className="border px-4 py-2">S No.</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Phone</th>
            <th className="border px-4 py-2">Batch</th>
            <th className="border px-4 py-2">Faculty</th>
            <th className="border px-4 py-2">Profile</th>
          </tr>
        </thead>
        <tbody>
          {users
            .sort((a, b) => a.fullName.localeCompare(b.fullName))
            .map((user, index) => (
              <tr
                key={user.id}
                className="text-center text-xl font-mono italic"
              >
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{user.fullName}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.mobileNumber}</td>
                <td className="border px-4 py-2">{user.batch}</td>
                <td className="border px-4 py-2">{user.faculty}</td>
                <td className="border px-4 py-2 w-32">
                  <img
                    src={
                      user.imgurl
                        ? user.imgurl
                        : "https://imgs.search.brave.com/JAHeWxUYEwHB7KV6V1IbI9oL7wxJwIQ4Sbp8dHQL09A/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMjAx/MzkxNTc2NC9waG90/by91c2VyLWljb24t/aW4tZmxhdC1zdHls/ZS5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9UEotMnZvUWZh/Q3hhZUNsdzZYYlVz/QkNaT3NTTjlIVWVC/SUg1Qk82VmRScz0"
                    }
                    className="rounded-xl"
                    alt=""
                  />
                </td>
              </tr>
            ))}
        </tbody>
        <tfoot>
          <tr className="text-xl">
            <th className="border px-4 py-2">S No.</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Phone</th>
            <th className="border px-4 py-2">Batch</th>
            <th className="border px-4 py-2">Faculty</th>
            <th className="border px-4 py-2">Profile</th>
          </tr>
        </tfoot>
      </table>
    );
  };
  
  export default UserTable;
  