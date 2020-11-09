import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, TemplateRef, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { Table } from './grid.component';

@Component({
    selector: '[pTableBody]',
    template: `
    <ng-container *ngIf="!dt.expandedRowTemplate && !dt.virtualScroll">
    <ng-template ngFor let-rowData let-rowIndex="index" [ngForOf]="(dt.paginator && !dt.lazy) ? ((dt.filteredValue||dt.value) | slice:dt.first:(dt.first + dt.rows)) : (dt.filteredValue||dt.value)" [ngForTrackBy]="dt.rowTrackBy">
        <ng-container *ngTemplateOutlet="template; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns, editing: (dt.editMode === 'row' && dt.isRowEditing(rowData))}"></ng-container>
    </ng-template>
</ng-container>
<ng-container *ngIf="!dt.expandedRowTemplate && dt.virtualScroll">
    <ng-template cdkVirtualFor let-rowData let-rowIndex="index" [cdkVirtualForOf]="dt.filteredValue||dt.value" [cdkVirtualForTrackBy]="dt.rowTrackBy" [cdkVirtualForTemplateCacheSize]="0">
        <ng-container *ngTemplateOutlet="rowData ? template: dt.loadingBodyTemplate; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns, editing: (dt.editMode === 'row' && dt.isRowEditing(rowData))}"></ng-container>
    </ng-template>
</ng-container>
<ng-container *ngIf="dt.expandedRowTemplate">
    <ng-template ngFor let-rowData let-rowIndex="index" [ngForOf]="(dt.paginator && !dt.lazy) ? ((dt.filteredValue||dt.value) | slice:dt.first:(dt.first + dt.rows)) : (dt.filteredValue||dt.value)" [ngForTrackBy]="dt.rowTrackBy">
        <ng-container *ngIf="dt.isRowExpanded(rowData)">
            <ng-container *ngTemplateOutlet="dt.expandedRowTemplate; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns}"></ng-container>
        </ng-container>
    </ng-template>
</ng-container>
<ng-container *ngIf="dt.loading">
    <ng-container *ngTemplateOutlet="dt.loadingBodyTemplate; context: {$implicit: columns, frozen: frozen}"></ng-container>
</ng-container>
<ng-container *ngIf="dt.isEmpty() && !dt.loading">
    <ng-container *ngTemplateOutlet="dt.emptyMessageTemplate; context: {$implicit: columns, frozen: frozen}"></ng-container>
</ng-container>   
    `,
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.None
})
export class TableBody implements OnDestroy {

    @Input("pTableBody") columns: any[];

    @Input("pTableBodyTemplate") template: TemplateRef<any>;

    @Input() frozen: boolean;

    subscription: Subscription;

    constructor(public dt: Table,  public cd: ChangeDetectorRef) {
       
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}