import { useDispatch, useSelector } from "react-redux";
import { getFirebaseData, setDataToFirebase } from "../../../database/firebaseUtils"; // mastersSlice থেকে অ্যাকশন import করুন
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddCategoryModal from "../../../components/categoryModal";
import { getMasters } from "../../../features/master/masterSlice";

function CrateMaster() {
  const { masters } = useSelector((store) => store.masters);
  const dispatch = useDispatch(); // Redux dispatch hook
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Firebase থেকে ডেটা ফেচ করুন যখন কম্পোনেন্ট প্রথম লোড হয়
    getFirebaseData("masters")
      .then((fetchedMasters) => {
        dispatch(getMasters(fetchedMasters)); // Redux store আপডেট করুন
      })
      .catch((error) => {
        console.error("Error fetching masters:", error);
      });
  }, [dispatch]);

  const handleAddMaster = (newMaster) => {
    setDataToFirebase("masters", {
      masterName: newMaster.categoryName, // এখানে categoryName কে masterName এ রূপান্তর করলাম
      // আরও অন্যান্য ফিল্ড যদি থাকে, সেগুলি এখানে যোগ করুন
    })
      .then(() => {
        // Firebase থেকে ডেটা ফেচ করুন এবং Redux store এ dispatch করুন
        getFirebaseData("masters")
          .then((updatedMasters) => {
            dispatch(getMasters(updatedMasters)); // Redux store update
          })
          .catch((error) => {
            console.error("Error fetching masters:", error);
          });
      })
      .catch((error) => {
        console.error("Error adding master:", error);
      });
  
    setIsModalOpen(false);
  };
  

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Manage Masters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">
              Manage your masters easily in the table below.
            </p>
            <Button onClick={() => setIsModalOpen(true)}>+ Add Master</Button>
          </div>

          {/* Product Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Master Name</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {masters?.length > 0 ? (
                masters.map((master) => (
                  <TableRow key={master.id}>
                    <TableCell>{master.masterName
                    }</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => setIsModalOpen(true)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => alert(`Deleting ${master.masterName}`)}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} className="text-center text-gray-500">
                    No masters available. Add a new master to get started.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Category Modal */}
      <AddCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddMaster}
      />
    </div>
  );
}

export default CrateMaster;
