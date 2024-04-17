import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as UserActions from "./user.actions";
import { UserService } from "../Services/user.service";
import { Observable, catchError, map, mergeMap, of, tap } from "rxjs";
import { IUser, IUserLoginFormData } from "../Model/User";
import { Router } from "@angular/router";


@Injectable()
// export class UserEffects {

//     loginUser$ = createEffect(() =>{
//         this.actions$.pipe(ofType(UserActions.loginUser),mergeMap(()=>{
//             return this.userService.loginUser()
//         }))
//     })

//     constructor(private actions$: Actions, private userService: UserService){}
// }

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService, private router:Router) {}


  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loginUser),
      mergeMap((action: { formData: IUserLoginFormData }) => {
        return this.userService.loginUser(action.formData).pipe(
          map((response: any) =>  {
            // console.log("User Dataa",userData.data);
            const userData:IUser = response.data;
            
           return UserActions.loginUserSuccess({ userData })
          }),
          catchError((error) => of(UserActions.loginUserFailure({ error }))),
          tap((action) => { 
            console.log(action);
            if (action.type === UserActions.loginUserSuccess.type) {
              
              if (action.userData.accessToken) {
                localStorage.setItem('token', action.userData.accessToken);
              }
              this.router.navigate(['/']); // Redirect on success
            }
          })
        );
      })
    ))


    // getUser


  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getUser),
      mergeMap(()=>
        this.userService.getUser().pipe(
          map((response: any)=> {
            return UserActions.getUserSuccess({userData: response.data})
          }),
          catchError((error) => of(UserActions.getUserFailure({ error })))
        )
      )
    )

  );


 
}


// tap((action) => this.router.navigate(['/'])) // Redirect on success