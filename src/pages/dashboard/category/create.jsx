import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import {
  setDataToFirebase,
  getFirebaseData,
} from "../../../database/firebaseUtils";
import { getCategories } from "../../../features/categories/categorySlice";
// import your action

function CreateCategory() {
  const { categories } = useSelector((store) => store.categories);
  

  const dispatch = useDispatch(); // Redux dispatch hook
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Firebase থেকে ডেটা ফেচ করুন যখন কম্পোনেন্ট প্রথম লোড হয়
    getFirebaseData("categories")
      .then((fetchedCategories) => {
        dispatch(getCategories(fetchedCategories)); // Redux store আপডেট করুন
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, [dispatch]); // Only run once when component is mounted

  const handleAddCategory = (newCategory) => {
    setDataToFirebase("categories", newCategory)
      .then(() => {
        // Firebase থেকে ডেটা ফেচ করুন এবং Redux store এ dispatch করুন
        getFirebaseData("categories")
          .then((updatedCategories) => {
            dispatch(getCategories(updatedCategories)); // Redux store update
          })
          .catch((error) => {
            console.error("Error fetching categories:", error);
          });
      })
      .catch((error) => {
        console.error("Error adding category:", error);
      });

    setIsModalOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Manage Categories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">
              Manage your categories easily in the table below.
            </p>
            <Button onClick={() => setIsModalOpen(true)}>+ Add Category</Button>
          </div>

          {/* Product Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category Name</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories?.length > 0 ? (
                categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>{category.categoryName}</TableCell>
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
                          onClick={() => alert(`Deleting ${category.name}`)}
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
                    No categories available. Add a new category to get started.
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
        onSave={handleAddCategory}
      />
    </div>
  );
}

export default CreateCategory;
