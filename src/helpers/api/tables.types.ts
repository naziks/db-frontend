import {ApiSuccess} from "@/helpers/api/types";

// Schema
interface ISchema extends ApiSuccess {}
interface IPerson extends ISchema {}
interface IEntity extends ISchema {} // object
interface IAct extends ISchema {} // event

// Perons
interface PersonAlcoholic extends IPerson{
    alcoholic_id: number,
    full_name: string,
    dob: string,
    phone_number: string,
}
interface PersonInspector extends IPerson {
    inspector_id: number,
    full_name: string,
    dob: string,
    phone_number: string,
}

// Entity
interface EntityBed extends IEntity {
    bed_id: number,
}
interface EntityDrink extends IEntity {
    drink_id: number,
    title: string,
    proof: number,
}

// Act/Event
interface GeneralEvent extends IAct {
    general_id: number,
    updated_at: string,
    created_at: string,
}
interface BedEvent extends IAct {
    bed_event_id: number,
    bed_id: number,
    alcoholic_id: number,
    status: number,

    // optionally populated fields
    alcoholic: PersonAlcoholic | null,
    bed: EntityBed | null,
}
interface AlcoPartyEvent extends IAct {
    general_id: number,
    alcoholic_id: number,
    drink_id: number,

    // optionally populated fields
    alcoholic: PersonAlcoholic | null,
    drink: EntityDrink | null,
}
interface JoinEvent extends IAct {
    general_id: number,
    alcoholic_id: number,
    inspector_id: number,
    bed_event_id: number,

    // optionally populated fields
    alcoholic: PersonAlcoholic | null,
    inspector: PersonInspector | null,
    bed_event: BedEvent | null,
}
interface FaintEvent extends IAct {
    general_id: number,
    alcoholic_id: number,
    bed_event_id: number,

    // optionally populated fields
    alcoholic: PersonAlcoholic | null,
    bed_event: BedEvent | null,
}
interface LeaveEvent extends IAct {
    general_id: number,
    alcoholic_id: number,
    inspector_id: number,
    bed_event_id: number,

    // optionally populated fields
    alcoholic: PersonAlcoholic | null,
    inspector: PersonInspector | null,
    bed_event: BedEvent | null,
}
interface EscapeEvent extends IAct {
    general_id: number,
    alcoholic_id: number,
    bed_event_id: number,

    // optionally populated fields
    alcoholic: PersonAlcoholic | null,
    bed_event: BedEvent | null,
}
