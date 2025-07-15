import React from "react";
import Navbar from "./Navbar";
import CreateExpense from "./CreateExpense";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useDispatch } from "react-redux";
import { setCategory, setMarkAsDone } from "@/redux/expenseSlice";
import ExpenseTable from "./ExpenseTable";
import useGetExpenses from "@/hooks/useGetExpenses";

const Home = () => {
  useGetExpenses();
  const dispatch = useDispatch();
  const changeCategoryHandler = (value) => {
    dispatch(setCategory(value));
  };
  const changeDoneHandler = (value) => {
    dispatch(setMarkAsDone(value));
  };
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto mt-6">
        <div className="flex items-center justify-between mb-5">
          <h1>Expense</h1>
          <CreateExpense />
        </div>
        <div className="flex items-center gap-2 my-5">
          <h1 className="font-medium text-lg">Filter By:</h1>
          <Select onValueChange={changeCategoryHandler}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Food">Food</SelectItem>
                <SelectItem value="Entertainment">Entertainment</SelectItem>
                <SelectItem value="Rent">Rent</SelectItem>
                <SelectItem value="Outing">Outing</SelectItem>
                <SelectItem value="All">All</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select onValueChange={changeDoneHandler}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Mark as" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Done">Done</SelectItem>
                <SelectItem value="Undone">Undone</SelectItem>
                <SelectItem value="Both">Both</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <ExpenseTable/>
      </div>
    </div>
  );
};

export default Home;
