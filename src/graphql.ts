
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

export interface LoginResponse {
    success?: Nullable<boolean>;
    message?: Nullable<string>;
    data?: Nullable<User>;
}

export interface IQuery {
    me(): Nullable<User> | Promise<Nullable<User>>;
    getLink(): Nullable<Link> | Promise<Nullable<Link>>;
}

export interface IMutation {
    login(email: string, password: string): LoginResponse | Promise<LoginResponse>;
    register(createUserInput: CreateUserInput): LoginResponse | Promise<LoginResponse>;
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
