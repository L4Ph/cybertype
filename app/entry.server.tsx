import { ServerRouter, type AppLoadContext, type EntryContext } from "react-router";
import { renderToReadableStream } from "react-dom/server";

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  _loadContext: AppLoadContext
) {
  const body = await renderToReadableStream(
    <ServerRouter context={remixContext} url={request.url} />,
    {
      // If you wish to abort the rendering process, you can pass a signal here.
      // Please refer to the templates for example son how to configure this.
      // signal: controller.signal,
      onError(error: unknown) {
        // Log streaming rendering errors from inside the shell
        console.error(error);
        responseStatusCode = 500;
      },
    }
  );

  responseHeaders.set("Content-Type", "text/html");
  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}