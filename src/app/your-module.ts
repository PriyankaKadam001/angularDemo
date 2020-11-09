import { NgModule } from '@angular/core';
import { DynamicExpandableTableDataProvider, DynamicExpandableTableModule  } from 'ngx-dynamic-material-table';
import { DrugsListComponent } from './drug-list.component';
import { DrugsExpandableTableDataProvider } from './table-data-provider';

@NgModule({
    imports: [
        DynamicExpandableTableModule.forRoot()
    ],
    declarations: [
        DrugsListComponent
    ],
    providers: [
        DrugsExpandableTableDataProvider,
        { provide: DynamicExpandableTableDataProvider, useExisting: DrugsExpandableTableDataProvider },
    ],
})
export class YourModule { }