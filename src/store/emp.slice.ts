import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface empInfo {
    id:number
    title:string
    firstName:string
    lastName:string
    dateOfBirth:string
    nationality:string
    gender:number
    mobilePhone:string
    countryCode:string
    citizenId:string | undefined
    passport:string | undefined
    salary:string
}
interface EmpState{
    empDate:empInfo[],
    nextId:number
}
const initialState:EmpState={
    empDate:[],
    nextId:1
}

const empSlice = createSlice({
    name:'emp',
    initialState,
    reducers:{
        addEmpInfo: (state, action: PayloadAction<Omit<empInfo, 'id'>>) => {
            state.empDate.push({ ...action.payload, id: state.nextId });
            state.nextId++;
        },
        updateEmpInfo:(state,action : PayloadAction<empInfo>)=>{
            const index = state.empDate.findIndex(item => item.id === action.payload.id)
            if (index !== -1) {
                state.empDate[index] = action.payload;
              }
        },
        removeEmpInfo:(state,action : PayloadAction<number>)=>{
            state.empDate = state.empDate.filter(item => item.id !== action.payload)
        },
        removeEmpMulti:(state,action : PayloadAction<number[]>)=>{
            state.empDate = state.empDate.filter(item => !action.payload.includes(item.id));
        },
        removeAllEmpInfo: (state) => {
            state.empDate = [];
          },
        // setEmpInfo:(state,action:PayloadAction<empInfo[]>)=>{
        //     state.empDate = action.payload
        // }
    }
})
export const {addEmpInfo,updateEmpInfo,removeEmpInfo,removeAllEmpInfo,removeEmpMulti} = empSlice.actions
export default empSlice.reducer