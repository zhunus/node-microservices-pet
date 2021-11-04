import { Body, Controller, Logger, Post } from '@nestjs/common';

interface BusEvent {
  type: string;
  data: any;
}

@Controller('events')
export class EventsController {
  private readonly logger = new Logger(EventsController.name);

  @Post()
  getEvent(@Body() event: BusEvent) {
    this.logger.log(`Received event: ${event.type}`);
  }
}
