import { type Collection } from "mongodb";
import { SuccessOrError } from "../net";

interface ODM<T> {
  insertSingle: (collection: Collection<Document>, item: T) => Promise<SuccessOrError>,
  insertMultiple: (collection: Collection<Document>, items: T[]) => Promise<SuccessOrError>,
}