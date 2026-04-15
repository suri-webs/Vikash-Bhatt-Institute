
export interface LocationState {
    country: string;
    state: string;
    city: string;
    pincode: string;
    address: string;
}

export interface ProfileFormState {
    fullName: string;
    classIn:string;
    rollNumber:number|string;
    gmail: string;
    phone: string;
    dob: string;
    bio: string;
    location: LocationState;
}