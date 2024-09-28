
export interface EditAgentForm {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}
export interface EditAgentFormErrors {
    idError: string;
    nameError: string;
    emailError: string;
    phoneError: string;
    addressError: string;
    cityError: string;
    stateError: string;
    zipError: string;
    countryError: string;
}

export interface CreateAgentForm {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;

}
export interface CreateAgentFormErrors {
    nameError: string;
    emailError: string;
    phoneError: string;
    addressError: string;
    cityError: string;
    stateError: string;
    zipError: string;
    countryError: string;
}
export interface AgentsVM {
    modalEditAgentOpen: boolean;
    modalCreateAgentOpen: boolean;

}


