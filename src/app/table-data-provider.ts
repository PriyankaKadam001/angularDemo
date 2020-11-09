import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
    AbstractDynamicExpandableTableDataProvider,
    DynamicExpandableTableColumnDefinitionConstants,
    DynamicExpandableTableExpandedItemColumnInterace,
    DynamicTableColumnInterace,
    DynamicExpandableTableOptionInterface,
    DynamicTableGroupInterface,
    DynamicTableUIUtils
} from 'ngx-dynamic-material-table';
import { map } from 'rxjs/operators';

@Injectable()
export class DrugsExpandableTableDataProvider extends AbstractDynamicExpandableTableDataProvider<Object> {

    public static readonly MOUSE_OVER_EVENT_SHOW_DRUG_PACKAGE = 'showDrugPackageOnMouseOver';
    public static readonly MOUSE_OUT_EVENT_HIDE_DRUG_PACKAGE = 'hideDrugPackageOnMouseOut';
    public static readonly ACTION_EDIT_DRUG = 'editSelectedDrug';
    private static readonly GROUP_NAME_1 = 'Requested drugs';
    private static readonly GROUP_NAME_2 = 'Active drugs';
    private static readonly GROUP_NAME_3 = 'Reserved drugs';
    private static readonly GROUP_NAME_4 = 'Rejected drugs';
    private static readonly GROUP_NAME_5 = 'Expired drugs';
    private expandedItemTableData: Object[] = this.createExpandedItemData(); // 1. level expanded row data
    
    constructor(private drugsService: DrugsService, private userService: UserService) { super(); }

    // Defines and gets the columns displayed in the drugs list table.
    getColumns(): DynamicTableColumnInterace[] {
        return [
            this.iconColumnDefinition,
            { columns: [DynamicExpandableTableColumnDefinitionConstants.DESCRIPTION], names: ['ATC Code'], backgroundColor: null },
            { columns: [DynamicExpandableTableColumnDefinitionConstants.HTML_CONTENT_SUMMARY], names: ['Drug Name'], backgroundColor: null },
            { columns: [DynamicExpandableTableColumnDefinitionConstants.HTML_ICON], names: ['Drug Icon'], backgroundColor: null },
            {
                columns:
                    [
                        DynamicExpandableTableColumnDefinitionConstants.OTHER_TEXT_BASED1,
                        DynamicExpandableTableColumnDefinitionConstants.OTHER_TEXT_BASED2,
                        DynamicExpandableTableColumnDefinitionConstants.OTHER_TEXT_BASED3,
                        DynamicExpandableTableColumnDefinitionConstants.OTHER_TEXT_BASED4,
                    ],
                names: ['Morning', 'Noon', 'Evening', 'Night'], backgroundColor: null
            },
            { columns: [DynamicExpandableTableColumnDefinitionConstants.TITLE], names: ['Drug Administration'], backgroundColor: null },
            this.expandableColumn,
            { columns: [DynamicExpandableTableColumnDefinitionConstants.HTML_ACTIONS], names: ['Actions'], backgroundColor: '#4AC3FC' }
        ];
    }

    // Retrieves the drugs data displayed as row items inside of the table.
    getData(sort: string, order: string, page: number): Observable<object[]> {
        return this.drugsService.loadDrugs('de');
    }

    // Retrieves an individual icon for each groups icon cell
    getAdditionalInfo(item: object, rowIndex: number, groupIndex: number, groupName: string): string {
        const stringBuffer = new StringBuffer();
        if (groupName === EMedisExpandableTableDataProvider.GROUP_NAME_1 && groupIndex === 0) {
            stringBuffer.append('<mat-icon class="icon-large" svgIcon="' + User.getIcon(7) + '"></mat-icon>');
        } else if (groupName === EMedisExpandableTableDataProvider.GROUP_NAME_2 && groupIndex === 1) {
            stringBuffer.append('<mat-icon class="icon-large" svgIcon="cdss-ok"></mat-icon>');
        } else if (groupName === EMedisExpandableTableDataProvider.GROUP_NAME_3 && groupIndex === 2) {
            stringBuffer.append('<mat-icon class="icon-large" svgIcon="cdss-warning"></mat-icon>');
        } else if (groupName === EMedisExpandableTableDataProvider.GROUP_NAME_4 && groupIndex === 3) {
            stringBuffer.append('<mat-icon class="icon-large" svgIcon="cdss-danger"></mat-icon>');
        }
        return stringBuffer.toString();
    }

    // Retrieves the drug's pill image and a functionality to show the drug package inside a modal window on mouse over
    getHTMLIcon(item: object, rowIndex: number, groupIndex: number, groupName: string): string {
        const stringBuffer = new StringBuffer();
        stringBuffer.append('<img tooltipDirective src="' + item['medinfo']['_pifLink'] + '" alt="' + item['name'] + '" class="drug-image"');
        stringBuffer.append(' (mouseover)="' + DynamicTableUIUtils.createMouseOverEvent(EMedisExpandableTableDataProvider.MOUSE_OVER_EVENT_SHOW_DRUG_PACKAGE, item) + '"');
        stringBuffer.append(' (mouseout)="' + DynamicTableUIUtils.createMouseOutEvent(EMedisExpandableTableDataProvider.MOUSE_OUT_EVENT_HIDE_DRUG_PACKAGE, item) + '"');
        stringBuffer.append(' />');
        return stringBuffer.toString();
    }

