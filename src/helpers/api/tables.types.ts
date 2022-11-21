import {ApiSuccess, ApiSuccessBase} from "@/helpers/api/types";

// Schema
export interface ISchema extends ApiSuccessBase {}
export interface IPerson extends ISchema {}
export interface IEntity extends ISchema {} // object
export interface IAct extends ISchema {} // event

// Perons
export interface PersonAlcoholic extends IPerson {
    alcoholic_id: number,
    full_name: string,
    dob: string,
    phone_number: string,
}

export interface PersonInspector extends IPerson {
    inspector_id: number,
    full_name: string,
    dob: string,
    phone_number: string,
}

// Entity
export interface EntityBed extends IEntity {
    bed_id: number,
}
export interface EntityDrink extends IEntity {
    drink_id: number,
    title: string,
    proof: number,
}

// Act/Event
export interface GeneralEvent extends IAct {
    general_id: number,
    updated_at: string,
    created_at: string,
}
export interface BedEvent extends IAct {
    bed_event_id: number,
    bed_id: number,
    alcoholic_id: number,
    status: number,

    // optionally populated fields
    alcoholic: PersonAlcoholic | null,
    bed: EntityBed | null,
}
export interface AlcoPartyEvent extends IAct {
    general_id: number,
    alcoholic_id: number,
    drink_id: number,

    // optionally populated fields
    alcoholic: PersonAlcoholic | null,
    drink: EntityDrink | null,
}
export interface JoinEvent extends IAct {
    general_id: number,
    alcoholic_id: number,
    inspector_id: number,
    bed_event_id: number,

    // optionally populated fields
    alcoholic: PersonAlcoholic | null,
    inspector: PersonInspector | null,
    bed_event: BedEvent | null,
}
export interface FaintEvent extends IAct {
    general_id: number,
    alcoholic_id: number,
    bed_event_id: number,

    // optionally populated fields
    alcoholic: PersonAlcoholic | null,
    bed_event: BedEvent | null,
}
export interface LeaveEvent extends IAct {
    general_id: number,
    alcoholic_id: number,
    inspector_id: number,
    bed_event_id: number,

    // optionally populated fields
    alcoholic: PersonAlcoholic | null,
    inspector: PersonInspector | null,
    bed_event: BedEvent | null,
}
export interface EscapeEvent extends IAct {
    general_id: number,
    alcoholic_id: number,
    bed_event_id: number,

    // optionally populated fields
    alcoholic: PersonAlcoholic | null,
    bed_event: BedEvent | null,
}
