import { Routes } from '@angular/router';
import { CreateUsersComponent } from './components/Users/create-users/create-users.component';
import { UpdateUsersComponent } from './components/Users/update-users/update-users.component';
import { ShowUsersComponent } from './components/Users/show-users/show-users.component';
import { DeleteUsersComponent } from './components/Users/delete-users/delete-users.component';
import { CreateUserTypeComponent } from './components/userType/create-user-type/create-user-type.component';
import { ShowUserTypeComponent } from './components/userType/show-user-type/show-user-type.component';
import { UpdateUserTypeComponent } from './components/userType/update-user-type/update-user-type.component';
import { DeleteUserTypeComponent } from './components/userType/delete-user-type/delete-user-type.component';
import { ShowProgramComponent } from './components/program/show-program/show-program.component';
import { CreateProgramComponent } from './components/program/create-program/create-program.component';
import { DeleteProgramComponent } from './components/program/delete-program/delete-program.component';
import { UpdateProgramComponent } from './components/program/update-program/update-program.component';
import { CreateFacultyComponent } from './components/faculty/create-faculty/create-faculty.component';
import { ShowFacultyComponent } from './components/faculty/show-faculty/show-faculty.component';
import { UpdateFacultyComponent } from './components/faculty/update-faculty/update-faculty.component';
import { CreateGruopComponent } from './components/invetigationGruops/create-gruop/create-gruop.component';
import { DeleteGruopComponent } from './components/invetigationGruops/delete-gruop/delete-gruop.component';
import { UpdateGruopComponent } from './components/invetigationGruops/update-gruop/update-gruop.component';
import { ShowGruopComponent } from './components/invetigationGruops/show-gruop/show-gruop.component';
import { CreatePublicationTypeComponent } from './components/PublicationTypes/create-publication-type/create-publication-type.component';
import { ShowPublicationTypeComponent } from './components/PublicationTypes/show-publication-type/show-publication-type.component';
import { UpdatePublicationTypeComponent } from './components/PublicationTypes/update-publication-type/update-publication-type.component';
import { DeletePublicationTypeComponent } from './components/PublicationTypes/delete-publication-type/delete-publication-type.component';
import { ShowKeywordsComponent } from './components/keywords/show-keywords/show-keywords.component';
import { UpdateKeywordsComponent } from './components/keywords/update-keywords/update-keywords.component';
import { CreateKeywordsComponent } from './components/keywords/create-keywords/create-keywords.component';
import { DeleteKeywordsComponent } from './components/keywords/delete-keywords/delete-keywords.component';
import { CreatePublicationComponent } from './components/Publications/create-publication/create-publication.component';
import { UpdatePublicationComponent } from './components/Publications/update-publication/update-publication.component';
import { ShowPublicationComponent } from './components/Publications/show-publication/show-publication.component';
import { DeletePublicationComponent } from './components/Publications/delete-publication/delete-publication.component';

export const routes: Routes = [
    { 
        path: '', 
        redirectTo: '/', 
        pathMatch: 'full' 
    },
    {
        path: "users",
        component: ShowUsersComponent
    },
    {
        path: "users/new",
        component: CreateUsersComponent
    },
    {
        path: "users/edit/:id",
        component: UpdateUsersComponent
    },
    {
        path: "user-types",
        component: ShowUserTypeComponent
    },
    {
        path: "user-types/new",
        component: CreateUserTypeComponent
    },
    {
        path: "user-types/edit/:id",
        component: UpdateUserTypeComponent
    },
    {
        path: "program",
        component: ShowProgramComponent
    },
    {
        path: "program/new",
        component: CreateProgramComponent
    },
    {
        path: "program/edit/:id",
        component: UpdateProgramComponent
    },
    {
        path: "faculty",
        component: ShowFacultyComponent
    },
    {
        path: "faculty/new",
        component: CreateFacultyComponent
    },
    {
        path: "faculty/edit/:id",
        component: UpdateFacultyComponent
    },
    {
        path: "investigationGroup",
        component: ShowGruopComponent
    },
    {
        path: "investigationGruop/new",
        component: CreateGruopComponent
    },
    {
        path: "investigationGroup/edit/:id",
        component: UpdateGruopComponent
    },
    {
        path: "publication-types",
        component: ShowPublicationTypeComponent
    },
    {
        path: "publication-types/new",
        component: CreatePublicationTypeComponent
    },
    {
        path: "publication-types/edit/:id",
        component: UpdatePublicationTypeComponent
    },
    {
        path: "keywords",
        component: ShowKeywordsComponent
    },
    {
        path: "keywords/new",
        component: CreateKeywordsComponent
    },
    {
        path: "keywords/edit/:id",
        component: UpdateKeywordsComponent
    },
    {
        path: "publications",
        component: ShowPublicationComponent
    },
    {
        path: "publications/new",
        component: CreatePublicationComponent
    },
    {
        path: "publications/edit/:id",
        component: UpdatePublicationComponent
    },

];