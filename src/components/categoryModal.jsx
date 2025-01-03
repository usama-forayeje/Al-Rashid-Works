import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { useForm } from "react-hook-form";
  
  function AddCategoryModal({ isOpen, onClose, onSave }) {
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm();
  
    const onSubmit = (data) => {
      onSave(data); // Save the new category using parent function
      reset(); // Reset form fields
      onClose(); // Close the modal
    };
  
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogDescription>
              Please provide a name for the new category.
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Category Name Field */}
            <div>
              <Input
                placeholder="Enter category name"
                {...register("categoryName", {
                  required: "Category name is required",
                })}
              />
              {errors.categoryName && (
                <p className="text-sm text-red-500">
                  {errors.categoryName.message}
                </p>
              )}
            </div>
  
            {/* Modal Actions */}
            <div className="flex justify-end gap-2">
              <Button variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    );
  }
  
  export default AddCategoryModal;
  