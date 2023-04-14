import { createSlice } from '@reduxjs/toolkit';

const calorieSlice = createSlice({
  name: 'calorie',
  initialState: {
    goal: null,
    remaining: null,
  },
  reducers: {
    setCalorieGoal: (state, action) => {
      state.goal = action.payload;
      state.remaining = action.payload;
    },
    subtractCalories: (state, action) => {
      state.remaining -= action.payload;
    },
    resetCalories: (state) => {
        state.remaining = state.goal;
        state.consumed = 0;
      },
  },
});

export const { setCalorieGoal, subtractCalories, resetCalories } = calorieSlice.actions;
export default calorieSlice.reducer;
