import { setExpenses } from "@/redux/expenseSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const useGetExpenses = () => {
    const dispatch = useDispatch();
    const category = useSelector((store) => store.expense.category);
    const markAsDone = useSelector((store) => store.expense.markAsDone);


    useEffect(()=>{
        const fetchExpenses = async () =>{
            try {
                axios.defaults.withCredentials=true ;
                const res = await axios.get(`http://localhost:8000/api/v1/expense/getall?category=${category}&done=${markAsDone}`);
                if(res.data.success){
                    console.log("Fetched expenses:", res.data.expense);
                    dispatch(setExpenses(res.data.expense));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchExpenses();
    },[dispatch,category,markAsDone]);
}

export default useGetExpenses ;