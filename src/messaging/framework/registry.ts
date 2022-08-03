import { BaseMessageSystem } from './base_message_system';
import { Request } from './types';

class MessageSystemManager {
  private messageSystems: Array<BaseMessageSystem<{}, {}>> = [];

  add(messageSystem: BaseMessageSystem<{}, {}>) {
    this.messageSystems.push(messageSystem);
  }

  get<T>(request: Request<T>): BaseMessageSystem<{}, {}> | undefined {
    for (const messageSystem of this.messageSystems) {
      if (messageSystem.canHandle(request)) {
        return messageSystem;
      }
    }
  }
}

export const messageSystemManager = new MessageSystemManager();
