type FullNameParams = {
    firstName: string;
    middleName?: string;
    lastName: string;
};

export function getFullName({ firstName, middleName, lastName }: FullNameParams): string {
    return middleName
        ? `${firstName} ${middleName} ${lastName}`
        : `${firstName} ${lastName}`;
}