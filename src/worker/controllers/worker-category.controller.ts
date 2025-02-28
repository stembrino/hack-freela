import { Controller } from "@nestjs/common";
import { WorkerService } from "../services/worker.service";

@Controller("worker-category")
export class WorkerCategoryController {
  constructor(private readonly workerService: WorkerService) {}

  // Add routes for worker controller
}
