import { Injectable, Logger } from '@nestjs/common';
import { Subject, Observable } from 'rxjs';

export interface RealtimeSyncEvent {
  eventType: 'NOTIFICATION' | 'PROJECT_STATUS' | 'SERVICE_TICKET' | 'SCADA_ALERT' | 'CHAT_MESSAGE';
  payload: any;
  timestamp: string;
  userId?: string;
}

@Injectable()
export class SyncGateway {
  private readonly logger = new Logger(SyncGateway.name);
  private readonly eventStream$ = new Subject<RealtimeSyncEvent>();

  broadcastEvent(event: RealtimeSyncEvent) {
    this.logger.log(`[WebSocket Gateway Broadcast] Event: ${event.eventType} - Payload: ${JSON.stringify(event.payload)}`);
    this.eventStream$.next(event);
  }

  getEventStream(): Observable<RealtimeSyncEvent> {
    return this.eventStream$.asObservable();
  }
}
