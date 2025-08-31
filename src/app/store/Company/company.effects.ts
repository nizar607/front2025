import { Injectable } from "@angular/core";
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CompanyService } from "src/app/core/services/company/company.service";
import {
  addcompanyData,
  addcompanyDataFailure,
  addcompanyDataSuccess,
  deletecompanyData,
  deletecompanyFailure,
  deletecompanySuccess,
  fetchcompanyData,
  fetchcompanyFailure,
  fetchcompanySuccess,
  updatecompanyData,
  updatecompanyDataFailure,
  updatecompanyDataSuccess,
  uploadImage,
  uploadImageSuccess,
  uploadImageFailure,
  createCompanyWithImage,
  createCompanyWithImageSuccess,
  createCompanyWithImageFailure,
  fetchcompanyByWebsite,
  fetchcompanyByWebsiteSuccess,
  fetchcompanyByWebsiteFailure,
  fetchVersionByWebsite,
  fetchVersionByWebsiteSuccess,
  fetchVersionByWebsiteFailure
} from "./company.action";
import { CompanyModel } from "./company.model";
import { Router } from "@angular/router";


@Injectable()
export class CompanyEffects {

  fetchData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchcompanyData),
      mergeMap(() =>
        this.companyService.fetchData().pipe(
          map((companydata) => fetchcompanySuccess({ fetchedCompanyData: companydata })),
          catchError((error) =>
            of(fetchcompanyFailure({ error }))
          )
        )
      )
    )
  );

  addData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addcompanyData),
      mergeMap(({ newData }) =>
        this.companyService.addData(newData).pipe(
          map((addedCompany: any) => addcompanyDataSuccess({ newData: addedCompany })),
          catchError((error) => of(addcompanyDataFailure({ error })))
        )
      )
    )
  );

  updateData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updatecompanyData),
      mergeMap(({ id, updatedData }) =>
        this.companyService.updateData(id, updatedData).pipe(
          map((newUpdatedData: any) => updatecompanyDataSuccess({ updatedData: newUpdatedData })),
          catchError((error) => of(updatecompanyDataFailure({ error })))
        )
      )
    )
  );



  deleteData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deletecompanyData),
      mergeMap(({ id }) =>
        this.companyService.deleteData(id).pipe(
          map(() => deletecompanySuccess({ id })),
          catchError((error) => of(deletecompanyFailure({ error })))
        )
      )
    )
  );

  // Chained effect for creating company with image
  createCompanyWithImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createCompanyWithImage),
      mergeMap(({ companyData, imageFile }) =>
        this.companyService.addData(companyData).pipe(
          mergeMap((createdCompany: any) => {
            console.log("inside store inside service add Data");
            if (imageFile && createdCompany?.id) {
              // Create FormData for image upload
              const formData = new FormData();
              formData.append('file', imageFile);

              return this.companyService.updateCompanyLogo(createdCompany.id, formData).pipe(
                map((updatedCompany: any) => createCompanyWithImageSuccess({ company: updatedCompany })),
                catchError((error) => of(createCompanyWithImageFailure({ error })))
              );
            } else {
              // No image to upload, return success with created company
              return of(createCompanyWithImageSuccess({ company: createdCompany }));
            }
          }),
          catchError((error) => of(createCompanyWithImageFailure({ error })))
        )
      )
    )
  );

  fetchByWebsite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchcompanyByWebsite),
      mergeMap(({ website }) =>
        this.companyService.getCompanyByWebsite(website).pipe(
          map((company) => fetchcompanyByWebsiteSuccess({ company })),
          catchError((error) => of(fetchcompanyByWebsiteFailure({ error })))
        )
      )
    )
  );

  // New: Fetch simple version string by website
  fetchVersionByWebsite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchVersionByWebsite),
      mergeMap(({ website }) =>
        this.companyService.getVersionByWebsite(website).pipe(
          map((version: string) => fetchVersionByWebsiteSuccess({ version })),
          catchError((error) => of(fetchVersionByWebsiteFailure({ error })))
        )
      )
    )
  );

  // Navigate to /client/:companyName/articles after successful fetch by website
  navigateOnFetchByWebsiteSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fetchcompanyByWebsiteSuccess),
        map(({ company }) => {
          const rawName: string = company?.name || company?.companyName || company?.heroTitle || company?.ctaTitle || '';
          const slug = encodeURIComponent(rawName.trim().replace(/\s+/g, '-'));
          if (slug) {
            this.router.navigate(['/client', slug]);
          }
        })
      ),
    { dispatch: false }
  );
  constructor(
    private actions$: Actions,
    private companyService: CompanyService,
    private router: Router
  ) {}
}
