import { AfterContentInit, AfterViewInit, Component, ContentChildren,EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges } from '@angular/core';
import { ObjectUtils } from '../grid/objectutils';
import { PrimeTemplate } from './directives/template-type.directive';

@Component({
  selector: 'app-custom-grid',
  templateUrl: './custom-grid.component.html',
  styleUrls: ['./custom-grid.component.css']
})
export class CustomGridComponent implements  OnInit, AfterViewInit, AfterContentInit, OnChanges{
  @Input() get value(): any[] {
    return this._value;
}
set value(val: any[]) {
    this._value = val;
}

@Input() get columns(): any[] {
  return this._columns;
}
set columns(cols: any[]) {
  this._columns = cols;
}

@Input() dataKey: string;
@Input() expandedRowKeys: { [s: string]: boolean; } = {};
@Output() onRowCollapse: EventEmitter<any> = new EventEmitter();
@Input() rowExpandMode: string = 'single';
@ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;
@Output() onRowExpand: EventEmitter<any> = new EventEmitter();

  bodyTemplate;
  captionTemplate;
  headerTemplate;
  expandedRowTemplate;
  _value;
  _columns;
  constructor() { }

  ngOnInit(): void {
  }

  
  ngAfterViewInit() {
    // if (this.isStateful() && this.resizableColumns) {
    //     this.restoreColumnWidths();
    // }
}

ngAfterContentInit() {
  
  this.templates.forEach((item) => {
      switch (item.getType()) {
          case 'caption':
              this.captionTemplate = item.template;
          break;

          case 'header':
              this.headerTemplate = item.template;
          break;

          case 'body':
              this.bodyTemplate = item.template;
          break;
          case 'rowexpansion':
            this.expandedRowTemplate = item.template;
          break;
          
      }
  });
}

ngOnChanges(simpleChange: SimpleChanges) {
  if (simpleChange.value) {  
    this._value = simpleChange.value.currentValue;

    // if (!this.lazy) {
    //     this.clearCache();
    //     this.totalRecords = (this._value ? this._value.length : 0);

    //     if (this.sortMode == 'single' && this.sortField)
    //         this.sortSingle();
    //     else if (this.sortMode == 'multiple' && this.multiSortMeta)
    //         this.sortMultiple();
    //     else if (this.hasFilter())       //sort already filters
    //         this._filter();
    // }

    // this.tableService.onValueChange(simpleChange.value.currentValue);
}

  if (simpleChange.columns) {
      this._columns = simpleChange.columns.currentValue;
      // this.tableService.onColumnsChange(simpleChange.columns.currentValue);

      // if (this._columns) {
      //     this.restoreColumnOrder();
      // }
  }
}

isRowExpanded(rowData: any): boolean {
  return this.expandedRowKeys[String(ObjectUtils.resolveFieldData(rowData, this.dataKey))] === true;
}
toggleRow(rowData: any, event?: Event) {
  if (!this.dataKey) {
      throw new Error('dataKey must be defined to use row expansion');
  }

  let dataKeyValue = String(ObjectUtils.resolveFieldData(rowData, this.dataKey));
alert(this.dataKey);
  if (this.expandedRowKeys[dataKeyValue] != null) {
      delete this.expandedRowKeys[dataKeyValue];
      this.onRowCollapse.emit({
          originalEvent: event,
          data: rowData
      });
  }
  else {
      if (this.rowExpandMode === 'single') {
          this.expandedRowKeys = {};
      }

      this.expandedRowKeys[dataKeyValue] = true;
      this.onRowExpand.emit({
          originalEvent: event,
          data: rowData
      });
  }

  if (event) {
      event.preventDefault();
  }

  
}
}
