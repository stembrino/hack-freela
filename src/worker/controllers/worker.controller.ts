import { Controller, Get, Post, Body, Param } from "@nestjs/common";
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

  @Post("/:workerId/experience")
  async addExperienceToWorker(
    @Param("workerId") workerId: number,
    @Body("experienceData") experienceData: any,
  ) {
    // TODO fix this type issue
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const experience = await this.workerService.addExperienceToWorker(
      workerId,
      experienceData,
    );

    //TODO fix this type issue
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return { experience: experience };
  }
}
