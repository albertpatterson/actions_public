import { Request, ResponseResult } from './types';
import { BaseMessageSystem } from './base_message_system';
import { messageSystemManager } from './registry';
/**
 *
 * @param name the name of the type of request (must be unique)
 * @param handleAsyncInTab handler of requests in the tab
 * @param handleAsyncInServiceWorker handler of requests in the service worker
 * @returns
 */
export function createMessageSystem<T, V>(
  name: string,
  handleAsyncInTab: (
    request: Request<T>,
    sender: chrome.runtime.MessageSender
  ) => Promise<ResponseResult<V>>,
  handleAsyncInServiceWorker: (
    request: Request<T>,
    sender: chrome.runtime.MessageSender
  ) => Promise<ResponseResult<V>>
) {
  class MessageSystem extends BaseMessageSystem<T, V> {
    canHandle(request: Request<{}>): request is Request<T> {
      return request.name === name;
    }

    protected async handleAsyncInTab(
      request: Request<T>,
      sender: chrome.runtime.MessageSender
    ): Promise<ResponseResult<V>> {
      return await handleAsyncInTab(request, sender);
    }

    protected async handleAsyncInServiceWorker(
      request: Request<T>,
      sender: chrome.runtime.MessageSender
    ): Promise<ResponseResult<V>> {
      return await handleAsyncInServiceWorker(request, sender);
    }
  }

  const messageSystem = new MessageSystem();

  const createRequest = (params: T): Request<T> => {
    return {
      name,
      data: {
        ...params,
      },
    };
  };

  return {
    messageSystem,
    createRequest,
  };
}

export function registerMessageSystem(
  messageSystem: BaseMessageSystem<{}, {}>
) {
  messageSystemManager.add(messageSystem);
}

/**
 *
 * @param name the name of the type of request (must be unique)
 * @param handleAsyncInTab handler of requests in the tab
 * @param handleAsyncInServiceWorker handler of requests in the service worker
 * @returns
 */
export function createAndRegisterMessageSystem<T, V>(
  name: string,
  handleAsyncInTab: (
    request: Request<T>,
    sender: chrome.runtime.MessageSender
  ) => Promise<ResponseResult<V>>,
  handleAsyncInServiceWorker: (
    request: Request<T>,
    sender: chrome.runtime.MessageSender
  ) => Promise<ResponseResult<V>>
) {
  const { messageSystem, createRequest } = createMessageSystem(
    name,
    handleAsyncInTab,
    handleAsyncInServiceWorker
  );

  registerMessageSystem(messageSystem);

  return { messageSystem, createRequest };
}
