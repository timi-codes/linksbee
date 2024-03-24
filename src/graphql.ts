
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface Link {
    bee_id?: Nullable<string>;
    name?: Nullable<string>;
    original_url?: Nullable<string>;
    expires_at?: Nullable<string>;
    last_visited_at?: Nullable<string>;
    created_at?: Nullable<string>;
    updated_at?: Nullable<string>;
}

export interface IQuery {
    getLink(): Nullable<Link> | Promise<Nullable<Link>>;
}

export interface IMutation {
    shorten(url: string): Nullable<Link> | Promise<Nullable<Link>>;
}

type Nullable<T> = T | null;
