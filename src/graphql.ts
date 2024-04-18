
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
    links(): Nullable<Nullable<Link>[]> | Promise<Nullable<Nullable<Link>[]>>;
    analytics(bee_id: string): Nullable<Analytics> | Promise<Nullable<Analytics>>;
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
    no_of_visits?: Nullable<number>;
    created_at?: Nullable<string>;
    updated_at?: Nullable<string>;
}

export interface KeyValue {
    label?: Nullable<string>;
    value?: Nullable<number>;
}

export interface Analytics {
    date?: Nullable<Nullable<KeyValue>[]>;
    browser?: Nullable<Nullable<KeyValue>[]>;
    os?: Nullable<Nullable<KeyValue>[]>;
    country?: Nullable<Nullable<KeyValue>[]>;
    total_clicks?: Nullable<number>;
}

type Nullable<T> = T | null;
