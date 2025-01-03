import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFirebaseData } from "../../../database/firebaseUtils";
import { setAllUsersToRedux } from "../../../features/auth/authSlice";

function AllUser() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.auth.users || []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await getFirebaseData("userProfile"); 
        dispatch(setAllUsersToRedux(allUsers)); 
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [dispatch]);

  if (!users || users.length === 0) {
    return <p>No users found.</p>;
  }

  return (
    <div className="p-6 bg-gray-50">
      <h1 className="mb-4 text-2xl font-bold">All Users</h1>
      <table className="w-full text-left border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-4 py-2 border">{user.name || "N/A"}</td>
              <td className="px-4 py-2 border">{user.email}</td>
              <td className="px-4 py-2 border">{user.role || "User"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllUser;
