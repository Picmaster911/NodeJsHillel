export abstract class AbstractRepository<TCreate, TEntity> {
  abstract create(item: TCreate): Promise<TEntity>;
  abstract getAll(): Promise<TEntity[]>;
  abstract getById(id: string): Promise<TEntity> | null;
  abstract update(id: string, item: Partial<TCreate>): Promise<TEntity> | null;
  abstract delete(id: string): Promise<boolean>;
  abstract connect(): Promise<void>;
}
