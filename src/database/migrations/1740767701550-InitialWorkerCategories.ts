import { WorkerCategory } from "src/worker/enums/worker-catedory.enum";
import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialWorkerCategories1740767701550 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO worker_category (name) VALUES 
        ('${WorkerCategory.MASON}'),
        ('${WorkerCategory.CONSTRUCTION_HELPER}'),
        ('${WorkerCategory.CONSTRUCTION_FOREMAN}'),
        ('${WorkerCategory.PAINTER}'),
        ('${WorkerCategory.CARPENTER}'),
        ('${WorkerCategory.WOODWORKER}')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM worker_category 
      WHERE name IN (
        '${WorkerCategory.MASON}',
        '${WorkerCategory.CONSTRUCTION_HELPER}',
        '${WorkerCategory.CONSTRUCTION_FOREMAN}',
        '${WorkerCategory.PAINTER}',
        '${WorkerCategory.CARPENTER}',
        '${WorkerCategory.WOODWORKER}'
      )
    `);
  }
}