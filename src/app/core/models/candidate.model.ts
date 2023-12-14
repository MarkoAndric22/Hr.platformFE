import { Skill } from "./skill.model";

export class Candidate {
    id?: number;
    name?: string;
    date_of_birth?: Date;
    contact_number?: string;
    email?: string;
    skills: Skill[];

    constructor(id: number, name: string, date_of_birth: Date, contact_number: string, email: string, skills: Skill[]) {
        this.id = id;
        this.name = name;
        this.date_of_birth = date_of_birth;
        this.contact_number = contact_number;
        this.email = email;
        this.skills = skills;
    }
}