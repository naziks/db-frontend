export enum InputItemType {
    string = 'string',
    number = 'number',
    select = 'select',
    date = 'date',
    daterange = 'daterange',
    entitypicker = 'entitypicker',
}

export type InputItemSelectOptions = string[];

export interface InputItemDaterangeOptions {
    start: string;
    end: string;
}

export interface InputListItemType {
    type: InputItemType
    name: string
    label: string
    validator?: (value: any) => boolean
    options?: InputItemSelectOptions
}

export interface InputListDateRangeType {
    type: InputItemType.daterange
    // will be sent to api using this name
    start_name: string
    end_name: string

    start_label: string
    end_label: string
}

export interface InputListEntityPickerType {
    type: InputItemType.entitypicker
    multi: boolean
    label: string
    api_name: string // api name of the entity
    api_column: string // value from this column will be used as result
    table: string // table name
    search_in: string[] // if you type to search field, it will search in this columns
    select_template: CallableFunction // template for select field
    preview_template: CallableFunction // (row) => `${row.full_name}#${row.id}`
}

export type InputListItem = InputListItemType | InputListDateRangeType | InputListEntityPickerType;

export class InputGenerator {
    private store: InputListItem[] = [];

    add(item: InputListItem) {
        this.store.push(item);
        return this;
    }

    addEntityPicker(api_name: string, multi: boolean, label: string, api_column: string, table: string, search_in: string[], select_template: Function, preview_template: Function) {
        return this.add({
            type: InputItemType.entitypicker,
            multi,
            api_name,
            label,
            api_column,
            table,
            search_in,
            select_template,
            preview_template,
        })
    }

    addMulti() {

    }

    addString(name: string, label: string) {
        return this.add({
            type: InputItemType.string,
            name,
            label,
        })
    }

    addNumber(name: string, label: string, validator = (str: string) => true) {
        return this.add({
            type: InputItemType.number,
            name,
            label,
            validator
        })
    }

    addSelect(name: string, label: string, options: InputItemSelectOptions) {
        return this.add({
            type: InputItemType.select,
            name,
            label,
            options,
        })
    }

    addDate(name: string, label: string) {
        return this.add({
            type: InputItemType.date,
            name,
            label,
        })
    }

    addDateRange(start_name: string, end_name: string, start_label: string, end_label: string) {
        return this.add({
            type: InputItemType.daterange,
            start_name,
            end_name,
            start_label,
            end_label,
        })
    }

    public finish() {
        return this.store;
    }
}

// ready entity pickers
export const AlcoholicEntityPicker: InputListEntityPickerType = {
    type: InputItemType.entitypicker,
    multi: false,
    api_name: 'alcoholic_id', // out
    api_column: 'alcoholic_id',
    table: 'person.alcoholic',
    search_in: ['full_name', 'alcoholic_id'],
    label: 'Select Alcoholic',
    select_template: (row: any) => row.full_name,
    preview_template: (row: any) => `${row.full_name}#${row.alcoholic_id}`
}

export const DrinkEntityPicker: InputListEntityPickerType = {
    type: InputItemType.entitypicker,
    multi: false,
    api_name: 'drink_id', // out
    api_column: 'drink_id',
    table: 'entity.drink',
    search_in: ['title', 'drink_id'],
    label: 'Select Drink',
    select_template: (row: any) => `${row.title}`,
    preview_template: (row: any) => `${row.title} (${row.proof}%)`
}

export const AlcoholicEntityPickerMulti: InputListEntityPickerType = (() => {
    let tmp = AlcoholicEntityPicker;
    tmp.multi = true;
    return tmp;
})();

export const InspectorEntityPicker: InputListEntityPickerType = {
    type: InputItemType.entitypicker,
    multi: false,
    api_name: 'inspector_id',
    api_column: 'inspector_id',
    table: 'person.inspector',
    search_in: ['full_name', 'inspector_id'],
    label: 'Select Inspector',
    select_template: (row: any) => row.full_name,
    preview_template: (row: any) => `${row.full_name}#${row.inspector_id}`
}

// ready date picker
export const DateRange: InputListDateRangeType = {
    type: InputItemType.daterange,
    start_name: 'start_date',
    end_name: 'end_date',
    start_label: 'Start Date',
    end_label: 'End Date',
}

export const nValidator = (str: string) => {
    return /^\d+$/.test(str)
}

