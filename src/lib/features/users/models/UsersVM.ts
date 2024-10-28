

export interface EditUserFormErrors {
    idError: string;
    emailError: string;
    nameError: string;
    codeError: string;

    activeError: string;
    deletedError: string;

    agentIdError: string;




}

export interface CreateUserFormErrors {

    emailError: string;
    nameError: string;
    codeError: string;
    passwordError: string;

    activeError: string;
    deletedError: string;

    agentIdError: string;

}
export interface UsersVM {
    modalEditUserOpen: boolean;
    modalCreateUserOpen: boolean;

}


