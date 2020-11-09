import { Component, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-grid-reusable',
  templateUrl: './grid-reusable.component.html',
  styleUrls: ['./grid-reusable.component.css']
})
export class GridReusableComponent implements OnInit {
  _value:any;

  @Input() scrollable: boolean;
  @Input() tableStyle: any;
  @Input() value;
  @Input() tableStyleClass: string;
  colGroupTemplate: TemplateRef<any>;

  // @Input() get value(): any[] {
  //   return this._value;
  //   }
  //   set value(val: any[]) {
  //       this._value = val;
  //   }
  constructor() { }

  ngOnInit(): void {
  }

}
