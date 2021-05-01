import { createAsyncThunk } from "@reduxjs/toolkit";
const dummyThunk = createAsyncThunk<any, any>("thunk/dummyT", async () => {
  await new Promise(function (resolve) {
    setTimeout(resolve, 1000);
  });
  return;
});

export { dummyThunk };
