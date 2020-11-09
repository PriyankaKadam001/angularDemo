import { Directive, Input, OnInit, TemplateRef } from '@angular/core';

@Directive({
    selector: '[pTemplate]',
    host: {
    }
})
export class PrimeTemplate{
    
    @Input() type: string;
    
    @Input('pTemplate') name: string;
    
    constructor(public template: TemplateRef<any>) {}

   
    getType(): string {
        return this.name;
    }
}