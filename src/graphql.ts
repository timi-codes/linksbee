
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreateUserInput {
    email?: Nullable<string>;
    password?: Nullable<string>;
}

export interface User {
    id?: Nullable<string>;
    email?: Nullable<string>;
    last_login?: Nullable<string>;
    created_at?: Nullable<string>;
    updated_at?: Nullable<string>;
}

export interface BooleanResponse {
    success?: Nullable<boolean>;
    message?: Nullable<string>;
    data?: Nullable<User>;
}

export interface IQuery {
    me(): Nullable<BooleanResponse> | Promise<Nullable<BooleanResponse>>;
    getLink(): Nullable<Link> | Promise<Nullable<Link>>;
}

export interface IMutation {
    login(email: string, password: string): BooleanResponse | Promise<BooleanResponse>;
    register(createUserInput: CreateUserInput): BooleanResponse | Promise<BooleanResponse>;
    shorten(url: string): Nullable<Link> | Promise<Nullable<Link>>;
}

export interface Link {
    bee_id?: Nullable<string>;
    name?: Nullable<string>;
    original_url?: Nullable<string>;
    expires_at?: Nullable<string>;
    last_visited_at?: Nullable<string>;
    created_at?: Nullable<string>;
    updated_at?: Nullable<string>;
}

type Nullable<T> = T | null;
