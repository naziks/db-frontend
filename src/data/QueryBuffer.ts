export enum InputItemType {
    string = 'string',
    number = 'number',
    select = 'select',
    date = 'date',
    daterange = 'daterange',
    entitypicker = 'entitypicker',
}

type InputItemSelectOptions = string[];

interface InputItemDaterangeOptions {
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
    api_name: string // api name of the entity
    api_column: string // value from this column will be used as result
    table: string // table name
    search_in: string[] // if you type to search field, it will search in this columns
    template: CallableFunction // (row) => `${row.full_name}#${row.id}`
}

export type InputListItem = InputListItemType | InputListDateRangeType | InputListEntityPickerType;

class InputGenerator {
    private store: InputListItem[] = [];

    add(item: InputListItem) {
        this.store.push(item);
        return this;
    }

    addEntityPicker(api_name: string, label: string, api_column: string, table: string, search_in: string[], template: Function) {
        return this.add({
            type: InputItemType.entitypicker,
            api_name,
            label,
            api_column,
            table,
            search_in,
            template,
        })
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
const AlcoholicEntityPicker: InputListEntityPickerType = {
    type: InputItemType.entitypicker,
    api_name: 'alcoholic_id',
    api_column: 'alcoholic_id',
    table: 'person.alcoholic',
    search_in: ['full_name', 'id'],
    template: (row: any) => `${row.full_name}#${row.id}`
}

const InspectorEntityPicker: InputListEntityPickerType = {
    type: InputItemType.entitypicker,
    api_name: 'inspector_id',
    api_column: 'inspector_id',
    table: 'person.inspector',
    search_in: ['full_name', 'id'],
    template: (row: any) => `${row.full_name}#${row.id}`
}

// ready date picker
const DateRange: InputListDateRangeType = {
    type: InputItemType.daterange,
    start_name: 'start_date',
    end_name: 'end_date',
    start_label: 'Start Date',
    end_label: 'End Date',
}

const nValidator = (str: string) => {
    return /^\d+$/.test(str)
}

export interface Query {
    id: number,
    description: string,
    input: InputListItem[],
}

export const QueryBuffer: Query[] = [{
    id: 1,
    description: "Find all inspectors who take <code>alcoholic</code> to <b>DetoXer</b> at least <code>N</code> times",
    input: (new InputGenerator())
        .add(AlcoholicEntityPicker)
        .addNumber('n', 'N', nValidator)
        .add(DateRange)
        .finish(),
}, {
    id: 2,
    description: "Find all beds where <code>alcoholic</code> was",
    input: (new InputGenerator())
        .add(AlcoholicEntityPicker)
        .add(DateRange)
        .finish(),
}, {
    id: 3,
    description: "Find all alcoholics who was taken by <code>inspector</code> to <b>DetoXer</b> at least <code>N</code> times",
    input: (new InputGenerator())
        .add(InspectorEntityPicker)
        .addNumber('n', 'N')
        .add(DateRange)
        .finish(),
}];

export default QueryBuffer;