    // Retrieves the intake direction (after the meal) and drugs administrator route (per oral) information
    getTitle(item: object, rowIndex: number, groupIndex: number, groupName: string): string {
        let title = '<div class="drug-when">' + this.eMedisTranslationsService.getWhenTranslatedText(item) + '</div>';
        title += '<div class="drug-administration">' + item['_medicationAdministrationDescription'] + '</div>';
        return title;
    }

    // Retrieves the substances of a drug (i.e. paracetamol)
    getDescription(item: object, rowIndex: number, groupIndex: number, groupName: string): string {
        return '<div class="medinfo-atc">' + DrugsUtils.getAtcDescriptionByCode(this.atcCodes, item['medinfo']['_atc']) + '</div>';
    }

    // Retrieves the substances of a drug (i.e. paracetamol) 
    getHTMLContentSummary(item: object, rowIndex: number, groupIndex: number, groupName: string): string {
        let description = '<div class="drug-name">' + item['medinfo']['dscr'] + '</div>';
        const substances = item['medinfo']['subst'];
        if (substances != null && substances.length > 0) {
            description += '<div class="active-ingredient">' + EMedisUtils.convertSubstancesToString(substances) + '</div>';
        }
        return description;
    }

    // Retrieves additional text based columns
    getOtherTextBased(item: object, columnIndex: number, groupIndex: number, groupName: string): string {
        const unit = item['medinfo']['_qtyu'];
        if (columnIndex === 1) {
            return item['_morning'];
        } else if (columnIndex === 2) {
            return item['_noon'];
        } else if (columnIndex === 3) {
            return item['_evening'];
        } else if (columnIndex === 4) {
            return item['_night'];
        }
        return '';
    }

    // Retrieves the actions for each drug itemn and group. (i.e. for the first group we return a slide toggle button)
    getHTMLAction(item: object, rowIndex: number, groupIndex: number, groupName: string): string {
        const stringBuffer = new StringBuffer();
        if (groupName === DrugsListDataProvider.GROUP_NAME_1 && groupIndex === 0) {
            stringBuffer.append('<mat-slide-toggle color="accent" class="requested-drugs-slide-toggle"></mat-slide-toggle>');
        } else {
            stringBuffer.append('<mat-icon class="icon-medium icon-color-white edit-drug"');
            stringBuffer.append('(click)="' + DynamicTableUIUtils.createHTMLAction(EMedisExpandableTableDataProvider.ACTION_EDIT_DRUG, item) + '">');
            stringBuffer.append('edit');
            stringBuffer.append('</mat-icon>');
        }
        return stringBuffer.toString();
    }

    // Defines and retrieves options for several table groups 
    getOptions(): DynamicExpandableTableOptionInterface[] {
        const options: DynamicExpandableTableOptionInterface[] = [];
        // General column options
        const expandableColumnOption = Object.assign({}, this.expandableColumn);
        expandableColumnOption['hoverBackgroundColor'] = '#494949'; // Change hover background color
        const actionsColumnOption = { columns: [DynamicExpandableTableColumnDefinitionConstants.HTML_ACTIONS], names: ['Actions'], backgroundColor: '#4AC3FC' };
        actionsColumnOption['backgroundColor'] = '#FFFFFF'; // Change background color of the actions column
        // 1. table group options: Requested drugs
        const groupByRequested: DynamicTableGroupInterface = this.createGroupExpression('approval', [{ 'operator': '==', 'value': DrugApprovalConstants.PENDING }]);
        options.push(this.createExpandableTableOption(DrugsExpandableTableDataProvider.GROUP_NAME_1, [{ group: groupByRequested, operator: '' }], [expandableColumnOption, actionsColumnOption], '#F2E70A'));
        // 2. table group options: Active drugs
        const table2IconColumnOption = Object.assign({}, this.iconColumnDefinition);
        table2IconColumnOption['backgroundColor'] = '#4AC3FC';
        const groupByApproved: DynamicTableGroupInterface = this.createGroupExpression('approval', [{ 'operator': '==', 'value': DrugApprovalConstants.APPROVED }]);
        const groupByWithoutReserved: DynamicTableGroupInterface = this.createGroupExpression('_usage', [{ 'operator': '!=', 'value': DrugUsageConstants.RESERVED }], 'Number');
        const groupByDate: DynamicTableGroupInterface = this.createGroupExpression('date-to', [{ 'operator': '==', 'value': 'null' }, { 'operator': '||', 'value': '' }, { 'operator': '!=', 'value': null }], 'Date');
        options.push(this.createExpandableTableOption(DrugsExpandableTableDataProvider.GROUP_NAME_2, [{ group: groupByApproved, operator: '&&' }, { group: groupByWithoutReserved, operator: '&&' }, { group: groupByDate, operator: '' }], [expandableColumnOption, table2IconColumnOption]));
        // 3. table group options: Reserved drugs
        const table3IconColumnOption = Object.assign({}, this.iconColumnDefinition);
        table3IconColumnOption['backgroundColor'] = '#4AC3FC';
        const groupByReserved: DynamicTableGroupInterface = this.createGroupExpression('_usage', [{ 'operator': '==', 'value': DrugUsageConstants.RESERVED }], 'Number');
        options.push(this.createExpandableTableOption(DrugsExpandableTableDataProvider.GROUP_NAME_3, [{ group: groupByReserved, operator: '' }], [expandableColumnOption, table3IconColumnOption]));
        // return table options
        return options;
    }

