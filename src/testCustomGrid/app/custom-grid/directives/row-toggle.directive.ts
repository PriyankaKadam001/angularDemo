import { Directive, HostListener, Input } from '@angular/core';
import { CustomGridComponent } from '../custom-grid.component';

@Directive({
    selector: '[pRowToggler]'
})
export class xRowToggler {

    @Input('pRowToggler') data: any;

    @Input() pRowTogglerDisabled: boolean;

    constructor(public dt: CustomGridComponent) { }

    @HostListener('click', ['$event'])
    onClick(event: Event) {
        if (this.isEnabled()) {
            this.dt.toggleRow(this.data, event);
            event.preventDefault();
        }
    }

    isEnabled() {
        return this.pRowTogglerDisabled !== true;
    }
}