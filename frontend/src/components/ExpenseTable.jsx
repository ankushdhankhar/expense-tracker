import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox } from "./ui/checkbox";
import { Trash } from "lucide-react";
import UpdateExpense from "./UpdateExpense";
import axios from "axios";
import { toast } from "sonner";
import { setExpenses } from "@/redux/expenseSlice";

const ExpenseTable = () => {
  const { expenses } = useSelector((store) => store.expense || {});
  const [localExpense, setLocalExpense] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    setLocalExpense(expenses);
  }, [expenses]);

  const totalAmount = localExpense.reduce((acc, expense) => {
    if (!checkedItems[expense._id]) {
      return acc + expense.amount;
    }
    return acc;
  }, 0);

  const handleCheckboxChange = async (expenseId) => {
    const newStatus = !checkedItems[expenseId];
    console.log("New Status:", newStatus);

    try {
      const res = await axios.put(
        `https://expense-tracker-backend-xhfv.onrender.com/api/v1/expense/${expenseId}/done`,
        { done: newStatus },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log("Response:", res.data);

      if (res.data.success) {
        toast.success(res.data.message);
        setCheckedItems((prevData) => ({
          ...prevData,
          [expenseId]: newStatus,
        }));
        //optionally update the localstate for expense id , entire object needsz to be updated
        setLocalExpense(
          localExpense.map((exp) =>
            exp._id === expenseId ? { ...exp, done: newStatus } : exp
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeExpenseHandler = async (expenseId) => {
    try {
      const res = await axios.delete(
        `https://expense-tracker-backend-xhfv.onrender.com/api/v1/expense/remove/${expenseId}`
      );
      if (res.data.success) {
        toast.success(res.data.message);
        //update local state
        const filteredExpenses = localExpense.filter(
          (expense) => expense._id != expenseId
        );
        setLocalExpense(filteredExpenses);
        dispatch(setExpenses(filteredExpenses));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Table>
      <TableCaption>A list of your recent expenses.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px]">Mark as Done</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {localExpense.length === 0 ? (
          <span>Add your first expense</span>
        ) : (
          localExpense?.map((expense) => (
            <TableRow key={expense._id}>
              <TableCell className="font-medium">
                <Checkbox
                  checked={checkedItems[expense._id] ?? expense.done}
                  onCheckedChange={() => handleCheckboxChange(expense._id)}
                />
              </TableCell>
              <TableCell className={`${expense.done ? "line-through" : ""}`}>
                {expense.description}
              </TableCell>
              <TableCell className={`${expense.done ? "line-through" : ""}`}>
                {expense.amount}
              </TableCell>
              <TableCell className={`${expense.done ? "line-through" : ""}`}>
                {expense.category}
              </TableCell>
              <TableCell className={`${expense.done ? "line-through" : ""}`}>
                {expense.createdAt?.split("T")[0]}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2 ">
                  <button
                    onClick={() => removeExpenseHandler(expense._id)}
                    className="group p-2 rounded-full bg-gray-100 hover:bg-red-100 transition-all duration-200 ease-in-out"
                  >
                    <Trash className="h-4 w-4 stroke-red-600 fill-transparent group-hover:fill-red-600 group-hover:scale-110 transition-all duration-200" />
                  </button>
                  <UpdateExpense expense={expense} />
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5} className="font-bold text-xl">
            Total
          </TableCell>
          <TableCell className="text-right font-bold">₹{totalAmount}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default ExpenseTable;
