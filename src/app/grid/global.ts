import { ObjectUtils } from './objectutils';

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface FilterMetadata {
    value?: any;
    matchMode?: string;
    operator?: string;
}

export interface TableState {
    first?: number;
    rows?: number;
    sortField?: string;
    sortOrder?: number;
    multiSortMeta?: any[];
    filters?: {[s: string]: FilterMetadata | FilterMetadata[];};
    columnWidths?: string;
    tableWidth?: string;
    selection?: any;
    columnOrder?: string[];
    expandedRowKeys?: {[s: string]: boolean;};
    multiany?:any;
}

export interface FilterMetadata {
    value?: any;
    matchMode?: string;
    operator?: string;
}


export class FilterUtils {

    public static filter(value: any[], fields: any[], filterValue: string, filterMatchMode: string, filterLocale?: string) {
        let filteredItems: any[] = [];
        let filterText = ObjectUtils.removeAccents(filterValue).toLocaleLowerCase(filterLocale);

        if (value) {
            for (let item of value) {
                for (let field of fields) {
                    let fieldValue = ObjectUtils.removeAccents(String(ObjectUtils.resolveFieldData(item, field))).toLocaleLowerCase(filterLocale);

                    if (FilterUtils[filterMatchMode](fieldValue, filterText, filterLocale)) {
                        filteredItems.push(item);
                        break;
                    }
                }
            }
        }

        return filteredItems;
    }

    public static startsWith(value, filter, filterLocale?): boolean {
        if (filter === undefined || filter === null || filter.trim() === '') {
            return true;
        }

        if (value === undefined || value === null) {
            return false;
        }

        let filterValue = ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
        let stringValue = ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale);

        return stringValue.slice(0, filterValue.length) === filterValue;
    }

    public static contains(value, filter, filterLocale?): boolean {
        if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
            return true;
        }

        if (value === undefined || value === null) {
            return false;
        }

        let filterValue = ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
        let stringValue = ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale);

        return stringValue.indexOf(filterValue) !== -1;
    }

    public static notContains(value, filter, filterLocale?): boolean {
        if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
            return true;
        }

        if (value === undefined || value === null) {
            return false;
        }

        let filterValue = ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
        let stringValue = ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale);

        return stringValue.indexOf(filterValue) === -1;
    }

    public static endsWith(value, filter, filterLocale?): boolean {
        if (filter === undefined || filter === null || filter.trim() === '') {
            return true;
        }

        if (value === undefined || value === null) {
            return false;
        }

        let filterValue = ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
        let stringValue = ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale);

        return stringValue.indexOf(filterValue, stringValue.length - filterValue.length) !== -1;
    }

    public static equals(value, filter, filterLocale?): boolean {
        if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
            return true;
        }

        if (value === undefined || value === null) {
            return false;
        }

        if (value.getTime && filter.getTime)
            return value.getTime() === filter.getTime();
        else
            return ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale) == ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
    }

    public static notEquals(value, filter, filterLocale?): boolean {
        if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
            return false;
        }

        if (value === undefined || value === null) {
            return true;
        }

        if (value.getTime && filter.getTime)
            return value.getTime() !== filter.getTime();
        else
            return ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale) != ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
    }

    public static in(value, filter: any[], filterLocale?): boolean {
        if (filter === undefined || filter === null || filter.length === 0) {
            return true;
        }

        if (value === undefined || value === null) {
            return false;
        }

        for (let i = 0; i < filter.length; i++) {
            if (ObjectUtils.equals(value, filter[i])) {
                return true;
            }
        }

        return false;
    }

    public static between(value, filter: any[]): boolean {
        if (filter == null || filter[0] == null || filter[0] == null) {
            return true;
        }

        if (value === undefined || value === null) {
            return false;
        }

        if (value.getTime)
        return filter[0].getTime() >= value.getTime() && value.getTime() <= filter[1].getTime();
        else
            return filter[0] <= value && value <= filter[1];
    }

    public static lt(value, filter, filterLocale?): boolean {
        if (filter === undefined || filter === null) {
            return true;
        }

        if (value === undefined || value === null) {
            return false;
        }

        if (value.getTime && filter.getTime)
            return value.getTime() < filter.getTime();
        else
            return value < filter;
    }

    public static lte(value, filter, filterLocale?): boolean {
        if (filter === undefined || filter === null) {
            return true;
        }

        if (value === undefined || value === null) {
            return false;
        }

        if (value.getTime && filter.getTime)
            return value.getTime() <= filter.getTime();
        else
            return value <= filter;
    }

    public static gt(value, filter, filterLocale?): boolean {
        if (filter === undefined || filter === null) {
            return true;
        }

        if (value === undefined || value === null) {
            return false;
        }

        if (value.getTime && filter.getTime)
            return value.getTime() > filter.getTime();
        else
            return value > filter;
    }

    public static gte(value, filter, filterLocale?): boolean {
        if (filter === undefined || filter === null) {
            return true;
        }

        if (value === undefined || value === null) {
            return false;
        }

        if (value.getTime && filter.getTime)
            return value.getTime() >= filter.getTime();
        else
            return value >= filter;
    }

    public static is(value, filter, filterLocale?): boolean {
        return FilterUtils.equals(value, filter, filterLocale);
    }

    public static isNot(value, filter, filterLocale?): boolean {
        return FilterUtils.notEquals(value, filter, filterLocale);
    }

    public static before(value, filter, filterLocale?): boolean {
        return FilterUtils.lt(value, filter, filterLocale);
    }

    public static after(value, filter, filterLocale?): boolean {
        return FilterUtils.gt(value, filter, filterLocale);
    }
}

