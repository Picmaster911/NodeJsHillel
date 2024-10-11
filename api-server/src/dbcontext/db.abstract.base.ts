export abstract class AbstractRepository {
  abstract create(table: string, data: any): Promise<any>;
  abstract getAll(table: string): Promise<any[]>;
  abstract getById(table: string, id: string): Promise<any> | null;
  abstract update(
    table: string,
    id: string,
    item: Partial<any>,
  ): Promise<any> | null;
  abstract delete(table: string, id: string): Promise<boolean>;
  abstract connect(): Promise<void>;
}
