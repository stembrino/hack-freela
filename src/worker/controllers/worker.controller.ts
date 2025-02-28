import { Controller, Get } from "@nestjs/common";
import { WorkerService } from "../services/worker.service";

@Controller("worker")
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  @Get()
  async getWorkers() {
    const workers = await this.workerService.findAllWorkers();
    return { workers: workers };
  }
}
