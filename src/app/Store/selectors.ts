import { createSelector } from "@ngrx/store";
import { IUserState } from "../Model/User";
import { IAppState } from "./appState.inteface";
import { state } from "@angular/animations";

export const selectUserRoot = (state: IAppState)=>state.user;


export const isLoadingSelector = createSelector(
    selectUserRoot,
    (state)=>state.isLoading
)

export const userSelector = createSelector(
    selectUserRoot,
    (state) => state.user
)

export const errorSelector = createSelector(
    selectUserRoot,
    (state)=> state.error
)