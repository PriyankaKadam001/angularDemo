import { ChangeDetectorRef, Component, Input, OnDestroy, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { CustomGridComponent } from '../custom-grid.component';

@Component({
    selector: '[xTableContent]',
    template: `<ng-container *ngIf="!dt.expandedRowTemplate">
    <ng-template ngFor let-rowData let-rowIndex="index" [ngForOf]="dt.value" >
         <ng-container *ngTemplateOutlet="template; context: {$implicit: rowData, rowIndex:rowIndex}"></ng-container>
    </ng-template>
</ng-container> 

<ng-container *ngIf="dt.expandedRowTemplate">
<ng-template ngFor let-rowData let-rowIndex="index" [ngForOf]="dt.value" >
    <ng-container *ngTemplateOutlet="template; context: {$implicit: rowData, rowIndex:rowIndex}"></ng-container>
    <ng-container *ngIf="dt.isRowExpanded(rowData)">
        <ng-container *ngTemplateOutlet="dt.expandedRowTemplate; context: {$implicit: rowData, columns: columns, rowIndex:rowIndex}"></ng-container>
    </ng-container>
</ng-template>
</ng-container>`
})
export class CustomTableBody implements OnDestroy {

    @Input("xTableContent") columns: any[];

    @Input("xTableContentTemplate") template: TemplateRef<any>;

    @Input() frozen: boolean;

    subscription: Subscription;

    constructor(public dt: CustomGridComponent,public cd: ChangeDetectorRef) {
        
    }

    ngOnInit(){
       console.log(this.template);
    }
    ngOnDestroy() {
        
    }
}