export interface Query {
    id: number
    description: string
    input: InputListItem[]
    url: CallableFunction | string
    query?: CallableFunction
}

export const QueryBuffer: Query[] = [{
    id: 1,
    description: "Find all inspectors who take <code>alcoholic</code> to <b>DetoXer</b> at least <code>N</code> times",
    input: (new InputGenerator())
        .add(AlcoholicEntityPicker)
        .addNumber('amount', 'Select amount', nValidator)
        .add(DateRange)
        .finish(),
    url: ({alcoholic_id}: {alcoholic_id: any}) => `/alcoholic/${alcoholic_id}/inspectors`,
}, {
    id: 2,
    description: "Find all beds where <code>alcoholic</code> was",
    input: (new InputGenerator())
        .add(AlcoholicEntityPicker)
        .add(DateRange)
        .finish(),
    url: ({alcoholic_id}: {alcoholic_id: any}) => `/alcoholic/${alcoholic_id}/beds`,
}, {
    id: 3,
    description: "Find all alcoholics who was taken by <code>inspector</code> to <b>DetoXer</b> at least <code>N</code> times",
    input: (new InputGenerator())
        .add(InspectorEntityPicker)
        .addNumber('amount', 'Select amount', nValidator)
        .add(DateRange)
        .finish(),
    url: ({inspector_id}: {inspector_id: any}) => `/inspector/${inspector_id}/alcoholics`,
},{
    id: 4,
    description: "Find all beds from which <code>alcoholic</code> escaped",
    input: (new InputGenerator())
        .add(AlcoholicEntityPicker)
        .add(DateRange)
        .finish(),
    url: ({alcoholic_id}: {alcoholic_id: any}) => `/alcoholic/${alcoholic_id}/escaped_beds`,
},{
    id: 5,
    description: "Find all the inspectors who picked up an <code>alcoholic</code> fewer times than released them",
    input: (new InputGenerator())
        .add(AlcoholicEntityPicker)
        .add(DateRange)
        .finish(),
    url: ({alcoholic_id}: {alcoholic_id: any}) => `/alcoholic/${alcoholic_id}/inspectors/custom_filter`,
},{
    id: 6,
    description: "Find all inspectors who pick different alcoholics at least <code>N</code> times",
    input: (new InputGenerator())
        .addNumber('amount', 'Select amount', nValidator)
        .add(DateRange)
        .finish(),
    url: ({amount}: {amount: any}) => `/event/join/inspectors/min/${amount}`,
},{
    id: 7,
    description: "Find all alcoholics who was picked at least <code>N</code> times",
    input: (new InputGenerator())
        .addNumber('amount', 'Select amount', nValidator)
        .add(DateRange)
        .finish(),
    url: ({amount}: {amount: any}) => `/event/join/alcoholics/min/${amount}`,
},{
    id: 8,
    description: "Find all mutual events for <code>alcoholic</code> and <code>inspector</code>",
    input: (new InputGenerator())
        .add(AlcoholicEntityPicker)
        .add(InspectorEntityPicker)
        .add(DateRange)
        .finish(),
    url: `/events`,
},{
    id: 9,
    description: "For <code>alcoholic</code> and each alcoholic drink he comsumed, find how many times he drank it in a group of at least <code>N</code> alcoholics",
    input: (new InputGenerator())
        .add(AlcoholicEntityPicker)
        .addNumber('amount', 'Select amount')
        .add(DateRange)
        .finish(),
    url: ({alcoholic_id}: {alcoholic_id: any}) => `/alcoholic/${alcoholic_id}/drinks/stat/`,
},{
    id: 10,
    description: 'Find the total number of escapes this month',
    input: (new InputGenerator())
        .finish(),
    url: `/event/escape/stat/count`
},{
    id: 11,
    description: 'Find all beds in descending order of the average number of loss of consciousness for\n' +
        'of all alcoholics who were brought to bed by the <code>inspector</code>',
    input: (new InputGenerator())
        .add(InspectorEntityPicker)
        .add(DateRange)
        .finish(),
    url: `/beds/sort/custom`
},{
    id: 12,
    description: 'Find all alcoholic beverages in descending order of the total number of alcoholics who drank it together with <code>alcoholic</code>',
    input: (new InputGenerator())
        .add(AlcoholicEntityPicker)
        .finish(),
    url: ({alcoholic_id}: {alcoholic_id: any}) => `/alcoholic/${alcoholic_id}/drinks/sort/custom`,
}];

export default QueryBuffer;