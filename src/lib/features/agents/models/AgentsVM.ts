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


