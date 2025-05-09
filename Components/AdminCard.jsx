import React from 'react';

const AdminCard = ({ totalStudents }) => {
  const Data = [
    { id: 1, name: "Users", count: totalStudents }, // Total students
    { id: 2, name: "Active Users", count: totalStudents },
    { id: 3, name: "Face Added", count: 6 },
    { id: 4, name: "Reviews", count: 5 },
  ];

  return (
    <>
      {Data.map((item) => (
        <div key={item.id} className="bg-white shadow-md rounded-lg p-4 m-10">
          <h2 className="text-2xl font-bold text-center">{item.name}</h2>
          <p className="text-2xl font-bold text-center m-5">{item.count}</p>
        </div>
      ))}
    </>
  );
};

export default AdminCard;
