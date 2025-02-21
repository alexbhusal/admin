import * as XLSX from "xlsx";

const DownloadButton = ({ users }) => {
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      users.map((user, index) => ({
        "S No.": index + 1,
        "Name": user.fullName,
        "Email": user.email,
        "Phone": user.mobileNumber,
        "Batch": user.batch,
        "Faculty": user.faculty,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    XLSX.writeFile(workbook, "userData.xlsx");
  };

  return (
    <button
      onClick={exportToExcel}
      className="bg-black text-w
      hite py-2 px-4 rounded mb-5"
    >
      Download Excel
    </button>
  );
};

export default DownloadButton;