    // Retrieves the 1. level expanded row columns
    getExpandedItemTableColumns(expandedItem: object): DynamicExpandableTableExpandedItemColumnInterace[] {
        return [
            this.createExpandedItemColumn('expandedItemExpandableColumn', '', '#494949', '#ffffff', 'timer'),
            this.createExpandedItemColumn('unit', 'Einheit', '#494949', '#ffffff'),
            this.createExpandedItemColumn('unittype', 'Form', '#494949', '#ffffff'),
            this.createExpandedItemColumn('article', 'Art', '#494949', '#ffffff'),
            this.createExpandedItemColumn('dateRange', 'Wirkzeitraum', '#494949', '#ffffff'),
            this.createExpandedItemColumn('reason', 'Grund', '#494949', '#ffffff'),
            this.createExpandedItemColumn('physicianDrugAdministrator', 'Verordnet durch', '#494949', '#ffffff'),
            this.createExpandedItemColumn('comment', 'Bemerkung', '#494949', '#ffffff')
        ];
    }

    // Retrieves the data that should be displayed for the 1. expanded row
    getExpandedItemTableData(expandedItem: object): Observable<object[]> {
        const itemDetails: Object = this.expandedItemTableData[0];
        itemDetails['unit'] = expandedItem['medinfo']['_qty'] + ' ' + expandedItem['medinfo']['_qtyu'];
        itemDetails['unittype'] = expandedItem['medinfo']['_form'];
        itemDetails['article'] = this.eMedisTranslationsService.getUsageTranslatedText(expandedItem);
        itemDetails['dateRange'] = 'Von: ' + expandedItem['date-from'];
        if (expandedItem['date-to'] != null) {
            itemDetails['dateRange'] += '<br/>' + 'Bis: ' + expandedItem['date-to'];
        }
        itemDetails['reason'] = 'Infektion';
        itemDetails['physicianDrugAdministrator'] = expandedItem['physician-drug-administrator-name'];
        itemDetails['comment'] = expandedItem['comment'];
        return of(this.expandedItemTableData);
    }

    // Retrieves the 2. level expanded row columns
    getExpandedItemDetailsTableColumns(expandedItemDetails: object, expandedItem: object): DynamicExpandableTableExpandedItemColumnInterace[] {
        return [
            this.createExpandedItemColumn('icon', '', '#494949', '#ffffff', 'history-icon'),
            this.createExpandedItemColumn('unit', 'Einheit', '#494949', '#ffffff'),
            this.createExpandedItemColumn('unittype', 'Einheitstyp', '#494949', '#ffffff'),
            this.createExpandedItemColumn('article', 'Art', '#494949', '#ffffff'),
            this.createExpandedItemColumn('dateRange', 'Wirkzeitraum', '#494949', '#ffffff'),
            this.createExpandedItemColumn('reason', 'Indikation', '#494949', '#ffffff'),
            this.createExpandedItemColumn('physicianDrugAdministrator', 'Verordnet durch', '#494949', '#ffffff'),
            this.createExpandedItemColumn('comment', 'Bemerkung', '#494949', '#ffffff')
        ];
    }

    // Retrieves the data that should be displayed for the 2. expanded row
    getExpandedItemDetailsTableData(expandedItemDetails: object, expandedItem: object): Observable<object[]> {
        return this.loadDrugHistory(expandedItem['id']['elementId']);
    }

    // Loads the durgs history
    private loadDrugHistory(drugElementId: number): Observable<object[]> {
        return this.drugsService.loadDrugHistory(drugElementId, this.UserConfig.patientId, this.UserConfig.orgId)
            .pipe(
                map((drugElements: Object[]) => {
                    return this.drugsHistoryConverterPipe.transform(drugElements);
                })
            );
    }

    // Create an key value based object as an expanded item
    private createExpandedItemData(): Object[] {
        return [
            {
                'expandedItemExpandableColumn': '',
                'unit': '',
                'unittype': '',
                'article': '',
                'dateRange': '',
                'reason': '',
                'physicianDrugAdministrator': '',
                'comment': ''
            },
        ];
    }

    /////////////////////// Undefined columns/cells ///////////////////////
    getIndicatorColor(item: object): string {
        throw new Error("Method not implemented.");
    }

    getIndicatorSign(item: object): string {
        throw new Error("Method not implemented.");
    }

}