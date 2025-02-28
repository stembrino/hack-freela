import { Controller, Get, Post, Body } from "@nestjs/common";
import { WorkerService } from "../services/worker.service";
import { CreateWorkerDto } from "../dto/create-worker.dto";

@Controller("worker")
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  @Get()
  async getWorkers() {
    const workers = await this.workerService.findAllWorkers();
    return { workers: workers };
  }

  @Post()
  async createWorker(@Body() createWorkerDto: CreateWorkerDto) {
    const worker = await this.workerService.createWorker(createWorkerDto);
    return { worker: worker };
  }
}
