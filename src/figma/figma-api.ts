/**
 * This is a magic file that allows us to run code in the Figma plugin context
 * from the iframe. It does this by getting the code as a string, and sending it
 * to the plugin via postMessage. The plugin then evals the code and sends the
 * result back to the iframe. There are a few caveats:
 * 1. The code cannot reference any variables outside of the function. This is
 *   because the code is stringified and sent to the plugin, and the plugin
 *   evals it. The plugin has no access to the variables in the iframe.
 * 2. The return value of the function must be JSON serializable. This is
 *    because the result is sent back to the iframe via postMessage, which only
 *    supports JSON.
 *
 * You can get around these limitations by passing in the variables you need
 * as parameters to the function.
 *
 * @example
 * ```ts
 * const result = await figmaAPI.run((figma, {nodeId}) => {
 *   return figma.getNodeById(nodeId)?.name;
 * }, {nodeId: "0:2"});
 *
 * console.log(result); // "Page 1"
 * ```
 */
class FigmaAPI {
  private id = 0

  /**
   * Run a function in the Figma plugin context. The function cannot reference
   * any variables outside of itself, and the return value must be JSON
   * serializable. If you need to pass in variables, you can do so by passing
   * them as the second parameter.
   */
  run<T, U>(fn: (figma: PluginAPI, params: U) => Promise<T> | T, params?: U): Promise<T> {
    return new Promise((resolve, reject) => {
      const id = this.id++
      const cb = (event: MessageEvent) => {
        if (event.origin !== 'https://www.figma.com' && event.origin !== 'https://staging.figma.com') {
          return
        }

        if (event.data.pluginMessage?.type === 'EVAL_RESULT') {
          if (event.data.pluginMessage.id === id) {
            window.removeEventListener('message', cb)
            resolve(event.data.pluginMessage.result)
          }
        }

        if (event.data.pluginMessage?.type === 'EVAL_REJECT') {
          if (event.data.pluginMessage.id === id) {
            window.removeEventListener('message', cb)
            const message = event.data.pluginMessage.error
            reject(new Error(typeof message === 'string' ? message : 'An error occurred in FigmaAPI.run()'))
          }
        }
      }
      window.addEventListener('message', cb)

      const msg = {
        pluginMessage: {
          type: 'EVAL',
          code: fn.toString(),
          id,
          params,
        },
        pluginId: '*',
      }

        ;['https://www.figma.com', 'https://staging.figma.com'].forEach((origin) => {
          try {
            parent.postMessage(msg, origin)
          } catch (e) {
            console.error(e)
          }
        })
    })
  }
}

export const figmaAPI = new FigmaAPI()
