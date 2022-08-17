import {Age, Compatibility, Gender} from "../types";

export interface ISearchParams {
    compatibility: Compatibility;
    gender: Gender | null;
    age: Age | null;
}