export class FilterMatchMode {
    public static readonly STARTS_WITH = 'startsWith';
    public static readonly CONTAINS = 'contains';
    public static readonly NOT_CONTAINS = 'notContains';
    public static readonly ENDS_WITH = 'endsWith';
    public static readonly EQUALS = 'equals';
    public static readonly NOT_EQUALS = 'notEquals';
    public static readonly IN = 'in';
    public static readonly LESS_THAN = 'lt';
    public static readonly LESS_THAN_OR_EQUAL_TO = 'lte';
    public static readonly GREATER_THAN = 'gt';
    public static readonly GREATER_THAN_OR_EQUAL_TO = 'gte';
    public static readonly BETWEEN = 'between';
    public static readonly IS = 'is';
    public static readonly IS_NOT = 'isNot';
    public static readonly BEFORE = 'before';
    public static readonly AFTER = 'after';
}

export interface SelectItem<T = any> {
    label?: string;
    value: T;
    styleClass?: string;
    icon?: string;
    title?: string;
    disabled?: boolean;
}


@Injectable({providedIn: 'root'})
export class PrimeNGConfig {

    ripple: boolean = false;

    filterMatchModeOptions = {
        text: [
            FilterMatchMode.STARTS_WITH,
            FilterMatchMode.CONTAINS,
            FilterMatchMode.NOT_CONTAINS,
            FilterMatchMode.ENDS_WITH,
            FilterMatchMode.EQUALS,
            FilterMatchMode.NOT_EQUALS
        ],
        numeric: [
            FilterMatchMode.EQUALS,
            FilterMatchMode.NOT_EQUALS,
            FilterMatchMode.LESS_THAN,
            FilterMatchMode.LESS_THAN_OR_EQUAL_TO,
            FilterMatchMode.GREATER_THAN,
            FilterMatchMode.GREATER_THAN_OR_EQUAL_TO
        ],
        date: [
            FilterMatchMode.IS,
            FilterMatchMode.IS_NOT,
            FilterMatchMode.BEFORE,
            FilterMatchMode.AFTER
        ]
    };

    private translation: any = {
        startsWith: 'Starts with',
        contains: 'Contains',
        notContains: 'Not contains',
        endsWith: 'Ends with',
        equals: 'Equals',
        notEquals: 'Not equals',
        lt: 'Less than',
        lte: 'Less than or equal to',
        gt: 'Greater than',
        gte: 'Great then or equals',
        is: 'Is',
        isNot: 'Is not',
        before: 'Before',
        after: 'After',
        clear: 'Clear',
        apply: 'Apply',
        matchAll: 'Match All',
        matchAny: 'Match Any',
        addRule: 'Add Rule',
        removeRule: 'Remove Rule',
        accept: 'Yes',
        reject: 'No'
    }

    private translationSource = new Subject<any>();
    
    translationObserver = this.translationSource.asObservable();
    
    getTranslation(key: string) {
        return this.translation[key];
    }

    setTranslation(value: any) {
        this.translation = {...this.translation, ...value};
        this.translationSource.next(this.translation);
    }
}

export class TranslationKeys {
    public static readonly STARTS_WITH = 'startsWith';
    public static readonly CONTAINS = 'contains';
    public static readonly NOT_CONTAINS = 'notContains';
    public static readonly ENDS_WITH = 'endsWith';
    public static readonly EQUALS = 'equals';
    public static readonly NOT_EQUALS = 'notEquals';
    public static readonly LT = 'lt';
    public static readonly LTE = 'lte';
    public static readonly GT = 'gt';
    public static readonly GTE = 'gte';
    public static readonly IS = 'is';
    public static readonly IS_NOT = 'isNot';
    public static readonly BEFORE = 'before';
    public static readonly AFTER = 'after';
    public static readonly CLEAR = 'clear';
    public static readonly APPLY = 'apply';
    public static readonly MATCH_ALL = 'matchAll';
    public static readonly MATCH_ANY = 'matchAny';
    public static readonly ADD_RULE = 'addRule';
    public static readonly REMOVE_RULE = 'removeRule';
    public static readonly ACCEPT = 'accept';
    public static readonly REJECT = 'reject';
}